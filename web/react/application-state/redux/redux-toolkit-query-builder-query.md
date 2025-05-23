
---

### ✅ RTK Query hook 的語法

當你定義一個 `builder.query` 的時候，它會自動產生一個 hook，例如：

```ts
getSettingInfo: builder.query({
  query: () => ({
    url: '/some-url',
    method: 'GET',
  }),
})
```

這會自動產生：

```ts
useGetSettingInfoQuery()
```

> **這個 hook 的第一個參數就是你給 `query(arg)` 函數傳的參數。**

---

### ❓為什麼你要傳 `undefined`？

因為你目前定義的 `query` 是這樣：

```ts
query: () => ({
  url: `${getT1T2basePath('T2')}/channel-partners/me`,
  method: 'GET',
}),
```

也就是說：**這個 `query` 不吃參數**。那麼在你呼叫 hook 的時候，你就要明確地傳：

```ts
useGetSettingInfoQuery(undefined, { skip: ..., refetchOnMountOrArgChange: ... })
```

不傳第一個參數也行，因為 JS 的預設就是 `undefined`，但當你想傳第二個參數（例如 `skip`）時，你**就必須明確給第一個參數為 `undefined`**。

否則會像你原來那樣錯傳：

```ts
useGetSettingInfoQuery({
  skip: ...,
  refetchOnMountOrArgChange: ...,
});
```

這會被當成 `arg` 傳給 `query`，而不是 `hook options`，所以會錯。

---

### ✅ TL;DR

| 用法                                                  | 說明                               |
| --------------------------------------------------- | -------------------------------- |
| `useGetSettingInfoQuery()`                          | 正常用法（不傳參數）                       |
| `useGetSettingInfoQuery(undefined, { skip: true })` | 正確寫法：略過查詢時必須這樣寫                  |
| `useGetSettingInfoQuery({ skip: true })`            | ❌ 錯誤：這會被當成 query 的參數，而不是 options |

---

如果你將來要讓這個 API 接受參數（例如 T1 或 T2），可以改成這樣：

```ts
query: (role) => ({
  url: `${getT1T2basePath(role)}/channel-partners/me`,
  method: 'GET',
})
```

那你就可以這樣用：

```ts
useGetSettingInfoQuery('T2', { skip: userRole.includes('T1') })
```

這時候第一個參數就不是 `undefined`，而是有意義的 `role`。

---

