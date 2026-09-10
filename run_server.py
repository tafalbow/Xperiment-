import os
import sys
import subprocess

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    if base_dir not in sys.path:
        sys.path.insert(0, base_dir)

    # Check if running under project's .venv; if not, switch to project .venv python
    venv_python = os.path.join(base_dir, ".venv", "Scripts", "python.exe")
    if os.path.exists(venv_python) and os.path.normpath(sys.executable) != os.path.normpath(venv_python):
        print(f"Mengalihkan ke virtual environment proyek: {venv_python}")
        res = subprocess.run([venv_python] + sys.argv)
        sys.exit(res.returncode)

    import uvicorn
    from backend.config import APP_BRAND, APP_TITLE, APP_SUBTITLE, SERVER_PORT

    print("==============================================================================")
    print(f"[{APP_BRAND}] {APP_SUBTITLE}")
    print("GovTech National Secondary Data Platform (Dewan Ekonomi Nasional)")
    print("==============================================================================")
    print(f"Starting server at: http://127.0.0.1:{SERVER_PORT} (Local) or http://0.0.0.0:{SERVER_PORT} (LAN/Public)")
    print(f"API Documentation:  http://127.0.0.1:{SERVER_PORT}/docs")
    print("Press CTRL+C to stop.")
    print("==============================================================================")

    uvicorn.run(
        "backend.app:app",
        host="0.0.0.0",
        port=SERVER_PORT,
        reload=True,
        log_level="info"
    )
