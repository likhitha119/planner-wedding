# 🔧 Render Environment Variables - Complete Setup

## 🌐 Your Deployment URLs

- **Backend (Render):** https://planner-wedding.onrender.com
- **Frontend (Vercel):** https://planner-wedding.vercel.app

---

## ⚙️ Environment Variables to Add in Render

### **Go to Render Dashboard:**
👉 https://dashboard.render.com

### **Navigate to Your Service:**
1. Click on your service: **"planner-wedding"** or **"wedding-planner-backend"**
2. Click **"Environment"** tab on the left sidebar
3. Click **"Add Environment Variable"** button

---

## 📋 Add These 4 Variables:

### **Variable 1: NODE_ENV**
```
Key: NODE_ENV
Value: production
```
**Purpose:** Tells Node.js to run in production mode

---

### **Variable 2: MONGODB_URI**
```
Key: MONGODB_URI
Value: mongodb+srv://talagapulikhitha:likki143babe@wedding-plan.umvwmsl.mongodb.net/wedding-planner?retryWrites=true&w=majority&ssl=true&authSource=admin
```
**Purpose:** MongoDB Atlas connection string

---

### **Variable 3: JWT_SECRET**
```
Key: JWT_SECRET
Value: a8f5f167f44f4964e6c998dee827110c8b2e4a7d3f9c1b5e8a2d6f4c9e7b3a1f
```
**Purpose:** Secret key for JWT token encryption

---

### **Variable 4: FRONTEND_URL** ⭐ NEW
```
Key: FRONTEND_URL
Value: https://planner-wedding.vercel.app
```
**Purpose:** Frontend URL for CORS configuration

---

## 📸 Screenshot Guide:

### **Step-by-Step:**

1. **Click "Add Environment Variable"**
2. **Enter Key:** `NODE_ENV`
3. **Enter Value:** `production`
4. **Click "Add"**
5. **Repeat for all 4 variables**

---

## ✅ After Adding All Variables

### **Your Environment Section Should Show:**

```
NODE_ENV = production
MONGODB_URI = mongodb+srv://talagap... (hidden for security)
JWT_SECRET = a8f5f167f44... (hidden for security)
FRONTEND_URL = https://planner-wedding.vercel.app
```

---

## 🔄 Redeploy After Adding Variables

### **Option 1: Automatic Redeploy**
- Render will ask: **"Redeploy to apply changes?"**
- Click **"Yes"** or **"Deploy now"**

### **Option 2: Manual Redeploy**
1. Click **"Manual Deploy"** button (top right)
2. Select **"Deploy latest commit"**
3. Click **"Deploy"**

**⏰ Wait:** 2-3 minutes for deployment

---

## 🧪 Verify After Deployment

### **Test 1: Health Check**
Visit:
```
https://planner-wedding.onrender.com/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Wedding Planner API with MongoDB Atlas is running",
  "timestamp": "2025-11-02T..."
}
```

### **Test 2: Root URL**
Visit:
```
https://planner-wedding.onrender.com
```

**Expected:** No error (even if shows nothing, that's OK - API routes work)

### **Test 3: Check Logs**
1. In Render dashboard
2. Click **"Logs"** tab
3. Look for:
   ```
   ✅ Connected to MongoDB Atlas
   🚀 Wedding Planner API server running
   📝 Available endpoints...
   ```

---

## 🎯 Quick Copy-Paste Format

If Render has a "Bulk Add" option, paste this:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://talagapulikhitha:likki143babe@wedding-plan.umvwmsl.mongodb.net/wedding-planner?retryWrites=true&w=majority&ssl=true&authSource=admin
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c8b2e4a7d3f9c1b5e8a2d6f4c9e7b3a1f
FRONTEND_URL=https://planner-wedding.vercel.app
```

---

## ⚠️ Common Issues & Solutions

### **Issue 1: Variables Not Showing**
**Solution:** Refresh browser, check you're on correct service

### **Issue 2: Still Getting Errors After Adding**
**Solution:** Make sure to redeploy after adding variables

### **Issue 3: MongoDB Connection Error**
**Check:**
- MongoDB URI is exact (no extra spaces)
- MongoDB Atlas network access allows `0.0.0.0/0`
- Database user exists with correct password

### **Issue 4: CORS Errors**
**Check:**
- `FRONTEND_URL` is set correctly
- Value is exact: `https://planner-wedding.vercel.app`
- No trailing slash at the end

---

## 📊 Checklist

Complete these steps in order:

- [ ] Go to https://dashboard.render.com
- [ ] Click your backend service
- [ ] Click "Environment" tab
- [ ] Add `NODE_ENV=production`
- [ ] Add `MONGODB_URI=...` (full connection string)
- [ ] Add `JWT_SECRET=...` (full secret key)
- [ ] Add `FRONTEND_URL=https://planner-wedding.vercel.app`
- [ ] Click "Save" for each variable
- [ ] Redeploy the service
- [ ] Wait 2-3 minutes
- [ ] Check logs for "Connected to MongoDB"
- [ ] Test health endpoint
- [ ] Test from frontend

---

## 🎉 Success Indicators

You'll know it's working when:

✅ **Render Logs Show:**
```
✅ Connected to MongoDB Atlas
🚀 Wedding Planner API server running on port...
```

✅ **Health Check Returns:**
```json
{"status":"OK", "message":"...running"}
```

✅ **Frontend Can:**
- Register new users
- Login successfully
- Submit forms
- No CORS errors in browser console

---

## 📞 Your URLs Reference

| Service | URL | Purpose |
|---------|-----|---------|
| **Backend API** | https://planner-wedding.onrender.com | API server |
| **Health Check** | https://planner-wedding.onrender.com/api/health | Test endpoint |
| **Frontend** | https://planner-wedding.vercel.app | User interface |
| **Test Page** | https://planner-wedding.vercel.app/test-connection.html | Debug tool |
| **Render Dashboard** | https://dashboard.render.com | Manage backend |
| **GitHub** | https://github.com/likhitha119/planner-wedding | Source code |

---

## 🆘 Need Help?

**Check Render Logs:**
```
Dashboard → Your Service → Logs
```

**Check Deployment Status:**
```
Dashboard → Your Service → Events
```

**Test with Test Page:**
```
https://planner-wedding.vercel.app/test-connection.html
```

---

**Add these 4 variables in Render now and redeploy!** 🚀

**After deployment (3 minutes), your backend will be fully functional!** ✅
