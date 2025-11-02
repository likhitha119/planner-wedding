# 🚀 Super Simple Render Deployment - Just Follow These Steps!

## ⚡ Quick Steps (5 minutes)

### Step 1: Open Render.com
Go to: **https://render.com**

### Step 2: Sign Up with GitHub
- Click **"Get Started for Free"** or **"Sign Up"**
- Choose **"Sign up with GitHub"**
- Authorize Render to access your repositories

### Step 3: Create New Web Service
- Click the blue **"New +"** button (top right)
- Select **"Web Service"**

### Step 4: Connect Your Repository
- Find and click: **`likhitha119/planner-wedding`**
- Click **"Connect"**

### Step 5: Configure Service
Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `wedding-planner-backend` |
| **Region** | Oregon (US West) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

### Step 6: Add Environment Variables
Scroll down to "Environment Variables" section and click **"Add Environment Variable"**

Add these THREE variables:

**Variable 1:**
```
Key: NODE_ENV
Value: production
```

**Variable 2:**
```
Key: MONGODB_URI
Value: mongodb+srv://talagapulikhitha:likki143babe@wedding-plan.umvwmsl.mongodb.net/wedding-planner?retryWrites=true&w=majority&ssl=true&authSource=admin
```

**Variable 3:**
```
Key: JWT_SECRET
Value: a8f5f167f44f4964e6c998dee827110c8b2e4a7d3f9c1b5e8a2d6f4c9e7b3a1f
```

### Step 7: Deploy!
- Click the blue **"Create Web Service"** button at the bottom
- Wait 2-3 minutes for deployment

### Step 8: Get Your URL
After deployment completes:
- You'll see "Live" with a green dot
- Your backend URL will be: `https://wedding-planner-backend.onrender.com`
- Click the URL to test: `/api/health` should show `{"status": "OK"}`

---

## ✅ That's It!

Your backend is now live on Render! 

**Your Backend URL:** Copy this URL - you'll need it for the frontend!

---

## 🔧 If Something Goes Wrong

### Build Failed?
- Click "Logs" tab
- Look for red error messages
- Common fix: Check if all 3 environment variables are set correctly

### Can't See Your Repo?
- Go back to Render dashboard
- Click your profile → Account Settings → GitHub
- Click "Configure" and make sure the repository is accessible

### App Not Responding?
- Free tier sleeps after 15 minutes
- First request takes 30-60 seconds to wake up
- Refresh the page and wait

---

## 📞 Need Help?

Check these:
1. All 3 environment variables are added ✓
2. Root Directory is set to `backend` ✓
3. Build command is `npm install` ✓
4. Start command is `npm start` ✓

Still stuck? Check the logs for error messages!
