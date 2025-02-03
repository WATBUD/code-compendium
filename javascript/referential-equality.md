
**Referential Equality(參考相等性)**  
js 中[物件/陣列/函式]的相等性比較依賴於它們的引用，而內容。
[物件/陣列/函式]比較方式=>比較兩個指向的**引用**是否相同，而不是內容是否完全一樣。
js [物件/陣列]是 **引用類型（Reference Types）**，而不是 **值類型（Primitive Types）**。

### ex：
```js
const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(obj1 === obj2); // false，因為引用不同，即使內容相同
```
上面的例子中，雖然 `obj1` 和 `obj2` 的內容相同（都是 `{ a: 1 }`），但它們是兩個不同的物件，位於不同的記憶體位置，因此 `obj1 === obj2` 返回 `false`。

### 參考相等性的例子：

```js
const obj1 = { a: 1 }; // 定義一個物件 obj1
const obj2 = { a: 1 }; // 定義另一個物件 obj2

console.log(obj1 === obj2); // false，因為它們是不同的物件，即使內容相同
```
 [`obj1` `obj2`] 是兩個獨立物件，有相同的屬性和值但記憶體地址不同，所以 `obj1 === obj2` 會返回 `false`。

### 原始值（如數字、字串、布林值等）是[值比較]。

```js
let a = 10;
let b = a; // b 獲得 a 的副本
b = 20; // 改變 b 不會影響 a
console.log(a); // 10
console.log(b); // 20

```
- **物件、陣列、函式等引用類型** 是 [引用比較]是否指向相同記憶體位置。
```js
let obj1 = { name: 'Alice' };
let obj2 = obj1; // obj2 引用與 obj1 相同的物件
obj2.name = 'Bob'; // 改變 obj2 的屬性也會影響 obj1
console.log(obj1.name); // 'Bob'
console.log(obj2.name); // 'Bob'
```
#### 例如：
```js
let num1 = 10;
let num2 = 10;
console.log(num1 === num2); // true，因為原始值相等

let obj1 = { a: 1 };
let obj2 = obj1; // obj2 參考了 obj1
console.log(obj1 === obj2); // true，因為指向相同物件

let obj3 = { a: 1 };
console.log(obj1 === obj3); // false，因為指向不同的物件，即使內容相同
```
### Referential Equality(參考相等性)問題：
1. **無意改變了物件**：[物件]是引用類型，一個[物件賦值]給一個[變數]，兩者[指向相同物件]，物件[更改會影響到另外一個物件]。
   ```js
   let obj1 = { a: 1 };
   let obj2 = obj1;  // obj2 參考 obj1
   obj2.a = 2;
   console.log(obj1.a); // 2，因為 obj1 和 obj2 參考的是同一個物件
   ```
2. **比較物件是否相同**：想檢查兩個物件是否相等（包括它們的內容是否相等），需要自行實現深度比較函數，因為 `===` 只會檢查引用。
ex:使用遞歸來進行物件的深度比較。
