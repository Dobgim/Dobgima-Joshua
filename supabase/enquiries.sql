-- Project enquiries from the contact page. Run after admin.sql.
-- Visitors can only INSERT; only admins (public.is_admin()) can read them
-- and update their status.

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) between 5 and 200),
  phone text check (char_length(phone) <= 40),
  project_type text not null check (char_length(project_type) <= 60),
  budget text not null check (char_length(budget) <= 60),
  description text not null check (char_length(description) between 20 and 3000),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'closed'))
);

alter table public.enquiries enable row level security;

revoke all on public.enquiries from anon, authenticated;
grant insert (name, email, phone, project_type, budget, description)
  on public.enquiries to anon;
grant select on public.enquiries to authenticated;
grant update (status) on public.enquiries to authenticated;
grant delete on public.enquiries to authenticated;

drop policy if exists "submit enquiry" on public.enquiries;
create policy "submit enquiry" on public.enquiries
  for insert to anon
  with check (status = 'new');

drop policy if exists "admins read enquiries" on public.enquiries;
create policy "admins read enquiries" on public.enquiries
  for select to authenticated
  using (public.is_admin());

drop policy if exists "admins update enquiries" on public.enquiries;
create policy "admins update enquiries" on public.enquiries
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins delete enquiries" on public.enquiries;
create policy "admins delete enquiries" on public.enquiries
  for delete to authenticated
  using (public.is_admin());
