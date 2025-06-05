# JavaScript Increment Operator (`++`)

In JavaScript, the `++` operator is used to increment a variable by 1. The difference between `++a` (pre-increment) and `a++` (post-increment) lies in the timing of the increment operation relative to the use of the variable.

## **Pre-increment (`++a`)**
- The variable `a` is incremented first, and then its new value is used.
- Example:

```javascript
let a = 5;
let b = ++a; // a is incremented to 6, then b is assigned the value 6
```

After this code, `a` and `b` are both `6`.

## **Post-increment (`a++`)**
- The original value of `a` is used first, and then `a` is incremented.
- Example:

```javascript
let a = 5;
let b = a++; // b is assigned the value 5, then a is incremented to 6
```

After this code, `a` is `6`, but `b` remains `5`.
