# Phase 2: CRUD Operations & API Integration

## 🎯 Objective

Implement full CRUD (Create, Read, Update, Delete) functionality by connecting your Phase 1 components to the backend API. Build complete page components that integrate form and table components with proper routing and state management.

---

## 📋 What's Already Provided

### ✅ From Phase 1

- **CandidateForm**: Fully functional form component
- **CandidateTable**: Working table with pagination
- **DashboardPage**: Stats display component
- **Pagination**: Working pagination component

### ✅ Infrastructure

- **Context API**: CandidateContext manages global state
- **Custom Hook**: useCandidate provides CRUD operations
- **Routing**: All routes configured in App.tsx
- **Backend**: JSON Server running on port 3001
- **Sample Data**: Pre-loaded candidates in db.json

---

## 🔨 What You Need to Build

**Note**: The API service layer (`candidateApi.ts`) is already provided in `src/services/`. You'll use the `useCandidate` hook which internally uses these API functions.

---

### Component 1: CandidateListPage.tsx

**Location**: `Phase-2/pages/CandidateListPage.tsx`  
**Test File**: `src/__tests__/pages/CandidateListPage.test.tsx`

**Your Tasks** (17 TODOs):

1. Get candidates and deleteCandidate from hook
2. Get navigate function
3. Initialize searchTerm state
4. Initialize filterStatus state
5. Implement filteredCandidates with useMemo
6. Create handleSearchChange
7. Create handleFilterChange
8. Create handleEdit
9. Create handleDelete
10. Create handleView
    11-17. Build page structure (header, filters, table)

**Key Requirements**:

- Filter by status (all, pending, approved, rejected, on-hold)
- Search by name, email, or position (case-insensitive)
- Show candidate count in header
- "Add Candidate" button navigates to /add
- Pass filtered candidates to table
- Handle navigation to detail/edit pages

**Test Coverage**: 14 test cases validating:

- Page renders with candidates
- Search functionality works
- Status filter works
- Combined search + filter
- Add button navigation
- Edit/Delete/View callbacks
- Empty state handling

---

### Component 3: AddCandidatePage.tsx

**Location**: `Phase-2/pages/AddCandidatePage.tsx`  
**Test File**: `src/__tests__/pages/AddCandidatePage.test.tsx`

**Your Tasks** (6 TODOs):

1. Get navigate function
2. Get addCandidate from hook
3. Implement handleSubmit
4. Implement handleCancel
5. Add page header
6. Add CandidateForm component

**Key Requirements**:

- Call addCandidate with form data
- Navigate to /candidates after successful add
- Cancel returns to /candidates
- Form has no initial data (create mode)
- Page header shows "Add New Candidate"

**Test Coverage**: 8 test cases validating:

- Page renders correctly
- Form displays
- Submit adds candidate
- Navigation after submit
- Cancel button works
- Form validation integration

---

### Component 4: EditCandidatePage.tsx

**Location**: `Phase-2/pages/EditCandidatePage.tsx`  
**Test File**: `src/__tests__/pages/EditCandidatePage.test.tsx`

**Your Tasks** (9 TODOs):

1. Get id from URL params
2. Get navigate function
3. Get getCandidateById and updateCandidate from hook
4. Get candidate by id
5. Add not found check
6. Implement handleSubmit
7. Implement handleCancel
8. Add page header with candidate name
9. Add CandidateForm with initial data

**Key Requirements**:

- Get candidate ID from route params
- Show "Not Found" if candidate doesn't exist
- Pre-populate form with candidate data
- Update candidate on submit
- Navigate to detail page after update
- Cancel returns to detail page

**Test Coverage**: 10 test cases validating:

- Page renders for valid candidate
- Not found state displays
- Form pre-populated with data
- Update function called correctly
- Navigation after update
- Cancel navigation
- URL params handling

---

### Component 5: CandidateDetailPage.tsx

**Location**: `Phase-2/pages/CandidateDetailPage.tsx`  
**Test File**: `src/__tests__/pages/CandidateDetailPage.test.tsx`

**Your Tasks** (21 TODOs):

1. Get id from URL params
2. Get navigate function
3. Get getCandidateById and deleteCandidate from hook
4. Get candidate by id
5. Add not found check
6. Implement handleEdit
7. Implement handleDelete (with confirmation)
8. Implement handleBack
   9-21. Build detail page structure (header, sections, buttons)

**Key Requirements**:

- Display all candidate information in sections
- Contact Info: email (mailto link), phone (tel link), location
- Professional Info: position, education, experience, salary, rating
- Skills: display as badges
- Application Details: applied date, interview date
- Notes section (conditional)
- Action buttons: Back, Edit, Delete
- Delete confirmation dialog
- Navigate appropriately after actions

**Test Coverage**: 12 test cases validating:

- Page renders candidate details
- All sections display
- Not found state
- Edit button navigation
- Delete confirmation and execution
- Back button navigation
- Email/phone links
- Skills rendering

---

## 🚀 Testing Your Code

**To run tests**: Copy completed files to production folders:

- `candidateApi.ts` → `src/services/`
- Page files → `src/Components/pages/`

**Prerequisites**: Phase 1 components must be in `src/Components/features/`

---

## 🧪 Running Tests

### Run All Phase 2 Tests

```bash
npm test -- Phase-2
```

### Run Specific Page Tests

```bash
npm test -- CandidateListPage.test
npm test -- AddCandidatePage.test
npm test -- EditCandidatePage.test
npm test -- CandidateDetailPage.test
```

### Run API Service Tests (Manual)

Start JSON Server and test API calls:

```bash
npm run server
# In another terminal
curl http://localhost:3001/candidates
```

---

## ✅ Completion Checklist

Before considering Phase 2 complete:

- [ ] All 53 TODOs completed
- [ ] All page component tests passing (44+ test cases)
- [ ] CRUD operations work in browser
- [ ] Search and filter functional
- [ ] Navigation between pages works
- [ ] Delete confirmation dialogs show
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Routing works correctly

---

## 📊 Grading Criteria

| Component           | TODOs  | Test Cases | Points  |
| ------------------- | ------ | ---------- | ------- |
| CandidateListPage   | 17     | 14         | 30      |
| AddCandidatePage    | 6      | 8          | 20      |
| EditCandidatePage   | 9      | 10         | 25      |
| CandidateDetailPage | 21     | 12         | 25      |
| **Total**           | **53** | **44**     | **100** |

**Passing Grade**: 70/100 (30+ test cases passing + working API)

---

## 🔄 CRUD Operation Flow

### Create (Add Candidate)

1. User clicks "Add Candidate" button
2. Navigate to `/add`
3. AddCandidatePage renders with empty form
4. User fills form and submits
5. Call `addCandidate()` from context
6. Context calls `createCandidate()` API
7. Navigate to `/candidates` on success

### Read (View Candidates)

1. User navigates to `/candidates`
2. CandidateListPage renders
3. Context provides candidates array
4. User can search/filter
5. Click "View" navigates to `/candidates/:id`
6. CandidateDetailPage displays full details

### Update (Edit Candidate)

1. User clicks "Edit" button
2. Navigate to `/candidates/:id/edit`
3. EditCandidatePage loads candidate
4. Form pre-populated with data
5. User modifies and submits
6. Call `updateCandidate()` from context
7. Navigate to detail page on success

### Delete (Remove Candidate)

1. User clicks "Delete" button
2. Confirmation dialog appears
3. User confirms deletion
4. Call `deleteCandidate()` from context
5. Context calls `deleteCandidate()` API
6. Navigate to `/candidates`

---

## 💡 Tips for Success

1. **Start with API Service**: Complete candidateApi.ts first
2. **Test API Manually**: Use Postman or curl to verify endpoints
3. **Follow Data Flow**: Context → Hook → API → Server
4. **Use React DevTools**: Monitor context state changes
5. **Check Network Tab**: Verify API calls in browser
6. **Handle Errors**: Add try-catch in components
7. **Loading States**: Consider adding loading indicators
8. **Async/Await**: Remember to await API calls

---

## 🐛 Common Issues

### Issue: API calls not working

**Solution**:

- Ensure JSON Server is running (`npm run server`)
- Check baseURL in api instance
- Verify endpoint URLs

### Issue: State not updating after CRUD

**Solution**:

- Check if context is updating candidates array
- Verify API call returns data
- Use React DevTools to inspect context

### Issue: Navigation not working

**Solution**:

- Import useNavigate, not Navigate component
- Call navigate as a function: `navigate('/path')`
- Ensure route is defined in App.tsx

### Issue: Candidate not found

**Solution**:

- Check id is being parsed as number
- Verify getCandidateById logic
- Console.log the candidate to debug

---

## 📚 API Testing Examples

### Using curl

```bash
# Get all candidates
curl http://localhost:3001/candidates

# Get one candidate
curl http://localhost:3001/candidates/1

# Create candidate
curl -X POST http://localhost:3001/candidates \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com",...}'

# Update candidate
curl -X PATCH http://localhost:3001/candidates/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"approved"}'

# Delete candidate
curl -X DELETE http://localhost:3001/candidates/1

# Search
curl http://localhost:3001/candidates?q=john

# Filter
curl http://localhost:3001/candidates?status=pending
```

---

## 🎓 Learning Objectives

By completing Phase 2, you will demonstrate:

- ✅ RESTful API integration
- ✅ Axios HTTP client usage
- ✅ React Router navigation
- ✅ URL parameters and query strings
- ✅ Global state management with Context
- ✅ Custom hooks usage
- ✅ CRUD operations
- ✅ Error handling
- ✅ Form submission and validation
- ✅ Conditional rendering patterns
- ✅ Component integration

---

## 🚀 Next Steps

After completing Phase 2:

1. Run full test suite: `npm test`
2. Test all CRUD operations manually
3. Check for console errors/warnings
4. Review code for improvements
5. Consider bonus challenges for extra credit
6. Document any issues encountered

---

**Ready to build? Start with `candidateApi.ts` TODO 1! 💪**
