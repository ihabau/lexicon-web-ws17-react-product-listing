import { Calendar, MapPin, Users, Trash2, Star, Edit } from 'lucide-react';
import type {EventItem} from "./EventType.ts";

type Props = {
  events: EventItem[];
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (event: EventItem) => void;
};

const EventList = ({ events, onToggleFavorite, onDelete, onEdit }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                event.isFavorite 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'bg-white/80 text-slate-400 hover:text-red-500 shadow-sm'
              }`}
              onClick={() => onToggleFavorite(event.id)}
            >
              <Star size={16} fill={event.isFavorite ? "currentColor" : "none"} />
            </button>
            <button
              className="p-2 rounded-full bg-white/80 text-slate-400 hover:text-red-600 shadow-sm backdrop-blur-md transition-all"
              onClick={() => onDelete(event.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="aspect-video relative overflow-hidden bg-slate-100">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-lg">
                {event.category}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 mb-3 uppercase tracking-widest">
              <Calendar size={14} />
              <span>{event.date} • {event.time}</span>
            </div>
            
            <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">
              {event.title}
            </h3>
            
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
              <MapPin size={14} className="shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>

            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">
                      U{i}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-400">
                  <Users size={12} className="inline mr-1" />
                  {event.attendees}+
                </span>
              </div>
              <button 
                className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                onClick={() => onEdit(event)}
              >
                <Edit size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
