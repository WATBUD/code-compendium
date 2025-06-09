# TypeScript `interface` vs `type` 都是用來定義類型
- **`interface`**：適合用於物件導向設計，支援 `extends` 和 `implements`，適合定義清晰的物件結構。
- **`type`**：適合用於複雜的類型操作，如聯合類型、交叉類型等，但不支援 `extends` 和 `implements`。

## 1. `interface` vs `type`差異
- **聲明合併（declaration merging）** :type 無法合併，會報錯
- **複雜類型 (Complex Types)** :interface 不能使用聯合類型
- **類型別名 (Type Aliases)**：type 可以為物件結構外其他任何類型（如基本類型、聯合類型、元組等）創建類型別名。
- **結構性類型（Structural Typing）**
- **性能（Performance）**
- **類型的繼承、實現以及組合**
- **泛型（Generics）和映射型別（Mapped Types）**:interface 本身不直接支持映射型別的語法

### 1.聲明合併（declaration merging）：
```typescript
// interface 會合併
interface Person {
  name: string;
}

interface Person {
  age: number;
}

const person1: Person = { name: "John", age: 30 };

// type 無法合併，會報錯
type PersonType = {
  name: string;
};

// type PersonType = {
//   age: number; // 會報錯，因為 type 不能合併
// };
```

### 2. 複雜類型 (Complex Types)
```typescript
type 可以定義更複雜的類型，例如聯合類型、交叉類型等。
// type 可以使用聯合類型
type Status = 'success' | 'error';
const status1: Status = 'success'; // valid
const status2: Status = 'failure'; // error

// interface 不能使用聯合類型
// interface Status { 'success' | 'error' } // error
```

### 3. 類型別名 (Type Aliases)
type 可以為物件結構外其他任何類型（如基本類型、聯合類型、元組等）創建類型別名。
```typescript
// ✅ interface 主要用於描述「物件結構」，支援擴展與繼承
interface User {
  name: string;
  age: number;
}

// ✅ type 可以用來創建「任意類型」的別名，不局限於物件
type Age = number;                      // 基本類型別名
type SuccessResponse = { success: boolean }; // 物件類型別名
type StringOrNumber = string | number;   // 聯合類型
type Point = [number, number];           // 元組
```

### 4. 結構性類型（Structural Typing）
interface 和 type 都基於結構性類型：只要兩個物件具有相同的結構（屬性和方法），它們就可以互相兼容，即使它們的類型名稱不同。
interface 和 type 沒有名稱匹配的限制：不同類型名稱的兩個物件，只要它們的結構相同，依然是相容的

```typescript
  interface Point {
    x: number;
    y: number;
  }

  let point_1: Point = { x: 1, y: 2 }; // 正確，符合 Point 結構
  const point_2 = { c:9,x: 1, y: 2 ,s:4 };// 匹配 x: 1, y: 2 被推斷具有 Point 類型結構。
  //const point_2 = { c:9,x: "1", y: 2 ,s:4 }; // 跳錯 Type 'string' is not assignable to type 'number'
  point_1 = point_2; 
  
  type PointType = { x: number; y: number };
  let typePoint_1: PointType = { x: 1, y: 2 }; // 正確，符合 PointType 結構
  let typePoint_2 = { x: 1, y: 2 }; 
  
  point_1=typePoint_1;//匹配 point_1 被推斷具有 Point 類型結構。
  point_1=typePoint_2;//匹配 point_1 被推斷具有 Point 類型結構。

// type 可以處理聯合類型或字面量類型(Literal Types)（interface 無法做到）
type Status = "success" | "error";  // 字面量類型
type Response = { status: Status; message: string };
const successResponse: Response = { status: "success", message: "Operation succeeded" };
// interface 無
```

### 5. 性能（Performance）
interface 在 TypeScript 內部最佳化程度較高，處理時不需要展開型別，編譯速度較快。
type 在遇到 [交集] (&) 或 [聯合] (|) 時，TypeScript 需要計算[展開類型] (Type Expansion)，導致編譯速度變慢。
type 物件結構複雜、型別組合過多會導致更高[記憶體使用量]和[編譯時間]。

```javascript
type Nested<T> = { value: T } & Nested<T>; // 遞歸交集
// 錯誤：Type instantiation is excessively deep and possibly infinite.
```

### 6. 類型的[繼承/實現/組合]

- **`interface` 適合於物件導向設計類型定義**：
  - `extends` 用於繼承其他介面或類型。
  - `implements` 用於類別（class）實現介面。

- **`type`**：
  - 使用 `&`[交叉(Intersection)]來組合多個類型。
  - 使用 `|`[聯合(Union)]來定義多種類型的可能性。
  - 不支援 `extends` 和 `implements` 關鍵字，但可以通過交叉類型實現類似的功能。
  - 更適合用於複雜的類型操作，如聯合類型、條件類型等。

- **`interface` 的繼承與實現**
    ```typescript
    // 使用 extends 繼承
    interface Animal {
      name: string;
    }
    
    interface Dog extends Animal {
      breed: string;
    }
    
    // 使用 implements 實現
    class Labrador implements Dog {
      name: string;
      breed: string;
    
      constructor(name: string, breed: string) {
        this.name = name;
        this.breed = breed;
      }
    }
    ```

- **`type` 的組合**
```typescript
// 使用交叉類型組合
type Animal = {
  name: string;
};

type Dog = Animal & {
  breed: string;
};

// 使用聯合類型
fetchData 函數可能返回 string 類型的成功消息，也可能返回 Error 類型的錯誤對象。
function fetchData(): string | Error {
  // 假設這裡有一些邏輯來獲取數據
  if (Math.random() > 0.5) {
    return "Data fetched successfully";
  } else {
    return new Error("Failed to fetch data");
  }
}

const result = fetchData();

if (result instanceof Error) {
  console.error(result.message);
} else {
  console.log(result);
}

// 無法使用 implements
class Labrador implements Dog { // 錯誤：'Dog' 是一個類型別名，無法被實現
  name: string;
  breed: string;
}
```

### 7. 泛型（Generics）和映射型別（Mapped Types）**
✅ 映射型別（Mapped Types） 允許我們 基於現有型別批量修改屬性。
✅ 常見應用：
- 新增 [readonly、?] 修飾符
- 改變[屬性型別/過濾屬性]
- 使用 keyof 遍歷鍵名
```typescript
// 因為 type 支援型別運算，因此可以進行 映射型別轉換：
// [K in keyof T]：這是一種 映射類型（Mapped Type）
type User = {
  name: string;
  age: number;
};

type ReadonlyOptional<T> = {
  //[K in keyof T] 的 K 就是 User 類型的每個屬性名，分別為 name 和 age
  //T[K] 就是 User 類型中每個屬性對應的類型，分別是 string 和 number。
  //? 表示該屬性是可選的，你可以選擇是否設置該屬性。如果不設置，該屬性就是 undefined
  readonly [K in keyof T]?: T[K];
};
type ReadonlyOptionalUser = ReadonlyOptional<User>;
//這會展開為：
// type ReadonlyOptionalUser = {
//   readonly name?: string;
//   readonly age?: number;
// };
//實際運用：
const user1: ReadonlyOptionalUser = { name: "Alice" };
// `name` 是可選的，可以不設置
const user2: ReadonlyOptionalUser = { name: "Alice", age: 30 };

// 如果設置了 `name` 或 `age`，它們是 readonly 的，不能再修改
user1.name = "Bob";  // Error: Cannot assign to 'name' because it is a read-only property.
```

