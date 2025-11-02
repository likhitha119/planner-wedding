import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
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

    try {
      const response = await axios.post('/api/auth/login', formData)
      const { token, user } = response.data
      
      login(token, user)
      toast.success(`Welcome back, ${user.fullname}!`)
      
      // Navigate immediately after login
      navigate('/', { replace: true })
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.errors?.[0]?.msg || 
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
            value={isSubmitting ? "Logging in..." : "Login"}
            disabled={isSubmitting}
          />
          <div>
            Don't have an Account? <Link to="/signup"><span>Signup Here</span></Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
