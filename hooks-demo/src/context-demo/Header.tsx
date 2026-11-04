import {
  Bell, 
  PlusCircle, 
  Sun, 
  Moon 
} from 'lucide-react';
import {useTheme} from "./hooks/useTheme.ts";


const Header = () => {

  const { isDarkMode, handelToggleTheme } = useTheme();

  return (
    <header className={`h-20 border-b flex items-center justify-between px-8 sticky top-0 z-10 transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      <div />
      
      <div className="flex items-center gap-6">
        <div className={`flex items-center p-1 rounded-lg ${
          isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
        }`}>
          <button 
            onClick={() => !isDarkMode && handelToggleTheme()}
            className={`p-1.5 rounded-md transition-all ${
              !isDarkMode 
                ? 'bg-white shadow-sm text-slate-900' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun size={18} />
          </button>
          <button 
            onClick={() => isDarkMode && handelToggleTheme()}
            className={`p-1.5 rounded-md transition-all ${
              isDarkMode 
                ? 'bg-slate-700 shadow-sm text-white' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Moon size={18} />
          </button>
        </div>

        <button className={`relative transition-colors ${
          isDarkMode ? 'text-slate-400 hover:text-red-500' : 'text-slate-500 hover:text-red-600'
        }`}>
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full border-2 border-white text-[10px] text-white flex items-center justify-center font-bold">
            3
          </span>
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-red-900/20">
          <PlusCircle size={18} />
          Create Event
        </button>
      </div>
    </header>
  );
};

export default Header;
