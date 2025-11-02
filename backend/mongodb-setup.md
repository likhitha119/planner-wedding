# MongoDB Atlas Setup Guide

## Quick Fix for SSL Issues

### Option 1: Update Connection String
Replace your MONGODB_URI in .env with:
```
MONGODB_URI=mongodb+srv://talagapulikhitha:likki143babe@wedding-plan.umvwmsl.mongodb.net/wedding-planner?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true&ssl=true
```

### Option 2: Create New MongoDB Atlas Project

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Create New Project**: "Wedding Planner"
3. **Create New Cluster**: 
   - Choose FREE tier (M0)
   - Region: Choose closest to your location
   - Cluster Name: "wedding-planner-cluster"

4. **Create Database User**:
   - Username: `weddinguser`
   - Password: `wedding123` (or your choice)
   - Role: "Atlas admin"

5. **Network Access**:
   - Add IP: `0.0.0.0/0` (for development)
   - Or add your current IP address

6. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

### Option 3: Use Local MongoDB (Alternative)

If Atlas continues to have issues, you can use a local MongoDB:

1. **Install MongoDB Community**: https://www.mongodb.com/try/download/community
2. **Start MongoDB service**
3. **Update .env**:
   ```
   MONGODB_URI=mongodb://localhost:27017/wedding-planner
   ```

## Test Connection

After updating .env, run:
```bash
node test-connection.js
```

## Common Issues & Solutions

1. **SSL Error**: Add `tlsAllowInvalidCertificates=true` to connection string
2. **Authentication Error**: Check username/password in Atlas
3. **Network Error**: Whitelist your IP in Atlas Network Access
4. **Timeout Error**: Check if cluster is paused (free tier pauses after inactivity)

## Support

If issues persist:
1. Check MongoDB Atlas status page
2. Try connecting from MongoDB Compass
3. Contact MongoDB Atlas support
