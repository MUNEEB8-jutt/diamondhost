-- Users table (for website login)
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment methods table (admin can edit)
CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  account_number TEXT,
  account_title TEXT,
  qr_code_url TEXT,
  icon TEXT,
  color_from TEXT DEFAULT 'blue-500',
  color_to TEXT DEFAULT 'cyan-500',
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  plan_price DECIMAL(10,2) NOT NULL,
  plan_ram TEXT,
  location TEXT,
  processor TEXT,
  payment_method TEXT NOT NULL,
  transaction_id TEXT,
  screenshot_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  panel_link TEXT,
  panel_password TEXT,
  panel_gmail TEXT,
  admin_notes TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Drop existing policies first (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can create user" ON users;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Anyone can read payment methods" ON payment_methods;
DROP POLICY IF EXISTS "Anyone can update payment methods" ON payment_methods;
DROP POLICY IF EXISTS "Anyone can insert payment methods" ON payment_methods;
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
DROP POLICY IF EXISTS "Anyone can read orders" ON orders;
DROP POLICY IF EXISTS "Anyone can update orders" ON orders;

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies for users
CREATE POLICY "Anyone can create user" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (true);

-- Policies for payment_methods
CREATE POLICY "Anyone can read payment methods" ON payment_methods FOR SELECT USING (true);
CREATE POLICY "Anyone can update payment methods" ON payment_methods FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert payment methods" ON payment_methods FOR INSERT WITH CHECK (true);

-- Policies for orders
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Anyone can update orders" ON orders FOR UPDATE USING (true);

-- Delete old payment methods and insert new ones
DELETE FROM payment_methods;
INSERT INTO payment_methods (name, account_number, account_title, icon, color_from, color_to, sort_order) VALUES
('Easypaisa', '', 'Diamond Host', '💳', 'green-500', 'emerald-600', 1),
('Bank Transfer', 'PK00ABCD0000001234567890', 'Diamond Host', '🏛️', 'blue-500', 'blue-600', 2),
('PayPal', 'diamondhost@email.com', 'Diamond Host', '🅿️', 'blue-600', 'indigo-600', 3),
('Crypto', 'wallet-address-here', 'BTC/ETH/USDT', '🪙', 'orange-500', 'amber-500', 4);

-- Create storage bucket for screenshots
-- Run this in Supabase dashboard: Storage > Create bucket > "order-screenshots" (public)
