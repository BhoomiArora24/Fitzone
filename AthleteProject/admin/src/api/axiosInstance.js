import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Attach Auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fitzone_admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor: Automatically unwrap data & handle global errors
api.interceptors.response.use(
  (response) => {
    // Return backend payload directly (unwrapping Axios response wrapper)
    return response.data
  },
  (error) => {
    if (error.response) {
      const status = error.response.status
      const serverMessage = error.response.data?.message

      if (status === 401) {
        // Token expired or invalid
        localStorage.removeItem('fitzone_admin_token')
        console.warn('[API Auth Warning] 401 Unauthorized - Admin token cleared.')
      } else if (status === 403) {
        console.warn('[API Auth Warning] 403 Forbidden - Admin permissions required.')
      } else if (status === 404) {
        console.warn(`[API Warning] 404 Not Found: ${error.config?.url}`)
      } else if (status >= 500) {
        console.error('[API Server Error] Internal server error:', serverMessage)
      }

      const message = serverMessage || `Request failed with status code ${status}`
      return Promise.reject(new Error(message))
    }

    if (error.request) {
      console.warn('[API Network Error] Server appears offline or unreachable.')
      return Promise.reject(new Error('Network error: Server is unreachable. Please verify backend is running.'))
    }

    return Promise.reject(error)
  }
)

export default api

