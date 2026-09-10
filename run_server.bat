@echo off
title INDOEKONOMI data - Server (Port 8028)
cd /d "%~dp0"
echo ==============================================================================
echo INDOEKONOMI data - Indonesia Economic Data Observatory
echo Starting server on http://localhost:8028 (0.0.0.0:8028)...
echo ==============================================================================

if exist ".venv\Scripts\uvicorn.exe" (
    ".venv\Scripts\uvicorn.exe" backend.app:app --host 0.0.0.0 --port 8028 --reload
) else (
    "C:\Users\lubis\AppData\Local\Programs\Anki\uv.exe" run --python 3.12 --with fastapi --with uvicorn --with pydantic --with openpyxl uvicorn backend.app:app --host 0.0.0.0 --port 8028 --reload
)
pause
