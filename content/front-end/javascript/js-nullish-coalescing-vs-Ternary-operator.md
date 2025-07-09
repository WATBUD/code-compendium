---

## 📘 在 JavaScript 中比較 `??`（Nullish Coalescing）與 `? :`（三元運算子）

## 📘 Comparing `??` (Nullish Coalescing) vs `? :` (Ternary Operator) in JavaScript

---

### 1️⃣ 使用 `??`（Nullish Coalescing Operator）

### 1️⃣ Using `??` (Nullish Coalescing Operator)

```js
const result = data ?? "test111";
```

✅ **當 `data` 是 `null` 或 `undefined` 才使用預設值 `"test111"`**
✅ **Only uses `"test111"` when `data` is `null` or `undefined`.**

| `data` 值          | 結果          | `data` value        | Result          |
| ----------------- | ----------- | ------------------- | --------------- |
| `null`            | `"test111"` | `null`              | `"test111"`     |
| `undefined`       | `"test111"` | `undefined`         | `"test111"`     |
| `""`（空字串）         | `""` ✅ 保留   | `""` (empty string) | `""` ✅ kept     |
| `false`、`0`、`NaN` | 原值 ✅ 保留     | `false`, `0`, `NaN` | Original ✅ kept |

📌 **適用於只想處理「沒有值」的情況（如 null、undefined），但保留有效輸入。**
📌 **Best when handling truly missing values, not falsy ones.**

---

### 2️⃣ 使用 `? :`（三元運算子）

### 2️⃣ Using `? :` (Ternary Operator)

```js
const result = data ? data : "test111";
```

❌ **當 `data` 是任何 falsy 值（如 `""`, `0`, `false`）都會套用 `"test111"`**
❌ **Uses `"test111"` when `data` is *any* falsy value (like `""`, `0`, `false`, etc.)**

| `data` 值          | 結果            | `data` value        | Result        |
| ----------------- | ------------- | ------------------- | ------------- |
| `null`            | `"test111"`   | `null`              | `"test111"`   |
| `undefined`       | `"test111"`   | `undefined`         | `"test111"`   |
| `""`（空字串）         | `"test111"` ❌ | `""` (empty string) | `"test111"` ❌ |
| `false`、`0`、`NaN` | `"test111"` ❌ | `false`, `0`, `NaN` | `"test111"` ❌ |

⚠️ **即使使用者真的輸入了空字串，也會被覆蓋成預設值。**
⚠️ **Even if user intentionally entered an empty string, it will be overwritten.**

---

### 🔁 小結 / Summary

| 寫法 / Expression           | 保留空字串？ / Keeps `""`? | 只處理 null/undefined？ / Only `null`/`undefined`? | 會覆蓋 falsy？ / Overwrites falsy? |
| ------------------------- | -------------------- | ---------------------------------------------- | ------------------------------ |
| `data ?? "test111"`       | ✅ 是 / ✅ Yes          | ✅ 是 / ✅ Yes                                    | ❌ 否 / ❌ No                     |
| `data ? data : "test111"` | ❌ 否 / ❌ No           | ❌ 否 / ❌ No                                     | ✅ 是 / ✅ Yes                    |

---

### 🟢 建議 / Recommendation:

使用 `??` 是更安全的方式來保留使用者有效但 falsy 的輸入（如空字串）。
Use `??` to safely preserve user input that may be falsy but still valid (like an empty string).

---



