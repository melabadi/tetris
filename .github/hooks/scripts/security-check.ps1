$ErrorActionPreference = "Stop"

try {
    $input = [Console]::In.ReadToEnd() | ConvertFrom-Json
    $toolName = $input.toolName
    $toolArgs = $input.toolArgs | ConvertFrom-Json -ErrorAction SilentlyContinue

    # Block dangerous shell commands
    if ($toolName -eq "bash" -or $toolName -eq "shell" -or $toolName -eq "powershell") {
        $command = $toolArgs.command
        if ($command) {
            $dangerousPatterns = @(
                "rm -rf /", "rm -rf \.", "Format-Volume", "Remove-Item -Recurse -Force /",
                "DROP TABLE", "TRUNCATE", "dd if=", "mkfs"
            )
            foreach ($pattern in $dangerousPatterns) {
                if ($command -match [regex]::Escape($pattern)) {
                    $output = @{
                        permissionDecision = "deny"
                        permissionDecisionReason = "Destructive command blocked by security hook"
                    }
                    $output | ConvertTo-Json -Compress
                    exit 0
                }
            }

            # Block credential exposure
            $secretPatterns = @("\.env", "SECRET", "TOKEN", "API_KEY", "PASSWORD")
            foreach ($pattern in $secretPatterns) {
                if ($command -match "cat.*$pattern|type.*$pattern|Get-Content.*$pattern|printenv.*$pattern") {
                    $output = @{
                        permissionDecision = "deny"
                        permissionDecisionReason = "Accessing secrets/credentials is not allowed"
                    }
                    $output | ConvertTo-Json -Compress
                    exit 0
                }
            }
        }
    }

    # Restrict file edits to project directories
    if ($toolName -eq "edit" -or $toolName -eq "create") {
        $filePath = if ($toolArgs.path) { $toolArgs.path } elseif ($toolArgs.file_path) { $toolArgs.file_path } else { $null }
        if ($filePath) {
            $blockedPaths = @("C:\Windows", "C:\Program Files", "/etc", "/usr", "/var", "/bin", "/sbin")
            foreach ($blocked in $blockedPaths) {
                if ($filePath.StartsWith($blocked)) {
                    $output = @{
                        permissionDecision = "deny"
                        permissionDecisionReason = "Cannot edit system files"
                    }
                    $output | ConvertTo-Json -Compress
                    exit 0
                }
            }
        }
    }

    # Allow by default
    exit 0
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
