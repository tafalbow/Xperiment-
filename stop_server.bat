@echo off
title Hentikan Server INDOEKONOMI data (Port 8028)
echo ==============================================================================
echo Menghentikan proses server INDOEKONOMI data pada port 8028...
echo ==============================================================================

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8028 ^| findstr LISTENING') do (
    echo Menutup proses PID %%a...
    taskkill /f /pid %%a 2>nul
)

echo.
echo Server berhasil dihentikan.
echo ==============================================================================
pause
