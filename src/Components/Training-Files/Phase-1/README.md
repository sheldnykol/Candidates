# Phase 1: Component Development & UI

## 🎯 Objective

Build the foundational React components with proper structure, props, and state management. Focus on creating reusable, well-structured components that pass all automated tests.

---

## 📋 What's Already Provided

### ✅ Complete Infrastructure

- **Project Setup**: Vite + React + TypeScript configured
- **Routing**: React Router with all routes defined
- **Context & Hooks**: `CandidateContext` and `useCandidate` hook ready
- **Styling**: Complete CSS with all classes defined
- **Types**: TypeScript interfaces for `Candidate` type
- **Tests**: Full test suite to validate your implementation
- **API Service**: Backend API functions (you'll implement in Phase 2)

### ✅ Working Features

- JSON Server running on `http://localhost:3001`
- Navigation menu and layout
- Mock data available for testing
- Form validation hook (`useForm`)

---

## 🎨 What You Need to Build

### Component 1: CandidateForm.tsx

**Location**: `Phase-1/features/CandidateForm.tsx`  
**Test File**: `src/__tests__/components/CandidateForm.test.tsx`

**Your Tasks** (19 TODOs):

1. Setup default form values with all fields
2. Initialize useForm hook
3. Implement form validation logic
4. Create handleSubmit function
   5-18. Create all form input fields (name, email, phone, position, status, location, experience, salary, rating, education, skills, dates, notes)
5. Add action buttons (Submit, Reset, Cancel)

**Key Requirements**:

- All fields must use controlled inputs (value from state)
- Validation must run before submission
- Error messages must display below invalid fields
- Skills must be comma-separated string input
- Form must support both create and edit modes

**Test Coverage**: 15 test cases validating:

- All form fields render correctly
- Initial data populates fields
- Validation errors display
- Form submission works
- Reset and cancel functions

---

### Component 2: CandidateTable.tsx

**Location**: `Phase-1/features/CandidateTable.tsx`  
**Test File**: `src/__tests__/components/CandidateTable.test.tsx`

**Your Tasks** (10 TODOs):

1. Initialize page state
2. Calculate total pages
3. Calculate paginated data
4. Create page change handler
5. Implement status badge styling
6. Add empty state message
   7-9. Build table structure with headers and rows
7. Integrate pagination UI (use existing Pagination component from common/)

**Key Requirements**:

- Display 5 candidates per page
- Show proper status badges with colors
- Format salary with commas
- Display "X years" for experience
- Action buttons: View, Edit, Delete
- Delete confirmation dialog

**Test Coverage**: 12 test cases validating:

- Table headers render
- Candidate data displays correctly
- Empty state shows when no data
- Action buttons trigger callbacks
- Status badges render with correct classes
- Pagination functions

---

### Component 3: DashboardPage.tsx

**Location**: `Phase-1/pages/DashboardPage.tsx`  
**Test File**: `src/__tests__/pages/DashboardPage.test.tsx`

**Your Tasks** (9 TODOs):

1. Get candidates from hook
2. Calculate total count
3. Calculate status counts (approved, pending, rejected, on-hold)
4. Calculate average salary
5. Calculate average experience
   6-7. Create stats grid with cards
   8-9. Create details grid with averages

**Key Requirements**:

- Real-time data from context
- Color-coded stat cards
- Formatted salary display ($XX,XXX)
- Experience with 1 decimal place
- Responsive grid layout

**Test Coverage**: 8 test cases validating:

- Dashboard renders correctly
- All stat cards display
- Counts are accurate
- Average calculations correct
- No candidates state handled

---

## 🚀 Testing Your Code

**To run tests**: Copy your completed file to the production folder:

- `CandidateForm.tsx` → `src/Components/features/`
- `CandidateTable.tsx` → `src/Components/features/`
- `DashboardPage.tsx` → `src/Components/pages/`

---

## 🧪 Running Tests

### Run All Phase 1 Tests

```bash
npm test -- Phase-1
```

### Run Specific Component Tests

```bash
npm test -- CandidateForm.test
npm test -- CandidateTable.test
npm test -- DashboardPage.test
```

### Watch Mode (Recommended)

```bash
npm test -- --watch Phase-1
```

---

## ✅ Completion Checklist

Before moving to Phase 2, ensure:

- [ ] All 34 TODOs completed
- [ ] All component tests passing (35+ test cases)
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Components render correctly in browser
- [ ] All form validations work
- [ ] Dashboard calculates stats correctly

---

## 📊 Grading Criteria

| Component      | TODOs  | Test Cases | Points  |
| -------------- | ------ | ---------- | ------- |
| CandidateForm  | 19     | 15         | 35      |
| CandidateTable | 10     | 12         | 30      |
| DashboardPage  | 9      | 8          | 35      |
| **Total**      | **38** | **35**     | **100** |

**Passing Grade**: 70/100 (25+ test cases passing)

---

## 💡 Tips for Success

1. **Read Tests First**: Check test files to understand expected behavior
2. **One TODO at a Time**: Complete TODOs in order
3. **Use TypeScript**: Let types guide your implementation
4. **Check Existing Code**: Look at similar patterns in working components
5. **Test Frequently**: Run tests after each TODO
6. **Console Logs**: Use temporarily for debugging, remove before submission
7. **CSS Classes**: All styles are provided, use correct class names

---

## 🐛 Common Issues

### Issue: Form fields not updating

**Solution**: Ensure you're using `value={values.fieldName}` and `onChange={handleChange}`

### Issue: Tests failing for missing elements

**Solution**: Check exact className and element structure in test file

### Issue: Type errors

**Solution**: Import types from `../../../../types/candidate`

---

## 📚 Resources

- React Hooks: https://react.dev/reference/react
- TypeScript: https://www.typescriptlang.org/docs/
- Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- React Router: https://reactrouter.com/en/main

---

## 🎓 Learning Objectives

By completing Phase 1, you will demonstrate:

- ✅ React component architecture
- ✅ Props and state management
- ✅ Form handling and validation
- ✅ Conditional rendering
- ✅ List rendering and keys
- ✅ Event handling
- ✅ TypeScript with React
- ✅ Component testing understanding

---

**Ready to start? Open `CandidateForm.tsx` and begin with TODO 1! 🚀**
