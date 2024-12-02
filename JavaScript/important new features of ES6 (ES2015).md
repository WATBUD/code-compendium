# ES 模組（ECMAScript 模組）和 CommonJS 模組是 JavaScript 中兩種不同的模組系統，它們有一些重要的差異：
# ECMAScript 模組
- package.json文件加入  "type": "module",
```javascript
# 1. let 和 const 關鍵字
ES6 引入了 let 和 const，提供了更好的變數聲明方式。let 允許聲明塊級作用域變數，而 const 用於聲明常數。

# 2. 箭頭函式（Arrow Functions）
箭頭函式提供了一種更簡潔的函式寫法，並自動綁定 this 關鍵字。
箭頭函式不能作為構造函式使用，不能用 new 關鍵字調用，會報錯
const arrowFun = () => {};
new arrowFun(); // error: arrowFun is not a constructor

# 3. 樣板字面值（Template Literals）
樣板字面值是被反引號``所封閉，這種方式可以讓字串的拼接更加方便，用法可以參考下方程式碼。

# 4. 解構賦值（Destructuring Assignment）
解構賦值（Destructuring Assignment）語法是一種 JavaScript 運算式，可以從陣列或物件中提取值，並將其賦給變數，用法可以參考下方程式碼。(MDN)
const obj = { product: "iphone", price: 20000 };
const { product, price } = obj;

console.log(product); // iphone
console.log(price); // 20000

const arr = ["iphone", 20000];
const [product, price] = arr;
console.log(product); // iphone
console.log(price); // 20000

# 5. 默認參數（Default Parameters）
默認參數（Default Parameters）也是現在在使用 JavaScript 上，很常使用到的方法。此語法可以為函式參數指定默認值，可以參考下方程式碼。
function add(a, b) {
  return a + b;
}

// 在沒有預設值的情況下
// 當參數沒有傳入值且函式內部沒有其他判斷
// 容易導致預期外的回傳結果
console.log(add(1)); // NaN


# 6. (Spread Operator/Rest Parameters)
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
展開運算符（Spread Operator）
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



# 7. 類（Classes）
ES6 引入了類（class），JavaScript類似於其他 OOP 程式語言中的 class，但是與其他程式語言的 class 實踐方式並不一樣，只是透過此語法糖可以用來模擬 class 的行為。

# 8. 模組化（Modules）
ES6 提供了官方的模組化支持，通過 import 和 export 關鍵字實現模組的導入和導出。

# 9. Promise
Promise 是一種處理異步操作的機制，可以避免回調地獄（callback hell），用來優化過去回調函式 callback 的寫法。