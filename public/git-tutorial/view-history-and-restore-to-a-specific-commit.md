
# Git Command Tutorial: Viewing History and Restoring to a Specific Commit

In Git, you might need to view the history of a branch or restore your working directory to a specific commit. This guide will show you how to use Git commands to view reference logs and switch to a specific commit.

1. View the Current Branch's Operation History
   To view the operation history of the current branch, use the `git reflog` command. The reflog records all changes to the HEAD and branch references,    including commits, merges, and resets.
   `git reflog --date=iso`
2. View a Specific Branch's Operation History
   `git reflog show feature/folder_API_louis --date=iso`
3. Switch to a Specific Commit
   `git checkout beaab92`
4. Create a New Branch from a Specific Commit
   `git checkout -b 20241031`
