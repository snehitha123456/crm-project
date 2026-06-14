import { useState } from 'react';
import { Plus, MoreHorizontal, X } from 'lucide-react';

const initialStages = [
  {
    id: 'new',
    title: 'New Leads',
    color: 'indigo',
    leads: [
      { id: 1, name: 'Tech Solutions Inc.', contact: 'Alice Brown', value: '$12,000' },
      { id: 2, name: 'Innovate LLC', contact: 'Charlie Davis', value: '$8,500' },
    ]
  },
  {
    id: 'contacted',
    title: 'Contacted',
    color: 'amber',
    leads: [
      { id: 3, name: 'Alpha Dynamics', contact: 'Eve White', value: '$24,000' },
    ]
  },
  {
    id: 'qualified',
    title: 'Qualified',
    color: 'purple',
    leads: [
      { id: 4, name: 'Omega Systems', contact: 'Frank Black', value: '$45,000' },
      { id: 5, name: 'Zeta Corp', contact: 'Grace Green', value: '$18,000' },
    ]
  },
  {
    id: 'converted',
    title: 'Converted',
    color: 'emerald',
    leads: [
      { id: 6, name: 'Pioneer Group', contact: 'Henry Ford', value: '$32,000' },
    ]
  }
];

const colorMap = {
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const dotColorMap = {
  indigo: 'bg-indigo-500',
  amber: 'bg-amber-500',
  purple: 'bg-purple-500',
  emerald: 'bg-emerald-500',
};

// Modal component for adding a new lead card
function AddCardModal({ stageTitle, onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', contact: '', value: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Company name is required';
    if (!form.contact.trim()) errs.contact = 'Contact person is required';
    if (!form.value.trim()) errs.value = 'Deal value is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const value = form.value.startsWith('$') ? form.value : `$${form.value}`;
    onAdd({ name: form.name, contact: form.contact, value });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md mx-4 p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold text-slate-800 mb-1">Add New Lead</h2>
        <p className="text-slate-500 text-sm mb-6">Adding to <span className="font-semibold text-violet-600">{stageTitle}</span></p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Company Name</label>
            <input
              type="text"
              placeholder="e.g. Acme Corp"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full bg-slate-50 border ${errors.name ? 'border-red-400' : 'border-slate-200'} rounded-xl py-2.5 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Contact Person</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              className={`w-full bg-slate-50 border ${errors.contact ? 'border-red-400' : 'border-slate-200'} rounded-xl py-2.5 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500`}
            />
            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Deal Value</label>
            <input
              type="text"
              placeholder="e.g. $10,000"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              className={`w-full bg-slate-50 border ${errors.value ? 'border-red-400' : 'border-slate-200'} rounded-xl py-2.5 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500`}
            />
            {errors.value && <p className="text-red-500 text-xs mt-1">{errors.value}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-md shadow-violet-500/20 transition-all">
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Leads() {
  const [stages, setStages] = useState(initialStages);
  const [modal, setModal] = useState(null); // { stageId, stageTitle }
  let nextId = 100;

  const handleAddCard = (stageId, { name, contact, value }) => {
    setStages(prev => prev.map(s =>
      s.id === stageId
        ? { ...s, leads: [...s.leads, { id: nextId++, name, contact, value }] }
        : s
    ));
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {modal && (
        <AddCardModal
          stageTitle={modal.stageTitle}
          onClose={() => setModal(null)}
          onAdd={(data) => handleAddCard(modal.stageId, data)}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2 shrink-0">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Sales Pipeline</h1>
          <p className="text-slate-400">Track and manage your deals across stages.</p>
        </div>
        <button
          onClick={() => setModal({ stageId: 'new', stageTitle: 'New Leads' })}
          className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-violet-500/20 flex items-center gap-2 shrink-0"
        >
          <Plus size={18} />
          New Lead
        </button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4 mt-6">
        <div className="flex gap-6 h-full min-w-max items-start">
          {stages.map((stage) => (
            <div key={stage.id} className="w-80 flex flex-col h-full max-h-[calc(100vh-200px)]">
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${colorMap[stage.color]}`}>
                  <div className={`w-2 h-2 rounded-full ${dotColorMap[stage.color]}`}></div>
                  <span className="font-bold text-sm tracking-wide">{stage.title}</span>
                  <span className="ml-2 bg-white/50 px-2 py-0.5 rounded-md text-xs font-bold">{stage.leads.length}</span>
                </div>
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {stage.leads.map((lead) => (
                  <div key={lead.id} className="card-shadow p-5 hover:-translate-y-1 transition-transform cursor-pointer group border border-transparent hover:border-violet-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-800 group-hover:text-violet-600 transition-colors">{lead.name}</h4>
                      <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded">{lead.value}</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-4">{lead.contact}</p>
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-full bg-violet-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-violet-700">
                        {lead.contact.charAt(0)}
                      </div>
                      <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">2 days ago</span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setModal({ stageId: stage.id, stageTitle: stage.title })}
                  className="w-full py-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 font-bold hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Add Card
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leads;
