"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { PROJECT_KINDS, type ProjectRow } from "@/lib/projects";

const BUCKET = "project-images";

const input =
  "mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-900 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600/30 sm:text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";
const btn =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50";
const label = "text-sm font-medium text-zinc-800 dark:text-zinc-200";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

/** Resizes an image in the browser and converts it to WebP, so uploads stay small. */
async function toWebp(file: File, maxWidth = 1600): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not convert image"))), "image/webp", 0.85),
  );
}

interface FormState {
  slug: string;
  name: string;
  tagline: string;
  kind: string;
  role: string;
  live_url: string;
  live_url_note: string;
  featured: boolean;
  published: boolean;
  schema_type: "SoftwareApplication" | "CreativeWork";
  tech_stack: string;
  problem: string;
  what_i_built: string;
  my_role: string;
  key_features: string;
  result: string;
  screenshot: string;
  gallery: { src: string; caption: string }[];
}

const emptyForm: FormState = {
  slug: "",
  name: "",
  tagline: "",
  kind: "",
  role: "Developer",
  live_url: "",
  live_url_note: "",
  featured: false,
  published: true,
  schema_type: "SoftwareApplication",
  tech_stack: "",
  problem: "",
  what_i_built: "",
  my_role: "",
  key_features: "",
  result: "",
  screenshot: "",
  gallery: [],
};

const toForm = (r: ProjectRow): FormState => ({
  slug: r.slug,
  name: r.name,
  tagline: r.tagline,
  kind: r.kind ?? "",
  role: r.role,
  live_url: r.live_url ?? "",
  live_url_note: r.live_url_note ?? "",
  featured: r.featured,
  published: r.published,
  schema_type: r.schema_type,
  tech_stack: (r.tech_stack ?? []).join(", "),
  problem: r.problem,
  what_i_built: r.what_i_built,
  my_role: r.my_role,
  key_features: (r.key_features ?? []).join("\n"),
  result: r.result,
  screenshot: r.screenshot ?? "",
  gallery: r.gallery ?? [],
});

export default function ProjectsPanel({ session }: { session: Session }) {
  const supabase = getSupabaseBrowser();
  const [rows, setRows] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ form: FormState; isNew: boolean } | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("projects").select("*").order("sort_order").order("created_at");
    if (error) setError(error.message);
    else { setRows(data as ProjectRow[]); setError(null); }
    setLoading(false);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  async function refreshSite() {
    try {
      await fetch("/api/revalidate-site", { method: "POST", headers: { Authorization: `Bearer ${session.access_token}` } });
    } catch { /* pages still refresh on their own within a minute */ }
  }

  async function removeImages(slug: string) {
    const { data } = await supabase.storage.from(BUCKET).list(slug, { limit: 100 });
    if (data?.length) await supabase.storage.from(BUCKET).remove(data.map((f) => `${slug}/${f.name}`));
  }

  async function remove(r: ProjectRow) {
    if (!window.confirm(`Delete "${r.name}" from your portfolio? This removes its case study page and cannot be undone.`)) return;
    setBusy(r.slug);
    const { error } = await supabase.from("projects").delete().eq("slug", r.slug);
    if (error) setError(error.message);
    else {
      await removeImages(r.slug);
      setRows((list) => list.filter((x) => x.slug !== r.slug));
      await refreshSite();
      setNotice(`Deleted "${r.name}". The website has been updated.`);
    }
    setBusy(null);
  }

  async function togglePublished(r: ProjectRow) {
    setBusy(r.slug);
    const { error } = await supabase.from("projects").update({ published: !r.published }).eq("slug", r.slug);
    if (error) setError(error.message);
    else {
      setRows((list) => list.map((x) => (x.slug === r.slug ? { ...x, published: !r.published } : x)));
      await refreshSite();
      setNotice(r.published ? `"${r.name}" is now hidden from the website.` : `"${r.name}" is visible on the website again.`);
    }
    setBusy(null);
  }

  async function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= rows.length) return;
    const reordered = [...rows];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    const withOrder = reordered.map((r, i) => ({ ...r, sort_order: (i + 1) * 10 }));
    setRows(withOrder);
    setBusy("order");
    const changed = withOrder.filter((r, i) => r.sort_order !== rows[i]?.sort_order || r.slug !== rows[i]?.slug);
    for (const r of changed) {
      const { error } = await supabase.from("projects").update({ sort_order: r.sort_order }).eq("slug", r.slug);
      if (error) { setError(error.message); break; }
    }
    await refreshSite();
    setBusy(null);
  }

  if (editing) {
    return (
      <ProjectForm
        initial={editing.form}
        isNew={editing.isNew}
        existingSlugs={rows.map((r) => r.slug)}
        nextOrder={(rows.length + 1) * 10}
        onCancel={() => setEditing(null)}
        onSaved={async (name) => {
          setEditing(null);
          await load();
          await refreshSite();
          setNotice(`Saved "${name}". The website has been updated.`);
        }}
      />
    );
  }

  return (
    <div className="py-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-sky-700 dark:text-sky-400">Admin</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Projects</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Add, edit, reorder, hide or delete the projects shown on your website.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className={`${btn} border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800`}>Refresh</button>
          <button onClick={() => setEditing({ form: emptyForm, isNew: true })} className={`${btn} bg-sky-700 text-white hover:bg-sky-800`}>
            + Add project
          </button>
        </div>
      </div>

      {notice && (
        <p role="status" className="mt-6 flex items-start justify-between gap-4 rounded-lg bg-sky-50 p-3 text-sm text-sky-900 dark:bg-sky-950/50 dark:text-sky-200">
          {notice}
          <button onClick={() => setNotice(null)} className="font-semibold">Close</button>
        </p>
      )}
      {error && <p role="alert" className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
      {loading && <p className="py-10 text-center text-zinc-500">Loading projects…</p>}

      <ul className="mt-8 space-y-3">
        {rows.map((r, i) => (
          <li key={r.slug} className={`flex flex-wrap items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 ${r.published ? "" : "opacity-60"}`}>
            <div className="flex flex-col gap-1">
              <button aria-label={`Move ${r.name} up`} disabled={i === 0 || busy !== null} onClick={() => move(i, -1)} className="rounded px-1.5 text-zinc-500 hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800">▲</button>
              <button aria-label={`Move ${r.name} down`} disabled={i === rows.length - 1 || busy !== null} onClick={() => move(i, 1)} className="rounded px-1.5 text-zinc-500 hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800">▼</button>
            </div>
            {r.screenshot ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={r.screenshot} alt="" className="h-14 w-24 rounded-md border border-zinc-200 object-cover object-top dark:border-zinc-700" />
            ) : (
              <span className="flex h-14 w-24 items-center justify-center rounded-md border border-dashed border-zinc-300 text-xs text-zinc-400 dark:border-zinc-700">No image</span>
            )}
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-zinc-950 dark:text-white">{r.name}</p>
              <p className="mt-0.5 flex flex-wrap gap-2 text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">{r.kind ?? "Type not set"} · {r.role}</span>
                {r.featured && <span className="rounded-full bg-sky-100 px-2 font-semibold text-sky-800 dark:bg-sky-900/40 dark:text-sky-300">Featured</span>}
                {!r.published && <span className="rounded-full bg-zinc-200 px-2 font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">Hidden</span>}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {r.published && (
                <a href={`/projects/${r.slug}`} target="_blank" rel="noopener" className={`${btn} text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800`}>View</a>
              )}
              <button disabled={busy !== null} onClick={() => setEditing({ form: toForm(r), isNew: false })} className={`${btn} border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800`}>Edit</button>
              <button disabled={busy !== null} onClick={() => togglePublished(r)} className={`${btn} text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800`}>{r.published ? "Hide" : "Show"}</button>
              <button disabled={busy !== null} onClick={() => remove(r)} className={`${btn} text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40`}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────────────────── Add / edit form ───────────────────────── */

function ProjectForm({
  initial,
  isNew,
  existingSlugs,
  nextOrder,
  onCancel,
  onSaved,
}: {
  initial: FormState;
  isNew: boolean;
  existingSlugs: string[];
  nextOrder: number;
  onCancel: () => void;
  onSaved: (name: string) => void | Promise<void>;
}) {
  const supabase = getSupabaseBrowser();
  const [f, setF] = useState<FormState>(initial);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setF((prev) => ({ ...prev, [key]: value }));

  async function upload(file: File): Promise<string> {
    const slug = f.slug || slugify(f.name) || "project";
    const blob = await toWebp(file);
    const path = `${slug}/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, "")) || "image"}.webp`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: "image/webp", upsert: false });
    if (error) throw error;
    return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }

  async function onScreenshot(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setError(null);
    try { set("screenshot", await upload(file)); } catch (err) { setError(`Upload failed: ${(err as Error).message}`); }
    setUploading(false);
    e.target.value = "";
  }

  async function onGallery(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true); setError(null);
    try {
      const added: { src: string; caption: string }[] = [];
      for (const file of files) added.push({ src: await upload(file), caption: "" });
      setF((prev) => ({ ...prev, gallery: [...prev.gallery, ...added] }));
    } catch (err) { setError(`Upload failed: ${(err as Error).message}`); }
    setUploading(false);
    e.target.value = "";
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const slug = slugify(f.slug || f.name);
    if (f.name.trim().length < 2) return setError("Please enter a project name.");
    if (!slug) return setError("Please enter a valid page address (letters, numbers and dashes).");
    if (isNew && existingSlugs.includes(slug)) return setError(`A project with the address "${slug}" already exists. Change the page address.`);
    if (f.live_url && !/^https?:\/\//i.test(f.live_url.trim())) return setError("The live link must start with https://");
    if (f.gallery.some((g) => !g.caption.trim())) return setError("Please add a caption to every extra screenshot.");

    const row = {
      slug,
      name: f.name.trim(),
      tagline: f.tagline.trim(),
      kind: f.kind || null,
      role: f.role.trim(),
      live_url: f.live_url.trim() || null,
      live_url_note: f.live_url_note.trim() || null,
      featured: f.featured,
      published: f.published,
      schema_type: f.schema_type,
      application_category: f.schema_type === "SoftwareApplication" ? "BusinessApplication" : null,
      tech_stack: f.tech_stack.split(",").map((t) => t.trim()).filter(Boolean),
      problem: f.problem.trim(),
      what_i_built: f.what_i_built.trim(),
      my_role: f.my_role.trim(),
      key_features: f.key_features.split("\n").map((t) => t.replace(/^[-•*]\s*/, "").trim()).filter(Boolean),
      result: f.result.trim(),
      screenshot: f.screenshot || null,
      gallery: f.gallery.map((g) => ({ src: g.src, caption: g.caption.trim() })),
    };

    setSaving(true);
    const { error } = isNew
      ? await supabase.from("projects").insert({ ...row, sort_order: nextOrder })
      : await supabase.from("projects").update(row).eq("slug", initial.slug);
    setSaving(false);
    if (error) return setError(error.message);
    await onSaved(row.name);
  }

  return (
    <form onSubmit={save} className="py-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-sky-700 dark:text-sky-400">Projects</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">{isNew ? "Add a project" : `Edit "${initial.name}"`}</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Fields marked * are required. Everything else can be filled in later.</p>
        </div>
        <button type="button" onClick={onCancel} className={`${btn} border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800`}>Cancel</button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <fieldset className="space-y-4 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <legend className="px-1 font-semibold">Basics</legend>
          <div>
            <label className={label} htmlFor="p-name">Project name *</label>
            <input id="p-name" className={input} value={f.name} required onChange={(e) => { set("name", e.target.value); if (!slugTouched) set("slug", slugify(e.target.value)); }} />
          </div>
          <div>
            <label className={label} htmlFor="p-slug">Page address</label>
            <div className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
              <span>/projects/</span>
              <input id="p-slug" className={`${input} mt-0`} value={f.slug} disabled={!isNew} onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }} />
            </div>
            {!isNew && <p className="mt-1 text-xs text-zinc-500">The address can&apos;t change after a project is created, so existing links keep working.</p>}
          </div>
          <div>
            <label className={label} htmlFor="p-tagline">One-line summary</label>
            <input id="p-tagline" className={input} value={f.tagline} placeholder="e.g. Online store for golf cart parts across the USA." onChange={(e) => set("tagline", e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="p-kind">Project type</label>
              <select id="p-kind" className={input} value={f.kind} onChange={(e) => set("kind", e.target.value)}>
                <option value="">Not set</option>
                {PROJECT_KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="p-role">Your role</label>
              <input id="p-role" className={input} value={f.role} placeholder="e.g. Developer, SEO & maintenance" onChange={(e) => set("role", e.target.value)} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="p-url">Live link</label>
              <input id="p-url" className={input} value={f.live_url} placeholder="https://" onChange={(e) => set("live_url", e.target.value)} />
            </div>
            <div>
              <label className={label} htmlFor="p-schema">Kind of product</label>
              <select id="p-schema" className={input} value={f.schema_type} onChange={(e) => set("schema_type", e.target.value as FormState["schema_type"])}>
                <option value="SoftwareApplication">Web app, platform or store</option>
                <option value="CreativeWork">Website</option>
              </select>
            </div>
          </div>
          <div>
            <label className={label} htmlFor="p-note">Text to show when there is no live link</label>
            <input id="p-note" className={input} value={f.live_url_note} placeholder="e.g. A demo is available on request." onChange={(e) => set("live_url_note", e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="p-tech">Technologies (separate with commas)</label>
            <input id="p-tech" className={input} value={f.tech_stack} placeholder="Next.js, Supabase, Tailwind CSS" onChange={(e) => set("tech_stack", e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-6 pt-1">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.featured} onChange={(e) => set("featured", e.target.checked)} className="h-4 w-4 accent-sky-700" /> Featured on homepage</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.published} onChange={(e) => set("published", e.target.checked)} className="h-4 w-4 accent-sky-700" /> Visible on website</label>
          </div>
        </fieldset>

        <fieldset className="space-y-4 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <legend className="px-1 font-semibold">Case study</legend>
          <div>
            <label className={label} htmlFor="p-problem">Problem</label>
            <textarea id="p-problem" rows={3} className={input} value={f.problem} onChange={(e) => set("problem", e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="p-solution">My solution</label>
            <textarea id="p-solution" rows={3} className={input} value={f.what_i_built} onChange={(e) => set("what_i_built", e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="p-myrole">My role (in detail)</label>
            <textarea id="p-myrole" rows={2} className={input} value={f.my_role} onChange={(e) => set("my_role", e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="p-features">Key features (one per line)</label>
            <textarea id="p-features" rows={5} className={input} value={f.key_features} onChange={(e) => set("key_features", e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="p-result">Result / status</label>
            <input id="p-result" className={input} value={f.result} placeholder="e.g. Live at example.com." onChange={(e) => set("result", e.target.value)} />
          </div>
        </fieldset>
      </div>

      <fieldset className="mt-8 space-y-5 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <legend className="px-1 font-semibold">Screenshots</legend>
        <div className="flex flex-wrap items-start gap-6">
          <div>
            <p className={label}>Main screenshot (shown on the project card and at the top of the case study)</p>
            <div className="mt-2 flex items-center gap-4">
              {f.screenshot ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.screenshot} alt="" className="h-28 w-48 rounded-lg border border-zinc-200 object-cover object-top dark:border-zinc-700" />
              ) : (
                <span className="flex h-28 w-48 items-center justify-center rounded-lg border border-dashed border-zinc-300 text-xs text-zinc-400 dark:border-zinc-700">No screenshot</span>
              )}
              <div className="space-y-2">
                <label className={`${btn} cursor-pointer border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800`}>
                  {f.screenshot ? "Replace image" : "Upload image"}
                  <input type="file" accept="image/*" className="sr-only" onChange={onScreenshot} disabled={uploading} />
                </label>
                {f.screenshot && <button type="button" onClick={() => set("screenshot", "")} className="block text-sm text-red-700 dark:text-red-400">Remove</button>}
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className={label}>Extra screenshots (inside pages, dashboards, features)</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {f.gallery.map((g, i) => (
              <div key={g.src} className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt="" className="h-28 w-full rounded-md object-cover object-top" />
                <input
                  className={input}
                  value={g.caption}
                  placeholder="Caption, e.g. Admin dashboard"
                  onChange={(e) => setF((prev) => ({ ...prev, gallery: prev.gallery.map((x, j) => (j === i ? { ...x, caption: e.target.value } : x)) }))}
                />
                <button type="button" onClick={() => setF((prev) => ({ ...prev, gallery: prev.gallery.filter((_, j) => j !== i) }))} className="mt-2 text-sm text-red-700 dark:text-red-400">Remove</button>
              </div>
            ))}
          </div>
          <label className={`${btn} mt-3 cursor-pointer border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800`}>
            Add screenshots
            <input type="file" accept="image/*" multiple className="sr-only" onChange={onGallery} disabled={uploading} />
          </label>
        </div>
        {uploading && <p className="text-sm text-zinc-500">Uploading…</p>}
      </fieldset>

      {error && <p role="alert" className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-300">{error}</p>}

      <div className="mt-8 flex gap-3">
        <button type="submit" disabled={saving || uploading} className={`${btn} bg-zinc-950 px-6 py-3 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950`}>
          {saving ? "Saving…" : isNew ? "Add project" : "Save changes"}
        </button>
        <button type="button" onClick={onCancel} className={`${btn} text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800`}>Cancel</button>
      </div>
    </form>
  );
}
