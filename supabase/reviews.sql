-- Client reviews table. Run once in Supabase: Dashboard → SQL Editor → paste → Run.
-- Visitors can only INSERT pending reviews and only READ approved ones.
-- The reviewer's email is never readable through the public API.

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  company text check (char_length(company) <= 120),
  project text check (char_length(project) <= 120),
  rating smallint not null check (rating between 1 and 5),
  body text not null check (char_length(body) between 20 and 2000),
  email text not null check (char_length(email) <= 200),
  consent boolean not null check (consent),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected'))
);

alter table public.reviews enable row level security;

-- Column-level privileges: anon can't set status, and can't read email/status.
revoke all on public.reviews from anon, authenticated;
grant insert (name, company, project, rating, body, email, consent)
  on public.reviews to anon;
grant select (id, created_at, name, company, project, rating, body)
  on public.reviews to anon;

drop policy if exists "submit pending review" on public.reviews;
create policy "submit pending review" on public.reviews
  for insert to anon
  with check (status = 'pending');

drop policy if exists "read approved reviews" on public.reviews;
create policy "read approved reviews" on public.reviews
  for select to anon
  using (status = 'approved');

-- To approve a review: Table Editor → reviews → set status to 'approved'.
-- Or: update public.reviews set status = 'approved' where id = '<id>';
