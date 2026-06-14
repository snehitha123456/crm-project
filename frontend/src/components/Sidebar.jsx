import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Target, Activity, Settings } from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/customers', icon: Users, label: 'Customers' },
  { path: '/leads', icon: Target, label: 'Leads' },
  { path: '/activities', icon: Activity, label: 'Activities' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

function Sidebar() {
  return (
    <div className="w-64 bg-[#fafaf9] flex flex-col z-20 pt-8 pl-6 pr-4 border-r border-slate-200">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center shadow-md shadow-violet-500/20">
          <Target size={18} className="text-white" />
        </div>
        <span className="text-xl font-bold text-slate-800 tracking-tight">NexusCRM</span>
      </div>
      
      <div className="flex-1 flex flex-col gap-1">
        <div className="text-sm font-semibold text-slate-400 mb-4 px-3">Menu</div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-sm font-semibold group ${
                isActive
                  ? 'bg-violet-50 text-violet-700'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} className={isActive ? 'text-violet-700' : 'text-slate-400 group-hover:text-slate-600'} />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="mt-auto mb-6 px-2">
        <NavLink
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-red-500"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Logout
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
