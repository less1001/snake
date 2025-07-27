# 准备GitHub上传文件的脚本

Write-Host "正在准备GitHub上传文件..." -ForegroundColor Green

# 创建上传目录
$uploadDir = "github-upload"
if (Test-Path $uploadDir) {
    Remove-Item $uploadDir -Recurse -Force
}
New-Item -ItemType Directory -Path $uploadDir

# 需要上传的文件
$filesToCopy = @(
    "package.json",
    "next.config.js", 
    "tailwind.config.js",
    "tsconfig.json",
    "postcss.config.js",
    "README.md",
    ".gitignore",
    ".env.example",
    "vercel.json"
)

# 需要上传的文件夹
$foldersToCopy = @(
    "app",
    "components", 
    "hooks",
    "services",
    "types",
    "utils", 
    "constants"
)

# 复制文件
foreach ($file in $filesToCopy) {
    if (Test-Path $file) {
        Copy-Item $file $uploadDir
        Write-Host "✓ 准备文件: $file" -ForegroundColor Yellow
    }
}

# 复制文件夹
foreach ($folder in $foldersToCopy) {
    if (Test-Path $folder) {
        Copy-Item $folder $uploadDir -Recurse
        Write-Host "✓ 准备文件夹: $folder" -ForegroundColor Yellow
    }
}

Write-Host "✅ 文件准备完成！" -ForegroundColor Green
Write-Host "📁 上传文件夹: $uploadDir" -ForegroundColor Cyan

Write-Host "`n🚀 GitHub上传步骤:" -ForegroundColor Magenta
Write-Host "1. 访问 https://github.com/less1001/snake" -ForegroundColor White
Write-Host "2. 点击 'uploading an existing file'" -ForegroundColor White  
Write-Host "3. 选择 github-upload 文件夹中的所有文件和文件夹" -ForegroundColor White
Write-Host "4. 拖拽到GitHub页面" -ForegroundColor White
Write-Host "5. 填写提交信息: 'Add Snake Game files'" -ForegroundColor White
Write-Host "6. 点击 'Commit changes'" -ForegroundColor White

Write-Host "`n📋 文件清单:" -ForegroundColor Blue
Get-ChildItem $uploadDir -Recurse | ForEach-Object {
    Write-Host "  $($_.FullName.Replace((Get-Location).Path + '\' + $uploadDir + '\', ''))" -ForegroundColor Gray
}