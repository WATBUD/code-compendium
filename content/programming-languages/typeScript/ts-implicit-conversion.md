**TypeScript** 在進行運算或比較時會進行隱式類型轉換。
**C#** 則需要開發者明確進行類型轉換，不能自動處理這些情況。

### 1. **字符串與數字隱式轉換**
```typescript
let result = "123" - "0"; // 字符串轉換為數字進行運算
console.log(result); // 123 (類型轉換後結果是數字)
```
這裡，`"123"` 和 `"0"` 都是字符串，但在數學運算中會自動轉換為數字，並進行減法運算。

---

### 2. **布林值的隱式轉換**
```typescript
let result = "hello" && 123; // 非布林值自動轉換為布林值
console.log(result); // 123 (因為 "hello" 被視為真，結果是 123)
```
在這個例子中，`"hello"` 是一個非布林值，但它會被隱式轉換為 `true`，然後返回右側的 `123`。

---

### 3. **`null` 和 `undefined` 的隱式轉換**
```typescript
let nullResult = null + 5; // null 轉換為 0
console.log(nullResult); // 5

let undefinedResult = undefined + 5; // undefined 轉換為 NaN
console.log(undefinedResult); // NaN
```
在 TypeScript 中，`null` 會被轉換為 `0`，而 `undefined` 會被轉換為 `NaN`。

---

### 4. **對象和原始類型之間的隱式轉換**
```typescript
let objectResult = { key: "value" } + 1; // 對象自動轉換為字符串
console.log(objectResult); // "[object Object]1"
```
這裡，對象 `{ key: "value" }` 被隱式轉換為字符串 `"[object Object]"`，並與數字 `1` 拼接。

---

### 5. **`==` 進行隱式類型轉換**
```typescript
let result = 0 == "0"; // 比較不同類型的值，會進行隱式轉換
console.log(result); // true
```
在 TypeScript 中，`==` 會進行隱式類型轉換。這裡，`0` 會被轉換為字符串 `"0"`，然後進行比較，結果為 `true`。

---

### 6. **`NaN` 和 `Infinity` 的隱式轉換**
```typescript
let nanResult = NaN + 1; // NaN 參與運算，結果仍為 NaN
console.log(nanResult); // NaN

let infinityResult = Infinity * 0; // Infinity 參與運算，結果為 NaN
console.log(infinityResult); // NaN
```
在 TypeScript 中，`NaN` 和 `Infinity` 可以參與數學運算，並會在某些情況下返回 `NaN`。

---

