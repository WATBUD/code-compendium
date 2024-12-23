

# ---------------------- SELECT * FROM Orders WHERE OrderName = 'Widget A';

# 無索引情況：
資料庫必須從頭到尾逐行掃描整個表，檢查每一行的 OrderName。
這樣的全表掃描（Full Table Scan）在資料量很大時會非常耗時，因為每一行都需要被讀取和比較。


# 有索引情況：
- CREATE NONCLUSTERED INDEX IX_Orders_OrderName ON Orders(OrderName);
資料庫使用非叢集索引的B+樹來查找 OrderName = 'Widget A' 的位置。
B+樹結構允許資料庫快速導航到目標索引鍵，而無需逐行掃描。
一旦找到 OrderName = 'Widget A' 的葉節點，資料庫會使用行定位器（Row Identifier）快速跳轉到實際資料行，檢索完整的訂單資料。

# 效率對比
無索引：
全表掃描（Full Table Scan）：
當查詢沒有索引的欄位時，資料庫必須逐行掃描整個表，檢查每一筆資料以確定是否符合查詢條件。
這意味著每次查詢都需要遍歷所有記錄，這在資料量大的情況下非常耗時。

# 有索引：
使用 B+ 樹或其他索引結構：
當你為某個欄位建立索引後，資料庫會使用 B+ 樹或其他高效的數據結構來維護這個索引。
查詢時，資料庫通過索引結構快速找到目標鍵值的位置，而不是逐行掃描。

# 簡化範例
假設有一個小表，僅有10筆資料：
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    OrderName NVARCHAR(100),
    OrderDate DATE
);

INSERT INTO Orders (OrderID, OrderName, OrderDate) VALUES
(1, 'Widget A', '2024-01-01'),
(2, 'Gadget B', '2024-01-02'),
(3, 'Widget C', '2024-01-03'),
-- ... (其他7筆資料)
(10, 'Widget A', '2024-01-10');

# 資料庫使用非叢集索引的B+樹：
根據B+樹快速導航到 Widget A 的位置。
找到第一個 Widget A，使用行定位器檢索資料。
繼續導航找到第二個 Widget A，檢索資料。

# 查詢: SELECT * FROM Orders WHERE OrderName = 'Widget A';

# 無索引的全表掃描：
- [Row 1] -> [Row 2] -> [Row 3] -> ... -> [Row 10]



# 有索引的B+樹查詢逐行掃描：
# 假設根節點限制 3 個鍵值 [Alice, Bob, Charlie]
# 插入 David 分裂過程中，Charlie 作為中間鍵(第⌊n/2⌋+1個鍵)被提升成為新的根節點：
        [Charlie]
       /         \
[Alice, Bob]   [David]

# 缺點:

1.增加儲存空間：索引需要儲存空間會顯著增加數據庫的大小。
2.每次插入、更新或刪除操作都需要更新相關索引，增加寫操作時間資源消耗。
[Root] -> [Internal Node(s)] -> [Leaf Node with Quantity = 5] -> [Row Locator]


         [M]
        /   \
     [G]    [T]
    / | \  / | \
[A-E][F-L][N-R][S-Z]

1. 根節點比較：
   - 目標鍵值：Alice
   - 比較：'A' (65) < 'M' (77)，進入左子樹

2. 內部節點比較：
   - 目標鍵值：Alice
   - 比較：'A' (65) < 'G' (71)，進入最左子樹

3. 葉節點查找：
   - 範圍：[A-E]
   - 找到：Alice


   