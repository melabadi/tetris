$ErrorActionPreference = "Stop"

try {
    $input = [Console]::In.ReadToEnd() | ConvertFrom-Json
    $toolName = $input.toolName
    $resultType = $input.toolResult.resultType
    $cwd = $input.cwd
    $timestamp = $input.timestamp

    $logDir = Join-Path $cwd ".github/hooks/logs"
    if (-not (Test-Path $logDir)) {
        New-Item -ItemType Directory -Path $logDir -Force | Out-Null
    }

    # Write CSV stats
    $csvFile = Join-Path $logDir "tool-stats.csv"
    Add-Content -Path $csvFile -Value "$timestamp,$toolName,$resultType"

    # Log failures with details
    if ($resultType -eq "failure") {
        $resultText = $input.toolResult.textResultForLlm
        $failLog = Join-Path $logDir "failures.log"
        Add-Content -Path $failLog -Value "[$(Get-Date -Format 'o')] FAILURE: tool=$toolName result=$resultText"
    }

    exit 0
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
