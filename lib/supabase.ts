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