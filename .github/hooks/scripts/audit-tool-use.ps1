$ErrorActionPreference = "Stop"

try {
    $input = [Console]::In.ReadToEnd() | ConvertFrom-Json
    $toolName = $input.toolName
    $toolArgs = $input.toolArgs
    $cwd = $input.cwd
    $timestamp = $input.timestamp

    $logDir = Join-Path $cwd ".github/hooks/logs"
    if (-not (Test-Path $logDir)) {
        New-Item -ItemType Directory -Path $logDir -Force | Out-Null
    }

    $logFile = Join-Path $logDir "audit.jsonl"
    $entry = @{
        timestamp = $timestamp
        event = "pre-tool-use"
        tool = $toolName
        args = $toolArgs
    } | ConvertTo-Json -Compress

    Add-Content -Path $logFile -Value $entry

    exit 0
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
