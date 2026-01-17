-- Add processor column to existing hosting_plans table
-- Run this in Supabase SQL Editor if you already have data

-- Add processor column with default value 'intel'
ALTER TABLE hosting_plans 
ADD COLUMN IF NOT EXISTS processor TEXT DEFAULT 'intel';

-- Update existing plans to have processor type
UPDATE hosting_plans 
SET processor = 'intel' 
WHERE processor IS NULL;

-- Optional: Update specific plans to AMD if needed
-- UPDATE hosting_plans 
-- SET processor = 'amd' 
-- WHERE name LIKE '%EPYC%' OR name LIKE '%AMD%';