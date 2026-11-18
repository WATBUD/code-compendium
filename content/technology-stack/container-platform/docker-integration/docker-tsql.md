# 運行 Docker 容器：
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=<YOUR_PASSWORD>" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest


