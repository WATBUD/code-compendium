````md
# 為什麼 React 不推薦使用 React.FC？  
# Why is React.FC discouraged?

---

## 📌 1. 自動添加 `children` 屬性  
## 📌 1. Implicit `children` prop added

### 🧨 壞處 (Disadvantages)

- 使用 `React.FC` 時，會自動將 `children` 屬性加入 component 的 props，即使你不需要。
- 這可能導致開發者在不該使用 `children` 的元件中誤傳內容。

```tsx
const Button: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick}>Click</button>
);

<Button onClick={handleClick}>Wrong usage</Button> // ✅ 合法，但其實不應該有 children
````

### ✅ 好處 (Advantages)

* 如果你本來就打算支援 `children`，這樣可以省略額外定義。
* 例如：

```tsx
const Card: React.FC = ({ children }) => <div>{children}</div>;

<Card>
  <p>Text inside card</p>
</Card>
```

### 🔍 小結 (Summary)

> TypeScript 的型別定義是為了「防呆」，而不是假設大家都不會犯錯。
> Type definitions are meant to be fail-safe, not reliant on perfect discipline.

---

## ❌ 2. 泛型支援不佳

## ❌ 2. Poor support for generics

React.FC 在泛型元件中處理不佳，常會破壞推導。

```tsx
// 使用 React.FC，TypeScript 推導失效
const MyComponent: React.FC<{ value: T }> = ({ value }) => <div>{value}</div>;

// 改為明確指定 props 泛型
type MyProps<T> = { value: T };
const MyComponent = <T,>({ value }: MyProps<T>) => <div>{value}</div>;
```

---

## ❌ 3. Default Props 與 Display Name 不再需要 React.FC

## ❌ 3. Default props and displayName don't require React.FC

以前 `React.FC` 是用來自動處理 `defaultProps` 和 `displayName`，但現在已不需要。

```tsx
function MyComponent({ title = "Default" }: { title?: string }) {
  return <h1>{title}</h1>;
}

MyComponent.displayName = "MyComponent";
```

---

## ❌ 4. 定義過度且限制多餘

## ❌ 4. Over-definition and unnecessary constraint

使用 `React.FC` 強迫你使用 `children` 和返回 `ReactElement`，反而失去彈性。

```tsx
const Component: React.FC = () => "hi"; // ❌ 錯誤，非 ReactElement
const Component = () => "hi"; // ✅ 合法，React 支援直接渲染 string
```

---

## ✅ 更推薦的寫法

## ✅ Preferred approach

```tsx
type Props = { onClick: () => void };
const Button = ({ onClick }: Props) => <button onClick={onClick}>Click</button>;
```

## 📚 延伸閱讀 (Further Reading)

* [React.FC vs function component - Kent C. Dodds](https://kentcdodds.com/blog/why-i-dont-use-react-fc)
* [TypeScript React.FC is bad - Reddit discussion](https://www.reddit.com/r/typescript/comments/nzsfcg/typescript_reactfc_is_bad/)
* [React TypeScript Cheatsheet - Do not use React.FC](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/)

