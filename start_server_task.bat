@echo off
cd /d "%~dp0"
set PYTHONPATH=%~dp0
if exist "%~dp0.venv\Scripts\uvicorn.exe" (
    "%~dp0.venv\Scripts\uvicorn.exe" backend.app:app --app-dir "%~dp0." --host 0.0.0.0 --port 8028
) else (
    "C:\Users\lubis\AppData\Local\Programs\Anki\uv.exe" run --python 3.12 --with fastapi --with uvicorn --with pydantic --with openpyxl uvicorn backend.app:app --host 0.0.0.0 --port 8028
)
