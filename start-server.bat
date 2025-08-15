@echo off
echo Starting Physics Learning Hub Server...
echo.
echo Choose your preferred server:
echo 1. Python 3 (recommended)
echo 2. Python 2 (legacy)
echo 3. Node.js (requires Node.js installed)
echo 4. PHP (requires PHP installed)
echo.
set /p choice=Enter your choice (1-4): 

if "%choice%"=="1" (
    echo Starting Python 3 server...
    python -m http.server 8000
) else if "%choice%"=="2" (
    echo Starting Python 2 server...
    python -m SimpleHTTPServer 8000
) else if "%choice%"=="3" (
    echo Starting Node.js server...
    npx serve . -l 8000
) else if "%choice%"=="4" (
    echo Starting PHP server...
    php -S localhost:8000
) else (
    echo Invalid choice. Starting Python 3 server by default...
    python -m http.server 8000
)

echo.
echo Server started! Open your browser and go to:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
pause