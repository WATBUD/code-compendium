好的，以下是你提供內容的**繁體中文版本**，格式和內容都保留，只有語言轉換：

---

### jarsigner 預設只簽名 v1 (JAR) 簽名，不包含 v2 簽名

### Android 7.0 以上要求使用 APK Signature Scheme v2（甚至更高），而 jarsigner 不支援 v2。

###

### 解決方案：用 apksigner 簽名

### Android SDK 的 apksigner 工具支援 v2 簽名，請用它來取代 jarsigner。

---

### **2. 解決方案**

#### **方法 1：使用 `apksigner` 自動添加 V1+V2+V3 簽名**

Android 官方推薦用 `apksigner`（而非 `jarsigner`）確保包含 V2/V3 簽名：

```bash
# 使用 Android SDK 的 apksigner（確保路徑正確）
$ANDROID_HOME/build-tools/34.0.0/apksigner sign \
  --ks my-release-key.keystore \
  --ks-key-alias myalias \
  --out app-signed.apk \
  app_modified.apk
```

#### **方法 2：檢查現有簽名**

查看 APK 是否已有簽名及簽名版本：

```bash
apksigner verify -v app_modified.apk
```

#### **方法 3：簽名時強制啟用 V2/V3**

如果用 `jarsigner`，需額外執行：

```bash
jarsigner -verbose -keystore my-release-key.keystore app_modified.apk myalias

# 再用 zipalign 對齊
zipalign -v 4 app_modified.apk app_final.apk
~/Library/Android/sdk/build-tools/36.0.0/zipalign -v 4 app_modified.apk app_final.apk

# 最後用 apksigner 添加 V2/V3
apksigner sign --ks my-release-key.keystore --ks-key-alias myalias app_final.apk
```

---

### **3. 重要注意事項**

* **必須同時保留 V1 和 V2/V3 簽名**：

  * V1（JAR 簽名）相容舊版 Android
  * V2/V3（APK 簽名）相容 Android 7.0+
* **簽名後不可再修改 APK**：
  若需調整，必須重新簽名。

---

需要我幫你排版成文件或加入其他說明嗎？
