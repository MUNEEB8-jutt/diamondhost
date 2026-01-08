-- Diamond Host Database Setup
-- Run this FRESH in your Supabase SQL Editor

-- Drop existing tables if exists (fresh start)
DROP TABLE IF EXISTS hosting_plans;
DROP TABLE IF EXISTS epyc_plans;
DROP TABLE IF EXISTS locations;

-- Create locations table
CREATE TABLE locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  flag TEXT DEFAULT '🌍',
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hosting_plans table (Intel Platinum)
CREATE TABLE hosting_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT DEFAULT 'Star',
  ram TEXT NOT NULL,
  performance TEXT NOT NULL,
  location TEXT DEFAULT 'UAE',
  price INTEGER NOT NULL,
  currency TEXT DEFAULT 'PKR',
  color_from TEXT DEFAULT 'blue-400',
  color_to TEXT DEFAULT 'cyan-600',
  features TEXT[] DEFAULT ARRAY['24/7 Support', 'DDoS Protection', 'Instant Setup'],
  popular BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create epyc_plans table (AMD EPYC)
CREATE TABLE epyc_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT DEFAULT 'Cpu',
  ram TEXT NOT NULL,
  performance TEXT NOT NULL,
  location TEXT DEFAULT 'UAE',
  price INTEGER NOT NULL,
  currency TEXT DEFAULT 'PKR',
  features TEXT[] DEFAULT ARRAY['24/7 Support', 'AMD EPYC', 'Instant Setup'],
  popular BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hosting_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE epyc_plans ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Public read hosting_plans" ON hosting_plans FOR SELECT USING (true);
CREATE POLICY "Public read epyc_plans" ON epyc_plans FOR SELECT USING (true);

-- Allow all operations
CREATE POLICY "Full access locations" ON locations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access hosting_plans" ON hosting_plans FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access epyc_plans" ON epyc_plans FOR ALL USING (true) WITH CHECK (true);

-- Insert default locations
INSERT INTO locations (name, code, flag, active, sort_order) VALUES
('UAE', 'UAE', '🇦🇪', true, 1),
('Singapore', 'Singapore', '🇸🇬', true, 2),
('Germany', 'Germany', '🇩🇪', true, 3);

-- Insert Intel Platinum plans (UAE)
INSERT INTO hosting_plans (name, icon, ram, performance, location, price, currency, features, popular, sort_order, active) VALUES
('Bronze Plan', 'Medal', '2GB RAM', '100%', 'UAE', 240, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Instant Setup'], false, 1, true),
('Silver Plan', 'Star', '4GB RAM', '150%', 'UAE', 480, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Instant Setup'], false, 2, true),
('Gold Plan', 'Crown', '8GB RAM', '250%', 'UAE', 960, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Instant Setup'], false, 3, true),
('Platinum Plan', 'Award', '10GB RAM', '300%', 'UAE', 1200, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], true, 4, true),
('Diamond Plan', 'Diamond', '12GB RAM', '350%', 'UAE', 1440, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], false, 5, true),
('Emerald Plan', 'Gem', '16GB RAM', '500%', 'UAE', 1920, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], false, 6, true),
('Nether Plan', 'Nether', '22GB RAM', '700%', 'UAE', 2640, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], false, 7, true),
('Ender Plan', 'Ender', '32GB RAM', '900%', 'UAE', 3840, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], false, 8, true),
('Diamond Plus Plan', 'Trophy', '48GB RAM', '1200%', 'UAE', 5760, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Custom Plans'], false, 9, true);

-- Insert Intel Platinum plans (Singapore)
INSERT INTO hosting_plans (name, icon, ram, performance, location, price, currency, features, popular, sort_order, active) VALUES
('Bronze Plan', 'Medal', '2GB RAM', '100%', 'Singapore', 240, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Instant Setup'], false, 1, true),
('Silver Plan', 'Star', '4GB RAM', '150%', 'Singapore', 480, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Instant Setup'], false, 2, true),
('Gold Plan', 'Crown', '8GB RAM', '250%', 'Singapore', 960, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Instant Setup'], false, 3, true),
('Platinum Plan', 'Award', '10GB RAM', '300%', 'Singapore', 1200, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], true, 4, true),
('Diamond Plan', 'Diamond', '12GB RAM', '350%', 'Singapore', 1440, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], false, 5, true),
('Emerald Plan', 'Gem', '16GB RAM', '500%', 'Singapore', 1920, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], false, 6, true),
('Nether Plan', 'Nether', '22GB RAM', '700%', 'Singapore', 2640, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], false, 7, true),
('Ender Plan', 'Ender', '32GB RAM', '900%', 'Singapore', 3840, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], false, 8, true),
('Diamond Plus Plan', 'Trophy', '48GB RAM', '1200%', 'Singapore', 5760, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Custom Plans'], false, 9, true);

-- Insert Intel Platinum plans (Germany)
INSERT INTO hosting_plans (name, icon, ram, performance, location, price, currency, features, popular, sort_order, active) VALUES
('Bronze Plan', 'Medal', '2GB RAM', '100%', 'Germany', 240, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Instant Setup'], false, 1, true),
('Silver Plan', 'Star', '4GB RAM', '150%', 'Germany', 480, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Instant Setup'], false, 2, true),
('Gold Plan', 'Crown', '8GB RAM', '250%', 'Germany', 960, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Instant Setup'], false, 3, true),
('Platinum Plan', 'Award', '10GB RAM', '300%', 'Germany', 1200, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], true, 4, true),
('Diamond Plan', 'Diamond', '12GB RAM', '350%', 'Germany', 1440, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], false, 5, true),
('Emerald Plan', 'Gem', '16GB RAM', '500%', 'Germany', 1920, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], false, 6, true),
('Nether Plan', 'Nether', '22GB RAM', '700%', 'Germany', 2640, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], false, 7, true),
('Ender Plan', 'Ender', '32GB RAM', '900%', 'Germany', 3840, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Priority Support'], false, 8, true),
('Diamond Plus Plan', 'Trophy', '48GB RAM', '1200%', 'Germany', 5760, 'PKR', ARRAY['24/7 Support', 'Intel Platinum', 'Custom Plans'], false, 9, true);

-- Insert AMD EPYC plans (UAE only for now)
INSERT INTO epyc_plans (name, icon, ram, performance, location, price, currency, features, popular, sort_order, active) VALUES
('EPYC Bronze', 'Cpu', '2GB RAM', '150%', 'UAE', 319, 'PKR', ARRAY['24/7 Support', 'AMD EPYC', 'Instant Setup'], false, 1, true),
('EPYC Silver', 'Cpu', '4GB RAM', '200%', 'UAE', 599, 'PKR', ARRAY['24/7 Support', 'AMD EPYC', 'Instant Setup'], false, 2, true),
('EPYC Gold', 'Cpu', '8GB RAM', '300%', 'UAE', 1199, 'PKR', ARRAY['24/7 Support', 'AMD EPYC', 'Instant Setup'], false, 3, true),
('EPYC Platinum', 'Cpu', '12GB RAM', '400%', 'UAE', 1899, 'PKR', ARRAY['24/7 Support', 'AMD EPYC', 'Priority Support'], true, 4, true),
('EPYC Diamond', 'Cpu', '16GB RAM', '500%', 'UAE', 2499, 'PKR', ARRAY['24/7 Support', 'AMD EPYC', 'Priority Support'], false, 5, true),
('EPYC Ultimate', 'Cpu', '32GB RAM', '1000%', 'UAE', 4499, 'PKR', ARRAY['24/7 Support', 'AMD EPYC', 'Custom Plans'], false, 6, true);

-- Verify
SELECT 'Locations:' as info;
SELECT * FROM locations ORDER BY sort_order;
SELECT 'Intel Platinum Plans:' as info;
SELECT * FROM hosting_plans ORDER BY sort_order;
SELECT 'EPYC Plans:' as info;
SELECT * FROM epyc_plans ORDER BY sort_order;