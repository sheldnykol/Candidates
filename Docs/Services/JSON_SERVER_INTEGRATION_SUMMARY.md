# JSON Server Integration - Summary

## ✅ Completed Tasks

### 1. Created Database File

- **File:** `db.json`
- **Location:** Project root
- **Content:** 5 sample candidates with complete data structure
- **Format:** Valid JSON with "candidates" array

### 2. Created API Service Layer

- **File:** `src/services/candidateApi.ts`
- **Functions:**
  - `fetchCandidates()` - GET all candidates
  - `fetchCandidateById(id)` - GET single candidate
  - `createCandidate(data)` - POST new candidate
  - `updateCandidate(id, updates)` - PATCH candidate
  - `deleteCandidate(id)` - DELETE candidate
  - `searchCandidates(query)` - GET with search parameter
  - `fetchCandidatesByStatus(status)` - GET with filter
- **Technology:** Native `fetch` API (no axios needed for now)
- **Error handling:** Try-catch with proper error messages

### 3. Updated Context Interface

- **File:** `src/context/candidateContext.ts`
- **Added:**
  - `loading: boolean` - Loading state
  - `error: string | null` - Error state
  - `refreshCandidates()` - Reload candidates from API
- **Changed:** All CRUD methods now return `Promise<void>`

### 4. Updated Context Provider

- **File:** `src/context/CandidateProvider.tsx`
- **Changes:**
  - ✅ Removed import of `MOCK_CANDIDATES` (mockData.ts kept as-is)
  - ✅ Added `loading` and `error` states
  - ✅ Added `useEffect` to fetch candidates on mount
  - ✅ Converted all CRUD functions to `async/await`
  - ✅ Added error handling to all API calls
  - ✅ Added `refreshCandidates()` function
  - ✅ Updated Context Provider value with new states

### 5. Updated package.json

- **Added Script:** `"server": "json-server --watch db.json --port 3001"`
- **Installed:** `json-server` as dev dependency (41 packages)

### 6. Created Documentation

- **File:** `JSON_SERVER_GUIDE.md`
- **Contents:**
  - How to start JSON Server
  - All API endpoints with examples
  - How to test with curl
  - Troubleshooting guide
  - Benefits for learning
  - Database reset instructions

## 🎯 How to Use

### Starting the Application

**Terminal 1 - JSON Server:**

```bash
npm run server
```

Runs on: http://localhost:3001

**Terminal 2 - React App:**

```bash
npm run dev
```

Runs on: http://localhost:5173

> **Important:** Both servers must be running for the app to work!

### API Endpoints Available

```
GET    http://localhost:3001/candidates          # All candidates
GET    http://localhost:3001/candidates/1        # Single candidate
GET    http://localhost:3001/candidates?status=approved  # Filter
GET    http://localhost:3001/candidates?q=sarah  # Search
POST   http://localhost:3001/candidates          # Create
PATCH  http://localhost:3001/candidates/1        # Update
DELETE http://localhost:3001/candidates/1        # Delete
```

## 📚 Teaching Points for Students

### When teaching this during Axios lesson:

1. **Show the API running:**

   - Start JSON Server first
   - Show students the endpoint in browser: http://localhost:3001/candidates
   - Explain it's a local REST API

2. **Compare with mockData.ts:**

   - Show the old `mockData.ts` file (kept as reference)
   - Explain we're now using REAL API calls instead of local data
   - Highlight the benefit: data persists across refreshes

3. **Demonstrate loading states:**

   - Show loading indicator when fetching data
   - Explain why we need loading states with real APIs

4. **Show error handling:**

   - Stop JSON Server to trigger errors
   - Show error messages to students
   - Restart server to fix

5. **DevTools Network Tab:**

   - Open browser DevTools → Network tab
   - Add/edit/delete a candidate
   - Show the HTTP requests (GET, POST, PATCH, DELETE)
   - Explain status codes (200, 201, 404, 500)

6. **Service Layer Pattern:**
   - Explain why API calls are in separate file (`candidateApi.ts`)
   - Show how Context imports and uses API functions
   - Discuss separation of concerns

## 🔍 What Changed in the Code

### Before (Mock Data):

```typescript
// CandidateProvider.tsx
const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);

const addCandidate = (candidateData: Omit<Candidate, "id">) => {
  const newCandidate = { ...candidateData, id: Date.now() };
  setCandidates((prev) => [...prev, newCandidate]);
};
```

### After (Real API):

```typescript
// CandidateProvider.tsx
const [candidates, setCandidates] = useState<Candidate[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  loadCandidates(); // Fetch from API on mount
}, []);

const addCandidate = async (candidateData: Omit<Candidate, "id">) => {
  try {
    const newCandidate = await candidateApi.createCandidate(candidateData);
    setCandidates((prev) => [...prev, newCandidate]);
  } catch (err) {
    setError("Failed to add candidate");
    throw err;
  }
};
```

## ✨ Key Benefits

1. **Realistic Training:** Students learn to work with real APIs
2. **Persistent Data:** Changes survive page refreshes (saved in db.json)
3. **Network Debugging:** Can see requests in DevTools
4. **Error Handling:** Practice handling API failures
5. **Loading States:** Learn to show loading indicators
6. **No Backend Required:** Everything runs locally
7. **Easy Reset:** Just edit db.json to restore data

## 📝 Files Modified

- ✅ `db.json` - Created
- ✅ `src/services/candidateApi.ts` - Created
- ✅ `src/context/candidateContext.ts` - Updated (added loading, error)
- ✅ `src/context/CandidateProvider.tsx` - Updated (async API calls)
- ✅ `package.json` - Updated (added script, installed json-server)
- ✅ `JSON_SERVER_GUIDE.md` - Created
- ✅ `src/utils/mockData.ts` - **Kept as-is** (per your request)

## 🚀 Ready to Teach!

Everything is set up and ready. Type check passed ✅

Next time you teach Axios, you can:

1. Show students this JSON Server setup first
2. Let them practice with native `fetch` (already implemented)
3. Then introduce Axios as an alternative (cleaner syntax)
4. Students can refactor `candidateApi.ts` to use Axios

**All CRUD operations now work with real HTTP requests!** 🎉
