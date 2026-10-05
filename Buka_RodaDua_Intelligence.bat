@echo off
title INDONESIA 2-WHEELER DATA & INTELLIGENCE SYSTEM (I2W-DIS)
color 0B
echo ==============================================================================
echo [I2W-DIS] Indonesia 2-Wheeler Industry Data & Intelligence Platform
echo Data Sekunder Nasional Sepeda Motor: Regulasi, Deret Waktu 1990-2026,
echo Manufaktur, Investor, dan Profiling Konsumen Indonesia (ICE & EV)
echo ==============================================================================
echo Membuka antarmuka portal di peramban web default...

set "HTML_PATH=%~dp0two_wheeler\index.html"
start "" "%HTML_PATH%"

echo.
echo Portal berhasil dibuka!
echo File: %HTML_PATH%
echo Tekan tombol apapun untuk menutup jendela ini...
timeout /t 3 >nul
exit
