## 📘 前言：什麼是 Android ABI Splitting？

**Introduction: What is Android ABI Splitting?**

Android ABI Splitting 是一種將應用程式根據不同 CPU 架構（ABI，Application Binary Interface）**拆分成多個小型 APK** 的技術。
Android ABI Splitting is a technique that splits your app into multiple smaller APKs based on different CPU architectures (ABI – Application Binary Interface).

這樣一來，用戶裝置只會下載與其 CPU 相容的 APK，而非一個龐大的通用 APK。
This way, the user's device downloads only the APK compatible with its CPU, instead of a large universal APK.

這能有效減少 APK 大小、安裝時間與儲存空間。
This significantly reduces APK size, installation time, and storage usage.

---

## 🔧 ABI Splitting 放在哪裡？

**Where to Place ABI Splitting Settings?**

你需要將以下設定加入 `android/app/build.gradle` 的 `android {}` 區塊中，與 `defaultConfig {}`、`buildTypes {}` 同一層級：
Add the following configuration inside the `android {}` block in `android/app/build.gradle`, at the same level as `defaultConfig {}` and `buildTypes {}`:

```groovy
android {
    compileSdkVersion 34
    defaultConfig {
        applicationId "com.example.myapp"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0"
    }

    // ABI Splitting 設定 | ABI Splitting Configuration
    splits {
        abi {
            enable true                   // 啟用 ABI 拆分 | Enable ABI splitting
            reset()                       // 重設 ABI 清單 | Reset ABI list
            include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"  // 指定支援架構 | Supported ABIs
            universalApk false            // 不產生通用 APK | No universal APK
        }
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

---

## ✅ 為什麼要使用 ABI Splitting？

**Why Use ABI Splitting?**

| 優點                 | 說明                                    |
| ------------------ | ------------------------------------- |
| ✅ 減少 APK 大小        | 每個使用者只下載對應架構的 APK                     |
| ✅ Smaller APK size | Users only download the ABI they need |

\| ✅ 更快的安裝速度 | 減少裝置處理負擔 |
\| ✅ Faster installation | Less processing on the device |

\| ✅ 儲存空間更省 | 沒有不必要的原生庫 |
\| ✅ Saves storage | No unnecessary native libraries |

---

## 📦 構建結果

**Build Outputs**

執行 `./gradlew assembleRelease` 或 `yarn build:apk` 之後，你會看到以下檔案：
After running `./gradlew assembleRelease` or `yarn build:apk`, you'll see the following files:

```
android/app/build/outputs/apk/release/
├── app-armeabi-v7a-release.apk
├── app-arm64-v8a-release.apk
├── app-x86-release.apk
└── app-x86_64-release.apk
```

每一個 APK 都只包含該架構所需的原生程式庫。
Each APK only contains native libraries for its target ABI.

---

## 🚀 與 Google Play 搭配使用

**Using with Google Play**

* 如果你使用 `.aab`（Android App Bundle）格式上傳到 Google Play，系統會自動處理並分發正確的 APK。
  If you upload an `.aab` (Android App Bundle) to Google Play, Google will automatically split and deliver the correct APK.

* 如果你選擇使用 `.apk` 上傳，就必須自己處理 versionCode 並手動上傳多個 APK。
  If you choose to upload `.apk` files instead, you need to manage `versionCode` manually and upload each APK separately.

