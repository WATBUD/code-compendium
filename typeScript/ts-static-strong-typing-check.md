TypeScript 開啟和未開啟 `strict` 模式在靜態類型檢查方面差異
### **沒有開啟 `strict` 模式時的靜態強類型檢查**

即使沒有開啟 `strict` 模式，TypeScript 還是會進行某些靜態強類型檢查（也就是基本的類型檢查），但會相對寬鬆，具體來說，這些檢查主要包括：

1. **參數數量檢查**  
   TypeScript 會檢查函數調用時傳遞的參數數量是否與函數聲明中的參數數量相符。這是基本的強類型檢查。

   **例子：**
   ```typescript
   function add(a: number, b: number): number {
     return a + b;
   }

   add(1, 2);  // 正常
   add(1);  // 錯誤：缺少參數
   ```

2. **基本類型不匹配檢查**  
   TypeScript 會檢查變數賦值是否匹配其聲明的類型。例如，將 `string` 類型賦值給 `number` 類型的變數會報錯。

   **例子：**
   ```typescript
   let name: string = "Alice";
   name = 42;  // 錯誤：不能將 `number` 賦值給 `string`
   ```

3. **函數返回類型檢查**  
   TypeScript 會檢查函數的返回類型是否符合聲明的返回類型。如果返回類型不匹配，會報錯。

   **例子：**
   ```typescript
   function multiply(a: number, b: number): number {
     return a * b;  // 正常
   }

   function greet(): string {
     return 123;  // 錯誤：返回值類型不符合 `string`
   }
   ```

4. **類型兼容性檢查（結構型類型系統）**  
   TypeScript 使用結構型類型系統，即不強制要求類型完全相等，只要結構兼容即可。因此，當一個對象的結構符合目標類型時，它可以被賦值。

   **例子：**
   ```typescript
   interface Person {
     name: string;
   }

   const person: Person = { name: "Alice" };  // 沒有錯誤
   const anotherPerson: Person = { name: "Bob", age: 25 };  // 沒有錯誤，`age` 屬性被忽略
   ```

5. **數組元素的類型檢查**  
   TypeScript 會檢查數組的元素類型，確保數組元素符合聲明的類型。

   **例子：**
   ```typescript
   let nums: number[] = [1, 2, 3];
   nums.push(4);  // 正常
   nums.push("hello");  // 錯誤：不能將 `string` 推入 `number[]` 陣列
   ```

6. **`null` 和 `undefined` 的賦值檢查**  
   如果沒有啟用 `strictNullChecks`，`null` 和 `undefined` 可以賦值給任何類型的變數。在沒有啟用 `strictNullChecks` 時，`null` 和 `undefined` 不會引發錯誤。

   **例子：**
   ```typescript
   let name: string = "Alice";
   name = null;  // 錯誤會被跳過，因為沒有啟用 `strictNullChecks`
   ```

7. **類型轉換的兼容性檢查**  
   TypeScript 會檢查類型轉換是否是有效的。即使 `strict` 模式沒有啟用，無效的類型轉換仍會被標記為錯誤。

   **例子：**
   ```typescript
   let value: any = "Hello";
   let str: string = value as string;  // 正常，類型轉換有效
   let num: number = value as number;  // 錯誤：無法將 `string` 轉換為 `number`
   ```

### **總結**

即使在 **未開啟 `strict` 模式** 時，TypeScript 仍然會進行以下幾項靜態強類型檢查：

1. 函數的參數數量檢查
2. 基本類型不匹配檢查
3. 函數返回值類型檢查
4. 類型兼容性檢查（結構型類型系統）
5. 數組元素的類型檢查
6. `null` 和 `undefined` 的賦值檢查（如果未開啟 `strictNullChecks`）
7. 類型轉換的兼容性檢查

這些檢查確保了基本的類型安全，但相較於開啟 `strict` 模式，沒有啟用 `strict` 模式會放寬對某些情況的檢查，像是 `null` 和 `undefined` 的處理，以及部分類型推斷的容忍度較高。