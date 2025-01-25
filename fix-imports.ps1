Get-ChildItem -Path "app" -Recurse -Filter "*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $newContent = $content -replace '@/app/lib/', '@/lib/'
    $newContent = $newContent -replace '@/app/components/', '@/components/'
    $newContent = $newContent -replace '@/app/dashboard/', '@/dashboard/'
    $newContent = $newContent -replace '@/app/types/', '@/types/'
    Set-Content $_.FullName $newContent
}

Get-ChildItem -Path "app" -Recurse -Filter "*.ts" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $newContent = $content -replace '@/app/lib/', '@/lib/'
    $newContent = $newContent -replace '@/app/components/', '@/components/'
    $newContent = $newContent -replace '@/app/dashboard/', '@/dashboard/'
    $newContent = $newContent -replace '@/app/types/', '@/types/'
    Set-Content $_.FullName $newContent
} 