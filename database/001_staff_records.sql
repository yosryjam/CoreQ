CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE SCHEMA IF NOT EXISTS workforce;
CREATE SCHEMA IF NOT EXISTS documents;
CREATE SCHEMA IF NOT EXISTS audit;

CREATE TABLE IF NOT EXISTS workforce.staff_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_number text UNIQUE NOT NULL,
  full_name text NOT NULL,
  profession text NOT NULL,
  role_title text NOT NULL,
  specialization text,
  employment_percentage numeric(5,2),
  start_date date,
  direct_manager_id uuid REFERENCES workforce.staff_members(id),
  status text NOT NULL DEFAULT 'ACTIVE',
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS documents.staff_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_member_id uuid NOT NULL REFERENCES workforce.staff_members(id),
  document_type text NOT NULL,
  issue_date date,
  expiry_date date,
  storage_key text,
  review_status text NOT NULL DEFAULT 'PENDING',
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workforce.onboarding_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_member_id uuid NOT NULL REFERENCES workforce.staff_members(id),
  category text NOT NULL,
  item_code text NOT NULL,
  title text NOT NULL,
  required boolean NOT NULL DEFAULT true,
  status text NOT NULL DEFAULT 'PENDING',
  completed_at timestamptz,
  completed_by uuid,
  UNIQUE(staff_member_id, item_code)
);

CREATE TABLE IF NOT EXISTS audit.audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  actor_id uuid,
  resource_type text NOT NULL,
  resource_id uuid,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
