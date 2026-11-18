
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
// （React 17+ 的新 JSX transform 會轉成 jsx(Comp, { prop: "a" })，概念相同）
```

➡️ 所以，只要 JSX 出現在表達式中（如 `&&`, `?:`）且該分支被執行，就會被「求值（evaluate）」，產生一個 **React element 物件**（一個描述 `{ type: Comp, props: {...} }` 的普通物件）。
➡️ So when JSX in an expression (like `&&`, `?:`) is reached, it is **evaluated** into a plain **React element object** describing `{ type: Comp, props: {...} }`.

⚠️ **關鍵：建立 `<Comp />` 這個 element 時，並不會呼叫 `Comp` 函式。** `Comp()` 是之後 React 在 render 階段，決定要把這個 element 放進樹裡時才呼叫的。
⚠️ **Key point: creating the `<Comp />` element does NOT call `Comp`.** React calls `Comp()` later, during rendering, only if the element ends up in the tree.

---

## 2️⃣ Evaluation vs Rendering vs Commit

| 概念             | 中文說明                                          | English Explanation                                         |
| -------------- | --------------------------------------------- | ----------------------------------------------------------- |
| **Evaluation** | JavaScript 執行 JSX，生成 React Element（不呼叫子元件函式） | JSX is evaluated into a React element (child not called)    |
| **Render**     | React 呼叫元件函式，取得它回傳的 element                  | React calls the component function to get its output        |
| **Commit**     | React 把變更套用到真實 DOM（畫面）                        | React applies the changes to the real DOM                   |

---

## 3️⃣ 條件渲染評估行為

### Conditional Rendering Evaluation Behavior

```jsx
function Child() {
  console.log("🔧 子元件被呼叫 (rendered)");
  return <div>Hello</div>;
}

function App({ show }) {
  return show && <Child />;
}
```

* 若 `show = true` → 產生 `<Child />` element，React 在 render 時呼叫 `Child()`
  If `show = true` → the `<Child />` element is created, and React calls `Child()` while rendering

* 若 `show = false` → 右邊 JSX 不會被 evaluate，`Child()` 也不會被呼叫
  If `show = false` → Right-side JSX is skipped (short-circuited), and `Child()` is never called

---

## 4️⃣ JSX 中的「內嵌表達式」會在 evaluate 時執行

### Inline Expressions Inside JSX Run on Evaluation

被 evaluate 的只有 JSX 本身與 `{}` 裡的表達式，**不是**子元件的函式內容。
What runs on evaluation is the JSX itself and the expressions inside `{}` — **not** the body of child components.

```jsx
function App() {
  const output = (
    <div>
      {console.log("🧨 JSX 被執行 (evaluated)")}
      <Child />
    </div>
  );

  return null; // output 從未被 render
}
```

* `console.log("🧨 ...")` **會**執行：它是 `{}` 裡的一般 JS 表達式，在建立 element 時就被求值。
  `console.log("🧨 ...")` **does** run: it's a plain JS expression evaluated when the element is created.
* `Child()` **不會**被呼叫：`<Child />` 只是一個 element 物件，沒有被 render。
  `Child()` is **not** called: `<Child />` is only an element object that never gets rendered.
* 若寫成 `isReady && (<div>{console.log()}</div>)` 且 `isReady = false`，則因短路求值，`console.log` 也不會執行。
  With `isReady && (<div>{console.log()}</div>)` and `isReady = false`, short-circuiting means `console.log` doesn't run either.

即使畫面沒有 render，**內嵌在 JSX 裡的表達式** 只要被 evaluate 就已經執行了。
Even if nothing is rendered, **inline expressions in JSX** have already run once the JSX is evaluated.

---

## 5️⃣ 提前 return null vs `&&`

### Early `return null` vs `&&`

以下兩種寫法，在 `isReady = false` 時 **都不會** 呼叫 `HeavyComponent()`：
Both patterns below **avoid** calling `HeavyComponent()` when `isReady = false`:

```jsx
// 寫法 A：&& 短路
return isReady && <HeavyComponent />;

// 寫法 B：提前 return
if (!isReady) return null;
return <HeavyComponent />;
```

* 兩者對 `HeavyComponent` 的效果相同；選擇哪種主要是可讀性問題。
  They behave the same for `HeavyComponent`; the choice is mostly about readability.
* 提前 `return` 真正的好處：可以跳過 **父元件自己** 在 return 之前的昂貴計算（例如準備 props）。
  The real benefit of an early `return`: it skips expensive work **in the parent itself** before the return (e.g. preparing props).
* 使用 `&&` 時要注意左側為 `0` 的情況：`count && <List />` 在 `count = 0` 時會在畫面上顯示 `0`。
  Watch out with `&&` when the left side can be `0`: `count && <List />` renders `0` when `count = 0`.

也可以在 `HeavyComponent` 內部提前 `return null`，這樣它函式後面的部分不會執行；但 Hooks 必須寫在 early return 之前（Rules of Hooks），所以那些 Hooks 仍會執行。
You can also `return null` early inside `HeavyComponent`, skipping the rest of its body; but Hooks must come before the early return (Rules of Hooks), so those Hooks still run.

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
  // 等同於：return play && <VideoPlayer />;
}
```

* 只有在 `play = true` 時，`VideoPlayer` 才會被 render（函式被呼叫、`useEffect` 執行）
* `VideoPlayer` is only rendered (function called, `useEffect` run) when `play = true`

---

## 🧾 教學小結

### Recap

| 類別         | 中文                                  | English                                          |
| ---------- | ----------------------------------- | ------------------------------------------------ |
| Evaluation | JSX 被 JS 執行，產生 element；`{}` 內表達式執行  | JSX becomes an element; `{}` expressions run     |
| Rendering  | React 呼叫元件函式                        | React calls component functions                  |
| Commit     | React 將內容畫到畫面上                      | React paints the content                         |
| 重點         | 建立 `<Comp />` ≠ 呼叫 `Comp()`         | Creating `<Comp />` ≠ calling `Comp()`           |

---

## 🧠 教學標語（適合簡報）

### Teaching Slogan (For Slides)

> ✅ 「`<Heavy />` 只是一張說明書，React 決定要用它時才會真的執行 `Heavy()`」
> ✅ "`<Heavy />` is just a description; `Heavy()` runs only when React actually renders it."

> ⚠️ **Evaluate ≠ Render — 但 JSX `{}` 裡的表達式在 evaluate 時就已經執行**
> ⚠️ **Evaluate ≠ Render — but expressions inside JSX `{}` run as soon as it's evaluated**

---

