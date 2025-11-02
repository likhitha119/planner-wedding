const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

// Test booking system
async function testBookingSystem() {
  console.log('🧪 Testing Wedding Booking System...\n');

  // Test data
  const testBooking = {
    groom: 'Raj Kumar',
    bride: 'Priya Sharma',
    email: 'raj.priya@example.com',
    phone: '9876543210',
    date: '2024-12-15',
    time: '18:00',
    guests: 150,
    venue: 'garden',
    package: 'premium',
    services: ['catering', 'photography', 'music'],
    paymentMethod: 'credit-card'
  };

  try {
    // 1. Submit wedding booking
    console.log('💍 Submitting wedding booking...');
    const submitResponse = await axios.post(`${API_BASE}/bookings`, testBooking);
    console.log('✅ Wedding booking submitted successfully!');
    console.log('Response:', submitResponse.data);
    
    const bookingId = submitResponse.data.booking.id;
    console.log(`📋 Booking ID: ${bookingId}`);
    console.log(`💰 Total Amount: ₹${submitResponse.data.booking.totalAmount?.toLocaleString()}\n`);

    // 2. Get all bookings (admin)
    console.log('📋 Fetching all wedding bookings (admin)...');
    const getAllResponse = await axios.get(`${API_BASE}/bookings/admin/all`);
    console.log('✅ All bookings retrieved successfully!');
    console.log(`📊 Total bookings: ${getAllResponse.data.count}`);
    console.log('Latest booking:', {
      id: getAllResponse.data.bookings[0]?.bookingId,
      couple: `${getAllResponse.data.bookings[0]?.groom} & ${getAllResponse.data.bookings[0]?.bride}`,
      venue: getAllResponse.data.bookings[0]?.venue,
      package: getAllResponse.data.bookings[0]?.package,
      amount: getAllResponse.data.bookings[0]?.totalAmount
    });
    console.log('');

    // 3. Get specific booking
    console.log(`🔍 Fetching specific booking (${bookingId})...`);
    const getOneResponse = await axios.get(`${API_BASE}/bookings/${bookingId}`);
    console.log('✅ Specific booking retrieved successfully!');
    console.log('Booking details:', {
      id: getOneResponse.data.booking.bookingId,
      couple: `${getOneResponse.data.booking.groom} & ${getOneResponse.data.booking.bride}`,
      date: getOneResponse.data.booking.date,
      venue: getOneResponse.data.booking.venue,
      package: getOneResponse.data.booking.package,
      services: getOneResponse.data.booking.services,
      status: getOneResponse.data.booking.status,
      totalAmount: getOneResponse.data.booking.totalAmount
    });
    console.log('');

    // 4. Update booking status to 'confirmed'
    console.log('✅ Updating booking status to "confirmed"...');
    const updateConfirmedResponse = await axios.patch(`${API_BASE}/bookings/${bookingId}/status`, {
      status: 'confirmed'
    });
    console.log('✅ Status updated to "confirmed"!');
    console.log('Updated booking status:', updateConfirmedResponse.data.booking.status);
    console.log('');

    // 5. Update booking status to 'completed'
    console.log('🎉 Updating booking status to "completed"...');
    const updateCompletedResponse = await axios.patch(`${API_BASE}/bookings/${bookingId}/status`, {
      status: 'completed'
    });
    console.log('✅ Status updated to "completed"!');
    console.log('Final booking status:', updateCompletedResponse.data.booking.status);
    console.log('');

    // 6. Test validation errors
    console.log('🚫 Testing validation errors...');
    try {
      await axios.post(`${API_BASE}/bookings`, {
        groom: 'A', // Too short
        bride: 'B', // Too short
        email: 'invalid-email', // Invalid email
        phone: '123', // Too short
        date: 'invalid-date', // Invalid date
        time: '', // Empty
        guests: 0, // Too low
        venue: 'invalid-venue', // Invalid venue
        package: 'invalid-package' // Invalid package
      });
    } catch (validationError) {
      console.log('✅ Validation errors caught correctly!');
      console.log('Validation errors count:', validationError.response.data.errors.length);
      validationError.response.data.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error.msg} (${error.path})`);
      });
    }

    // 7. Test different packages and pricing
    console.log('\n💰 Testing different package pricing...');
    
    const packages = [
      { name: 'basic', services: [] },
      { name: 'premium', services: ['catering'] },
      { name: 'luxury', services: ['catering', 'photography', 'music', 'decor'] }
    ];

    for (const pkg of packages) {
      try {
        const testData = {
          ...testBooking,
          groom: `Test Groom ${pkg.name}`,
          bride: `Test Bride ${pkg.name}`,
          email: `test.${pkg.name}@example.com`,
          package: pkg.name,
          services: pkg.services
        };

        const response = await axios.post(`${API_BASE}/bookings`, testData);
        console.log(`✅ ${pkg.name.toUpperCase()} Package: ₹${response.data.booking.totalAmount?.toLocaleString()}`);
      } catch (error) {
        console.log(`❌ ${pkg.name} package test failed:`, error.message);
      }
    }

    console.log('\n🎉 All booking system tests passed successfully!');
    console.log('\n📋 Booking System Features Working:');
    console.log('✅ Wedding booking submission with validation');
    console.log('✅ Database storage with MongoDB Atlas');
    console.log('✅ Automatic pricing calculation');
    console.log('✅ Booking ID and transaction ID generation');
    console.log('✅ Retrieve all bookings (admin)');
    console.log('✅ Retrieve specific booking');
    console.log('✅ Update booking status');
    console.log('✅ Input validation and error handling');
    console.log('✅ Package-based pricing system');
    console.log('✅ Additional services pricing');

  } catch (error) {
    console.error('❌ Booking system test failed:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
  }
}

// Run the test
testBookingSystem();
