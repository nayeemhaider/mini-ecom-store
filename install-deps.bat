@echo off
echo Installing backend dependencies…
cd backend
npm install
echo.
echo Installing frontend dependencies…
cd ..\frontend
npm install
echo.
echo Done!
