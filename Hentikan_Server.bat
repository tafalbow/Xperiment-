@echo off
title INDOEKONOMI - Hentikan Server
echo ==============================================================================
echo INDOEKONOMI data - Hentikan Server
echo ==============================================================================
echo Menghentikan server pada port 8028...
powershell -NoProfile -Command "$conns = Get-NetTCPConnection -LocalPort 8028 -ErrorAction SilentlyContinue; if ($conns) { $conns | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }; Write-Host 'Server berhasil dihentikan.' -ForegroundColor Green } else { Write-Host 'Server sedang tidak aktif.' -ForegroundColor Yellow }"
echo ==============================================================================
ping 127.0.0.1 -n 3 >nul