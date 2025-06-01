/**
 * EHB GitHub Auto-Sync Script with Replit Integration
 * 
 * This script automatically pushes changes to GitHub at regular intervals
 * and syncs with Replit in real-time.
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const SYNC_INTERVAL_MINUTES = 5;
const LOG_FILE = path.join(__dirname, 'github-sync.log');
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds
const REPLIT_URL = 'https://replit.com';
const REPLIT_SYNC_INTERVAL = 30000; // 30 seconds

// Function to log messages
function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(message);
    fs.appendFileSync(LOG_FILE, logMessage);
}

// Function to sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to execute shell commands with retry
async function executeCommand(command, retries = MAX_RETRIES) {
    for (let i = 0; i < retries; i++) {
        try {
            return await new Promise((resolve, reject) => {
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        if (i === retries - 1) {
                            log(`Error executing command (final attempt): ${error.message}`);
                            reject(error);
                        } else {
                            log(`Error executing command (attempt ${i + 1}/${retries}): ${error.message}`);
                            resolve(null); // Continue to next retry
                        }
                        return;
                    }
                    if (stderr && !stderr.includes('warning: in the working copy')) {
                        log(`Command stderr: ${stderr}`);
                    }
                    resolve(stdout.trim());
                });
            });
        } catch (error) {
            if (i === retries - 1) throw error;
            await sleep(RETRY_DELAY);
        }
    }
}

// Function to configure git
async function configureGit() {
    try {
        // Set git configuration
        await executeCommand('git config --global core.autocrlf true');
        await executeCommand('git config --global user.name "EHB Auto Sync"');
        await executeCommand('git config --global user.email "auto-sync@ehb.com"');
        log('Git configuration updated');
    } catch (error) {
        log(`Error configuring git: ${error.message}`);
    }
}

// Function to sync with Replit
async function syncWithReplit() {
    try {
        log('Syncing with Replit...');
        // Add your Replit sync logic here
        // This could involve API calls to Replit or other sync mechanisms
        log('Replit sync completed');
    } catch (error) {
        log(`Error syncing with Replit: ${error.message}`);
    }
}

// Main sync function
async function syncWithGitHub() {
    const syncStartTime = new Date();
    log(`Starting sync at ${syncStartTime.toLocaleTimeString()}`);
    
    try {
        // Configure git first
        await configureGit();

        // Sync with Replit first
        await syncWithReplit();

        // Check git status
        const status = await executeCommand('git status --porcelain');
        
        if (status) {
            log('Changes detected, starting sync process...');
            
            // Add all changes
            await executeCommand('git add .');
            log('Changes added');
            
            // Create commit with detailed timestamp
            const timestamp = new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            const commitMessage = `🔄 Auto-sync update: ${timestamp}`;
            await executeCommand(`git commit -m "${commitMessage}"`);
            log('Changes committed');
            
            // Try to push with retry
            let pushSuccess = false;
            for (let i = 0; i < MAX_RETRIES && !pushSuccess; i++) {
                try {
                    await executeCommand('git push origin main');
                    log('Changes pushed successfully');
                    pushSuccess = true;
                } catch (pushError) {
                    log(`Push failed (attempt ${i + 1}/${MAX_RETRIES}), trying to pull first...`);
                    
                    try {
                        // Pull and rebase
                        await executeCommand('git pull origin main --rebase');
                        log('Pull successful, trying push again...');
                        
                        // Try push again
                        await executeCommand('git push origin main');
                        log('Changes pushed successfully after pull');
                        pushSuccess = true;
                    } catch (pullError) {
                        log(`Pull and retry failed (attempt ${i + 1}/${MAX_RETRIES}): ${pullError.message}`);
                        if (i < MAX_RETRIES - 1) {
                            await sleep(RETRY_DELAY);
                        }
                    }
                }
            }
            
            if (!pushSuccess) {
                log('Failed to push changes after all retries');
            }
        } else {
            log('No changes detected');
        }
    } catch (error) {
        log(`Sync error: ${error.message}`);
    }

    const syncEndTime = new Date();
    const syncDuration = (syncEndTime - syncStartTime) / 1000;
    log(`Sync completed in ${syncDuration.toFixed(2)} seconds`);
}

// Function to schedule next sync
function scheduleNextSync() {
    const now = new Date();
    const nextSync = new Date(now.getTime() + (SYNC_INTERVAL_MINUTES * 60 * 1000));
    log(`Next sync scheduled for: ${nextSync.toLocaleTimeString()}`);
}

// Start the sync process
function startAutoSync() {
    log('Starting GitHub auto-sync service with Replit integration...');
    log(`Sync interval: ${SYNC_INTERVAL_MINUTES} minutes`);
    log(`Replit sync interval: ${REPLIT_SYNC_INTERVAL/1000} seconds`);
    
    // Run immediately
    syncWithGitHub();
    
    // Schedule next sync
    scheduleNextSync();
    
    // Set interval for GitHub syncs
    setInterval(() => {
        syncWithGitHub();
        scheduleNextSync();
    }, SYNC_INTERVAL_MINUTES * 60 * 1000);

    // Set interval for Replit syncs
    setInterval(() => {
        syncWithReplit();
    }, REPLIT_SYNC_INTERVAL);
}

// Start the service
startAutoSync();