import axios from 'axios'
import toast from 'react-hot-toast'

// Configure axios base URL based on environment
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://planner-wedding.onrender.com/api'
    : '/api') // In development, Vite proxy handles this

console.log('🔧 API URL:', API_URL) // Debug log

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60 seconds timeout for Render cold starts
  headers: {
    'Content-Type': 'application/json'
  }
})

// Track if we've shown the cold start message
let coldStartMessageShown = false

// Add request interceptor to include auth token and show cold start warning
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Show cold start message after 3 seconds for first request
    if (!coldStartMessageShown) {
      config.coldStartTimer = setTimeout(() => {
        toast.loading('⏳ Backend is starting up... This may take 30-60 seconds on first request.', {
          id: 'cold-start',
          duration: 10000
        })
        coldStartMessageShown = true
      }, 3000)
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Clear cold start timer on successful response
    if (response.config.coldStartTimer) {
      clearTimeout(response.config.coldStartTimer)
    }
    toast.dismiss('cold-start')
    return response
  },
  (error) => {
    // Clear cold start timer on error
    if (error.config?.coldStartTimer) {
      clearTimeout(error.config.coldStartTimer)
    }
    toast.dismiss('cold-start')
    
    // Handle specific errors
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      toast.error('Request timeout. Backend might be sleeping. Please try again.')
    } else if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    } else if (error.response?.status === 404) {
      toast.error('API endpoint not found. Backend may need to redeploy.')
    } else if (!error.response) {
      toast.error('Cannot connect to server. Please check your internet connection.')
    }
    
    return Promise.reject(error)
  }
)

export default axiosInstance
export { API_URL }
