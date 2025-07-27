# 创建部署包的PowerShell脚本

Write-Host "正在创建部署包..." -ForegroundColor Green

# 创建临时目录
$tempDir = "snake-deploy-temp"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir

# 需要复制的文件和文件夹
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
        Copy-Item $file $tempDir
        Write-Host "✓ 复制文件: $file" -ForegroundColor Yellow
    }
}

# 复制文件夹
foreach ($folder in $foldersToCopy) {
    if (Test-Path $folder) {
        Copy-Item $folder $tempDir -Recurse
        Write-Host "✓ 复制文件夹: $folder" -ForegroundColor Yellow
    }
}

# 创建压缩包
$zipPath = "snake-game-deploy.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath
}

Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath

# 清理临时目录
Remove-Item $tempDir -Recurse -Force

Write-Host "✅ 部署包创建完成: $zipPath" -ForegroundColor Green
Write-Host "📁 文件大小: $((Get-Item $zipPath).Length / 1KB) KB" -ForegroundColor Cyan

Write-Host "`n🚀 下一步操作:" -ForegroundColor Magenta
Write-Host "1. 访问 https://github.com/less1001/snake" -ForegroundColor White
Write-Host "2. 点击 'uploading an existing file'" -ForegroundColor White  
Write-Host "3. 上传 snake-game-deploy.zip 文件" -ForegroundColor White
Write-Host "4. 提交更改" -ForegroundColor White
Write-Host "5. 访问 vercel.com 部署" -ForegroundColor White