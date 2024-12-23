
MongoDB 是一種非關聯資料庫（NoSQL），與傳統的關聯資料庫（如 MySQL、PostgreSQL、Oracle 等）相比，有以下幾個主要的優點：

- 用戶資料管理 + 快速迭代開發
``` sql
MongoDB 中 可以直接修改collection 與使用
{
  "_id": "user123",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "contact": {
    "phone": "123-456-7890",
    "address": "123 Main St, Anytown, USA"
  },
  "orders": [
    {
      "order_id": "order001",
      "date": "2023-05-01",
      "items": ["item1", "item2"],
      "total": 50.00
    },
    {
      "order_id": "order002",
      "date": "2023-06-15",
      "items": ["item3"],
      "total": 25.00
    }
  ]
}
MySQL 中，我們通常會將數據分成多個表格來存儲，並使用外鍵（foreign key）來維持關聯
``` sql

CREATE TABLE users (
  user_id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE contacts (
  contact_id INT PRIMARY KEY,
  user_id INT,
  phone VARCHAR(15),
  address VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
ALTER TABLE posts ADD COLUMN tags VARCHAR(255);
ALTER TABLE posts ADD COLUMN city VARCHAR(100);
ALTER TABLE posts ADD COLUMN coordinates POINT;
在快速迭代開發中較為繁瑣
```

- 分片（Sharding）
# MongoDB 支持分片（Sharding），可以根據某個字段（例如商品ID）將數據分佈到多個伺服器上。
sh.enableSharding("ecommerce")
sh.shardCollection("ecommerce.products", { "product_id": 1 })

# MySQL 中，實現Sharding較為複雜，手動分片或者使用第三方工具來管理分片。常見的方法包括：
-- 用戶ID範圍 1-100000 存儲在 db1
-- 用戶ID範圍 100001-200000 存儲在 db2


