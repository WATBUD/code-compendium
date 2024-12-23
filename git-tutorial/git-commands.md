
# Common Git CLI Commands

## Configuration

### Set User Name
```sh
git config --global user.name "Your Name"
```

### Set User Email
```sh
git config --global user.email "youremail@example.com"
```

### List All Configurations
```sh
git config --list
```

## Repository Operations

### Initialize a New Repository
```sh
git init
```

### Clone a Repository
```sh
git clone https://github.com/user/repo.git
```

## Basic Commands

### Check Repository Status
```sh
git status
```

### Add Files to Staging Area
```sh
git add <file>
```

### Add All Files to Staging Area
```sh
git add .
```

### Commit Changes
```sh
git commit -m "Commit message"
```

### Remove Files
```sh
git rm <file>
```

### Move or Rename Files
```sh
git mv <old_name> <new_name>
```

## Branching and Merging

### List All Branches
```sh
git branch
```

### Create a New Branch
```sh
git branch <branch_name>
```

### Switch to a Branch
```sh
git checkout <branch_name>
```

### Create and Switch to a New Branch
```sh
git checkout -b <branch_name>
```

### Merge a Branch
```sh
git merge <branch_name>
```

### Delete a Branch
```sh
git branch -d <branch_name>
```

## Remote Repositories

### Add a Remote Repository
```sh
git remote add origin https://github.com/user/repo.git
```

### Remove a Remote Repository
```sh
git remote remove <remote_name>
```

### List All Remote Repositories
```sh
git remote -v
```

### Push Changes to Remote Repository
```sh
git push origin <branch_name>
```

### Pull Changes from Remote Repository
```sh
git pull origin <branch_name>
```

## Viewing History

### View Commit History
```sh
git log
```

### View Commit History with One Line per Commit
```sh
git log --oneline
```

### View a Specific Commit
```sh
git show <commit_hash>
```

## Undoing Changes

### Unstage a File
```sh
git reset <file>
```

### Revert a Commit
```sh
git revert <commit_hash>
```

### Reset to a Previous Commit
```sh
git reset --hard <commit_hash>
```

### Stash Changes
```sh
git stash
```

### Apply Stashed Changes
```sh
git stash apply
```

### List Stashed Changes
```sh
git stash list
```

## Tags

### Create a Tag
```sh
git tag <tag_name>
```

### List Tags
```sh
git tag
```

### Push Tags to Remote Repository
```sh
git push origin --tags
```
