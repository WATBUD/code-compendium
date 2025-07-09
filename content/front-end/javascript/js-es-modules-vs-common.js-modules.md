# ES 模組（ECMAScript 模組）和 CommonJS 模組的區別

ES 模組（ECMAScript 模組）和 CommonJS 模組是 JavaScript 中兩種不同的模組系統，它們有一些重要的差異。

## 1. ECMAScript 模組（ES 模組）
- 在 `package.json` 文件中加入 `"type": "module"`，即可使用 ES 模組。
- 使用 `import` 和 `export` 關鍵字來導入和導出模組。
- 靜態加載，模組在程式碼解析階段就會被加載，無法在執行時動態導入模組。
- 模組中的變數預設是區域作用域，不會污染全域作用域。
- 可以導出多個值，使用 `export` 關鍵字來導出變數、函數、類等。
- 支援循環依賴，但只能導出空物件或空函數。
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
 會影響性能，因為每次調用 `require()` 都會進行一次 I/O 操作來讀取文件解析模組代碼。
 當大量模組運行時被導入會導致比 **靜態加載**（ **ES 模組** ）更慢的性能。

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

// 模擬延遲：每次 require 都會導入並解析模組
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
| 加載方式 | 靜態加載 | 動態加載 |
| 作用域 | 模組內部變數預設區域作用域 | 模組作用域，可使用 `global` 暴露到全域作用域 |
| 導出多個值 | 支援 | 只能導出單個值（但 `exports` 物件可以包含多個屬性） |
| 循環依賴處理 | 支援循環依賴，但只能導出空物件或空函數 | 支援循環依賴，但可能會得到未初始化的值 |
| 加載速度 | 較快（靜態加載） | 較慢（動態加載） |

## 4. 總結
- **ES 模組**  ECMAScript 標準，瀏覽器環境中是首選。
- **CommonJS 模組**  Node.js 早期模組系統， Node.js 環境中仍然很常見，在瀏覽器端逐漸被 ES 模組取代。
-  Node.js 14+ 版本，推薦使用 **ES 模組**，但如果需要支援較舊的 Node.js 環境，則仍需使用 **CommonJS**。


