# 虛擬 DOM（Virtual DOM）

## 什麼是虛擬 DOM？
虛擬 DOM 是用 JavaScript 對象表示的 **DOM 樹**，
主要作用是提升效能、簡化開發並支援跨平台。雖然會增加記憶體開銷，但在大多數現代前端應用中，它的優勢遠遠大於劣勢。
是用於優化網頁渲染效能的技術，常見於現代前端框架（如 React、Vue 等）。
虛擬 DOM 通過模擬真實 DOM 的結構，在記憶體中操作，最終變更批量應用到真實 DOM，從而減少不必要的渲染開銷。

## 虛擬 DOM 的結構

虛擬 DOM 是一個樹狀結構的 JavaScript 對象，每個節點對應於真實 DOM 中的一個節點。一個虛擬 DOM 節點通常包含以下資訊：
- **type**：節點的類型（例如 `div`、`h1` 等）。
- **props**：節點的屬性（例如 `class`、`id`、`style` 等）。
- **children**：子節點（如果有的話）。

### 範例

以下是一個簡單的 HTML 結構：
```html
<div id="app">
  <h1 class="title">Hello, World!</h1>
  <p>This is a paragraph.</p>
</div>
```

對應的虛擬 DOM 可能是這樣的 JavaScript 對象：
```javascript
const virtualDOM = {
  type: 'div',
  props: { id: 'app' },
  children: [
    {
      type: 'h1',
      props: { class: 'title' },
      children: ['Hello, World!']
    },
    {
      type: 'p',
      props: {},
      children: ['This is a paragraph.']
    }
  ]
};
```

---

## 虛擬 DOM 的作用

### 1. 提升效能
- 直接操作真實 DOM 是非常耗效能的，因為每次 DOM 更新都會觸發瀏覽器的重新渲染。
- 虛擬 DOM 通過 JavaScript 對象來描述 DOM 結構，更新時先在虛擬 DOM 上進行計算，然後將變更批量應用到真實 DOM，減少不必要的渲染。

### 2. 跨平台支援
- 虛擬 DOM 是抽象的 JavaScript 對象，可以在不同環境（如瀏覽器、伺服器、移動端）中使用。例如，React Native 就是基於虛擬 DOM 實現的。

### 3. 簡化開發
- 開發者可以專注於描述 UI 的狀態，而不需要手動操作 DOM，框架會自動處理虛擬 DOM 到真實 DOM 的轉換。

## 虛擬 DOM 的工作流程

### 1. 初始渲染
- 框架根據組件的狀態生成虛擬 DOM 樹。
- 將虛擬 DOM 樹轉換為真實 DOM 並渲染到頁面上。

### 2. 狀態更新
- 組件狀態發生變化框架會生成新虛擬 DOM 樹。
- 使用 **Diff 算法** 比較新舊虛擬 DOM 樹的差異，找出需要更新的部分。

### 3. 批量更新
- 將差異應用到真實 DOM 上，完成頁面的更新。

## 虛擬 DOM 的優缺點

### 優點
- **高效更新**：通過 Diff 算法減少不必要的 DOM 操作。
- **跨平台**：可以在不同環境中使用。
- **開發體驗好**：開發者不需要直接操作 DOM。

### 缺點
- **記憶體佔用**：需要額外的記憶體來存儲虛擬 DOM 樹。
- **初始渲染較慢**：首次渲染需要生成虛擬 DOM 並轉換為真實 DOM。
