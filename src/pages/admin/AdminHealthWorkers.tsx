import React, { useState } from 'react';
import {
  HeartHandshake,
  Search,
  Filter,
  Plus,
  Edit2,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  MapPin,
  Building2,
  Activity
} from 'lucide-react';
import { initialFacilities } from '../../services/mockData';

interface ManagedHealthWorker {
  id: string;
  name: string;
  areaZone: string;
  phone: string;
  email: string;
  phc: string;
  experienceYears: number;
  assignedHouseholds: number;
  status: 'active' | 'inactive';
  avatar?: string;
}

export const AdminHealthWorkers: React.FC = () => {
  const [healthWorkers, setHealthWorkers] = useState<ManagedHealthWorker[]>([
    {
      id: 'hw-01',
      name: 'K. Priya',
      areaZone: 'Ward 5, Thiruvallur',
      phone: '+91 9876543210',
      email: 'priya.k@healthfield.org',
      phc: 'Govt Primary Health Centre, Thiruvallur',
      experienceYears: 6,
      assignedHouseholds: 340,
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'hw-02',
      name: 'Selvi Murugan',
      areaZone: 'Ward 7, Tiruttani',
      phone: '+91 9345612345',
      email: 'selvi.m@healthfield.org',
      phc: 'Community Health Centre, Tiruttani',
      experienceYears: 4,
      assignedHouseholds: 280,
      status: 'active'
    },
    {
      id: 'hw-03',
      name: 'Anand V.',
      areaZone: 'Ward 3, Poonamallee',
      phone: '+91 9019876543',
      email: 'anand.v@healthfield.org',
      phc: 'Govt Primary Health Centre, Thiruvallur',
      experienceYears: 2,
      assignedHouseholds: 190,
      status: 'inactive'
    },
    {
      id: 'hw-04',
      name: 'Revathi S.',
      areaZone: 'Ward 1, Tiruttani',
      phone: '+91 8765432109',
      email: 'revathi.s@healthfield.org',
      phc: 'Rural Health Sub Centre, Kallupatti',
      experienceYears: 8,
      assignedHouseholds: 410,
      status: 'active'
    },
    {
      id: 'hw-05',
      name: 'Malarvizhi P.',
      areaZone: 'Ward 2, Thiruvallur',
      phone: '+91 9988076655',
      email: 'malar.p@healthfield.org',
      phc: 'Govt Primary Health Centre, Thiruvallur',
      experienceYears: 5,
      assignedHouseholds: 310,
      status: 'active'
    },
    {
      id: 'hw-06',
      name: 'Gokul Nathan',
      areaZone: 'Ward 6, Tiruttani',
      phone: '+91 9081122334',
      email: 'gokul.n@healthfield.org',
      phc: 'Community Health Centre, Tiruttani',
      experienceYears: 3,
      assignedHouseholds: 220,
      status: 'active'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHw, setSelectedHw] = useState<ManagedHealthWorker | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New HW form
  const [newHw, setNewHw] = useState({
    name: '',
    areaZone: 'Ward 4, Thiruvallur',
    phone: '',
    email: '',
    phc: 'Govt Primary Health Centre, Thiruvallur',
    experienceYears: 3,
    assignedHouseholds: 250
  });

  const toggleStatus = (id: string) => {
    setHealthWorkers(healthWorkers.map(hw =>
      hw.id === id ? { ...hw, status: hw.status === 'active' ? 'inactive' : 'active' } : hw
    ));
  };

  const handleAddHw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHw.name || !newHw.phone) return;

    const created: ManagedHealthWorker = {
      id: `hw-${Date.now().toString().slice(-4)}`,
      name: newHw.name,
      areaZone: newHw.areaZone,
      phone: newHw.phone,
      email: newHw.email || `${newHw.name.toLowerCase().replace(/[^a-z]/g, '')}@healthfield.org`,
      phc: newHw.phc,
      experienceYears: Number(newHw.experienceYears),
      assignedHouseholds: Number(newHw.assignedHouseholds),
      status: 'active'
    };

    setHealthWorkers([created, ...healthWorkers]);
    setShowAddModal(false);
  };

  const filteredHws = healthWorkers.filter(hw => {
    const matchesSearch =
      hw.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hw.areaZone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hw.phone.includes(searchQuery) ||
      hw.phc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Health Worker Management</h1>
          <p className="text-sm text-slate-500">Manage ASHA workers, ANMs, field zone assignments, and household coverage</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold shadow-sm transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Health Worker
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by health worker name, ward, phone, or PHC..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Filter className="w-4 h-4 text-slate-500" /> Filter
        </button>
      </div>

      {/* Table (Wireframe 7) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Health Worker</th>
                <th className="py-3.5 px-4">Assigned Area / Zone</th>
                <th className="py-3.5 px-4">Linked Primary Health Centre</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredHws.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No community health workers found matching query.
                  </td>
                </tr>
              ) : (
                filteredHws.map(hw => (
                  <tr key={hw.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {hw.avatar ? (
                          <img src={hw.avatar} alt={hw.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                            {hw.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-slate-800">{hw.name}</div>
                          <div className="text-xs text-slate-400">{hw.id} • {hw.experienceYears} yrs exp</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span className="font-medium text-xs">{hw.areaZone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs">
                      {hw.phc}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-700 text-xs">{hw.phone}</div>
                      <div className="text-[11px] text-slate-400">{hw.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        hw.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${hw.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        {hw.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedHw(hw)}
                          className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleStatus(hw.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            hw.status === 'active'
                              ? 'text-rose-400 hover:text-rose-600 hover:bg-rose-50'
                              : 'text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={hw.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {hw.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>Showing 1 to {filteredHws.length} of {healthWorkers.length} field workers</div>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded font-semibold text-sky-600">1</button>
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-50">2</button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedHw && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">Health Worker Profile</h2>
              <button
                onClick={() => setSelectedHw(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              {selectedHw.avatar ? (
                <img src={selectedHw.avatar} alt={selectedHw.name} className="w-16 h-16 rounded-full object-cover border-2 border-amber-100" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 font-bold text-xl flex items-center justify-center">
                  {selectedHw.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-slate-800">{selectedHw.name}</h3>
                <p className="text-xs text-slate-500">Community Health Officer / ASHA Worker</p>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" /> {selectedHw.areaZone}
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-400">Linked PHC</span>
                <span className="font-semibold text-slate-800">{selectedHw.phc}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-400">Assigned Households</span>
                <span className="font-semibold text-sky-700">{selectedHw.assignedHouseholds} Families</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-400">Field Experience</span>
                <span className="font-semibold text-slate-800">{selectedHw.experienceYears} Years</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Contact Number</span>
                <span className="font-semibold text-slate-800">{selectedHw.phone}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedHw(null)}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Health Worker Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">Add Health Worker</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddHw} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. K. Priya"
                  value={newHw.name}
                  onChange={e => setNewHw({ ...newHw, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Ward / Area *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ward 4, Thiruvallur"
                  value={newHw.areaZone}
                  onChange={e => setNewHw({ ...newHw, areaZone: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Linked Facility</label>
                <input
                  type="text"
                  value={newHw.phc}
                  onChange={e => setNewHw({ ...newHw, phc: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={newHw.phone}
                    onChange={e => setNewHw({ ...newHw, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Households</label>
                  <input
                    type="number"
                    value={newHw.assignedHouseholds}
                    onChange={e => setNewHw({ ...newHw, assignedHouseholds: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold shadow-sm"
                >
                  Register Worker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
