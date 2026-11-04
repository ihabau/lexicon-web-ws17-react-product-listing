![Lexicon Logo](https://lexicongruppen.se/media/wi5hphtd/lexicon-logo.svg)

# React Hooks Offline Reading Guide

## Understanding `useContext` and `useReducer` Through Real Projects

This guide is the offline version of the React hooks code reading practice. It contains the same
questions and a copy of the most important code, so the whole exercise can be completed without
network access or the original demo repository.

The runnable versions of the two demos live in `hooks-demo/` on the `hooks` branch.

1. Reading existing codebases
2. Understanding architecture
3. Following state flow
4. Explaining logic clearly

---

# Learning Objectives

By the end of this exercise, you should be able to:

* Understand when and why `useContext` is used
* Understand when and why `useReducer` is used
* Read and analyze React components
* Trace data flow between components
* Explain code structure in writing
* Compare two state management approaches

---

# Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS

---

# Projects Included

## 1. AdminDashboard -> `useContext`

A dashboard UI with dark/light mode theme management using the Context API.

Files:

* `context-demo/context/ThemeContext.ts`
* `context-demo/context/ThemeProvider.tsx`
* `context-demo/hooks/useTheme.ts`
* `context-demo/Header.tsx`
* `context-demo/Sidebar.tsx`
* `context-demo/DashboardGrid.tsx`
* `context-demo/AdminDashboard.tsx`

## 2. EventManager -> `useReducer`

An event management system using reducer-based state logic.

Files:

* `reducer-demo/EventManager.tsx`
* `reducer-demo/reducer.ts`
* `reducer-demo/EventForm.tsx`
* `reducer-demo/EventList.tsx`
* `reducer-demo/EventType.ts`

---

# How to Run the Demos

The demos are on the `hooks` branch:

```bash
git checkout hooks
cd hooks-demo
npm install
npm run dev
```

Then open:

* `/?demo=context` for the theme demo
* `/?demo=reducer` for the event manager demo

---

# Part 1 - Pre-Reading Questions

Before reading the code, answer these questions briefly.

1. What problem does `useContext` solve?
    **Write your answer:**

2. What problem does `useReducer` solve?
    **Write your answer:**

3. What is the difference between local state and global state?
    **Write your answer:**

4. When would `useState` be enough?
    **Write your answer:**

5. Why is code readability important in teams?
    **Write your answer:**

---

# Project A: AdminDashboard (`useContext`)

## Code to Read

### 1. The context

`context-demo/context/ThemeContext.ts`

```ts
import { createContext } from "react";

export interface ThemeContextProps {
  isDarkMode: boolean;
  handelToggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
```

The context is created with `createContext`. The value can be `undefined`, which forces the custom
hook below to check that a provider actually exists.

### 2. The provider

`context-demo/context/ThemeProvider.tsx`

```tsx
import { type ReactNode, useState } from "react";
import { ThemeContext } from "./ThemeContext.ts";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handelToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, handelToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

The provider owns the state. Every component inside it can read the same `isDarkMode` value and call
the same `handelToggleTheme` function.

### 3. The custom hook

`context-demo/hooks/useTheme.ts`

```ts
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.ts";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeContext");
  return context;
};
```

The custom hook wraps `useContext`, gives a clear error message, and keeps the import in each
component short.

### 4. A component that consumes the context

`context-demo/Header.tsx` (theme toggle part)

```tsx
const { isDarkMode, handelToggleTheme } = useTheme();

<button onClick={() => !isDarkMode && handelToggleTheme()}>
  <Sun size={18} />
</button>
<button onClick={() => isDarkMode && handelToggleTheme()}>
  <Moon size={18} />
</button>
```

`Sidebar` and `DashboardGrid` also call `useTheme()`. They are not passed any theme props, yet they
all stay in sync.

## Tasks

Answer in writing.

1. Where is the context created?
    **Write your answer:**

2. What data is stored in the context?
    **Write your answer:**

3. What does the Provider do?
    **Write your answer:**

4. How does theme toggling work?
    **Write your answer:**

5. Why was a custom hook (`useTheme`) created?
    **Write your answer:**

6. Which components consume the context?
    **Write your answer:**

7. How does the UI change when dark mode is enabled?
    **Write your answer:**

8. Why is `useContext` better than prop drilling here?
    **Write your answer:**

---

# Project B: EventManager (`useReducer`)

## Code to Read

### 1. The state and action types

`reducer-demo/reducer.ts`

```ts
import type { EventItem } from "./EventType.ts";

export type State = {
  events: EventItem[];
  editing: EventItem | null;
  query: string;
  category: string;
  favoritesOnly: boolean;
};

export type Action =
  | { type: "ADD_EVENT"; payload: EventItem }
  | { type: "DELETE_EVENT"; payload: { id: number } }
  | { type: "TOGGLE_FAVORITE"; payload: { id: number } }
  | { type: "START_EDIT"; payload: { event: EventItem } }
  | { type: "CANCEL_EDIT" }
  | { type: "UPDATE_EVENT"; payload: EventItem }
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_FAVORITES_ONLY"; payload: boolean }
  | { type: "RESET_FILTERS" };
```

All related state lives in one object. Every change is described by a named action.

### 2. The reducer

`reducer-demo/reducer.ts`

```ts
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_EVENT":
      return { ...state, events: [action.payload, ...state.events] };
    case "DELETE_EVENT":
      return { ...state, events: state.events.filter((e) => e.id !== action.payload.id) };
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? { ...e, isFavorite: !e.isFavorite } : e,
        ),
      };
    case "START_EDIT":
      return { ...state, editing: action.payload.event };
    case "CANCEL_EDIT":
      return { ...state, editing: null };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? { ...e, ...action.payload } : e,
        ),
        editing: null,
      };
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_FAVORITES_ONLY":
      return { ...state, favoritesOnly: action.payload };
    case "RESET_FILTERS":
      return { ...state, query: "", category: "All", favoritesOnly: false };
    default:
      return state;
  }
}
```

A reducer is a pure function: same state plus same action always gives the same result. It never
touches the DOM and never calls other hooks.

### 3. Wiring the reducer to the UI

`reducer-demo/EventManager.tsx`

```tsx
const [state, dispatch] = useReducer(reducer, createInitialState(initialEvents));
const { events, editing, query, category, favoritesOnly } = state;

const handleAdd = (ev: EventItem) => dispatch({ type: "ADD_EVENT", payload: ev });
const handleDelete = (id: number) => dispatch({ type: "DELETE_EVENT", payload: { id } });
const startEdit = (ev: EventItem) => dispatch({ type: "START_EDIT", payload: { event: ev } });
const handleUpdate = (updated: EventItem) =>
  dispatch({ type: "UPDATE_EVENT", payload: updated });
const cancelEdit = () => dispatch({ type: "CANCEL_EDIT" });
```

Inputs in the UI do not change state directly. They dispatch an action, and the reducer decides
what the next state should be.

### 4. Derived state with `useMemo`

`reducer-demo/EventManager.tsx`

```tsx
const favoriteCount = useMemo(
  () => events.filter((e) => e.isFavorite).length,
  [events],
);

const filteredEvents = useMemo(() => {
  const q = query.trim().toLowerCase();
  return events.filter((e) => {
    if (favoritesOnly && !e.isFavorite) return false;
    if (category !== "All" && e.category !== category) return false;
    if (!q) return true;
    const hay = `${e.title} ${e.location} ${e.category}`.toLowerCase();
    return hay.includes(q);
  });
}, [events, query, category, favoritesOnly]);
```

`useMemo` caches a computed value and only recalculates it when the dependencies change.

## Tasks

Answer in writing.

1. What does the initial state contain?
    **Write your answer:**

2. Why is the state grouped into one object?
    **Write your answer:**

3. List all reducer action types.
    **Write your answer:**

4. What happens when `ADD_EVENT` is dispatched?
    **Write your answer:**

5. What happens when `DELETE_EVENT` is dispatched?
    **Write your answer:**

6. How does editing mode work?
    **Write your answer:**

7. How does search filtering work?
    **Write your answer:**

8. Why is `useMemo` used?
    **Write your answer:**

9. Why is `useReducer` better than many `useState`s in this project?
    **Write your answer:**

10. How does `dispatch()` connect the UI to the logic?
    **Write your answer:**

---

# Part 3 - Compare the Hooks

Complete the table.

| Topic              | useContext | useReducer |
| ------------------ | ---------- | ---------- |
| Main Purpose       |            |            |
| Best For           |            |            |
| State Type         |            |            |
| Complexity         |            |            |
| Example in Project |            |            |

---

# Optional Challenges

Choose one or more:

* Save the theme in `localStorage`
* Add event sorting
* Add event validation
* Add pagination
* Split the reducer into multiple files
* Add unit tests
* Improve accessibility

---

# Submission

Submit the completed answers with all questions written out.

If you complete optional challenges, also submit the updated project code.

---

# Final Advice

Do not rush.

Read code slowly.
Trace state carefully.
Ask "why was this built this way?"
That question turns beginners into engineers.

---

# Good Luck!

Think deeply, write clearly, and enjoy the process.
