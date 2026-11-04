![Lexicon Logo](https://lexicongruppen.se/media/wi5hphtd/lexicon-logo.svg)

# React Hooks Code Reading Practice

## Understanding `useContext` and `useReducer` Through Real Projects

Your goal is not only to run the projects, but to **read code like a developer**, understand how state management works,
and explain your findings in writing.

1. Reading existing codebases  
2. Understanding architecture  
3. Following state flow  
4. Explaining logic clearly  

---

# 🎯 Learning Objectives

By the end of this project, you should be able to:

* Understand when and why `useContext` is used
* Understand when and why `useReducer` is used
* Read and analyze React components
* Trace data flow between components
* Explain code structure in writing
* Compare two state management approaches

---

# 🛠 Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS

---

# 📂 Projects Included

## 1️⃣ AdminDashboard → `useContext`

A dashboard UI with dark/light mode theme management using Context API.

## 2️⃣ EventManager → `useReducer`

An event management system using reducer-based state logic.

---

# 🚀 Getting Started

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

---

# Part 1 — Pre-Reading Questions

Before reading the code, answer these questions briefly **inside this README file** under each question.  

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

Study the files related to:

* ThemeContext
* ThemeProvider
* useTheme
* Header
* Sidebar
* DashboardGrid
* AdminDashboard

---

## Tasks

Write your answers **inside this README file**.  

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

7. How does UI change when dark mode is enabled?  
    **Write your answer:**

8. Why is `useContext` better than prop drilling here?  
    **Write your answer:**

---

# Project B: EventManager (`useReducer`)

Study the files related to:

* EventManager
* reducer.ts
* EventForm
* EventList
* EventType

---

## Tasks

Write your answers **inside this README file**.

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

10. How does `dispatch()` connect UI to logic?  
     **Write your answer:**

---

# Part 3 — Compare the Hooks

Complete the table:

| Topic              | useContext | useReducer |
|--------------------|------------|------------|
| Main Purpose       |            |            |
| Best For           |            |            |
| State Type         |            |            |
| Complexity         |            |            |
| Example in Project |            |            |

---

# Optional  Challenges

Choose one or more:

* Save theme in localStorage
* Add event sorting
* Add event validation
* Add pagination
* Split reducer into multiple files
* Add unit tests
* Improve accessibility

---

# Submission

Submit the **completed README.md file** with all answers written inside it.

If you complete optional challenges, also submit your updated project code.

---

# Final Advice

Do not rush.

Read code slowly.  
Trace state carefully.  
Ask “why was this built this way?”  
That question turns beginners into engineers.  

---

# 🚀 Good Luck!

Think deeply, write clearly, and enjoy the process.
