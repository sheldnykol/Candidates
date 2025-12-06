# JSON Server Setup for Candidate Management System

## Overview

This project uses **JSON Server** to provide a local REST API for the Candidate Management System. This allows students to practice working with real HTTP requests (GET, POST, PATCH, DELETE) without needing a backend server.

## Database File

The database is stored in `db.json` at the project root. It contains:

```json
{
  "candidates": [
    // Array of candidate objects
  ]
}
```

## Starting the JSON Server

### Option 1: Run manually in a separate terminal

```bash
npm run server
```

This will start JSON Server on **http://localhost:3001**

### Option 2: Run both servers at once

In one terminal:

```bash
npm run server
```

In another terminal:

```bash
npm run dev
```

> **Note:** You need to run both servers for the application to work properly!

## API Endpoints

JSON Server automatically creates RESTful endpoints based on the `db.json` structure:

### GET Requests

- `GET http://localhost:3001/candidates` - Get all candidates
- `GET http://localhost:3001/candidates/1` - Get candidate with id=1
- `GET http://localhost:3001/candidates?status=approved` - Filter by status
- `GET http://localhost:3001/candidates?q=john` - Search candidates (name, email, position)

### POST Request

- `POST http://localhost:3001/candidates` - Create new candidate
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0199",
    "position": "Frontend Developer",
    "status": "pending",
    "skills": ["React", "TypeScript"],
    "experience": 3,
    "rating": 0,
    "appliedDate": "2024-12-01",
    "interviewDate": null,
    "notes": "",
    "yearlySalary": 70000,
    "location": "Remote",
    "education": "BS Computer Science"
  }
  ```

### PATCH Request

- `PATCH http://localhost:3001/candidates/1` - Update candidate (partial)
  ```json
  {
    "status": "approved",
    "rating": 4.5
  }
  ```

### DELETE Request

- `DELETE http://localhost:3001/candidates/1` - Delete candidate with id=1

## API Service Layer

The `src/services/candidateApi.ts` file contains all API functions:

```typescript
import * as candidateApi from "../services/candidateApi";

// Fetch all candidates
const candidates = await candidateApi.fetchCandidates();

// Create new candidate
const newCandidate = await candidateApi.createCandidate(candidateData);

// Update candidate
const updated = await candidateApi.updateCandidate(id, updates);

// Delete candidate
await candidateApi.deleteCandidate(id);
```

## How the Context Uses the API

The `CandidateProvider` has been updated to:

1. **Fetch candidates on mount** - `useEffect` calls API when app loads
2. **Loading state** - Shows loading indicator while fetching data
3. **Error handling** - Displays error messages if API calls fail
4. **Async operations** - All CRUD functions now use `async/await`

Example from `CandidateProvider.tsx`:

```typescript
const addCandidate = async (candidateData: Omit<Candidate, "id">) => {
  try {
    setError(null);
    const newCandidate = await candidateApi.createCandidate(candidateData);
    setCandidates((prev) => [...prev, newCandidate]);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to add candidate");
    throw err;
  }
};
```

## Testing the API

### Using Browser DevTools

1. Open the app in browser (http://localhost:5173)
2. Open DevTools → Network tab
3. Add/edit/delete a candidate
4. See the HTTP requests in the Network tab!

### Using curl (Terminal)

```bash
# Get all candidates
curl http://localhost:3001/candidates

# Get one candidate
curl http://localhost:3001/candidates/1

# Create candidate
curl -X POST http://localhost:3001/candidates \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","position":"Developer","status":"pending"}'

# Update candidate
curl -X PATCH http://localhost:3001/candidates/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"approved"}'

# Delete candidate
curl -X DELETE http://localhost:3001/candidates/1
```

## Resetting the Database

If you mess up the data, you can restore it:

1. Stop JSON Server (Ctrl+C)
2. Edit `db.json` manually, or
3. Replace with backup data from `src/utils/mockData.ts`

## Benefits for Learning

✅ **Real API experience** - Students learn HTTP methods, status codes, async operations  
✅ **Network debugging** - See requests in DevTools Network tab  
✅ **Error handling** - Practice handling API errors gracefully  
✅ **Loading states** - Implement loading indicators for better UX  
✅ **Persistent data** - Changes persist across page refreshes  
✅ **No backend needed** - Local JSON file, no deployment required

## Troubleshooting

### Error: "Failed to fetch"

- Make sure JSON Server is running (`npm run server`)
- Check that port 3001 is not in use
- Verify `db.json` exists at project root

### Error: "EADDRINUSE"

Port 3001 is already in use. Either:

- Stop the other process using port 3001
- Change the port in `package.json`: `"server": "json-server --watch db.json --port 3002"`

### Data not persisting

JSON Server saves changes to `db.json` automatically. If changes disappear:

- Check file permissions
- Make sure you're not restarting the server (it reloads from file)

## Next Steps

Students will learn to:

1. Make API calls using native `fetch`
2. Handle loading and error states
3. Display network activity in DevTools
4. Understand REST API conventions
5. Debug API issues effectively

---

**Remember:** Always run both `npm run dev` (Vite) and `npm run server` (JSON Server) for the app to work!
