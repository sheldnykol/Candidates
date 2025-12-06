# API Delay Configuration for Testing Loading States

## Overview

The API service includes a configurable delay feature that simulates network latency. This is useful for testing loading indicators, spinners, and async state handling.

## How to Use

### Import the Functions

```typescript
import { setApiDelay, getApiDelay } from "./services/candidateApi";
```

### Set the Delay

```typescript
// Set 2 second delay (2000ms)
setApiDedelay(2000);

// Set 500ms delay for faster testing
setApiDelay(500);

// Disable delay (instant response)
setApiDelay(0);
```

### Check Current Delay

```typescript
const currentDelay = getApiDelay();
console.log(`Current API delay: ${currentDelay}ms`);
```

## Usage Examples

### Example 1: Test Loading Spinner in App Component

```tsx
import { useEffect } from "react";
import { setApiDelay } from "./services/candidateApi";

function App() {
  useEffect(() => {
    // Enable 2 second delay during development
    if (import.meta.env.DEV) {
      setApiDelay(2000);
    }
  }, []);

  return <div>Your App</div>;
}
```

### Example 2: Toggle Delay with DevTools Button

```tsx
import { useState } from "react";
import { setApiDelay, getApiDelay } from "./services/candidateApi";

function DevTools() {
  const [delay, setDelay] = useState(getApiDelay());

  const handleDelayChange = (newDelay: number) => {
    setApiDelay(newDelay);
    setDelay(newDelay);
  };

  return (
    <div className="dev-tools">
      <h3>API Delay Settings</h3>
      <button onClick={() => handleDelayChange(0)}>No Delay</button>
      <button onClick={() => handleDelayChange(500)}>500ms</button>
      <button onClick={() => handleDelayChange(1000)}>1s</button>
      <button onClick={() => handleDelayChange(2000)}>2s</button>
      <button onClick={() => handleDelayChange(5000)}>5s</button>
      <p>Current delay: {delay}ms</p>
    </div>
  );
}
```

### Example 3: Browser Console Testing

Open browser console and run:

```javascript
// Set 3 second delay
window.setApiDelay = (ms) => {
  // Access through your module system
  import("./services/candidateApi").then((api) => api.setApiDelay(ms));
};

// Usage
setApiDelay(3000);
```

### Example 4: Environment-Based Configuration

```typescript
// In your main.tsx or App.tsx
import { setApiDelay } from "./services/candidateApi";

// Set delay based on environment variable
const API_DELAY = import.meta.env.VITE_API_DELAY || 0;
setApiDelay(Number(API_DELAY));
```

Then in `.env.local`:

```
VITE_API_DELAY=1000
```

## Testing Scenarios

### Slow Network (3G)

```typescript
setApiDelay(3000); // 3 seconds
```

Test how your app behaves with slow connections.

### Fast Network (4G/5G)

```typescript
setApiDelay(200); // 200ms
```

Realistic fast network with small latency.

### Instant (Development)

```typescript
setApiDelay(0); // No delay
```

Fast development iteration when you don't need to test loading states.

### Very Slow Network (Edge cases)

```typescript
setApiDelay(10000); // 10 seconds
```

Test timeout handling and user frustration scenarios.

## Benefits for Students

✅ **See Loading States** - Actually see spinners and loading indicators in action  
✅ **Test Error Handling** - Combine with network throttling to test timeouts  
✅ **Understand Async** - Better understanding of async operations  
✅ **UX Testing** - Experience how users feel with slow connections  
✅ **Race Conditions** - Identify issues with rapid clicking or multiple requests

## Implementation Details

The delay is applied **before** each API call using a simple Promise-based timeout:

```typescript
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// In each API function:
if (API_DELAY_MS > 0) await delay(API_DELAY_MS);
```

This means:

- The delay happens **before** the actual HTTP request
- It simulates network latency consistently
- It's global across all API calls
- It can be changed at runtime without restarting

## Teaching Tips

1. **Start with no delay** - Show instant responses first
2. **Add 2s delay** - Let students see loading states clearly
3. **Try different values** - Show how UX changes with network speed
4. **Discuss timeouts** - When should you show error messages?
5. **Compare with real APIs** - Later compare with actual slow APIs

## Production Note

⚠️ **This feature should NOT be enabled in production!**

Always ensure the delay is set to `0` in production builds:

```typescript
if (import.meta.env.PROD) {
  setApiDelay(0);
}
```

Or better yet, use it only in development:

```typescript
if (import.meta.env.DEV) {
  setApiDelay(1000); // Only in development
}
```
