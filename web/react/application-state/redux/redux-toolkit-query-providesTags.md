`providesTags` 是 **RTK Query（Redux Toolkit Query）** 中的一個重要功能，用於實現 **快取管理（cache management）與自動重新請求（refetch）**。

---

### 📌 它的作用是什麼？

`providesTags` 告訴 RTK Query：

> 「這個 query 提供了哪些 tag，這樣當其他 mutation `invalidatesTags` 這些 tag 時，RTK Query 就會知道該重新 fetch 這個 query。」

---

### 🔄 常見用途範例：

```ts
// 假設你有一個 API 查詢帳戶資料
getAccounts: builder.query<Account[], void>({
  query: () => '/accounts',
  providesTags: ['Account'], // 告訴 RTK Query：這個 query 提供 'Account' 的資料
})
```

然後你有一個 mutation 可以新增帳戶：

```ts
createAccount: builder.mutation<Account, NewAccount>({
  query: (newAccount) => ({
    url: '/accounts',
    method: 'POST',
    body: newAccount,
  }),
  invalidatesTags: ['Account'], // 當執行這個 mutation 後，會標記 'Account' 這個 tag 為失效
})
```

這樣做的效果是：
✅ RTK Query 會自動重新執行 `getAccounts`，因為它的快取被 `createAccount` 的 `invalidatesTags` 失效了。

---

### 🧠 額外補充：動態 `providesTags`

你也可以根據回傳的資料動態生成 tag：

```ts
getPost: builder.query<Post, number>({
  query: (id) => `/post/${id}`,
  providesTags: (result, error, id) => [{ type: 'Post', id }],
})
```

對應的 mutation：

```ts
updatePost: builder.mutation<Post, Post>({
  query: (post) => ({
    url: `/post/${post.id}`,
    method: 'PUT',
    body: post,
  }),
  invalidatesTags: (result, error, post) => [{ type: 'Post', id: post.id }],
})
```

---

### ✅ 總結

| 名稱                | 功能說明                                      |
| ----------------- | ----------------------------------------- |
| `providesTags`    | 指出此 query 提供哪些 tag，方便快取追蹤與重新請求            |
| `invalidatesTags` | 指出此 mutation 執行後會失效哪些 tag，讓相關 query 被自動刷新 |

這是 RTK Query 的 **自動快取失效機制（auto cache invalidation）** 的關鍵組件。
