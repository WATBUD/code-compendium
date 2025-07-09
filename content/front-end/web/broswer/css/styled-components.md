## 什麼是 Styled Components？
Styled Components 是CSS-in-JS 庫，它允許你在 JavaScript 文件中編寫實際的 CSS 代碼來樣式化你的組件。

```javascript
// 基本用法示例
const Button = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// 使用
<Button primary>Primary Button</Button>
```

## 1. 核心效能問題

### 1.1 運行時 (Runtime) 開銷
```javascript
// 每次渲染都會執行以下步驟：
const Button = styled.button`
  color: ${props => props.color};
  // 1. 解析模板字符串
  // 2. 生成唯一的 class name
  // 3. 注入 CSS
`;
```

- JavaScript 執行時解析和生成 CSS
- props 變化觸發的樣式重計算
- 動態注入 CSS 的開銷

### 1.2 SSR 相關問題
```javascript
// SSR 環境下的問題
// 1. 首次繪製（First Paint）較快
// 2. 但 styled-components 的注入較慢
// 結果：可能出現 FOUC (Flash of Unstyled Content)
```

- 服務端渲染時需要額外配置
- CSS 注入時機的問題
- Hydration 過程的開銷

### 1.3 Bundle Size 問題
- styled-components 庫本身的大小（約 12-13kb gzipped）
- 動態樣式相關的運行時代碼
- 對首次載入時間的影響

## 2. 解決方案

### 2.1 Build Time 優化
```javascript
// 使用 babel-plugin-styled-components
{
  "plugins": ["babel-plugin-styled-components"]
}
```
- 在建置時預處理樣式
- 減少運行時開銷
- 提供更好的 debug 體驗

### 2.2 SSR 優化
```javascript
import { ServerStyleSheet } from 'styled-components';

const sheet = new ServerStyleSheet();
try {
  const html = renderToString(
    sheet.collectStyles(<App />)
  );
  const styleTags = sheet.getStyleTags();
} finally {
  sheet.seal();
}
```
- 使用 ServerStyleSheet 收集樣式
- 確保首次渲染時 CSS 已就緒
- 避免 FOUC 問題

### 2.3 最佳實踐
```javascript
// 1. 優先使用靜態樣式
const Button = styled.button`
  color: blue; // 靜態：好
`;

// 2. 減少動態樣式
const Button = styled.button`
  color: ${props => props.color}; // 動態：避免過度使用
`;

// 3. 組件複用
const BaseButton = styled.button`
  // 基礎樣式
`;
const VariantButton = styled(BaseButton)`
  // 變體樣式
`;
```

## 3. 替代方案比較

### 3.1 Build Time CSS 生成
優點：
- 無運行時開銷
- 更好的首次渲染性能
- 更好的 SSR 支援

### 3.2 Tailwind CSS
優點：
- 零運行時開銷
- 更小的 bundle size
- 更好的快取策略

不過需要注意：Tailwind CSS 和 styled-components 是不同類型的解決方案：
- styled-components: CSS-in-JS 方案，適合動態樣式需求
- Tailwind CSS: Utility-First CSS 方案，適合靜態樣式需求

## 4. 選擇建議

### 4.1 使用 styled-components 的場景
- 需要高度動態樣式
- 組件庫開發
- 主題切換需求
- 較小規模專案

### 4.2 考慮其他方案的場景
- 大規模應用
- 性能敏感場景
- SSR 應用
- 靜態網站