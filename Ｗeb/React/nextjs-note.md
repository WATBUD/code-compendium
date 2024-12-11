What is your project named? my-app
// 專案名稱，格式需為英文小寫

Would you like to use TypeScript? No / Yes
// 是否支援 TypeScript

Would you like to use ESLint? No / Yes
// 是否使用 ESLint（用來規範 Coding Style 的套件）

Would you like to use Tailwind CSS? No / Yes
// 是否使用 Tailwind CSS

Would you like to use `src/` directory? No / Yes
// 是否在 /app 外加一層 src 資料夾

Would you like to use App Router? (recommended) No / Yes
// 是否使用 App Router 

Would you like to customize the default import alias (@/*)? No / Yes
// 是否自訂 alias 調整預設的 baseURL 匯入路徑

What import alias would you like configured? @/*
// alias 預設使用 @ 是否修改

Next.js 路由系統：App Router vs Page Router

## Page Router：基於檔案的路由系統
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
## App Router：基於目錄的路由系統

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


## File Convention 檔案規則
layout.js：定義共用 UI 元件
template.js：類似 layout，處理需要重新渲染的 Layout UI
page.js：建立路由的主要 UI，並使路徑可公開存取
route.js：建立伺服器端 API 端點
loading.js：在載入時顯示載入中 UI
not-found.js：處理 notFound error（HTTP 404）或任何未知路徑錯誤
error.js：顯示錯誤 UI，必須為 Client Components
global-error.js：全域錯誤 UI
default.js：處理 Parallel Routes（平行路由） 遇到渲染問題時，用來替代顯示的 UI（fallback UI）




