import {
  Calendar, 
  Users, 
  ArrowUpRight,
  MoreVertical,
  CheckCircle2,
  Star
} from 'lucide-react';
import {useTheme} from "./hooks/useTheme.ts";


const DashboardGrid = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className={`text-3xl font-black mb-2 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Dashboard Overview
        </h1>
        <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
          Welcome back! Here's what's happening with your events today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Events", value: "42", trend: "+12%", icon: Calendar, color: "blue" },
          { label: "Total Attendees", value: "2,845", trend: "+18%", icon: Users, color: "red" },
          { label: "Active Events", value: "12", trend: "+8%", icon: CheckCircle2, color: "amber" },
          { label: "Avg. Event Rating", value: "4.8/5", trend: "+0.4", icon: Star, color: "purple" }
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl border transition-all duration-300 shadow-sm ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${
                isDarkMode 
                  ? `bg-${stat.color}-900/30 text-${stat.color}-400` 
                  : `bg-${stat.color}-50 text-${stat.color}-600`
              }`}>
                <stat.icon size={24} />
              </div>
              <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-lg ${
                isDarkMode ? 'text-emerald-400 bg-emerald-900/30' : 'text-emerald-600 bg-emerald-50'
              }`}>
                <ArrowUpRight size={14} className="mr-1" />
                {stat.trend}
              </span>
            </div>
            <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {stat.label}
            </p>
            <h3 className={`text-2xl font-black transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Registrations Table */}
        <div className={`lg:col-span-2 rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          <div className={`p-6 border-b flex items-center justify-between ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Recent Registrations</h3>
            <button className="text-red-500 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className={isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50/50'}>
                  <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Attendee</th>
                  <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Event</th>
                  <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-slate-100'}`}>
                {[
                  { name: "Sarah Jenkins", email: "sarah@example.com", event: "Tech Summit 2026", status: "Paid" },
                  { name: "Michael Chen", email: "m.chen@example.com", event: "Marketing Expo", status: "Pending" },
                  { name: "Emma Wilson", email: "emma.w@example.com", event: "AI Workshop", status: "Paid" },
                  { name: "David Miller", email: "d.miller@example.com", event: "Design Awards", status: "Paid" },
                ].map((row, i) => (
                  <tr key={i} className={`transition-colors ${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}`}>
                    <td className="px-6 py-4">
                      <div>
                        <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>{row.name}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{row.email}</p>
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{row.event}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        row.status === 'Paid' 
                          ? (isDarkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-600')
                          : (isDarkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-600')
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Events List */}
        <div className={`rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          <div className={`p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Upcoming Events</h3>
          </div>
          <div className="p-6 space-y-6">
            {[
              { title: "Tech Innovators Summit", date: "Mar 25", attendees: 1200, color: "bg-blue-600" },
              { title: "Global Marketing Expo", date: "Apr 12", attendees: 850, color: "bg-red-600" },
              { title: "Sustainable Future Forum", date: "May 05", attendees: "500", color: "bg-emerald-600" }
            ].map((event, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl ${event.color} flex flex-col items-center justify-center text-white shrink-0`}>
                  <span className="text-[10px] font-bold uppercase">{event.date.split(' ')[0]}</span>
                  <span className="text-lg font-black leading-none">{event.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-bold truncate ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>{event.title}</h4>
                  <p className={`text-xs mt-1 flex items-center gap-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    <Users size={12} /> {event.attendees} registered
                  </p>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                </div>
              </div>
            ))}
            <button className={`w-full py-3 border-2 rounded-xl text-sm font-bold transition-colors mt-2 ${
              isDarkMode 
                ? 'border-slate-800 text-slate-400 hover:bg-slate-800' 
                : 'border-slate-100 text-slate-600 hover:bg-slate-50'
            }`}>
              View Event Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;
