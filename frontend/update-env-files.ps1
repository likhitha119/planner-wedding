# PowerShell script to update all frontend .env files with backend URL

$backendUrl = "https://planner-wedding.onrender.com"
$frontendDir = $PSScriptRoot

Write-Host "Updating all frontend .env files with backend URL..." -ForegroundColor Cyan

# List of env files to update
$envFiles = @(".env", ".env.production", ".env.local")

foreach ($file in $envFiles) {
    $filePath = Join-Path $frontendDir $file
    
    if (Test-Path $filePath) {
        Write-Host "Updating $file..." -ForegroundColor Yellow
        
        # Read current content
        $content = Get-Content $filePath -Raw
        
        # Check if VITE_API_URL already exists
        if ($content -match "VITE_API_URL=") {
            # Update existing VITE_API_URL
            $content = $content -replace "VITE_API_URL=.*", "VITE_API_URL=$backendUrl"
            Write-Host "  Updated existing VITE_API_URL" -ForegroundColor Green
        } else {
            # Add VITE_API_URL if it doesn't exist
            $content = $content.TrimEnd() + "`nVITE_API_URL=$backendUrl`n"
            Write-Host "  Added VITE_API_URL" -ForegroundColor Green
        }
        
        # Write back to file
        Set-Content -Path $filePath -Value $content -NoNewline
    } else {
        Write-Host "  $file not found, creating..." -ForegroundColor Yellow
        Set-Content -Path $filePath -Value "VITE_API_URL=$backendUrl`n" -NoNewline
        Write-Host "  Created $file with VITE_API_URL" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "All frontend .env files updated successfully!" -ForegroundColor Green
Write-Host "VITE_API_URL=$backendUrl" -ForegroundColor White
