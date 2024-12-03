- If I only have the frontend without backend server support, 
- what methods can I use to store data on the client side?

# LocalStorage 和 SessionStorage: 瀏覽器提供的本地存儲方案，大小限制（通常為 5 MB），僅支援簡單的鍵值對形式的資料
在用戶的瀏覽器中永久（LocalStorage）或是在會話期間（SessionStorage）保存資料。

# Cookies: 存儲小量的資料，用戶請求中自動發送到伺服器。
可以通過 JavaScript 設置和讀取，但有大小限制（通常為 4 KB）和安全性問題。

# IndexedDB: 瀏覽器中存儲大量結構化資料的 API
提供一個非同步、事務型的資料庫系統，在用戶計算機上持久保存資料。

# localStorage：用來保存「長期需要的資料」，即使關掉瀏覽器再開啟，資料還會保留。適合儲存像是用戶設定或登入狀態等。

# sessionStorage：用來保存「短期需要的資料」，重新整理網頁資料還在，但關閉該瀏覽器分頁後，資料會消失。適合用於臨時的工作資料。

# 全域變數：用來在同一個頁面或應用程式內，共享資料。資料只在這個頁面有效，關閉頁面後就不再存在。

# Cookie：儲存小量資料，通常用於伺服器端的認證或追蹤用途。但不要隨便存敏感資訊，因為安全性相對較低。