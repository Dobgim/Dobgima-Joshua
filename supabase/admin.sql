-- Admin access for the reviews dashboard (/admin). Run after reviews.sql.
-- Only users listed in public.admins can read every review (including
-- emails), change a review's status or delete it.

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;
grant select on public.admins to authenticated;

drop policy if exists "admins can see their own row" on public.admins;
create policy "admins can see their own row" on public.admins
  for select to authenticated
  using (user_id = auth.uid());

-- SECURITY DEFINER so the check works inside RLS without exposing the table.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Admin privileges on reviews (column-level: only status can be changed).
grant select on public.reviews to authenticated;
grant update (status) on public.reviews to authenticated;
grant delete on public.reviews to authenticated;

drop policy if exists "admins read all reviews" on public.reviews;
create policy "admins read all reviews" on public.reviews
  for select to authenticated
  using (public.is_admin());

drop policy if exists "admins update reviews" on public.reviews;
create policy "admins update reviews" on public.reviews
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins delete reviews" on public.reviews;
create policy "admins delete reviews" on public.reviews
  for delete to authenticated
  using (public.is_admin());

-- Signed-in non-admins must still be able to read approved reviews.
drop policy if exists "read approved reviews (signed in)" on public.reviews;
create policy "read approved reviews (signed in)" on public.reviews
  for select to authenticated
  using (status = 'approved');

-- Add an admin (after the user exists in Authentication > Users):
-- insert into public.admins (user_id, email)
--   select id, email from auth.users where email = 'you@example.com';
