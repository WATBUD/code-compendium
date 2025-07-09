# JavaScript Increment Operator (`++`)  
# JavaScript 自增運算子 (`++`)

In JavaScript, the `++` operator is used to increment a variable by 1. The difference between `++a` (pre-increment) and `a++` (post-increment) lies in the timing of the increment operation relative to the use of the variable.  
在 JavaScript 中，`++` 運算子用來將變數加 1。`++a`（前置遞增）和 `a++`（後置遞增）的差別在於「變數被使用」與「遞增動作」的先後順序。

---

## **Pre-increment (`++a`)**  
## **前置遞增（`++a`）**

- The variable `a` is incremented first, and then its new value is used.  
- 變數 `a` 會先遞增，然後再使用遞增後的值。

- Example:  
- 範例：

```javascript
let a = 5;
let b = ++a; // a is incremented to 6, then b is assigned the value 6
````

```javascript
let a = 5;
let b = ++a; // a 先加 1 變成 6，然後 b 被賦值為 6
```

After this code, `a` and `b` are both `6`.
執行後，`a` 和 `b` 都是 `6`。

---

## **Post-increment (`a++`)**

## **後置遞增（`a++`）**

* The original value of `a` is used first, and then `a` is incremented.

* 先使用變數 `a` 的原始值，接著才遞增。

* Example:

* 範例：

```javascript
let a = 5;
let b = a++; // b is assigned the value 5, then a is incremented to 6
```

```javascript
let a = 5;
let b = a++; // b 先被賦值為 5，然後 a 加 1 變成 6
```

After this code, `a` is `6`, but `b` remains `5`.
執行後，`a` 是 `6`，但 `b` 保持為 `5`。

```

