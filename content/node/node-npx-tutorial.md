---

# 什麼是 `npx`？

**What is `npx`?**

* `npx` 是隨 Node.js 版本 8.2.0 以上（以及 npm 5.2.0 以上）自動安裝的工具。
  `npx` is a tool automatically included with Node.js version 8.2.0+ (and npm 5.2.0+).

* 它的作用是**執行 npm package 中的可執行檔（command-line tools）**，而不用先全域安裝這個 package。
  It allows you to **run executable command-line tools from npm packages** without installing the package globally first.

* 你可以把它想像成「臨時執行」某個 npm 套件的工具。
  Think of it as a tool to temporarily run an npm package.

---

# `npx` 主要功能

**Main Features of `npx`**

1. **直接執行已安裝的套件指令**
   Run commands from packages already installed locally.

2. **執行未安裝的套件指令**
   Run commands from packages not installed locally—`npx` will download, execute, then remove them.

3. **執行本地專案中 `node_modules/.bin` 的指令**
   Easily run commands from your project's `node_modules/.bin` without typing full path.

4. **快速啟動腳本或 CLI 工具**
   Quickly launch scripts or CLI tools like `create-react-app`, `ts-node`, `eslint`, etc.

---

# 基本語法

**Basic Syntax**

```bash
npx <command> [options]
```

* `<command>`：要執行的 npm package 或指令名稱。
  `<command>`: The npm package or command you want to run.

* `[options]`：傳給該指令的參數。
  `[options]`: Arguments passed to that command.

---

# 使用範例

**Usage Examples**

### 1. 執行未安裝的 `create-react-app` 建立 React 專案

Run `create-react-app` without installing it globally:

```bash
npx create-react-app my-app
```

* 會先下載 `create-react-app`，執行後建立專案，下載結束後會自動移除套件。
  Downloads `create-react-app`, runs it to create the project, then automatically removes it.

---

### 2. 使用 TypeScript 編譯器初始化設定（未安裝也可用）

Initialize TypeScript config without global install:

```bash
npx tsc --init
```

---

### 3. 指定版本執行套件

Run specific version of a package:

```bash
npx -p typescript@4.9 tsc --version
```

---

### 4. 執行本地 `node_modules` 裡的套件（免去輸入完整路徑）

Run locally installed jest test runner:

```bash
npx jest
```

---

### 5. 執行 Github gist 或遠端腳本

Run remote script directly:

```bash
npx https://gist.githubusercontent.com/username/gistid/raw/script.js
```

---

# 常用選項

**Common Options**

* `-p, --package <name>`：指定使用的 package
  Specify package to use.

* `--no-install`：禁止自動安裝，若本地無安裝就會失敗
  Disable automatic install; fail if package not found locally.

* `--ignore-existing`：忽略已安裝的指令，強制重新下載執行
  Ignore local installed package, force download and run.

---

# `npx` 與 `npm` 的差別

**Difference Between `npx` and `npm`**

| 功能         | `npm`        | `npx`           |
| ---------- | ------------ | --------------- |
| 安裝 package | 安裝到全域或專案     | 不會安裝，只是執行       |
| 執行 CLI 工具  | 必須先安裝，再用指令執行 | 直接執行，沒安裝會先下載後執行 |
| 使用範圍       | 管理和安裝套件      | 臨時執行套件命令        |

---

# 小結

**Summary**

* `npx` 是 Node.js 生態圈中方便執行 npm package CLI 的工具。
  `npx` is a handy tool in the Node.js ecosystem to run npm package CLI commands easily.

* 適合用來快速試用指令，或不用全域安裝套件的場景。
  Great for quickly trying out commands or avoiding global installs.

* 對新手來說非常實用，減少全域安裝帶來的環境污染。
  Very useful for beginners and reduces environment pollution caused by global installs.

---

