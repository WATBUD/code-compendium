# Git 修改提交訊息指南 / Git Commit Message Editing Guide

## 方法一：編輯最近的提交訊息 / Method 1: Edit the Most Recent Commit Message

```bash
# 使用 --amend 來編輯最近的提交訊息
# Use --amend to edit the most recent commit message
git commit --amend -m "更新的提交訊息 / Updated commit message"
```

## 方法二：編輯較舊的提交訊息 / Method 2: Edit an Older Commit Message

```bash
# 對最近 3 個提交開始互動式變基
# Start an interactive rebase for the last 3 commits
git rebase -i HEAD~3
```

在互動式編輯器中，你會看到類似以下內容：
In the interactive editor, you'll see something like this:

```
pick abc1234 某個提交訊息 / Some commit message
reword def5678 你想要編輯的提交訊息 / The commit message you want to edit
pick 789abcd 另一個提交訊息 / Another commit message
```

### 操作步驟 / Steps:

1. **將 `pick` 改為 `reword`** / **Change `pick` to `reword`**
   - 對於你想要編輯的提交行 / For the commit line you want to edit

2. **儲存並關閉編輯器** / **Save and close the editor**
   - 通常是 `:wq`（在 Vim 中）/ Usually `:wq` (in Vim)

3. **編輯提交訊息** / **Edit the commit message**
   - Git 會為每個標記為 `reword` 的提交開啟新的編輯器
   - Git will open a new editor for each commit marked as `reword`

4. **完成變基** / **Complete the rebase**
   - 儲存所有變更後，變基將自動完成
   - After saving all changes, the rebase will complete automatically

### 注意事項 / Important Notes:

- ⚠️ **謹慎使用於已推送的提交** / **Use caution with pushed commits**
  - 如果提交已經推送到遠端，需要使用 `git push --force`
  - If commits are already pushed remotely, you'll need `git push --force`

- 📝 **變更提交歷史** / **Changes commit history**
  - 這會改變提交的 SHA 雜湊值 / This will change the commit SHA hashes

- 👥 **團隊協作考量** / **Team collaboration considerations**
  - 在共享分支上操作前請先與團隊成員確認
  - Confirm with team members before operating on shared branches