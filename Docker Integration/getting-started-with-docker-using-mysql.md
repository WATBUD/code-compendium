
# Getting Started with Docker Using Mysql
------------------------------------登入server------------------------------------
- docker run -itd --name mysql20240430 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql 



- docker run -itd --name mysql20240430 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 --network=custom_subnet_network --ip 172.18.0.10 mysql

- docker exec -it mysql20240430 bash
- mysql -u root -p or mysql -h 127.0.0.1 -P 3306 -u root -p
------------------------------------Grant database privileges to users------------------------------------
# 創造創用者
CREATE USER 'louis'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
# 重置密碼
ALTER USER 'louis'@'%' IDENTIFIED WITH mysql_native_password BY '0000';

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
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';









# Option
-i: 「交互模式」（Interactive），允許與容器的標準輸入進行互動。
-t: 在 terminal 上創建一個偽终端 (pseudo-tty)，使能夠進行標準輸入/輸出。
-d: 「後台模式」（Detached），容器背景運行，不會佔據當前的 terminal。
