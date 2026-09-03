import os
import sys
import uvicorn

if __name__ == "__main__":
    # Ensure current directory is in Python module search path
    base_dir = os.path.dirname(os.path.abspath(__file__))
    if base_dir not in sys.path:
        sys.path.insert(0, base_dir)

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
        reload=False,
        log_level="info"
    )
