### 1. **FROM**  
   - **作用**：指定資料來源（表格、視圖、聯結等）。  
   - **Role**: Specifies the data source (tables, views, joins, etc.).  
   - 這是查詢執行的第一步，決定從哪個資料來源擷取資料。  
   - This is the first step in the query execution, determining from which source to retrieve the data.

---

### 2. **ON**  
   - **作用**：在聯結操作時指定聯結條件。  
   - **Role**: Specifies the join condition when joining multiple tables.  
   - 當查詢涉及聯結多個表格時，這個子句決定如何匹配來自不同表格的資料列。  
   - This clause is used in join operations to determine how rows from different tables will be matched.

---

### 3. **JOIN**  
   - **作用**：聯結多個表格，並依據指定的條件返回符合條件的資料列。  
   - **Role**: Joins multiple tables and returns rows based on the specified condition.  
   - 這個操作決定了來自不同表格的資料如何合併。  
   - This operation determines how the data from different tables will be combined.

---

### 4. **WHERE**  
   - **作用**：篩選符合條件的資料列。  
   - **Role**: Filters rows based on the specified condition.  
   - 篩選資料是查詢執行中非常關鍵的一步，決定哪些資料列會被包含在結果中。  
   - Filtering data is a crucial step in query execution, deciding which rows will be included in the result.

---

### 5. **GROUP BY**  
   - **作用**：將資料依照指定的欄位進行分組。  
   - **Role**: Groups rows based on specified columns.  
   - 當進行聚合計算（例如 `COUNT`、`SUM`、`AVG` 等）時，這個子句非常重要。  
   - This clause is important when performing aggregate calculations (like `COUNT`, `SUM`, `AVG`, etc.).

---

### 6. **HAVING**  
   - **作用**：在 `GROUP BY` 之後篩選分組後的資料。  
   - **Role**: Filters grouped data after the `GROUP BY` operation.  
   - 它類似於 `WHERE`，但 `WHERE` 篩選的是原始資料列，而 `HAVING` 篩選的是分組後的資料。  
   - It is similar to `WHERE`, but `WHERE` filters raw rows, while `HAVING` filters grouped data.

---

### 7. **SELECT**  
   - **作用**：指定查詢回傳的欄位或表達式。  
   - **Role**: Specifies the columns or expressions to be returned in the result set.  
   - 這一步決定了最終回傳的欄位，但它是在資料來源（表格）、聯結、篩選及分組之後才會執行。  
   - This step determines which columns will appear in the final result, but it is executed after the data has been filtered and grouped.

---

### 8. **DISTINCT**  
   - **作用**：去除重複的資料列。  
   - **Role**: Removes duplicate rows from the result set.  
   - 如果你只希望回傳唯一的資料，使用 `DISTINCT` 可以去除重複的資料列。  
   - If you only want to return unique records, `DISTINCT` removes duplicates.

---

### 9. **ORDER BY**  
   - **作用**：對結果集進行排序。  
   - **Role**: Sorts the result set.  
   - 這一步是對最終回傳的結果進行排序。  
   - This step orders the rows in the final result.

---

### 10. **LIMIT / OFFSET**  
    - **作用**：限制回傳的資料列數量。  
    - **Role**: Limits the number of rows returned.  
    - 透過 `LIMIT` 或 `OFFSET` 可以限制查詢回傳多少資料列，通常用於分頁。  
    - With `LIMIT` or `OFFSET`, you can restrict the number of rows returned, often used for pagination.

---

### SQL Execution Order Diagram:
```
1. FROM -> 2. JOIN -> 3. ON -> 4. WHERE -> 5. GROUP BY -> 6. HAVING -> 7. SELECT -> 8. DISTINCT -> 9. ORDER BY -> 10. LIMIT/OFFSET
```

---

### Example Query:

```sql
SELECT DISTINCT column1, SUM(column2)
FROM table1
JOIN table2 ON table1.id = table2.id
WHERE column1 > 10
GROUP BY column1
HAVING SUM(column2) > 50
ORDER BY column1 DESC
LIMIT 5;
```

