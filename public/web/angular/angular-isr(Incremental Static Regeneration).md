### **現代 SSR (Angular + Angular Universal)** 🚀  
Angular 預設是 CSR，使用 **Angular Universal**，實現SSR，渲染流程與 Next.js 類似，
但 **Hydration 方式不同**（因為 Angular 依賴 Zone.js 進行變更檢測）。
---

### **🔹 Angular SSR 渲染步驟**  
#### **步驟 1：瀏覽器收到 HTML**
   ```html
   <button>點擊次數：0</button>
   ```
   ✅ **伺服器已經渲染 HTML**，用戶已經看到內容，但按鈕還不能點擊（因為 JavaScript 還沒加載）。

---

#### **步驟 2：下載 JavaScript，開始 Hydration**
- 瀏覽器開始下載 **Angular 應用的 JavaScript**。
- **Angular Hydration**：
  - 讀取 DOM 並解析 **Angular Component 樹**。
  - 透過 **Zone.js 監聽變更偵測（Change Detection）**。
  - 綁定按鈕的 `click` 事件。
  - 設定內部狀態（如 `count = 0`）。

---

#### **步驟 3：Hydration 完成**
```html
<button (click)="increment()">點擊次數：0</button>
```
✅ **按鈕現在可以點擊了！**

---

### **🔹 首屏渲染時 CSS 還沒載入怎麼辦？**
**解決方案：**
1. **預載 CSS**（Preload）
   ```html
   <link rel="preload" href="styles.css" as="style" />
   ```
   🔹 **這樣 CSS 會和 HTML 同時請求，加快載入速度！**

2. **使用 Angular 的 `TransferState`**
   - 可以在 SSR **傳遞 CSS 狀態**，減少重複請求。

### **🔹 Angular SSR 時間軸**

```

[瀏覽器請求] → [伺服器 SSR 回傳 HTML] → [渲染預渲染內容] → [下載 JS/CSS/圖片等資源]  
→ [Hydration: 啟動 Angular App] → [頁面變得可互動]

```