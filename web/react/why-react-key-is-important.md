
# 為什麼 React 渲染列表時需要加上 `key`？

在 React 中渲染列表時，若沒有在每個被渲染的元素加上 `key` 這個 prop，會顯示以下警告訊息：
`Warning: Each child in a list should have a unique "key" prop.`

### 為什麼需要 `key` 提高渲染效能？
- 在沒有 `key` 的情況下，React 會重新渲染整個列表，這樣會消耗更多資源。使用 `key` 可以讓 React 更精確地更新列表中的元素。以下是一個範
- `key` 唯一識別符，幫助 React 確定哪些子元件被新增、移除或修改。
- React 依賴 `key` 來進行高效的 DOM 更新。
- 當列表內容發生變化時，React 使用 `key` 來比較新舊列表元素，從而避免不必要的重建，提升渲染效能。

#### 範例:沒有 `key`

```html
<!-- 原始列表 -->
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<!-- 列表更新 -->
<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

#### 使用 `key` 改進：

```html
<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

有了 `key`，React 可以更加高效地更新 DOM，只改動需要變動的元素，而不是重建整個列表。

### 使用 `key` 的原則

1. **`key` 需要是唯一的（Unique）**
   
   `key` 必須在同一列表中唯一。若重複使用相同的 `key`，會導致錯誤和潛在的問題。

2. **`key` 需要穩定且可預測（Stable and Predictable）**
   
   `key` 必須在每次渲染時保持穩定。如果 `key` 是隨機生成的，如使用 `Math.random()`，React 會將所有現有的元素視為新元素，造成不必要的重渲染，降低效能。

   **錯誤範例**：
   ```jsx
   <li key={Math.random()}>Item</li>
   ```

   **正確範例**：
   使用唯一且穩定的值，如 ID 或其他唯一標識符。

3. **避免使用索引作為 `key`**

   若列表的順序可能會改變，避免將陣列的索引作為 `key`。使用索引作為 `key` 會導致在列表順序變動時，React 會錯誤地重置元素狀態，產生 Bug。

   **錯誤範例**：

   ```jsx
   <ul>
     <li key="0">Connecticut</li>
     <li key="1">Duke</li>
     <li key="2">Villanova</li>
   </ul>
   ```

   如果插入新元素，會導致錯誤更新：
   ```jsx
   <ul>
     <li key="0">Connecticut</li>
     <li key="1">Boston</li>
     <li key="2">Duke</li>
     <li key="3">Villanova</li>
   </ul>
   ```

   **正確範例**：

   使用具唯一性的 `key` 來避免這種問題：
   ```jsx
   <ul>
     <li key="connecticut">Connecticut</li>
     <li key="duke">Duke</li>
     <li key="villanova">Villanova</li>
   </ul>
   ```

