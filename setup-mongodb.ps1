# MongoDB Local Setup Script for Wedding Planner

Write-Host "🚀 Setting up MongoDB for Wedding Planner..." -ForegroundColor Green

# Check if MongoDB is already installed
$mongoPath = Get-Command mongod -ErrorAction SilentlyContinue
if ($mongoPath) {
    Write-Host "✅ MongoDB is already installed!" -ForegroundColor Green
} else {
    Write-Host "📦 Installing MongoDB Community Server..." -ForegroundColor Yellow
    
    # Try winget first
    try {
        winget install MongoDB.Server --accept-source-agreements --accept-package-agreements
        Write-Host "✅ MongoDB installed via winget!" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Winget failed, trying Chocolatey..." -ForegroundColor Yellow
        
        # Try chocolatey
        try {
            choco install mongodb -y
            Write-Host "✅ MongoDB installed via Chocolatey!" -ForegroundColor Green
        } catch {
            Write-Host "❌ Automatic installation failed. Please install manually:" -ForegroundColor Red
            Write-Host "   1. Go to: https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
            Write-Host "   2. Download MongoDB Community Server" -ForegroundColor Yellow
            Write-Host "   3. Run the installer with default settings" -ForegroundColor Yellow
            exit 1
        }
    }
}

# Create MongoDB data directory
$dataDir = "C:\data\db"
if (!(Test-Path $dataDir)) {
    Write-Host "📁 Creating MongoDB data directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $dataDir -Force
    Write-Host "✅ Data directory created: $dataDir" -ForegroundColor Green
}

# Start MongoDB service
Write-Host "🔄 Starting MongoDB service..." -ForegroundColor Yellow
try {
    Start-Service MongoDB -ErrorAction Stop
    Write-Host "✅ MongoDB service started!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Service not found, starting MongoDB manually..." -ForegroundColor Yellow
    
    # Start MongoDB manually
    Start-Process -FilePath "mongod" -ArgumentList "--dbpath", $dataDir -WindowStyle Hidden
    Start-Sleep -Seconds 3
    Write-Host "✅ MongoDB started manually!" -ForegroundColor Green
}

# Test MongoDB connection
Write-Host "🧪 Testing MongoDB connection..." -ForegroundColor Yellow
try {
    $testResult = mongo --eval "db.runCommand({connectionStatus: 1})" --quiet
    Write-Host "✅ MongoDB connection successful!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ MongoDB connection test failed, but it might still work" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 MongoDB setup complete!" -ForegroundColor Green
Write-Host "📝 Your .env file should contain:" -ForegroundColor Yellow
Write-Host "   MONGODB_URI=mongodb://localhost:27017/wedding-planner" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Now restart your backend server with: npm run dev" -ForegroundColor Green
