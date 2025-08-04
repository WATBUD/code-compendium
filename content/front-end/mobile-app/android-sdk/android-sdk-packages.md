你想知道你自己 App 在 Android 裝置上的資料目錄路徑嗎？這個路徑格式通常是：

```
/data/data/<你的 App 包名>/
```

---

## 取得自己 App 包名

* 你可以在 Android Studio 的 `AndroidManifest.xml` 找到 `<manifest package="com.example.myapp">`，裡面的 `package` 就是你的包名。
* 也可以用 adb 指令列查所有安裝的包名：

```bash
adb shell pm list packages
```

會列出所有包名，你可以找你的 App。

---

## 完整取得資料路徑示例

假設你的 App 包名是 `com.example.myapp`，那你要讀的 SharedPreferences 路徑是：

```
/data/data/com.example.myapp/shared_prefs/
```

裡面會有一堆 `.xml` 檔，通常 SharedPreferences 就是存在這裡。

---

## 怎麼找到可能存 UUID 的檔案

1. 連接裝置，執行 adb shell 並切換 root：

```bash
adb shell
su
cd /data/data/com.example.myapp/shared_prefs/
ls -l
```

2. 找看哪個 XML 檔看起來跟 UUID 有關（例如 `device_uuid.xml`、`prefs.xml`、`settings.xml` 等）。

3. 用 `cat` 查看內容：

```bash
cat device_uuid.xml
```

4. 如果你不確定檔名，可能要反編譯 APK 找出 SharedPreferences 名稱，或用 `grep` 搜尋關鍵字（例如 `UUID`）。

---

## 如何用程式取得 App 自己資料目錄路徑

在 App 裡用 Kotlin/Java 也可以：

```kotlin
val dataDir = context.filesDir.parentFile?.absolutePath
println("App Data Dir = $dataDir")
```

或更直接：

```kotlin
val dataDir = context.applicationInfo.dataDir
println("App Data Dir = $dataDir")
```

這兩種會印出 `/data/data/com.example.myapp`。

---

有了路徑，你就可以用 root 權限在 adb shell 或其他方式直接存取囉！需要我幫你寫腳本自動讀取、分析檔案內容也可以。
