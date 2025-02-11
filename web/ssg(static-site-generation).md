# Static Site Generation (SSG)  

## 🔹 什麼是 SSG？
**SSG（Static Site Generation，靜態網站生成）** 是一種在 **構建（build）時** 預先生成靜態 HTML 頁面的技術。這種方法提高了網站效能，適合內容不常變更的網站，如部落格、文件、行銷網站等。

---

## 🔹 SSG 的工作原理
1. **開發階段**：開發者編寫原始內容（Markdown、CMS 或 API 數據）。
2. **構建階段（Build Time）**：框架在編譯時將內容轉換為靜態 HTML 頁面。
3. **部署階段（Deploy Time）**：預先生成的 HTML 部署到 CDN 或 Web 伺服器。
4. **使用者存取**：使用者請求時，直接獲取靜態 HTML，無需後端運行時處理，速度極快。

---

## 🔹 常見的 SSG 框架
| 框架 | 說明 |
|------|------|
| **Next.js**（React） | 支援 SSG、ISR（增量靜態生成） |
| **Gatsby**（React） | 適合內容驅動的網站，如部落格 |
| **Hugo**（Go） | 超快速的靜態網站生成器 |
| **Jekyll**（Ruby） | GitHub Pages 官方支援 |
| **Nuxt.js**（Vue） | 支援 SSG、SSR 混合模式 |

---

## 🔹 SSG vs 其他渲染方式
| 渲染方式 | 什麼時候生成 HTML？ | 速度 | 伺服器需求 |
|---------|-----------------|------|----------|
| **SSG（Static Site Generation）** | **Build 時**（預先生成） | **最快** | 無需伺服器（CDN 即可） |
| **SSR（Server-Side Rendering）** | **每次請求時** | 較慢 | 需要伺服器 |
| **CSR（Client-Side Rendering）** | **瀏覽器端動態渲染** | 較慢（首次載入慢） | 依賴 API |

---

## 🔹 何時使用 SSG？
✅ 內容較靜態的網站（如部落格、文件網站）  
✅ 需要極快的載入速度，適合 **SEO（搜尋引擎優化）**  
✅ 內容變更頻率較低，或可以透過 **ISR**（增量靜態生成）更新  

如果你計畫建立 **雲端教學技術的靜態網站**，SSG 會是一個不錯的選擇！🚀
