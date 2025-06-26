## 什麼是 DFS？深度優先搜尋（Depth-First Search，簡稱 DFS）

- 一種圖或樹的遍歷演算法
- 核心思想:「走到無路可走再回頭」，盡可能深入到下一層，直到無法繼續再回溯。

## DFS 的主要特點
- **結構**：通常使用 **遞迴** 或 **堆疊** 來實現。
- **用途**：用於探索所有可能的路徑，例如解迷宮、檢查圖的連通性等。
- **時間複雜度**：O(V + E)，其中 V 是節點數，E 是邊數。
- **空間複雜度**：在遞迴實現中取決於遞迴深度，最差為 O(V)。
- **應用場景**:
1. **迷宮求解**：找到一條通往終點的路徑。
2. **檢查連通性**：判斷圖是否連通。
3. **拓撲排序**：有向無環圖的節點排序。
4. **解決組合問題**：如子集生成、排列組合。

## DFS 的 JavaScript 實現範例
- 如何使用 DFS 遍歷一個圖結構。
### 範例 1：使用遞迴實現
```javascript
function dfsRecursive(graph, node, visited = new Set()) {
    if (visited.has(node)) return; // 若節點已被訪問，直接返回

    console.log(`訪問節點：${node}`); // 打印當前訪問的節點
    visited.add(node); // 標記節點為已訪問

    // 遍歷鄰居
    for (let neighbor of graph[node]) {
        dfsRecursive(graph, neighbor, visited); // 遞迴訪問鄰居
    }
}

// 測試圖結構
const graph = {
    A: ["B", "C"],
    B: ["D", "E"],
    C: ["F"],
    D: [],
    E: ["F"],
    F: []
};

console.log("深度優先搜尋（遞迴）：");
dfsRecursive(graph, "A");
```

### 範例 2：使用堆疊實現
```javascript
function dfsStack(graph, start) {
    const stack = [start]; // 使用堆疊模擬遞迴
    const visited = new Set();

    while (stack.length > 0) {
        const node = stack.pop(); // 彈出堆疊頂部的節點

        if (!visited.has(node)) {
            console.log(`訪問節點：${node}`);
            visited.add(node); // 標記為已訪問

            // 將鄰居加入堆疊（逆序可以保持與遞迴相同的訪問順序）
            for (let neighbor of graph[node].reverse()) {
                stack.push(neighbor);
            }
        }
    }
}

// 測試圖結構
console.log("深度優先搜尋（堆疊）：");
dfsStack(graph, "A");
```

---

## 範例輸出
對於以上圖結構（以節點 A 為起點）：
```
深度優先搜尋（遞迴）：
訪問節點：A
訪問節點：B
訪問節點：D
訪問節點：E
訪問節點：F
訪問節點：C

深度優先搜尋（堆疊）：
訪問節點：A
訪問節點：C
訪問節點：F
訪問節點：B
訪問節點：E
訪問節點：D
```

