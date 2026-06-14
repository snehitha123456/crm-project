import { useState, useRef, useEffect } from 'react';
import { Outlet, Navigate, useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';

function Layout() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, title: 'New lead assigned', desc: 'Rajesh Kumar from TechCorp assigned to you.', time: '2 hours ago' },
    { id: 2, title: 'Meeting Reminder', desc: 'Product demo in 15 minutes.', time: 'Just now' }
  ]);
  
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const isAuthenticated = true;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // In a real app, clear tokens here
    navigate('/login');
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-[#fafaf9] text-slate-800 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 flex items-center justify-between px-10 z-20 relative bg-[#fafaf9]">
          <div className="flex-1"></div> {/* Spacer to push profile to right */}
          
          <div className="flex items-center gap-6">
            
            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-slate-400 hover:text-violet-600 transition-colors relative"
              >
                <Bell size={20} />
                {notificationsList.length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Notifications</h3>
                    <span className="bg-violet-100 text-violet-700 text-xs font-bold px-2 py-0.5 rounded-full">{notificationsList.length}</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto custom-scrollbar">
                    {notificationsList.length === 0 ? (
                      <div className="px-4 py-6 text-center text-slate-500 text-sm font-medium">You're all caught up!</div>
                    ) : (
                      notificationsList.map(notif => (
                        <div key={notif.id} className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50">
                          <p className="text-sm text-slate-700 font-semibold mb-0.5">{notif.title}</p>
                          <p className="text-xs text-slate-500">{notif.desc}</p>
                          <span className="text-[10px] font-bold text-violet-600 mt-1 block">{notif.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                  {notificationsList.length > 0 && (
                    <div className="px-4 py-2 border-t border-slate-100 text-center">
                      <button onClick={() => setNotificationsList([])} className="text-xs font-bold text-violet-600 hover:text-violet-700">Mark all as read</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center font-bold text-lg text-violet-700 overflow-hidden shadow-sm shadow-violet-500/10">
                  A
                </div>
                <div className="text-sm hidden sm:block">
                  <p className="font-bold text-slate-800">Admin User</p>
                  <p className="text-xs text-slate-500 font-medium">admin@infobharat.com</p>
                </div>
                <ChevronDown size={16} className={`text-slate-400 group-hover:text-violet-600 transition-all ml-1 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </div>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in">
                  <Link to="/profile" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-violet-50 hover:text-violet-700 transition-colors">
                    <User size={16} />
                    My Profile
                  </Link>
                  <Link to="/settings" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-violet-50 hover:text-violet-700 transition-colors">
                    <Settings size={16} />
                    Settings
                  </Link>
                  <div className="h-px bg-slate-100 my-1 mx-2"></div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto px-10 pb-10 z-10 relative custom-scrollbar">
          <div className="max-w-[1400px] mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
