$Root = (git rev-parse --show-toplevel)
Write-Host $Root

if (-Not (Test-Path "$Root\node-v12.21.0-x64.msi")) {
    Invoke-WebRequest -Uri "https://nodejs.org/download/release/latest-v12.x/node-v12.21.0-x64.msi" -OutFile "$Root\node-v12.21.0-x64.msi"
}

Start-Process "$Root\node-v12.21.0-x64.msi" -Wait

Invoke-Expression "npm install -g @angular/cli"