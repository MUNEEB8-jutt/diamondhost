import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface HostingPlan {
  id: string
  name: string
  icon: string
  ram: string
  performance: string
  location: string
  price: number
  currency: string
  color_from: string
  color_to: string
  features: string[]
  popular: boolean
  sort_order: number
  active: boolean
  created_at: string
}

export interface Location {
  id: string
  name: string
  code: string
  flag: string
  active: boolean
  sort_order: number
  created_at: string
}

// Location functions
export async function getLocations(): Promise<Location[]> {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching locations:', error)
    return []
  }
  return data || []
}

export async function getAllLocations(): Promise<Location[]> {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching locations:', error)
    return []
  }
  return data || []
}

export async function createLocation(location: Omit<Location, 'id' | 'created_at'>): Promise<Location | null> {
  const { data, error } = await supabase
    .from('locations')
    .insert([location])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating location:', error)
    return null
  }
  return data
}

export async function updateLocation(id: string, location: Partial<Location>): Promise<Location | null> {
  const { data, error } = await supabase
    .from('locations')
    .update(location)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating location:', error)
    return null
  }
  return data
}

export async function deleteLocation(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('locations')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting location:', error)
    return false
  }
  return true
}

// Plan functions
export async function getPlans(): Promise<HostingPlan[]> {
  const { data, error } = await supabase
    .from('hosting_plans')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching plans:', error)
    return []
  }
  return data || []
}

export async function getPlansByLocation(location: string): Promise<HostingPlan[]> {
  const { data, error } = await supabase
    .from('hosting_plans')
    .select('*')
    .eq('active', true)
    .eq('location', location)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching plans:', error)
    return []
  }
  return data || []
}

export async function getAllPlans(): Promise<HostingPlan[]> {
  const { data, error } = await supabase
    .from('hosting_plans')
    .select('*')
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching plans:', error)
    return []
  }
  return data || []
}

export async function createPlan(plan: Omit<HostingPlan, 'id' | 'created_at'>): Promise<HostingPlan | null> {
  const { data, error } = await supabase
    .from('hosting_plans')
    .insert([plan])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating plan:', error)
    return null
  }
  return data
}

export async function updatePlan(id: string, plan: Partial<HostingPlan>): Promise<HostingPlan | null> {
  const { data, error } = await supabase
    .from('hosting_plans')
    .update(plan)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating plan:', error)
    return null
  }
  return data
}

export async function deletePlan(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('hosting_plans')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting plan:', error)
    return false
  }
  return true
}


// EPYC Plan type
export interface EpycPlan {
  id: string
  name: string
  icon: string
  ram: string
  performance: string
  location: string
  price: number
  currency: string
  features: string[]
  popular: boolean
  sort_order: number
  active: boolean
  created_at: string
}

// EPYC Plan functions
export async function getEpycPlans(): Promise<EpycPlan[]> {
  const { data, error } = await supabase
    .from('epyc_plans')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching EPYC plans:', error)
    return []
  }
  return data || []
}

export async function getEpycPlansByLocation(location: string): Promise<EpycPlan[]> {
  const { data, error } = await supabase
    .from('epyc_plans')
    .select('*')
    .eq('active', true)
    .eq('location', location)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching EPYC plans:', error)
    return []
  }
  return data || []
}

export async function getAllEpycPlans(): Promise<EpycPlan[]> {
  const { data, error } = await supabase
    .from('epyc_plans')
    .select('*')
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching EPYC plans:', error)
    return []
  }
  return data || []
}

export async function createEpycPlan(plan: Omit<EpycPlan, 'id' | 'created_at'>): Promise<EpycPlan | null> {
  const { data, error } = await supabase
    .from('epyc_plans')
    .insert([plan])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating EPYC plan:', error)
    return null
  }
  return data
}

export async function updateEpycPlan(id: string, plan: Partial<EpycPlan>): Promise<EpycPlan | null> {
  const { data, error } = await supabase
    .from('epyc_plans')
    .update(plan)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating EPYC plan:', error)
    return null
  }
  return data
}

export async function deleteEpycPlan(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('epyc_plans')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting EPYC plan:', error)
    return false
  }
  return true
}


// Support Ticket Types
export interface SupportUser {
  id: string
  email: string
  name: string
  created_at: string
}

export interface SupportTicket {
  id: string
  ticket_id: string
  user_id: string
  customer_name: string
  customer_email: string
  subject: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  created_at: string
  updated_at: string
}

export interface TicketMessage {
  id: string
  ticket_id: string
  sender_type: 'customer' | 'admin'
  sender_name: string
  message: string | null
  image_url: string | null
  created_at: string
}

// Simple hash function for password (use bcrypt in production)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'diamondhost_salt')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Generate unique ticket ID
function generateTicketId(): string {
  return 'DH-' + Math.floor(10000 + Math.random() * 90000).toString()
}

// Create new ticket (with user)
export async function createTicket(userId: string, customerName: string, customerEmail: string, subject: string, initialMessage: string): Promise<{ ticket: SupportTicket | null, error: string | null }> {
  const ticketId = generateTicketId()
  
  const { data: ticket, error: ticketError } = await supabase
    .from('support_tickets')
    .insert([{
      ticket_id: ticketId,
      user_id: userId,
      customer_name: customerName,
      customer_email: customerEmail,
      subject: subject,
      status: 'open',
      priority: 'normal'
    }])
    .select()
    .single()
  
  if (ticketError) {
    return { ticket: null, error: ticketError.message }
  }

  await supabase
    .from('ticket_messages')
    .insert([{
      ticket_id: ticketId,
      sender_type: 'customer',
      sender_name: customerName,
      message: initialMessage
    }])

  return { ticket, error: null }
}

// Get tickets by user
export async function getUserTickets(userId: string): Promise<SupportTicket[]> {
  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
  
  if (error) return []
  return data || []
}

// Get ticket by ID
export async function getTicketById(ticketId: string): Promise<SupportTicket | null> {
  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .eq('ticket_id', ticketId)
    .single()
  
  if (error) return null
  return data
}

// Get all tickets (for admin)
export async function getAllTickets(): Promise<SupportTicket[]> {
  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) return []
  return data || []
}

// Get messages for a ticket
export async function getTicketMessages(ticketId: string): Promise<TicketMessage[]> {
  const { data, error } = await supabase
    .from('ticket_messages')
    .select('*')
    .eq('ticket_id', ticketId)
    .order('created_at', { ascending: true })
  
  if (error) return []
  return data || []
}

// Send message to ticket (with optional image)
export async function sendTicketMessage(ticketId: string, senderType: 'customer' | 'admin', senderName: string, message: string | null, imageUrl: string | null = null): Promise<TicketMessage | null> {
  const { data, error } = await supabase
    .from('ticket_messages')
    .insert([{
      ticket_id: ticketId,
      sender_type: senderType,
      sender_name: senderName,
      message: message,
      image_url: imageUrl
    }])
    .select()
    .single()
  
  if (error) return null

  await supabase
    .from('support_tickets')
    .update({ updated_at: new Date().toISOString() })
    .eq('ticket_id', ticketId)

  return data
}

// Upload file to Supabase Storage (images + documents)
export async function uploadTicketImage(file: File, ticketId: string): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'file'
    const fileName = `${ticketId}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
    
    // Determine content type
    const contentType = file.type || 'application/octet-stream'
    
    const { error: uploadError } = await supabase.storage
      .from('ticket-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: contentType
      })
    
    if (uploadError) {
      console.error('Upload error:', uploadError)
      // If bucket doesn't exist, try order-screenshots bucket as fallback
      if (uploadError.message?.includes('not found') || uploadError.message?.includes('Bucket')) {
        console.log('Trying fallback bucket: order-screenshots')
        const fallbackFileName = `ticket-images/${fileName}`
        const { error: fallbackError } = await supabase.storage
          .from('order-screenshots')
          .upload(fallbackFileName, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: contentType
          })
        
        if (fallbackError) {
          console.error('Fallback upload error:', fallbackError)
          return null
        }
        
        const { data: fallbackData } = supabase.storage
          .from('order-screenshots')
          .getPublicUrl(fallbackFileName)
        
        return fallbackData.publicUrl
      }
      return null
    }
    
    const { data } = supabase.storage
      .from('ticket-images')
      .getPublicUrl(fileName)
    
    return data.publicUrl
  } catch (err) {
    console.error('Upload exception:', err)
    return null
  }
}

// Update ticket status
export async function updateTicketStatus(ticketId: string, status: SupportTicket['status']): Promise<boolean> {
  const { error } = await supabase
    .from('support_tickets')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('ticket_id', ticketId)
  
  if (error) return false
  return true
}

// Subscribe to new messages (realtime)
export function subscribeToTicketMessages(ticketId: string, callback: (message: TicketMessage) => void) {
  return supabase
    .channel(`ticket-${ticketId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'ticket_messages',
      filter: `ticket_id=eq.${ticketId}`
    }, (payload) => {
      callback(payload.new as TicketMessage)
    })
    .subscribe()
}


// ==================== ORDER MANAGEMENT SYSTEM ====================

// Website User (for login/signup)
export interface WebUser {
  id: string
  email: string
  name: string
  password?: string
  created_at: string
}

// Payment Method
export interface PaymentMethod {
  id: string
  name: string
  account_number: string
  account_title: string
  qr_code_url: string | null
  icon: string
  color_from: string
  color_to: string
  active: boolean
  sort_order: number
  created_at: string
}

// Order
export interface Order {
  id: string
  order_id: string
  user_id: string
  user_name: string
  user_email: string
  plan_name: string
  plan_price: number
  plan_currency: string
  plan_ram: string
  location: string
  processor: string
  payment_method: string
  transaction_id: string | null
  screenshot_url: string | null
  status: 'pending' | 'approved' | 'rejected'
  panel_link: string | null
  panel_password: string | null
  panel_gmail: string | null
  admin_notes: string | null
  approved_at: string | null
  created_at: string
}

// Register website user
export async function registerWebUser(email: string, password: string, name: string): Promise<{ user: WebUser | null, error: string | null }> {
  const passwordHash = await hashPassword(password)
  
  const { data, error } = await supabase
    .from('users')
    .insert([{ email: email.toLowerCase(), password: passwordHash, name }])
    .select('id, email, name, created_at')
    .single()
  
  if (error) {
    if (error.code === '23505') {
      return { user: null, error: 'Email already registered' }
    }
    return { user: null, error: error.message }
  }
  return { user: data, error: null }
}

// Login website user
export async function loginWebUser(email: string, password: string): Promise<{ user: WebUser | null, error: string | null }> {
  const passwordHash = await hashPassword(password)
  
  const { data, error } = await supabase
    .from('users')
    .select('id, email, name, created_at')
    .eq('email', email.toLowerCase())
    .eq('password', passwordHash)
    .single()
  
  if (error || !data) {
    return { user: null, error: 'Invalid email or password' }
  }
  return { user: data, error: null }
}

// Get web user by ID
export async function getWebUserById(userId: string): Promise<WebUser | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, name, created_at')
    .eq('id', userId)
    .single()
  
  if (error) return null
  return data
}

// Get all payment methods
export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const { data, error } = await supabase
    .from('payment_methods')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching payment methods:', error)
    return []
  }
  return data || []
}

// Get all payment methods (admin)
export async function getAllPaymentMethods(): Promise<PaymentMethod[]> {
  const { data, error } = await supabase
    .from('payment_methods')
    .select('*')
    .order('sort_order', { ascending: true })
  
  if (error) return []
  return data || []
}

// Update payment method
export async function updatePaymentMethod(id: string, updates: Partial<PaymentMethod>): Promise<PaymentMethod | null> {
  const { data, error } = await supabase
    .from('payment_methods')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) return null
  return data
}

// Generate order ID
function generateOrderId(): string {
  return 'ORD-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase()
}

// Create order
export async function createOrder(orderData: {
  user_id: string
  user_name: string
  user_email: string
  plan_name: string
  plan_price: number
  plan_currency: string
  plan_ram: string
  location: string
  processor: string
  payment_method: string
  transaction_id?: string
  screenshot_url?: string
}): Promise<{ order: Order | null, error: string | null }> {
  const orderId = generateOrderId()
  
  const { data, error } = await supabase
    .from('orders')
    .insert([{
      order_id: orderId,
      ...orderData,
      status: 'pending'
    }])
    .select()
    .single()
  
  if (error) {
    return { order: null, error: error.message }
  }
  return { order: data, error: null }
}

// Get user orders
export async function getUserOrders(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) return []
  return data || []
}

// Get all orders (admin)
export async function getAllOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) return []
  return data || []
}

// Approve order (admin)
export async function approveOrder(orderId: string, panelLink: string, panelPassword: string, panelGmail: string): Promise<boolean> {
  const { error } = await supabase
    .from('orders')
    .update({
      status: 'approved',
      panel_link: panelLink,
      panel_password: panelPassword,
      panel_gmail: panelGmail,
      approved_at: new Date().toISOString()
    })
    .eq('order_id', orderId)
  
  if (error) return false
  return true
}

// Reject order (admin)
export async function rejectOrder(orderId: string, notes: string): Promise<boolean> {
  const { error } = await supabase
    .from('orders')
    .update({
      status: 'rejected',
      admin_notes: notes
    })
    .eq('order_id', orderId)
  
  if (error) return false
  return true
}

// Upload order screenshot
export async function uploadOrderScreenshot(file: File, orderId: string): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${orderId}/${Date.now()}.${fileExt}`
  
  const { error } = await supabase.storage
    .from('order-screenshots')
    .upload(fileName, file)
  
  if (error) {
    console.error('Upload error:', error)
    return null
  }
  
  const { data } = supabase.storage
    .from('order-screenshots')
    .getPublicUrl(fileName)
  
  return data.publicUrl
}

// Upload QR code for payment method
export async function uploadQRCode(file: File, methodId: string): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `qr-codes/${methodId}-${Date.now()}.${fileExt}`
  
  const { error } = await supabase.storage
    .from('order-screenshots')
    .upload(fileName, file)
  
  if (error) {
    console.error('Upload error:', error)
    return null
  }
  
  const { data } = supabase.storage
    .from('order-screenshots')
    .getPublicUrl(fileName)
  
  return data.publicUrl
}


// ==================== USER SERVERS MANAGEMENT ====================

// User Server type
export interface UserServer {
  id: string
  server_id: string
  user_id: string
  user_name: string
  user_email: string
  order_id: string
  plan_name: string
  plan_ram: string
  location: string
  processor: string
  panel_link: string
  panel_password: string
  panel_gmail: string
  status: 'active' | 'suspended' | 'renewal_required'
  suspension_reason: string | null
  expires_at: string | null
  created_at: string
  updated_at: string
}

// Generate server ID
function generateServerId(): string {
  return 'SRV-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase()
}

// Create server from approved order
export async function createServerFromOrder(order: Order): Promise<UserServer | null> {
  const serverId = generateServerId()
  
  // Calculate expiry date (1 month from now)
  const expiresAt = new Date()
  expiresAt.setMonth(expiresAt.getMonth() + 1)
  
  const { data, error } = await supabase
    .from('user_servers')
    .insert([{
      server_id: serverId,
      user_id: order.user_id,
      user_name: order.user_name,
      user_email: order.user_email,
      order_id: order.order_id,
      plan_name: order.plan_name,
      plan_ram: order.plan_ram,
      location: order.location,
      processor: order.processor,
      panel_link: order.panel_link,
      panel_password: order.panel_password,
      panel_gmail: order.panel_gmail,
      status: 'active',
      expires_at: expiresAt.toISOString()
    }])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating server:', error)
    return null
  }
  return data
}

// Get all servers (admin)
export async function getAllServers(): Promise<UserServer[]> {
  const { data, error } = await supabase
    .from('user_servers')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching servers:', error)
    return []
  }
  return data || []
}

// Get user's servers
export async function getUserServers(userId: string): Promise<UserServer[]> {
  const { data, error } = await supabase
    .from('user_servers')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching user servers:', error)
    return []
  }
  return data || []
}

// Suspend server
export async function suspendServer(serverId: string, reason: string): Promise<boolean> {
  const { error } = await supabase
    .from('user_servers')
    .update({
      status: 'suspended',
      suspension_reason: reason,
      updated_at: new Date().toISOString()
    })
    .eq('server_id', serverId)
  
  if (error) {
    console.error('Error suspending server:', error)
    return false
  }
  return true
}

// Mark server for renewal
export async function markServerForRenewal(serverId: string): Promise<boolean> {
  const { error } = await supabase
    .from('user_servers')
    .update({
      status: 'renewal_required',
      suspension_reason: 'Your subscription has expired. Please renew via Support.',
      updated_at: new Date().toISOString()
    })
    .eq('server_id', serverId)
  
  if (error) {
    console.error('Error marking server for renewal:', error)
    return false
  }
  return true
}

// Reactivate server
export async function reactivateServer(serverId: string): Promise<boolean> {
  // Calculate new expiry date (1 month from now)
  const expiresAt = new Date()
  expiresAt.setMonth(expiresAt.getMonth() + 1)
  
  const { error } = await supabase
    .from('user_servers')
    .update({
      status: 'active',
      suspension_reason: null,
      expires_at: expiresAt.toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('server_id', serverId)
  
  if (error) {
    console.error('Error reactivating server:', error)
    return false
  }
  return true
}

// Delete server
export async function deleteServer(serverId: string): Promise<boolean> {
  const { error } = await supabase
    .from('user_servers')
    .delete()
    .eq('server_id', serverId)
  
  if (error) {
    console.error('Error deleting server:', error)
    return false
  }
  return true
}

// Update server details
export async function updateServer(serverId: string, updates: Partial<UserServer>): Promise<UserServer | null> {
  const { data, error } = await supabase
    .from('user_servers')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('server_id', serverId)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating server:', error)
    return null
  }
  return data
}


// ==================== USER MANAGEMENT (ADMIN) ====================

// Extended User type with ban status
export interface AdminUser {
  id: string
  email: string
  name: string
  is_banned: boolean
  ban_reason: string | null
  created_at: string
}

// Get all users (admin)
export async function getAllUsers(): Promise<AdminUser[]> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, name, is_banned, ban_reason, created_at')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching users:', error)
    return []
  }
  return data || []
}

// Ban user
export async function banUser(userId: string, reason: string): Promise<boolean> {
  const { error } = await supabase
    .from('users')
    .update({
      is_banned: true,
      ban_reason: reason
    })
    .eq('id', userId)
  
  if (error) {
    console.error('Error banning user:', error)
    return false
  }
  return true
}

// Unban user
export async function unbanUser(userId: string): Promise<boolean> {
  const { error } = await supabase
    .from('users')
    .update({
      is_banned: false,
      ban_reason: null
    })
    .eq('id', userId)
  
  if (error) {
    console.error('Error unbanning user:', error)
    return false
  }
  return true
}

// Get user's servers (for admin view)
export async function getServersByUserId(userId: string): Promise<UserServer[]> {
  const { data, error } = await supabase
    .from('user_servers')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching user servers:', error)
    return []
  }
  return data || []
}

// Get user's orders (for admin view)
export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching user orders:', error)
    return []
  }
  return data || []
}
