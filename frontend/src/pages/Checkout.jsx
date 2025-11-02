import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import '../styles/checkout.css'

const Checkout = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    groom: '',
    bride: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    venue: '',
    package: '',
    services: []
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox' && name === 'services') {
      setFormData(prev => ({
        ...prev,
        services: checked 
          ? [...prev.services, value]
          : prev.services.filter(service => service !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const calculateTotalAmount = () => {
    let total = 0
    
    // Package pricing
    switch (formData.package) {
      case 'basic': total = 200000; break;
      case 'premium': total = 400000; break;
      case 'luxury': total = 800000; break;
      default: total = 0;
    }
    
    // Add service costs
    formData.services.forEach(service => {
      switch (service) {
        case 'catering': total += 50000; break;
        case 'photography': total += 30000; break;
        case 'music': total += 25000; break;
        case 'decor': total += 40000; break;
      }
    })
    
    return total
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Enhanced validation
    if (!formData.groom.trim() || formData.groom.length < 2) {
      toast.error('Groom name must be at least 2 characters')
      return
    }
    
    if (!formData.bride.trim() || formData.bride.length < 2) {
      toast.error('Bride name must be at least 2 characters')
      return
    }
    
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    
    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast.error('Phone number must be at least 10 digits')
      return
    }
    
    if (!formData.date) {
      toast.error('Please select a wedding date')
      return
    }
    
    // Check if date is in the future
    const selectedDate = new Date(formData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate < today) {
      toast.error('Wedding date must be in the future')
      return
    }
    
    if (!formData.time) {
      toast.error('Please select a wedding time')
      return
    }
    
    if (!formData.guests || formData.guests < 1) {
      toast.error('Number of guests must be at least 1')
      return
    }
    
    if (!formData.venue) {
      toast.error('Please select a venue')
      return
    }
    
    if (!formData.package) {
      toast.error('Please select a package')
      return
    }
    
    // Navigate to payment page with booking data
    const totalAmount = calculateTotalAmount()
    toast.success('Proceeding to payment...')
    
    // Navigate immediately to payment
    navigate('/payment', {
      state: {
        bookingData: formData,
        totalAmount
      },
      replace: false
    })
  }

  const totalAmount = calculateTotalAmount()

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <div className="checkout-header">
          <h1>💍 Wedding Booking</h1>
          <p>Fill in your details to book your perfect wedding</p>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <h2>👫 Couple Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Groom's Full Name</label>
                <input type="text" name="groom" value={formData.groom} onChange={handleChange} placeholder="Enter groom's name" required />
              </div>
              <div className="form-group">
                <label>Bride's Full Name</label>
                <input type="text" name="bride" value={formData.bride} onChange={handleChange} placeholder="Enter bride's name" required />
              </div>
              <div className="form-group">
                <label>Contact Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit number" required />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>📅 Event Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Wedding Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Ceremony Time</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Number of Guests</label>
                <input type="number" name="guests" min="50" max="500" value={formData.guests} onChange={handleChange} placeholder="50-500" required />
              </div>
              <div className="form-group">
                <label>Venue Type</label>
                <select name="venue" value={formData.venue} onChange={handleChange} required>
                  <option value="">Select Venue</option>
                  <option value="church">⛪ Church</option>
                  <option value="garden">🌳 Garden</option>
                  <option value="banquet">🏛️ Banquet Hall</option>
                  <option value="beach">🏖️ Beach</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>📦 Select Package</h2>
            <div className="package-options">
              <div 
                className={`package-card ${formData.package === 'basic' ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({...prev, package: 'basic'}))}
              >
                <div className="package-icon">🥉</div>
                <h3>Basic Package</h3>
                <p className="package-price">₹2,00,000</p>
                <p className="package-desc">Essential wedding planning services</p>
              </div>
              <div 
                className={`package-card ${formData.package === 'premium' ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({...prev, package: 'premium'}))}
              >
                <div className="package-icon">🥈</div>
                <h3>Premium Package</h3>
                <p className="package-price">₹4,00,000</p>
                <p className="package-desc">Enhanced wedding experience</p>
              </div>
              <div 
                className={`package-card ${formData.package === 'luxury' ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({...prev, package: 'luxury'}))}
              >
                <div className="package-icon">🥇</div>
                <h3>Luxury Package</h3>
                <p className="package-price">₹8,00,000</p>
                <p className="package-desc">Ultimate luxury experience</p>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>🎁 Additional Services</h2>
            <div className="services-grid">
              {[
                { value: 'catering', label: 'Catering', icon: '🍽️', price: '₹50,000' },
                { value: 'photography', label: 'Photography', icon: '📸', price: '₹30,000' },
                { value: 'music', label: 'Music', icon: '🎵', price: '₹25,000' },
                { value: 'decor', label: 'Decoration', icon: '🎨', price: '₹40,000' }
              ].map(service => (
                <label key={service.value} className={`service-card ${formData.services.includes(service.value) ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    name="services" 
                    value={service.value}
                    checked={formData.services.includes(service.value)}
                    onChange={handleChange}
                  />
                  <div className="service-content">
                    <span className="service-icon">{service.icon}</span>
                    <span className="service-label">{service.label}</span>
                    <span className="service-price">{service.price}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="checkout-summary">
            <h3>💰 Price Summary</h3>
            <div className="summary-item">
              <span>Package: {formData.package ? formData.package.charAt(0).toUpperCase() + formData.package.slice(1) : 'Not selected'}</span>
              <span>{formData.package ? `₹${(formData.package === 'basic' ? 200000 : formData.package === 'premium' ? 400000 : 800000).toLocaleString()}` : '₹0'}</span>
            </div>
            {formData.services.length > 0 && (
              <div className="summary-services">
                <p><strong>Additional Services:</strong></p>
                {formData.services.map(service => (
                  <div key={service} className="summary-item">
                    <span>{service.charAt(0).toUpperCase() + service.slice(1)}</span>
                    <span>₹{(service === 'catering' ? 50000 : service === 'photography' ? 30000 : service === 'music' ? 25000 : 40000).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="summary-total">
              <span>Total Amount</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <button type="submit" className="proceed-button">
            Proceed to Payment →
          </button>
        </form>
        
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  )
}

export default Checkout
