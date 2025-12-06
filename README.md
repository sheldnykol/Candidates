# React Training Program

Welcome to the **React + TypeScript 2-Week Intensive Training**! 🚀

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd <your-repo-name>
npm install
```

### 2. Start Development

```bash
npm run dev
```

Open **http://localhost:5173** - you should see the app running! 🎉

### 3. Verify Setup

```bash
npm run test         # Run tests
npm run lint         # Check code quality
npm run type-check   # Check TypeScript
npm run build        # Production build
```

---

## 📁 Repository Structure

```
react-training/
├── src/
│   ├── Components/
│   │   └── Training-Files/      # 📚 Your daily exercises
│   │       ├── week-1/
│   │       │   ├── day-1/
│   │       │   ├── day-2/
│   │       │   └── ...
│   │       └── week-2/
│   ├── App.tsx
│   └── main.tsx
│
├── Docs/                        # 📖 Documentation
│   ├── DAILY_GITFLOW.md        # Git workflow guide
│   └── TEST_COMMANDS.md        # Testing commands
│
└── package.json
```

---

## 📝 Daily Workflow

### Before You Commit - Run Local Checks

```bash
npm run test         # All tests must pass
npm run lint         # No ESLint errors
npm run type-check   # No TypeScript errors
npm run build        # Build must succeed
```

**Training-specific checks:**

```bash
npm run lint:training       # Check only your exercises
npm run type-check:training # TypeScript for exercises only
npm run check:training      # Run both checks at once
```

### Git Workflow (Follow Daily)

**Every day follows the same pattern:**

1. **Start of day** - Create new branch:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/day-1
   ```

2. **During work** - Commit regularly:

   ```bash
   git add .
   git commit -m "Complete Exercise 01: Basic Components"
   git push origin feat/day-1
   ```

3. **End of day** - Create Pull Request:

   - Go to GitHub → Create PR
   - Wait for autograding (around half minute)
   - Review feedback
   - Fix issues if needed
   - Merge PR

4. **Next day** - Repeat with new branch:
   - `feat/day-2`, `feat/day-3`, etc.

📚 **Detailed workflow:** [Docs/DAILY_GITFLOW.md](Docs/DAILY_GITFLOW.md)

---

## 🎯 Autograding System

Each PR is graded automatically out of **100 points**:

| Check          | Points | Description                               |
| -------------- | ------ | ----------------------------------------- |
| **TypeScript** | 10     | No type errors in training files          |
| **ESLint**     | 20     | Code quality (all source files)           |
| **Tests**      | 70     | Proportional score based on passing tests |

### Grading Breakdown

- **TypeScript (10 pts)**: Pass/Fail - must have zero errors
- **ESLint (20 pts)**: Starts at 20, deducts 2pts per issue (any/console/max-lines)
- **Tests (70 pts)**: `(passed / total) × 70` - proportional scoring

**Example scores:**

- 25/26 tests passing: `(25/26) × 70 = 67pts` → Total: 10 + 20 + 67 = **97/100**
- 26/26 tests passing: `(26/26) × 70 = 70pts` → Total: 10 + 20 + 70 = **100/100**

---

## 📚 Available Scripts

| Command                       | Description                                |
| ----------------------------- | ------------------------------------------ |
| `npm run dev`                 | Start dev server (localhost:5173)          |
| `npm run build`               | Build for production                       |
| `npm test`                    | Run tests (watch mode)                     |
| `npm run test -- --run`       | Run tests once                             |
| `npm run lint`                | Check all files with ESLint                |
| `npm run lint:training`       | Check only Training-Files                  |
| `npm run type-check`          | Check all TypeScript errors                |
| `npm run type-check:training` | Check only Training-Files                  |
| `npm run check:training`      | Run TypeScript + ESLint for training files |
| `npm run analyze`             | Run code smell detection                   |

📚 **Testing guide:** [Docs/TEST_COMMANDS.md](Docs/TEST_COMMANDS.md)

---

## 💡 Important Rules

### ✅ DO:

- Create a new branch before starting each day
- Use branch naming: `feat/day-X`
- Run local checks before pushing
- Commit regularly with clear messages
- Create PR at end of each day
- Wait for autograding before merging

### ❌ DON'T:

- Never work directly on `main` branch
- Don't skip local testing
- Don't use AI tools to solve exercises
- Don't copy solutions from others
- Don't force push (`git push -f`)

### Academic Integrity

⚠️ **No AI Tools Policy**: All exercises must be completed without AI assistance (ChatGPT, Copilot, etc.). AI-generated code is detectable and will result in rejection from the program.

**What you CAN use:**

- Official documentation (React, TypeScript, MDN)
- Course materials and examples
- Discussion with instructors
- Peer discussion (but write your own code)

---

## 🆘 Getting Help

### Resources

- Exercise DEMO files (working examples)
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Docs/DAILY_GITFLOW.md](Docs/DAILY_GITFLOW.md)
- [Docs/TEST_COMMANDS.md](Docs/TEST_COMMANDS.md)

### Ask Questions

- Check documentation first
- Ask instructors during Q&A sessions
- Discuss concepts with peers

---

## 📅 Training Schedule

### Week 1: Fundamentals (Days 1-5)

- Day 1: Basic components, props & component composition
- Day 2: useState, useEffect & performance optimization
- Day 3: Custom hooks & Context API
- Day 4: CRUD operations
- Day 5: Responsive design

### Week 2: Advanced (Days 6-10)

- Day 6: Navigation & routing
- Day 7: Forms & candidate form
- Days 8-10: Final project (3 days)

---

## ✨ Tips for Success

1. **Run checks before every commit** - catch issues early
2. **Read DEMO files** - see working examples
3. **Follow the Git workflow** - one branch per day
4. **Don't skip tests** - they guide your learning
5. **Ask questions early** - don't wait until you're stuck

**Good luck, and happy coding! 🚀**

---

_For issues with autograding or repository access, contact your instructor._
