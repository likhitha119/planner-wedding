import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/confirmation.css'

const BookingConfirmation = () => {
  const location = useLocation()
  const booking = location.state?.booking

  if (!booking) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-box">
          <h2>No booking information found</h2>
          <Link to="/checkout" className="btn-primary">Go to Checkout</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <div className="success-icon">
          <div className="checkmark-circle">
            <div className="checkmark">✓</div>
          </div>
        </div>

        <h1>🎉 Booking Confirmed!</h1>
        <p className="success-message">
          Thank you for choosing our wedding services. Your booking has been confirmed successfully!
        </p>

        <div className="booking-id-section">
          <span className="label">Booking ID</span>
          <span className="booking-id">{booking.id}</span>
        </div>

        <div className="confirmation-details">
          <div className="couple-names">
            <h2>💍 {booking.groom} & {booking.bride}</h2>
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <span className="icon">📅</span>
              <div>
                <span className="label">Wedding Date</span>
                <span className="value">{new Date(booking.date).toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>

            <div className="detail-card">
              <span className="icon">⏰</span>
              <div>
                <span className="label">Time</span>
                <span className="value">{booking.time}</span>
              </div>
            </div>

            <div className="detail-card">
              <span className="icon">📍</span>
              <div>
                <span className="label">Venue</span>
                <span className="value">{booking.venue.charAt(0).toUpperCase() + booking.venue.slice(1)}</span>
              </div>
            </div>

            <div className="detail-card">
              <span className="icon">👥</span>
              <div>
                <span className="label">Guests</span>
                <span className="value">{booking.guests} people</span>
              </div>
            </div>

            <div className="detail-card">
              <span className="icon">📦</span>
              <div>
                <span className="label">Package</span>
                <span className="value">{booking.package.charAt(0).toUpperCase() + booking.package.slice(1)}</span>
              </div>
            </div>

            <div className="detail-card">
              <span className="icon">💰</span>
              <div>
                <span className="label">Total Amount</span>
                <span className="value">₹{booking.totalAmount?.toLocaleString() || '3,00,000'}</span>
              </div>
            </div>
          </div>

          {booking.services && booking.services.length > 0 && (
            <div className="services-section">
              <h3>🎁 Additional Services</h3>
              <div className="services-tags">
                {booking.services.map((service, idx) => (
                  <span key={idx} className="service-tag">
                    {service.charAt(0).toUpperCase() + service.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="contact-info">
            <div className="contact-item">
              <span className="icon">📧</span>
              <span>{booking.email}</span>
            </div>
            <div className="contact-item">
              <span className="icon">📱</span>
              <span>{booking.phone}</span>
            </div>
          </div>

          <div className="transaction-info">
            <span className="label">Transaction ID:</span>
            <span className="transaction-id">{booking.transactionId}</span>
          </div>

          <div className="status-badge success">
            <span>✅</span> {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>

        <div className="next-steps">
          <h3>📋 What's Next?</h3>
          <ul>
            <li>✓ Confirmation email has been sent to {booking.email}</li>
            <li>✓ Our wedding planning team will contact you within 24 hours</li>
            <li>✓ You can track your booking status anytime</li>
            <li>✓ Feel free to reach out for any questions or modifications</li>
          </ul>
        </div>

        <div className="action-buttons">
          <Link to="/" className="btn-primary">Return to Home</Link>
          <button onClick={() => window.print()} className="btn-secondary">
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation
