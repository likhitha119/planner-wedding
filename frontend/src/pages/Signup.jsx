import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import toast from 'react-hot-toast'

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.fullname.trim() || !formData.email.trim() || 
        !formData.username.trim() || !formData.password.trim()) {
      toast.error('Please fill in all fields')
      return
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    setIsSubmitting(true)
    const loadingToast = toast.loading('Creating your account...')

    try {
      const { confirmPassword, ...submitData } = formData
      console.log('📤 Sending registration to:', axios.defaults.baseURL)
      
      const response = await axios.post('/api/auth/register', submitData)
      
      console.log('✅ Registration successful:', response.data)
      toast.dismiss(loadingToast)
      toast.success('Registration successful! Redirecting to login...')
      
      // Clear form
      setFormData({
        fullname: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      })
      
      // Navigate after a short delay
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 1000)
    } catch (error) {
      console.error('❌ Registration error:', error)
      toast.dismiss(loadingToast)
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.errors?.[0]?.msg || 
                          error.message ||
                          'Registration failed. Please try again.'
      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="text"
              name="username"
              placeholder="Username"
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
          <div className="textbox">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="submit"
            className="btn"
            value={isSubmitting ? "⏳ Creating account (may take 30-60s)..." : "Sign Up"}
            disabled={isSubmitting}
            style={{ cursor: isSubmitting ? 'wait' : 'pointer' }}
          />
          {isSubmitting && (
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#888', marginTop: '10px' }}>
              💡 First request may take time if backend was sleeping...
            </p>
          )}
          <div>
            Already have an Account? <Link to="/login">Login Here</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
