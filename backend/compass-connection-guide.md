# MongoDB Compass Connection Guide

## 🧭 Connect to Your Wedding Planner Database

### Option 1: MongoDB Atlas (Cloud) - RECOMMENDED
Your current connection string for MongoDB Compass:

```
mongodb+srv://talagapulikhitha:likki143babe@wedding-plan.umvwmsl.mongodb.net/wedding-planner
```

### Steps to Connect:

1. **Open MongoDB Compass**
2. **Click "New Connection"**
3. **Paste this connection string:**
   ```
   mongodb+srv://talagapulikhitha:likki143babe@wedding-plan.umvwmsl.mongodb.net/wedding-planner
   ```
4. **Click "Connect"**

### What You'll See:
- **Database**: `wedding-planner`
- **Collections**: 
  - `contacts` (contact form submissions)
  - `bookings` (wedding bookings)
  - `users` (user accounts)

### Option 2: Local MongoDB (If you want local development)

If you prefer local MongoDB:

1. **Install MongoDB Community Server**
2. **Start MongoDB service**
3. **Use this connection string in Compass:**
   ```
   mongodb://localhost:27017/wedding-planner
   ```

### Troubleshooting:

**If Atlas connection fails:**
1. Check your internet connection
2. Verify IP whitelist in MongoDB Atlas (should include 0.0.0.0/0)
3. Confirm username/password are correct

**If you see "Authentication failed":**
- Double-check the username: `talagapulikhitha`
- Double-check the password: `likki143babe`

### Current Status:
✅ Your application is working with MongoDB Atlas
✅ Contact form saves to database
✅ Booking system is functional
✅ Ready for Compass connection
