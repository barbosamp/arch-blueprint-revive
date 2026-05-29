-- ============================================================
-- BLACKBOX JIU-JITSU — Supabase Schema
-- Execute no SQL Editor do Supabase Dashboard
-- ============================================================

-- Tipos enumerados
create type user_role       as enum ('professor', 'aluno');
create type belt_type       as enum ('branca','cinza','amarela','laranja','verde','azul','roxa','marrom','preta');
create type payment_status  as enum ('pendente','pago','atrasado');
create type modality_type   as enum ('bjj-adultos','bjj-kids','defesa-pessoal','open-mat');

-- ── Planos ──────────────────────────────────────────────────
create table plans (
  id          uuid default gen_random_uuid() primary key,
  name        text        not null,
  price       numeric(10,2) not null default 0,
  frequency   text        not null default 'mensal',
  description text,
  active      boolean     not null default true,
  created_at  timestamptz not null default now()
);

-- ── Perfis (vinculados ao auth.users) ───────────────────────
create table profiles (
  id              uuid references auth.users(id) on delete cascade primary key,
  role            user_role   not null default 'aluno',
  name            text        not null default '',
  email           text        not null default '',
  phone           text,
  birth_date      date,
  belt            belt_type   not null default 'branca',
  stripes         int         not null default 0 check (stripes between 0 and 4),
  plan_id         uuid references plans(id) on delete set null,
  enrollment_date date,
  active          boolean     not null default true,
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── Horários ────────────────────────────────────────────────
create table schedules (
  id          uuid default gen_random_uuid() primary key,
  day_of_week int         not null check (day_of_week between 0 and 6),
  time        text        not null,
  duration    int         not null default 60,
  modality    modality_type not null,
  instructor  text,
  created_at  timestamptz not null default now()
);

-- ── Regras de Graduação ──────────────────────────────────────
create table graduation_rules (
  id           uuid default gen_random_uuid() primary key,
  from_belt    belt_type not null,
  to_belt      belt_type not null,
  min_months   int       not null default 12,
  min_classes  int       not null default 100,
  requirements text,
  notes        text,
  created_at   timestamptz not null default now()
);

-- ── Pagamentos ───────────────────────────────────────────────
create table payments (
  id          uuid default gen_random_uuid() primary key,
  student_id  uuid references profiles(id) on delete cascade not null,
  plan_id     uuid references plans(id) on delete set null,
  amount      numeric(10,2) not null,
  due_date    date          not null,
  paid_date   date,
  status      payment_status not null default 'pendente',
  notes       text,
  created_at  timestamptz not null default now()
);

-- ── Frequência / Presença ────────────────────────────────────
create table attendance (
  id          uuid default gen_random_uuid() primary key,
  student_id  uuid references profiles(id) on delete cascade not null,
  schedule_id uuid references schedules(id) on delete set null,
  date        date        not null default current_date,
  notes       text,
  created_at  timestamptz not null default now()
);

-- ── Trigger updated_at ──────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger profiles_updated_at before update on profiles
  for each row execute function set_updated_at();

-- ── Row Level Security ───────────────────────────────────────
alter table profiles         enable row level security;
alter table plans            enable row level security;
alter table schedules        enable row level security;
alter table graduation_rules enable row level security;
alter table payments         enable row level security;
alter table attendance       enable row level security;

-- Helper: é professor?
create or replace function is_professor()
returns boolean language sql security definer as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'professor'
  );
$$;

-- profiles
create policy "own_profile_select"  on profiles for select using (id = auth.uid() or is_professor());
create policy "own_profile_update"  on profiles for update using (id = auth.uid() or is_professor());
create policy "professor_insert"    on profiles for insert with check (is_professor());
create policy "professor_delete"    on profiles for delete using (is_professor());

-- plans — todos lêem, professor escreve
create policy "read_plans"          on plans for select using (true);
create policy "professor_plans"     on plans for all using (is_professor());

-- schedules — todos lêem, professor escreve
create policy "read_schedules"      on schedules for select using (true);
create policy "professor_schedules" on schedules for all using (is_professor());

-- graduation_rules — todos lêem, professor escreve
create policy "read_rules"          on graduation_rules for select using (true);
create policy "professor_rules"     on graduation_rules for all using (is_professor());

-- payments
create policy "own_payments"        on payments for select using (student_id = auth.uid() or is_professor());
create policy "professor_payments"  on payments for all using (is_professor());

-- attendance
create policy "own_attendance"      on attendance for select using (student_id = auth.uid() or is_professor());
create policy "professor_attendance" on attendance for all using (is_professor());

-- ── IMPORTANTE: configurações no Supabase Dashboard ─────────
-- 1. Authentication > Settings > "Confirm email" → DESATIVAR
--    (para que alunos criados pelo professor já possam logar)
-- 2. Authentication > Settings > "Enable email provider" → ATIVAR
--
-- ── Criar conta do professor ─────────────────────────────────
-- Após criar o usuário no Supabase Auth (Dashboard > Auth > Users),
-- execute o SQL abaixo substituindo o UUID e e-mail reais:
--
-- insert into profiles (id, role, name, email)
-- values ('<UUID_DO_PROFESSOR>', 'professor', 'Nome do Professor', 'prof@email.com');
