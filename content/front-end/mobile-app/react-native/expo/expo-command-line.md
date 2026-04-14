➡️ 用 Expo 建立一個 TypeScript + SDK 53 的空白專案  
npx create-expo-app expo-firebase-native --template expo-template-blank-typescript@sdk-53

➡️ 把 Expo 專案轉成原生 Android 專案（產生 android/ 資料夾）  
npx expo prebuild --platform android

➡️ 清除快取並啟動 Expo  
npx expo start --clear

➡️ 清除 Android build 並重新編譯 (另一個終端)  
cd android && ./gradlew clean && cd ..
npx expo run:android
