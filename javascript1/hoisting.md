# 提升 (Hoisting)

## js 提升的概念
將變數和函數提升宣告移動到作用域頂部。即使在程式碼變數/函數宣告出現在使用之後，JavaScript 仍能正確解釋程式碼。

## 提升的類型
1. **變數提升 (Variable Hoisting)**
   - 使用 `var` 宣告的變數會被提升，但其值不會。
   - 範例：
     ```javascript
     console.log(a); // undefined
     var a = 10;
     ```

2. **函數提升 (Function Hoisting)**
   - 函數宣告會被完整提升，這使得可以在宣告之前調用該函數。
   - 範例：
     ```javascript
     greet(); // Hello, world!
     function greet() {
       console.log('Hello, world!');
     }
     ```

3. **`let` 和 `const` 的行為**
   - 使用 `let` 和 `const` 宣告的變數會提升，但它們在宣告前不可用，這稱為「暫時性死區 (Temporal Dead Zone, TDZ)」。
   - 範例：
     ```javascript
     console.log(b); // ReferenceError: Cannot access 'b' before initialization
     let b = 20;
     ```

## 提升的影響
提升可以幫助理解程式碼的執行流程，但不建議過度依賴。最佳實踐是始終在程式碼的頂部宣告變數和函數，以提高可讀性和可維護性。

## 注意事項
- 僅有宣告被提升，初始化的值不會。
- 箭頭函數 (`const fn = () => {}`) 不會提升。

提升使程式執行時更具彈性，但瞭解其行為細節有助於避免潛在的錯誤。
