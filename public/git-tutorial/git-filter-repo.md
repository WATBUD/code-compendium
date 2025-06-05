# 安裝 git-filter-repo（如果還沒安裝）
pip install git-filter-repo

git filter-repo --path maitoday-168-dev-fireBase.json --invert-paths 
# 使用 git-filter-repo 來刪除文件
# 由於歷史紀錄已經改變，Git 會清理舊的數據並更新 Git 物件。你需要手動將這些修改推送到遠端倉庫，並重新設置遠端 (origin)
git remote add origin https://github.com/WATBUD/golang-template.git

# 清除原始引用
rm -rf .git/refs/original/

# 清理 reflog
git reflog expire --expire=now --all

# 垃圾回收，移除無用的對象
git gc --prune=now --aggressive

# 強制推送所有分支
git push main --force --all

# 強制推送所有標籤
git push main --force --tags

# 如果是協作的項目，團隊成員可能需要強制拉取並重置他們的分支：
git fetch origin
git reset --hard origin/main  # 假設是主分支