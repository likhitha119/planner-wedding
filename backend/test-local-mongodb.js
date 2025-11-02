const mongoose = require('mongoose');

// Test local MongoDB connection
async function testLocalMongoDB() {
  console.log('🧪 Testing Local MongoDB Connection...\n');

  const localURI = 'mongodb://localhost:27017/wedding-planner';
  
  try {
    console.log('🔄 Connecting to local MongoDB...');
    console.log('URI:', localURI);
    
    await mongoose.connect(localURI);
    console.log('✅ Local MongoDB connection successful!');
    
    // Test creating a document
    const testSchema = new mongoose.Schema({ 
      test: String, 
      timestamp: { type: Date, default: Date.now }
    });
    const TestModel = mongoose.model('LocalTest', testSchema);
    
    const testDoc = new TestModel({ test: 'Local MongoDB is working!' });
    await testDoc.save();
    console.log('✅ Database write test successful!');
    
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Database delete test successful!');
    
    await mongoose.disconnect();
    console.log('✅ All local MongoDB tests passed!');
    
    console.log('\n🎉 SUCCESS! Local MongoDB is ready to use.');
    console.log('\n📝 Update your .env file with:');
    console.log('MONGODB_URI=mongodb://localhost:27017/wedding-planner');
    
  } catch (error) {
    console.error('❌ Local MongoDB connection failed:', error.message);
    console.log('\n🔧 To fix this:');
    console.log('1. Install MongoDB Community Server from: https://www.mongodb.com/try/download/community');
    console.log('2. Make sure MongoDB service is running');
    console.log('3. Or run: mongod --dbpath C:\\data\\db');
    console.log('\n💡 Alternative: Use MongoDB Atlas with the working connection string');
  }
}

testLocalMongoDB();
