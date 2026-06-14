import { useState } from 'react';
import { Save, Bell, Lock, User, Palette } from 'lucide-react';

function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Settings</h1>
        <p className="text-slate-500">Manage your workspace preferences and configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 space-y-2 shrink-0">
          {[
            { id: 'account', label: 'Account Profile', icon: User },
            { id: 'security', label: 'Security', icon: Lock },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'appearance', label: 'Appearance', icon: Palette },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-violet-50 text-violet-700'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Icon size={18} className={activeTab === tab.id ? 'text-violet-700' : 'text-slate-400'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 card-shadow p-8">
          
          {activeTab === 'account' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-4">Account Profile</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                  <input type="text" defaultValue="Admin" className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl py-2.5 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                  <input type="text" defaultValue="User" className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl py-2.5 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input type="email" defaultValue="admin@infobharat.com" className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl py-2.5 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Bio</label>
                  <textarea rows="3" defaultValue="Senior Sales Manager managing the APAC region." className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl py-2.5 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500"></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-700">Email Notifications</h3>
                    <p className="text-xs text-slate-500 mt-1">Receive daily summaries and critical alerts via email.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={notifications.email} onChange={(e) => setNotifications({...notifications, email: e.target.checked})} />
                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-700">Push Notifications</h3>
                    <p className="text-xs text-slate-500 mt-1">Get real-time alerts on your dashboard.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={notifications.push} onChange={(e) => setNotifications({...notifications, push: e.target.checked})} />
                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'security' || activeTab === 'appearance') && (
            <div className="space-y-6 animate-fade-in flex flex-col items-center justify-center py-12 text-slate-400">
              <Lock size={48} className="mb-4 opacity-50 text-slate-300" />
              <p>This section is under development.</p>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-md shadow-violet-500/20 transition-all flex items-center gap-2">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
