const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Debug setup
const debug = require('debug')('wedding-planner:server');
const debugError = require('debug')('wedding-planner:error');

// Log environment variables (mask sensitive data)
console.log('🔧 Environment Variables:');
console.log(`- NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`- PORT: ${process.env.PORT || 5000}`);
console.log(`- MONGODB_URI: ${process.env.MONGODB_URI ? '***MongoDB URI Set***' : 'Not Set'}`);
console.log(`- JWT_SECRET: ${process.env.JWT_SECRET ? '***JWT Secret Set***' : 'Not Set'}`);
console.log(`- FRONTEND_URL: ${process.env.FRONTEND_URL || 'Not Set'}`);

const authRoutes = require('./src/routes/auth');
const contactRoutes = require('./src/routes/contact');
const bookingRoutes = require('./src/routes/booking-working');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Enhanced request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);
  
  debug(`[${requestId}] ${req.method} ${req.originalUrl} - Incoming request`);
  debug(`[${requestId}] Headers:`, JSON.stringify(req.headers, null, 2));
  
  // Log request body (except for sensitive data)
  if (req.body && Object.keys(req.body).length > 0) {
    const safeBody = { ...req.body };
    if (safeBody.password) safeBody.password = '***';
    if (safeBody.confirmPassword) safeBody.confirmPassword = '***';
    debug(`[${requestId}] Body:`, JSON.stringify(safeBody, null, 2));
  }
  
  // Log response
  const originalSend = res.send;
  res.send = function(body) {
    const duration = Date.now() - start;
    debug(`[${requestId}] Response (${res.statusCode}) in ${duration}ms`);
    if (res.statusCode >= 400) {
      debugError(`[${requestId}] Error Response (${res.statusCode}):`, body);
    } else {
      debug(`[${requestId}] Response Body:`, JSON.stringify(body, null, 2).substring(0, 200) + '...');
    }
    return originalSend.call(this, body);
  };
  
  next();
});

// Security middleware
app.use(helmet());

// CORS Configuration - Allow localhost for development and Vercel/Render URLs for production
const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:3000', 
  'http://127.0.0.1:5173',
  'https://localhost:5173',
  'https://planner-wedding.vercel.app', // Vercel frontend
  process.env.FRONTEND_URL // Add your frontend URL from environment
];

app.use(cors({
  origin: [
    'http://localhost:5173',  // Local development
    'https://planner-wedding.vercel.app'  // Your Vercel frontend
  ],
  credentials: true
}));

app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Wedding Planner API with MongoDB Atlas is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/auth', authRoutes);
app.use('/contact', contactRoutes);
app.use('/bookings', bookingRoutes);

// Enhanced error handling
app.use((err, req, res, next) => {
  const errorId = Math.random().toString(36).substring(2, 7);
  const errorMessage = err.message || 'Internal Server Error';
  const statusCode = err.status || 500;
  
  debugError(`[${errorId}] Error: ${errorMessage}`);
  debugError(`[${errorId}] Stack:`, err.stack);
  
  res.status(statusCode).json({
    error: errorMessage,
    status: 'error',
    requestId: req.id || 'unknown',
    errorId: errorId,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  debugError(`404 - Not Found: ${req.method} ${fullUrl}`);
  debugError('Request Headers:', JSON.stringify(req.headers, null, 2));
  
  res.status(404).json({
    status: 'error',
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
    availableEndpoints: [
      'POST /auth/register',
      'POST /auth/login',
      'GET /api/health',
      'GET / (API info)'
    ]
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  const host = server.address().address;
  const port = server.address().port;
  
  console.log('\n🚀 Server started successfully!');
  console.log('='.repeat(50));
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Local: http://localhost:${port}`);
  console.log(`🌐 Network: http://${host === '::' ? 'localhost' : host}:${port}`);
  console.log(`📡 Public: https://planner-wedding.onrender.com`);
  console.log('\n📡 Available Endpoints:');
  console.log('- GET  /               - API Information');
  console.log('- GET  /api/health    - Health Check');
  console.log('- POST /auth/register - User Registration');
  console.log('- POST /auth/login    - User Login');
  console.log('\n🔍 Debug logs are enabled. Set DEBUG=wedding-planner:* to see detailed logs');
  console.log('='.repeat(50));
});

module.exports = app;
