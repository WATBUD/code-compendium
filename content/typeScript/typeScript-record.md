---

## 📘 TypeScript `Record` 用法與好處

### 🧾 定義 Definition

> **`Record<Keys, Type>`** 是 TypeScript 提供的工具型別，用來快速建立一個物件型別，其鍵（key）來自一組固定集合，值（value）都是同一個型別。

**`Record<Keys, Type>`** is a TypeScript utility type that constructs an object type with a set of fixed keys, where each key maps to the same value type.

---

### 🧱 沒有 `Record` 的寫法 (傳統寫法 Without `Record`)

```ts
type LandingImageKeys = 'home' | 'about' | 'contact';

type LandingImages = {
  home: string;
  about: string;
  contact: string;
};
```

🟡 如果 key 增加或改動，要手動修改型別，很容易出錯。

🟡 If keys are added or changed, you have to manually update the type, which is error-prone.

---

### ✅ 使用 `Record` 的寫法 (With `Record`)

```ts
type LandingImageKeys = 'home' | 'about' | 'contact';
type ImageSource = string;

type LandingImages = Record<LandingImageKeys, ImageSource>;
```

🟢 改變 key 集合時，型別會自動更新，更容易維護。

🟢 When the key set changes, the type updates automatically — easier to maintain.

---

## 🎯 `Record` 的 3 大好處 / Top 3 Benefits of `Record`

| 好處 (Benefit)       | 中文說明               | English Description                              |
| ------------------ | ------------------ | ------------------------------------------------ |
| ✅ 簡潔 (Concise)     | 一行搞定整個型別           | Define complex object types in one line          |
| ✅ 自動同步 (Auto Sync) | key 改動時型別自動同步      | Auto-updates when keys change                    |
| ✅ 防錯 (Type Safety) | 少 key、多 key、錯字都會報錯 | Catches missing/extra/wrong keys at compile time |

---

## 🧪 實務範例 Practical Example

```ts
type LandingImageKeys = 'home' | 'about' | 'contact';
type ImageSource = string;

const landingImages: Record<LandingImageKeys, ImageSource> = {
  home: 'https://example.com/home.jpg',
  about: 'https://example.com/about.jpg',
  contact: 'https://example.com/contact.jpg',
  // 'faq': '...', ❌ TypeScript 會報錯，因為 'faq' 不是合法 key
};
```

🔍 若缺少某個 key 或多一個 key，TypeScript 會即時報錯，讓你提早修正錯誤。

🔍 TypeScript will throw errors if a key is missing or extra, helping you catch bugs early.

---

## 🧠 總結 Summary

> **`Record<K, T>` 可以讓你用一組 key 快速建立物件型別，並確保每個 key 都對應到相同型別的值。**

> **`Record<K, T>` helps you create object types with specific keys, ensuring each key maps to a consistent value type.**

---
