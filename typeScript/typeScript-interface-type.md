# TypeScript `interface` vs `type` 都是用來定義類型的工具

## 1. 擴展能力 (Extending / Merging)
- **interface** 支援結構擴展，並且可以被多次聲明合併。
- **type** 不能合併重複的定義。
- **使用 interface**：主要處理物件結構，並且需要擴展、合併功能時。
- **使用 type**：需要更多的靈活性，並且處理複雜類型（如聯合類型、交叉類型）或為基本類型創建別名時。

### 範例：

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
interface 主要用來描述物件的結構，並且被設計來支持擴展和繼承。
type 不僅可以用來定義物件類型，還可以為其他任何類型（如基本類型、聯合類型、元組等）創建類型別名。

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

### 4. 泛型的不同表達方式
interface 和 type 都可以用於定義泛型，但 interface 在表達泛型時有些特定的語法和慣用法。
```typescript
// interface 泛型定義
interface Box<T> {
  value: T;
}

const box1: Box<number> = { value: 42 };

// type 泛型定義
type BoxType<T> = {
  value: T;
};

const box2: BoxType<string> = { value: 'Hello' };
```


### 5. 結構化類型 vs 名稱類型
interface 會強調結構化類型，也就是說，兩個物件如果有相同結構，它們是兼容的，即使它們的名稱不同。
type 更加靈活，會進行名稱匹配，不會像 interface 那樣自動進行結構化兼容。
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

### 6. 性能（Performance）
TypeScript 中interface 在編譯時性能上略優於 type，特別是在有大量類型操作的情況下。
因為 interface 是專門描述物件結構的。

### 7. 支援的語法特性
interface 支援 extends 和 implements 關鍵字，用於類型的繼承和實現。
type 使用 &（交叉類型）和 |（聯合類型）來進行類型組合，但它不支援 extends 和 implements 關鍵字。

```typescript
// interface 可以繼承另一個 interface
interface A {
  name: string;
}

interface B extends A {
  age: number;
}

const obj: B = { name: "John", age: 30 };

// type 不能使用 extends，但可以使用交叉類型
type AType = { name: string };
type BType = AType & { age: number };

const obj2: BType = { name: "John", age: 30 };
```



