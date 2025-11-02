const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create booking
router.post('/', [
  body('groom').trim().isLength({ min: 2 }).withMessage('Groom name is required'),
  body('bride').trim().isLength({ min: 2 }).withMessage('Bride name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().isLength({ min: 10 }).withMessage('Valid phone number is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('guests').isInt({ min: 1 }).withMessage('Number of guests must be at least 1'),
  body('venue').isIn(['church', 'garden', 'banquet', 'beach']).withMessage('Valid venue selection is required'),
  body('package').isIn(['basic', 'premium', 'luxury']).withMessage('Valid package selection is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      groom, bride, email, phone, date, time, guests, venue, package: selectedPackage,
      services = [], paymentMethod = 'pending'
    } = req.body;

    // Calculate total amount based on package and services
    let totalAmount = 0;
    switch (selectedPackage) {
      case 'basic': totalAmount = 200000; break;
      case 'premium': totalAmount = 400000; break;
      case 'luxury': totalAmount = 800000; break;
      default: totalAmount = 300000;
    }
    
    // Add service costs
    services.forEach(service => {
      switch (service) {
        case 'catering': totalAmount += 50000; break;
        case 'photography': totalAmount += 30000; break;
        case 'music': totalAmount += 25000; break;
        case 'decor': totalAmount += 40000; break;
      }
    });

    const booking = new Booking({
      groom,
      bride,
      email,
      phone,
      date: new Date(date),
      time,
      guests: parseInt(guests),
      venue,
      package: selectedPackage,
      services,
      paymentMethod,
      totalAmount
    });

    await booking.save();

    console.log('✅ New wedding booking created:', { 
      bookingId: booking.bookingId, 
      groom, 
      bride, 
      date, 
      venue, 
      package: selectedPackage,
      totalAmount 
    });

    res.status(201).json({
      message: 'Wedding booking confirmed successfully! 💍',
      booking: {
        id: booking.bookingId,
        groom: booking.groom,
        bride: booking.bride,
        email: booking.email,
        phone: booking.phone,
        date: booking.date,
        time: booking.time,
        guests: booking.guests,
        venue: booking.venue,
        package: booking.package,
        services: booking.services,
        status: booking.status,
        transactionId: booking.transactionId,
        totalAmount: booking.totalAmount,
        createdAt: booking.createdAt
      }
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Failed to create booking. Please try again.' });
  }
});

// Get all bookings (protected)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.user.email })
      .sort({ createdAt: -1 });
    
    res.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all bookings (admin)
router.get('/admin/all', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .select('bookingId groom bride email phone date venue package status totalAmount createdAt');
    
    res.json({
      message: 'All bookings retrieved successfully',
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.id });
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json({ 
      message: 'Booking retrieved successfully',
      booking 
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const booking = await Booking.findOneAndUpdate(
      { bookingId: req.params.id },
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
