## `absolute` vs. `fixed` 差異重點

| 屬性 | `absolute`（絕對定位） | `fixed`（固定定位） |
|--------|-----------------|-----------------|
| **參考點** | 最近的**定位祖先**（`relative`、`absolute` 或 `fixed` 的父層） | **視口（viewport）**，即瀏覽器視窗 |
| **是否隨滾動** | ✅ **會**，跟隨頁面內容滾動 | ❌ **不會**，固定在畫面上 |
| **常見用途** | **相對父層元素定位**，如彈出選單、提示框等 | **固定畫面特定位置**，如導航欄、返回頂部按鈕 |

### 📌 **簡單判斷**
- **元素要依附父層？** → `absolute`
- **元素要固定在畫面？** → `fixed`

---

## **範例**

```css
.container {
  position: relative; /* 設為相對定位，讓 absolute 參考它 */
  width: 400px;
  height: 200px;
  background-color: lightblue;
}

.absolute-box {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100px;
  height: 50px;
  background-color: red;
}

.fixed-box {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 100px;
  height: 50px;
  background-color: green;
}
```

## **效果**
- `.absolute-box` **相對 `.container` 定位**，會放在 `.container` 內的 `(top: 20px, left: 20px)` 位置。
- `.fixed-box` **固定在視口右下角**（`bottom: 10px; right: 10px;`），**不受滾動影響**，即使滾動頁面，仍保持原位。

