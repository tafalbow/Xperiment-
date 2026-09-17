Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "powershell.exe -ExecutionPolicy Bypass -File ""D:\TFL\ProjectDEN\buka_app.ps1""", 0, False
