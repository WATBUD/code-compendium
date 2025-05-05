
### ✅ 使用 Zustand 撈取多個 state 屬性時差異：

```ts
const { a, b } = useStore((state) => ({ a: state.a, b: state.b }));
```

這段程式碼是：從 store 裡撈出 `a` 和 `b`，並組成一個新物件 `{ a, b }`。但 **每次這個 selector function 被呼叫時，這個新物件的記憶體位址都會不同**，即使 `a` 和 `b` 沒變。

---

### ✅ 回答你的問題：「A 改成 7，B 改成 8，也會 re-render 嗎？」

會的。這種情況其實是合理的「需要 re-render」，因為你有更新 `a` 和 `b` 的值。即使是這種 selector：

```ts
const { a, b } = useStore((state) => ({ a: state.a, b: state.b }));
```

Zustand 在比較前後 selector 回傳的物件時，**會發現 reference 改變了**（即便值一樣也會 re-render），但在你實際改了 `a` 和 `b` 的值的情況下，re-render 是合理的。

---

### ❌ 問題是在：「a 和 b 沒變，但仍然 re-render」

這時才是你要擔心的效能問題，因為物件 reference 改變了，但內容沒變 → 造成 **不必要的 re-render**。

---

### ✅ 解法（避免不必要的 re-render）：Zustand 會 [shallow comparison] `a` 和 `b` 的值，只有當它們實際變動時才會 re-render。
Zustand 會對比 `a` 和 `b` 的實際值變化，而非整個 `{ a, b }` 物件的記憶體位置。只有當 `a` 或 `b` 的值**真的改變**時，才會觸發 re-render。

`useShallow` 和 `shallow` 在 Zustand 是 **兩個不同的用途**，但都是為了減少不必要的 re-render。以下幫你清楚區分：

---

## ✅ 1. `shallow`（比較 function）

```ts
import { shallow } from 'zustand/shallow';

const { a, b } = useStore(
  (state) => ({ a: state.a, b: state.b }),
  shallow
);
```

### 用途：

這是 **用來當作第二參數** 傳給 `useStore` 的 **比較 function**，Zustand 會拿它來比較 selector 回傳的物件 **是不是等價的**。

### 功能：

* 幫你淺比較 object 的每個 key-value 值（不是 reference 比較）。
* 如果 `a` 和 `b` 都沒變，就不 re-render！

---

## ✅ 2. `useShallow`（一個 helper hook）

```ts
import { useShallow } from 'zustand/react/shallow';

const state = useStore(useShallow((state) => ({ a: state.a, b: state.b })));
```

### 用途：

* 是一個**包裝過 selector 的 helper hook**，作用同樣是用 `shallow` 做比較。
* 給你更簡潔的語法（免手動加 `shallow` 當第二參數）。

### 但注意：

* 它只能用在 Zustand v4.3+。
* 語意稍微不一樣：你傳進去的 function 是經過包裝的 selector。

---

## 🆚 差異比較

| 比較項目           | `shallow`                | `useShallow`                |
| -------------- | ------------------------ | --------------------------- |
| 是什麼？           | 比較 function              | Selector 包裝 helper          |
| 傳給哪裡？          | `useStore(..., shallow)` | `useStore(useShallow(...))` |
| 需要 Zustand 幾版？ | v3 以上可用                  | v4.3+ 才有                    |
| 推薦哪個？          | 通用性高                     | 簡潔但需新版                      |

---

### ✅ 建議用法（通用）：

```ts
const { a, b } = useStore((state) => ({ a: state.a, b: state.b }), shallow);
```

這樣寫最穩定也最清楚。

---