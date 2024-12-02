If I only have the frontend without backend server support, what methods can I use to store data on the client side?


LocalStorage 和 SessionStorage: 這兩個都是瀏覽器提供的本地存儲方案，可以在用戶的瀏覽器中永久（LocalStorage）或是在會話期間（SessionStorage）保存資料。但是請注意，它們都有一定的大小限制（通常為 5 MB），且僅支援簡單的鍵值對形式的資料。

Cookies: Cookies 可以存儲小量的資料，並且在用戶的請求中自動發送到伺服器。它們可以通過 JavaScript 設置和讀取，但有大小限制（通常為 4 KB）和安全性問題。

IndexedDB: IndexedDB 是一個在瀏覽器中存儲大量結構化資料的 API。它提供了一個非同步的、事務型的資料庫系統，可以在用戶的計算機上持久保存資料。IndexedDB 是一個強大的客戶端存儲方案，但較複雜且不那麼直觀。