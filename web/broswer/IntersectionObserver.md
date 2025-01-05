# IntersectionObserver 說明

## 1. 簡介

`IntersectionObserver` 是一個用於監測目標元素 (target element) 與其祖先元素或頂層視窗 (viewport) 之間交集變化的 Web API。此 API 可以用於執行以下功能：

- 應用於懶加載圖片或內容。
- 偵測元素是否進入視窗。
- 實現無限滾動列表。
- 監測廣告是否可見。
- 優化動畫或轉換效果。

---

## 2. 使用方式

### 建立一個 `IntersectionObserver`

使用 `IntersectionObserver` 需要定義一個回調函數 (callback) 和設定選項 (options)。

```javascript
const observer = new IntersectionObserver(callback, options);
```

#### 回調函數
回調函數會在目標元素的可見性發生變化時執行。

```javascript
const callback = (entries, observer) => {
  entries.forEach(entry => {
    console.log(entry.target, entry.isIntersecting);
    if (entry.isIntersecting) {
      console.log('目標元素進入可見範圍');
    } else {
      console.log('目標元素離開可見範圍');
    }
  });
};
```

#### 選項
可以透過 options 指定以下設定：

- `root`: 定義目標元素的祖先容器 (默認為視窗)。
- `rootMargin`: 定義容器的邊距 (像 CSS 的 margin)。
- `threshold`: 一個數字或數組，表示目標元素可見部分占自身大小的比例。

```javascript
const options = {
  root: null, // 使用視窗作為根容器
  rootMargin: '0px', // 無邊距
  threshold: [0, 0.5, 1] // 分別在完全不可見、可見 50%、完全可見時觸發
};
```

#### 開始觀察

```javascript
const target = document.querySelector('#myElement');
observer.observe(target);
```

#### 停止觀察

```javascript
observer.unobserve(target);
```

#### 釋放觀察器

```javascript
observer.disconnect();
```

---

## 3. 範例

以下是一個簡單的例子：

### HTML

```html
<div class="container">
  <div class="spacer"></div>
  <div id="myElement" class="box">目標元素</div>
  <div class="spacer"></div>
</div>
```

### CSS

```css
.container {
  height: 200vh; /* 模擬滾動頁面 */
}
.box {
  height: 100px;
  width: 100px;
  background-color: blue;
}
.spacer {
  height: 500px;
}
```

### JavaScript

```javascript
const callback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.backgroundColor = 'green';
      console.log('目標元素可見');
    } else {
      entry.target.style.backgroundColor = 'red';
      console.log('目標元素不可見');
    }
  });
};

const observer = new IntersectionObserver(callback, {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
});

const target = document.querySelector('#myElement');
observer.observe(target);
```

## 4. 注意事項

1. **`root` 的影響：**
   - 當 `root` 為 `null` 時，表示使用瀏覽器視窗作為根容器。
   - 當 `root` 為某個 DOM 元素時，目標的可見性會基於該容器計算。

2. **`threshold` 的應用：**
   - 設置 `threshold: 0` 表示只要目標進入根容器就會觸發。
   - 設置 `threshold: 1` 表示只有目標完全可見時才會觸發。

3. **性能優化：**
   - 避免在回調中執行昂貴的操作。
   - 將回調中的業務邏輯與渲染分開處理。

---

## 5. 總結

`IntersectionObserver` 是一個高效且靈活的 API，可以幫助開發者監測元素的可見性變化。它提供了一種避免使用滾動事件 (`scroll`) 的優化解決方案，特別適合現代 Web 應用中需要監控滾動的場景。
