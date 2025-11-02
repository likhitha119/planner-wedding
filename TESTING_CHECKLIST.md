# ✅ Complete Testing Checklist

## 🌐 Live URLs

### **Production Links:**
- **Frontend:** https://planner-wedding.vercel.app
- **Backend API:** https://planner-wedding.onrender.com
- **API Health:** https://planner-wedding.onrender.com/api/health
- **Test Connection Page:** https://planner-wedding.vercel.app/test-connection.html
- **GitHub Repository:** https://github.com/likhitha119/planner-wedding

---

## 🧪 Testing Checklist

### ✅ Backend Tests

#### **1. Health Check**
- [ ] Visit: https://planner-wedding.onrender.com/api/health
- [ ] **Expected:** `{"status":"OK", "routes":[...]}`
- [ ] **Status:** Should be 200 OK

#### **2. CORS Configuration**
- [ ] Backend allows requests from Vercel frontend
- [ ] No CORS errors in browser console
- [ ] **Check:** Browser F12 Console

#### **3. MongoDB Connection**
- [ ] Backend connects to MongoDB Atlas
- [ ] No connection errors in Render logs
- [ ] **Check:** Render dashboard → Logs

---

### ✅ Frontend Tests

#### **1. Homepage**
- [ ] Visit: https://planner-wedding.vercel.app
- [ ] Hero slider loads and animates
- [ ] All images display correctly
- [ ] Navigation menu works
- [ ] Smooth scroll to sections works
- [ ] Footer displays correctly

#### **2. About Page**
- [ ] Visit: https://planner-wedding.vercel.app/about
- [ ] Page loads without errors
- [ ] Content displays properly
- [ ] Images load correctly

#### **3. Theme Toggler**
- [ ] Click theme toggle button
- [ ] Colors change smoothly
- [ ] Theme persists on page reload
- [ ] All pages respect theme

---

### ✅ Authentication Tests

#### **1. Registration/Signup**
- [ ] Visit: https://planner-wedding.vercel.app/signup
- [ ] Fill form with new user data:
  ```
  Full Name: Test User
  Email: test@example.com
  Username: testuser123
  Password: Test1234!
  Confirm: Test1234!
  ```
- [ ] Click "Sign Up"
- [ ] **Expected:** Success message
- [ ] **Expected:** Redirect to login page
- [ ] **Check Console:** No errors
- [ ] **Check Network:** Status 201 Created

#### **2. Login**
- [ ] Visit: https://planner-wedding.vercel.app/login
- [ ] Enter credentials from signup
- [ ] Click "Login"
- [ ] **Expected:** Welcome message
- [ ] **Expected:** Redirect to home page
- [ ] **Expected:** User menu shows username
- [ ] **Check Console:** No errors
- [ ] **Check Network:** Status 200 OK

#### **3. Logout**
- [ ] Click logout button (if logged in)
- [ ] **Expected:** Redirect to home
- [ ] **Expected:** Login/Signup buttons appear
- [ ] **Expected:** Protected routes inaccessible

---

### ✅ Booking System Tests

#### **1. Checkout Page**
- [ ] Visit: https://planner-wedding.vercel.app/checkout
- [ ] Fill wedding booking form:
  ```
  Bride Name: Jane Doe
  Groom Name: John Doe
  Wedding Date: Future date
  Venue: Test Venue
  Guests: 100
  Budget: ₹500000
  ```
- [ ] Select package
- [ ] Click "Continue to Payment"
- [ ] **Expected:** Navigate to payment page
- [ ] **Check Console:** No errors

#### **2. Payment Page**
- [ ] Fill payment details
- [ ] Select payment method
- [ ] Submit payment
- [ ] **Expected:** Success confirmation
- [ ] **Expected:** Redirect to confirmation
- [ ] **Check Console:** No errors

---

### ✅ Contact Form Tests

#### **1. Contact Submission**
- [ ] Scroll to contact section on homepage
- [ ] Fill contact form:
  ```
  Name: Test User
  Email: test@example.com
  Phone: 1234567890
  Message: Test message
  ```
- [ ] Click "Send Message"
- [ ] **Expected:** Success toast notification
- [ ] **Expected:** Form clears after submission
- [ ] **Check Console:** No errors
- [ ] **Check Network:** Status 201 Created

---

### ✅ Performance Tests

#### **1. First Load (Cold Start)**
- [ ] Clear browser cache
- [ ] Visit site after 15+ min of inactivity
- [ ] **Expected:** May take 30-60 seconds (first request)
- [ ] **Expected:** "Backend starting up" message
- [ ] **Expected:** Subsequent requests are fast

#### **2. Subsequent Loads**
- [ ] Refresh page
- [ ] Navigate between pages
- [ ] **Expected:** Fast loading (1-2 seconds)
- [ ] **Expected:** No delays

#### **3. Keep-Alive Service**
- [ ] Open browser console (F12)
- [ ] Look for: `🔔 Keep-alive service started`
- [ ] Wait 14 minutes
- [ ] Look for: `✅ Backend pinged successfully`
- [ ] **Expected:** Automatic pings every 14 minutes

---

### ✅ Responsive Design Tests

#### **1. Mobile View**
- [ ] Resize browser to mobile size (375px)
- [ ] Navigation menu collapses
- [ ] All content is readable
- [ ] Images scale properly
- [ ] Forms are usable

#### **2. Tablet View**
- [ ] Resize browser to tablet size (768px)
- [ ] Layout adjusts appropriately
- [ ] All features work
- [ ] Images display correctly

#### **3. Desktop View**
- [ ] Full screen view (1920px)
- [ ] Layout looks professional
- [ ] All sections aligned properly
- [ ] Images are high quality

---

### ✅ Browser Compatibility Tests

- [ ] **Chrome:** All features work
- [ ] **Firefox:** All features work
- [ ] **Safari:** All features work
- [ ] **Edge:** All features work
- [ ] **Mobile Safari:** Works on iPhone
- [ ] **Chrome Mobile:** Works on Android

---

### ✅ Test Connection Page

#### **Visit:** https://planner-wedding.vercel.app/test-connection.html

- [ ] Page loads correctly
- [ ] Shows current API configuration
- [ ] Auto-tests health endpoint
- [ ] "Test Health" button works
- [ ] "Test Registration" button works
- [ ] "Test Login" button works
- [ ] All results display clearly
- [ ] Errors are shown with details

---

### ✅ Error Handling Tests

#### **1. Invalid Login**
- [ ] Try logging in with wrong password
- [ ] **Expected:** "Invalid credentials" error
- [ ] **Expected:** No redirect
- [ ] **Expected:** Error toast notification

#### **2. Duplicate Registration**
- [ ] Try registering with existing email
- [ ] **Expected:** "User already exists" error
- [ ] **Expected:** No account created
- [ ] **Expected:** Error toast notification

#### **3. Network Error Simulation**
- [ ] Turn off internet
- [ ] Try submitting a form
- [ ] **Expected:** "Cannot connect to server" error
- [ ] **Expected:** Helpful error message

#### **4. Invalid Form Data**
- [ ] Submit form with empty fields
- [ ] **Expected:** Validation error messages
- [ ] Submit form with invalid email
- [ ] **Expected:** "Valid email required" error

---

### ✅ Security Tests

#### **1. Protected Routes**
- [ ] Try accessing /admin/bookings without login
- [ ] **Expected:** Redirect to login
- [ ] **Expected:** Cannot access without auth

#### **2. Token Validation**
- [ ] Clear localStorage
- [ ] Try accessing protected route
- [ ] **Expected:** Redirect to login
- [ ] **Expected:** "Please login" message

#### **3. Input Sanitization**
- [ ] Try SQL injection in forms
- [ ] Try XSS scripts in forms
- [ ] **Expected:** Input sanitized
- [ ] **Expected:** No code execution

---

### ✅ Environment Variables Check

#### **Vercel (Frontend):**
- [ ] `VITE_API_URL` is set to: `https://planner-wedding.onrender.com`
- [ ] Variable is applied to Production
- [ ] Site redeployed after setting variable

#### **Render (Backend):**
- [ ] `NODE_ENV` = `production`
- [ ] `MONGODB_URI` = MongoDB connection string
- [ ] `JWT_SECRET` = Secret key (32+ chars)
- [ ] Backend redeployed after setting variables

---

## 📊 Test Results Summary

### **Expected Results:**

| Test Category | Expected Pass Rate |
|---------------|-------------------|
| Backend APIs | 100% |
| Frontend Pages | 100% |
| Authentication | 100% |
| Forms | 100% |
| Responsive | 100% |
| Performance | 90%+ (cold start may be slow) |

### **Common Issues & Solutions:**

| Issue | Solution |
|-------|----------|
| Slow first load | Normal - backend cold start (30-60s) |
| 404 errors | Check environment variables are set |
| CORS errors | Verify backend CORS config includes Vercel URL |
| Images not loading | Check public folder committed to Git |
| Forms not submitting | Check API URL in axios config |

---

## 🎯 Final Verification

### **Complete this final check:**

1. [ ] **Visit:** https://planner-wedding.vercel.app
2. [ ] **Sign up** with a new account
3. [ ] **Login** with new credentials
4. [ ] **Fill out** booking form
5. [ ] **Submit** contact form
6. [ ] **Test** all navigation links
7. [ ] **Check** console for errors (should be none)
8. [ ] **Verify** keep-alive is running

### **If all checks pass:**
✅ **Your application is production-ready!**

---

## 🆘 Troubleshooting

### **If tests fail:**

1. **Check Vercel Logs:**
   - Go to: https://vercel.com/dashboard
   - Click your project → Deployments → Latest
   - Check build and runtime logs

2. **Check Render Logs:**
   - Go to: https://dashboard.render.com
   - Click your service → Logs
   - Look for errors

3. **Check Browser Console:**
   - Press F12
   - Look for red errors
   - Check Network tab for failed requests

4. **Use Test Page:**
   - Visit: /test-connection.html
   - See exact error messages
   - Test individual endpoints

---

## 📞 Quick Links

- **Frontend:** https://planner-wedding.vercel.app
- **Backend:** https://planner-wedding.onrender.com/api/health
- **Test Page:** https://planner-wedding.vercel.app/test-connection.html
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Render Dashboard:** https://dashboard.render.com
- **GitHub:** https://github.com/likhitha119/planner-wedding

---

**✨ Happy Testing! Your wedding planner app is live!** 💍
