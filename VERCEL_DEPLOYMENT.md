# 🚀 Deploy Frontend to Vercel - Step by Step

## ⚡ Quick Deploy (5 minutes)

### Step 1: Go to Vercel
Open: **https://vercel.com**

### Step 2: Sign Up with GitHub
- Click **"Start Deploying"** or **"Sign Up"**
- Choose **"Continue with GitHub"**
- Authorize Vercel to access your repositories

### Step 3: Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Find your repository: **`likhitha119/planner-wedding`**
3. Click **"Import"**

### Step 4: Configure Project Settings

**Framework Preset:** Vite

**Root Directory:** Click "Edit" and enter: `frontend`

**Build Settings:**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 5: Add Environment Variable

Click **"Environment Variables"** section:

**Add this variable:**
```
Name: VITE_API_URL
Value: https://planner-wedding.onrender.com/api
```

Click **"Add"**

### Step 6: Deploy!

1. Click the big blue **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. You'll see "🎉 Congratulations!" when done

### Step 7: Get Your URL

After deployment:
- You'll get a URL like: `https://planner-wedding.vercel.app`
- Click it to see your live site!
- Share this URL with anyone!

---

## ✅ What Happens During Deployment

1. ✅ Vercel clones your GitHub repo
2. ✅ Navigates to `frontend` directory
3. ✅ Runs `npm install` to install dependencies
4. ✅ Runs `npm run build` to create production build
5. ✅ Deploys the `dist` folder to Vercel CDN
6. ✅ Gives you a live URL

---

## 🔄 Automatic Deployments

**Good News:** Every time you push to GitHub, Vercel will automatically redeploy!

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

Vercel will detect the push and deploy automatically!

---

## 🧪 Testing Your Deployed Site

Once deployed, test these features:

### 1. Home Page
- ✅ Hero slider working
- ✅ Services displayed
- ✅ Gallery images loading
- ✅ Contact form working

### 2. Authentication
- ✅ Sign up new user
- ✅ Login with credentials
- ✅ JWT token stored

### 3. Booking System
- ✅ Fill out booking form
- ✅ Select package
- ✅ Choose payment method
- ✅ Submit booking

### 4. Contact Form
- ✅ Fill out contact form
- ✅ Submit message
- ✅ See success toast

---

## 🛠️ Troubleshooting

### Build Failed?

**Check these:**
1. Go to Vercel dashboard → Click your project → "Deployments" tab
2. Click on the failed deployment
3. Check build logs for errors

**Common fixes:**
- Make sure `Root Directory` is set to `frontend`
- Verify `Build Command` is `npm run build`
- Check if `Output Directory` is `dist`

### API Calls Not Working?

**Check:**
1. Environment variable `VITE_API_URL` is set correctly
2. Backend is live at: https://planner-wedding.onrender.com
3. Open browser console (F12) to see any errors

### 404 Errors on Refresh?

The `vercel.json` file I created handles this - all routes redirect to `index.html`

### CORS Errors?

Your backend is already configured to accept requests from any origin in production mode. No changes needed!

---

## 📱 Custom Domain (Optional)

Want a custom domain like `wedding-planner.com`?

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS setup instructions
5. Vercel provides free SSL certificate!

---

## 🔧 Advanced Configuration

### Update Backend URL Later

If you need to change the backend URL:

1. Go to Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Edit `VITE_API_URL`
5. Redeploy (Vercel will prompt you)

### Preview Deployments

- Every git branch gets its own preview URL
- Perfect for testing before merging to main
- Create branch: `git checkout -b feature-name`
- Push: `git push origin feature-name`
- Vercel creates preview URL automatically!

---

## 📊 What You'll Get

| Feature | Status |
|---------|--------|
| 🌐 Live URL | https://your-project.vercel.app |
| 🔄 Auto Deploy | On every git push |
| 🚀 CDN | Global edge network |
| 📊 Analytics | Free basic analytics |
| 🔒 HTTPS | Free SSL certificate |
| 🎯 Preview URLs | For every branch |

---

## 🎉 After Deployment

### Update Your README

Add your live URLs:
```markdown
## 🌐 Live Demo

- **Frontend:** https://your-project.vercel.app
- **Backend:** https://planner-wedding.onrender.com
```

### Test Everything

- [ ] Homepage loads
- [ ] User signup works
- [ ] User login works
- [ ] Booking form submits
- [ ] Contact form works
- [ ] Admin panels accessible

### Share Your Links!

- Frontend: `https://your-project.vercel.app`
- Backend: `https://planner-wedding.onrender.com`
- GitHub: `https://github.com/likhitha119/planner-wedding`

---

## 💡 Pro Tips

1. **First Load May Be Slow:** Backend on Render free tier sleeps after 15 min
2. **Keep Testing:** Test all features after deployment
3. **Check Logs:** Vercel dashboard has detailed logs
4. **Monitor:** Vercel shows real-time visitor analytics

---

## 🆘 Need Help?

**Vercel Dashboard:** https://vercel.com/dashboard
**Vercel Docs:** https://vercel.com/docs
**Support:** support@vercel.com

---

## ✅ Deployment Checklist

Before deploying:
- [x] Backend is live on Render
- [x] Frontend built successfully (`npm run build`)
- [x] `vercel.json` configuration created
- [x] Environment variable ready
- [x] GitHub repo is up to date

After deploying:
- [ ] Test all pages
- [ ] Test authentication
- [ ] Test booking system
- [ ] Test contact form
- [ ] Share your live URL!

---

**Ready to deploy? Follow the steps above and you'll have your site live in 5 minutes!** 🚀
