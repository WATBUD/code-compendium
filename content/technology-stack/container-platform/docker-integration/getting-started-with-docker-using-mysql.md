
# Getting Started with Docker Using Mysql
------------------------------------登入server------------------------------------
- docker run -itd --name mysql20240430 -p 3306:3306 -e "MYSQL_ROOT_PASSWORD=<YOUR_PASSWORD>" mysql 



- docker run -itd --name mysql20240430 -p 3306:3306 -e "MYSQL_ROOT_PASSWORD=<YOUR_PASSWORD>" --network=custom_subnet_network --ip 172.18.0.10 mysql

- docker exec -it mysql20240430 bash
- mysql -u root -p or mysql -h 127.0.0.1 -P 3306 -u root -p
------------------------------------Grant database privileges to users------------------------------------
# 建立使用者（注意：MySQL 8.4 起 mysql_native_password 預設停用、9.0 已移除；新版請改用 caching_sha2_password 或省略 WITH 子句）
CREATE USER 'louis'@'%' IDENTIFIED WITH mysql_native_password BY '<YOUR_PASSWORD>';
# 重置密碼
ALTER USER 'louis'@'%' IDENTIFIED WITH mysql_native_password BY '<YOUR_NEW_PASSWORD>';

# 給權限
GRANT ALL PRIVILEGES ON *.* TO 'louis'@'%';
# 刪除 USER 
DROP USER 'louis'@'%';
DROP USER 'louis'@'localhost';
# 登入 USER
mysql -u louis -p
------------------------------------note------------------------------------
FLUSH PRIVILEGES;
SELECT user, host FROM mysql.user;
ALTER USER 'root'@'localhost' IDENTIFIED BY '<YOUR_PASSWORD>';









# Option
-i: 「交互模式」（Interactive），允許與容器的標準輸入進行互動。
-t: 在 terminal 上創建一個偽终端 (pseudo-tty)，使能夠進行標準輸入/輸出。
-d: 「後台模式」（Detached），容器背景運行，不會佔據當前的 terminal。
