在 macOS 上產生 SSH 金鑰的指令如下：

```bash
ssh-keygen -t ed25519 -C "Bitbucket"
```

### 指令說明：

* `-t ed25519`：使用 Ed25519 加密演算法（建議使用，較新且安全）。
* `-C "Bitbucket"`：附加註解，通常是你的 Email，方便辨識金鑰。

### 完整步驟：

1. 打開 Terminal。

2. 執行上述指令後，會出現提示：

   ```
   Enter file in which to save the key (/Users/your_user/.ssh/id_ed25519):
   ```

   直接按 Enter 使用預設路徑即可（或自定路徑）。

3. 接著會要求輸入密碼（可選）：

   ```
   Enter passphrase (empty for no passphrase):
   ```

   可以直接按 Enter 不設密碼，或自行輸入保護金鑰的密碼。

4. 成功後會看到類似訊息：

   ```
   Your identification has been saved in /Users/your_user/.ssh/id_ed25519
   ```
   Your public key has been saved in /Users/your_user/.ssh/id_ed25519.pub

### 查看 SSH 公鑰：

```bash
cat ~/.ssh/id_ed25519.pub
```

將pub內容or 查看 SSH 公鑰的內容 複製並加到像 GitHub、GitLab 等平台的 SSH key 設定中。

