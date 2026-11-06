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
| `hooks` | Product site refactored to hooks, with a light/dark theme toggle and runnable demos in `hooks-demo/` |

### `main` branch

The original Workshop 1 solution. The shop state is passed down through props.

### `hooks` branch

The same product listing, refactored so shared state lives in hooks instead of props:

- [x] `useReducer` owns the filters, sort order, page, cart, and drawer state.
- [x] `useContext` shares the reducer state and `dispatch` through `ShopContext`.
- [x] `useMemo` caches the cart count, cart total, filtered products, sorted products, and visible page.
- [x] `useState` keeps the newsletter form state local.
- [x] `useEffect` applies and stores the selected theme.
- [x] `useShop` is a guarded custom hook for reading `ShopContext`.
- [x] `useTheme` is the visual custom hook behind the light/dark toggle.

The full hook checklist, state model, and component breakdown are in [`app/README.md`](app/README.md).

Switch to the hooks branch to run the shop:

```bash
git checkout hooks
cd app
npm install
npm run dev
```

The hook demos are a separate app:

```bash
cd hooks-demo
npm install
npm run dev
```

Open `/?demo=context` for the theme demo and `/?demo=reducer` for the event manager demo.

## Requirements

- React with Vite and TypeScript
- Tailwind CSS
- `lucide-react`
- Reusable components with props
- A clean project structure

See `React_Workshop1.md` for the full task and checklist.
See `React_Hooks_Offline.md` for the hooks reading practice.
