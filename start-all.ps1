# =========================
# PowerShell script to start all required processes
# =========================

Write-Host "Starting Agritrace + Mock Digilocker setup..." -ForegroundColor Cyan

# Function to run a command in a new window
function Run-CommandInNewWindow($path, $command, $title) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$path'; $command" -WindowStyle Normal -Verb RunAs
    Write-Host "Started $title at $path" -ForegroundColor Green
}

# 1️⃣ Agritrace: Auto-git nodemon
Run-CommandInNewWindow "E:\NGIT\PROJECTS\agritrace" "npx nodemon --watch . --ext ts,tsx,js,css,json,html,md --exec `"powershell -ExecutionPolicy Bypass -File ./auto-git.ps1`"" "Auto-git Nodemon"

# 2️⃣ Agritrace: Backend server (ts-node)
Run-CommandInNewWindow "E:\NGIT\PROJECTS\agritrace" "npx ts-node src/backend/server.ts" "Agritrace Backend"

# 3️⃣ Agritrace: Frontend dev server
Run-CommandInNewWindow "E:\NGIT\PROJECTS\agritrace" "npm run dev" "Agritrace Frontend"

# 4️⃣ Mock Digilocker: dev server
Run-CommandInNewWindow "E:\NGIT\PROJECTS\mock-digilocker-server" "npm run dev" "Mock DigiLocker"
