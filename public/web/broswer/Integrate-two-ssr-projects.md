# 不修改業務邏輯的情況下整合兩個 SSR 項目
本文檔概述了如何在不修改兩個 SSR（伺服器端渲染）項目內部邏輯的情況下，將它們無縫集成。我們將探討幾種方法來順利整合這些項目。

## 整合方法

### 1. 代理集成
使用反向代理（如 **Nginx(第三方下載)**/**http-proxy-middleware(Node.js 庫)** 在 Node.js 中）
請求路由到不同的 SSR 服務。這樣，每個 SSR 項目仍然獨立運行，但通過統一的端點進行訪問。

#### 步驟：
- 設置一個反向代理服務（例如 **Nginx** 或 **http-proxy-middleware**）。
- 將請求路由到不同的路徑（例如 `/projectA` 和 `/projectB`）來指向它們各自的 SSR 服務。
- 這樣兩個項目就可以共享相同的域名和 URL 結構，同時內部邏輯不受影響。


```nginx
// app.js (Node.js 使用 Express 框架)
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// 設置代理，將 /api 路徑的請求代理到後端3001
app.use('/api', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

server {
    listen 80;
    
    location /projectA/ {
        proxy_pass http://localhost:3001/;  # 將請求代理到 Project A
    }

    location /projectB/ {
        proxy_pass http://localhost:3002/;  # 將請求代理到 Project B
    }
}
```

### 2. 微前端（Micro Frontends）
將前端拆分成更小的包含單元（即微服務），
每個單元代表一個功能或項目。多個 SSR 項目集成單個頁面應用（SPA）中，不需要修改它們的內部邏輯。

#### 步驟：
- 每個 SSR 項目獨立單元構建，擁有自己的入口點和路由。
- 使用像 **Module Federation**（搭配 Webpack）這樣的框架，將這些獨立的 SSR 項目加載到主容器中。
- 使用路由機制（例如 React Router/Vue Router）根據 URL 控制顯示哪個 SSR 項目。

#### 例子（Webpack Module Federation）：
```javascript
// webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      remotes: {
        projectA: 'projectA@http://localhost:3001/remoteEntry.js',
        projectB: 'projectB@http://localhost:3002/remoteEntry.js',
      },
    }),
  ],
};

