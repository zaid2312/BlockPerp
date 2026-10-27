$destination = "C:\Users\rajni\Downloads\BlockPerp.zip"
if (Test-Path $destination) { Remove-Item $destination -Force }

$sourceDir = "C:\Users\rajni\.gemini\antigravity\scratch\BlockPerp"
$items = Get-ChildItem -Path $sourceDir -Exclude "node_modules", ".next"
Compress-Archive -Path $items.FullName -DestinationPath $destination -CompressionLevel Optimal

$zip = Get-Item $destination
Write-Output "ZIP Created: $($zip.FullName) ($($zip.Length) bytes)"

Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipFile = [System.IO.Compression.ZipFile]::OpenRead($destination)
$hasReadme = $zipFile.Entries | Where-Object { $_.Name -eq "README.md" }
$hasManual = $zipFile.Entries | Where-Object { $_.Name -eq "MANUAL.md" }
Write-Output "Contains README.md: $([bool]$hasReadme)"
Write-Output "Contains MANUAL.md: $([bool]$hasManual)"
$zipFile.Dispose()
