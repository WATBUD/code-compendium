以下是使用 Redux Toolkit Query（RTK Query）建立的 **3 個常見 API 範例**，包含：

1. 取得用戶列表（`getUsers`）
2. 新增用戶（`createUser`）
3. 刪除用戶（`deleteUser`）

這些 API 會搭配 `providesTags` 與 `invalidatesTags` 來實現自動快取失效與重新載入資料。

---

## 🧩 1. 建立 API Slice

```ts
// services/userApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User'], // ⭐️ 定義可使用的快取標籤
  endpoints: (builder) => ({
```

---

## 📘 API 1：取得用戶列表

```ts
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['User'], // ⭐️ 表示這個 query 提供了 'User' 資料
    }),
```

---

## 📗 API 2：新增用戶

```ts
    createUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'], // ⭐️ 執行後讓 getUsers 快取失效，自動 refetch
    }),
```

---

## 📕 API 3：刪除用戶

```ts
    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'], // ⭐️ 同樣讓 getUsers 被自動重新抓取
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} = userApi;
```

---

## 🧪 使用範例（React 元件中）

```tsx
import React from 'react';
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} from './services/userApi';

const UserList = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => createUser({ name: 'New User' })}>新增用戶</button>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => deleteUser(user.id)}>刪除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

---

