-- UNIFIED LOGIN SYSTEM - Support Tickets
-- This uses the main 'users' table from supabase-orders.sql
-- Run supabase-orders.sql FIRST to create the users table

-- STEP 1: Drop existing tables (if any)
DROP TABLE IF EXISTS ticket_messages CASCADE;
DROP TABLE IF EXISTS support_tickets CASCADE;
-- Note: support_users table is no longer needed, we use 'users' table

-- STEP 2: Create Support Tickets Table (references main users table)
CREATE TABLE support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id VARCHAR(20) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 3: Create Ticket Messages Table
CREATE TABLE ticket_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id VARCHAR(20) NOT NULL,
  sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('customer', 'admin')),
  sender_name VARCHAR(100) NOT NULL,
  message TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 4: Create Indexes
CREATE INDEX idx_tickets_user ON support_tickets(user_id);
CREATE INDEX idx_tickets_status ON support_tickets(status);
CREATE INDEX idx_tickets_created ON support_tickets(created_at DESC);
CREATE INDEX idx_messages_ticket ON ticket_messages(ticket_id);
CREATE INDEX idx_messages_created ON ticket_messages(created_at);

-- STEP 5: Enable Row Level Security
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_messages ENABLE ROW LEVEL SECURITY;

-- STEP 6: Create Policies (Allow all for now - adjust for production)
CREATE POLICY "Allow all on support_tickets" ON support_tickets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on ticket_messages" ON ticket_messages FOR ALL USING (true) WITH CHECK (true);

-- STEP 7: Enable Realtime (run this separately if it fails)
-- ALTER PUBLICATION supabase_realtime ADD TABLE ticket_messages;

-- =====================================================
-- STORAGE SETUP (Do this in Supabase Dashboard > Storage)
-- =====================================================
-- 1. Go to Storage section
-- 2. Create new bucket named: ticket-images
-- 3. Make it PUBLIC
-- 4. Add policy: Allow all operations for anonymous users

-- =====================================================
-- IMPORTANT: UNIFIED LOGIN SYSTEM
-- =====================================================
-- Now both Support and Orders use the same 'users' table
-- User registers once and can:
-- 1. Place orders
-- 2. Create support tickets
-- 3. View their game servers
-- All with the same login credentials!
