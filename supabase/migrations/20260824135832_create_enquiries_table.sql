/*
# Create enquiries table for contact form submissions

1. New Tables
- `enquiries`
  - `id` (uuid, primary key) — unique enquiry identifier
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — submitter's email address
  - `interest` (text) — what the visitor is interested in (city, plot size, listing)
  - `message` (text) — free-text message from the visitor
  - `user_agent` (text) — raw browser User-Agent string
  - `language` (text) — browser language preference (navigator.language)
  - `platform` (text) — browser platform string (navigator.platform)
  - `screen` (text) — screen dimensions, e.g. "1920x1080"
  - `viewport` (text) — viewport dimensions, e.g. "1366x768"
  - `timezone` (text) — IANA timezone from Intl.DateTimeFormat
  - `referrer` (text) — document.referrer value
  - `page_url` (text) — the page URL the form was submitted from
  - `submitted_at` (timestamptz, default now()) — when the enquiry was received

2. Security
- Enable RLS on `enquiries`.
- This is a no-auth marketing site. The contact form is public, so anon must
  be able to INSERT new enquiries. However, enquiries contain private customer
  data (names, emails, messages), so anon SELECT/UPDATE/DELETE are NOT granted —
  only authenticated service-role users (the site owner via Supabase Studio)
  can read or manage submissions.
- INSERT is open to anon + authenticated (WITH CHECK true) so the public form
  can submit. SELECT/UPDATE/DELETE are scoped to authenticated only with a
  USING(true) predicate — i.e. any signed-in dashboard user can manage them.
  This is acceptable because there is no per-user ownership concept for
  enquiries; access control is "can you sign in to the Supabase project?"

3. Important Notes
- No `user_id` column — no accounts in this app.
- The INSERT policy uses WITH CHECK (true) so any visitor can submit.
- SELECT is restricted to authenticated so customer data is not publicly
  exposed through the anon key.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  interest text,
  message text,
  user_agent text,
  language text,
  platform text,
  screen text,
  viewport text,
  timezone text,
  referrer text,
  page_url text,
  submitted_at timestamptz DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Public insert: anyone can submit an enquiry
DROP POLICY IF EXISTS "anon_insert_enquiries" ON enquiries;
CREATE POLICY "anon_insert_enquiries" ON enquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Authenticated-only read: site owner can view submissions in Supabase Studio
DROP POLICY IF EXISTS "auth_select_enquiries" ON enquiries;
CREATE POLICY "auth_select_enquiries" ON enquiries FOR SELECT
  TO authenticated USING (true);

-- Authenticated-only update: site owner can manage submissions
DROP POLICY IF EXISTS "auth_update_enquiries" ON enquiries;
CREATE POLICY "auth_update_enquiries" ON enquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Authenticated-only delete: site owner can remove submissions
DROP POLICY IF EXISTS "auth_delete_enquiries" ON enquiries;
CREATE POLICY "auth_delete_enquiries" ON enquiries FOR DELETE
  TO authenticated USING (true);
