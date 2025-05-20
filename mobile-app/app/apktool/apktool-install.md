
### 1.Download the Mac wrapper script. (Right click, Save Link As apktool)
### 2.Download the latest version of Apktool.
### 3.Rename the downloaded jar to apktool.jar.
### 4.Move both apktool.jar and apktool to /usr/local/bin. (root needed)
### 5.Make sure both files are executable. (chmod +x)
### 6.Try running apktool via CLI. 
---

## 5 假設你已經下載好兩個檔案：

* `/usr/local/bin/apktool` （Mac Wrapper Script）
* `/usr/local/bin/apktool.jar` （Apktool 主程式）

---

### 1. 開啟終端機 Terminal

---

### 2. 切換到 `/usr/local/bin` 目錄

```bash
cd /usr/local/bin
```

---

### 3. 使用 chmod 指令讓兩個檔案可執行

```bash
sudo chmod +x apktool
sudo chmod +x apktool.jar
```

* `sudo` 是用來取得管理員權限，系統會要求你輸入密碼。
* `chmod +x` 是把檔案權限改成可執行。

---

### 4. 確認檔案權限

你可以用 `ls -l` 看看：

```bash
ls -l apktool apktool.jar
```

你會看到類似：

```
-rwxr-xr-x  1 yourname  staff  1234 May 20 12:00 apktool
-rwxr-xr-x  1 yourname  staff  567890 May 20 12:00 apktool.jar
```

`x` 就是可執行權限。

---

### 5. 測試 apktool

```bash
apktool
```

如果出現 apktool 的說明文字，代表安裝成功！

---
