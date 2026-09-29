import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  X,
  CheckCircle2,
  XCircle,
  FileText,
  Calendar,
  Activity,
  Heart
} from 'lucide-react';
import { initialPatients } from '../../services/mockData';
import { PatientProfile } from '../../types';

export const AdminPatients: React.FC = () => {
  const [patients, setPatients] = useState<PatientProfile[]>(initialPatients);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedPatient, setSelectedPatient] = useState<PatientProfile | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New patient state
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: 25,
    gender: 'Female' as 'Female' | 'Male' | 'Other',
    phone: '',
    email: '',
    bloodGroup: 'O+',
    address: 'Thiruvallur, Tamil Nadu'
  });

  const handleToggleStatus = (id: string) => {
    alert(`Patient status updated for ID: ${id}`);
  };

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.phone) return;

    const created: PatientProfile = {
      id: `patient-${Date.now().toString().slice(-4)}`,
      userId: `user-${Date.now().toString().slice(-4)}`,
      patientId: `CLP${Math.floor(100000 + Math.random() * 900000)}`,
      name: newPatient.name,
      dob: '2001-01-01',
      age: Number(newPatient.age),
      gender: newPatient.gender,
      phone: newPatient.phone,
      email: newPatient.email,
      bloodGroup: newPatient.bloodGroup,
      address: newPatient.address,
      height: '165 cm',
      weight: '60 kg',
      language: 'English',
      existingConditions: [],
      allergies: [],
      regularMedications: [],
      emergencyContact: {
        name: 'Family Member',
        relation: 'Spouse',
        phone: newPatient.phone
      },
      consentGiven: true
    };

    setPatients([created, ...patients]);
    setShowAddModal(false);
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Patient Management</h1>
          <p className="text-sm text-slate-500">View, monitor, and manage registered patient records across facilities</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold shadow-sm transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Patient
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by patient name, ID, or phone number..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border ${
              statusFilter === 'all' ? 'bg-sky-50 border-sky-300 text-sky-700' : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            All ({patients.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border ${
              statusFilter === 'active' ? 'bg-sky-50 border-sky-300 text-sky-700' : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            Active
          </button>
        </div>
      </div>

      {/* Patients Table (Wireframe 5) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Patient</th>
                <th className="py-3.5 px-4">Age / Gender</th>
                <th className="py-3.5 px-4">Blood Group</th>
                <th className="py-3.5 px-4">Phone Number</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No patients found matching your search.
                  </td>
                </tr>
              ) : (
                filteredPatients.map(patient => (
                  <tr key={patient.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {patient.avatarUrl ? (
                          <img src={patient.avatarUrl} alt={patient.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">
                            {patient.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-slate-800">{patient.name}</div>
                          <div className="text-xs text-slate-400">{patient.patientId || patient.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {patient.age} yrs • <span className="capitalize">{patient.gender}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-md text-xs font-bold">
                        {patient.bloodGroup}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {patient.phone}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedPatient(patient)}
                          className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                          title="View Clinical Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(patient.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
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
          <div>Showing 1 to {filteredPatients.length} of {patients.length} patients</div>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded font-semibold text-sky-600">1</button>
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-50">2</button>
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-50">3</button>
          </div>
        </div>
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">Patient Health Profile</h2>
              <button
                onClick={() => setSelectedPatient(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              {selectedPatient.avatarUrl ? (
                <img src={selectedPatient.avatarUrl} alt={selectedPatient.name} className="w-16 h-16 rounded-full object-cover border-2 border-sky-100" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-700 font-bold text-xl flex items-center justify-center">
                  {selectedPatient.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-slate-800">{selectedPatient.name}</h3>
                <p className="text-xs text-slate-500">{selectedPatient.patientId || selectedPatient.id} • {selectedPatient.age} yrs • {selectedPatient.gender}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs font-bold">
                    Blood: {selectedPatient.bloodGroup}
                  </span>
                  <span className="text-xs text-slate-500">
                    Height: {selectedPatient.height} | Weight: {selectedPatient.weight}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div className="font-semibold text-slate-700 uppercase tracking-wider text-[11px]">Contact & Address</div>
                <div className="grid grid-cols-2 gap-2">
                  <div><span className="text-slate-400">Phone:</span> {selectedPatient.phone}</div>
                  <div><span className="text-slate-400">Email:</span> {selectedPatient.email || 'N/A'}</div>
                </div>
                <div><span className="text-slate-400">Address:</span> {selectedPatient.address}</div>
                <div><span className="text-slate-400">Emergency Contact:</span> {selectedPatient.emergencyContact?.name} ({selectedPatient.emergencyContact?.relation}) - {selectedPatient.emergencyContact?.phone}</div>
              </div>

              <div className="p-3.5 bg-sky-50/50 rounded-xl space-y-2 border border-sky-100">
                <div className="font-semibold text-sky-800 uppercase tracking-wider text-[11px]">Clinical Snapshot</div>
                <div>
                  <span className="text-slate-400">Existing Conditions:</span>{' '}
                  {selectedPatient.existingConditions && selectedPatient.existingConditions.length > 0 ? (
                    <span className="font-medium text-slate-800">{selectedPatient.existingConditions.join(', ')}</span>
                  ) : (
                    <span className="text-slate-500 italic">None reported</span>
                  )}
                </div>
                <div>
                  <span className="text-slate-400">Allergies:</span>{' '}
                  {selectedPatient.allergies && selectedPatient.allergies.length > 0 ? (
                    <span className="font-medium text-rose-700">{selectedPatient.allergies.join(', ')}</span>
                  ) : (
                    <span className="text-slate-500 italic">None reported</span>
                  )}
                </div>
                <div>
                  <span className="text-slate-400">Medications:</span>{' '}
                  {selectedPatient.regularMedications && selectedPatient.regularMedications.length > 0 ? (
                    <span className="font-medium text-slate-800">{selectedPatient.regularMedications.join(', ')}</span>
                  ) : (
                    <span className="text-slate-500 italic">None</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedPatient(null)}
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">Add New Patient</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPatient} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. M. Aarthi"
                  value={newPatient.name}
                  onChange={e => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age *</label>
                  <input
                    type="number"
                    required
                    value={newPatient.age}
                    onChange={e => setNewPatient({ ...newPatient, age: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
                  <select
                    value={newPatient.bloodGroup}
                    onChange={e => setNewPatient({ ...newPatient, bloodGroup: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  value={newPatient.phone}
                  onChange={e => setNewPatient({ ...newPatient, phone: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Address / Location</label>
                <input
                  type="text"
                  placeholder="Thiruvallur, Tamil Nadu"
                  value={newPatient.address}
                  onChange={e => setNewPatient({ ...newPatient, address: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
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
                  Save Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
