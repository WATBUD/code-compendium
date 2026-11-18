# ES 模組（ECMAScript 模組）和 CommonJS 模組的區別

ES 模組（ECMAScript 模組）和 CommonJS 模組是 JavaScript 中兩種不同的模組系統，它們有一些重要的差異。

## 1. ECMAScript 模組（ES 模組）
- 在 `package.json` 文件中加入 `"type": "module"`，即可使用 ES 模組。
- 使用 `import` 和 `export` 關鍵字來導入和導出模組。
- 靜態加載：頂層的 `import` 宣告在程式碼解析階段就會被分析並加載（必須寫在模組頂層，不能放在 `if` 或函式內）。
- 需要在執行時動態導入時，可使用 `import()` 表達式，它會回傳 Promise，例如 `const math = await import('./math.mjs');`。
- 模組中的變數預設是區域作用域，不會污染全域作用域。
- 可以導出多個值，使用 `export` 關鍵字來導出變數、函數、類等。
- 支援循環依賴：導入的是 **live binding**（即時綁定），對方模組執行到賦值後就能讀到最新值；但若在對方模組尚未初始化該變數時就存取（例如 `let` / `const` / `class`），會拋出 `ReferenceError`（TDZ，暫時性死區）。`function` 宣告會被提升，因此可以正常呼叫。
- 由於靜態加載的特性，加載速度更快，因為瀏覽器或 Node.js 可以在程式碼執行之前進行優化。

### 語法示例
```js
// math.mjs
export function add(a, b) {
    return a + b;
}

// main.mjs
import { add } from './math.mjs';
console.log(add(2, 3)); // 5
```

## 2. CommonJS 模組
- `package.json` 文件中不需要額外的設置，因為 CommonJS 是 Node.js 預設的模組系統。
### `require()` 函數導入模組， `module.exports` 或 `exports` 物件導出模組
```js
// 使用 exports
exports.add = function(a, b) {
    return a + b;
};

exports.subtract = function(a, b) {
    return a - b;
};

// 使用 module.exports
module.exports = {
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    }
};

```

### 可以在程式碼的任何位置使用 `require()` 來動態加載模組。
```js
function calculate(operation, a, b) {
    // 動態加載模組
    const math = require('./math');

    if (operation === 'add') {
        return math.add(a, b);
    } else if (operation === 'subtract') {
        return math.subtract(a, b);
    } else {
        return 'Invalid operation';
    }
}

console.log(calculate('add', 2, 3)); // 5
console.log(calculate('subtract', 5, 3)); // 2
```
### 模組變數預設[模組作用域]，但可以通過 `global` 物件來暴露到全域作用域。
```js 
// math.js
global.myGlobalVariable = 'Hello from global!';

exports.add = function(a, b) {
    return a + b;
};

// main.js
require('./math');  // 加載 math.js 模組

// 訪問全域變數
console.log(global.myGlobalVariable); // Output: Hello from global!

```
### 動態加載導致加載速度相對較慢，因為需要在執行時解析和加載模組
 **CommonJS 模組** 中，模組加載是動態的，
 `require()` 導入模組時，Node.js 會在執行時解析並加載該模組。
 第一次 `require()` 某個模組時會同步進行 I/O 讀取文件並解析、執行模組代碼，之後結果會被快取在 `require.cache`，再次 `require()` 同一模組會直接回傳快取，不會重新讀取。
 由於加載是同步且在執行時才發生，若在執行路徑中才首次導入大量模組，會阻塞執行；也無法像 **靜態加載**（ **ES 模組** ）那樣事先分析依賴、做 tree shaking 等優化。

## 範例：動態加載影響性能
### `math.js` 模組

```js
// math.js
console.log('Loading math.js...');
exports.add = function(a, b) {
    return a + b;
};

// main.js
console.log('Start of main.js');

// 模擬延遲：第一次 require 時才會讀取並執行模組（之後會使用快取）
setTimeout(() => {
    console.log('Before require math.js');
    const math = require('./math');  // 動態加載
    console.log('After require math.js');
    console.log('Sum:', math.add(2, 3));
}, 1000);

console.log('End of main.js');

Start of main.js
End of main.js
Before require math.js
Loading math.js...
After require math.js
Sum: 5

```



## 3. ES 模組 vs CommonJS 模組對比
| 特性 | ES 模組 | CommonJS 模組 |
|------|---------|--------------|
| 設置方式 | `package.json` 中設定 `"type": "module"` | 預設支援 |
| 導入語法 | `import` | `require()` |
| 導出語法 | `export` / `export default` | `module.exports` / `exports` |
| 加載方式 | 靜態加載（另可用 `import()` 動態導入） | 動態加載（同步） |
| 作用域 | 模組內部變數預設區域作用域 | 模組作用域，可使用 `global` 暴露到全域作用域 |
| 導出多個值 | 支援 | 只能導出單個值（但 `exports` 物件可以包含多個屬性） |
| 循環依賴處理 | 支援，導入為 live binding；過早存取未初始化的 `let`/`const`/`class` 會拋出 `ReferenceError` | 支援，但可能拿到「尚未填完」的 `exports` 物件（部分屬性為 `undefined`） |
| 加載速度 | 較快（靜態加載） | 較慢（動態加載） |

## 4. 總結
- **ES 模組**  ECMAScript 標準，瀏覽器環境中是首選。
- **CommonJS 模組**  Node.js 早期模組系統， Node.js 環境中仍然很常見，在瀏覽器端逐漸被 ES 模組取代。
-  Node.js 14+ 版本，推薦使用 **ES 模組**，但如果需要支援較舊的 Node.js 環境，則仍需使用 **CommonJS**。


