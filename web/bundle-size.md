
**Bundle size** 是指 **打包後的 JavaScript 檔案大小**。  

當前端應用程式（例如 React、Vue、Angular）開發完成後，會使用打包工具（如 **webpack、Vite、Parcel、Rollup**）將所有 JavaScript 代碼、CSS、圖片等資源合併成一個或多個 **bundle**，然後部署到瀏覽器執行。  

如果 **bundle size 過大**，會導致：  
- 頁面加載變慢  
- 使用者體驗下降（特別是在行動裝置或慢速網路環境）  
- 記憶體消耗增加  

**降低 bundle size**：

1. **Tree Shaking**  
   - 利用 ES6 模組語法，讓 bundler（如 webpack、Rollup）能夠自動移除未使用的代碼。  
   - 確保只引入你需要的部分，而非整個庫。

2. **Code Splitting（代碼分割）**  
   - 使用動態 import 或 webpack 的 code splitting 功能，將程式碼拆分成多個 chunk，讓用戶只下載當前頁面所需的代碼。  
   - 延遲加載不常用的模組（Lazy Loading）。

3. **Minification & Compression**  
   - 在生產環境中啟用代碼壓縮（如使用 TerserPlugin）。  
   - 使用 gzip 或 Brotli 壓縮，減少傳輸大小。

4. **使用外部資源**  
   - 將一些大型第三方庫設定為 external，通過 CDN 載入，避免打包進最終 bundle 中。

5. **優化依賴**  
   - 選擇輕量級的庫或只引入部分模組，減少不必要的依賴。  
   - 定期檢查 package.json，移除未使用的依賴。

6. **Bundle 分析工具**  
   - 使用 webpack-bundle-analyzer 等工具分析 bundle，找出體積較大的模組，進一步優化。

7. **合理配置 Babel 與 Polyfill**  
   - 僅為目標瀏覽器添加必要的 polyfill，避免打包過多不必要的轉譯代碼。

透過上述方法，你可以有效地降低 bundle 的體積，提升網站的加載速度與效能。