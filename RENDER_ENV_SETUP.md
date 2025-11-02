# 🔧 Render Environment Variables Setup

## 📋 Backend Environment Variables for Render

### **Step-by-Step Instructions:**

1. **Go to Render Dashboard**
   - URL: https://dashboard.render.com
   - Sign in with your account

2. **Select Your Backend Service**
   - Click on your backend service (e.g., `wedding-planner-backend` or `planner-wedding`)

3. **Go to Environment Variables**
   - Click on **"Environment"** in the left sidebar
   - OR scroll down to **"Environment Variables"** section

4. **Add These 3 Variables:**

---

## ⚙️ Required Environment Variables

### **Variable 1: NODE_ENV**
```
Key: NODE_ENV
Value: production
```
**Purpose:** Tells the app it's running in production mode

---

### **Variable 2: MONGODB_URI**
```
Key: MONGODB_URI
Value: mongodb+srv://talagapulikhitha:likki143babe@wedding-plan.umvwmsl.mongodb.net/wedding-planner?retryWrites=true&w=majority&ssl=true&authSource=admin
```
**Purpose:** Connection string to your MongoDB Atlas database

**⚠️ IMPORTANT SECURITY NOTE:**
- This contains your database password
- NEVER commit this to GitHub
- Only store in Render's secure environment variables

---

### **Variable 3: JWT_SECRET**
```
Key: JWT_SECRET
Value: a8f5f167f44f4964e6c998dee827110c8b2e4a7d3f9c1b5e8a2d6f4c9e7b3a1f
```
**Purpose:** Secret key for JWT token generation and verification

**⚠️ IMPORTANT SECURITY NOTE:**
- This encrypts your user sessions
- NEVER commit this to GitHub
- Keep this secret and secure

---

## 🎯 How to Add Variables in Render

### **Method 1: Using the UI (Recommended)**

1. Click **"Add Environment Variable"** button
2. Enter **Key**: `NODE_ENV`
3. Enter **Value**: `production`
4. Click **"Save"**
5. Repeat for `MONGODB_URI` and `JWT_SECRET`

### **Method 2: Bulk Add (Faster)**

Click **"Add from .env"** and paste:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://talagapulikhitha:likki143babe@wedding-plan.umvwmsl.mongodb.net/wedding-planner?retryWrites=true&w=majority&ssl=true&authSource=admin
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c8b2e4a7d3f9c1b5e8a2d6f4c9e7b3a1f
```

Then click **"Add Variables"**

---

## 🔄 After Adding Variables

### **Redeploy Required:**

1. After adding variables, Render will ask: **"Redeploy to apply changes?"**
2. Click **"Yes"** or **"Redeploy"**
3. Wait 2-3 minutes for deployment
4. Check status becomes **"Live"** with green dot

---

## ✅ Verify Environment Variables

### **Check if Variables are Set:**

1. In Render dashboard, go to your service
2. Click **"Environment"** tab
3. You should see:
   ```
   NODE_ENV = production
   MONGODB_URI = mongodb+srv://talagap... (hidden)
   JWT_SECRET = a8f5f167f44... (hidden)
   ```

### **Test Backend:**

After deployment, test health endpoint:
```
https://planner-wedding.onrender.com/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Wedding Planner API with MongoDB Atlas is running",
  "routes": [...]
}
```

---

## 🔐 Security Best Practices

### ✅ DO:
- Store sensitive data in Render environment variables
- Use strong, random JWT secrets
- Keep MongoDB credentials secure
- Use `.gitignore` to exclude `.env` files
- Rotate secrets periodically

### ❌ DON'T:
- Commit `.env` files to GitHub
- Share environment variables in chat/email
- Use weak or simple secrets
- Store credentials in code
- Expose variables in logs

---

## 🆘 Troubleshooting

### **Issue 1: Variables Not Showing**
**Solution:** Wait for page to load, refresh browser

### **Issue 2: Backend Still Using Old Values**
**Solution:** Redeploy the service after adding variables

### **Issue 3: MongoDB Connection Error**
**Check:**
- MongoDB URI is correct
- Network Access allows 0.0.0.0/0 in MongoDB Atlas
- Database user exists with correct password

### **Issue 4: JWT Errors**
**Check:**
- JWT_SECRET is set correctly
- No extra spaces in the value
- Secret is at least 32 characters long

---

## 📊 Environment Variables Checklist

- [ ] Logged into Render dashboard
- [ ] Selected correct backend service
- [ ] Added `NODE_ENV=production`
- [ ] Added `MONGODB_URI` with connection string
- [ ] Added `JWT_SECRET` with secret key
- [ ] Clicked "Save" for each variable
- [ ] Redeployed service
- [ ] Waited for "Live" status
- [ ] Tested health endpoint
- [ ] Verified auth routes work

---

## 🎉 After Setup

Once environment variables are set:

✅ Backend will connect to MongoDB  
✅ JWT tokens will be generated correctly  
✅ User registration will work  
✅ Login will work  
✅ All API endpoints will function  

---

## 📱 Quick Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `MONGODB_URI` | Database connection | `mongodb+srv://...` |
| `JWT_SECRET` | Session encryption | Random 64-char string |

---

## 💡 Additional Variables (Optional)

If you want to add more features later:

### **Frontend URL (for CORS):**
```
FRONTEND_URL=https://planner-wedding.vercel.app
```

### **Port (usually auto-set by Render):**
```
PORT=5000
```

### **Email Service (if adding email features):**
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

---

## 🔗 Related Resources

- **Render Docs:** https://render.com/docs/environment-variables
- **MongoDB Atlas:** https://cloud.mongodb.com
- **JWT Info:** https://jwt.io
- **Your Backend:** https://planner-wedding.onrender.com

---

**Once you complete this setup, your backend will be fully functional with secure credentials!** 🚀
