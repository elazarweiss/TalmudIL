@echo off
cd /d "%~dp0"

echo Starting TalmudIL...
start "TalmudIL Dev Server" cmd /k "npm run dev"

echo Waiting for server to start...
timeout /t 5 /nobreak >nul

echo Opening Chrome...
start chrome http://localhost:3000

echo TalmudIL is running! You can close this window.
