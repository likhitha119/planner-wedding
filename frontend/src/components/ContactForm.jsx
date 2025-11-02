import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Client-side validation
    if (!formData.name.trim() || formData.name.length < 2) {
      toast.error('Name must be at least 2 characters')
      return
    }
    
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    
    if (!formData.number.trim() || formData.number.length < 10) {
      toast.error('Phone number must be at least 10 digits')
      return
    }
    
    if (!formData.subject.trim() || formData.subject.length < 3) {
      toast.error('Subject must be at least 3 characters')
      return
    }
    
    if (!formData.message.trim() || formData.message.length < 10) {
      toast.error('Message must be at least 10 characters')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await axios.post('/api/contact', formData)
      
      toast.success(response.data.message)
      console.log('✅ Contact form submitted successfully:', response.data.contact)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        number: '',
        subject: '',
        message: ''
      })
      
      // Show additional success info
      setTimeout(() => {
        toast.success(`Thank you ${response.data.contact.name}! We'll respond within 24 hours.`)
      }, 2000)
      
    } catch (error) {
      console.error('Contact form error:', error)
      
      if (error.response?.data?.errors) {
        // Handle validation errors
        const validationErrors = error.response.data.errors
        validationErrors.forEach(err => {
          toast.error(err.msg)
        })
      } else {
        const errorMessage = error.response?.data?.error || 'Failed to send message. Please try again.'
        toast.error(errorMessage)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact" id="contact">
      <h1 className="heading"><span>contact</span> us</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputBox">
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputBox">
          <input
            type="tel"
            name="number"
            placeholder="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          name="message"
          placeholder="your message"
          cols="30"
          rows="10"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="submit"
          value={isSubmitting ? "Sending..." : "send message"}
          className="btn"
          disabled={isSubmitting}
        />
      </form>
    </section>
  )
}

export default ContactForm
