# 用 apktool 操作 APK 的基本流程

---

## 1. 反編譯 APK（解包）

把 APK 拿到你工作資料夾，執行：

```bash
apktool d your_app.apk -o app_src
```

* `your_app.apk` 是你要修改的 APK 檔名。
* `app_src` 是反編譯後產生的資料夾，裡面會有 smali 代碼和資源檔。

---

## 2. 編輯 smali（或資源）

* 用文字編輯器打開 `app_src/smali/` 目錄下的 smali 檔案。
* 找到你想修改的程式碼位置，直接修改 smali，或加入印 log 的 smali 程式碼。

---

## 3. 重新打包 APK

編輯完畢後，回終端執行：

```bash
apktool b app_src -o app_modified.apk
```

* 這會把 `app_src` 重新打包成 APK。

---

## 4. 簽名 APK（ndroid 裝置不允許安裝未簽名的 APK）(如果你沒金鑰，先產生一組自簽名金鑰)

[android-sdk-keytool](../../android-sdk/android-sdk-keytool.md)

```bash 
keytool -genkey -v -keystore my-release-key.keystore -alias myalias -keyalg RSA -keysize 2048 -validity 10000
```

```bash
# 用 apksigner 簽名，這會同時產生 v1 和 v2 簽名

$ANDROID_HOME/build-tools/36.0.0/apksigner sign \
  --ks my-release-key.keystore \
  --ks-key-alias myalias \
  --out app-signed.apk \
  app_modified.apk

$ANDROID_HOME/build-tools/36.0.0/apksigner \
verify app-signed.apk

```

## 5. zipalign 優化（選擇性但建議做）
```bash
~/Library/Android/sdk/build-tools/36.0.0/zipalign -v 4 app-signed.apk app-signed-final.apk

```
## 6. 安裝並測試
```bash
adb install -r app-signed-final.apk
```
