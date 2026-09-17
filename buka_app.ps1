# ==============================================================================
# INDOEKONOMI data - 1-Click Browser Launcher
# Starts background server if not active, then opens default browser.
# ==============================================================================
$projectDir = "D:\TFL\ProjectDEN"
Set-Location $projectDir

# 1. Check if server is already running on port 8028
$conn = Get-NetTCPConnection -LocalPort 8028 -ErrorAction SilentlyContinue | Where-Object State -eq 'Listen'
if (-not $conn) {
    $env:PYTHONPATH = $projectDir
    $uvicornPath = "$projectDir\.venv\Scripts\uvicorn.exe"
    if (Test-Path $uvicornPath) {
        Start-Process -FilePath $uvicornPath -ArgumentList "backend.app:app --host 0.0.0.0 --port 8028 --app-dir `"$projectDir`"" -WorkingDirectory $projectDir -WindowStyle Hidden
    } else {
        Start-Process -FilePath "C:\Users\lubis\AppData\Local\Programs\Anki\uv.exe" -ArgumentList "run --python 3.12 --with fastapi --with uvicorn --with pydantic --with openpyxl uvicorn backend.app:app --host 0.0.0.0 --port 8028" -WorkingDirectory $projectDir -WindowStyle Hidden
    }

    # Wait up to 6 seconds for server to be ready
    for ($i = 0; $i -lt 12; $i++) {
        Start-Sleep -Milliseconds 500
        $conn = Get-NetTCPConnection -LocalPort 8028 -ErrorAction SilentlyContinue | Where-Object State -eq 'Listen'
        if ($conn) { break }
    }
}

# 2. Open website in default browser
Start-Process "http://localhost:8028/"
