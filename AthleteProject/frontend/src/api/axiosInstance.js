import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// Create Axios client instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Attach JWT bearer token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fitzone_user_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor: Unwrap response data & handle errors gracefully
api.interceptors.response.use(
  (response) => {
    // Unwrap Axios data wrapper to return backend payload directly
    return response.data
  },
  (error) => {
    if (error.response) {
      const status = error.response.status
      const serverMessage = error.response.data?.message

      if (status === 401) {
        // Token expired or unauthorized: clear stored session
        localStorage.removeItem('fitzone_user_token')
        localStorage.removeItem('fitzone_user_info')
        console.warn('[FitZone Auth] 401 Unauthorized - User token expired or invalid.')
      } else if (status === 403) {
        console.warn('[FitZone Auth] 403 Forbidden - Access denied.')
      } else if (status === 404) {
        console.warn(`[FitZone API] 404 Not Found: ${error.config?.url}`)
      } else if (status >= 500) {
        console.error('[FitZone Server Error] Backend internal error:', serverMessage)
      }

      const message = serverMessage || `Request failed with status code ${status}`
      return Promise.reject(new Error(message))
    }

    if (error.request) {
      console.warn('[FitZone Network Error] Backend server appears offline or unreachable.')
      return Promise.reject(new Error('Network error: Unable to connect to FitZone server.'))
    }

    return Promise.reject(error)
  }
)

export default api

