
---

# 🧠 React Evaluation 精煉教學

### React Evaluation Refined Guide (with Chinese-English Parallel)

---

## 1️⃣ JSX 是什麼？

### What is JSX?

JSX 看起來像 HTML，但它實際是 JavaScript 表達式。
JSX looks like HTML, but it's actually a JavaScript expression.

```jsx
<Comp prop="a" />
// 會被轉譯為：
React.createElement(Comp, { prop: "a" })
```

➡️ 所以，只要 JSX 出現在表達式中（如 `&&`, `?:`），就會被「求值（evaluate）」。
➡️ So when JSX appears in an expression (like `&&`, `?:`), it will be **evaluated**.

---

## 2️⃣ Evaluation vs Rendering

| 概念             | 中文說明                               | English Explanation                   |
| -------------- | ---------------------------------- | ------------------------------------- |
| **Evaluation** | JavaScript 執行 JSX，生成 React Element | JSX is evaluated into a React element |
| **Render**     | React 把 element 畫在畫面上              | React renders the element to the DOM  |

---

## 3️⃣ 條件渲染評估行為

### Conditional Rendering Evaluation Behavior

```jsx
function Child() {
  console.log("🔧 子元件被呼叫 (evaluated)");
  return <div>Hello</div>;
}

function App({ show }) {
  return show && <Child />;
}
```

* 若 `show = true` → `Child()` 被呼叫
  If `show = true` → `Child()` is called

* 若 `show = false` → 右邊 JSX 不會被 evaluate
  If `show = false` → Right-side JSX is skipped (short-circuited)

---

## 4️⃣ JSX 中的副作用依然會執行

### Side Effects in JSX Still Execute

```jsx
const output = isReady && (
  <div>{console.log("🧨 JSX 被執行 (evaluated)")}</div>
);
```

即使畫面沒有 render，`console.log` 還是會執行。
Even if the UI isn't rendered, `console.log` still runs.

---

## 5️⃣ ✅ 建議：提前 return null

### ✅ Tip: Use Early `return null`

### ❌ 不建議寫法（可能造成不必要 evaluate）

**Discouraged** – May evaluate unnecessarily:

```jsx
return isReady && <HeavyComponent />;
```

### ✅ 建議寫法（完全跳過元件 evaluate）

**Recommended** – Cleanly skips evaluation:

```jsx
if (!isReady) return null;
return <HeavyComponent />;
```

---

## 6️⃣ 🔐 實際例子：防止副作用

### 🔐 Real Example: Preventing Side Effects

```jsx
function VideoPlayer() {
  useEffect(() => {
    console.log("🎥 影片開始載入 (video loading)");
  }, []);

  return <video src="..." />;
}

function App({ play }) {
  if (!play) return null;
  return <VideoPlayer />;
}
```

* 只有在 `play = true` 時，`VideoPlayer` 才會真正 evaluate
* `VideoPlayer` is only evaluated when `play = true`

---

## 🧾 教學小結

### Recap

| 類別         | 中文                | English                    |
| ---------- | ----------------- | -------------------------- |
| Evaluation | JSX 被 JS 解析與執行    | JSX is parsed and executed |
| Rendering  | React 將內容畫到畫面上    | React paints the content   |
| 重點         | Evaluate ≠ Render | Evaluate ≠ Render          |

---

## 🧠 教學標語（適合簡報）

### Teaching Slogan (For Slides)

> ✅ 「不是你沒看到畫面，JSX 就沒跑起來」
> ✅ "Just because it doesn't render, doesn't mean it didn't run."

> ⚠️ **Evaluate ≠ Render — 副作用可能早就發生**
> ⚠️ **Evaluate ≠ Render — Side effects may already have happened**

---

