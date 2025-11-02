const mongoose = require('mongoose');
require('dotenv').config();

// Multiple connection string options to try
const connectionOptions = [
  // Option 1: With SSL bypass
  process.env.MONGODB_URI?.replace('?retryWrites=true&w=majority', '?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true&ssl=true'),
  
  // Option 2: With different SSL settings
  process.env.MONGODB_URI?.replace('?retryWrites=true&w=majority', '?retryWrites=true&w=majority&ssl=false'),
  
  // Option 3: Simplified connection
  process.env.MONGODB_URI?.replace('?retryWrites=true&w=majority&appName=wedding-plan', '?retryWrites=true&w=majority'),
  
  // Option 4: With authSource
  process.env.MONGODB_URI?.replace('?retryWrites=true&w=majority', '?retryWrites=true&w=majority&authSource=admin&ssl=true&tlsAllowInvalidCertificates=true')
];

async function tryConnection(uri, optionNumber) {
  try {
    console.log(`\n🔄 Testing Option ${optionNumber}...`);
    console.log(`Connection: ${uri.replace(/:[^:@]*@/, ':****@')}`);
    
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ Option ${optionNumber} - MongoDB connection successful!`);
    
    // Test database operations
    const testSchema = new mongoose.Schema({ 
      message: String, 
      timestamp: { type: Date, default: Date.now }
    });
    const TestModel = mongoose.model('ConnectionTest', testSchema);
    
    const testDoc = new TestModel({ message: `Connection test ${optionNumber} successful!` });
    await testDoc.save();
    console.log(`✅ Option ${optionNumber} - Database write successful!`);
    
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log(`✅ Option ${optionNumber} - Database delete successful!`);
    
    await mongoose.disconnect();
    console.log(`\n🎉 SUCCESS! Option ${optionNumber} works perfectly!`);
    console.log(`\n📝 Use this connection string in your .env file:`);
    console.log(`MONGODB_URI=${uri}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Option ${optionNumber} failed:`, error.message);
    try {
      await mongoose.disconnect();
    } catch (e) {
      // Ignore disconnect errors
    }
    return false;
  }
}

async function findWorkingConnection() {
  console.log('🔍 Testing multiple MongoDB connection options...\n');
  
  for (let i = 0; i < connectionOptions.length; i++) {
    const uri = connectionOptions[i];
    if (!uri) continue;
    
    const success = await tryConnection(uri, i + 1);
    if (success) {
      return;
    }
    
    // Wait a bit between attempts
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n❌ All connection options failed.');
  console.log('\n🔧 Troubleshooting steps:');
  console.log('1. Check MongoDB Atlas cluster is running (not paused)');
  console.log('2. Verify IP whitelist includes 0.0.0.0/0 or your current IP');
  console.log('3. Confirm username/password are correct');
  console.log('4. Ensure database user has proper permissions');
  console.log('5. Try creating a new cluster if issues persist');
  console.log('\n📖 See create-new-mongodb.md for fresh setup instructions');
}

findWorkingConnection();
