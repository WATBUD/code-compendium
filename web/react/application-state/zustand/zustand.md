
### ✅ 正確理解 `useShallow` 與 Zustand 的差異：

當你使用 Zustand 撈取多個 state 屬性時，例如：

```ts
const { a, b } = useStore((state) => ({ a: state.a, b: state.b }));
```

這裡 `useStore` 的 selector 回傳了一個新物件 `{ a, b }`。**每次 render 時這個物件都會是新的記憶體位址**，即使 `a` 和 `b` 的值根本沒變，Zustand 還是會認為它改變了，導致 component 被 re-render。

👉 這是因為 **Zustand 預設比較的是整個 object 的 reference**，而不是裡面每個屬性的值。

---

### 💡 解法：使用 `useShallow`

為了解決這個問題，可以搭配 `useShallow` comparator：

```ts
import { useShallow } from 'zustand/react/shallow';

const { a, b } = useStore(
  useShallow((state) => ({
    a: state.a,
    b: state.b,
  }))
);
```

這樣寫的效果是：Zustand 會對比 `a` 和 `b` 的實際值變化，而非整個 `{ a, b }` 物件的記憶體位置。只有當 `a` 或 `b` 的值**真的改變**時，才會觸發 re-render。

✅ `useShallow` 內部做的是類似：

```ts
(prev, next) => prev.a === next.a && prev.b === next.b
```

---

### 🧠 重點整理

| 特性   | 不使用 `useShallow`      | 使用 `useShallow`               |
| ---- | --------------------- | ----------------------------- |
| 比較方式 | 比較整個 `{ a, b }` 的物件引用 | 比較 `a` 和 `b` 各自的值             |
| 結果   | 每次都 re-render         | 僅當 `a` 或 `b` 的值有變化才 re-render |
| 適用場景 | 單一屬性                  | 多個屬性、需避免不必要的 re-render        |

---

需要我提供一個範例專案或 CodeSandbox 讓你觀察 log 差異嗎？
