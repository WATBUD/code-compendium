###  **切版用的 CSS？**
切版（Layout Design）是指將設計稿轉換為網頁的過程，CSS 是實現切版的關鍵技術。以下是切版常用的 CSS 技術和工具：

#### 常用的 CSS 技術：
1. **Flexbox**：
   - 用於創建彈性佈局，適合處理一維佈局（例如水平或垂直排列）。
   - 範例：
     ```css
     .container {
         display: flex;
         justify-content: space-between;
     }
     ```

2. **Grid**：
   - 用於創建複雜的二維佈局（例如網格系統）。
   - 範例：
     ```css
     .container {
         display: grid;
         grid-template-columns: 1fr 1fr 1fr;
         gap: 10px;
     }
     ```

3. **Media Queries**：
   - 用於實現響應式設計，讓網頁在不同設備上都能良好顯示。
   - 範例：
     ```css
     @media (max-width: 768px) {
         .container {
             flex-direction: column;
         }
     }
     ```

4. **CSS 預處理器**：
   - 例如 **Sass** 或 **Less**，提供變數、嵌套、函式等功能，讓 CSS 更易於維護。
   - 範例（Sass）：
     ```scss
     $primary-color: #3498db;

     .button {
         background-color: $primary-color;
         &:hover {
             background-color: darken($primary-color, 10%);
         }
     }
     ```

5. **CSS 框架**：
   - 例如 **Bootstrap**、**Tailwind CSS**，提供現成的樣式和組件，加速開發。

---


**切版用的 CSS**：Flexbox、Grid、Media Queries、CSS 預處理器（如 Sass）、CSS 框架（如 Bootstrap）。
