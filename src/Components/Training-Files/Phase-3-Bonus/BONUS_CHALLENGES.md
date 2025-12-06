# 🎯 BONUS CHALLENGES - Advanced Features

Complete these bonus challenges to earn extra points and demonstrate advanced React skills!

## 🧪 Testing Your Bonus Work

A comprehensive test file is available: `bonus-challenges.test.tsx.disabled`

**To enable testing**:

```bash
mv bonus-challenges.test.tsx.disabled bonus-challenges.test.tsx
```

Then run: `npm test -- bonus-challenges`

The test file contains placeholder tests for all 10 challenges. Replace `expect(true).toBe(false)` with real implementations as you complete each challenge.

---

## 🌟 Challenge 1: Advanced Pagination (10 points)

### Current Implementation

The pagination component shows page numbers but doesn't remember the page when navigating between routes.

### Your Task

Enhance the pagination to:

1. **Persist current page in URL query parameters**
   - Use `useSearchParams` from react-router-dom
   - When page changes, update URL: `/candidates?page=2`
   - Read page from URL on component mount
2. **Add items per page selector**
   - Allow users to choose: 5, 10, 25, 50 items per page
   - Store preference in localStorage
   - Add dropdown in table header

### Implementation Hints

```tsx
// In CandidateListPage.tsx
const [searchParams, setSearchParams] = useSearchParams();
const currentPage = Number(searchParams.get("page")) || 1;

const handlePageChange = (page: number) => {
  setSearchParams({ page: page.toString() });
};
```

### Acceptance Criteria

- [ ] Page number persists in URL
- [ ] Browser back/forward buttons work correctly
- [ ] Page size selector changes items displayed
- [ ] Page size preference saves to localStorage
- [ ] All existing pagination tests still pass

---

## 🎨 Challenge 2: Dark Mode Theme Toggle (8 points)

### Your Task

Implement a theme toggle that switches between light and dark mode.

### Requirements

1. **Theme Toggle Button**

   - Add toggle button in navbar/header
   - Show sun icon for dark mode, moon icon for light mode
   - Smooth transition between themes

2. **Theme Persistence**

   - Save theme preference to localStorage
   - Apply theme on initial load
   - Respect system preference if no saved preference

3. **CSS Variables**
   - Create CSS variables for colors
   - Define light and dark color schemes

### Implementation Hints

```tsx
// In a new useTheme.ts hook
const [theme, setTheme] = useState(() => {
  const saved = localStorage.getItem("theme");
  return saved || "light";
});

useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);
```

### Acceptance Criteria

- [ ] Toggle button in header
- [ ] Smooth color transitions
- [ ] Theme persists across page reloads
- [ ] All text remains readable in both themes
- [ ] No visual glitches during transition

---

## 📊 Challenge 3: Export to CSV (7 points)

### Your Task

Add functionality to export the candidate list to CSV format.

### Requirements

1. **Export Button**

   - Add "Export to CSV" button in CandidateListPage
   - Button should be in the list header next to "Add Candidate"

2. **CSV Generation**

   - Include all candidate fields
   - Handle skills array properly (join with semicolon)
   - Format dates consistently
   - Escape special characters

3. **Download Trigger**
   - Use Blob API to create file
   - Trigger browser download
   - Filename format: `candidates_YYYY-MM-DD.csv`

### Implementation Hints

```tsx
const exportToCSV = () => {
  const headers = ['Name', 'Email', 'Position', 'Status', ...];
  const rows = filteredCandidates.map(c => [
    c.name,
    c.email,
    c.position,
    c.status,
    c.skills.join(';'),
    // ... other fields
  ]);

  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `candidates_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
};
```

### Acceptance Criteria

- [ ] Export button visible and functional
- [ ] CSV includes all relevant fields
- [ ] File downloads with correct name
- [ ] Special characters properly escaped
- [ ] Works with filtered/searched results

---

## 🔍 Challenge 4: Advanced Search & Filters (10 points)

### Your Task

Enhance the search and filter functionality with advanced options.

### Requirements

1. **Multi-field Search**

   - Search across name, email, position, skills, location
   - Highlight matching text in results
   - Show "No results" message when no matches

2. **Multiple Filters**

   - Filter by multiple statuses (checkboxes instead of dropdown)
   - Filter by experience range (min/max)
   - Filter by salary range (min/max)
   - Clear all filters button

3. **Filter Chips**
   - Show active filters as removable chips
   - Click chip to remove that filter
   - Show count of results with filters applied

### Implementation Hints

```tsx
const [filters, setFilters] = useState({
  statuses: [] as string[],
  experienceMin: 0,
  experienceMax: 999,
  salaryMin: 0,
  salaryMax: 999999,
});

const applyFilters = (candidates: Candidate[]) => {
  return candidates.filter((c) => {
    if (filters.statuses.length && !filters.statuses.includes(c.status))
      return false;
    if (
      c.experience < filters.experienceMin ||
      c.experience > filters.experienceMax
    )
      return false;
    if (
      c.yearlySalary < filters.salaryMin ||
      c.yearlySalary > filters.salaryMax
    )
      return false;
    return true;
  });
};
```

### Acceptance Criteria

- [ ] Multiple status selection works
- [ ] Range filters function correctly
- [ ] Filter chips display and remove
- [ ] Clear all filters resets everything
- [ ] URL persists active filters
- [ ] Performance remains good with many candidates

---

## 🔔 Challenge 5: Toast Notifications (6 points)

### Your Task

Implement toast notifications for user actions.

### Requirements

1. **Toast System**

   - Create a toast context/provider
   - Support success, error, warning, info types
   - Auto-dismiss after 3-5 seconds
   - Manual dismiss option

2. **Action Feedback**

   - Show success toast when candidate added
   - Show success toast when candidate updated
   - Show success toast when candidate deleted
   - Show error toast on API failures

3. **Toast Positioning**
   - Position toasts in top-right corner
   - Stack multiple toasts
   - Smooth enter/exit animations

### Implementation Hints

```tsx
// ToastContext.tsx
interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

const ToastContext = createContext<{
  showToast: (message: string, type: Toast["type"]) => void;
}>({
  showToast: () => {},
});

// Usage in component
const { showToast } = useToast();
addCandidate(data);
showToast("Candidate added successfully!", "success");
```

### Acceptance Criteria

- [ ] Toast appears on actions
- [ ] Auto-dismiss works
- [ ] Multiple toasts stack properly
- [ ] Smooth animations
- [ ] Different styles for different types
- [ ] Accessible (screen reader support)

---

## 📱 Challenge 6: Responsive Mobile Menu (5 points)

### Your Task

Make the navigation menu responsive for mobile devices.

### Requirements

1. **Hamburger Menu**

   - Show hamburger icon on screens < 768px
   - Hide full navigation menu
   - Toggle menu on icon click

2. **Mobile Menu**

   - Slide in from left or top
   - Close on route change
   - Close on outside click
   - Overlay behind menu

3. **Smooth Transitions**
   - Animate menu open/close
   - No layout shift
   - Touch-friendly button sizes

### Acceptance Criteria

- [ ] Menu works on mobile screens
- [ ] Smooth open/close animation
- [ ] Routes navigate correctly
- [ ] No horizontal scroll
- [ ] Touch targets are adequate (44x44px minimum)

---

## 🎭 Challenge 7: Candidate Avatar & Image Upload (12 points)

### Your Task

Add profile images for candidates with upload functionality.

### Requirements

1. **Image Upload**

   - Add image field to candidate form
   - Support drag & drop
   - Preview before upload
   - Validate file type (jpg, png) and size (< 2MB)

2. **Image Display**

   - Show avatar in table (small circle)
   - Show larger image in detail view
   - Default avatar for candidates without image
   - Use initials as fallback

3. **Image Storage**
   - Store as base64 in JSON Server OR
   - Upload to cloud service (bonus)
   - Handle loading states

### Implementation Hints

```tsx
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    alert("File too large");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    setPreview(reader.result as string);
  };
  reader.readAsDataURL(file);
};
```

### Acceptance Criteria

- [ ] File upload works
- [ ] Image preview displays
- [ ] File validation works
- [ ] Avatars show in table
- [ ] Default avatar for no image
- [ ] Images persist with candidate data

---

## 📈 Challenge 8: Dashboard Charts (10 points)

### Your Task

Add visual charts to the dashboard for better data visualization.

### Requirements

1. **Install Chart Library**

   - Use Recharts, Chart.js, or similar
   - Keep bundle size reasonable

2. **Charts to Implement**

   - Pie chart for status distribution
   - Bar chart for candidates by position
   - Line chart for applications over time
   - Salary distribution histogram

3. **Interactive Features**
   - Hover to see exact values
   - Click chart segment to filter
   - Responsive sizing

### Acceptance Criteria

- [ ] Charts render correctly
- [ ] Data updates dynamically
- [ ] Responsive on all screen sizes
- [ ] Loading states handled
- [ ] No console errors
- [ ] Performance remains good

---

## 🔐 Challenge 9: Form Validation Enhancement (8 points)

### Your Task

Improve form validation with real-time feedback and better UX.

### Requirements

1. **Real-time Validation**

   - Validate on blur (not on every keystroke)
   - Show checkmark for valid fields
   - Show error icon for invalid fields

2. **Enhanced Validations**

   - Phone number format validation
   - Email domain verification (check if domain exists)
   - Skills must be comma-separated
   - Interview date must be after applied date
   - Salary ranges by position (junior vs senior)

3. **Password Field** (if adding auth)
   - Password strength indicator
   - Show requirements (length, special chars)
   - Confirm password field

### Acceptance Criteria

- [ ] Validation runs on blur
- [ ] Visual indicators for field state
- [ ] All validations work correctly
- [ ] Error messages are helpful
- [ ] Form can't submit with errors
- [ ] Good user experience

---

## 🔄 Challenge 10: Undo/Redo Functionality (15 points) **[EXPERT LEVEL]**

### Your Task

Implement undo/redo for candidate operations.

### Requirements

1. **Action History**

   - Track all create, update, delete operations
   - Store previous state for undo
   - Maximum 20 actions in history

2. **Undo/Redo Buttons**

   - Add to navbar or floating action button
   - Show keyboard shortcuts (Ctrl+Z, Ctrl+Y)
   - Disable when no actions available

3. **State Management**
   - Use reducer pattern or state management library
   - Handle complex state changes
   - Maintain API sync

### Implementation Hints

```tsx
interface Action {
  type: "CREATE" | "UPDATE" | "DELETE";
  candidateId: number;
  previousState?: Candidate;
  currentState?: Candidate;
}

const [history, setHistory] = useState<Action[]>([]);
const [currentIndex, setCurrentIndex] = useState(-1);

const undo = () => {
  if (currentIndex < 0) return;
  const action = history[currentIndex];
  // Revert the action
  setCurrentIndex(currentIndex - 1);
};
```

### Acceptance Criteria

- [ ] Undo reverts last action
- [ ] Redo re-applies action
- [ ] Multiple undo/redo works
- [ ] Keyboard shortcuts work
- [ ] History persists during session
- [ ] API stays in sync
- [ ] Proper error handling

---

## 📝 Submission Checklist

When completing bonus challenges, ensure:

- [ ] Code is clean and well-commented
- [ ] All existing tests still pass
- [ ] New features have tests (if possible)
- [ ] No console errors or warnings
- [ ] README updated with new features
- [ ] Code follows project conventions
- [ ] Performance is not degraded

## 🏆 Scoring

| Challenge              | Points | Difficulty |
| ---------------------- | ------ | ---------- |
| 1. Advanced Pagination | 10     | Medium     |
| 2. Dark Mode           | 8      | Easy       |
| 3. Export CSV          | 7      | Easy       |
| 4. Advanced Search     | 10     | Medium     |
| 5. Toast Notifications | 6      | Easy       |
| 6. Mobile Menu         | 5      | Easy       |
| 7. Image Upload        | 12     | Hard       |
| 8. Dashboard Charts    | 10     | Medium     |
| 9. Form Validation     | 8      | Medium     |
| 10. Undo/Redo          | 15     | Expert     |

**Total Possible Bonus Points: 91**

Good luck! 🚀
