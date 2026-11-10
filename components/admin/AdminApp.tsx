"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

type Status = "pending" | "approved" | "rejected";

interface AdminReview {
  id: string;
  created_at: string;
  name: string;
  company: string | null;
  project: string | null;
  rating: number;
  body: string;
  email: string;
  consent: boolean;
  status: Status;
}

const input =
  "mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-900 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600/30 sm:text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";
const btn =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50";

/* ───────────────────────── Root ───────────────────────── */

export default function AdminApp() {
  const supabase = getSupabaseBrowser();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    supabase.rpc("is_admin").then(({ data, error }) => setIsAdmin(!error && data === true));
  }, [session, supabase]);

  if (!ready) return <p className="py-20 text-center text-zinc-500">Loading…</p>;
  if (!session) return <LoginForm />;
  if (isAdmin === null) return <p className="py-20 text-center text-zinc-500">Checking access…</p>;
  if (!isAdmin)
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <h2 className="text-xl font-semibold">No admin access</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {session.user.email} is signed in but is not an admin.
        </p>
        <button onClick={() => supabase.auth.signOut()} className={`${btn} mt-6 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950`}>
          Sign out
        </button>
      </div>
    );
  return <Dashboard session={session} />;
}

/* ───────────────────────── Login ───────────────────────── */

function LoginForm() {
  const supabase = getSupabaseBrowser();
  const [mode, setMode] = useState<"password" | "link">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "error" | "ok"; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    if (mode === "password") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error)
        setMessage({
          kind: "error",
          text:
            error.message === "Invalid login credentials"
              ? "Wrong email or password. If you have not set a password yet, use “Email me a sign-in link”."
              : error.message,
        });
    } else {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/admin` },
      });
      setMessage(
        error
          ? { kind: "error", text: error.message }
          : { kind: "ok", text: "Check your inbox for a sign-in link. It opens this dashboard." },
      );
    }
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-sm py-12">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Admin sign in</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">Manage client reviews for dobgimajoshua.dev.</p>

      <div role="tablist" className="mt-8 grid grid-cols-2 rounded-lg bg-zinc-100 p-1 text-sm font-semibold dark:bg-zinc-800">
        {(["password", "link"] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => { setMode(m); setMessage(null); }}
            className={`rounded-md py-2 transition-colors ${mode === m ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-950 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}
          >
            {m === "password" ? "Password" : "Email me a sign-in link"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="admin-email" className="text-sm font-medium">Email</label>
          <input id="admin-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
        </div>
        {mode === "password" && (
          <div>
            <label htmlFor="admin-password" className="text-sm font-medium">Password</label>
            <input id="admin-password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
          </div>
        )}
        {message && (
          <p role={message.kind === "error" ? "alert" : "status"} className={`rounded-lg p-3 text-sm ${message.kind === "error" ? "bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300" : "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"}`}>
            {message.text}
          </p>
        )}
        <button type="submit" disabled={busy} className={`${btn} w-full bg-zinc-950 py-3 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950`}>
          {busy ? "Please wait…" : mode === "password" ? "Sign in" : "Send sign-in link"}
        </button>
      </form>
    </div>
  );
}

/* ───────────────────────── Dashboard ───────────────────────── */

function Dashboard({ session }: { session: Session }) {
  const supabase = getSupabaseBrowser();
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Status | "all">("pending");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (error) setError(error.message);
    else { setReviews(data as AdminReview[]); setError(null); }
    setLoading(false);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const counts = useMemo(() => {
    const c = { pending: 0, approved: 0, rejected: 0, all: reviews.length };
    for (const r of reviews) c[r.status]++;
    return c;
  }, [reviews]);

  const visible = tab === "all" ? reviews : reviews.filter((r) => r.status === tab);

  async function refreshPublicPages() {
    try {
      await fetch("/api/revalidate-reviews", { method: "POST", headers: { Authorization: `Bearer ${session.access_token}` } });
    } catch { /* pages still refresh on their own within 10 minutes */ }
  }

  async function setStatus(r: AdminReview, status: Status) {
    setBusyId(r.id);
    const { error } = await supabase.from("reviews").update({ status }).eq("id", r.id);
    if (error) setNotice(`Could not update: ${error.message}`);
    else {
      setReviews((list) => list.map((x) => (x.id === r.id ? { ...x, status } : x)));
      setNotice(status === "approved" ? `Approved ${r.name}'s review. It is now live on the site.` : `Marked ${r.name}'s review as ${status}.`);
      if (status === "approved" || r.status === "approved") await refreshPublicPages();
    }
    setBusyId(null);
  }

  async function remove(r: AdminReview) {
    if (!window.confirm(`Delete ${r.name}'s review permanently? This cannot be undone.`)) return;
    setBusyId(r.id);
    const { error } = await supabase.from("reviews").delete().eq("id", r.id);
    if (error) setNotice(`Could not delete: ${error.message}`);
    else {
      setReviews((list) => list.filter((x) => x.id !== r.id));
      setNotice(`Deleted ${r.name}'s review.`);
      if (r.status === "approved") await refreshPublicPages();
    }
    setBusyId(null);
  }

  const tabs: { key: Status | "all"; label: string }[] = [
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
    { key: "all", label: "All" },
  ];

  return (
    <div className="py-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-sky-700 dark:text-sky-400">Admin</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Client reviews</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Signed in as {session.user.email}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className={`${btn} border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800`}>Refresh</button>
          <button onClick={() => supabase.auth.signOut()} className={`${btn} bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950`}>Sign out</button>
        </div>
      </div>

      {/* Stats */}
      <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {tabs.map((t) => (
          <div key={t.key} className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
            <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{t.key === "all" ? "Total" : t.label}</dt>
            <dd className={`mt-1 text-3xl font-semibold ${t.key === "pending" && counts.pending > 0 ? "text-amber-600" : "text-zinc-950 dark:text-white"}`}>{counts[t.key]}</dd>
          </div>
        ))}
      </dl>

      {notice && (
        <p role="status" className="mt-6 flex items-start justify-between gap-4 rounded-lg bg-sky-50 p-3 text-sm text-sky-900 dark:bg-sky-950/50 dark:text-sky-200">
          {notice}
          <button onClick={() => setNotice(null)} aria-label="Dismiss" className="font-semibold">Close</button>
        </p>
      )}

      {/* Tabs */}
      <div role="tablist" aria-label="Filter reviews" className="mt-8 flex flex-wrap gap-2 border-b border-zinc-200 dark:border-zinc-800">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${tab === t.key ? "border-sky-700 text-sky-700 dark:border-sky-400 dark:text-sky-400" : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
          >
            {t.label} <span className="ml-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{counts[t.key]}</span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-6 space-y-4">
        {loading && <p className="py-10 text-center text-zinc-500">Loading reviews…</p>}
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
        {!loading && !error && visible.length === 0 && (
          <p className="rounded-2xl border border-dashed border-zinc-300 py-12 text-center text-zinc-500 dark:border-zinc-700">
            {tab === "pending" ? "No reviews waiting for approval." : "Nothing here yet."}
          </p>
        )}
        {visible.map((r) => (
          <article key={r.id} className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-zinc-950 dark:text-white">
                  {r.name}
                  {r.company && <span className="font-normal text-zinc-500 dark:text-zinc-400"> · {r.company}</span>}
                </p>
                <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                  <a href={`mailto:${r.email}`} className="underline-offset-4 hover:underline">{r.email}</a>
                  {r.project && <> · {r.project}</>} · {new Date(r.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span aria-label={`Rated ${r.rating} out of 5`} className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <svg key={n} aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={`h-4 w-4 ${n <= r.rating ? "text-amber-400" : "text-zinc-300 dark:text-zinc-700"}`}>
                      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5z" />
                    </svg>
                  ))}
                </span>
                <StatusBadge status={r.status} />
              </div>
            </div>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-zinc-700 dark:text-zinc-300">{r.body}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {r.status !== "approved" && (
                <button disabled={busyId === r.id} onClick={() => setStatus(r, "approved")} className={`${btn} bg-emerald-600 text-white hover:bg-emerald-700`}>Approve</button>
              )}
              {r.status !== "rejected" && (
                <button disabled={busyId === r.id} onClick={() => setStatus(r, "rejected")} className={`${btn} border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800`}>
                  {r.status === "approved" ? "Unpublish" : "Reject"}
                </button>
              )}
              {r.status !== "pending" && (
                <button disabled={busyId === r.id} onClick={() => setStatus(r, "pending")} className={`${btn} text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800`}>Move to pending</button>
              )}
              <button disabled={busyId === r.id} onClick={() => remove(r)} className={`${btn} ml-auto text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40`}>Delete</button>
            </div>
          </article>
        ))}
      </div>

      <AccountPanel />
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    rejected: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${styles[status]}`}>{status}</span>;
}

/* ───────────────────────── Account ───────────────────────── */

function AccountPanel() {
  const supabase = getSupabaseBrowser();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: "error" | "ok"; text: string } | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 10) return setMessage({ kind: "error", text: "Use at least 10 characters." });
    if (password !== confirm) return setMessage({ kind: "error", text: "The two passwords do not match." });
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setMessage(error ? { kind: "error", text: error.message } : { kind: "ok", text: "Password saved. You can now sign in with email and password." });
    if (!error) { setPassword(""); setConfirm(""); }
    setBusy(false);
  }

  return (
    <section aria-labelledby="account-heading" className="mt-14 border-t border-zinc-200 pt-10 dark:border-zinc-800">
      <h2 id="account-heading" className="text-xl font-semibold text-zinc-950 dark:text-white">Account password</h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Set or change the password you use to sign in to this dashboard.</p>
      <form onSubmit={save} className="mt-5 grid max-w-xl gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="new-password" className="text-sm font-medium">New password</label>
          <input id="new-password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
        </div>
        <div>
          <label htmlFor="confirm-password" className="text-sm font-medium">Confirm password</label>
          <input id="confirm-password" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={input} />
        </div>
        {message && (
          <p role={message.kind === "error" ? "alert" : "status"} className={`rounded-lg p-3 text-sm sm:col-span-2 ${message.kind === "error" ? "bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300" : "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"}`}>
            {message.text}
          </p>
        )}
        <div className="sm:col-span-2">
          <button type="submit" disabled={busy} className={`${btn} bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950`}>
            {busy ? "Saving…" : "Save password"}
          </button>
        </div>
      </form>
    </section>
  );
}
