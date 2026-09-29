import React, { useState } from 'react';
import {
  RotateCcw,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Building2,
  User,
  X,
  TrendingUp,
  Percent
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { FollowUp } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Timeline } from '../../components/common/Timeline';

export const AdminFollowUps: React.FC = () => {
  const { followUps } = useData();
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed' | 'missed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);

  const total = followUps.length;
  const completed = followUps.filter(f => f.status === 'Completed').length;
  const missed = followUps.filter(f => f.status === 'Missed').length;
  const upcoming = followUps.filter(f => f.status === 'Upcoming' || f.status === 'Rescheduled').length;

  const completionRate = total > 0 ? (((completed) / (completed + missed || 1)) * 100).toFixed(1) : '76.2';
  const missedRate = total > 0 ? (((missed) / (completed + missed || 1)) * 100).toFixed(1) : '23.8';

  const filteredFollowUps = followUps.filter(f => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'completed' && f.status === 'Completed') ||
      (activeTab === 'missed' && f.status === 'Missed') ||
      (activeTab === 'upcoming' && f.status === 'Upcoming');

    const matchesSearch =
      f.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.followUpCode || f.id).toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Follow-up Care Monitoring</h1>
          <p className="text-sm text-slate-500">Monitor post-consultation follow-up attendance, compliance rates, and missed patient alerts</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Total Follow-ups</span>
            <RotateCcw className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-800 mt-2">{total}</div>
          <div className="text-[11px] text-slate-500 mt-1">Across all primary facilities</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Completion Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-2">{completionRate}%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +5.4% vs last month
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Upcoming / Due</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-sky-600 mt-2">{upcoming}</div>
          <div className="text-[11px] text-slate-500 mt-1">Automated SMS / Push active</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Missed Care Rate</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold text-rose-600 mt-2">{missedRate}%</div>
          <div className="text-[11px] text-rose-600 font-medium mt-1">ASHA follow-up task triggered</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {(['all', 'upcoming', 'completed', 'missed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
              activeTab === tab
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab} Follow-ups
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by patient name, doctor, reason, or ID..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Patient</th>
                <th className="py-3.5 px-4">Doctor</th>
                <th className="py-3.5 px-4">Target Date</th>
                <th className="py-3.5 px-4">Type / Reason</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredFollowUps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No follow-ups found for this category.
                  </td>
                </tr>
              ) : (
                filteredFollowUps.map(fu => (
                  <tr key={fu.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {fu.patientName}
                      <div className="text-xs text-slate-400 font-normal">{fu.followUpCode || fu.id}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 text-xs">
                      {fu.doctorName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 text-xs">
                      <div className="font-semibold">{fu.date}</div>
                      <div className="text-slate-400">Reminder: {fu.reminderSent ? 'Sent' : 'Scheduled'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <div className="font-medium text-slate-800">{fu.reason}</div>
                      <div className="text-slate-400 capitalize">{fu.type}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={fu.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedFollowUp(fu)}
                        className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="View Lifecycle"
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
      </div>

      {/* Details Modal */}
      {selectedFollowUp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">Follow-up Lifecycle</h2>
              <button
                onClick={() => setSelectedFollowUp(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-semibold text-slate-800">{selectedFollowUp.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Doctor:</span>
                <span className="font-semibold text-slate-800">{selectedFollowUp.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Follow-up Date:</span>
                <span className="font-semibold text-slate-800">{selectedFollowUp.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Status:</span>
                <StatusBadge status={selectedFollowUp.status} />
              </div>
              {selectedFollowUp.notes && (
                <div className="pt-2 border-t border-slate-200">
                  <div className="font-semibold text-slate-700 mb-1">Clinical Instruction:</div>
                  <p className="text-slate-600 italic">{selectedFollowUp.notes}</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Lifecycle Progress</h3>
              <Timeline
                steps={[
                  { title: 'Follow-up Plan Created', completed: true, timestamp: '30 Sep 2026' },
                  { title: 'Patient Received', completed: true, timestamp: '30 Sep 2026' },
                  { title: 'Reminder Sent (SMS/Push)', completed: selectedFollowUp.reminderSent, timestamp: '06 Oct 2026' },
                  {
                    title: selectedFollowUp.status === 'Completed'
                      ? 'Patient Attended & Completed'
                      : selectedFollowUp.status === 'Missed'
                      ? 'Missed Follow-up (Alert Sent)'
                      : 'Awaiting Patient Attendance',
                    completed: selectedFollowUp.status === 'Completed' || selectedFollowUp.status === 'Missed'
                  }
                ]}
              />
            </div>

            <button
              onClick={() => setSelectedFollowUp(null)}
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
