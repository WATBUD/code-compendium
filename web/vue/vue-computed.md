
### 4. **Vue 的 `computed` 是什麼？**
在 Vue 中，`computed` 是一種 **計算屬性**，用於根據其他資料（例如 `data`）動態計算出新的值。`computed` 的值會被緩存，只有當依賴的資料變化時，才會重新計算。

#### 特點：
1. **緩存機制**：
   - `computed` 的值會根據依賴的資料自動緩存，避免重複計算。
   - 只有在依賴的資料變化時，才會重新計算。

2. **語法**：
   - `computed` 是一個物件，其中的每個屬性都是一個函式，返回計算後的值。
   - 範例：
     ```javascript
     new Vue({
         data: {
             price: 100,
             quantity: 2
         },
         computed: {
             total() {
                 return this.price * this.quantity;
             }
         }
     });
     ```

3. **使用場景**：
   - 當你需要根據其他資料動態計算出新的值時。
   - 例如：計算總價、過濾列表、格式化資料等。

#### 與 `methods` 的區別：
- `computed` 會緩存結果，只有依賴的資料變化時才會重新計算。
- `methods` 每次呼叫都會重新執行。

---

4. **Vue 的 `computed`**：用於根據其他資料動態計算值，具有緩存機制。
