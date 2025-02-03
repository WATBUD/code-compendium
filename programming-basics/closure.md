# JavaScript 閉包（Closure）介紹

## **什麼是閉包？**
**閉包（Closure）** 是函式可以「記住」並存取其**外部函式作用域（Lexical Scope）**的變數，即使該外部函式已經執行結束。

閉包的本質是：**函式 + 其外部變數的組合**。

## **閉包的基本範例**
```javascript
function outerFunction(outerVariable) {
    return function innerFunction(innerVariable) {
        console.log(`Outer: ${outerVariable}, Inner: ${innerVariable}`);
    };
}

const newFunction = outerFunction("Hello");
newFunction("World"); // 輸出：Outer: Hello, Inner: World
```
在這個例子中：
- `outerFunction` 執行後返回 `innerFunction`，但 `innerFunction` 仍然可以存取 `outerVariable`。
- 即使 `outerFunction` 執行結束，`outerVariable` 仍然被 `innerFunction` 記住。

## **閉包的應用場景**
### **1. 資料私有化**
```javascript
function counter() {
    let count = 0;
    return {
        increment: function() {
            count++;
            console.log(count);
        },
        decrement: function() {
            count--;
            console.log(count);
        }
    };
}

const myCounter = counter();
myCounter.increment(); // 1
myCounter.increment(); // 2
myCounter.decrement(); // 1
```
**用途：** 閉包可以讓變數 `count` 無法被外部直接修改，只能透過 `increment` 和 `decrement` 來操作。

### **2. 函式柯里化（Currying）**
第一次呼叫 multiply(2)： [b] 只是內部函式的參數，並不需要在 multiply 被呼叫時傳遞
multiply(2) 呼叫時a 會被設置為 2。
multiply 函式會返回新函式（function(b)），內部函式會記住a。
內部 b 還未被使用，所以 multiply 不會對 b 做處理。b 是待傳入的參數，會在後續調用內部函式時使用。
```javascript
function multiply(a) {
    return function (b) {
        return a * b;
    };
}

const double = multiply(2);  // 呼叫 multiply，並將 2 傳入
console.log(double(5));  // 10
console.log(double(10)); // 20
```

### **3. 事件監聽**
```javascript
function attachEventListener() {
    let count = 0;
    document.getElementById("btn").addEventListener("click", function () {
        count++;
        console.log(`Button clicked ${count} times`);
    });
}
attachEventListener();
```
**用途：** `count` 在 `attachEventListener` 執行後仍然被記住，每次點擊時都會增加計數。

## **結論**
閉包允許函式「記住」外部變數狀態。
[note]:
如果 count 是全域變數就不是閉包，因為沒有依賴外部函式變數環境，而是直接使用全域變數。
閉包特性=>內部函數「記住」並「封閉」了外部函數的變數環境，即使外部函數執行結束，變數仍然存在。例如，在你的原始程式碼中：
[閉包（Closure）一定會涉及兩個函式]：
外部函式（Outer Function） —— 函式內部定義了一個變數，並且返回內部函式。
內部函式（Inner Function） —— 函式可以存取外部函式的變數，即使外部函式已經執行完畢。

