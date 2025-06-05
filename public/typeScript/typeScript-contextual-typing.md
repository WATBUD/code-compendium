# TypeScript Contextual Typing 教學：為什麼 inline 傳 props 不會報錯？

## 👶 教學目的

當你在 JSX 中直接傳入物件時，TypeScript 能更準確地推論型別（例如 tuple）。  
但如果你先把資料存到變數中再傳入，TypeScript 就無法幫你推得那麼精確，可能導致型別錯誤。


## ✅ 元件定義

```tsx
type Props = {
  point: [number, number]; // 必須是 tuple，不能是 number[]
};

const PointDisplay = ({ point }: Props) => {
  return <div>{`X: ${point[0]}, Y: ${point[1]}`}</div>;
};
````

---

## ✅ 範例 1：直接 inline 傳值（不會報錯）

```tsx
const App = () => {
  return <PointDisplay point={[10, 20]} />; // ✅ OK
};
```

這裡 TypeScript 會根據 `Props` 自動推論 `[10, 20]` 是 `[number, number]`。

---

## ❌ 範例 2：先存成變數（會報錯）

```tsx
const App = () => {
  const pt = [10, 20]; // ❌ 推論為 number[]
  return <PointDisplay point={pt} />; // ❌ 報錯：number[] 不符合 [number, number]
};
```

TypeScript 無法知道你想要的是 tuple，所以預設推成 `number[]`。

---

## ✅ 解法 A：使用型別斷言

```tsx
const pt = [10, 20] as [number, number];
```

---

## ✅ 解法 B：直接指定型別

```tsx
const pt: [number, number] = [10, 20];
```

---

## 📌 小結

> JSX 中直接寫值，TypeScript 能根據元件的型別自動推成更精確的型別。
> 但自己先定變數，就要自己指定正確型別，否則容易發生型別不符的錯誤。

---

## 🧠 延伸學習

* [TypeScript Handbook - Contextual Typing](https://www.typescriptlang.org/docs/handbook/type-inference.html#contextual-typing)

```

---

