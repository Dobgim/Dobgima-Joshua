-- Portfolio projects, managed from /admin. Run after admin.sql.
-- Anyone can read published projects; only admins (public.is_admin())
-- can add, edit, hide or delete them.

create table if not exists public.projects (
  slug text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 2 and 120),
  tagline text not null default '',
  role text not null default '',
  kind text check (kind in ('Own product', 'Co-founded startup', 'Client project', 'Personal project', 'Demo')),
  live_url text,
  live_url_note text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 100,
  schema_type text not null default 'SoftwareApplication'
    check (schema_type in ('SoftwareApplication', 'CreativeWork')),
  application_category text,
  tech_stack text[] not null default '{}',
  problem text not null default '',
  what_i_built text not null default '',
  my_role text not null default '',
  key_features text[] not null default '{}',
  result text not null default '',
  screenshot text,
  gallery jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

revoke all on public.projects from anon, authenticated;
grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;

drop policy if exists "read published projects" on public.projects;
create policy "read published projects" on public.projects
  for select to anon, authenticated
  using (published or public.is_admin());

drop policy if exists "admins insert projects" on public.projects;
create policy "admins insert projects" on public.projects
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admins update projects" on public.projects;
create policy "admins update projects" on public.projects
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete projects" on public.projects;
create policy "admins delete projects" on public.projects
  for delete to authenticated using (public.is_admin());

create or replace function public.touch_projects_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at before update on public.projects
  for each row execute function public.touch_projects_updated_at();

-- Screenshot storage: public to view, admins only to upload or delete.
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do update set public = true;

drop policy if exists "admins upload project images" on storage.objects;
create policy "admins upload project images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "admins update project images" on storage.objects;
create policy "admins update project images" on storage.objects
  for update to authenticated
  using (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "admins delete project images" on storage.objects;
create policy "admins delete project images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'project-images' and public.is_admin());
