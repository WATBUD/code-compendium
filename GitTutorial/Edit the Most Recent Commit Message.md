
- Method 1: Edit the Most Recent Commit Message
# Use --amend to edit the most recent commit message
git commit --amend -m "Updated commit message"





- Method 2:Edit an Older Commit Message
# Start an interactive rebase for the last 3 commits
git rebase -i HEAD~3
pick abc1234 Some commit message
reword def5678 The commit message you want to edit
pick 789abcd Another commit message
