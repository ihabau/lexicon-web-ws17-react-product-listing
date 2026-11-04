import EventManager from "./reducer-demo/EventManager";
import AdminDashboard from "./context-demo/AdminDashboard";

type DemoKey = "context" | "reducer";

function getSelectedDemo(): DemoKey | null {
    const params = new URLSearchParams(window.location.search);
    const demo = params.get("demo");
    if (demo === "context" || demo === "reducer") return demo;
    return null;
}

function openDemo(demo: DemoKey) {
    const url = `${window.location.pathname}?demo=${demo}`;
    window.open(url, "_blank", "noopener,noreferrer");
}

function Landing() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-sky-50 to-cyan-50 flex items-center justify-center p-6">
            <div className="max-w-3xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                        React Hooks Demos
                    </h1>
                    <p className="text-slate-600">
                        Explore two small, focused examples. Each card opens in a new tab.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* useContext demo card */}
                    <button
                        onClick={() => openDemo("context")}
                        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white/90 p-5 text-left shadow-sm ring-1 ring-transparent transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-indigo-500/40"
                        aria-label="Open AdminDashboard (useContext) demo"
                    >
                        <div className="flex items-start gap-4">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                                {/* sun/moon icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                    <path d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm9-7a1 1 0 0 1 1 1 1 1 0 1 1-2 0 1 1 0 0 1 1-1ZM4 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm1.636-6.364a1 1 0 0 1 1.414 0l.707.707A1 1 0 1 1 6.343 7.05l-.707-.707a1 1 0 0 1 0-1.414Zm12.728 12.728a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414ZM20 3.999a1 1 0 0 1 0 1.414l-.707.707A1 1 0 0 1 17.879 4.707l.707-.707A1 1 0 0 1 20 4Zm-12.728 12.728a1 1 0 0 1 0 1.414l-.707.707A1 1 0 1 1 5.15 18.443l.707-.707a1 1 0 0 1 1.414 0Z" />
                                </svg>
                            </span>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-slate-900">AdminDashboard</span>
                                    <span className="text-indigo-600 opacity-0 transition group-hover:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                            <path d="M13.5 4.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V7.914l-7.793 7.793a1 1 0 0 1-1.414-1.414L17.586 6.5H14.5a1 1 0 0 1-1-1Z"/>
                                        </svg>
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-slate-600">useContext • Theme (Light/Dark)</p>
                                <p className="mt-1 text-xs text-slate-500">
                                    After opening, click the Light and Dark buttons in the header to test the
                                    context-driven theme switch.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">Context</span>
                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">Provider</span>
                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">Custom Hook</span>
                                </div>
                            </div>
                        </div>
                    </button>

                    {/* useReducer demo card */}
                    <button
                        onClick={() => openDemo("reducer")}
                        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white/90 p-5 text-left shadow-sm ring-1 ring-transparent transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-cyan-500/40"
                        aria-label="Open EventManager (useReducer) demo"
                    >
                        <div className="flex items-start gap-4">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                                {/* list/check icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                    <path d="M4 6.75A.75.75 0 0 1 4.75 6h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 4 6.75Zm0 4.5A.75.75 0 0 1 4.75 10.5h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 4 11.25ZM4 16.5a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 4 16.5Zm12.47-8.28a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-1.47-1.47-.72.72a.75.75 0 1 1-1.06-1.06l1.5-1.5Z" />
                                </svg>
                            </span>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-slate-900">EventManager</span>
                                    <span className="text-cyan-600 opacity-0 transition group-hover:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                            <path d="M13.5 4.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V7.914l-7.793 7.793a1 1 0 0 1-1.414-1.414L17.586 6.5H14.5a1 1 0 0 1-1-1Z"/>
                                        </svg>
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-slate-600">useReducer • Events CRUD + Filter</p>
                                <p className="mt-1 text-xs text-slate-500">
                                    After opening, add/edit/delete events and use the filter box to see
                                    the reducer update the list and derived counts.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">Reducer</span>
                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">Actions</span>
                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">Derived State</span>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>

            </div>
        </div>
    );
}

function App() {
    const selected = getSelectedDemo();

    if (selected === "context") return <AdminDashboard/>;
    if (selected === "reducer") return <EventManager/>;

    // Default landing with buttons
    return <Landing/>;
}

export default App;
