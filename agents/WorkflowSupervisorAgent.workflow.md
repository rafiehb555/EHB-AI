# WorkflowSupervisorAgent Detailed Workflow

## Purpose
Monitors the entire development workflow, enforces correct folder/file structure, prevents duplicates, cleans up extra data, manages uploads, and keeps the project organized in real-time.

## Responsibilities
- Prevent duplicate file/data creation
- Clean up extra/unwanted folders and files
- Handle uploads: extract data to correct location, delete ZIP/file after extraction
- Perform system-wide cleanup after each run
- Merge or replace same data/files smartly
- Enforce folder/file naming and placement rules
- Notify developer of all auto-actions

## Triggers
- On file/folder creation
- On upload (ZIP/file)
- On workflow completion
- On agent output (from other agents)
- On scheduled intervals (e.g., every 5 minutes)

## Actions
1. **Scan for duplicates**
   - If found, prevent creation or merge/replace as per rules
2. **Validate structure**
   - Move misplaced files/folders to correct location
   - Auto-create missing folders/files
3. **Handle uploads**
   - Extract uploaded ZIP/files to correct location
   - Delete original ZIP/file after extraction
4. **Clean up**
   - Delete extra/unwanted folders/files
   - Remove temp or unused data
5. **Merge/replace data**
   - Merge same data/files or replace as per rules
6. **Notify developer**
   - Log or alert all auto-actions taken

## Integration
- Runs in parallel with all other agents
- Validates and organizes output from all agents
- Can be triggered manually or automatically

## Example Notification
> [WorkflowSupervisorAgent] Moved misplaced config.json to /services/GoSellr-Ecommerce/config/ 

# Heading 1

## Heading 2

- List item 1
- List item 2

## Heading 3

- List item 3
- List item 4

# Heading 4

- List item 5
- List item 6 