# ES 模組（ECMAScript 模組）和 CommonJS 模組是 JavaScript 中兩種不同的模組系統，它們有一些重要的差異：
Symbol 和 Set/Map：提供新的數據結構來解決 Object 和 Array 的局限性。

# ECMAScript 模組
- package.json文件加入  "type": "module",

# 1. let 和 const：提供塊級作用域，防止變數提升問題。

# 2. 箭頭函式（Arrow Functions）簡化函數語法
```javascript
引入匿名函式寫法自動綁定 this 關鍵字。
- 箭頭函式使用() => 來定義，而不需要使用 function 關鍵字，語法更為簡單。
const sum = (a, b) => a + b;
console.log(sum(2, 3));  // 5

- 自動綁定 this：箭頭函式會自動綁定它的 this，這意味著它不會受到上下文改變的影響，特別是在回調函式中，這樣可以避免傳統函式中 this 的問題。
function Timer() {
  this.seconds = 0;
  setInterval(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}
const timer = new Timer();
// 會正常打印秒數，`this` 被正確綁定
- 箭頭函式不能作為構造函式使用，不能用 new 關鍵字調用，會報錯
```
```javascript
const arrowFun = () => {};
new arrowFun(); // error: arrowFun is not a constructor
```

# 3. 樣板字面值（Template Literals）模板字串 (``)：支持多行字串和變數插值。
```javascript
let name = "Alice";
let age = 25;
let greeting = `Hello, my name is ${name} and I am ${age} years old.`;
console.log(greeting);  // "Hello, my name is Alice and I am 25 years old."
```

# 4. 解構賦值（Destructuring Assignment） 解構賦值：可以輕鬆從數組或對象中提取值。
```javascript
可以從陣列或物件中提取值，並將其賦給變數，用法可以參考下方程式碼。(MDN)
const obj = { product: "iphone", price: 20000 };
const { product, price } = obj;

console.log(product); // iphone
console.log(price); // 20000

const arr = ["iphone", 20000];
const [product, price] = arr;
console.log(product); // iphone
console.log(price); // 20000
```

# 5. 默認參數（Default Parameters）
默認參數（Default Parameters）可以為函式參數指定默認值
```javascript
// 當參數沒有傳入值且函式內部沒有其他判斷容易導致預期外的回傳結果
console.log(add(1)); // NaN
function add(a = 0, b = 0) {
  return a + b;
}

console.log(add(1));  // 1 (b 默認為 0)
console.log(add(1, 2)); // 3
console.log(add());    // 0 (a 和 b 默認為 0)

```
# 6. 展開運算符(Spread Operator/Rest Parameters) (...)：用於展開數組和對象。

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
// 將陣列展開為單獨的元素
const mergedArray = [...arr1, ...arr2]; // 合併 arr1 和 arr2
console.log(mergedArray); // 輸出: [1, 2, 3, 4, 5, 6]
其餘參數（Rest Parameters）
// 函數接受任意數量的參數，並將它們封裝在一個陣列中
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3)); // 輸出: 6
console.log(sum(4, 5, 6, 7)); // 輸出: 22
```

# 7. 類（Classes）：提供 prototype 機制oop語法糖。
```javascript
// 定義一個 Person 類別
class Person {
    // 構造函數，用來初始化物件的屬性
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // 顯示名稱和年齡的方法
    introduce() {
        console.log(`Hi, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

// 創建一個 Person 物件
const person1 = new Person('Alice', 30);
person1.introduce();  // Hi, my name is Alice and I am 30 years old.
```

# 8. 模組化（Modules）: 通過 (import/export)實現模組的導入和導出。
```javascript
// 這是 utils.js 檔案
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

import { add, subtract } from './utils.js';
console.log(add(2, 3));      // 5
console.log(subtract(5, 3)); // 2
```
# 9. Promise ：處理異步操作機制解決回調地獄（callback hell），提供 then 和 catch 方法。
```javascript
回調函式（Callback）： 
- 容易導致代碼的回調地獄（callback hell），多層嵌套回調使得代碼難以閱讀維護。
asyncOperation1(function(result1) {
  asyncOperation2(function(result2) {
    asyncOperation3(function(result3) {
      console.log(result3);
    });
  });
});
- 每個回調函式都要單獨處理錯誤，這導致錯誤處理的代碼分散且重複。
asyncOperation1(function(result1) {
  if (error) return console.log(error);
  asyncOperation2(function(result2) {
    if (error) return console.log(error);
    console.log(result2);
  });
});

- Promise： 
- 鏈式調用 .then() 處理結果，代碼平坦易於理解。
asyncOperation1()
  .then(result1 => asyncOperation2(result1))
  .then(result2 => asyncOperation3(result2))
  .then(result3 => console.log(result3))
  .catch(error => console.log(error));

- 使用 .catch()，簡化錯誤處理流程。
asyncOperation1()
  .then(result1 => asyncOperation2(result1))
  .catch(error => console.log(error));
