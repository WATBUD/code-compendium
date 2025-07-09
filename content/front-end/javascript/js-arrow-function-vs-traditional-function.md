---

## 🚀 1. 語法簡潔度

**Syntax Simplicity**

```js
// ✅ 箭頭函式 Arrow function
const add = (a, b) => a + b; // 語法簡潔 Concise syntax

// ✅ 傳統函式 Traditional function
function add(a, b) {
  return a + b;
} // 語法較長 More verbose
```

---

## 🔁 2. `this` 綁定方式

**`this` Binding Behavior**

```js
const obj = {
  value: 42,

  // 傳統函式有自己的 this
  // Traditional function has its own `this`
  func1: function () {
    console.log(this.value);
  },

  // 箭頭函式不綁定自己的 this，繼承外層
  // Arrow function inherits `this` from the outer scope
  func2: () => {
    console.log(this.value);
  }
};

obj.func1(); // 42 ✅ 正確 this
obj.func2(); // undefined ⚠️ 箭頭函式沒有自己的 this
```

---

## 🧾 3. `arguments` 物件

**`arguments` Object**

```js
// ✅ 傳統函式有 arguments
// Traditional function has `arguments`
function showArgs() {
  console.log(arguments);
}
showArgs(1, 2, 3); // [1, 2, 3]

// ❌ 箭頭函式沒有 arguments，要用 ...args
// Arrow function has no `arguments`, use rest syntax
const showArgsArrow = (...args) => {
  console.log(args);
};
showArgsArrow(1, 2, 3); // [1, 2, 3]
```

---

## 🏗️ 4. 可否作為建構子

**Can It Be a Constructor?**

```js
// ✅ 傳統函式可以用 new 建立實體
// Traditional function can be used with `new`
function Person(name) {
  this.name = name;
}
const p = new Person('Alice');
console.log(p.name); // Alice

// ❌ 箭頭函式不能用 new，會報錯
// Arrow function cannot be used as constructor
const PersonArrow = (name) => {
  this.name = name;
};
// const p2 = new PersonArrow('Bob'); // ❌ TypeError: not a constructor
```

---

## 🧬 5. `prototype` 屬性

**`prototype` Property**

```js
// ✅ 傳統函式有 prototype
function foo() {}
console.log(typeof foo.prototype); // "object"

// ❌ 箭頭函式沒有 prototype
const bar = () => {};
console.log(bar.prototype); // undefined
```

---

## 🌱 6. 是否支援 yield（生成器）

**Supports `yield` / Generator Functions**

```js
// ✅ 傳統函式能定義 generator
function* gen() {
  yield 1;
  yield 2;
}
const g = gen();
console.log(g.next()); // { value: 1, done: false }

// ❌ 箭頭函式不能是 generator
// const genArrow = *() => {}; // ❌ SyntaxError
```

---

