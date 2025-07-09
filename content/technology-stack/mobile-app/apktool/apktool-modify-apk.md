## 1. apktool反編譯 APK（解包）

APK 拿到工作資料夾，執行：

```bash
apktool d femas.apk -o app_src
```
* `femas.apk` 要修改的 APK 檔名。
* `app_src` 是反編譯後產生的資料夾，裡面會有 smali 代碼和資源檔。

## 2. 編輯 smali（或資源）

* 用文字編輯器打開 `app_src/smali/` 目錄下的 smali 檔案。
* 找到你想修改的程式碼位置，直接修改 smali，或加入印 log 的 smali 程式碼。

## 3. 重新把 `app_src` 重新打包成 APK

```bash
apktool b app_src -o app_modified.apk
```

## 4. zipalign 優化

```bash
~/Library/Android/sdk/build-tools/36.0.0/zipalign -v 4 app_modified.apk app_modified_zipalign.apk

```

## 5. 簽名 APK（ndroid 裝置不允許安裝未簽名的 APK）(如果你沒金鑰，先產生一組自簽名金鑰)

產生一組自簽名金鑰：[android-sdk-keytool](../../android-sdk/android-sdk-keytool.md)

- apksigner 簽名同時產生 v1/v2/v3 簽名

```bash
$ANDROID_HOME/build-tools/36.0.0/apksigner sign \
  --ks my-release-key.keystore \
  --ks-key-alias myalias \
  --v1-signing-enabled true \
  --v2-signing-enabled true \
  --out app_signed_final.apk \
  app_modified_zipalign.apk


```

```bash
# check v1/v2/v3 簽名
$ANDROID_HOME/build-tools/36.0.0/apksigner \
verify app_signed_final.apk
```



## 6. 安裝並測試

```bash
adb install -r app_signed_final.apk
```
