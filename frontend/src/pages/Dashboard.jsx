import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Target, DollarSign, TrendingUp } from 'lucide-react';

const chartData = [
  { name: 'Jan', revenue: 4000, leads: 2400 },
  { name: 'Feb', revenue: 3000, leads: 1398 },
  { name: 'Mar', revenue: 2000, leads: 9800 },
  { name: 'Apr', revenue: 2780, leads: 3908 },
  { name: 'May', revenue: 1890, leads: 4800 },
  { name: 'Jun', revenue: 2390, leads: 3800 },
  { name: 'Jul', revenue: 3490, leads: 4300 },
];

const StatCard = ({ title, value, icon: Icon, iconColor, trend }) => (
  <div className="card-shadow p-6 flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconColor}`}>
        <Icon size={24} />
      </div>
      <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2.5 py-1 rounded-md">{trend}</span>
    </div>
    <div>
      <p className="text-slate-500 text-sm font-semibold mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
    </div>
  </div>
);

function Dashboard() {
  const handleDownload = () => {
    // Mock CSV content
    const csvContent = "data:text/csv;charset=utf-result,\nMonth,Revenue,Leads\nJan,4000,2400\nFeb,3000,1398\nMar,2000,9800\nApr,2780,3908\nMay,1890,4800\nJun,2390,3800\nJul,3490,4300";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "nexus_crm_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Dashboard</h1>
          <p className="text-slate-500 text-lg">Welcome back, here's your business overview.</p>
        </div>
        <button 
          onClick={handleDownload}
          className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-violet-500/20 transition-all"
        >
          Download Report
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Customers" value="2,543" icon={Users} iconColor="bg-indigo-100 text-indigo-600" trend="+12.5%" />
        <StatCard title="Total Leads" value="1,845" icon={Target} iconColor="bg-violet-100 text-violet-600" trend="+5.2%" />
        <StatCard title="Revenue (Mock)" value="$124,500" icon={DollarSign} iconColor="bg-emerald-100 text-emerald-600" trend="+18.2%" />
        <StatCard title="Conversion Rate" value="64.2%" icon={TrendingUp} iconColor="bg-amber-100 text-amber-600" trend="+2.4%" />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card-shadow p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue vs Leads Overview</h3>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="leads" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorLeads)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity Area */}
        <div className="card-shadow p-8 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Activity</h3>
          
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== 5 && <div className="absolute left-[19px] top-10 bottom-[-24px] w-[2px] bg-slate-100"></div>}
                <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center shrink-0 border-2 border-white shadow-sm z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-600"></div>
                </div>
                <div className="pb-2">
                  <p className="text-slate-800 text-sm font-bold">New lead assigned</p>
                  <p className="text-slate-500 text-sm mt-1">Rajesh Kumar from TechCorp assigned to Sarah.</p>
                  <span className="text-slate-400 text-xs font-semibold mt-2 block">{i * 2} hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
