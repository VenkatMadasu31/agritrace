# Stage all changes (tracked + untracked + deletions)
git add -A

# Only commit if there are staged changes
if (-not (git diff --cached --quiet)) {
    git commit -m "Auto-update $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    git push
    Write-Host "Changes pushed to GitHub!"
} else {
    Write-Host "No changes to commit."
}
