
# Features of an Orphan Branch

# No Parent Commit
The orphan branch has no parent commit, meaning its history is entirely independent and does not inherit the commit history of the current branch.
Running git log on this branch will not display any commits from other branches.

# Start Fresh
The orphan branch starts as if it's a brand-new Git repository, with no prior commits.

# No Impact on the Main Branch
Any changes made on the orphan branch do not affect the main branch or any other branch in the repository.

# Create a new orphan branch
git checkout --orphan new-branch

# Add the current state of files to the new branch
git add .

# Make the first commit on the new branch
git commit -m "Initial commit for the new branch"

# Optionally, delete the old master branch (use with caution)
git branch -D oldBranchName

# Rename the new branch to master
git branch -m newBranchName

# Force push the new branch to the remote repository
git push origin newBranchName --force
