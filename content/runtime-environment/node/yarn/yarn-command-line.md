➡️ **針對目前專案** 檢查沒使用的套件

- command:yarn add -D depcheck
  在專案根目錄執行：npx depcheck
  輸出會顯示兩個重點：

- **Unused dependencies**：`package.json` 裡有，但程式碼裡沒用的套件
- **Missing dependencies**：程式碼有用，但 `package.json` 裡沒列的套件
  範例輸出：

```text
Unused dependencies
* lodash
* moment

Missing dependencies
* react
```

3. 移除沒用的套件（例如 lodash、moment）：

yarn remove lodash moment

⚠️ 注意：

- `depcheck` 只會掃描 JS / TS / JSX / TSX 檔案，不會自動掃描像 `.json` 或特殊動態 `require` 的使用
- 建議先確認 `Unused dependencies` 再刪
