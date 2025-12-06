# Daily Git Workflow Guide

## Overview

Each training day follows the same Git workflow. This ensures clean code organization and allows the autograding system to check your work through Pull Requests.

---

## Daily Workflow Steps

### 1. Start of Day - Create Feature Branch

**BEFORE writing any code**, create a new branch for the day's work:

```bash
# Make sure you're on main and it's up to date
git checkout main
git pull origin main

# Create and switch to a new branch for the day
git checkout -b feat/day-1
```

**Branch naming convention:**

- Day 1: `feat/day-1`
- Day 2: `feat/day-2`
- Day 3: `feat/day-3`
- etc.

---

### 2. During the Day - Work and Commit

Work on your exercises and commit your progress regularly:

```bash
# Check what files you've changed
git status

# Add files to staging
git add .

# Commit with a descriptive message
git commit -m "Complete Exercise 01: Basic Components"

# Push your branch to GitHub
git push -u origin feat/day-1
```

**Commit often!** Good commit messages examples:

- ✅ `"Complete BookTitle and BookDetails components"`
- ✅ `"Add BookList component with map functionality"`
- ✅ `"Fix TypeScript errors in BookCard component"`
- ❌ `"update"` (too vague)
- ❌ `"fix stuff"` (not descriptive)

---

### 3. End of Day - Create Pull Request

When you've completed the day's exercises:

1. **Push your final changes:**

   ```bash
   git add .
   git commit -m "Complete all Day 1 exercises"
   git push origin feat/day-1
   ```

2. **Create a Pull Request on GitHub:**

   - Go to your repository on GitHub
   - Click "Pull requests" tab
   - Click "New pull request"
   - Set **base:** `main` ← **compare:** `feat/day-1`
   - Click "Create pull request"
   - Add a title: "Day 1 - Basic Functional Components"
   - Click "Create pull request"

3. **Wait for Autograding:**

   - GitHub will automatically run tests and checks
   - Review the autograding results in the PR
   - Fix any issues if needed and push again (same branch)

4. **Merge the Pull Request:**
   - Once all checks pass and you're satisfied
   - Click "Merge pull request" on GitHub
   - Click "Confirm merge"
   - **Optional:** Delete the branch after merging

---

### 4. Next Day - Repeat the Process

Start fresh the next day:

```bash
# Switch back to main
git checkout main

# Get the latest changes (your merged work from yesterday)
git pull origin main

# Create a new branch for the new day
git checkout -b feat/day-2
```

Then repeat steps 2-4 for each training day.

---

## Important Rules

### ✅ DO:

- Create a new branch BEFORE starting each day's work
- Use the naming convention `feat/day-X`
- Commit and push regularly throughout the day
- Create a PR at the end of each day
- Wait for autograding to complete
- Merge your PR before starting the next day

### ❌ DON'T:

- Never work directly on the `main` branch
- Don't reuse the same branch for multiple days
- Don't forget to pull `main` before creating a new branch
- Don't merge without checking autograding results

---

## Quick Reference Commands

```bash
# Start of day
git checkout main
git pull origin main
git checkout -b feat/day-X

# During the day (repeat as needed)
git add .
git commit -m "Descriptive message"
git push origin feat/day-X

# End of day
# 1. Push final changes (see above)
# 2. Create PR on GitHub website
# 3. Review autograding results
# 4. Merge PR on GitHub website

# Next day
git checkout main
git pull origin main
git checkout -b feat/day-Y
```

---

## Checking Your Work Before PR

Before creating your Pull Request, run these commands locally:

```bash
# Check for TypeScript errors
npm run type-check:training

# Check for ESLint issues
npm run lint:training

# Run both checks at once
npm run check:training

# Run tests for your day's work
npm test -- src/Components/Training-Files/week-1/day-1 --run
```

Fix any issues before creating the PR to ensure a clean autograding result.

---

## Troubleshooting

**Problem:** "Already on branch feat/day-1"

- **Solution:** You're already on the branch, just continue working

**Problem:** "fatal: A branch named 'feat/day-2' already exists"

- **Solution:** Either use that branch (`git checkout feat/day-2`) or delete it first (`git branch -d feat/day-2`)

**Problem:** Forgot to create a branch and worked on main

- **Solution:**
  ```bash
  # Create the branch from current state
  git checkout -b feat/day-X
  # Push to the new branch
  git push -u origin feat/day-X
  ```

**Problem:** Need to update branch with latest main changes

- **Solution:**
  ```bash
  git checkout main
  git pull origin main
  git checkout feat/day-X
  git merge main
  ```

---

## Example: Complete Day 1 Workflow

```bash
# Morning - Start Day 1
git checkout main
git pull origin main
git checkout -b feat/day-1

# Work on Exercise 01
# ... edit files ...
git add .
git commit -m "Complete Exercise 01: Book components"
git push origin feat/day-1

# Continue working...
# ... more edits ...
git add .
git commit -m "Add BookFilter component"
git push origin feat/day-1

# End of day - Final check
npm run check:training
npm test -- EXERCISE_01 --run

# Final push
git add .
git commit -m "Complete all Day 1 exercises"
git push origin feat/day-1

# Go to GitHub → Create PR → Wait for autograding → Merge PR
```

---

## Summary

**Every day = New branch → Work → Commit → Push → PR → Merge → Repeat**

Following this workflow ensures:

- ✅ Clean, organized code history
- ✅ Proper autograding through PRs
- ✅ Easy to track progress by day
- ✅ Safe experimentation (can always go back to main)
- ✅ Professional development practices
