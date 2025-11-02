# PowerShell script to update all .env files with FRONTEND_URL

$frontendUrl = "https://planner-wedding.vercel.app"
$backendDir = $PSScriptRoot

Write-Host "Updating all .env files with FRONTEND_URL..." -ForegroundColor Cyan

# List of env files to update
$envFiles = @(".env", ".env.local", ".env.new")

foreach ($file in $envFiles) {
    $filePath = Join-Path $backendDir $file
    
    if (Test-Path $filePath) {
        Write-Host "Updating $file..." -ForegroundColor Yellow
        
        # Read current content
        $content = Get-Content $filePath -Raw
        
        # Check if FRONTEND_URL already exists
        if ($content -match "FRONTEND_URL=") {
            # Update existing FRONTEND_URL
            $content = $content -replace "FRONTEND_URL=.*", "FRONTEND_URL=$frontendUrl"
            Write-Host "  Updated existing FRONTEND_URL" -ForegroundColor Green
        } else {
            # Add FRONTEND_URL if it doesn't exist
            $content = $content.TrimEnd() + "`nFRONTEND_URL=$frontendUrl`n"
            Write-Host "  Added FRONTEND_URL" -ForegroundColor Green
        }
        
        # Write back to file
        Set-Content -Path $filePath -Value $content -NoNewline
    } else {
        Write-Host "  $file not found, skipping..." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "All .env files updated successfully!" -ForegroundColor Green
Write-Host "FRONTEND_URL=$frontendUrl" -ForegroundColor White
