我來澄清一下：

### 常規函數 function name與箭頭函數 () => {}的 `this` 行為：

#### **常規函數 function name**：
- **`this`** 是根據呼叫上下文來決定的。也就是說，`this` 會根據函數被如何呼叫而改變，通常會指向呼叫它的物件（如方法呼叫時 `this` 指向該物件），或者在全域範圍中指向全域物件（在瀏覽器中是 `window`）。
- 如果在物件中呼叫常規函數 function name，`this` 會指向該物件；如果直接呼叫（如 `testA()`），`this` 會指向全域物件。

例如：
```javascript
function testA() {
    console.log(this.name);  // 這裡的 `this` 取決於函數是如何被呼叫的
}
testA();  // 這裡 `this` 會指向全域物件（`window`）
```

#### **箭頭函數 () => {}**：
- **`this`** 並不是根據呼叫上下文來決定的。箭頭函數 () => {}會繼承它所在作用域（定義時）的 `this`，也就是它會使用 **外部作用域的 `this`**，而不是在呼叫時改變 `this`。
- 箭頭函數 () => {} **不會** 改變它的 `this`，它會保持和定義時的上下文相同，因此通常在全域作用域中會指向 `window`。

例如：
```javascript
window.name = "ray";
function testA() {
    console.log(this.name);
}
 
testA();
 
const test = () => {
    console.log(this.name);// 這裡的 `this` 會指向定義時的外部作用域（通常是 `window`）
};
test();
let b = { ee: 12, test, testA };
b.test();
b.testA(); //testA 是一個常規函數，因此 this 會指向 b 物件，因為它是透過 b.testA() 呼叫的。所以它會印出 b.name，但 b 並沒有定義 name 屬性，因此結果是 undefined。
```

### 總結：
- **常規函數 function name**：`this` 會根據 **呼叫時的上下文** 來決定，可以指向全域物件，也可以指向呼叫函數的物件。
- **箭頭函數 () => {}**：`this` **繼承自函數定義時的作用域**，不會根據呼叫時的上下文來改變，通常指向外部作用域的 `this`，例如全域物件 `window`。

