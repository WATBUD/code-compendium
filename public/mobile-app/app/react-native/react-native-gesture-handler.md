### ✅ react-native-gesture-handler

   **React Native 的效能優化重點：**  
   - 減少與 UI Thread 的通訊次數。  
   - 降低 JavaScript Thread 的負擔（避免阻塞事件迴圈）。

1. **React Native 運作在三個執行緒上：**  
   - `JavaScript Thread`：執行邏輯與狀態管理。 最繁忙的一條線：所有手勢處理、動畫觸發、業務邏輯都靠它完成，容易成為瓶頸。  
   - `UI Thread`：處理原生渲染與動畫。  
   - `Shadow Thread`：建立與管理 Shadow Tree，透過 **Yoga 引擎（用 C++ 編寫）** 將 Flexbox 布局轉為原生佈局。

2. **執行緒間的溝通是效能瓶頸之一：**  
   - UI 與 JS 執行緒之間是**非同步通訊**，UI 不會等待 JS 執行完再更新畫面。  
   - 資料傳遞需要經過**序列化與反序列化**，這會增加延遲。  
     👉 **比方說：**  
     JavaScript 中原本的物件 `{ color: "blue" }`，會先被序列化為字串：  
     ```js
     JSON.stringify({ color: "blue" }) // → '{"color":"blue"}'
     ```  
     UI Thread 收到後再將字串反序列化為原生物件（例如在 Swift 中）：  
     ```swift
     let json = try! JSONSerialization.jsonObject(with: data) as! [String: String]
     let color = json["color"] // 得到 "blue"
     ```  
     這樣的「編碼 → 傳送 → 解碼」過程會耗費效能與時間。

3. **React Native Gesture Handler 的優勢：**  
   - 提供更多靈活手勢處理（滑動、縮放、旋轉）。  
   - 可定義手勢優先權與衝突解決規則。  
   - **可在 UI Thread 上運作手勢**，即使 **JavaScript Thread 忙碌** 也能流暢操作。  
     👉 這是因為**手勢處理過程同步運行於 UI Thread**，而不是依賴 JavaScript 進行異步計算，這樣即使 JS Thread 被其他繁重操作阻塞，UI Thread 仍能及時反應用戶的手勢。

4. **原生驅動的動畫更流暢：**  
   - 搭配 `react-native-reanimated` 等工具，讓動畫運行在原生層。  
   - 減少對 JS Thread 的依賴，優化體驗。