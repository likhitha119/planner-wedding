# 🧪 Test Your Deployment - Complete Checklist

## ⚠️ IMPORTANT: Vercel Environment Variable

**YOU MUST SET THIS IN VERCEL DASHBOARD:**

1. Go to: https://vercel.com/dashboard
2. Click your project
3. Go to: **Settings** → **Environment Variables**
4. Add this variable:
   ```
   Name: VITE_API_URL
   Value: https://planner-wedding.onrender.com
   ```
5. Click **"Save"**
6. Click **"Redeploy"** to apply changes

**If this is not set, your site will try to call wrong URLs!**

---

## 📋 Current Configuration

### Backend (Render):
- **URL:** https://planner-wedding.onrender.com
- **Routes:**
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/contact`
  - `POST /api/bookings`

### Frontend (Vercel):
- **URL:** https://planner-wedding.vercel.app
- **API Base:** https://planner-wedding.onrender.com
- **Calls:** `/api/auth/register`, `/api/auth/login`, etc.

---

## ✅ Step-by-Step Test

### Step 1: Test Backend Directly

**Open in browser:**
```
https://planner-wedding.onrender.com/api/health
```

**Should see:**
```json
{
  "status": "OK",
  "message": "Wedding Planner API with MongoDB Atlas is running",
  "routes": ["POST /api/auth/register", "POST /api/auth/login", ...]
}
```

✅ **If you see this**, backend is working!

---

### Step 2: Test Frontend URL Configuration

1. Go to: https://planner-wedding.vercel.app
2. Press **F12** (Developer Tools)
3. Go to **Console** tab
4. Look for:
   ```
   🔧 API URL: https://planner-wedding.onrender.com
   ```

**Should NOT see:**
- ❌ `https://planner-wedding.onrender.com/api` (double /api)
- ❌ `undefined`
- ❌ Empty string

---

### Step 3: Test Registration

1. Click **"Sign Up"**
2. Fill form:
   - Full Name: `Test User`
   - Email: `test123@example.com`
   - Username: `testuser123`
   - Password: `Test1234!`
   - Confirm: `Test1234!`
3. Click **"Sign Up"**

**In Console, look for:**
```
📤 Sending registration to: https://planner-wedding.onrender.com
```

**In Network Tab (F12 → Network):**
- Request URL should be: `https://planner-wedding.onrender.com/api/auth/register`
- Method: POST
- Status: 201 Created

---

### Step 4: Check for Errors

**Common errors and fixes:**

#### Error 1: "API endpoint not found" or 404
**Cause:** Wrong URL being called

**Check:**
- Console log shows correct base URL?
- Network tab shows correct request URL?
- Not calling `/api/api/...`?

**Fix:** Set `VITE_API_URL` in Vercel environment variables

#### Error 2: CORS error
**Cause:** Backend not allowing frontend domain

**Fix:** Backend already configured, should work

#### Error 3: Timeout after 60 seconds
**Cause:** Backend sleeping (first request)

**Fix:** Wait and try again. Keep-alive will prevent future issues

#### Error 4: Network error
**Cause:** Cannot reach backend

**Check:** Is backend live at https://planner-wedding.onrender.com/api/health?

---

## 🔧 Debug Commands

### Test Backend with curl (PowerShell):

**Test Health:**
```powershell
Invoke-WebRequest -Uri "https://planner-wedding.onrender.com/api/health"
```

**Test Registration:**
```powershell
$body = @{
    fullname = "Test User"
    email = "test@example.com"
    username = "testuser"
    password = "Test1234"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://planner-wedding.onrender.com/api/auth/register" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

---

## 🎯 Expected vs Actual URLs

### ✅ CORRECT:
```
Frontend calls: /api/auth/register
Base URL: https://planner-wedding.onrender.com
Final URL: https://planner-wedding.onrender.com/api/auth/register ✅
```

### ❌ WRONG (Double /api):
```
Frontend calls: /api/auth/register
Base URL: https://planner-wedding.onrender.com/api
Final URL: https://planner-wedding.onrender.com/api/api/auth/register ❌
```

---

## 📊 Checklist Before Testing

- [ ] Backend is live (check health endpoint)
- [ ] Frontend deployed to Vercel
- [ ] `VITE_API_URL` set in Vercel environment variables
- [ ] Vercel redeployed after setting variable
- [ ] Browser cache cleared (Ctrl+Shift+Delete)
- [ ] Console open (F12) to see logs
- [ ] Network tab open to monitor requests

---

## 🆘 Still Not Working?

### Provide these details:

1. **Console log output:**
   - What does "🔧 API URL:" show?
   - Any error messages?

2. **Network tab:**
   - What URL is being called?
   - What status code? (200, 404, 500, etc.)
   - Screenshot of request details

3. **Backend health check:**
   - Does https://planner-wedding.onrender.com/api/health work?
   - What does it return?

4. **Vercel environment:**
   - Screenshot of environment variables
   - Is `VITE_API_URL` set correctly?

---

## 💡 Quick Fixes

### If "API endpoint not found":
1. Check Vercel env variable is set
2. Redeploy on Vercel
3. Clear browser cache

### If "Backend need to redeploy":
1. Backend is probably fine
2. Check frontend is calling correct URL
3. Check Network tab for actual URL

### If timeout/slow:
1. Backend is sleeping (normal for first request)
2. Wait 30-60 seconds
3. Try again - should be fast

---

**Most likely issue: VITE_API_URL not set in Vercel!**
**Go set it now and redeploy!**
