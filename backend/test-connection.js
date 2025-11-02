const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔄 Testing MongoDB Atlas connection...');
    console.log('Connection string:', process.env.MONGODB_URI.replace(/:[^:@]*@/, ':****@'));
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Atlas connection successful!');
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({ test: 'Connection test successful!' });
    await testDoc.save();
    console.log('✅ Database write test successful!');
    
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Database delete test successful!');
    
    await mongoose.disconnect();
    console.log('✅ All tests passed! Your MongoDB Atlas is ready to use.');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your MongoDB Atlas cluster is running');
    console.log('2. Verify your IP is whitelisted (or use 0.0.0.0/0)');
    console.log('3. Confirm your username and password are correct');
    console.log('4. Ensure your database user has read/write permissions');
  }
}

testConnection();
