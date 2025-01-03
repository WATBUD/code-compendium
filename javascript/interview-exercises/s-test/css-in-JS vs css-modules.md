在現代 Web 開發中，管理專案CSS 有多種方式。
**CSS-in-JS/CSS Modules** 
是兩種常見的解決方案，都旨在解決全域作用域樣式和 CSS 衝突的問題

## CSS-in-JS:
CSS-in-JS 就是把樣式直接寫在 JavaScript 的變數或函數裡
使用像 `styled-components` 或 `emotion` 等庫。
```js
// 安裝 styled-components: npm install styled-components
import styled from 'styled-components';

// 創建一個帶樣式的按鈕
const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 15px 32px;
  text-align: center;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

// 在原生 JavaScript 中使用這個樣式（你需要將其插入到 DOM 中）
document.body.appendChild(Button());
```

### 優點：
- **樣式範圍限定**：樣式被限定在組件內部，這樣就不會洩漏到其他地方。
- **動態樣式**：可以根據組件的 props 或 state 動態改變樣式。
- **單一真相來源**：樣式和邏輯可以放在同一個檔案中，這樣可以提高可維護性和重用性。
- **支援 JavaScript 邏輯**：你可以在樣式中使用 JavaScript 的邏輯，例如循環、條件語句和變數。

### 缺點：
- **性能開銷**：由於樣式在執行時動態注入到 DOM 中，可能會帶來性能損耗。
- **CSS 不分離**：將樣式和邏輯放在同一個檔案中，可能會讓代碼變得比較複雜，對於大型應用可能不太適合。




## CSS Modules
-在傳統的 CSS 中，類名和 ID 是全域的，當多個 CSS 文件有相同類名樣式會[全域樣式衝突]
- CSS Modules 會將每個 CSS 類名和選擇器進行“局部作用域處理”
- ex:在兩個不同的 React 組件中都寫了 .button 類名，編譯後它們可能會變成 .button_123abc 和 .button_456def
```js
// 假設有一個 Button.module.css 檔案
import styles from './Button.module.css';

// 動態創建一個按鈕並將樣式應用
const button = document.createElement('button');
button.className = styles.button;
button.innerText = '點擊我';
document.body.appendChild(button);

```
### 實現：
1. Webpack (搭配 css-loader 和 style-loader)
Webpack 是最常見的工具之一，用來在 React 等項目中實現 CSS Modules。通常會搭配 css-loader 和 style-loader，這樣就能在 Webpack 中處理 CSS 模組化。

css-loader：啟用 CSS Modules 功能，並自動將類名轉換為唯一的名稱。
style-loader：將樣式加載並插入到 HTML 頁面中。
這是最基本的實現方式，適用於需要完全自定義構建流程的項目。

2. Create React App (CRA)
使用 Create React App 建立 React ，內建支持 CSS Modules，無需額外配置。
樣式文件命名為 .module.css 時，CRA 會自動啟用 CSS Modules 功能。
這樣無需配置 Webpack 或其他工具，可直接使用 CSS Modules。

### 優點：
- **局部作用域**：每個 CSS 類名都會被轉換為唯一名稱，這樣可以防止樣式衝突。
- **分離樣式和邏輯**：樣式和邏輯分開管理，使得專案結構更加清晰。
- **無性能開銷**：CSS 模塊通常是靜態編譯的，性能開銷較小。

### 缺點：
- **無法動態修改樣式**：不像 CSS-in-JS，CSS Modules 無法根據 props 或 state 動態改變樣式。
- **需要構建工具支持**：需要在構建過程中進行處理，並且需要配置支持 CSS Modules 的構建工具（如 Webpack）。

## 總結

- **CSS-in-JS** 適用於需要動態樣式、強調組件化的應用，並且希望將邏輯和樣式放在一起的情況。
- **CSS Modules** 更適合大型應用或團隊協作，當你希望將樣式與邏輯分離並且關注樣式的可重用性和可維護性時。

