import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    setIsMenuOpen(false)
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for navigation, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
        <span>Let's Celebrate </span>Together
      </Link>
      
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>home</a>
        <a href="#service" onClick={(e) => handleNavClick(e, 'service')}>service</a>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>about</Link>
        <a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>gallery</a>
        <a href="#price" onClick={(e) => handleNavClick(e, 'price')}>price</a>
        <a href="#review" onClick={(e) => handleNavClick(e, 'review')}>review</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>contact</a>
        <Link to="/checkout" onClick={() => setIsMenuOpen(false)}>book now</Link>
        
        {user ? (
          <>
            <span className="user-greeting">Hello, {user.fullname}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
          </>
        )}
      </nav>
      
      <div 
        id="menu-bars" 
        className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}
        onClick={toggleMenu}
      ></div>
    </header>
  )
}

export default Header
