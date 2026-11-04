import EventList from './EventList.tsx';
import EventForm from './EventForm.tsx';
import {useMemo, useEffect, useRef, useReducer, type ReactNode} from 'react';
import { reducer, createInitialState } from './reducer';
import type {EventItem} from "./EventType.ts";

function AutoScrollIntoView({ children }: { children: ReactNode }) {

  // useRef holds a mutable value that survives re-renders without causing re-renders
  // when it changes. Here we keep a reference to the wrapper <div> DOM node.
  const ref = useRef<HTMLDivElement | null>(null);

  // useEffect runs after the component mounts/updates. With an empty dependency array ([]),
  // it runs only once on mount and cleans up on unmount.
  // We schedule scrolling the wrapper into view on the next animation frame to ensure
  // the DOM is fully laid out (avoids jank or measuring before paint).
  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(id);
  }, []);
  return <div ref={ref}>{children}</div>;
}

const EventManager = () => {
  const initialEvents: EventItem[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
      category: "Technology",
      date: "2026-03-25",
      time: "09:00",
      title: "Tech Innovators Summit 2026",
      location: "Silicon Valley Convention Center",
      attendees: 1200,
      isFavorite: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
      category: "Marketing",
      date: "2026-04-12",
      time: "10:30",
      title: "Global Marketing Expo",
      location: "New York City Hall",
      attendees: 850,
      isFavorite: false
    }
  ];

  const [state, dispatch] = useReducer(reducer, createInitialState(initialEvents));
  const { events, editing, query, category, favoritesOnly } = state;

  const totalEvents = events.length;
  // useMemo caches the computed value between renders and recomputes it only when
  // its dependencies change. Here we derive the number of favorite events from the
  // current events array. This avoids re-running the filter on every render unless
  // `events` itself has changed (shallow compare of the dependency array).
  const favoriteCount = useMemo(() => events.filter(e => e.isFavorite).length, [events]);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    events.forEach(e => set.add(e.category));
    return Array.from(set);
  }, [events]);

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter(e => {
      if (favoritesOnly && !e.isFavorite) return false;
      if (category !== 'All' && e.category !== category) return false;
      if (!q) return true;
      const hay = `${e.title} ${e.location} ${e.category}`.toLowerCase();
      return hay.includes(q);
    });
  }, [events, query, category, favoritesOnly]);

  const handleAdd = (ev: EventItem) => dispatch({ type: 'ADD_EVENT', payload: ev });

  const handleToggleFavorite = (id: number) => dispatch({ type: 'TOGGLE_FAVORITE', payload: { id } });

  const handleDelete = (id: number) => dispatch({ type: 'DELETE_EVENT', payload: { id } });

  const startEdit = (ev: EventItem) => dispatch({ type: 'START_EDIT', payload: { event: ev } });

  const handleUpdate = (updated: EventItem) => dispatch({ type: 'UPDATE_EVENT', payload: updated });

  const cancelEdit = () => dispatch({ type: 'CANCEL_EDIT' });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-red-600 font-black tracking-[0.2em] uppercase text-xs mb-3 block">
              Event Management System
            </span>
            <h1 className="text-5xl font-black text-slate-900 leading-tight">
              Manage Your <span className="text-red-600 underline decoration-8 decoration-red-600/10 underline-offset-8">Events</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
             <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                <span className="block text-2xl font-black text-slate-900">{totalEvents}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Events</span>
             </div>
             <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                <span className="block text-2xl font-black text-red-600">{favoriteCount}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Favorites</span>
             </div>
          </div>
        </header>

        <EventForm onSubmit={handleAdd} />
        
        <div className="mt-12">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-black text-slate-900 whitespace-nowrap">Events</h2>
            <div className="h-[2px] w-full bg-slate-100"></div>
          </div>

          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
            <input 
              type="text" 
              placeholder="Search by title, location, category..." 
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              value={query}
              onChange={(e) => dispatch({ type: 'SET_QUERY', payload: e.target.value })}
            />
            <select 
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              value={category}
              onChange={(e) => dispatch({ type: 'SET_CATEGORY', payload: e.target.value })}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl cursor-pointer select-none">
              <input type="checkbox" checked={favoritesOnly} onChange={(e) => dispatch({ type: 'SET_FAVORITES_ONLY', payload: e.target.checked })} />
              <span className="text-sm font-semibold text-slate-700">Favorites only</span>
            </label>
            <button 
              className="px-4 py-3 bg-slate-100 rounded-xl text-slate-600 font-bold hover:bg-slate-200"
              onClick={() => dispatch({ type: 'RESET_FILTERS' })}
            >
              Reset Filters
            </button>
          </div>

          {/* Edit using the same form component */}
          {editing && (
            <AutoScrollIntoView>
              <EventForm 
                key={editing.id}
                mode="edit"
                initialEvent={editing}
                onSubmit={handleUpdate}
                onCancel={cancelEdit}
              />
            </AutoScrollIntoView>
          )}

          <EventList 
            events={filteredEvents} 
            onToggleFavorite={handleToggleFavorite} 
            onDelete={handleDelete}
            onEdit={startEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default EventManager;
