@echo off
title INDOEKONOMI - Status Server
echo ==============================================================================
echo INDOEKONOMI data - Status Server
echo ==============================================================================
powershell -NoProfile -Command "$c = Get-NetTCPConnection -LocalPort 8028 -ErrorAction SilentlyContinue; if ($c) { Write-Host 'Status: AKTIF / RUNNING' -ForegroundColor Green; Write-Host 'Port:   8028' -ForegroundColor Cyan; Write-Host 'PID:    ' $c[0].OwningProcess -ForegroundColor Yellow; Write-Host ''; Write-Host 'Akses Browser:' -ForegroundColor White; Write-Host '  - Di Komputer ini: http://localhost:8028/' -ForegroundColor Green; $ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike '*Loopback*' -and $_.IPAddress -notlike '169.254*' } | Select-Object -First 1).IPAddress; if ($ip) { Write-Host ('  - Dari HP/Tablet (Wi-Fi sama): http://' + $ip + ':8028/') -ForegroundColor Cyan } } else { Write-Host 'Status: TIDAK AKTIF / STOPPED' -ForegroundColor Red; Write-Host 'Jalankan Buka_INDOEKONOMI.vbs atau Desktop Shortcut untuk mengaktifkan.' -ForegroundColor Yellow }"
echo ==============================================================================
pause