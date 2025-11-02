const mongoose = require('mongoose');

// Multiple connection options to try
const connectionOptions = [
  // Option 1: Simplified Atlas connection
  'mongodb+srv://talagapulikhitha:likki143babe@wedding-plan.umvwmsl.mongodb.net/wedding-planner?retryWrites=true&w=majority&ssl=false',
  
  // Option 2: Atlas with different SSL settings
  'mongodb+srv://talagapulikhitha:likki143babe@wedding-plan.umvwmsl.mongodb.net/wedding-planner?retryWrites=true&w=majority&tls=false',
  
  // Option 3: Atlas with minimal options
  'mongodb+srv://talagapulikhitha:likki143babe@wedding-plan.umvwmsl.mongodb.net/wedding-planner',
  
  // Option 4: Local MongoDB fallback
  'mongodb://localhost:27017/wedding-planner'
];

async function findWorkingConnection() {
  console.log('🔍 Finding working MongoDB connection...\n');
  
  for (let i = 0; i < connectionOptions.length; i++) {
    const uri = connectionOptions[i];
    console.log(`🔄 Testing Option ${i + 1}...`);
    console.log(`URI: ${uri.replace(/:[^:@]*@/, ':****@')}`);
    
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 10000,
      });
      
      console.log(`✅ Option ${i + 1} - Connection successful!`);
      
      // Test database operations
      const testSchema = new mongoose.Schema({ 
        test: String, 
        timestamp: { type: Date, default: Date.now }
      });
      const TestModel = mongoose.model('WorkingTest', testSchema);
      
      const testDoc = new TestModel({ test: `Working connection ${i + 1}` });
      await testDoc.save();
      console.log(`✅ Option ${i + 1} - Database write successful!`);
      
      await TestModel.deleteOne({ _id: testDoc._id });
      console.log(`✅ Option ${i + 1} - Database delete successful!`);
      
      await mongoose.disconnect();
      
      console.log(`\n🎉 SUCCESS! Option ${i + 1} works perfectly!`);
      console.log(`\n📝 Update your .env file with:`);
      console.log(`MONGODB_URI=${uri}`);
      
      // Write working connection to file
      const fs = require('fs');
      const envContent = `PORT=3000
MONGODB_URI=${uri}
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c8b2e4a7d3f9c1b5e8a2d6f4c9e7b3a1f
NODE_ENV=development`;
      
      fs.writeFileSync('.env', envContent);
      console.log(`✅ .env file updated automatically!`);
      
      return true;
    } catch (error) {
      console.error(`❌ Option ${i + 1} failed:`, error.message);
      try {
        await mongoose.disconnect();
      } catch (e) {
        // Ignore disconnect errors
      }
    }
    
    console.log('');
  }
  
  console.log('❌ All connection options failed.');
  console.log('\n🔧 Manual setup required:');
  console.log('1. Check MongoDB Atlas cluster status');
  console.log('2. Verify IP whitelist settings');
  console.log('3. Install local MongoDB as fallback');
  
  return false;
}

findWorkingConnection();
