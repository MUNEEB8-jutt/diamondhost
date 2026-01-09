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

// User Registration
export async function registerUser(email: string, password: string, name: string): Promise<{ user: SupportUser | null, error: string | null }> {
  const passwordHash = await hashPassword(password)
  
  const { data, error } = await supabase
    .from('support_users')
    .insert([{ email: email.toLowerCase(), password_hash: passwordHash, name }])
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

// User Login
export async function loginUser(email: string, password: string): Promise<{ user: SupportUser | null, error: string | null }> {
  const passwordHash = await hashPassword(password)
  
  const { data, error } = await supabase
    .from('support_users')
    .select('id, email, name, created_at')
    .eq('email', email.toLowerCase())
    .eq('password_hash', passwordHash)
    .single()
  
  if (error || !data) {
    return { user: null, error: 'Invalid email or password' }
  }
  return { user: data, error: null }
}

// Get user by ID
export async function getUserById(userId: string): Promise<SupportUser | null> {
  const { data, error } = await supabase
    .from('support_users')
    .select('id, email, name, created_at')
    .eq('id', userId)
    .single()
  
  if (error) return null
  return data
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

// Upload image to Supabase Storage
export async function uploadTicketImage(file: File, ticketId: string): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${ticketId}/${Date.now()}.${fileExt}`
  
  const { error } = await supabase.storage
    .from('ticket-images')
    .upload(fileName, file)
  
  if (error) {
    console.error('Upload error:', error)
    return null
  }
  
  const { data } = supabase.storage
    .from('ticket-images')
    .getPublicUrl(fileName)
  
  return data.publicUrl
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
