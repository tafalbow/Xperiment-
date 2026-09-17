# ==============================================================================
# INDOEKONOMI data - Background Service Auto-Start
# Runs on Windows logon. Starts server silently in background if not active.
# ==============================================================================
$projectDir = "D:\TFL\ProjectDEN"
Set-Location $projectDir

$conn = Get-NetTCPConnection -LocalPort 8028 -ErrorAction SilentlyContinue | Where-Object State -eq 'Listen'
if (-not $conn) {
    $proc = [wmiclass]"Win32_Process"
    $res = $proc.Create("cmd.exe /c `"$projectDir\start_server_task.bat`"", $projectDir, $null)
}
