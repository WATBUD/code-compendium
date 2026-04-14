# Expo + TypeScript + Kotlin + Firestore（完整教學）

## 🎯 目標

建立一個流程：

```
React Native (Expo + TS)
→ 呼叫 Kotlin 原生
→ Kotlin 使用 Firestore（支援 Emulator）
```

---

# 1️⃣ 建立 Expo TypeScript 專案

```bash
npx create-expo-app expo-firebase-native --template expo-template-blank-typescript@sdk-48
cd expo-firebase-native
```

---

# 2️⃣ 安裝 Firebase 套件

```bash
npx expo install @react-native-firebase/app @react-native-firebase/firestore
```

---

# 3️⃣ 設定 Expo Android Package

`app.json`

```json
{
  "expo": {
    "name": "expo-firebase-native",
    "slug": "expo-firebase-native",
    "android": {
      "package": "com.yourapp.demo"
    }
  }
}
```

---

# 4️⃣ 轉成原生專案（關鍵）

```bash
npx expo prebuild
```

產生：

```
android/
ios/
```

---

# 5️⃣ Firebase Android 設定

## 放入 `google-services.json`

```
android/app/google-services.json
```

## 修改 `android/build.gradle`

```gradle
classpath 'com.google.gms:google-services:4.3.15'
```

## 修改 `android/app/build.gradle`

```gradle
apply plugin: 'com.google.gms.google-services'
```

---

# 6️⃣ 建立 Kotlin Module

📁 路徑：

```
android/app/src/main/java/com/yourapp/demo/
```

## FirestoreModule.kt

```kotlin
package com.yourapp.demo

import com.facebook.react.bridge.*
import com.google.firebase.firestore.FirebaseFirestore

class FirestoreModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val db = FirebaseFirestore.getInstance()

    override fun getName(): String {
        return "FirestoreModule"
    }

    @ReactMethod
    fun writeLog(message: String, promise: Promise) {
        val docRef = db.collection("errors")
            .document("AppDevice")
            .collection("platforms")
            .document("TEST")
            .collection("logs")
            .document()

        val data = hashMapOf(
            "message" to message,
            "createdAt" to System.currentTimeMillis()
        )

        docRef.set(data)
            .addOnSuccessListener {
                promise.resolve(docRef.path)
            }
            .addOnFailureListener {
                promise.reject("ERROR", it)
            }
    }
}
```

---

# 7️⃣ 建立 Package

## FirestorePackage.kt

```kotlin
package com.yourapp.demo

import com.facebook.react.*
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.ViewManager

class FirestorePackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext)
        = listOf(FirestoreModule(reactContext))

    override fun createViewManagers(reactContext: ReactApplicationContext)
        = emptyList<ViewManager<*, *>>()
}
```

---

# 8️⃣ 註冊 Module

打開：

```
MainApplication.kt
```

加入：

```kotlin
override fun getPackages(): List<ReactPackage> {
    return listOf(
        MainReactPackage(),
        FirestorePackage()
    )
}
```

---

# 9️⃣ React Native 呼叫 Kotlin

## TypeScript

```ts
import { NativeModules } from 'react-native';

const { FirestoreModule } = NativeModules;

export const logToFirestore = async () => {
  try {
    const result = await FirestoreModule.writeLog('Hello from Expo TS');
    console.log('Success:', result);
  } catch (e) {
    console.error('Error:', e);
  }
};
```

---

# 🔟 Firestore Emulator 設定（重要）

在 Kotlin 加入：

```kotlin
db.useEmulator("10.0.2.2", 8080)
```

📌 說明：

| 平台             | Host      |
| ---------------- | --------- |
| Android Emulator | 10.0.2.2  |
| iOS Simulator    | 127.0.0.1 |

---

# 1️⃣1️⃣ 啟動專案

```bash
npx expo run:android
```

---

# ⚠️ 常見錯誤

## ❌ 1. Firestore 有 log 但沒資料

原因：

- 沒連 Emulator
- Firebase config 錯誤
- package name 不一致

---

## ❌ 2. Kotlin 不生效

原因：

- 沒註冊 Package
- JS module 名稱錯
- 沒 rebuild

---

## ❌ 3. prebuild 洗掉 Kotlin

解法：

```bash
npx expo prebuild --clean
```

或避免重複 prebuild

---

# 🧠 架構總結

```
Expo (TS)
   ↓
NativeModules
   ↓
Kotlin Module
   ↓
Firestore
```

---

# 🚀 進階建議

- 用 Config Plugin 避免 Kotlin 被覆蓋
- 用 Kotlin 做 log aggregation（統計）
- 將 Firestore 操作集中在 native 層

---

# ✅ 完成效果

你可以成功寫入：

```
/errors/AppDevice/platforms/TEST/logs/{autoId}
```

並在 Firebase Emulator UI 或 Console 看到資料 🎉

---
