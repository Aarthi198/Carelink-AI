import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  X,
  Building2,
  Stethoscope,
  User as UserIcon
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Appointment, AppointmentStatus } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';

export const AdminAppointments: React.FC = () => {
  const { appointments } = useData();
  const [activeTab, setActiveTab] = useState<'All' | AppointmentStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const filteredAppointments = appointments.filter(apt => {
    const matchesTab = activeTab === 'All' || apt.status === activeTab;
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.facilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusCount = (status: AppointmentStatus | 'All') => {
    if (status === 'All') return appointments.length;
    return appointments.filter(a => a.status === status).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Appointment Management</h1>
          <p className="text-sm text-slate-500">Monitor all scheduled, pending, completed, and teleconsultation bookings</p>
        </div>
      </div>

      {/* Tabs (Wireframe 9) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {(['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
              activeTab === tab
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab}
            <span className="ml-1.5 opacity-75 text-xs">({getStatusCount(tab)})</span>
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by patient, doctor, facility, or appointment ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Filter className="w-4 h-4 text-slate-500" /> Filter by Date
        </button>
      </div>

      {/* Appointments Table (Wireframe 9) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Patient</th>
                <th className="py-3.5 px-4">Doctor & Facility</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Type / Reason</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No appointments found for the selected view.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map(apt => (
                  <tr key={apt.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">
                          {apt.patientName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{apt.patientName}</div>
                          <div className="text-xs text-slate-400">{apt.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800 text-xs">{apt.doctorName}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3" />
                        <span className="truncate max-w-[180px]">{apt.facilityName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-700 text-xs">{apt.date}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5" /> {apt.time}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-700 text-xs">{apt.reason}</div>
                      <div className="text-[11px] text-slate-400 capitalize">{apt.type} consultation</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={apt.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedAppointment(apt)}
                        className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>Showing 1 to {filteredAppointments.length} of {appointments.length} appointments</div>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded font-semibold text-sky-600">1</button>
            <button className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-50">2</button>
          </div>
        </div>
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">Appointment Overview</h2>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-100 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-sky-200/50">
                <span className="font-semibold text-sky-800">Booking ID</span>
                <span className="font-mono font-bold text-sky-900">{selectedAppointment.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-semibold text-slate-800">{selectedAppointment.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Doctor:</span>
                <span className="font-semibold text-slate-800">{selectedAppointment.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Facility:</span>
                <span className="font-semibold text-slate-800">{selectedAppointment.facilityName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled:</span>
                <span className="font-semibold text-slate-800">{selectedAppointment.date} at {selectedAppointment.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Reason:</span>
                <span className="font-semibold text-slate-800">{selectedAppointment.reason}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-sky-200/50 items-center">
                <span className="text-slate-500">Status:</span>
                <StatusBadge status={selectedAppointment.status} />
              </div>
            </div>

            <button
              onClick={() => setSelectedAppointment(null)}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
