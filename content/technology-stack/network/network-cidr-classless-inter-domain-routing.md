
---

# 什麼是 CIDR？Classless Inter-Domain Routing (無類別域間路由)

---

## IP 子網掩碼與 `/8` `/16` `/32` 規則

**IP Subnet Mask and `/8` `/16` `/32` Rules**

---

### 1. 先認識 IP 和子網掩碼

**1. Understand IP and Subnet Mask**

* **IP 地址**（例：192.168.1.10）就像「門牌號碼」。

* **子網掩碼**（例：255.255.255.0）就像「門牌編碼規則」，告訴你：

  * 哪一部分是 **社區編號（網路位）**
  * 哪一部分是 **房號（主機位）**

* **IP Address** (e.g., 192.168.1.10) is like a "house number".

* **Subnet Mask** (e.g., 255.255.255.0) is like a "numbering rule" that tells you:

  * Which part is the **community number (network bits)**
  * Which part is the **house number (host bits)**

---

### 2. 什麼是 `/8`、`/16`、`/32`？

**2. What are `/8`, `/16`, `/32`?**
`/數字`（CIDR 表示法）代表：

* **前面多少位是網路位**
* 剩下的就是主機位

生活比喻：

* `/8` → 前 8 位是社區編號 → 社區超大，很多房子
* `/16` → 前 16 位是社區編號 → 中型社區
* `/24` → 前 24 位是社區編號 → 小型社區（家用網路常見）
* `/32` → 全部位元都是社區編號 → 只有一戶（單一主機）

`/number` (CIDR notation) means:

* **How many bits from the start are network bits**
* The rest are host bits

Life analogy:

* `/8` → First 8 bits are community number → Huge community, many houses
* `/16` → First 16 bits are community number → Medium community
* `/24` → First 24 bits are community number → Small community (common in home networks)
* `/32` → All bits are community number → Only one house (single host)

---

### 3. 為什麼 8 = 255？

**3. Why is 8 = 255?**

* IP 位址用 **二進位** 表示，每個數字段（0\~255）是 **8 個位元（bit）**。

* 255 的二進位是：

  ```
  11111111（二進位）
  = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1
  = 255（十進位）
  ```

* 8 個 `1` 表示 8 個網路位 → `/8`

* 一個 255 = **8 個連續的 1** → 代表網路位

* IP addresses are expressed in **binary**, and each section (0–255) contains **8 bits**.

* 255 in binary is:

  ```
  11111111 (binary)
  = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1
  = 255 (decimal)
  ```

* Eight `1`s means 8 network bits → `/8`

* One 255 = **8 consecutive 1s** → Represents network bits

---

### 4. `/數字` 和 255 的對照

**4. `/number` and 255 Mapping**
每個 **255** 代表 **8 位網路位**：

* `/8`  → `255.0.0.0`
* `/16` → `255.255.0.0`
* `/24` → `255.255.255.0`
* `/32` → `255.255.255.255`

Each **255** represents **8 network bits**:

* `/8`  → `255.0.0.0`
* `/16` → `255.255.0.0`
* `/24` → `255.255.255.0`
* `/32` → `255.255.255.255`

---

### 5. 視覺化對照表

**5. Visual Reference Table**

| CIDR | 子網掩碼（十進位）       | 子網掩碼（二進位）                           | 可用主機數      |
| ---- | --------------- | ----------------------------------- | ---------- |
| /8   | 255.0.0.0       | 11111111.00000000.00000000.00000000 | 16,777,214 |
| /16  | 255.255.0.0     | 11111111.11111111.00000000.00000000 | 65,534     |
| /24  | 255.255.255.0   | 11111111.11111111.11111111.00000000 | 254        |
| /32  | 255.255.255.255 | 11111111.11111111.11111111.11111111 | 1          |

| CIDR | Subnet Mask (Decimal) | Subnet Mask (Binary)                | Usable Hosts |
| ---- | --------------------- | ----------------------------------- | ------------ |
| /8   | 255.0.0.0             | 11111111.00000000.00000000.00000000 | 16,777,214   |
| /16  | 255.255.0.0           | 11111111.11111111.00000000.00000000 | 65,534       |
| /24  | 255.255.255.0         | 11111111.11111111.11111111.00000000 | 254          |
| /32  | 255.255.255.255       | 11111111.11111111.11111111.11111111 | 1            |

---

