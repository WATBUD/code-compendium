---

# 🎨 CSS Specificity 教學文件 (中英對照)

## 1. 什麼是 CSS Specificity？

**What is CSS Specificity?**

- **Specificity (優先度)** 是瀏覽器用來判斷 **當多個 CSS 規則同時套用到同一個元素時，哪個規則會生效** 的方式。
- Specificity (priority) is how the browser decides **which CSS rule wins when multiple rules apply to the same element**.

---

## 2. 優先度等級 (Priority Levels)

| 優先度等級 (Priority Level) | 規則 (Rule Type)                                                | 說明 (Description)                                                                     |
| --------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 🔴 最高                     | **`!important`**                                                | 強制套用，即使被覆蓋也會生效 <br> Forces application, overrides all other rules        |
| 🟠 第二                     | **Inline Style (行內樣式)** <br> e.g. `<div style="color:red">` | React 的 `style={}` 也屬於 inline style <br> React’s `style={}` counts as inline style |
| 🟡 第三                     | **ID 選擇器 (`#id`)**                                           | 比 class 與元素更強 <br> Stronger than class and element selectors                     |
| 🟢 第四                     | **Class (`.class`)、屬性 (`[type="text"]`)、偽類 (`:hover`)**   | 中等優先度 <br> Medium priority                                                        |
| 🔵 最低                     | **元素 (`div`)、偽元素 (`::before`)**                           | 最弱，容易被覆蓋 <br> Weakest, easily overridden                                       |
| ⚪️ 繼承                     | **Inherited styles (繼承)**                                     | 例如 `font-family` <br> Example: `font-family`                                         |

---

## 3. 優先度計算公式 (Specificity Calculation Formula)

瀏覽器計算分數來比較：
Browsers calculate specificity as a score:

```
Inline style = 1000
ID 選擇器 (ID selector) = 100
Class / 屬性 / 偽類 (Class / Attribute / Pseudo-class) = 10
元素 / 偽元素 (Element / Pseudo-element) = 1
```

👉 分數高的贏。
👉 Higher score wins.

---

## 4. 範例 (Examples)

### 範例 1：基本比較 (Basic Comparison)

```html
<div id="main" class="box">Hello</div>
```

```css
div {
  color: blue;
} /* 分數 = 1 */
.box {
  color: green;
} /* 分數 = 10 */
#main {
  color: red;
} /* 分數 = 100 */
```

👉 結果：紅色 (`#main` 勝出)
👉 Result: Red (`#main` wins)

---

### 範例 2：行內樣式 (Inline Style)

```html
<div id="main" class="box" style="color: purple;">Hello</div>
```

👉 結果：紫色 (inline style = 1000 分 > ID)
👉 Result: Purple (inline style = 1000 > ID)

---

### 範例 3：`!important`

```css
.box {
  color: green !important;
}
#main {
  color: red;
}
```

👉 結果：綠色 (`!important` > ID)
👉 Result: Green (`!important` > ID)

---

### 範例 4：React 中的優先度 (Specificity in React)

```jsx
<div style={{ color: 'orange' }} className="text">
  Hello
</div>
```

```css
.text {
  color: blue;
}
```

👉 結果：橘色 (inline style > class)
👉 Result: Orange (inline style > class)

若要讓 `.text` 壓過 inline style → 必須加 `!important`：
To override inline style with class → add `!important`:

```css
.text {
  color: blue !important;
}
```

---

## 5. 優先度速查表 (Cheat Sheet)

1. `!important` → 最強 (Strongest)
2. `style={}` → inline style
3. `#id` → ID selector
4. `.class`, `:hover`, `[attr=value]` → class/attribute/pseudo-class
5. `div`, `p`, `span`, `::before` → element/pseudo-element
6. 繼承 → 最弱 (Weakest)

---

## 6. 建議 (Best Practices)

- ❌ **不要濫用 `!important`** → 維護困難
  Don’t overuse `!important` → Hard to maintain

- ✅ **用清晰的 class 與層級結構** 來控制樣式
  Use clear class and structural hierarchy for styling

- ⚠️ **React 中 `style={}` 永遠壓過 class**
  In React, `style={}` always overrides classes unless class has `!important`

---
