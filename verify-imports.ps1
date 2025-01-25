Get-ChildItem -Path "app" -Recurse -Include "*.ts","*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $incorrectImports = $content | Select-String -Pattern '@/app/' -AllMatches
    if ($incorrectImports) {
        Write-Host "Found incorrect imports in $($_.FullName):"
        foreach ($match in $incorrectImports.Matches) {
            Write-Host "  $($match.Value)"
        }
    }
} 