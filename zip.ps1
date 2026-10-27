$destination = "C:\Users\rajni\Downloads\BlockPerp.zip"
if (Test-Path $destination) { Remove-Item $destination -Force }

$items = Get-ChildItem -Path "C:\Users\rajni\.gemini\antigravity\scratch\BlockPerp" -Exclude "node_modules", ".next"
Compress-Archive -Path $items.FullName -DestinationPath $destination -CompressionLevel Optimal

Get-Item $destination | Select-Object Name, Length, LastWriteTime
