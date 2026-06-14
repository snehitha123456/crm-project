import { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

const mockCustomers = [
  { id: 1, name: 'Acme Corp', contact: 'John Doe', email: 'john@acme.com', phone: '+1 234 567 8900', status: 'Active' },
  { id: 2, name: 'Global Tech', contact: 'Sarah Smith', email: 'sarah@globaltech.com', phone: '+1 987 654 3210', status: 'Active' },
  { id: 3, name: 'Nexus Industries', contact: 'Michael Johnson', email: 'michael@nexus.com', phone: '+1 555 123 4567', status: 'Inactive' },
  { id: 4, name: 'Stark Enterprises', contact: 'Tony Stark', email: 'tony@stark.com', phone: '+1 800 999 8888', status: 'Active' },
  { id: 5, name: 'Wayne Corp', contact: 'Bruce Wayne', email: 'bruce@wayne.com', phone: '+1 888 777 6666', status: 'Active' },
];

function Customers() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-semibold text-slate-800 mb-2">Customers</h1>
          <p className="text-slate-400">Manage your customer database and view history.</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-violet-500/20 flex items-center gap-2 shrink-0">
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      <div className="card-shadow overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fafaf9] border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Person</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 transition-colors group bg-white">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-700">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">{customer.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">{customer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">{customer.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                      customer.status === 'Active' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-slate-400 hover:text-violet-600 transition-colors"><Edit2 size={16} /></button>
                      <button className="text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 bg-white">
          <div className="font-medium">Showing 1 to 5 of 5 entries</div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-medium disabled:opacity-50 transition-colors" disabled>Previous</button>
            <button className="px-4 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-medium disabled:opacity-50 transition-colors" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;
