# LRU (Least Recently Used) Cache 說明與教學

## 什麼是 LRU Cache？ 基於 **最近最少使用 (Least Recently Used)** 原則的快取機制。

目的是在容量有限的情況下，淘汰**最近最少使用**項目，保留**近期較常使用**的資料。
用於：
- 記憶體快取
- 網頁伺服器快取
- 資料庫快取

## 基本原理
1. LRU Cache 會保留一個固定大小的儲存空間。
2. 每當有資料被存取時，該資料會被標記為**最近使用**。
3. 當快取空間滿時，會移除**最近最少使用**的資料。

## LRU Cache 的常見操作
- **GET(key)**：快取中取指定 key 的資料。
    - 資料存在，將資料標記為最近使用。
    - 資料不存在，回傳空值。
- **PUT(key, value)**：將一筆資料存入快取。
    - 若 key 已存在，更新其值，並將其標記為最近使用。
    - 若快取滿了，移除最近最少使用的項目，然後插入新項目。

## 實作方式
LRU Cache 的常見實作方式是透過 **雙向鏈結串列 (Doubly Linked List)** 搭配 **HashMap**。

- **HashMap**：用來快速存取資料，時間複雜度為 O(1)。
- **雙向鏈結串列**：用來維護資料存取順序（從最近使用到最少使用）。

### 流程示意：
1. **GET(key)**
   - 使用 HashMap 找到 key 對應的節點。
   - 將該節點移動到鏈結串列的頭部，標記為最近使用。

2. **PUT(key, value)**
   - 若 key 已存在，更新其值，並將節點移動到鏈結串列頭部。
   - 若 key 不存在：
     - 若快取空間已滿，移除鏈結串列尾部的節點（最少使用）。
     - 插入新節點到鏈結串列頭部，並更新 HashMap。

### 圖解：
```
鏈結串列順序（從左到右）：
[最近使用] <- -> [次最近使用] <- -> ... <- -> [最近最少使用]
```

# LRU Cache - Simple Implementation in JavaScript

This is a simple implementation of an LRU (Least Recently Used) cache using JavaScript. The cache stores a fixed number of items, and when the cache exceeds this limit, the least recently used item is evicted.

## Code

```js
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // Using a Map to maintain order of insertion and access
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1; // Return -1 if the key is not found
        }
        // Move the accessed item to the end (most recently used)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            // If the key already exists, delete it to reinsert it as most recently used
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // If the cache exceeds the capacity, delete the least recently used (first) item
            this.cache.delete(this.cache.keys().next().value);
        }
        // Insert the new or updated key-value pair
        this.cache.set(key, value);
    }
}

const cache = new LRUCache(3);

cache.put(1, 1);   // cache is {1=1}
cache.put(2, 2);   // cache is {1=1, 2=2}
cache.put(3, 3);   // cache is {1=1, 2=2, 3=3}
console.log(cache.get(1)); // returns 1, cache is {2=2, 3=3, 1=1}
cache.put(4, 4);   // evicts key 2, cache is {3=3, 1=1, 4=4}
console.log(cache.get(2)); // returns -1 (not found)
cache.put(5, 5);   // evicts key 3, cache is {1=1, 4=4, 5=5}
console.log(cache.get(3)); // returns -1 (not found)



## 時間與空間複雜度
- **GET(key)**：O(1)
- **PUT(key, value)**：O(1)
- **空間複雜度**：O(capacity)

## 小結
LRU Cache 是一種有效率的快取策略，能夠透過 HashMap 與鏈結串列組合達成快速存取與淘汰操作。其應用廣泛，適合用於需要快取與容量控制的場景。

希望這份教學對你有所幫助！

