React Native JavaScript 引擎和 `AbortController` 

**React Native JavaScript 引擎：**

* **引擎選擇：**
    * React Native 在 Android 上使用 Hermes AOT（Ahead-of-Time）編譯，JavaScriptCore (JSC) 在 iOS 上是主要使用 JIT (Just-in-Time) 編譯。
    * React Native 0.70 版本開始，Hermes 已成為預設引擎，但仍保留 JSC 的選項。
    * Expo 專案預設使用 Hermes，以優化效能。
    * JavaScriptCore (JSC): 這是 iOS 上的預設引擎，主要使用 JIT 編譯。
    * Hermes: 您可以選擇啟用 Hermes，它在 iOS 上也會使用其預先編譯 bytecode 的方式，更偏向 AOT 的策略。
* **引擎差異：**
    * Hermes 是 Meta 針對 React Native 優化的引擎，著重於提升啟動速度和降低記憶體使用。
    * JSC 是 Apple 的 JavaScript 引擎，用於 Safari 和 iOS 上的 React Native。
    * V8 是Google 的JavaScript 引擎，用於Chrome 和 node.js。
* **引擎檢查：**
    * 可透過 JavaScript 程式碼檢查 `global.HermesInternal` 是否存在來判斷是否使用 Hermes。
    * Android 開發者可檢查 `android/gradle.properties` 檔案中的 `hermesEnabled` 屬性。

**AbortController：**

* **Web API：**
    * `AbortController` 是一個 Web API，用於取消非同步操作，常與 `fetch` API 搭配使用。
* **React Native 的支援：**
    * React Native 支援 `AbortController`，因為它已成為 JavaScript 標準的一部分，且 React Native 提供了 `fetch` API 的實現。
    * 即使 `AbortController` 最初是 Web API，它現在已在 React Native 的 JavaScript 環境中可用。
* **用途：**
    * 用於管理 React Native 應用中的非同步操作，例如網路請求和定時器。
    * 有助於提高應用效能，透過取消不再需要的非同步操作來釋放資源。
* **CDN 與 Web APIs:**
    * CDN (內容分發網路) 主要用於加速靜態資源的傳輸。
    * CDN 本身與 Web APIs 的功能無關。
    * 但是，通過CDN分發的javaScript文件，是可以調用web API的，前提是該javaScript程式碼，運行在含有該web API的瀏覽器環境下。

