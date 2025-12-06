# 🎓 Candidate Management System - Training Project

Welcome to the React Training Project! This is a comprehensive, production-ready Candidate Management System that you'll build step-by-step. Your goal is to complete a fully functional CRUD application with modern React patterns and best practices.

---

## 📖 Project Overview

### What You're Building

A complete candidate recruitment management system with:

- **Dashboard** with statistics and charts
- **Candidate List** with search, filters, and pagination
- **Add Candidate** form with validation
- **Edit Candidate** functionality
- **Candidate Details** page
- **Full CRUD Operations** connected to REST API
- **Responsive Design** that works on all devices

### Real-World Skills You'll Learn

- ✅ React 19 with TypeScript
- ✅ Component architecture and composition
- ✅ State management with Context API
- ✅ Custom hooks development
- ✅ Form handling and validation
- ✅ RESTful API integration with Axios
- ✅ React Router for navigation
- ✅ Testing with Vitest and Testing Library
- ✅ Modern CSS with responsive design

---

## 🏗️ Project Structure

```
src/
├── Components/
│   ├── Training-Files/        ← YOUR WORK HERE
│   │   ├── Phase-1/           ← Build Components (100 points)
│   │   │   ├── features/
│   │   │   │   ├── CandidateForm.tsx       (19 TODOs)
│   │   │   │   └── CandidateTable.tsx      (10 TODOs)
│   │   │   ├── pages/
│   │   │   │   └── DashboardPage.tsx       (9 TODOs)
│   │   │   └── README.md
│   │   │
│   │   ├── Phase-2/           ← Implement CRUD (100 points)
│   │   │   ├── pages/
│   │   │   │   ├── CandidateListPage.tsx   (17 TODOs)
│   │   │   │   ├── AddCandidatePage.tsx    (6 TODOs)
│   │   │   │   ├── EditCandidatePage.tsx   (9 TODOs)
│   │   │   │   └── CandidateDetailPage.tsx (21 TODOs)
│   │   │   └── README.md
│   │   │
│   │   └── Bonus/             ← Extra Credit (91 points)
│   │       └── BONUS_CHALLENGES.md
│   │
│   ├── features/              ← Reference Solutions
│   ├── pages/                 ← Reference Solutions
│   └── common/                ← Reference Solutions
│
├── __tests__/                 ← Automated Tests (DO NOT MODIFY)
├── context/                   ← Provided (CandidateContext)
├── hooks/                     ← Provided (useCandidate, useForm)
├── services/                  ← Provided (API base)
├── types/                     ← Provided (TypeScript types)
└── styles/                    ← Provided (Complete CSS)
```

---

## 🎯 What's Already Built For You

### ✅ Complete Infrastructure

You don't need to set up or configure anything! Everything is ready:

1. **Project Configuration**

   - Vite build tool configured
   - TypeScript with strict mode
   - ESLint for code quality
   - Vitest for testing
   - React Router setup

2. **Backend API**

   - JSON Server running on `http://localhost:3001`
   - RESTful endpoints for all CRUD operations
   - Sample data pre-loaded in `db.json`

3. **Global State Management**

   - `CandidateContext` with Provider
   - `useCandidate` custom hook
   - All CRUD operations abstracted

4. **Routing**

   - All routes defined in `App.tsx`
   - Navigation menu component
   - Layout structure

5. **Styling**

   - Complete CSS with all classes
   - Responsive design ready
   - Form styles, table styles, buttons
   - Status badges and colors

6. **Helper Utilities**

   - `useForm` hook for form state
   - Type definitions for Candidate
   - Test utilities and mocks

7. **Comprehensive Tests**
   - 89+ test cases to validate your work
   - Component tests
   - Page tests
   - Integration tests
   - Auto-grading ready

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (v18 or higher)
- npm or yarn
- Git
- VS Code (recommended)

### Installation Steps

1. **Clone or Download Project**

   ```bash
   git clone <repository-url>
   cd react-school
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start JSON Server (Backend)**

   ```bash
   npm run server
   ```

   Server runs on: `http://localhost:3001`

4. **Start Development Server (Frontend)**

   ```bash
   # In a new terminal
   npm run dev
   ```

   App runs on: `http://localhost:5173`

5. **Run Tests (Optional)**
   ```bash
   # In another terminal
   npm test
   ```

### Verify Setup

- ✅ Frontend: http://localhost:5173 (should show app)
- ✅ Backend: http://localhost:3001/candidates (should show JSON)
- ✅ Tests: Running without errors

---

## 🔄 How It Works

**Important**:

- Work in `Training-Files/` folders
- When done, copy your file to `Components/` or `services/` to run tests
- Tests only check files in production locations

---

## 📚 Training Path

### Phase 1: Component Development (Estimated: 4-6 hours)

**Goal**: Build reusable React components with proper structure

| Component      | TODOs | Points |
| -------------- | ----- | ------ |
| CandidateForm  | 15    | 35     |
| CandidateTable | 10    | 30     |
| DashboardPage  | 9     | 35     |

**Start**: `Phase-1/README.md`

- [ ] 45+ test cases passing
- [ ] Components render without errors
- [ ] Form validation works
- [ ] Pagination functions correctly

---

### Phase 2: CRUD Operations (Estimated: 6-8 hours)

**Goal**: Connect components to API and implement full CRUD functionality

| Component           | TODOs | Points |
| ------------------- | ----- | ------ |
| CandidateListPage   | 17    | 30     |
| AddCandidatePage    | 6     | 20     |
| EditCandidatePage   | 9     | 25     |
| CandidateDetailPage | 21    | 25     |

**Start**: `Phase-2/README.md`

- Global state with Context
- CRUD operation patterns
- Error handling
- Loading states

**When Complete**:

- [ ] All 53 TODOs done
- [ ] 44+ test cases passing
- [ ] All CRUD operations work
- [ ] Navigation flows correctly
- [ ] API calls successful
- [ ] Error handling works

---

### Bonus Challenges (Estimated: Varies)

**Goal**: Add advanced features for extra credit

10 Optional challenges worth 91 total points:

1. Advanced Pagination (10 pts)
2. Dark Mode (8 pts)
3. Export to CSV (7 pts)
4. Advanced Search & Filters (10 pts)
5. Toast Notifications (6 pts)
6. Responsive Mobile Menu (5 pts)
7. Image Upload (12 pts)
8. Dashboard Charts (10 pts)
9. Enhanced Validation (8 pts)
10. Undo/Redo (15 pts) **[EXPERT]**

**Start Here**: `Bonus/BONUS_CHALLENGES.md`

---

## 🧪 Testing & Auto-Grading

### Run All Tests

```bash
npm test
```

### Run Specific Phase

```bash
npm test -- Phase-1
npm test -- Phase-2
```

### Run Specific Component

```bash
npm test -- CandidateForm
npm test -- CandidateTable
```

### Watch Mode (Recommended During Development)

```bash
npm test -- --watch
```

### Test Coverage

```bash
npm run test:coverage
```

### Understanding Test Results

- **Green checkmark** ✓: Test passed
- **Red X** ✗: Test failed
- **Number of passed/total**: Track your progress
- **Error messages**: Guide you to fix issues

---

## 📊 Grading Breakdown

| Phase       | Components | TODOs  | Tests  | Points  | Pass Threshold |
| ----------- | ---------- | ------ | ------ | ------- | -------------- |
| **Phase 1** | 3          | 34     | 35     | 100     | 70             |
| **Phase 2** | 4          | 53     | 44     | 100     | 70             |
| **Bonus**   | 10         | Varies | Manual | 91      | Optional       |
| **Total**   | 17         | 87     | 79     | **291** | 140/200        |

### Grade Scale

- **A (180-200)**: Excellent - Both phases + some bonuses
- **B (140-179)**: Good - Both phases complete
- **C (100-139)**: Satisfactory - One phase excellent, one basic
- **D (70-99)**: Pass - Minimum requirements met
- **F (<70)**: Fail - Incomplete work

---

## 💡 Tips

- Complete one TODO at a time
- Test after each component
- Check test files to understand requirements
- Use console.log for debugging
- Commit after completing each component

---

## 🐛 Common Issues

- **Tests not running**: `npm install`
- **Port in use**: Kill processes on ports 3001 and 5173
- **API failing**: Check JSON Server is running
- **Type errors**: Check import paths

---

## 📖 Resources

### Official Documentation

- [React Docs](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com/docs/intro)
- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Helpful Guides

- [React Hooks](https://react.dev/reference/react)
- [Context API](https://react.dev/learn/passing-data-deeply-with-context)
- [Form Handling](https://react.dev/learn/sharing-state-between-components)
- [REST API Best Practices](https://restfulapi.net)

### Tools

- [React DevTools](https://react.dev/learn/react-developer-tools)
- [VS Code Extensions](https://marketplace.visualstudio.com/VSCode)
  - ES7+ React/Redux/React-Native snippets
  - ESLint
  - Prettier
  - TypeScript Extension Pack

---

## ✅ Before Submitting

- [ ] All TODOs completed
- [ ] Tests passing
- [ ] No TypeScript/ESLint errors
- [ ] Code is clean

### Functionality

- [ ] All tests passing
- [ ] App runs without errors
- [ ] All features work in browser
- [ ] Forms validate correctly
- [ ] Navigation works
- [ ] CRUD operations complete
- [ ] Responsive design works

### Testing

- [ ] Ran full test suite
- [ ] Tested manually in browser
- [ ] Checked edge cases
- [ ] Verified error handling
- [ ] Tested on different screen sizes

### Documentation

- [ ] Updated README if needed
- [ ] Added comments for complex code
- [ ] Documented any issues encountered
- [ ] Listed bonus challenges completed

---

**Start**: Open `Phase-1/README.md` and begin with TODO 1 in `CandidateForm.tsx`
