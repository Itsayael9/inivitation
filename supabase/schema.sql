-- RSVP table for the wedding invitation
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  guests smallint not null default 1 check (guests between 1 and 10),
  attending boolean not null default true,
  message text,
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;

-- Guests may only insert their RSVP (no reads with the anon key)
create policy "allow anonymous rsvp inserts"
  on public.rsvps for insert
  to anon
  with check (true);
