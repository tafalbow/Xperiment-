# ==============================================================================
# INDOEKONOMI data - 1-Click Browser Launcher
# Starts background server if not active, then opens default browser.
# ==============================================================================
$projectDir = "D:\TFL\ProjectDEN"
Set-Location $projectDir

# 1. Check if server is already running on port 8028
$conn = Get-NetTCPConnection -LocalPort 8028 -ErrorAction SilentlyContinue | Where-Object State -eq 'Listen'
if (-not $conn) {
    $proc = [wmiclass]"Win32_Process"
    $res = $proc.Create("wscript.exe `"$projectDir\start_background.vbs`"", $projectDir, $null)

    # Wait up to 6 seconds for server to be ready
    for ($i = 0; $i -lt 12; $i++) {
        Start-Sleep -Milliseconds 500
        $conn = Get-NetTCPConnection -LocalPort 8028 -ErrorAction SilentlyContinue | Where-Object State -eq 'Listen'
        if ($conn) { break }
    }
}

# 2. Open website in default browser
Start-Process "http://localhost:8028/"
