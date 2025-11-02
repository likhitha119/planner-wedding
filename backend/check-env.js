require('dotenv').config();

console.log('🔍 Checking .env file contents...\n');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV);

if (process.env.MONGODB_URI && process.env.MONGODB_URI.includes('localhost')) {
  console.log('\n✅ Local MongoDB URI detected!');
} else if (process.env.MONGODB_URI && process.env.MONGODB_URI.includes('mongodb+srv')) {
  console.log('\n⚠️ Atlas URI detected - should be local!');
} else {
  console.log('\n❌ No MongoDB URI found!');
}
