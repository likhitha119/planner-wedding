const axios = require('axios');

async function addSampleData() {
  console.log('📝 Adding sample data for Compass viewing...\n');

  try {
    // Add sample contact
    console.log('📧 Adding sample contact...');
    const contactData = {
      name: 'John & Sarah',
      email: 'john.sarah@example.com',
      number: '9876543210',
      subject: 'Wedding Planning Inquiry',
      message: 'We are interested in your premium wedding package for December 2024. Please contact us with more details.'
    };
    
    const contactResponse = await axios.post('http://localhost:3000/api/contact', contactData);
    console.log('✅ Sample contact added!');

    // Add sample booking
    console.log('💍 Adding sample wedding booking...');
    const bookingData = {
      groom: 'Michael Johnson',
      bride: 'Emily Davis',
      email: 'michael.emily@example.com',
      phone: '9123456789',
      date: '2024-12-20',
      time: '16:00',
      guests: 200,
      venue: 'garden',
      package: 'luxury',
      services: ['catering', 'photography', 'music', 'decor']
    };
    
    const bookingResponse = await axios.post('http://localhost:3000/api/bookings', bookingData);
    console.log('✅ Sample wedding booking added!');
    console.log(`   Booking ID: ${bookingResponse.data.booking.id}`);
    console.log(`   Total Amount: ₹${bookingResponse.data.booking.totalAmount?.toLocaleString()}`);

    console.log('\n🎉 Sample data added successfully!');
    console.log('\n🧭 Now in MongoDB Compass you can see:');
    console.log('📧 contacts collection - Contact form submissions');
    console.log('💍 bookings collection - Wedding bookings with pricing');
    console.log('👤 users collection - User accounts (when someone registers)');

  } catch (error) {
    console.error('❌ Error adding sample data:', error.message);
  }
}

addSampleData();
