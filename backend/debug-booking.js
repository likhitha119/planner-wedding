const mongoose = require('mongoose');
require('dotenv').config();

// Test booking model directly
async function debugBooking() {
  console.log('🔍 Debugging Booking Model...\n');

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Import Booking model
    const Booking = require('./src/models/Booking');
    console.log('✅ Booking model imported');

    // Test creating a booking
    const testBooking = new Booking({
      groom: 'Debug Groom',
      bride: 'Debug Bride',
      email: 'debug@example.com',
      phone: '1234567890',
      date: new Date('2024-12-25'),
      time: '18:00',
      guests: 100,
      venue: 'garden',
      package: 'premium',
      services: ['catering'],
      paymentMethod: 'credit-card',
      totalAmount: 450000
    });

    console.log('📝 Saving booking...');
    await testBooking.save();
    console.log('✅ Booking saved successfully!');
    console.log('Booking ID:', testBooking.bookingId);
    console.log('Transaction ID:', testBooking.transactionId);
    console.log('Total Amount:', testBooking.totalAmount);

    // Clean up
    await Booking.deleteOne({ _id: testBooking._id });
    console.log('✅ Test booking cleaned up');

    await mongoose.disconnect();
    console.log('✅ All tests passed! Booking model works correctly.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

debugBooking();
