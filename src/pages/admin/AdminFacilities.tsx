import React, { useState } from 'react';
import {
  Building2,
  Search,
  Filter,
  Plus,
  Edit2,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  MapPin,
  Clock,
  Phone,
  Stethoscope,
  Star
} from 'lucide-react';
import { initialFacilities } from '../../services/mockData';
import { Facility } from '../../types';

export const AdminFacilities: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Status mapping
  const [activeStatusMap, setActiveStatusMap] = useState<Record<string, boolean>>({
    'fac-01': true,
    'fac-02': true,
    'fac-03': true,
    'fac-04': false
  });

  // New facility form
  const [newFac, setNewFac] = useState({
    name: '',
    type: 'phc' as const,
    location: 'Thiruvallur, Tamil Nadu',
    address: 'Near Bus Stand, Thiruvallur, Tamil Nadu',
    contactNumber: '+91 44 2766 1234',
    openHours: 'Mon - Sat: 8:00 AM - 2:00 PM',
    services: ['General Physician', 'Pharmacy', 'Lab Tests']
  });

  const toggleStatus = (id: string) => {
    setActiveStatusMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFac.name) return;

    const created: Facility = {
      id: `fac-${Date.now().toString().slice(-4)}`,
      name: newFac.name,
      type: newFac.type,
      category: 'Government',
      verified: true,
      distance: '3.5 km',
      travelTime: '15 mins',
      rating: 4.5,
      reviewsCount: 40,
      address: newFac.address,
      phone: newFac.contactNumber,
      openingHours: newFac.openHours,
      timings: newFac.openHours,
      services: newFac.services,
      appointmentAvailability: 'Available Today',
      imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&auto=format&fit=crop&q=80',
      doctorsCount: 4,
      emergencyAvailable: true,
      status: 'Active',
      lat: 13.143,
      lng: 79.907
    };

    setFacilities([created, ...facilities]);
    setActiveStatusMap(prev => ({ ...prev, [created.id]: true }));
    setShowAddModal(false);
  };

  const filteredFacilities = facilities.filter(fac => {
    const matchesSearch =
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || fac.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getFacilityTypeBadge = (type: string) => {
    switch (type) {
      case 'phc':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">PHC</span>;
      case 'hospital':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">Hospital</span>;
      case 'clinic':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">Clinic</span>;
      case 'sub_centre':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">Sub Centre</span>;
      case 'specialist':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">Specialist</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 uppercase">{type}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Healthcare Facilities</h1>
          <p className="text-sm text-slate-500">Manage PHCs, CHCs, Hospitals, Sub-Centres, service offerings and operational rosters</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold shadow-sm transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Facility
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search facilities by name, location, or services..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">All Facility Types</option>
            <option value="phc">PHC (Primary Health Centre)</option>
            <option value="hospital">Hospital / General Care</option>
            <option value="clinic">Clinic</option>
            <option value="sub_centre">Sub Centre</option>
          </select>
        </div>
      </div>

      {/* Facility Table (Wireframe 8) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Facility Name</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Location / Address</th>
                <th className="py-3.5 px-4">Operational Timings</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredFacilities.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No facilities found.
                  </td>
                </tr>
              ) : (
                filteredFacilities.map(fac => {
                  const isActive = activeStatusMap[fac.id] !== false;
                  return (
                    <tr key={fac.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 font-bold">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{fac.name}</div>
                            <div className="text-xs text-amber-600 flex items-center gap-1 font-medium">
                              <Star className="w-3 h-3 fill-amber-400" /> {fac.rating} ({fac.reviewsCount} reviews)
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {getFacilityTypeBadge(fac.type)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-xs max-w-xs truncate">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{fac.address}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{fac.openingHours || fac.timings}</span>
                        </div>
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
                            onClick={() => setSelectedFacility(fac)}
                            className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                            title="View Facility"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleStatus(fac.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isActive
                                ? 'text-rose-400 hover:text-rose-600 hover:bg-rose-50'
                                : 'text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50'
                            }`}
                            title={isActive ? 'Deactivate' : 'Activate'}
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
          <div>Showing 1 to {filteredFacilities.length} of {facilities.length} healthcare facilities</div>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded font-semibold text-sky-600">1</button>
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-50">2</button>
          </div>
        </div>
      </div>

      {/* Facility Details Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">Facility Details</h2>
              <button
                onClick={() => setSelectedFacility(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">{selectedFacility.name}</h3>
                {getFacilityTypeBadge(selectedFacility.type)}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{selectedFacility.address}</p>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div className="font-semibold text-slate-700 uppercase tracking-wider text-[11px]">Operations & Contact</div>
                <div><span className="text-slate-400">Timings:</span> {selectedFacility.openingHours || selectedFacility.timings}</div>
                <div><span className="text-slate-400">Helpline:</span> {selectedFacility.phone}</div>
                <div><span className="text-slate-400">Distance from Town Centre:</span> {selectedFacility.distance} ({selectedFacility.travelTime})</div>
              </div>

              <div className="p-3.5 bg-sky-50/50 rounded-xl space-y-2 border border-sky-100">
                <div className="font-semibold text-sky-800 uppercase tracking-wider text-[11px]">Available Services & Wings</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFacility.services.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white border border-sky-200 text-sky-800 rounded-lg font-medium text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedFacility(null)}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Facility Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">Add Healthcare Facility</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFacility} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Facility Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Government Primary Health Centre, Thiruvallur"
                  value={newFac.name}
                  onChange={e => setNewFac({ ...newFac, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Facility Type</label>
                  <select
                    value={newFac.type}
                    onChange={e => setNewFac({ ...newFac, type: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="phc">PHC (Primary Health Centre)</option>
                    <option value="hospital">Hospital</option>
                    <option value="clinic">Clinic</option>
                    <option value="sub_centre">Sub Centre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    value={newFac.contactNumber}
                    onChange={e => setNewFac({ ...newFac, contactNumber: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Address / Location *</label>
                <input
                  type="text"
                  required
                  placeholder="Street address, district, state"
                  value={newFac.address}
                  onChange={e => setNewFac({ ...newFac, address: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Operating Hours</label>
                <input
                  type="text"
                  placeholder="e.g. Mon - Sat: 8:00 AM - 2:00 PM"
                  value={newFac.openHours}
                  onChange={e => setNewFac({ ...newFac, openHours: e.target.value })}
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
                  Create Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
