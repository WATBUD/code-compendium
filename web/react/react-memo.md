### **Q: React.memo 是什麼，何時不該用？**

#### **React.memo 是什麼？**
`React.memo` 是一個 **高階元件（Higher-Order Component, HOC）**，用於優化函式型元件（Functional Component）的渲染效能。它會記住（memoize）元件的渲染結果，並在下次渲染時，如果 **props 沒有變化**，則直接返回上次的渲染結果，避免不必要的重新渲染。
`React.memo` 適用於優化不常變更的組件，但不適用於會頻繁更新 props 的情況

#### **React.memo 的工作原理**

  - 預設情況下，`React.memo` 會對 props 進行 **淺比較（Shallow Comparison）**，而不是**進行 deep comparison（深度比較）** 淺比較也就是比較 props 物件的 **記憶體位置（reference）**。 

  - 如果 props 的記憶體位置沒有變化，則跳過重新渲染。
  - 例如：
    ```javascript
    const MyComponent = React.memo((props) => {
        return <div>{props.value}</div>;
    });
    ```
    
- **React.memo 提供了一個可選的 自定義比較函式（Custom Compare Function）**：
  - 如果需要更精確的控制，可以傳入一個自定義的比較函式作為第二個參數。
  - 例如：
    ```javascript
    const areEqual = (prevProps, nextProps) => {
          // 返回 true 表示 props 相同，跳過重新渲染
          // 返回 false 表示 props 不同，觸發重新渲染
          return prevProps.value === nextProps.value;
    };

    const MyComponent = React.memo((props) => {
        return <div>{props.value}</div>;
    }, areEqual);
    ```

#### **何時不該用 React.memo？**
1. **props 經常變化**：
   - 如果子元件的某個 props 在每次父元件重新渲染時都會變化（例如傳遞一個新的物件或函式），則 `React.memo` 無法發揮作用，因為每次 props 的記憶體位置都會不同。
   - 例如：
     ```javascript
     <MyComponent value={{ key: 'value' }} />
     ```
     每次渲染時，`value` 都會是一個新的物件，`React.memo` 的淺比較會失效。

2. **props 比較成本高**：
   - React.memo 預設是 shallow comparison，但自訂 areEqual 之後，React 只會依賴 areEqual 來決定是否重新渲染。
     # 沒有 areEqual 時行為:
     React 只會比較 prevProps 和 nextProps 的記憶體參考（shallow comparison）。
     如果 prevProps !== nextProps（即使內部值相同），就會重新渲染。
     # 有 areEqual 時行為:
     React 會完全依賴 areEqual(prevProps, nextProps) 的回傳值：
     回傳 true → 不重新渲染
     回傳 false → 重新渲染
     React 會略過預設的 shallow comparison，不會額外幫你做比較。
     ```javascript
     const areEqual = (prevProps, nextProps) => {
         return JSON.stringify(prevProps) === JSON.stringify(nextProps);
     };

    const MyComponent = React.memo((props) => {
        return <div>{props.value}</div>;
    }, areEqual);
     ```
     這種深度比較的成本很高，可能會抵消 `React.memo` 帶來的效能優勢。

3. **元件本身很輕量**：
   - 如果元件本身非常簡單，重新渲染的成本很低，則使用 `React.memo` 可能會帶來額外的記憶體開銷（記住上次的 props 和渲染結果），反而得不償失。

#### **面試官回饋與回應**
- **面試官的回饋**：
  - 面試官提到「執行效率會比較低，因為還要跟前次的 props 進行比較」，這部分不完全正確。
  
- **你的回應**：
  - 「React 預設是進行 shallow-compare 而不是 deep-compare
  - 「只比較一次外層 props 物件的 reference 基本上執行效率可以忽略」
  - 可以補充說明：只有在使用自定義比較函式且比較邏輯複雜時，才會有明顯的效能問題。

#### **改進後的回答**
`React.memo` 是一個用於優化函式型元件渲染效能的工具，它會記住元件的渲染結果，並在 props 沒有變化時跳過重新渲染。預設情況下，`React.memo` 使用 **淺比較**，只比較 props 的記憶體位置，因此執行效率非常高。

然而，以下情況不適合使用 `React.memo`：
1. **props 經常變化**：如果 props 在每次渲染時都會變化（例如傳遞新的物件或函式），則 `React.memo` 無法發揮作用。
2. **props 比較成本高**：如果使用自定義比較函式且比較邏輯複雜，可能會導致效能問題。
3. **元件本身很輕量**：如果元件重新渲染的成本很低，使用 `React.memo` 可能會帶來額外的記憶體開銷。