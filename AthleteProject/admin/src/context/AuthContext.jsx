import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Authentication state
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('fitzone_admin_user')
      return stored
        ? JSON.parse(stored)
        : { name: 'FitZone Admin', email: 'admin@fitzone.com', role: 'Super Admin' }
    } catch {
      return { name: 'FitZone Admin', email: 'admin@fitzone.com', role: 'Super Admin' }
    }
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('fitzone_admin_token') || null
  })

  const login = (userData, authToken) => {
    setUser(userData)
    setToken(authToken)
    localStorage.setItem('fitzone_admin_user', JSON.stringify(userData))
    localStorage.setItem('fitzone_admin_token', authToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('fitzone_admin_user')
    localStorage.removeItem('fitzone_admin_token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token || user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

