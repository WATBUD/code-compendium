### 4. **網站效能優化**

### **步驟**:

1. **分析性能瓶頸**:
    - 使用瀏覽器開發工具 (如 Chrome DevTools)：
        - **Performance 面板**：檢查渲染時間。
        - **Network 面板**：檢查資源載入速度。
    - 使用 **Lighthouse** 或其他性能分析工具，確定問題是否出現在前端或後端。
2. **優化前端**:
    - **資源優化**:
        - 壓縮圖片（使用 WebP 格式）。
        - 延遲載入圖片和資源（Lazy Loading）。
        - 減少 CSS 和 JavaScript 的大小（Tree Shaking, Minification）。
    - **代碼優化**:
        - 避免不必要的重渲染（使用 `React.memo` 和 `useCallback`）。
        - 處理大型列表時使用虛擬化（如 `react-window`）。
        - 使用 CDN 提升靜態資源載入速度。
3. **後端優化**:
    - 減少 API 回應時間：
        - 快取重複查詢的結果（Redis）。
        - 資料庫索引。
    - 優化伺服器傳輸：
        - 啟用 GZIP 或 Brotli 壓縮。
        - 使用 HTTP/2 或 HTTP/3 提升傳輸速度。
4. **監控效能**:
    - 引入前端監控工具（如 Sentry, New Relic）。
    - 透過 RUM (Real User Monitoring) 收集用戶的實際體驗數據。

### **實際解決案例**:

- **問題**: 網站首屏加載慢。
    - **分析**: Lighthouse 發現 JS 資源過大，圖片未壓縮。
    - **優化**:
        1. 將圖片轉換為 WebP。
        2. 使用代碼拆分（Code Splitting）和 Lazy Loading。
        3. 啟用 CDN。