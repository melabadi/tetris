$ErrorActionPreference = "Stop"

try {
    $input = [Console]::In.ReadToEnd() | ConvertFrom-Json
    $reason = $input.reason
    $cwd = $input.cwd

    $logDir = Join-Path $cwd ".github/hooks/logs"
    if (-not (Test-Path $logDir)) {
        New-Item -ItemType Directory -Path $logDir -Force | Out-Null
    }

    $logFile = Join-Path $logDir "sessions.log"
    Add-Content -Path $logFile -Value "[$(Get-Date -Format 'o')] Session ended | reason=$reason"

    exit 0
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
