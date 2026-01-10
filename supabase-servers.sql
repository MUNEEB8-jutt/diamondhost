-- =============================================
-- USER SERVERS TABLE
-- Run this in Supabase SQL Editor
-- =============================================

-- User Servers Table (for tracking active/suspended servers)
CREATE TABLE IF NOT EXISTS user_servers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  server_id TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  order_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  plan_ram TEXT NOT NULL,
  location TEXT NOT NULL,
  processor TEXT NOT NULL,
  panel_link TEXT NOT NULL,
  panel_password TEXT NOT NULL,
  panel_gmail TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'renewal_required')),
  suspension_reason TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_servers ENABLE ROW LEVEL SECURITY;

-- Policies for user_servers
CREATE POLICY "Users can view their own servers" ON user_servers
  FOR SELECT USING (auth.uid()::text = user_id::text OR true);

CREATE POLICY "Anyone can view servers" ON user_servers
  FOR SELECT USING (true);

CREATE POLICY "Admin can insert servers" ON user_servers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can update servers" ON user_servers
  FOR UPDATE USING (true);

CREATE POLICY "Admin can delete servers" ON user_servers
  FOR DELETE USING (true);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_servers_user_id ON user_servers(user_id);
CREATE INDEX IF NOT EXISTS idx_user_servers_status ON user_servers(status);
CREATE INDEX IF NOT EXISTS idx_user_servers_order_id ON user_servers(order_id);

-- =============================================
-- NOTES:
-- Server statuses:
-- - active: Server is running normally
-- - suspended: Server has been suspended (various reasons)
-- - renewal_required: 1 month passed, needs renewal
--
-- suspension_reason can be:
-- - "renewal_required" - 1 month passed, go to support
-- - "suspended" - Server suspended by admin
-- - Custom reason entered by admin
-- =============================================


-- =============================================
-- ADD BAN FIELDS TO USERS TABLE
-- Run this after the main setup
-- =============================================

-- Add ban columns to users table (if not exists)
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS ban_reason TEXT;
