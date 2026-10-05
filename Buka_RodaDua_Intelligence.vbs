Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
strDir = fso.GetParentFolderName(WScript.ScriptFullName)
strHtml = strDir & "\two_wheeler\index.html"
WshShell.Run """" & strHtml & """", 1, False
