import {
  LayoutDashboard, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings 
} from 'lucide-react';
import {useTheme} from "./hooks/useTheme.ts";


const Sidebar = () => {
  const { isDarkMode } = useTheme();

  return (
    <aside className={`w-64 hidden md:flex flex-col transition-colors duration-300 border-r ${
      isDarkMode 
        ? 'bg-slate-950 border-slate-800 text-slate-100' 
        : 'bg-white border-slate-200 text-slate-900'
    }`}>
      <div className="p-6 flex items-center gap-3">
        <div className="bg-red-600 p-2 rounded-lg shadow-lg shadow-red-600/20">
          <Calendar size={20} className="text-white" />
        </div>
        <span className={`font-bold text-xl tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Event App</span>
      </div>
      
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 text-white font-bold shadow-md shadow-red-600/10 transition-all">
              <LayoutDashboard size={20} />
              Dashboard
            </a>
          </li>
          {[
            { icon: Calendar, label: "Events" },
            { icon: Users, label: "Attendees" },
            { icon: BarChart3, label: "Analytics" },
            { icon: Settings, label: "Settings" }
          ].map((item, i) => (
            <li key={i}>
              <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-white hover:bg-slate-900' 
                  : 'text-slate-500 hover:text-red-600 hover:bg-slate-50'
              }`}>
                <item.icon size={20} />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className={`p-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="flex items-center gap-3 p-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-red-500 text-xs ${
            isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
          }`}>
            YN
          </div>
          <div>
            <p className={`text-sm font-bold italic ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>Your Name</p>
            <p className="text-xs text-slate-500 font-medium">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
