import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error('Please fill in all fields')
      return
    }
    
    setIsSubmitting(true)
    const loadingToast = toast.loading('Logging in...')

    try {
      console.log('📤 Sending login to:', axios.defaults.baseURL)
      
      const response = await axios.post('/api/auth/login', formData)
      const { token, user } = response.data
      
      console.log('✅ Login successful:', user)
      toast.dismiss(loadingToast)
      
      login(token, user)
      toast.success(`Welcome back, ${user.fullname}!`)
      
      // Clear form
      setFormData({ username: '', password: '' })
      
      // Navigate after a short delay
      setTimeout(() => {
        navigate('/', { replace: true })
      }, 1000)
    } catch (error) {
      console.error('❌ Login error:', error)
      toast.dismiss(loadingToast)
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.errors?.[0]?.msg || 
                          error.message ||
                          'Login failed. Please check your credentials.'
      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              name="username"
              placeholder="Username or Email"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="submit"
            className="btn"
            value={isSubmitting ? "⏳ Logging in (may take 30-60s)..." : "Login"}
            disabled={isSubmitting}
            style={{ cursor: isSubmitting ? 'wait' : 'pointer' }}
          />
          {isSubmitting && (
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#888', marginTop: '10px' }}>
              💡 First request may take time if backend was sleeping...
            </p>
          )}
          <div>
            Don't have an Account? <Link to="/signup"><span>Signup Here</span></Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
