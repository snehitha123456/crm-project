import { User, Mail, Phone, MapPin, Building, Shield } from 'lucide-react';

function Profile() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">My Profile</h1>
          <p className="text-slate-500">Manage your personal information and account settings.</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-violet-500/20 transition-all">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Avatar & Quick Info */}
        <div className="card-shadow p-8 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-violet-100 flex items-center justify-center font-bold text-5xl text-violet-700 shadow-inner mb-6 border-4 border-white outline outline-1 outline-slate-100">
            A
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Admin User</h2>
          <p className="text-slate-500 font-medium mb-4">Senior Sales Manager</p>
          
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold border border-emerald-200">
            <Shield size={14} />
            Administrator
          </div>
        </div>

        {/* Right Column - Details Form */}
        <div className="md:col-span-2 card-shadow p-8">
          <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Personal Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
              <div className="flex items-center gap-3 text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                <User size={18} className="text-slate-400" />
                Admin User
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
              <div className="flex items-center gap-3 text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Mail size={18} className="text-slate-400" />
                admin@infobharat.com
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
              <div className="flex items-center gap-3 text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Phone size={18} className="text-slate-400" />
                +91 98765 43210
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Department</label>
              <div className="flex items-center gap-3 text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Building size={18} className="text-slate-400" />
                Sales & Marketing
              </div>
            </div>
            
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</label>
              <div className="flex items-center gap-3 text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                <MapPin size={18} className="text-slate-400" />
                Bangalore, India
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
