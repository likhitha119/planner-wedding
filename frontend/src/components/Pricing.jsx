import React from 'react'
import { Link } from 'react-router-dom'

const Pricing = () => {
  return (
    <section className="price" id="price">
      <h1 className="heading">our <span>price</span></h1>
      <div className="box-container">
        <div className="box">
          <h3 className="title">for weddings</h3>
          <h3 className="amount">₹30,00,000</h3>
          <ul>
            <li><i className="fas fa-check"></i>full services</li>
            <li><i className="fas fa-check"></i>decorations</li>
            <li><i className="fas fa-check"></i>music and photos</li>
            <li><i className="fas fa-check"></i>food and drinks</li>
            <li><i className="fas fa-check"></i>invitation card</li>
          </ul>
          <Link to="/checkout" className="btn">check out</Link>
        </div>
      </div>
    </section>
  )
}

export default Pricing
