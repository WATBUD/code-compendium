---

# Git 不小心 push 後復原教學

**Recovering a Git Branch After an Accidental Push**

---

## 1️⃣ 查看本地 reflog / Check local reflog

```bash
git reflog
```

這個指令會列出你本地所有 HEAD 的變動紀錄，包括 commit、checkout、reset 等。
This command lists all local HEAD movements, including commits, checkouts, resets, etc.

**範例 output / Example output:**

```
8075117b HEAD@{9}: commit: Update font family for "Rules" section to match design
217175c9 HEAD@{0}: checkout: moving from feature/PT-3290 to release/raja-stg2508
```

---

## 2️⃣ 找到正確的 commit / Find the correct commit

從 reflog 中找到你想要復原的 commit，例如：
From the reflog, find the commit you want to restore, e.g.:

```
8075117b HEAD@{9}: commit: Update font family for "Rules" section to match design
```

---

## 3️⃣ 建立救援分支（保險做法） / Create a rescue branch (safer)

```bash
git checkout -b rescue-branch 8075117b
```

這樣可以保留原本的分支不受影響。
This creates a new branch pointing to the desired commit, keeping your original branch intact.

---

## 4️⃣ 復原本地分支 / Reset the local branch

如果確定要直接覆蓋原本分支，可以用：

```bash
git checkout release/raja-stg2508
git reset --hard 8075117b
```

這會把本地分支回到指定 commit。
This resets the local branch to the specified commit.

---

## 5️⃣ 推回遠端分支 / Push back to remote

**警告：** force push 會覆蓋遠端內容，可能影響其他人的工作。
**Warning:** Force pushing will overwrite the remote branch, potentially affecting others.

```bash
git push origin release/raja-stg2508 --force
```

如果你用救援分支，也可以推回：

```bash
git push origin rescue-branch:release/raja-stg2508 --force
```

---

## ✅ 小結 / Summary

1. `git reflog` 找 commit
   Find the commit in reflog
2. `git checkout -b <rescue-branch> <commit>` 建立救援分支
   Create a rescue branch
3. `git reset --hard <commit>` 復原本地分支
   Reset local branch to that commit
4. `git push --force` 推回遠端
   Force push to restore remote branch

---
