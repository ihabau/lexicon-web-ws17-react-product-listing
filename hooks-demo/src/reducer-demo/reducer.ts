import type {EventItem} from "./EventType.ts";

export type State = {
  events: EventItem[];
  editing: EventItem | null;
  query: string;
  category: string; // 'All' | other categories
  favoritesOnly: boolean;
};

export type Action =
  | { type: 'ADD_EVENT'; payload: EventItem }
  | { type: 'DELETE_EVENT'; payload: { id: number } }
  | { type: 'TOGGLE_FAVORITE'; payload: { id: number } }
  | { type: 'START_EDIT'; payload: { event: EventItem } }
  | { type: 'CANCEL_EDIT' }
  | { type: 'UPDATE_EVENT'; payload: EventItem }
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_FAVORITES_ONLY'; payload: boolean }
  | { type: 'RESET_FILTERS' };



export function createInitialState(initialEvents: EventItem[]): State {
  return {
    events: initialEvents,
    editing: null,
    query: '',
    category: 'All',
    favoritesOnly: false,
  };
}


export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_EVENT':
      return { ...state, events: [action.payload, ...state.events] };
    case 'DELETE_EVENT':
      return { ...state, events: state.events.filter(e => e.id !== action.payload.id) };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        events: state.events.map(e => (e.id === action.payload.id ? { ...e, isFavorite: !e.isFavorite } : e)),
      };
    case 'START_EDIT':
      return { ...state, editing: action.payload.event };
    case 'CANCEL_EDIT':
      return { ...state, editing: null };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(e => (e.id === action.payload.id ? { ...e, ...action.payload } : e)),
        editing: null,
      };
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_FAVORITES_ONLY':
      return { ...state, favoritesOnly: action.payload };
    case 'RESET_FILTERS':
      return { ...state, query: '', category: 'All', favoritesOnly: false };


    /**
     * If action type is unknown, return current state
     */
    default:
      return state;
  }
}
