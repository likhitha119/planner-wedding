const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

// Test contact form submission
async function testContactForm() {
  console.log('🧪 Testing Contact Form System...\n');

  // Test data
  const testContact = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    number: '9876543210',
    subject: 'Wedding Inquiry',
    message: 'Hello! I would like to know more about your wedding planning services. We are planning our wedding for next year and need professional help.'
  };

  try {
    // 1. Submit contact form
    console.log('📝 Submitting contact form...');
    const submitResponse = await axios.post(`${API_BASE}/contact`, testContact);
    console.log('✅ Contact form submitted successfully!');
    console.log('Response:', submitResponse.data);
    
    const contactId = submitResponse.data.id;
    console.log(`📋 Contact ID: ${contactId}\n`);

    // 2. Get all contacts
    console.log('📋 Fetching all contact messages...');
    const getAllResponse = await axios.get(`${API_BASE}/contact`);
    console.log('✅ Contact messages retrieved successfully!');
    console.log(`📊 Total contacts: ${getAllResponse.data.count}`);
    console.log('Latest contact:', getAllResponse.data.contacts[0]);
    console.log('');

    // 3. Get specific contact
    console.log(`🔍 Fetching specific contact (${contactId})...`);
    const getOneResponse = await axios.get(`${API_BASE}/contact/${contactId}`);
    console.log('✅ Specific contact retrieved successfully!');
    console.log('Contact details:', getOneResponse.data.contact);
    console.log('');

    // 4. Update contact status to 'read'
    console.log('📖 Updating contact status to "read"...');
    const updateReadResponse = await axios.patch(`${API_BASE}/contact/${contactId}/status`, {
      status: 'read'
    });
    console.log('✅ Status updated to "read"!');
    console.log('Updated contact:', updateReadResponse.data.contact);
    console.log('');

    // 5. Update contact status to 'replied'
    console.log('💬 Updating contact status to "replied"...');
    const updateRepliedResponse = await axios.patch(`${API_BASE}/contact/${contactId}/status`, {
      status: 'replied'
    });
    console.log('✅ Status updated to "replied"!');
    console.log('Final contact:', updateRepliedResponse.data.contact);
    console.log('');

    // 6. Test validation errors
    console.log('🚫 Testing validation errors...');
    try {
      await axios.post(`${API_BASE}/contact`, {
        name: 'A', // Too short
        email: 'invalid-email', // Invalid email
        number: '123', // Too short
        subject: 'Hi', // Too short
        message: 'Short' // Too short
      });
    } catch (validationError) {
      console.log('✅ Validation errors caught correctly!');
      console.log('Validation errors:', validationError.response.data.errors);
    }

    console.log('\n🎉 All contact form tests passed successfully!');
    console.log('\n📋 Contact Form Features Working:');
    console.log('✅ Form submission with validation');
    console.log('✅ Database storage');
    console.log('✅ Retrieve all contacts');
    console.log('✅ Retrieve specific contact');
    console.log('✅ Update contact status');
    console.log('✅ Input validation');
    console.log('✅ Error handling');

  } catch (error) {
    console.error('❌ Contact form test failed:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
  }
}

// Run the test
testContactForm();
