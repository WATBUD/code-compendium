# React Diff Algorithm

React 的 diff 算法是基於樹（Tree）結構的。在列表項的 key 穩定唯一的情況下，算法的時間複雜度為 O(n)，其中 n 是列表項的數量。

## 核心步驟

1. **樹分層比較**：
   - React 會逐層比較新舊虛擬 DOM 樹，從根節點開始，逐層向下進行比較。
   
2. **同層節點比較**：
   - 在同一層內，React 會依次比較每個節點的 key 和類型。如果 key 和類型相同，則認為是同一個節點，只更新屬性；如果不同，則銷毀舊節點，創建新節點。
   
3. **最小化更新**：
   - React 會盡可能只更新發生變化的部分，最小化實際的 DOM 操作，從而提高性能。

### Key 的作用

使用唯一且穩定的 key 有助於 React 高效地進行 diff 操作。key 使得 React 能夠在新舊列表中快速定位相同的元素，從而減少不必要的更新。

## 最小化 DOM 操作：生活範例

### 生活範例：網站導航菜單

假設你正在設計一個網站的導航菜單，它有多級菜單項目。

#### 初始狀態
1. 主菜單
   - 1.1. 首頁
   - 1.2. 產品
     - 1.2.1. 產品1
     - 1.2.2. 產品2
   - 1.3. 關於我們

你想要將它們改成新的佈置：
1. 主菜單
   - 1.1. 首頁
   - 1.2. 產品
     - 1.2.1. 產品1
     - 1.2.2. 產品2
     - 1.2.3. 產品3
   - 1.3. 服務
   - 1.4. 聯絡我們

#### 樹分層比較（Tree Comparison）
- **步驟 1**：從根節點（主菜單）開始，逐層比較現有的菜單和新的佈置。
- **步驟 2**：比較第一層節點（主菜單的直接子菜單），如首頁、產品、關於我們。

#### 同層節點比較（Same Level Comparison）
- **步驟 3**：在每一層內，逐個節點比較 key 和類型。
  - 例如，首頁（key: 1.1）保持不變。
  - 產品（key: 1.2）保持不變，但需要檢查其子菜單。
  - 關於我們變為服務，需要銷毀舊節點並創建新節點。

#### 子菜單比較
- **步驟 4**：進入子菜單層級，繼續比較產品的子菜單項目。
  - 產品1（key: 1.2.1）和產品2（key: 1.2.2）保持不變。
  - 新增產品3（key: 1.2.3）。

#### 最小化更新（Minimize Updates）
- **步驟 5**：React 只會處理實際發生變化的部分：
  - 新增產品3。
  - 將“關於我們”替換為“服務”。
  - 添加“聯絡我們”。

### Key 的作用
假設每個菜單項目都有一個獨特的標籤（key），例如：
- 首頁（key: 1.1）
- 產品（key: 1.2）
  - 產品1（key: 1.2.1）
  - 產品2（key: 1.2.2）
  - 產品3（key: 1.2.3）
- 服務（key: 1.3）
- 聯絡我們（key: 1.4）

這樣當你改變佈置時，React 可以通過這些唯一且穩定的 key 來快速定位每個菜單項目的位置，確保只處理真正需要變更的項目。

這樣的設計就類似於 React 的 diff 算法，透過最小化 DOM 操作達到高效更新的效果。