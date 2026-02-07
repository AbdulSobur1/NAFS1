-- Neon/Postgres schema for NAFS

CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  reference TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL,
  paystack_reference TEXT,
  paystack_access_code TEXT,
  data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verified_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS registrations_reference_idx
  ON registrations(reference);

CREATE INDEX IF NOT EXISTS registrations_category_idx
  ON registrations(category);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  school_name TEXT,
  registration_id TEXT,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
