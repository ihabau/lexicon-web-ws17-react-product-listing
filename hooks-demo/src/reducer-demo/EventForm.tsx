import { PlusCircle, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import type {EventItem} from "./EventType.ts";

type EventFormMode = 'create' | 'edit';

type Props = {
  // Unified submit handler for both create and edit
  onSubmit: (event: EventItem) => void;
  // Mode: defaults to 'create'
  mode?: EventFormMode;
  // When editing, provide the event to prefill and preserve id/other fields
  initialEvent?: EventItem;
  // Optional cancel handler (used in edit mode or to close create form)
  onCancel?: () => void;
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb";

const EventForm = ({ onSubmit, mode = 'create', initialEvent, onCancel }: Props) => {
  // For create mode we keep the open/closed toggle UI; for edit we always show
  const [isOpen, setIsOpen] = useState(mode === 'edit');

  // Prefill values when editing; otherwise use sensible defaults
  const seed = useMemo(() => initialEvent, [initialEvent]);
  const [title, setTitle] = useState(seed?.title ?? "");
  const [category, setCategory] = useState(seed?.category ?? "Technology");
  const [location, setLocation] = useState(seed?.location ?? "");
  const [date, setDate] = useState(seed?.date ?? "");
  const [time, setTime] = useState(seed?.time ?? "");

  const resetForm = () => {
    setTitle("");
    setCategory("Technology");
    setLocation("");
    setDate("");
    setTime("");
  };

  if (mode === 'create' && !isOpen) {
    return (
      <button 
        className="mb-8 w-full py-4 border-2 border-dashed border-red-200 rounded-2xl text-red-600 font-bold hover:bg-red-50 hover:border-red-300 transition-all flex items-center justify-center gap-2 group"
        onClick={() => setIsOpen(true)}
      >
        <PlusCircle size={20} className="group-hover:scale-110 transition-transform" />
        Add New Event
      </button>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'edit' && initialEvent) {
      // Preserve immutable fields from the original event
      const updated: EventItem = {
        ...initialEvent,
        title,
        category,
        location,
        date,
        time,
      };
      onSubmit(updated);
    } else {
      const newEvent: EventItem = {
        id: Date.now(),
        title,
        category,
        location,
        date,
        time,
        attendees: 0,
        image: DEFAULT_IMAGE,
        isFavorite: false,
      };
      onSubmit(newEvent);
      resetForm();
      setIsOpen(false);
    }
  };

  return (
    <div className="mb-10 bg-white p-8 rounded-3xl border border-red-100 shadow-xl shadow-red-900/5 relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-slate-900">
          {mode === 'edit' ? (
            <>Edit <span className="text-red-600">Event</span></>
          ) : (
            <>Create <span className="text-red-600">New Event</span></>
          )}
        </h2>
        {mode === 'edit' ? (
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400" onClick={onCancel}>
            <X size={20} />
          </button>
        ) : (
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        )}
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Event Title</label>
          <input 
            type="text" 
            placeholder="e.g. React Workshop 2026"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all font-medium"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
          <select 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all font-medium appearance-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Technology</option>
            <option>Marketing</option>
            <option>Design</option>
            <option>Networking</option>
            <option>Workshop</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Location</label>
          <input 
            type="text" 
            placeholder="e.g. Stockholm City Hall"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all font-medium"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Date</label>
            <input 
              type="date" 
              placeholder="YYYY-MM-DD"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all font-medium"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Time</label>
            <input 
              type="time" 
              placeholder="HH:MM"
              step={60}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all font-medium"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
          {mode === 'edit' ? (
            <>
              <button 
                type="button"
                className="px-6 py-3 font-bold text-slate-500 hover:text-slate-700 transition-colors"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-8 py-3 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button 
                type="button"
                className="px-6 py-3 font-bold text-slate-500 hover:text-slate-700 transition-colors"
                onClick={() => { resetForm(); setIsOpen(false); onCancel?.(); }}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-8 py-3 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95"
              >
                Create Event
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventForm;
