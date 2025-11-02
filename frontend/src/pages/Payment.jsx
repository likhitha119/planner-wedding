import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import '../styles/payment.css'

const Payment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const bookingData = location.state?.bookingData
  const totalAmount = location.state?.totalAmount || 0

  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState('')
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
  })

  useEffect(() => {
    if (!bookingData) {
      toast.error('No booking data found. Redirecting to checkout...')
      navigate('/checkout', { replace: true })
    }
  }, [bookingData, navigate])

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
    // Reset wallet selection when switching away from wallet
    if (method !== 'wallet') {
      setSelectedWallet('')
    }
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target

    // Format card number with spaces
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
      if (value.length > 19) value = value.substr(0, 19)
    }

    // Format expiry date
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '')
      if (value.length >= 2) {
        value = value.substr(0, 2) + '/' + value.substr(2, 2)
      }
      if (value.length > 5) value = value.substr(0, 5)
    }

    // Format CVV
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').substr(0, 3)
    }

    console.log(`📝 Input changed: ${name} = ${value}`)
    setPaymentDetails(prev => ({ ...prev, [name]: value }))
  }

  const validatePayment = () => {
    if (paymentMethod === 'card') {
      const cardNum = paymentDetails.cardNumber.replace(/\s/g, '')
      if (cardNum.length !== 16) {
        toast.error('Card number must be 16 digits')
        return false
      }
      if (!paymentDetails.cardName.trim()) {
        toast.error('Cardholder name is required')
        return false
      }
      if (paymentDetails.expiryDate.length !== 5) {
        toast.error('Invalid expiry date format (MM/YY)')
        return false
      }
      if (paymentDetails.cvv.length !== 3) {
        toast.error('CVV must be 3 digits')
        return false
      }
    } else if (paymentMethod === 'upi') {
      if (!paymentDetails.upiId || paymentDetails.upiId.trim() === '') {
        toast.error('Please enter your UPI ID')
        return false
      }
      if (!paymentDetails.upiId.includes('@')) {
        toast.error('UPI ID must contain @ symbol (e.g., name@upi)')
        return false
      }
    } else if (paymentMethod === 'wallet') {
      if (!selectedWallet) {
        toast.error('Please select a wallet option')
        return false
      }
    }
    return true
  }

  const handlePayment = async () => {
    console.log('🔘 Pay button clicked!')
    console.log('💳 Payment method:', paymentMethod)
    console.log('📝 Payment details:', paymentDetails)
    
    if (!validatePayment()) {
      console.log('❌ Validation failed')
      return
    }
    
    console.log('✅ Validation passed')
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Submit booking with payment info
      const completeBookingData = {
        ...bookingData,
        paymentMethod,
        paymentDetails: paymentMethod === 'card' 
          ? { last4: paymentDetails.cardNumber.slice(-4) }
          : paymentMethod === 'upi'
          ? { upiId: paymentDetails.upiId }
          : { wallet: selectedWallet }
      }

      console.log('📤 Submitting booking:', completeBookingData)

      const response = await axios.post('/api/bookings', completeBookingData)
      
      console.log('✅ Booking response:', response.data)

      toast.success('Payment successful! 🎉')
      
      // Navigate to confirmation immediately
      navigate('/booking-confirmation', { 
        state: { booking: response.data.booking },
        replace: true
      })

    } catch (error) {
      console.error('Payment error:', error)
      const errorMessage = error.response?.data?.error || 'Payment failed. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!bookingData) {
    return (
      <div className="payment-container">
        <div className="payment-loading">
          <h2>Loading...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="payment-container">
      <div className="payment-wrapper">
        {/* Left Side - Payment Form */}
        <div className="payment-form-section">
          <div className="payment-header">
            <h1>💳 Secure Payment</h1>
            <div className="security-badge">
              <span>🔒</span> Secured by SSL
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="payment-methods">
            <h3>Select Payment Method</h3>
            <div className="method-tabs">
              <button 
                className={`method-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => handlePaymentMethodChange('card')}
              >
                <span>💳</span> Card
              </button>
              <button 
                className={`method-tab ${paymentMethod === 'upi' ? 'active' : ''}`}
                onClick={() => handlePaymentMethodChange('upi')}
              >
                <span>📱</span> UPI
              </button>
              <button 
                className={`method-tab ${paymentMethod === 'wallet' ? 'active' : ''}`}
                onClick={() => handlePaymentMethodChange('wallet')}
              >
                <span>👛</span> Wallet
              </button>
            </div>
          </div>

          {/* Card Payment Form */}
          {paymentMethod === 'card' && (
            <div className="payment-form">
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange}
                  maxLength="19"
                />
                <div className="card-icons">
                  <span>💳 Visa</span>
                  <span>💳 Mastercard</span>
                  <span>💳 RuPay</span>
                </div>
              </div>

              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  placeholder="Name on card"
                  value={paymentDetails.cardName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={paymentDetails.expiryDate}
                    onChange={handleInputChange}
                    maxLength="5"
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    placeholder="123"
                    value={paymentDetails.cvv}
                    onChange={handleInputChange}
                    maxLength="3"
                  />
                </div>
              </div>
            </div>
          )}

          {/* UPI Payment Form */}
          {paymentMethod === 'upi' && (
            <div className="payment-form">
              <div className="form-group">
                <label>UPI ID</label>
                <input
                  type="text"
                  name="upiId"
                  placeholder="yourname@upi"
                  value={paymentDetails.upiId}
                  onChange={handleInputChange}
                />
                <div className="upi-icons">
                  <span>📱 Google Pay</span>
                  <span>📱 PhonePe</span>
                  <span>📱 Paytm</span>
                </div>
              </div>
            </div>
          )}

          {/* Wallet Payment */}
          {paymentMethod === 'wallet' && (
            <div className="payment-form">
              <div className="wallet-options">
                <div className="wallet-option">
                  <input 
                    type="radio" 
                    name="wallet" 
                    id="paytm" 
                    checked={selectedWallet === 'paytm'}
                    onChange={() => setSelectedWallet('paytm')}
                  />
                  <label htmlFor="paytm">
                    <span>💙</span> Paytm Wallet
                  </label>
                </div>
                <div className="wallet-option">
                  <input 
                    type="radio" 
                    name="wallet" 
                    id="phonepe"
                    checked={selectedWallet === 'phonepe'}
                    onChange={() => setSelectedWallet('phonepe')}
                  />
                  <label htmlFor="phonepe">
                    <span>💜</span> PhonePe Wallet
                  </label>
                </div>
                <div className="wallet-option">
                  <input 
                    type="radio" 
                    name="wallet" 
                    id="amazon"
                    checked={selectedWallet === 'amazon'}
                    onChange={() => setSelectedWallet('amazon')}
                  />
                  <label htmlFor="amazon">
                    <span>🟠</span> Amazon Pay
                  </label>
                </div>
              </div>
            </div>
          )}

          <button 
            className="pay-button" 
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="spinner"></span> Processing...
              </>
            ) : (
              <>Pay ₹{totalAmount.toLocaleString()}</>
            )}
          </button>

          <div className="payment-footer">
            <p>🔒 Your payment information is secure and encrypted</p>
            <Link to="/checkout" className="back-link" style={{ display: 'block', textAlign: 'center', marginTop: '15px', color: '#666', textDecoration: 'none' }}>
              ← Back to Checkout
            </Link>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="order-summary-section">
          <div className="order-summary">
            <h3>Order Summary</h3>
            
            <div className="booking-details">
              <div className="couple-info">
                <h4>💍 Wedding Details</h4>
                <p><strong>{bookingData.groom}</strong> & <strong>{bookingData.bride}</strong></p>
              </div>

              <div className="detail-item">
                <span>📅 Date</span>
                <span>{new Date(bookingData.date).toLocaleDateString()}</span>
              </div>

              <div className="detail-item">
                <span>⏰ Time</span>
                <span>{bookingData.time}</span>
              </div>

              <div className="detail-item">
                <span>📍 Venue</span>
                <span>{bookingData.venue.charAt(0).toUpperCase() + bookingData.venue.slice(1)}</span>
              </div>

              <div className="detail-item">
                <span>👥 Guests</span>
                <span>{bookingData.guests}</span>
              </div>

              <div className="detail-item">
                <span>📦 Package</span>
                <span>{bookingData.package.charAt(0).toUpperCase() + bookingData.package.slice(1)}</span>
              </div>

              {bookingData.services && bookingData.services.length > 0 && (
                <div className="services-list">
                  <h5>Additional Services:</h5>
                  <ul>
                    {bookingData.services.map((service, idx) => (
                      <li key={idx}>✓ {service.charAt(0).toUpperCase() + service.slice(1)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="price-breakdown">
              <div className="price-item">
                <span>Subtotal</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="price-item">
                <span>Tax (included)</span>
                <span>-</span>
              </div>
              <div className="price-total">
                <span><strong>Total Amount</strong></span>
                <span><strong>₹{totalAmount.toLocaleString()}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
