@echo off
title INDOEKONOMI data — Indonesia Economic Data Observatory
echo ==============================================================================
echo   🏛️  INDOEKONOMI data : Pusat Basis Data Sekunder Ekonomi Nasional
echo   Dewan Ekonomi Nasional (Rep. Indonesia)
echo ==============================================================================
echo.
echo Menjalankan server INDOEKONOMI data di http://localhost:8028 ...
echo.
cd /d "%~dp0"
"C:\Users\lubis\AppData\Local\Programs\Anki\uv.exe" run --python 3.12 --with fastapi --with uvicorn python run_server.py
pause
