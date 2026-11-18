**JavaScript** 在進行運算或比較時會進行隱式類型轉換；**TypeScript** 編譯後就是 JavaScript，所以執行時的轉換規則完全相同，但 TypeScript 的型別檢查會在編譯期把大部分「可疑的隱式轉換」標成錯誤。
**C#** 則需要開發者明確進行類型轉換，不能自動處理這些情況。

> 以下範例的「執行結果」是 JavaScript 的執行時行為；標註 `// TS error` 的寫法在 TypeScript 中無法通過型別檢查（需用 `as any` 或改用明確轉換才能編譯）。

### 1. **字符串與數字隱式轉換**
```typescript
let result = "123" - "0"; // TS error：算術運算的運算元必須是 number / bigint / any
console.log(result); // JS 執行結果：123 (字符串被轉換為數字後相減)

let ok = Number("123") - Number("0"); // ✅ TS 推薦寫法：明確轉換
```
這裡，`"123"` 和 `"0"` 都是字符串，JavaScript 在減法運算中會自動轉換為數字；TypeScript 則會直接報錯，要求你明確轉換。

---

### 2. **布林值的隱式轉換**
```typescript
let result = "hello" && 123; // 非布林值在邏輯判斷時被視為 truthy / falsy
console.log(result); // 123 (因為 "hello" 被視為真，結果是 123)
```
在這個例子中，`"hello"` 是一個非布林值，`&&` 判斷時把它當作 `true`（truthy），然後返回右側的 `123`（注意：返回的是原值 `123`，不是布林值）。這個寫法在 TypeScript 中是合法的。

---

### 3. **`null` 和 `undefined` 的隱式轉換**
```typescript
let nullResult = null + 5; // TS error：The value 'null' cannot be used here
console.log(nullResult); // JS 執行結果：5（null 轉換為 0）

let undefinedResult = undefined + 5; // TS error
console.log(undefinedResult); // JS 執行結果：NaN（undefined 轉換為 NaN）
```
在 JavaScript 中，`null` 轉為數字是 `0`，而 `undefined` 轉為數字是 `NaN`；TypeScript 會阻止你直接拿 `null` / `undefined` 做運算。

---

### 4. **對象和原始類型之間的隱式轉換**
```typescript
let objectResult = { key: "value" } + 1; // TS error：Operator '+' cannot be applied to types '{ key: string; }' and 'number'
console.log(objectResult); // JS 執行結果："[object Object]1"
```
這裡，對象 `{ key: "value" }` 在 JavaScript 中被隱式轉換為字符串 `"[object Object]"`，並與數字 `1` 拼接；TypeScript 則會報錯。

---

### 5. **`==` 進行隱式類型轉換**
```typescript
let result = 0 == "0"; // TS error：This comparison appears to be unintentional because the types 'number' and 'string' have no overlap
console.log(result); // JS 執行結果：true
```
在 JavaScript 中，`==` 會進行隱式類型轉換。數字與字符串比較時，是 **字符串 `"0"` 被轉換為數字 `0`**，然後進行比較，結果為 `true`。TypeScript 會把 `number` 與 `string` 的比較標為錯誤，實務上請使用 `===`。

---

### 6. **`NaN` 和 `Infinity` 的隱式轉換**
```typescript
let nanResult = NaN + 1; // NaN 參與運算，結果仍為 NaN
console.log(nanResult); // NaN

let infinityResult = Infinity * 0; // Infinity 參與運算，結果為 NaN
console.log(infinityResult); // NaN
```
`NaN` 和 `Infinity` 本身就是 `number` 型別，所以這些寫法在 TypeScript 中合法；它們可以參與數學運算，並會在某些情況下返回 `NaN`。

---

