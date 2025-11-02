const mongoose = require('mongoose');
require('dotenv').config();

async function testCompassConnection() {
  console.log('🧭 Testing MongoDB Compass Connection...\n');
  
  const compassURI = process.env.MONGODB_URI;
  console.log('🔗 Connection String for Compass:');
  console.log(compassURI);
  console.log('');
  
  try {
    console.log('🔄 Testing connection...');
    await mongoose.connect(compassURI);
    console.log('✅ Connection successful!');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📊 Available Collections:');
    if (collections.length === 0) {
      console.log('  (No collections yet - they will be created when you submit forms)');
    } else {
      collections.forEach(col => {
        console.log(`  - ${col.name}`);
      });
    }
    
    // Get database stats
    const stats = await mongoose.connection.db.stats();
    console.log('\n📈 Database Stats:');
    console.log(`  - Database: ${mongoose.connection.db.databaseName}`);
    console.log(`  - Collections: ${stats.collections}`);
    console.log(`  - Data Size: ${(stats.dataSize / 1024).toFixed(2)} KB`);
    
    await mongoose.disconnect();
    
    console.log('\n🎉 SUCCESS! Your database is ready for Compass!');
    console.log('\n📋 Instructions for MongoDB Compass:');
    console.log('1. Open MongoDB Compass');
    console.log('2. Click "New Connection"');
    console.log('3. Paste this connection string:');
    console.log(`   ${compassURI}`);
    console.log('4. Click "Connect"');
    console.log('5. Navigate to "wedding-planner" database');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('IP whitelist')) {
      console.log('\n🔧 Fix: Add your IP to MongoDB Atlas whitelist');
      console.log('1. Go to MongoDB Atlas dashboard');
      console.log('2. Network Access → Add IP Address');
      console.log('3. Add 0.0.0.0/0 (allow all) for development');
    }
    
    if (error.message.includes('authentication')) {
      console.log('\n🔧 Fix: Check username/password');
      console.log('Username: talagapulikhitha');
      console.log('Password: likki143babe');
    }
  }
}

testCompassConnection();
