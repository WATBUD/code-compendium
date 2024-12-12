# 設定資料庫連接字串和其他參數
# Set the database connection string and other parameters
$connectionString = "Server=tcp:35.236.189.154,1433;Database=MociiDashboard;UID=louis005;PWD=louis005;Connect Timeout=2;Max Pool Size=300;Min Pool Size=1;"
$provider = "Microsoft.EntityFrameworkCore.SqlServer"
$outputDir = "Models"
$contextName = "ApplicationDbContext"

# 執行 dotnet ef dbcontext scaffold 命令
# Execute the dotnet ef dbcontext scaffold command
dotnet ef dbcontext scaffold $connectionString $provider -o $outputDir --context $contextName --force
