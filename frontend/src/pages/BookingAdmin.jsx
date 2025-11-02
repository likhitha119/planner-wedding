import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const BookingAdmin = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings/admin/all')
      setBookings(response.data.bookings)
      console.log('✅ Bookings loaded:', response.data.count, 'bookings')
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (bookingId, newStatus) => {
    try {
      await axios.patch(`/api/bookings/${bookingId}/status`, { status: newStatus })
      setBookings(bookings.map(booking => 
        booking.bookingId === bookingId ? { ...booking, status: newStatus } : booking
      ))
      toast.success(`Booking status updated to ${newStatus}`)
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatAmount = (amount) => {
    return `₹${amount?.toLocaleString() || '0'}`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffa500'
      case 'confirmed': return '#4aed88'
      case 'cancelled': return '#ff6b6b'
      case 'completed': return '#2ed573'
      default: return '#666'
    }
  }

  const getPackageColor = (pkg) => {
    switch (pkg) {
      case 'basic': return '#3498db'
      case 'premium': return '#9b59b6'
      case 'luxury': return '#f39c12'
      default: return '#666'
    }
  }

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Loading wedding bookings...</div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Wedding Bookings Admin Panel</h1>
        <div className="stats">
          <span>Total Bookings: {bookings.length}</span>
          <span>Pending: {bookings.filter(b => b.status === 'pending').length}</span>
          <span>Confirmed: {bookings.filter(b => b.status === 'confirmed').length}</span>
          <span>Completed: {bookings.filter(b => b.status === 'completed').length}</span>
          <span>Cancelled: {bookings.filter(b => b.status === 'cancelled').length}</span>
        </div>
      </div>

      <div className="bookings-grid">
        {bookings.length === 0 ? (
          <div className="no-bookings">
            <h3>No wedding bookings yet</h3>
            <p>Wedding bookings will appear here when couples submit the booking form.</p>
          </div>
        ) : (
          bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header">
                <h3>💍 {booking.groom} & {booking.bride}</h3>
                <div className="status-badges">
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(booking.status) }}
                  >
                    {booking.status}
                  </span>
                  <span 
                    className="package-badge" 
                    style={{ backgroundColor: getPackageColor(booking.package) }}
                  >
                    {booking.package}
                  </span>
                </div>
              </div>
              
              <div className="booking-info">
                <p>🆔 <strong>ID:</strong> {booking.bookingId}</p>
                <p>📅 <strong>Date:</strong> {formatDate(booking.date)}</p>
                <p>📍 <strong>Venue:</strong> {booking.venue?.charAt(0).toUpperCase() + booking.venue?.slice(1)}</p>
                <p>📧 <strong>Email:</strong> {booking.email}</p>
                <p>📱 <strong>Phone:</strong> {booking.phone}</p>
                <p>💰 <strong>Amount:</strong> {formatAmount(booking.totalAmount)}</p>
                <p>📅 <strong>Booked:</strong> {formatDate(booking.createdAt)}</p>
              </div>
              
              <div className="booking-actions">
                <button 
                  onClick={() => updateStatus(booking.bookingId, 'confirmed')}
                  className="btn-confirm"
                  disabled={booking.status === 'confirmed' || booking.status === 'completed'}
                >
                  Confirm
                </button>
                <button 
                  onClick={() => updateStatus(booking.bookingId, 'completed')}
                  className="btn-complete"
                  disabled={booking.status === 'completed' || booking.status === 'cancelled'}
                >
                  Complete
                </button>
                <button 
                  onClick={() => updateStatus(booking.bookingId, 'cancelled')}
                  className="btn-cancel"
                  disabled={booking.status === 'cancelled' || booking.status === 'completed'}
                >
                  Cancel
                </button>
                <a 
                  href={`mailto:${booking.email}?subject=Wedding Booking ${booking.bookingId}`}
                  className="btn-email"
                >
                  Email
                </a>
                <a 
                  href={`tel:${booking.phone}`}
                  className="btn-call"
                >
                  Call
                </a>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="admin-footer">
        <button onClick={fetchBookings} className="btn-refresh">
          Refresh Bookings
        </button>
      </div>
    </div>
  )
}

export default BookingAdmin
