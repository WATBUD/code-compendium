### **`readline` 是什麼？JS 原生沒有嗎？**  

`readline` 是 **Node.js 內建的模組**，**不是瀏覽器端的 JavaScript 內建 API**。  
在 **Node.js 環境** 裡，它主要用來 **讀取標準輸入（stdin）和標準輸出（stdout）**，比如處理命令列輸入。

---

## **1️⃣ `readline` 在 Node.js 的用途**
在 **Node.js**，我們常用 `readline` 來讀取 **使用者輸入**，例如：
```ts
import * as readline from 'readline';

// 建立 Readline 介面
const rl = readline.createInterface({
  input: process.stdin,  // 從標準輸入讀取
  output: process.stdout // 在標準輸出顯示
});

// 提示使用者輸入
rl.question("你的名字是？", (name) => {
  console.log(`Hello, ${name}!`);
  rl.close(); // 關閉 readline 介面
});
```
#### **🔹 這個程式的行為**
1. 在 **終端機（Terminal/Command Line）** 顯示 `你的名字是？`
2. 等待使用者輸入
3. 讀取輸入並輸出 `Hello, xxx!`

---

## **2️⃣ JS 原生沒有 `readline` 嗎？**
**瀏覽器環境（Browser JavaScript）** **沒有** `readline`，因為：
- 瀏覽器端 **沒有 `process.stdin` 這種標準輸入**
- `readline` 是 **Node.js 獨有的 API**，不能在 **React、Next.js、Vue** 這類前端框架使用

**💡 如果你在瀏覽器端想讀取輸入，應該用 `prompt()` 或 `input` 表單**
```js
const name = prompt("你的名字是？");
console.log(`Hello, ${name}!`);
```

---

## **3️⃣ `readline` 適用場景**
- **CLI 工具（命令列應用）**
- **Node.js 腳本**
- **讀取檔案內容（與 `fs` 搭配）**
- **與後端伺服器進行互動**

如果你要在 **瀏覽器端** 用 `readline`，那就不行，請用 `prompt()` 或 `<input>`！

---

## **🎯 總結**
| 環境 | 是否支援 `readline` |
|------|------------------|
| **Node.js（後端）** | ✅ 支援 |
| **瀏覽器（前端）** | ❌ 不支援 |
| **React / Next.js / Vue** | ❌ 不支援 |

如果你在 **Next.js 或 React 裡用 `readline`，會報錯**，因為它只適用於 **Node.js**！ 🚀