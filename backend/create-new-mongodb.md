# Create New MongoDB Atlas Setup

## Step-by-Step New Setup

### 1. Create New Project
- Go to: https://cloud.mongodb.com/
- Click "New Project"
- Name: "Wedding-Planner-Fresh"
- Click "Create Project"

### 2. Create New Cluster
- Click "Create Cluster"
- Choose "M0 Sandbox" (FREE)
- Cloud Provider: AWS
- Region: Choose closest to India (e.g., Mumbai ap-south-1)
- Cluster Name: "wedding-cluster"
- Click "Create Cluster"

### 3. Create Database User
- Click "Database Access" → "Add New Database User"
- Authentication Method: Password
- Username: `weddingadmin`
- Password: `Wedding2024!` (or your choice)
- Database User Privileges: "Atlas admin"
- Click "Add User"

### 4. Setup Network Access
- Click "Network Access" → "Add IP Address"
- Click "Allow Access from Anywhere" (0.0.0.0/0)
- Comment: "Development Access"
- Click "Confirm"

### 5. Get Connection String
- Go to "Clusters" → Click "Connect"
- Choose "Connect your application"
- Driver: Node.js, Version: 4.1 or later
- Copy connection string
- Replace `<password>` with your actual password

### 6. New Connection String Format
```
mongodb+srv://weddingadmin:Wedding2024!@wedding-cluster.xxxxx.mongodb.net/wedding-planner?retryWrites=true&w=majority
```

### 7. Update .env File
```env
PORT=3000
MONGODB_URI=mongodb+srv://weddingadmin:Wedding2024!@wedding-cluster.xxxxx.mongodb.net/wedding-planner?retryWrites=true&w=majority
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c8b2e4a7d3f9c1b5e8a2d6f4c9e7b3a1f
NODE_ENV=development
```
