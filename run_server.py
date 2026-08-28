import os
import sys
import uvicorn

if __name__ == "__main__":
    # Ensure current directory is in Python module search path
    base_dir = os.path.dirname(os.path.abspath(__file__))
    if base_dir not in sys.path:
        sys.path.insert(0, base_dir)

    print("==============================================================================")
    print("PUSAT BASIS DATA DATA SEKUNDER: PERGERAKAN EKONOMI INDONESIA")
    print("GovTech National Secondary Data Platform (Barely-There UI)")
    print("==============================================================================")
    print("Starting server at: http://127.0.0.1:8000")
    print("API Documentation:  http://127.0.0.1:8000/docs")
    print("Press CTRL+C to stop.")
    print("==============================================================================")

    uvicorn.run(
        "backend.app:app",
        host="127.0.0.1",
        port=8000,
        reload=False,
        log_level="info"
    )
