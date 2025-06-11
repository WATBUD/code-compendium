
---

## 🔍 Compare Merge Commit Differences (比較合併提交的異動)

### ✅ **Compare two parents of a merge commit**

👉 To find all changed files between two parent commits (before the merge):

```bash
git diff --name-only <parent1_commit_hash> <parent2_commit_hash>
```

📌 Example:

```bash
git diff --name-only 639874fb5f 036f8d22a6
```

**說明：**
用於比較兩個父提交之間的所有異動檔案，適用於查看合併前分支的差異。

---

### ✅ **View changes introduced by the merge itself**

👉 To inspect only the changes introduced during the merge process:

```bash
git diff --name-only <merge_commit>^1 <merge_commit>^2
```

📌 Example:

```bash
git diff --name-only cb86824238bf7c2e818ef43a3733e65f88bf8682^1 cb86824238bf7c2e818ef43a3733e65f88bf8682^2
```

**說明：**
這個指令用於比較合併提交的兩個父提交，幫助你了解合併過程中實際引入的變更。

---

### 📝 備註 / Notes

* `^1` 代表第一個父提交（通常是主分支）
* `^2` 代表第二個父提交（通常是被合併的分支）
* 若要檢查合併本身與其父提交之間的異動，可以用：

  ```bash
  git show --name-only <merge_commit>
  ```

---

