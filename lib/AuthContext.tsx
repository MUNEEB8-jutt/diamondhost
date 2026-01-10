'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { WebUser, getWebUserById, loginWebUser, registerWebUser } from './supabase'

interface AuthContextType {
  user: WebUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean, error: string | null }>
  register: (email: string, password: string, name: string) => Promise<{ success: boolean, error: string | null }>
  logout: () => void
  showAuthModal: boolean
  setShowAuthModal: (show: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<WebUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const savedUserId = localStorage.getItem('web_user_id')
      if (savedUserId) {
        const userData = await getWebUserById(savedUserId)
        if (userData) {
          setUser(userData)
        } else {
          localStorage.removeItem('web_user_id')
        }
      }
      setLoading(false)
    }
    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    const { user: loggedUser, error } = await loginWebUser(email, password)
    if (loggedUser) {
      localStorage.setItem('web_user_id', loggedUser.id)
      setUser(loggedUser)
      setShowAuthModal(false)
      return { success: true, error: null }
    }
    return { success: false, error: error || 'Login failed' }
  }

  const register = async (email: string, password: string, name: string) => {
    const { user: newUser, error } = await registerWebUser(email, password, name)
    if (newUser) {
      localStorage.setItem('web_user_id', newUser.id)
      setUser(newUser)
      setShowAuthModal(false)
      return { success: true, error: null }
    }
    return { success: false, error: error || 'Registration failed' }
  }

  const logout = () => {
    localStorage.removeItem('web_user_id')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, showAuthModal, setShowAuthModal }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
