const axios = require('axios');

// Simple booking test
async function simpleBookingTest() {
  console.log('🧪 Simple Booking Test...\n');

  const simpleBooking = {
    groom: 'Test Groom',
    bride: 'Test Bride',
    email: 'test@example.com',
    phone: '1234567890',
    date: '2024-12-25',
    time: '18:00',
    guests: 100,
    venue: 'garden',
    package: 'premium'
  };

  try {
    console.log('📝 Submitting simple booking...');
    const response = await axios.post('http://localhost:3000/api/bookings', simpleBooking);
    console.log('✅ SUCCESS!');
    console.log('Booking ID:', response.data.booking.id);
    console.log('Total Amount:', response.data.booking.totalAmount);
    console.log('Status:', response.data.booking.status);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    
    // Let's also test the health endpoint
    try {
      const healthResponse = await axios.get('http://localhost:3000/api/health');
      console.log('✅ Health check passed:', healthResponse.data.message);
    } catch (healthError) {
      console.error('❌ Health check failed:', healthError.message);
    }
  }
}

simpleBookingTest();
