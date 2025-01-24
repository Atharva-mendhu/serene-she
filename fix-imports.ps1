Get-ChildItem -Path "app" -Recurse -Filter "*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $newContent = $content -replace '@/app/components', '@/components'
    Set-Content $_.FullName $newContent
} 