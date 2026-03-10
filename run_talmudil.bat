@echo off
cd /d "%~dp0"

SET PATH=%PATH%;C:\Program Files\nodejs

echo Killing any existing server on port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000 "') do taskkill /PID %%a /F >nul 2>&1

echo Starting TalmudIL...
start "TalmudIL Dev Server" cmd /k "npm run dev"

echo Waiting for server to start...
timeout /t 8 /nobreak >nul

echo Opening Chrome...
start chrome http://localhost:3000

echo TalmudIL is running! You can close this window.
