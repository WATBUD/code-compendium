# 📘 圖片壓縮教學指南 Image Compression Guide

## 🎯 教學目標 Objective

**學會如何將常見圖片格式（AVIF、WebP、JPEG、PNG）進行有效壓縮，以減少檔案大小、提升網站效能，同時盡可能保留畫質。**
Learn how to effectively compress common image formats (AVIF, WebP, JPEG, PNG) to reduce file size, improve website performance, and retain image quality as much as possible.

---

## 🔍 為什麼要壓縮圖片？

Why Should We Compress Images?

* 減少圖片載入時間，**加快網站速度**
  Reduce image loading time to **speed up your website**
* 節省儲存空間與頻寬
  Save storage space and bandwidth
* 提升 SEO 表現與用戶體驗
  Improve SEO performance and user experience
* 在行動裝置上也能快速載入
  Enable fast loading on mobile devices

---

## 🧠 圖片壓縮的基本原理

Basic Principles of Image Compression

### ✅ 色彩減少（Color Quantization）

將圖片的色彩數量從數百萬色降低為幾百色，盡可能保留視覺上的相似性。
Reduce the number of colors in an image (e.g., from millions to hundreds) while maintaining visual similarity.

### ✅ 有損壓縮（Lossy Compression）

移除人眼不容易察覺的細節來減少檔案大小，會有微小畫質損失。
Remove imperceptible details to reduce file size; may cause slight quality loss.

### ✅ 去除冗餘資料（Metadata Removal）

刪除如相機設定、GPS、歷史紀錄等非必要資訊，不影響圖片顯示。
Remove unnecessary information like camera data, GPS, and history without affecting image display.

---

## 📂 常見圖片格式與壓縮支援

Common Image Formats and Compression Support

| 格式 Format | 是否支援壓縮 Supported | 壓縮方式 Compression Type | 備註 Notes                           |
| --------- | ---------------- | --------------------- | ---------------------------------- |
| JPEG      | ✅ 是 Yes          | 有損 Lossy              | 適合照片 Photographs                   |
| PNG       | ✅ 是 Yes          | 有損/無損 Lossy/Lossless  | 支援透明背景 Transparent support         |
| WebP      | ✅ 是 Yes          | 有損/無損 Lossy/Lossless  | 現代瀏覽器支援 Good browser support       |
| AVIF      | ✅ 是 Yes          | 有損/無損 Lossy/Lossless  | 最佳壓縮效率 Best compression efficiency |

---

## ❓ 壓縮是否會讓圖片失真？

Does Compression Cause Image Distortion?

| 項目 Item                                                | 說明 Description    |
| ------------------------------------------------------ | ----------------- |
| 是否有失真？                                                 | ✅ 是，有損壓縮會造成輕微畫質降低 |
| Yes, lossy compression causes slight quality reduction |                   |
| 是否可察覺？                                                 | 🚫 通常肉眼無法分辨差異     |
| Usually imperceptible to the human eye                 |                   |
| 使用建議                                                   | ✅ 適合網站圖片與社群媒體用途   |
| Recommended for websites and social media              |                   |
| 不適用場景                                                  | ❌ 不適合列印或專業攝影用途    |
| Not suitable for printing or professional photography  |                   |

---

## 🛠 圖片壓縮步驟（線上工具示範）

Steps to Compress Images (Using Online Tools)

1. 開啟壓縮工具網站
   Open an online compression tool
2. 拖曳或上傳圖片
   Drag and drop or upload your images
3. 工具自動壓縮圖片大小
   The tool compresses images automatically
4. 下載壓縮後的圖片並使用
   Download and use the optimized images

---

## ✅ 壓縮效果比較

Compression Result Comparison

| 圖片 Image | 原始大小 Original Size | 壓縮後大小 Compressed Size | 畫質變化 Quality Change         |
| -------- | ------------------ | --------------------- | --------------------------- |
| 圖片 A     | 1.2 MB             | 230 KB                | 幾乎無變化 Almost none           |
| 圖片 B     | 800 KB             | 150 KB                | 無明顯差異 No obvious difference |

---

## 📌 建議使用情境

Recommended Use Cases

* ✅ 網站圖片 Website images (e.g. banners, photos)
* ✅ App 素材 Mobile app assets
* ✅ 報告簡報插圖 Presentation graphics
* ❌ 高品質印刷與專業攝影 High-quality printing or pro photography

---

## 🧰 延伸工具建議（可自行搜尋）

Suggested Tools (Search on your own)

* 批次壓縮與自動化工具（CLI）
  Batch compression and automation tools (CLI)
* 支援 WebP 與 AVIF 的桌面應用程式
  Desktop apps supporting WebP and AVIF
* 不需安裝的瀏覽器壓縮服務
  Browser-based services with no installation required

