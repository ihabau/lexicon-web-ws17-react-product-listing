import Sidebar from './Sidebar.tsx';
import Header from './Header.tsx';
import DashboardGrid from './DashboardGrid.tsx';
import {useTheme} from "./hooks/useTheme.ts";
import {ThemeProvider} from "./context/ThemeProvider.tsx";

const AdminDashboard = () => {
    return (
        <ThemeProvider>
            <AdminDashboardContent/>
        </ThemeProvider>
    );
};

const AdminDashboardContent = () => {

    const {isDarkMode} = useTheme();
    return (
        <div className={`flex min-h-screen font-sans transition-colors duration-300 ${
            isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}>
            <Sidebar/>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col">
                <Header/>
                <DashboardGrid/>
            </main>
        </div>
    );
};

export default AdminDashboard;
