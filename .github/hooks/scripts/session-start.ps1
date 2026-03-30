$ErrorActionPreference = "Stop"

try {
    $input = [Console]::In.ReadToEnd() | ConvertFrom-Json
    $source = $input.source
    $timestamp = $input.timestamp
    $cwd = $input.cwd
    $prompt = if ($input.initialPrompt) { $input.initialPrompt } else { "N/A" }

    $logDir = Join-Path $cwd ".github/hooks/logs"
    if (-not (Test-Path $logDir)) {
        New-Item -ItemType Directory -Path $logDir -Force | Out-Null
    }

    $logFile = Join-Path $logDir "sessions.log"
    $entry = "[$(Get-Date -Format 'o')] Session started | source=$source | cwd=$cwd | prompt=$prompt"
    Add-Content -Path $logFile -Value $entry

    # Verify project dependencies
    $nodeModules = Join-Path $cwd "node_modules"
    if (-not (Test-Path $nodeModules)) {
        Add-Content -Path $logFile -Value "WARNING: node_modules not found. Run 'npm install' first."
    }

    exit 0
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
