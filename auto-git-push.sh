#!/bin/bash

# Log file
LOG_FILE="git-push.log"

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    log "Error: git is not installed"
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
    log "Error: Not a git repository"
    exit 1
fi

# Add all changes
log "Adding changes..."
git add .

# Check if there are any changes
if git diff --cached --quiet; then
    log "No changes to commit"
    exit 0
fi

# Create commit
COMMIT_MSG="Auto: latest changes $(date '+%Y-%m-%d %H:%M:%S')"
log "Creating commit: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# Push changes
log "Pushing to remote..."
if git push origin main; then
    log "Successfully pushed changes"
else
    log "Error pushing changes. Trying to pull first..."
    git pull origin main --rebase
    if git push origin main; then
        log "Successfully pushed changes after pull"
    else
        log "Failed to push changes even after pull"
        exit 1
    fi
fi

log "Auto push completed successfully" 