# ==============================================================================
# INDOEKONOMI data - Background Service Auto-Start
# Runs on Windows logon / boot. Starts server silently in background if not active.
# ==============================================================================
$projectDir = "D:\TFL\ProjectDEN"
Set-Location $projectDir

$logFile = "$projectDir\autostart.log"
$timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

# 1. Check if server is already running on port 8028
$conn = Get-NetTCPConnection -LocalPort 8028 -ErrorAction SilentlyContinue | Where-Object State -eq 'Listen'
if ($conn) {
    "[$timestamp] Server already active on port 8028 (PID: $($conn[0].OwningProcess))" | Out-File -FilePath $logFile -Append -Encoding utf8
    exit 0
}

# 2. Launch completely detached background server via start_background.vbs
$proc = [wmiclass]"Win32_Process"
$res = $proc.Create("wscript.exe `"$projectDir\start_background.vbs`"", $projectDir, $null)

# 3. Wait up to 8 seconds for port 8028 to be ready
$started = $false
for ($i = 0; $i -lt 16; $i++) {
    Start-Sleep -Milliseconds 500
    $conn = Get-NetTCPConnection -LocalPort 8028 -ErrorAction SilentlyContinue | Where-Object State -eq 'Listen'
    if ($conn) {
        $started = $true
        break
    }
}

if ($started) {
    "[$timestamp] Server started successfully on port 8028 (PID: $($conn[0].OwningProcess))" | Out-File -FilePath $logFile -Append -Encoding utf8
} else {
    "[$timestamp] WARNING: Port 8028 did not respond within 8 seconds" | Out-File -FilePath $logFile -Append -Encoding utf8
}
