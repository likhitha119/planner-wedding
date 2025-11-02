# 🌐 Live Deployment URLs

## ✅ Your Live Application

### Frontend (Vercel)
**URL:** https://planner-wedding.vercel.app  
**Status:** 🟢 LIVE  
**Platform:** Vercel  
**Auto-deploys:** On every GitHub push to `main`

### Backend (Render)
**URL:** https://planner-wedding.onrender.com  
**API Base:** https://planner-wedding.onrender.com/api  
**Status:** 🟢 LIVE  
**Platform:** Render.com  
**Database:** MongoDB Atlas (Connected)

### Repository
**GitHub:** https://github.com/likhitha119/planner-wedding

---

## 🧪 Test Your Live Application

### 1. Test Backend Health
Open in browser:
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

### 2. Test Frontend
Open:
```
https://planner-wedding.vercel.app
```

**What to check:**
- ✅ Home page loads
- ✅ Images display correctly
- ✅ Hero slider works
- ✅ Gallery shows photos

### 3. Test Registration (MAIN TEST!)

1. **Go to:** https://planner-wedding.vercel.app
2. **Click:** "Sign Up" button in header
3. **Fill form:**
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Username: `testuser123`
   - Password: `Test123!`
   - Confirm Password: `Test123!`
4. **Click:** "Sign Up"
5. **Expected:** Green success toast → Redirect to Login

### 4. Test Login

1. **Go to:** https://planner-wedding.vercel.app/login
2. **Login with:**
   - Username: `testuser123`
   - Password: `Test123!`
3. **Expected:** Success toast → Redirect to home (logged in)

### 5. Test Booking

1. Make sure you're logged in
2. Click "Book Now" or go to Checkout
3. Fill out booking form
4. Select package and payment method
5. Submit booking
6. Check if booking is saved

### 6. Test Contact Form

1. Scroll to Contact section on home page
2. Fill out contact form
3. Submit
4. Check for success message

---

## 🔧 Configuration Details

### Frontend Configuration
- **Framework:** React + Vite
- **API Endpoint:** `https://planner-wedding.onrender.com/api`
- **Environment Variable:** `VITE_API_URL` (set in Vercel)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Root Directory:** `frontend`

### Backend Configuration
- **Runtime:** Node.js + Express
- **Database:** MongoDB Atlas
- **CORS Allowed Origins:**
  - `https://planner-wedding.vercel.app` ✅
  - `http://localhost:5173` (for local dev)
- **Environment Variables:**
  - `NODE_ENV=production`
  - `MONGODB_URI=<your-mongodb-connection>`
  - `JWT_SECRET=<your-secret>`

---

## 🚨 Troubleshooting

### Registration Not Working?

**Check Browser Console (F12):**

1. **If you see CORS error:**
   - Backend needs to be redeployed (I just updated it)
   - Go to Render dashboard → Click your service → "Manual Deploy" → Deploy

2. **If you see 404 error:**
   - Backend might be sleeping (free tier)
   - Visit: https://planner-wedding.onrender.com/api/health
   - Wait 30-60 seconds for it to wake up
   - Try registration again

3. **If you see Network Error:**
   - Check if backend is live
   - Test health endpoint
   - Check Vercel environment variables

### Images Not Showing?

- I already fixed this - images are now in GitHub
- Vercel should have auto-redeployed
- If still not showing, manually redeploy in Vercel dashboard

### Backend Slow to Respond?

- **Normal!** Render free tier sleeps after 15 min of inactivity
- First request takes 30-60 seconds to wake up
- After that, it's fast until it sleeps again
- Consider upgrading to paid tier for always-on

---

## 📊 Deployment Status

| Component | Platform | Status | URL |
|-----------|----------|--------|-----|
| Frontend | Vercel | 🟢 Live | https://planner-wedding.vercel.app |
| Backend API | Render | 🟢 Live | https://planner-wedding.onrender.com |
| Database | MongoDB Atlas | 🟢 Connected | Cloud Database |
| Repository | GitHub | 🟢 Updated | https://github.com/likhitha119/planner-wedding |

---

## 🔄 How Updates Work

### Making Changes:

1. **Edit code locally**
2. **Commit changes:**
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```
3. **Automatic deployments:**
   - ✅ Vercel: Redeploys frontend automatically
   - ✅ Render: Redeploys backend automatically
   - ⏱️ Takes 2-3 minutes

### Viewing Logs:

- **Vercel:** https://vercel.com/dashboard → Your Project → Deployments
- **Render:** https://dashboard.render.com → Your Service → Logs

---

## ✅ Final Verification Checklist

Test these on your live site:

- [ ] Home page loads: https://planner-wedding.vercel.app
- [ ] Backend health check works: https://planner-wedding.onrender.com/api/health
- [ ] Images display correctly
- [ ] User can sign up successfully
- [ ] User can login successfully
- [ ] Booking form works
- [ ] Contact form submits
- [ ] Admin panels accessible (if logged in as admin)

---

## 🎉 Your Stack

**Frontend:** React + Vite → Vercel  
**Backend:** Node.js + Express → Render  
**Database:** MongoDB Atlas  
**Storage:** GitHub  
**Total Cost:** $0 (100% Free Tier!)

---

**Last Updated:** 2025-11-02  
**Your Live App:** https://planner-wedding.vercel.app  
**API Endpoint:** https://planner-wedding.onrender.com/api
