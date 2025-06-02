# js 提升 (Hoisting)

將變數和函數提升宣告移動到作用域頂部。即使在程式碼變數/函數宣告出現在使用之後。

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
   - 使用 `let` 和 `const` 宣告的變數會[Hoisting]，但在宣告前不可用，這稱為「暫時性死區 (Temporal Dead Zone, TDZ)」。
   - 範例：
     ```javascript
     console.log(b); // ReferenceError: Cannot access 'b' before initialization
     let b = 20;
     ```

## 注意事項
- 僅有宣告被提升，初始化的值不會。
- 箭頭函數 (`const fn = () => {}`) 不會提升。

