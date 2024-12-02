# Create a new orphan branch
git checkout --orphan new-branch

# Add the current state of files to the new branch
git add .

# Make the first commit on the new branch
git commit -m "Initial commit for the new branch"

# Optionally, delete the old master branch (use with caution)
git branch -D [master]

# Rename the new branch to master
git branch -m [master]

# Force push the new branch to the remote repository
git push origin [master] --force
