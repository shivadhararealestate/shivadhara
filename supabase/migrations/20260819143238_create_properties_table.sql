/*
# Create properties table for the featured listings carousel

1. New Tables
- `properties`
  - `id` (int, primary key) — stable identifier used by the carousel
  - `location` (text, not null) — place where the property is situated
  - `area` (text, not null) — size of the property in sq. yard (kept as text so values like "240" render cleanly)
  - `instagram` (text, not null) — link to the Instagram post for the property
  - `dimensions` (text, not null) — plot dimensions, e.g. "40 x 60"
  - `created_at` (timestamptz, default now()) — row creation timestamp

2. Security
- Enable RLS on `properties`.
- This is a single-tenant marketing site with no sign-in screen, so the
  carousel data is intentionally public. Allow anon + authenticated to read.
  Writes are also open to anon + authenticated so the site owner can manage
  listings through the Supabase studio or a future admin screen.

3. Important Notes
- No `user_id` column or `auth.uid()` checks because there are no accounts.
- `USING (true)` is intentional: the data is shared/public marketing content.
*/

CREATE TABLE IF NOT EXISTS properties (
  id integer PRIMARY KEY,
  location text NOT NULL,
  area text NOT NULL,
  instagram text NOT NULL,
  dimensions text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_properties" ON properties;
CREATE POLICY "anon_select_properties" ON properties FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_properties" ON properties;
CREATE POLICY "anon_insert_properties" ON properties FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_properties" ON properties;
CREATE POLICY "anon_update_properties" ON properties FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_properties" ON properties;
CREATE POLICY "anon_delete_properties" ON properties FOR DELETE
  TO anon, authenticated USING (true);
