$ErrorActionPreference = "Stop"

try {
    $input = [Console]::In.ReadToEnd() | ConvertFrom-Json
    $errorMsg = $input.error.message
    $errorName = $input.error.name
    $cwd = $input.cwd

    $logDir = Join-Path $cwd ".github/hooks/logs"
    if (-not (Test-Path $logDir)) {
        New-Item -ItemType Directory -Path $logDir -Force | Out-Null
    }

    $logFile = Join-Path $logDir "errors.log"
    Add-Content -Path $logFile -Value "[$(Get-Date -Format 'o')] [$errorName] $errorMsg"

    exit 0
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
