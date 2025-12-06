# Test Commands Quick Reference

## Basic Commands

```bash
# Run all tests (watch mode)
npm test

# Run all tests (single run)
npm test -- --run

# Run with coverage
npm run test:coverage

# Run with UI
npm run test:ui
```

## Specific Folder

```bash
# Watch mode
npm test -- src/Components/Training-Files/week-1/day-1

# Single run
npm test -- src/Components/Training-Files/week-1/day-1 --run

# With coverage
npm test -- src/Components/Training-Files/week-1/day-1 --coverage
```

## Specific File

```bash
# Pattern matching (easiest)
npm test -- EXERCISE_01

# Full path
npm test -- src/Components/Training-Files/week-1/day-1/EXERCISE_01_BasicComponent.test.tsx

# Single run
npm test -- EXERCISE_01 --run

# With coverage
npm test -- EXERCISE_01 --coverage --run
```

## Watch Mode Commands

When tests are running in watch mode, press:

- `a` - Run all tests
- `f` - Run failed tests only
- `p` - Filter by filename
- `t` - Filter by test name
- `q` - Quit
- `h` - Help

## Recommended Workflow

**While developing:**

```bash
npm test -- EXERCISE_01
```

**Before submitting:**

```bash
npm run test:coverage
```
