```md
# 解決 VS Code 找不到 Node.js 二進位檔 "node" 問題

當你在 VS Code 調試 Node.js 程式時，若出現以下錯誤訊息：

```
找不到 Node.js 二進位檔 "node": 路徑不存在。
```

代表 VS Code 在啟動調試時無法找到 Node.js 的執行檔。以下步驟可以幫助你解決這個問題。

---

## 1. 確認 Node.js 是否安裝

在終端機中執行以下命令，檢查 Node.js 是否正確安裝：

```sh
node -v
```

- 若有版本號回應，表示 Node.js 已安裝。
- 若無回應或顯示錯誤，請先從 [Node.js 官網](https://nodejs.org/) 安裝 Node.js。

---

## 2. 檢查 Node.js 的路徑

在終端機中輸入以下命令來查看 Node.js 的安裝路徑：

```sh
which node
```

這會顯示 Node.js 的完整路徑（例如 `/usr/local/bin/node`）。確認該路徑存在並且已包含在系統的 PATH 中。

---

## 3. 在 VS Code 的 launch.json 中指定 runtimeExecutable

若 VS Code 仍無法找到 Node.js，你可以在 `.vscode/launch.json` 中明確指定 Node.js 的完整路徑。例如：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${file}",
      "runtimeExecutable": "/usr/local/bin/node"  // 根據你的系統調整路徑
    }
  ]
}
```

> **提示：** 請使用 `which node` 得到的實際路徑。

---

## 4. 重啟 VS Code

修改 PATH 或 `launch.json` 後，有時需要重啟 VS Code 才能使變更生效。

---

## 小結

- **步驟 1**：確認 Node.js 是否已安裝。
- **步驟 2**：檢查 Node.js 安裝路徑是否在系統 PATH 中。
- **步驟 3**：在 `launch.json` 中指定 `runtimeExecutable` 為 Node.js 的完整路徑。
- **步驟 4**：重啟 VS Code。

依照以上步驟操作後，應能解決找不到 Node.js 執行檔的問題，並順利使用 F5 快捷鍵進行調試。
```