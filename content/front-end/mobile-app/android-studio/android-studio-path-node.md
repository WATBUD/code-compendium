沒問題，我幫你整理一個 **完整 Markdown 教學**，針對 **Mac Apple M4 Pro / Apple Silicon + React Native / Expo Android** 的 Node 設定問題。

---

````markdown
# 🖥️ Mac Apple Silicon (M4 Pro) React Native / Expo Android Node 設定教學

這份教學解決問題：

```text
A problem occurred evaluating settings 'android'.
> A problem occurred starting process 'command 'node''
```
````

---

## 1️⃣ 確認 Node 路徑

如果你用 `nvm` 安裝 Node，可以先確認版本：

```bash
nvm list
```

假設你安裝的是：

```text
v20.19.0
```

Node 路徑通常在：

```bash
/Users/你的用戶名/.nvm/versions/node/v20.19.0/bin/node
```

---

## 2️⃣ 為 Gradle 建立系統級 Node

Android Studio / Gradle 不會讀 nvm，所以必須建立 symlink：

```bash
sudo ln -s /Users/louis_chin/.nvm/versions/node/v20.19.0/bin/node /opt/homebrew/bin/node
```

> ⚠️ Apple Silicon 建議使用 `/opt/homebrew/bin`，不是 `/usr/local/bin`

---

## 3️⃣ 驗證 Node 是否可被系統讀取

```bash
which node
node -v
```

✅ 預期輸出：

```text
/opt/homebrew/bin/node
v20.19.0
```

---

## 4️⃣ 重新啟動 Android Studio

- **完全關閉** Android Studio
- 再重新開啟你的專案
- 確保 Terminal 可以讀到 node：

```bash
node -v
```

---

## 5️⃣ 執行 Expo / React Native Android

```bash
npx expo run:android
```

或透過 Android Studio ▶️ Build / Run

---

## 6️⃣ 重要說明

- `NODE_BINARY` 設定只影響 **React Native bundler**
- `nvm` 設定只影響 **Terminal**
- Gradle 直接呼叫 `node`，必須是 **系統 PATH 可找到的 Node**

---

## 7️⃣ 常見問題

| 問題                                            | 解法                                                     |
| ----------------------------------------------- | -------------------------------------------------------- |
| Terminal 可以 node -v，但 Android Studio 仍報錯 | 確認 `/opt/homebrew/bin/node` symlink，重啟 Studio       |
| Apple Silicon PATH 沒有 /opt/homebrew/bin       | 在 `.zshrc` 裡加 `export PATH="/opt/homebrew/bin:$PATH"` |
| React Native Hermes build fail                  | 確認 Node 路徑可被 Gradle 找到（symlink）                |
