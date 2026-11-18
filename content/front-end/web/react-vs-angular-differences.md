
# React 與 Angular 的主要差異

## 1. 庫 vs 框架
- **React**:  
  - 是一個 **UI 庫**，專注於視圖層（View Layer）。  
  - 輕量化，不包含完整的應用解決方案。  
  - 需要搭配第三方庫（如 React Router、Redux）來實現路由、狀態管理等功能。  

- **Angular**:  
- **開箱即用全功能框架**，提供全面的功能(內建路由、狀態管理、表單處理、依賴注入等功能) 框架應用開發解決方案。  

## 2. 數據綁定
- **React**:  
  - 強調 **單向數據流**，數據從父元件傳遞到子元件。  
  - 使用 `useState` 和 `props` 管理狀態，事件處理透過回調函數完成。  
  - 沒有內建雙向綁定，需要手動實現（如結合 `onChange` 和 `useEffect`）。  

- **Angular**:  
  - **雙向數據綁定**，透過 `[(ngModel)]` 實現。  
  - 雙向綁定簡化了表單處理，但可能引入更多的複雜性。

---

## 3. 語言和語法
- **React**:  
  - 使用 JavaScript（或 TypeScript）與 JSX（JavaScript XML）語法。  
  - JSX 將 HTML 和 JavaScript 混合在一起，元件實質上是函式或類。  

- **Angular**:  
  - 使用 TypeScript，提供強類型和靜態編譯語言。  
  - 模板語法（HTML 文件 + 數據綁定表達式）與元件邏輯分離，元件更像是 MVC 的控制器（Controller）。

## 4. 架構設計
- **React**:  
  - 以元件化設計為核心，基於 **函數式編程**。  
  - 高度靈活，開發者自行決定如何組織程式碼和功能。  
  - 沒有強制性的依賴注入機制。

- **Angular**:  
  - 基於 **模組化設計**，採用 MVC 或 MVVM 模式。  
  - 提供強制性的依賴注入（Dependency Injection, DI），用於管理服務與元件之間的關係。

---
| 框架 | 變更檢測機制 | 運作方式 | 優勢 | 劣勢 |
|------|------------|--------|------|------|
| **React** | **Virtual DOM** | `diffing` 演算法比較新舊虛擬 DOM | 更新最小範圍，效能高 | 記憶體開銷較大 |
| **Angular** | **Zone.js + Change Detection** | Zone.js 攔截非同步 API（事件、`setTimeout`、Promise、HTTP 等），在其完成後自動觸發變更檢測 | 原生支援雙向綁定，開發體驗好 | 預設會檢查整棵組件樹，可能影響效能 |


## 5. 性能優化
- **React Virtual DOM**:  
  - 基於虛擬 DOM（Virtual DOM）。  
  - React 使用 `diffing` 演算法比較虛擬 DOM 樹，僅更新需要變動的部分。  
  - 手動優化方法：`React.memo`、`useMemo`、`useCallback`。  

- **Angular [沒有] Virtual DOM**:  
  - 使用 **髒檢查機制（Dirty Checking）**。  
  - 借助 Zone.js 得知「何時」該執行變更檢測（非同步任務完成後），再逐一比對模板綁定值並更新視圖。Zone.js 本身並不監聽變數。  
  - 變更檢測方式用 `OnPush` 和 `TrackBy` 等技巧來手動優化效能。

### **1. Virtual DOM 的運作方式（React）只更新必要的 UI，減少不必要的 DOM 操作，提高效能。**
- **React 會先建立一個 Virtual DOM**，當狀態改變時，它會：
  1. **重新計算新的 Virtual DOM**。
  2. **對比舊的 Virtual DOM**（`diffing` 演算法）。
  3. **找出變更的部分，最小化 DOM 操作**。

### **2. Angular 的變更檢測（Change Detection）**
- 預設情況下，Angular 會 **遍歷整個組件樹** 來檢查變更，可能會影響效能。
- **Angular 使用 "Zone.js" 來 patch 非同步 API**（DOM 事件、`setTimeout`、Promise、XHR 等），它並不直接監測變數，而是在這些非同步任務結束後，會：
  1. **觸發變更檢測（Change Detection）**。
  2. **從根元件開始檢查整棵組件樹的模板綁定**，只更新值有變化的 DOM（可用 `OnPush` 跳過不需檢查的子樹）。

> 💡 新版 Angular（v16+）引入 **Signals**，可以精確知道哪些值改變；v18 起也提供實驗性的 **zoneless** 變更檢測（`provideExperimentalZonelessChangeDetection()`，v20 起改為 `provideZonelessChangeDetection()`），可不再依賴 Zone.js。

## **Angular 如何優化變更檢測？**
### **1. 使用 `OnPush` 更改檢測策略**
```typescript
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
  @Input() data: any;
}
```
**OnPush 元件只在以下情況才會被標記為需要檢查，減少不必要的計算：**
- `@Input` 的 **引用** 改變（物件內部被修改不算）。
- 元件本身或其子元件的模板中觸發了事件（如 `(click)`）。
- 模板中 `async` pipe 收到新值。
- 手動呼叫 `ChangeDetectorRef.markForCheck()`（或執行 `detectChanges()`）。
- 模板中讀取的 Signal 值改變（新版 Angular）。

### **2. 使用 `TrackBy` 減少 DOM 重新渲染**
在 `*ngFor` 迴圈中，Angular 預設以 **物件引用（identity）** 來比對新舊項目，引用相同的項目會重用 DOM。但若資料是重新取得的（例如 API 重新回傳、immutable 更新），每個項目都是新物件，Angular 就會銷毀並重建所有 DOM 節點。`trackBy` 讓 Angular 改用穩定的 ID 比對，即使物件引用改變也能重用 DOM。（新版的 `@for` 控制流程語法則強制要求寫 `track`。）
```html
<div *ngFor="let item of items; trackBy: trackByFn">
  {{ item.name }}
</div>
```
```typescript
trackByFn(index: number, item: any) {
  return item.id; // 以 id 識別項目，id 相同就重用 DOM
}
```

### **3. 使用 `detectChanges` 手動控制變更檢測**
```typescript
constructor(private cd: ChangeDetectorRef) {}

someMethod() {
  this.cd.detectChanges(); // 立即對當前元件及其子元件執行變更檢測
  // this.cd.markForCheck(); // 標記此元件及祖先為需檢查（OnPush 常用），等下一輪變更檢測時處理
}
```

## 6. 學習曲線
- **React**:  
  - 入門簡單，熟悉 JavaScript 後即可快速上手。  
  - 自由度高，但開發大型應用時需要學習和選擇第三方庫。  

- **Angular**:  
  - 學習曲線較陡，內含大量框架特性（依賴注入、RxJS、模板語法等）。  
  - 提供一致的開發體驗，適合開發複雜的大型應用。

---

## 7. 生態系統與社群
- **React**:  
  - 廣泛使用，擁有活躍的開源社群與豐富的第三方庫。  
  - 由 Facebook 支持並應用於其生產環境。  

- **Angular**:  
  - 由 Google 維護和支持，主要用於企業級專案。  
  - 官方提供強大的 CLI 和工具，但第三方生態相對較少。

---

## 總結對比表

| 特性              | React                      | Angular                   |
|-------------------|----------------------------|---------------------------|
| 類型              | 庫 (Library)              | 框架 (Framework)          |
| 數據綁定          | 單向數據流                | 雙向數據綁定               |
| 使用語言          | JavaScript + JSX          | TypeScript + 模板語法       |
| 性能優化機制      | 虛擬 DOM + 手動優化       | 髒檢查（變更檢測）+ OnPush / trackBy |
| 學習曲線          | 簡單（小專案）複雜（大專案）| 陡峭                     |
| 自由度            | 高，自由選擇工具和庫      | 低，官方一體化解決方案     |
| 應用場景          | 中小型專案，或元件驅動開發 | 企業級複雜應用             |

---

## 總結
React 的靈活性使其更適合中小型專案或注重元件化的應用，而 Angular 提供的全功能框架適合需要完整結構的企業級專案。選擇框架時應根據專案需求和團隊技術背景來決定。
