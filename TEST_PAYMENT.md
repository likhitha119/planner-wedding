# Payment Troubleshooting Guide

## Step-by-Step Testing:

### 1. Open Browser Console
- Press `F12` in your browser
- Go to the **Console** tab
- Keep it open during testing

### 2. Test Checkout Page
- Go to: http://localhost:5173/checkout
- Fill in all fields:
  - Groom: Test Groom
  - Bride: Test Bride
  - Email: test@test.com
  - Phone: 1234567890
  - Date: Select any future date
  - Time: 10:00
  - Guests: 100
  - Venue: Select any
  - Package: Click any package
- Click "Proceed to Payment"
- **Check console for errors**

### 3. Check What Happens
Look in the console for:
- ✅ "Proceeding to payment..." - means checkout works
- ❌ Any red error messages - copy and share with me

### 4. If You Reach Payment Page
- Select **Card** payment
- Enter:
  - Card: `4111 1111 1111 1111`
  - Name: `Test User`
  - Expiry: `12/25`
  - CVV: `123`
- Click "Pay ₹..." button
- **Check console for:**
  - `📤 Submitting booking:` - shows data being sent
  - `✅ Booking response:` - shows success
  - Any errors in red

### 5. Check Network Tab
- In DevTools, go to **Network** tab
- Try payment again
- Look for request to `/api/bookings`
- Click on it to see:
  - Request payload (what's being sent)
  - Response (what server returns)
  - Status code (should be 201)

## Common Issues:

### Issue 1: "Cannot read properties of undefined"
- Means data isn't being passed correctly
- Check if you filled all checkout fields

### Issue 2: "Network Error" or 404
- Backend isn't running
- Check: http://localhost:5000/api/health

### Issue 3: Nothing happens when clicking Pay
- Check browser console for errors
- Make sure all payment fields are filled

## Quick Test API Directly:

Open a new PowerShell and run:
```powershell
curl http://localhost:5000/api/health
```

Should show: `{"status":"OK"}`

## What to Share with Me:

1. **Exact error message** from console (copy full red text)
2. **Which step fails** (Checkout → Payment or Payment → Confirmation)
3. **Screenshot** of console errors if possible
4. **Network tab** status code and response

This will help me fix the exact issue!
