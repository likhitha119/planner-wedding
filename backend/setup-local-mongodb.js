const fs = require('fs');

console.log('🔧 Setting up Local MongoDB option...\n');

// Create local MongoDB .env
const localEnvContent = `PORT=3000
MONGODB_URI=mongodb://localhost:27017/wedding-planner
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c8b2e4a7d3f9c1b5e8a2d6f4c9e7b3a1f
NODE_ENV=development`;

fs.writeFileSync('.env.local', localEnvContent);

console.log('✅ Created .env.local file for local MongoDB');
console.log('\n📋 To switch to local MongoDB:');
console.log('1. Install MongoDB Community Server from:');
console.log('   https://www.mongodb.com/try/download/community');
console.log('2. Start MongoDB service');
console.log('3. Replace .env content with .env.local content');
console.log('4. Restart your application');
console.log('5. Connect Compass with: mongodb://localhost:27017/wedding-planner');

console.log('\n🧭 Current Atlas Connection String for Compass:');
console.log('mongodb+srv://talagapulikhitha:likki143babe@wedding-plan.umvwmsl.mongodb.net/wedding-planner');

console.log('\n💡 Recommendation: Use Atlas connection above - it\'s already working!');
