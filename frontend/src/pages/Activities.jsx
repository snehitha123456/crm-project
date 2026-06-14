import { useState } from 'react';
import { Calendar, CheckCircle2, Clock, Mail, Phone, Video } from 'lucide-react';

const mockActivities = [
  {
    id: 1,
    type: 'meeting',
    title: 'Product Demo with TechCorp',
    description: 'Showcased the new analytics features to the enterprise team.',
    date: 'Today, 10:00 AM',
    status: 'completed',
    icon: Video,
    color: 'emerald'
  },
  {
    id: 2,
    type: 'call',
    title: 'Follow-up Call: Nexus Industries',
    description: 'Discussed pricing tiers and onboarding process.',
    date: 'Today, 2:30 PM',
    status: 'completed',
    icon: Phone,
    color: 'indigo'
  },
  {
    id: 3,
    type: 'email',
    title: 'Proposal Sent to Acme Corp',
    description: 'Sent the finalized enterprise contract for review.',
    date: 'Yesterday, 4:15 PM',
    status: 'completed',
    icon: Mail,
    color: 'violet'
  },
  {
    id: 4,
    type: 'task',
    title: 'Prepare Q3 Sales Report',
    description: 'Compile data from all regions for the quarterly review.',
    date: 'Tomorrow, 9:00 AM',
    status: 'pending',
    icon: Clock,
    color: 'amber'
  },
  {
    id: 5,
    type: 'meeting',
    title: 'Onboarding: Stark Enterprises',
    description: 'Initial kickoff meeting with the engineering team.',
    date: 'Oct 25, 11:00 AM',
    status: 'pending',
    icon: Video,
    color: 'emerald'
  }
];

const colorStyles = {
  emerald: 'bg-emerald-100 text-emerald-600 border-emerald-200',
  indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
  violet: 'bg-violet-100 text-violet-600 border-violet-200',
  amber: 'bg-amber-100 text-amber-600 border-amber-200'
};

function Activities() {
  const [filter, setFilter] = useState('all');

  const filteredActivities = mockActivities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type + 's' === filter;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-4xl font-semibold text-slate-800 mb-2">Activities</h1>
          <p className="text-slate-400">Track all your interactions, meetings, and tasks.</p>
        </div>
        <div className="flex bg-[#f1f5f9] rounded-xl p-1.5">
          {['all', 'meetings', 'calls', 'tasks'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                filter === f 
                  ? 'bg-white text-violet-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card-shadow p-10">
        <div className="relative border-l-2 border-slate-100 ml-4 space-y-12">
          {filteredActivities.length === 0 && (
            <div className="text-slate-400 pl-8 font-medium">No {filter} found.</div>
          )}
          {filteredActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="relative pl-8 sm:pl-14 group">
                {/* Timeline Node */}
                <div className={`absolute -left-[19px] top-1 w-9 h-9 rounded-full border-4 border-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${colorStyles[activity.color]}`}>
                  <Icon size={16} />
                </div>

                <div className="bg-[#fafaf9] hover:bg-white border border-transparent hover:border-slate-200 rounded-2xl p-6 transition-all hover:shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-violet-600 transition-colors">
                      {activity.title}
                    </h3>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                        <Calendar size={12} />
                        {activity.date}
                      </span>
                      {activity.status === 'completed' && (
                        <span className="text-emerald-500" title="Completed">
                          <CheckCircle2 size={18} />
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Activities;
