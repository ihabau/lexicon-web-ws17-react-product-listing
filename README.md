# Workshop 1 - ReactJS (Components & Props)

Build a React app that recreates the layout in [`index.html`](index.html).

## Files

| File | Description |
| :--- | :---------- |
| `React_Workshop1.md` | The workshop assignment and submission checklist |
| `ReactJS_Presentation.md` | The ReactJS lesson presentation |
| `React_Hooks_Offline.md` | Offline reading guide for `useContext` and `useReducer` |
| `index.html` | The visual reference for the product listing page |

## Branches

| Branch | Contents |
| :----- | :------- |
| `main` | Workshop 1 solution built with components and props |
| `hooks` | Product site refactored to `useContext`, `useReducer`, and `useMemo`, with a visible light/dark theme hook and runnable demos in `hooks-demo/` |

Switch to the hooks branch to run the demos:

```bash
git checkout hooks
cd hooks-demo
npm install
npm run dev
```

Open `/?demo=context` for the theme demo and `/?demo=reducer` for the event manager demo.

The shop app on this branch is documented in [`app/README.md`](app/README.md).

## Requirements

- React with Vite and TypeScript
- Tailwind CSS
- `lucide-react`
- Reusable components with props
- A clean project structure

See `React_Workshop1.md` for the full task and checklist.
See `React_Hooks_Offline.md` for the hooks reading practice.
