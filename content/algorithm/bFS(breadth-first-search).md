
---

## 🔍 什麼是 BFS？

### 🔍 What is BFS (Breadth-First Search)?

* 一種圖或樹的遍歷演算法
* A traversal algorithm for graphs or trees.
* 核心思想：**逐層拜訪相鄰節點**，先拜訪離起點最近的，再往外擴展。
* Core idea: **Visit neighboring nodes level by level**, starting from the closest ones.

---

## 📌 BFS 的主要特點

### 📌 Key Features of BFS

| 中文                    | English                                    |
| --------------------- | ------------------------------------------ |
| 使用 **佇列（Queue）** 管理節點 | Uses a **queue** to manage traversal order |
| 可用來找「最短路徑」            | Useful for finding the **shortest path**   |
| 時間複雜度為 O(V + E)       | Time complexity is O(V + E)                |
| 空間複雜度為 O(V)           | Space complexity is O(V)                   |

---

## ✅ 適用場景

### ✅ Common Use Cases

1. 最短路徑查找（如迷宮、無權重圖）
   Finding shortest paths (e.g., in mazes or unweighted graphs)
2. 層級關係探索（如社交網路的朋友關係）
   Exploring level-wise relationships (e.g., social networks)
3. 網站爬蟲、搜尋引擎
   Web crawling, search engines
4. 解決棋盤類問題、地圖探索
   Solving board or grid-based problems

---

## 💻 JavaScript 實作：BFS

### 💻 JavaScript Implementation: BFS

```javascript
function bfs(graph, startNode) {
    const visited = new Set();         // 記錄已拜訪節點
                                       // Record visited nodes
    const queue = [startNode];         // 初始化佇列
                                       // Initialize the queue with the start node

    while (queue.length > 0) {
        const current = queue.shift(); // 從佇列取出最前端節點
                                       // Remove the front node from the queue

        if (!visited.has(current)) {
            console.log(`訪問節點：${current}`); // 輸出目前節點
                                               // Print current node
            visited.add(current);              // 標記為已訪問
                                               // Mark as visited

            for (let neighbor of graph[current]) {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);      // 加入未訪問鄰居
                                               // Add unvisited neighbors to queue
                }
            }
        }
    }
}
```

---

## 🌐 測試圖結構

### 🌐 Example Graph Structure

```javascript
const graph = {
    A: ["B", "D"],
    B: ["A", "C", "E"],
    C: ["B"],
    D: ["A"],
    E: ["B"]
};

console.log("廣度優先搜尋（BFS）：");
console.log("Breadth-First Search (BFS):");
bfs(graph, "A");
```

---

## 🧾 預期輸出

### 🧾 Expected Output

```
訪問節點：A
Visited node: A  
訪問節點：B
Visited node: B  
訪問節點：D
Visited node: D  
訪問節點：C
Visited node: C  
訪問節點：E
Visited node: E  
```

---

## 🧠 逐行解釋

### 🧠 Line-by-Line Explanation

| 程式碼                                    | 中文說明         | English Explanation                       |
| -------------------------------------- | ------------ | ----------------------------------------- |
| `const visited = new Set();`           | 建立集合以記錄已拜訪節點 | Create a set to track visited nodes       |
| `const queue = [startNode];`           | 初始化佇列，從起點開始  | Initialize queue with the start node      |
| `while (queue.length > 0)`             | 只要佇列不空，就繼續處理 | While queue is not empty, keep processing |
| `const current = queue.shift();`       | 拿出佇列中最前端的節點  | Remove the front node from the queue      |
| `if (!visited.has(current))`           | 若尚未拜訪此節點，就處理 | If not visited yet, process it            |
| `visited.add(current);`                | 標記為已訪問       | Mark the node as visited                  |
| `for (let neighbor of graph[current])` | 遍歷所有鄰居       | Loop through neighbors of current node    |
| `queue.push(neighbor)`                 | 若尚未訪問，就加入佇列  | Add unvisited neighbor to the queue       |

---

## 🔄 BFS vs DFS 比較

### 🔄 BFS vs DFS Comparison

| 特性 Feature         | BFS（廣度優先）           | DFS（深度優先）            |
| ------------------ | ------------------- | -------------------- |
| 搜尋策略 Search Order  | 逐層搜尋 Level-by-level | 一路深入到底 Depth-first   |
| 使用資料結構 Structure   | Queue（佇列）           | Stack（堆疊）或 Recursion |
| 最短路徑 Shortest Path | ✅ 可以保證（無權重圖）        | ❌ 不保證                |
| 適用場景 Use Cases     | 最短路徑、層級遍歷           | 解迷宮、組合問題、拓撲排序        |

---

