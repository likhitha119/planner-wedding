# 🧪 Wedding Planner - Complete Testing Guide

## Quick Start Testing

### 1️⃣ Test User Registration (Signup)

**Navigate to:** http://localhost:5174/signup

**Test Data:**
```
Full Name: John Doe
Email: john.doe@example.com
Username: johndoe
Password: password123
Confirm Password: password123
```

**Expected Result:**
- ✅ Success toast: "Registration successful! Redirecting to login..."
- ✅ Immediate redirect to Login page
- ✅ No delay, instant navigation

---

### 2️⃣ Test User Login

**Navigate to:** http://localhost:5174/login

**Test Data:**
```
Username or Email: johndoe
Password: password123
```

**Expected Result:**
- ✅ Success toast: "Welcome back, John Doe!"
- ✅ Immediate redirect to Home page
- ✅ User profile appears in header (if implemented)
- ✅ Back button does NOT return to login page

---

### 3️⃣ Test Wedding Booking - Complete Flow

#### Step 1: Navigate to Checkout
**URL:** http://localhost:5174/checkout

#### Step 2: Fill Couple Information
```
Groom's Full Name: Michael Anderson
Bride's Full Name: Sarah Williams
Contact Email: michael.sarah@wedding.com
Phone Number: 9876543210
```

#### Step 3: Fill Event Details
```
Wedding Date: [Select any future date]
Ceremony Time: 18:00
Number of Guests: 200
Venue Type: Garden 🌳
```

#### Step 4: Select Package
- Click on one of the package cards:
  - 🥉 Basic Package - ₹2,00,000
  - 🥈 Premium Package - ₹4,00,000
  - 🥇 Luxury Package - ₹8,00,000

#### Step 5: Select Additional Services (Optional)
Check any of these:
- 🍽️ Catering - ₹50,000
- 📸 Photography - ₹30,000
- 🎵 Music - ₹25,000
- 🎨 Decoration - ₹40,000

#### Step 6: Review Price Summary
- Package price should be displayed
- Additional services should be listed with prices
- Total amount should be calculated correctly

#### Step 7: Submit
- Click "Proceed to Payment →"
- ✅ Should navigate immediately to Payment page
- ✅ All booking data should be preserved

---

### 4️⃣ Test Card Payment

**On Payment Page:**

#### Payment Method: Card 💳

**Test Card Data:**
```
Card Number: 1234 5678 9012 3456
Cardholder Name: Michael Anderson
Expiry Date: 12/26
CVV: 123
```

**Steps:**
1. Select "Card" tab
2. Enter card details (auto-formats as you type)
3. Click "Pay ₹[Total Amount]"

**Expected Results:**
- ✅ Card number formats with spaces: "1234 5678 9012 3456"
- ✅ Expiry auto-formats: "12/26"
- ✅ CVV limited to 3 digits
- ✅ Button shows "Processing..." with spinner
- ✅ 2-second simulated processing
- ✅ Success toast: "Payment successful! 🎉"
- ✅ Immediate redirect to Booking Confirmation

**Test Validation:**
- Try clicking Pay with empty fields → Should show error
- Try 15-digit card number → Should show "Card number must be 16 digits"
- Try 2-digit CVV → Should show "CVV must be 3 digits"
- Try incomplete expiry → Should show "Invalid expiry date format"

---

### 5️⃣ Test UPI Payment

**On Payment Page:**

#### Payment Method: UPI 📱

**Test UPI Data:**
```
UPI ID: michael@paytm
```

Or try:
```
john@phonepe
sarah@googlepay
user@okhdfcbank
```

**Steps:**
1. Select "UPI" tab
2. Enter UPI ID
3. Click "Pay ₹[Total Amount]"

**Expected Results:**
- ✅ UPI ID validation checks for '@' symbol
- ✅ Processing with 2-second delay
- ✅ Success toast and immediate redirect

**Test Validation:**
- Try without '@' → Should show "UPI ID must contain @ symbol"
- Try empty field → Should show "Please enter your UPI ID"

---

### 6️⃣ Test Wallet Payment

**On Payment Page:**

#### Payment Method: Wallet 👛

**Steps:**
1. Select "Wallet" tab
2. Choose one wallet option:
   - 💙 Paytm Wallet
   - 💜 PhonePe Wallet
   - 🟠 Amazon Pay
3. Click "Pay ₹[Total Amount]"

**Expected Results:**
- ✅ Radio button selection tracked
- ✅ Can switch between wallet options
- ✅ Processing and success redirect

**Test Validation:**
- Click Pay without selecting wallet → Should show "Please select a wallet option"

---

### 7️⃣ Test Booking Confirmation Page

**After Successful Payment:**

**Should Display:**
- ✅ Success animation/checkmark
- ✅ "🎉 Booking Confirmed!" heading
- ✅ Booking ID (e.g., WED-1762065715547-2CA2R0)
- ✅ Transaction ID
- ✅ Couple names (Michael Anderson & Sarah Williams)
- ✅ Wedding date (formatted nicely)
- ✅ Ceremony time
- ✅ Venue type
- ✅ Number of guests
- ✅ Package selected
- ✅ Additional services list
- ✅ Total amount
- ✅ Contact information (email, phone)
- ✅ Status badge: "Confirmed"
- ✅ Next steps information

**Test Navigation:**
- Click "Return to Home" → Should go to home page
- Click "Print Confirmation" → Should open print dialog

---

## 🔍 Edge Case Testing

### Test 1: Validation Errors - Checkout Page
Try submitting with:
- Names less than 2 characters
- Invalid email format
- Phone less than 10 digits
- Past date for wedding
- No venue selected
- No package selected

**Expected:** Specific error toast for each validation failure

---

### Test 2: Payment Method Switching
1. Select Card, fill some details
2. Switch to UPI
3. Switch to Wallet
4. Switch back to Card

**Expected:** 
- ✅ Wallet selection should reset when leaving Wallet method
- ✅ No validation errors from previous method
- ✅ Clean state for each method

---

### Test 3: Back Navigation - Payment Page
1. Complete checkout
2. On payment page, click "← Back to Checkout"
3. Verify all form data is preserved
4. Make changes
5. Submit again

**Expected:** 
- ✅ Can edit booking details
- ✅ New total calculated correctly
- ✅ Payment page gets updated data

---

### Test 4: Direct URL Access
**Try accessing:**
- http://localhost:5174/payment (without booking data)
  - Should redirect to checkout with error message

- http://localhost:5174/booking-confirmation (without booking)
  - Should show "No booking information found"
  - Should show link to checkout

---

### Test 5: Form Field Formatting
**Card Number:**
- Type: 1234567890123456
- Should format to: 1234 5678 9012 3456

**Expiry Date:**
- Type: 1226
- Should format to: 12/26

**CVV:**
- Type: 12345
- Should limit to: 123

---

## 📊 API Testing

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Wedding Planner API with MongoDB Atlas is running",
  "timestamp": "2025-11-02T12:00:00.000Z"
}
```

---

### Test User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "Test User",
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123"
  }'
```

---

### Test User Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

---

### Test Booking Creation
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "groom": "John Doe",
    "bride": "Jane Smith",
    "email": "john@example.com",
    "phone": "1234567890",
    "date": "2025-12-31",
    "time": "18:00",
    "guests": 150,
    "venue": "garden",
    "package": "premium",
    "services": ["catering", "photography"],
    "paymentMethod": "card",
    "paymentDetails": {"last4": "3456"}
  }'
```

---

## 🎯 Test Results Checklist

### Navigation Tests
- [ ] Login → Home (immediate)
- [ ] Signup → Login (immediate)
- [ ] Checkout → Payment (immediate)
- [ ] Payment → Confirmation (immediate on success)
- [ ] Payment → Checkout (immediate on error)
- [ ] Back buttons work correctly
- [ ] Browser back/forward work as expected

### Payment Tests
- [ ] Card payment works
- [ ] UPI payment works
- [ ] Wallet payment works
- [ ] All validations show correct errors
- [ ] Payment method switching works
- [ ] Form formatting works (card, expiry, CVV)

### Booking Tests
- [ ] All form fields validate correctly
- [ ] Package selection works
- [ ] Service selection works
- [ ] Price calculation is accurate
- [ ] Data persists through navigation
- [ ] Confirmation shows all details

### Error Handling
- [ ] Empty form submissions blocked
- [ ] Invalid data formats caught
- [ ] API errors shown to user
- [ ] Missing data redirects handled

---

## 🐛 Common Issues & Solutions

### Issue: Payment Not Processing
**Check:**
1. Backend is running (http://localhost:5000/api/health)
2. MongoDB connection is active
3. Browser console for errors
4. Network tab for failed API calls

### Issue: Navigation Not Working
**Check:**
1. React Router is loaded
2. No console errors
3. Check browser history state
4. Verify Link components imported

### Issue: Form Data Not Persisting
**Check:**
1. State is passed via navigate()
2. useLocation hook is implemented
3. location.state is accessed correctly

### Issue: Validation Not Working
**Check:**
1. All fields have proper validation
2. Error messages are displayed
3. Form submission is prevented
4. Required fields are marked

---

## ✅ Testing Complete

Once all tests pass:
1. Application is ready for production
2. All features working as expected
3. Navigation is smooth and instant
4. Payment processing is functional
5. Error handling is robust

**Happy Testing! 🎉**
