# JavaScript 變數宣告方式：var、let、const 差異

## 1. `var`
`var` 是較舊的變數宣告方式，具有以下特點：
- **函式作用域（Function Scope）**：變數的作用範圍限制在其所屬的函式內，而非區塊內。
- **允許重複宣告**：相同名稱的變數可以被多次宣告，後者會覆蓋前者。
- **變數提升（Hoisting）**：變數被提升並初始化為 undefined，因此可以在宣告之前被訪問（但值為 undefined）。

### 範例：
```js
function testVar() {
    // 變數提升（Hoisting）
    console.log(a); // undefined（變數提升，但未初始化）
    var a = 10;
    console.log(a); // 10

    // 函式作用域（Function Scope）
    if (true) {
        var b = 20;
    }
    console.log(b); // 20（var 不受區塊作用域限制）

    // 允許重複宣告
    var c = 30;
    var c = 40; // 不會報錯，後者覆蓋前者
    console.log(c); // 40
}
testVar();
```

## 2. `let`
`let` 是 ES6 引入的變數宣告方式，改善了 `var` 的一些問題：
- **區塊作用域（Block Scope）**：變數僅在 `{}` 內有效。
- **不允許重複宣告**：相同作用域內不能用 `let` 宣告相同名稱的變數。
- **let 會被 [Hoisting]**：變數被提升，初始化（賦值）不會被提升，在宣告前無法存取=>Temporal Dead Zone (TDZ)。
### 範例：
```js
function testLet() {
    // 變數宣告提升（Hoisting，但不初始化）
    console.log(b); // ReferenceError: Cannot access 'b' before initialization
    let b = 20;
    console.log(b); // 20

    // 區塊作用域（Block Scope）
    if (true) {
        let x = 30;
        console.log(x); // 30
    }
    // console.log(x); // ReferenceError: x is not defined（超出作用域）

    // 不允許重複宣告
    let y = 40;
    // let y = 50; // SyntaxError: Identifier 'y' has already been declared
}
testLet();
```

## 3. `const`
`const` 也是 ES6 引入的，專門用來宣告**不可重新賦值**的變數：

- **區塊作用域（Block Scope）**，與 `let` 相同。
- **必須初始化**：宣告時必須直接指定值。
- **不可重新賦值**：不能對 `const` 變數重新指派，但對物件或陣列的內容可變。
- **const 會被 [Hoisting]**：變數被提升，初始化（賦值）不會被提升，在宣告前無法存取=>Temporal Dead Zone (TDZ)。

### 範例：

```js
function testConst() {
    // 必須初始化
    // const c; // SyntaxError: Missing initializer in const declaration
    
    const c = 30;
    // c = 40; // TypeError: Assignment to constant variable.
    
    console.log(c); // 30

    // 區塊作用域（Block Scope）
    if (true) {
        const d = 50;
        console.log(d); // 50
    }
    // console.log(d); // ReferenceError: d is not defined

    // `const` 陣列與物件內容可變
    const arr = [1, 2, 3];
    arr.push(4); // ✅ 允許
    console.log(arr); // [1, 2, 3, 4]
    // arr = [5, 6, 7]; // ❌ TypeError: Assignment to constant variable.
}

// `const` 的 Hoisting 行為 創建被提升了，但是初始化沒有被提升
function testHoisting() {
    console.log(a); // ❌ ReferenceError: Cannot access 'a' before initialization
    const a = 100;
}

testConst();
testHoisting();
```


## 4. `var` vs `let` vs `const` 比較表

| 特性           | `var`          | `let`        | `const`       |
|---------------|---------------|-------------|-------------|
| **作用域**      | 函式作用域     | 區塊作用域   | 區塊作用域   |
| **可否重複宣告** | ✅ 允許        | ❌ 不允許     | ❌ 不允許     |
| **可否重新賦值** | ✅ 允許        | ✅ 允許       | ❌ 不允許     |
| **變數提升**    | ✅ 會提升為 `undefined` | ❌ 創建仍提升但不初始化 | ❌ 創建仍提升但不初始化） |
| **是否須初始化** | ❌ 非必要      | ❌ 非必要     | ✅ 必須初始化 |

---

## 5. 何時使用 `var`、`let`、`const`？
1. **避免使用 `var`**，有作用域問題及可重複宣告問題。
2. **預設使用 `const`**，確定變數不重新指派。
3. **需要變更變數值時使用 `let`**，例如 `for` 迴圈計數器。

### 最佳實踐範例：
```js
const MAX_USERS = 100; // 常數，使用 const

let count = 0; // 需要變更時使用 let
for (let i = 0; i < 10; i++) {
    count += i;
}
```