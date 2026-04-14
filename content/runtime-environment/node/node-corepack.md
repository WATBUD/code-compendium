
---

### 🌐 什麼是 Corepack？

**What is Corepack?**

Corepack 是 Node.js 內建的工具，用來管理 JavaScript 套件管理器（如 Yarn 或 pnpm）的版本。
**Corepack is a built-in tool in Node.js used to manage versions of JavaScript package managers such as Yarn or pnpm.**

---

### ✅ 為什麼要使用 Corepack？

**Why use Corepack?**

為了解決不同開發者或專案之間使用不同版本的套件管理器所導致的錯誤或不一致性。
**To prevent errors or inconsistencies caused by using different package manager versions across developers or projects.**

它可以根據 `package.json` 中指定的版本，自動安裝與執行正確的工具版本。
**It automatically installs and runs the correct version specified in `package.json`.**

---

### 📦 如何使用 Corepack？

**How to use Corepack?**

1. **啟用 Corepack**（Node.js 16.10+ 需要執行一次）：
   **Enable Corepack** (Required once for Node.js 16.10+):

   ```bash
   corepack enable
   ```

2. **在 `package.json` 中指定套件管理器版本**：
   **Specify the package manager version in `package.json`:**

   ```json
   {
     "packageManager": "yarn@3.2.3"
   }
   ```

3. **其他開發者只需執行 `yarn` 或 `pnpm`，Corepack 會自動使用正確版本**。
   **Other developers can simply run `yarn` or `pnpm`, and Corepack will handle the correct version automatically.**

---

### 🚨 常見錯誤與解法

**Common Error and Fix**

**錯誤訊息 / Error Message:**

```
error This project's package.json defines "packageManager": "yarn@pnpm@8.0.0"
```

**原因 / Reason:**
你同時指定了兩個套件管理器，格式錯誤。
**You mistakenly combined two package managers in the wrong format.**

**正確格式 / Correct format:**

```json
"packageManager": "pnpm@8.0.0" // 或 / or "yarn@3.2.3"
```

---

### 📝 總結 / Summary

| 特性 / Feature       | 說明 / Description                                 |
| ------------------ | ------------------------------------------------ |
| 支援套件管理器            | Yarn、pnpm（未來可能支援更多）                              |
| Supported Managers | Yarn, pnpm (more may be supported in the future) |
| 內建於 Node.js        | 從 Node.js 16.10 開始內建                             |
| Built-in           | Included since Node.js 16.10                     |
| 功能                 | 自動安裝並執行指定版本                                      |
| Purpose            | Auto-install and execute the correct version     |

---

