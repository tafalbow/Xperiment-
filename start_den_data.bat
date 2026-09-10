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
if exist ".venv\Scripts\uvicorn.exe" (
    ".venv\Scripts\uvicorn.exe" backend.app:app --host 0.0.0.0 --port 8028
) else (
    "C:\Users\lubis\AppData\Local\Programs\Anki\uv.exe" run --python 3.12 --with fastapi --with uvicorn --with pydantic --with openpyxl uvicorn backend.app:app --host 0.0.0.0 --port 8028
)
pause
