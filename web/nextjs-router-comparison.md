
# Next.js App Router 與 Page Router 比較

## App Router (Next.js 13 引入的新架構)

### 目錄結構
```
/project-root
├── app/                  # App Router 的核心目錄
│   ├── layout.tsx        # 頁面的通用佈局
│   ├── page.tsx          # 頁面內容（對應路由）
│   ├── head.tsx          # 頁面的 `<head>` 標籤
│   ├── loading.tsx       # 載入中的狀態
│   ├── error.tsx         # 錯誤頁面
│   ├── not-found.tsx     # 404 頁面
│   ├── about/            # 子路由資料夾
│   │   ├── page.tsx      # `/about` 的頁面
│   │   ├── layout.tsx    # `/about` 路徑的佈局
│   │   ├── head.tsx      # `/about` 的 `<head>`
│   ├── dashboard/        # 另一子路由
│   │   ├── page.tsx      # `/dashboard` 的頁面
├── public/               # 靜態文件
├── styles/               # 全域樣式
├── components/           # 可重用元件
├── next.config.js        # Next.js 設定檔
├── package.json          # 項目依賴
```

### 特點
- 使用 **`app/` 文件夾** 作為入口。
- 原生支持文件層級的路由。
- 每個路由可以擁有自己的 `layout.tsx`、`loading.tsx` 等，實現頁面間獨立的佈局和狀態管理。
- 基於 **React Server Components**，提升性能。

---

## Page Router (Next.js 傳統架構)

### 目錄結構
```
/project-root
├── pages/                # Page Router 的核心目錄
│   ├── index.tsx         # 首頁路由 `/`
│   ├── about.tsx         # `/about` 路由
│   ├── dashboard.tsx     # `/dashboard` 路由
│   ├── api/              # API 路由
│   │   ├── hello.ts      # `/api/hello` 的 API
├── public/               # 靜態文件
├── styles/               # 全域樣式
├── components/           # 可重用元件
├── next.config.js        # Next.js 設定檔
├── package.json          # 項目依賴
```

### 特點
- 使用 **`pages/` 文件夾** 作為入口。
- 頁面即路由，每個文件對應一個路由。
- 透過 `getServerSideProps`、`getStaticProps` 等方法實現資料獲取。
- 支持 API 路由 (`/api` 文件夾內的文件)。

---

## 比較

| 功能                     | **App Router**                          | **Page Router**                          |
|--------------------------|------------------------------------------|------------------------------------------|
| **目錄**                 | `app/` 文件夾                           | `pages/` 文件夾                          |
| **路由系統**             | 基於文件夾結構                          | 基於文件結構                             |
| **資料獲取**             | Server Components + React Hooks         | `getServerSideProps`, `getStaticProps`   |
| **支持狀態管理**         | 原生支持佈局和載入狀態                  | 需要手動管理狀態                         |
| **SEO 支持**             | `head.tsx`                              | `next/head`                              |
| **靈活性與擴展性**       | 更加模組化與靈活                        | 傳統且直觀                                |

---

## 適用場景建議

1. **App Router**：適合需要高度模組化、性能優化的項目，特別是使用 React Server Components 的現代應用。
2. **Page Router**：適合中小型項目，或習慣傳統 Next.js 架構的開發者。
