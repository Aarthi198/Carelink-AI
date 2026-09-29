import React, { useState } from 'react';
import {
  Stethoscope,
  Search,
  Filter,
  Plus,
  Edit2,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  Building2,
  Star,
  Award
} from 'lucide-react';
import { initialDoctors, initialFacilities } from '../../services/mockData';
import { Doctor } from '../../types';

export const AdminDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [searchQuery, setSearchQuery] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Status mapping
  const [activeStatusMap, setActiveStatusMap] = useState<Record<string, boolean>>({
    'doc-01': true,
    'doc-02': true,
    'doc-03': true,
    'doc-04': false
  });

  // New Doctor form
  const [newDoc, setNewDoc] = useState({
    name: '',
    specialization: 'General Physician',
    qualification: 'MBBS, MD',
    phone: '',
    email: '',
    facilityId: initialFacilities[0].id,
    experienceYears: 8,
    consultationFee: 200
  });

  const toggleStatus = (id: string) => {
    setActiveStatusMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.name || !newDoc.phone) return;

    const facility = initialFacilities.find(f => f.id === newDoc.facilityId) || initialFacilities[0];

    const created: Doctor = {
      id: `doc-${Date.now().toString().slice(-4)}`,
      name: newDoc.name,
      specialty: newDoc.specialization,
      qualifications: newDoc.qualification,
      experienceYears: Number(newDoc.experienceYears),
      facilityId: facility.id,
      facilityName: facility.name,
      rating: 4.8,
      reviewsCount: 12,
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      availableDates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      availableTimeSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'],
      consultationFee: Number(newDoc.consultationFee),
      phone: newDoc.phone,
      email: newDoc.email || `${newDoc.name.toLowerCase().replace(/[^a-z]/g, '')}@carelink.in`,
      status: 'Active'
    };

    setDoctors([created, ...doctors]);
    setActiveStatusMap(prev => ({ ...prev, [created.id]: true }));
    setShowAddModal(false);
  };

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.specialty || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.facilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.phone.includes(searchQuery);
    const matchesSpec = specializationFilter === 'all' || doc.specialty === specializationFilter;
    return matchesSearch && matchesSpec;
  });

  const specializations = Array.from(new Set(doctors.map(d => d.specialty).filter(Boolean)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Doctor Management</h1>
          <p className="text-sm text-slate-500">Manage clinical staff, specializations, verified credentials, and roster</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold shadow-sm transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Doctor
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by doctor name, specialization, facility..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={specializationFilter}
            onChange={e => setSpecializationFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">All Specializations</option>
            {specializations.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table (Wireframe 6) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Doctor</th>
                <th className="py-3.5 px-4">Specialization</th>
                <th className="py-3.5 px-4">Assigned Facility</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No doctors found matching your query.
                  </td>
                </tr>
              ) : (
                filteredDoctors.map(doc => {
                  const isActive = activeStatusMap[doc.id] !== false;
                  return (
                    <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {doc.avatarUrl ? (
                            <img src={doc.avatarUrl} alt={doc.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                              {doc.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-slate-800">{doc.name}</div>
                            <div className="text-xs text-slate-400">{doc.qualifications} • {doc.experienceYears} yrs exp</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-100">
                          <Stethoscope className="w-3 h-3" />
                          {doc.specialty}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium text-xs">{doc.facilityName}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-700 text-xs">{doc.phone}</div>
                        <div className="text-[11px] text-slate-400">{doc.email}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedDoctor(doc)}
                            className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleStatus(doc.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isActive
                                ? 'text-rose-400 hover:text-rose-600 hover:bg-rose-50'
                                : 'text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50'
                            }`}
                            title={isActive ? 'Deactivate Doctor' : 'Activate Doctor'}
                          >
                            {isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>Showing 1 to {filteredDoctors.length} of {doctors.length} doctors</div>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded font-semibold text-sky-600">1</button>
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-50">2</button>
          </div>
        </div>
      </div>

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">Doctor Credentials</h2>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              {selectedDoctor.avatarUrl ? (
                <img src={selectedDoctor.avatarUrl} alt={selectedDoctor.name} className="w-16 h-16 rounded-full object-cover border-2 border-teal-100" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 font-bold text-xl flex items-center justify-center">
                  {selectedDoctor.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-slate-800">{selectedDoctor.name}</h3>
                <p className="text-xs text-slate-500">{selectedDoctor.qualifications} • {selectedDoctor.specialty}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-amber-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {selectedDoctor.rating} ({selectedDoctor.reviewsCount} reviews)
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-400">Assigned Facility</span>
                <span className="font-semibold text-slate-800">{selectedDoctor.facilityName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-400">Experience</span>
                <span className="font-semibold text-slate-800">{selectedDoctor.experienceYears} Years</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-400">Consultation Fee</span>
                <span className="font-semibold text-emerald-600">₹{selectedDoctor.consultationFee} (Govt Subsidized)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-400">Time Slots</span>
                <span className="font-semibold text-slate-800">{selectedDoctor.availableTimeSlots?.join(', ')}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Available Days</span>
                <span className="font-semibold text-slate-800">{selectedDoctor.availableDates?.join(', ')}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedDoctor(null)}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">Add New Doctor</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDoctor} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Doctor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. R. Lakshmi"
                  value={newDoc.name}
                  onChange={e => setNewDoc({ ...newDoc, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    required
                    value={newDoc.specialization}
                    onChange={e => setNewDoc({ ...newDoc, specialization: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Qualifications</label>
                  <input
                    type="text"
                    required
                    value={newDoc.qualification}
                    onChange={e => setNewDoc({ ...newDoc, qualification: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Facility</label>
                <select
                  value={newDoc.facilityId}
                  onChange={e => setNewDoc({ ...newDoc, facilityId: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  {initialFacilities.map(f => (
                    <option key={f.id} value={f.id}>{f.name} ({f.type.toUpperCase()})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9012345678"
                    value={newDoc.phone}
                    onChange={e => setNewDoc({ ...newDoc, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fee (₹)</label>
                  <input
                    type="number"
                    value={newDoc.consultationFee}
                    onChange={e => setNewDoc({ ...newDoc, consultationFee: Number(e.target.value) })}
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
                  Register Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
