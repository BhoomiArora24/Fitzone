import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi } from '../api/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('fitzone_user_token') || null
  })

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('fitzone_user_info')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const [loading, setLoading] = useState(Boolean(token))
  const [authError, setAuthError] = useState(null)

  // Validate or refresh current user profile on initial load if token is present
  useEffect(() => {
    let isMounted = true

    const verifySession = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await authApi.getMe()
        if (!isMounted) return
        const userData = res?.data?.user || res?.user
        if (userData) {
          setUser(userData)
          localStorage.setItem('fitzone_user_info', JSON.stringify(userData))
        }
      } catch (err) {
        console.warn('[FitZone Auth] Session expired or invalid:', err.message)
        if (isMounted) {
          setToken(null)
          setUser(null)
          localStorage.removeItem('fitzone_user_token')
          localStorage.removeItem('fitzone_user_info')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    verifySession()

    return () => {
      isMounted = false
    }
  }, [token])

  // Login handler
  const login = useCallback(async (email, password) => {
    setAuthError(null)
    try {
      const res = await authApi.login({ email, password })
      const payload = res?.data || res
      const authToken = payload.token
      const authUser = payload.user

      setToken(authToken)
      setUser(authUser)
      localStorage.setItem('fitzone_user_token', authToken)
      localStorage.setItem('fitzone_user_info', JSON.stringify(authUser))

      return { success: true, user: authUser }
    } catch (err) {
      setAuthError(err.message || 'Login failed')
      throw err
    }
  }, [])

  // Register handler
  const register = useCallback(async (formData) => {
    setAuthError(null)
    try {
      const res = await authApi.register(formData)
      const payload = res?.data || res
      const authToken = payload.token
      const authUser = payload.user

      setToken(authToken)
      setUser(authUser)
      localStorage.setItem('fitzone_user_token', authToken)
      localStorage.setItem('fitzone_user_info', JSON.stringify(authUser))

      return { success: true, user: authUser }
    } catch (err) {
      setAuthError(err.message || 'Registration failed')
      throw err
    }
  }, [])

  // Logout handler
  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch {
      // Ignore network errors during logout
    } finally {
      setToken(null)
      setUser(null)
      setAuthError(null)
      localStorage.removeItem('fitzone_user_token')
      localStorage.removeItem('fitzone_user_info')
    }
  }, [])

  // Update profile handler
  const updateProfile = useCallback(async (profileData) => {
    setAuthError(null)
    try {
      const res = await authApi.updateProfile(profileData)
      const updatedUser = res?.data?.user || res?.user
      if (updatedUser) {
        setUser(updatedUser)
        localStorage.setItem('fitzone_user_info', JSON.stringify(updatedUser))
      }
      return { success: true, user: updatedUser }
    } catch (err) {
      setAuthError(err.message || 'Update profile failed')
      throw err
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        loading,
        authError,
        login,
        register,
        logout,
        updateProfile,
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

export default AuthContext

