# Deploy Backend to Render.com

## Prerequisites
- GitHub account with your code pushed
- Render.com account (free tier available)

## Step-by-Step Deployment Instructions

### 1. Push Your Updated Code to GitHub

```bash
git add .
git commit -m "Configure backend for Render deployment"
git push origin main
```

### 2. Create a Render Account
- Go to https://render.com
- Sign up using your GitHub account

### 3. Create a New Web Service

1. Click **"New +"** button → Select **"Web Service"**
2. Connect your GitHub repository: `likhitha119/planner-wedding`
3. Configure the service:

   **Basic Settings:**
   - **Name:** `wedding-planner-backend`
   - **Region:** Oregon (US West) or closest to you
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

   **Instance Type:**
   - Select **Free** tier

### 4. Add Environment Variables

In the "Environment Variables" section, add:

```
NODE_ENV = production
PORT = 10000
MONGODB_URI = mongodb+srv://talagapulikhitha:likki143babe@wedding-plan.umvwmsl.mongodb.net/wedding-planner?retryWrites=true&w=majority&ssl=true&authSource=admin
JWT_SECRET = a8f5f167f44f4964e6c998dee827110c8b2e4a7d3f9c1b5e8a2d6f4c9e7b3a1f
FRONTEND_URL = http://localhost:5173
```

**Important:** Update `FRONTEND_URL` later when you deploy your frontend.

### 5. Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Start your server
   - Provide you with a URL like: `https://wedding-planner-backend.onrender.com`

### 6. Verify Deployment

Once deployed, test your API:
- Visit: `https://your-app-name.onrender.com/api/health`
- You should see: `{"status": "OK", "message": "Wedding Planner API with MongoDB Atlas is running"}`

### 7. Update Frontend Configuration

After deployment, update your frontend to use the Render backend URL:

In `frontend/src/` files, change API calls from:
```javascript
const API_URL = 'http://localhost:5000/api';
```

To:
```javascript
const API_URL = 'https://your-app-name.onrender.com/api';
```

### 8. Update CORS (Optional)

After deploying your frontend, add the frontend URL to Render environment variables:
- Go to your Render dashboard
- Click on your service
- Go to "Environment"
- Update `FRONTEND_URL` with your deployed frontend URL

## Important Notes

### Free Tier Limitations
- **Spins down after 15 minutes of inactivity**
- First request after sleep may take 30-60 seconds
- 750 hours/month free (enough for one service)

### MongoDB Atlas
- Your MongoDB is already hosted on Atlas (included in your connection string)
- No additional setup needed
- Make sure your Atlas cluster allows connections from anywhere (0.0.0.0/0) or Render's IPs

### Automatic Deploys
- Render automatically redeploys when you push to GitHub
- Monitor deployment logs in the Render dashboard

## Troubleshooting

### Build Fails
- Check the logs in Render dashboard
- Ensure `package.json` has all dependencies
- Verify `npm start` works locally

### Connection Issues
- Check MongoDB Atlas Network Access settings
- Verify environment variables are set correctly
- Check CORS configuration

### API Not Responding
- Service may be sleeping (free tier) - first request takes time
- Check service logs for errors
- Verify PORT is set to 10000

## Your Backend URL
After deployment, your backend will be available at:
`https://wedding-planner-backend.onrender.com`

Use this URL in your frontend for API calls!
