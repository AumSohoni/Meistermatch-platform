-- Migration script to add guest job fields to the existing jobs table
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS customer_phone TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS customer_whatsapp TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS customer_telegram TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS customer_email TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS preferred_time TEXT;

-- Note: The `is_verified` column in the `profiles` table is already present and will be used as the `approved` boolean.
