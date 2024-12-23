# Next.js 路由系統比較：Page Router vs App Router

## 路由系統架構

### Page Router
```
└── pages
    ├── index.tsx
    ├── login.tsx
    ├── api
    │   └── user.tsx
    ├── posts
    │   └── [id].tsx
    └── blog
        ├── index.tsx
        └── setting.tsx
```

### App Router
```
└── app
    ├── blog
    │   └── [slug]
    │        └── page.tsx
    ├── login
    │   └── page.tsx
    ├── @analytics
    │   ├── page.tsx
    │   ├── error.tsx
    │   └── loading.tsx
    ├── api
    │   └── user
    │       ├── index.ts
    │       └── route.ts
    ├── components
    │   ├── loading.tsx
    │   └── button.tsx
    ├── globals.css
    ├── layout.tsx
    └── page.tsx
```

## 主要差異

### 1. 路由定義方式
- **Page Router**：基於檔案名稱的路由系統
  - `pages/posts/[id].tsx` 直接對應 `/posts/[id]` 路由
  - 路由邏輯較為直接且簡單

- **App Router**：基於目錄結構的路由系統
  - 使用 `page.tsx` 作為頁面入口
  - 支援更複雜的巢狀路由和路由組織

### 2. 佈局和層疊
- **Page Router**：
  - 使用 `_app.tsx` 和 `_document.tsx` 管理全域佈局
  - 佈局客製化較為有限

- **App Router**：
  - 使用 `layout.tsx` 實現更靈活的佈局系統
  - 支援巢狀佈局
  - 可以創建平行路由（Parallel Routes）
  - 更好地支援伺服器元件和客戶端元件

### 3. 路由特殊檔案
- **Page Router**：
  - API 路由直接在 `pages/api` 目錄下
  - 有限的錯誤處理

- **App Router**：
  - API 路由使用 `route.ts`
  - 引入特殊檔案：
    - `page.tsx`：頁面入口
    - `layout.tsx`：佈局
    - `loading.tsx`：載入狀態
    - `error.tsx`：錯誤處理
    - `not-found.tsx`：404 頁面

### 4. 動態路由
- **Page Router**：
  - 使用 `[param]` 命名檔案進行動態路由
  - 捕獲路由參數相對單一

- **App Router**：
  - 支援更複雜的動態路由
  - 可以使用多個動態片段
  - 提供更豐富的路由攔截和巢狀動態路由

### 5. 伺服器端渲染和資料獲取
- **Page Router**：
  - `getServerSideProps`
  - `getStaticProps`
  - `getInitialProps`

- **App Router**：
  - 原生支援 React Server Components
  - 使用 `async/await` 進行資料獲取
  - 更簡潔的伺服器端渲染方法

### 6. 效能和最佳化
- **App Router**：
  - 預設支援伺服器元件
  - 更好的程式碼分割
  - 更精細的快取控制
  - 支援漸進式渲染

### 7. 擴充性
- **App Router**：
  - 更現代的路由架構
  - 更好地整合 React 18 特性
  - 提供更靈活的元件組合方式

## 建議遷移策略
1. 對於新專案，建議直接使用 App Router
2. 舊專案可以漸進式遷移
3. 利用 Next.js 的混合模式，逐步採用 App Router 特性

