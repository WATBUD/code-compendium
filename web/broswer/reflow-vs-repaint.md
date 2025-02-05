# Reflow vs. Repaint: 差異與性能優化

## 1. Reflow（回流）
### 什麼是 Reflow？
**Reflow** 是當瀏覽器需要重新計算元素的 **幾何屬性（如大小、位置）** 時發生的過程。這通常由以下操作觸發：
- 修改影響佈局的 CSS 屬性（如 `width`、`height`、`margin`、`padding`、`position`）。
- 讀取某些佈局屬性（如 `offsetWidth`、`offsetHeight`、`getComputedStyle()`）。
- 新增、刪除或移動 DOM 元素。
- 瀏覽器窗口大小變化（`resize`）。

### Reflow 的影響
- 會影響該元素及其所有子元素（可能會連鎖影響整個頁面）。
- 如果頻繁發生，會導致頁面卡頓，影響性能。

---

## 2. Repaint（重繪）
### 什麼是 Repaint？
**Repaint** 是當元素的 **外觀（如顏色、陰影、背景）** 發生變化時，瀏覽器重新渲染該元素的過程。這通常由以下操作觸發：
- 修改 `color`、`background-color`、`border-color`、`visibility`。
- 應用 `box-shadow`、`text-shadow`。
- 改變 `opacity`。

### Repaint 的影響
- **不會影響佈局**，但仍然需要瀏覽器重新繪製畫面。
- Repaint 的性能消耗 **低於 Reflow**，但如果影響範圍大，仍然可能導致掉幀。

---

## 3. 如何優化 Reflow 和 Repaint
### (1) 減少不必要的 Reflow
#### ✅ 合併樣式修改
```js
// 不推薦（每次修改都可能觸發 Reflow）
element.style.width = '100px';
element.style.height = '200px';
element.style.margin = '10px';

// 推薦（一次性應用多個樣式）
element.style.cssText = 'width: 100px; height: 200px; margin: 10px;';
```

#### ✅ 避免逐個修改 DOM，使用 `classList`
```js
// 不推薦
element.style.backgroundColor = 'red';
element.style.color = 'white';

// 推薦
element.classList.add('active');
```

#### ✅ 使用 `documentFragment` 進行批量 DOM 操作
```js
let fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  let div = document.createElement('div');
  div.textContent = `Item ${i}`;
  fragment.appendChild(div);
}
document.body.appendChild(fragment); // 只觸發一次 Reflow
```

#### ✅ 避免強制同步 Reflow
```js
// 不推薦：因為讀取 `offsetHeight` 會導致瀏覽器強制計算佈局
let height = element.offsetHeight; // 觸發 Reflow
element.style.width = '100px'; // 觸發另一個 Reflow

// 推薦：先批量修改樣式，再讀取
element.style.width = '100px';
element.style.height = '200px';
requestAnimationFrame(() => {
  let height = element.offsetHeight; // 減少強制同步 Reflow
});
```

---

### (2) 減少不必要的 Repaint
#### ✅ 使用 `visibility: hidden` 來隱藏元素，而不是 `display: none`
```css
/* 這樣只會觸發 Repaint（較輕量） */
.element {
  visibility: hidden;
}

/* 這樣會觸發 Reflow（較重） */
.element {
  display: none;
}
```

#### ✅ 避免影響大量元素
- 若要改變 `opacity` 或 `background-color`，請使用 `will-change: opacity;` 讓瀏覽器提前優化渲染。

#### ✅ 使用 `transform` 代替 `top/left` 進行動畫
```css
/* 使用 transform 只會觸發 GPU 加速，不會影響佈局 */
.element {
  transform: translateX(100px);
}
```

---

## 4. 使用 `requestAnimationFrame` 來優化動畫
當你需要頻繁修改樣式（如動畫、滑動效果），可以用 `requestAnimationFrame` 來確保它們與瀏覽器的渲染節奏同步，避免頻繁觸發 Reflow。

### 範例：不使用 `requestAnimationFrame`（卡頓動畫）
```js
let i = 0;
function move() {
  element.style.left = `${i}px`; // 每次都觸發 Reflow
  i++;
  setTimeout(move, 16);
}
move();
```

### 範例：使用 `requestAnimationFrame`（流暢動畫）
```js
let i = 0;
function move() {
  element.style.transform = `translateX(${i}px)`; // 不影響佈局
  i++;
  requestAnimationFrame(move);
}
requestAnimationFrame(move);
```

✅ **使用 `transform` 代替 `left/top`** 以避免 Reflow。

---

## 5. 總結
| 操作 | 影響 | 觸發的行為 |
|------|------|------------|
| `width, height, margin, padding, position, top, left` | 影響佈局 | 觸發 Reflow（性能影響大） |
| `color, background-color, border-color, opacity, box-shadow` | 只影響外觀 | 觸發 Repaint（性能影響小） |
| `transform, opacity + will-change` | 只影響 GPU 渲染 | 不影響 Reflow/Repaint（最佳做法） |

### **最佳優化策略**
1. **批量修改樣式，合併多次變更**
2. **避免強制同步 Reflow（不要立即讀取 `offsetHeight`）**
3. **使用 `transform` 代替 `left/top`**
4. **使用 `requestAnimationFrame` 優化動畫**
5. **隱藏元素時，使用 `visibility: hidden` 而非 `display: none`**
6. **使用 `documentFragment` 進行批量 DOM 操作**

這些方法可以幫助你大幅降低 Reflow 和 Repaint 的開銷，提升網頁的流暢度和性能 🚀

