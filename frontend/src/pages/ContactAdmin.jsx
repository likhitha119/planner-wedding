import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const ContactAdmin = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/api/contact')
      setContacts(response.data.contacts)
      console.log('✅ Contacts loaded:', response.data.count, 'messages')
    } catch (error) {
      console.error('Error fetching contacts:', error)
      toast.error('Failed to load contact messages')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (contactId, newStatus) => {
    try {
      await axios.patch(`/api/contact/${contactId}/status`, { status: newStatus })
      setContacts(contacts.map(contact => 
        contact._id === contactId ? { ...contact, status: newStatus } : contact
      ))
      toast.success(`Status updated to ${newStatus}`)
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#ff6b6b'
      case 'read': return '#ffa500'
      case 'replied': return '#4aed88'
      default: return '#666'
    }
  }

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Loading contact messages...</div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Contact Messages Admin Panel</h1>
        <div className="stats">
          <span>Total Messages: {contacts.length}</span>
          <span>New: {contacts.filter(c => c.status === 'new').length}</span>
          <span>Read: {contacts.filter(c => c.status === 'read').length}</span>
          <span>Replied: {contacts.filter(c => c.status === 'replied').length}</span>
        </div>
      </div>

      <div className="contacts-grid">
        {contacts.length === 0 ? (
          <div className="no-contacts">
            <h3>No contact messages yet</h3>
            <p>Contact messages will appear here when users submit the contact form.</p>
          </div>
        ) : (
          contacts.map(contact => (
            <div key={contact._id} className="contact-card">
              <div className="contact-header">
                <h3>{contact.name}</h3>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(contact.status) }}
                >
                  {contact.status}
                </span>
              </div>
              
              <div className="contact-info">
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Phone:</strong> {contact.number}</p>
                <p><strong>Subject:</strong> {contact.subject}</p>
                <p><strong>Date:</strong> {formatDate(contact.createdAt)}</p>
              </div>
              
              <div className="contact-message">
                <strong>Message:</strong>
                <p>{contact.message}</p>
              </div>
              
              <div className="contact-actions">
                <button 
                  onClick={() => updateStatus(contact._id, 'read')}
                  className="btn-read"
                  disabled={contact.status === 'read' || contact.status === 'replied'}
                >
                  Mark as Read
                </button>
                <button 
                  onClick={() => updateStatus(contact._id, 'replied')}
                  className="btn-replied"
                  disabled={contact.status === 'replied'}
                >
                  Mark as Replied
                </button>
                <a 
                  href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                  className="btn-email"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="admin-footer">
        <button onClick={fetchContacts} className="btn-refresh">
          Refresh Messages
        </button>
      </div>
    </div>
  )
}

export default ContactAdmin
