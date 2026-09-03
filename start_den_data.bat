@echo off
title DEN-DATA — Dewan Ekonomi Nasional
echo ==============================================================================
echo   🏛️  DEN-DATA : Pusat Basis Data Sekunder Ekonomi Nasional
echo   Dewan Ekonomi Nasional (Rep. Indonesia)
echo ==============================================================================
echo.
echo Menjalankan server DEN-DATA di http://localhost:8028 ...
echo.
cd /d "%~dp0"
"C:\Users\lubis\AppData\Local\Programs\Anki\uv.exe" run --python 3.12 --with fastapi --with uvicorn python run_server.py
pause
