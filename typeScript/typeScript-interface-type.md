# TypeScript `interface` vs `type` 都是用來定義類型
- **`interface`**：適合用於物件導向設計，支援 `extends` 和 `implements`，適合定義清晰的物件結構。
- **`type`**：適合用於複雜的類型操作，如聯合類型、交叉類型等，但不支援 `extends` 和 `implements`。

## 1. `interface` vs `type`差異
- **1.聲明合併（declaration merging）**
- **複雜類型 (Complex Types)** 
- **類型別名 (Type Aliases)**
- **性能（Performance）**

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
interface 限制較少，但更適合用於定義物件結構。

// type 可以使用聯合類型
type Status = 'success' | 'error';
const status1: Status = 'success'; // valid
const status2: Status = 'failure'; // error

// interface 不能使用聯合類型
// interface Status { 'success' | 'error' } // error
```

### 3. 類型別名 (Type Aliases) 與字面量類型的區別
interface 描述物件結構，設計支持擴展和繼承。
type 定義物件類型，還可以為其他任何類型（如基本類型、聯合類型、元組等）創建類型別名。

```typescript
// interface 主要用於描述物件結構
interface User {
  name: string;
  age: number;
}

// type 可以用來為任何類型創建別名，包括基本類型
type Age = number;
type SuccessResponse = { success: boolean };
type StringOrNumber = string | number;
```

### 4. 結構化類型 vs 名稱類型
interface 會強調結構化類型，兩個物件如果有相同結構是兼容的，即使名稱不同。
type 更加靈活會進行名稱匹配，不會像 interface 那樣自動進行結構化兼容。
```typescript
// interface 用結構化類型
interface Point {
  x: number;
  y: number;
}

const p: Point = { x: 1, y: 2 };
const q = { x: 1, y: 2 }; // 也可以賦值給 Point，因為它們的結構相同

// type 進行名稱匹配
type PointType = { x: number; y: number };
const r: PointType = { x: 1, y: 2 };
const s = { x: 1, y: 2 }; // 必須是相同類型，否則報錯
```

### 5. 性能（Performance）
interface 在 TypeScript 內部的最佳化程度較高，適合物件的結構描述，處理時不需要展開型別，編譯速度較快。
type 支援聯合 (|)、交集 (&) 等操作，這些運算需要 TypeScript 先解析並展開類型，可能導致編譯速度變慢。
當物件結構複雜、型別組合過多時，type 可能會導致更高的記憶體使用量和編譯時間。
但 type 在某些場景（例如聯合型別或函式簽名）會比 interface 更靈活，因此應該根據實際需求選擇。

### 6. **語法特性與擴展能力的差異**

`interface` 和 `type` 在語法特性上有顯著差異，主要體現在類型的繼承、實現以及組合方式上：

- **`interface` 適合於物件導向設計類型定義**：
  - `extends` 用於繼承其他介面或類型。
  - `implements` 用於類別（class）實現介面。

- **`type`**：
  - 使用 `&`[交叉(Intersection)]來組合多個類型。
  - 使用 `|`[聯合(Union)]來定義多種類型的可能性。
  - 不支援 `extends` 和 `implements` 關鍵字，但可以通過交叉類型實現類似的功能。
  - 更適合用於複雜的類型操作，如聯合類型、條件類型等。

---

#### **`interface` 的繼承與實現**
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

#### **`type` 的組合與靈活性**
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

---


