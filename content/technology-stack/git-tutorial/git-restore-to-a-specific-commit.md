# Git 命令教程：查看歷史和恢復到特定提交
# Git Command Tutorial: Viewing History and Restoring to a Specific Commit

---

在 Git 中，您可能需要查看分支的歷史記錄或將工作目錄恢復到特定的提交。本指南將向您展示如何使用 Git 命令來查看參考日誌並切換到特定的提交。

In Git, you might need to view the history of a branch or restore your working directory to a specific commit. This guide will show you how to use Git commands to view reference logs and switch to a specific commit.

---

## 1. 查看當前分支的操作歷史
## 1. View the Current Branch's Operation History

要查看當前分支的操作歷史，請使用 `git reflog` 命令。reflog 記錄了對 HEAD 和分支引用的所有更改，包括提交、合併和重置。

To view the operation history of the current branch, use the `git reflog` command. The reflog records all changes to the HEAD and branch references, including commits, merges, and resets.

```bash
git reflog --date=iso
```

---

## 2. 查看特定分支的操作歷史
## 2. View a Specific Branch's Operation History

```bash
git reflog show feature/folder_API_louis --date=iso
```

---

## 3. 切換到特定提交
## 3. Switch to a Specific Commit

```bash
git checkout beaab92
```

---

## 4. 從特定提交創建新分支
## 4. Create a New Branch from a Specific Commit

```bash
git checkout -b 20241031
```

---

### 💡 提示 | Tips

- 使用 `--date=iso` 參數可以顯示 ISO 格式的時間戳，便於閱讀
- 切換到特定提交會使您進入"分離 HEAD"狀態
- 創建新分支是保存工作的好方法，避免丟失更改

- Using `--date=iso` parameter displays timestamps in ISO format for better readability
- Switching to a specific commit puts you in a "detached HEAD" state  
- Creating a new branch is a good way to save your work and avoid losing changes