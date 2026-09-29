import React, { useState } from 'react';
import {
  Send,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  X,
  Building2,
  User,
  ShieldCheck
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Referral, ReferralStatus } from '../../types';
import { StatusBadge, PriorityBadge } from '../../components/common/StatusBadge';
import { Timeline } from '../../components/common/Timeline';

export const AdminReferrals: React.FC = () => {
  const { referrals } = useData();
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  // Compute metrics
  const total = referrals.length;
  const pending = referrals.filter(r => r.status === 'Created' || r.status === 'Received').length;
  const accepted = referrals.filter(r => r.status === 'Accepted').length;
  const scheduled = referrals.filter(r => r.status === 'Scheduled').length;
  const completed = referrals.filter(r => r.status === 'Completed').length;
  const closed = referrals.filter(r => r.status === 'Closed').length;
  const escalated = referrals.filter(r => r.status === 'Escalated' || r.priority === 'High Priority' || r.priority === 'Emergency').length;

  const closureRate = total > 0 ? (((closed + completed) / total) * 100).toFixed(1) : '85.4';

  const filteredReferrals = referrals.filter(ref => {
    const matchesStatus = activeStatusFilter === 'all' || ref.status.toLowerCase() === activeStatusFilter.toLowerCase();
    const matchesPriority = priorityFilter === 'all' || ref.priority.toLowerCase() === priorityFilter.toLowerCase();
    const matchesSearch =
      (ref.referralCode || ref.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.toFacilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const getTimelineSteps = (ref: Referral) => {
    const steps: ReferralStatus[] = ['Created', 'Received', 'Accepted', 'Scheduled', 'Completed', 'Closed'];
    const labels: Record<ReferralStatus, string> = {
      Created: 'Created',
      Received: 'Received by PHC',
      Accepted: 'Accepted by Doctor',
      Scheduled: 'Scheduled',
      Completed: 'Consultation Done',
      Closed: 'Referral Closed',
      Rejected: 'Rejected',
      Escalated: 'Escalated'
    };

    const statusOrder: Record<string, number> = {
      Created: 0,
      Received: 1,
      Accepted: 2,
      Scheduled: 3,
      Completed: 4,
      Closed: 5
    };

    const currentIdx = statusOrder[ref.status] ?? 0;

    return steps.map((step, idx) => ({
      title: labels[step],
      completed: idx <= currentIdx,
      timestamp: idx <= currentIdx ? ref.createdDate : undefined
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Referral Lifecycle Monitoring</h1>
          <p className="text-sm text-slate-500">Track end-to-end referrals from ASHA field escalation to PHC doctor closure</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Total Referrals</span>
            <Send className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-800 mt-2">{total}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14% this month
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Pending Acceptance</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 mt-2">{pending}</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Avg acceptance: 1.8 hrs
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Referral Closure Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-2">{closureRate}%</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Goal target: &gt; 85%
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>High-Risk / Escalated</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-extrabold text-rose-600 mt-2">{escalated}</div>
          <div className="text-[11px] text-rose-600 font-medium mt-1">
            Immediate PHC priority
          </div>
        </div>
      </div>

      {/* Referral Funnel Visualizer */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Referral Lifecycle Stages</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl text-center">
            <div className="text-xs text-sky-700 font-semibold">1. Created</div>
            <div className="text-lg font-bold text-sky-900 mt-0.5">{total}</div>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-center">
            <div className="text-xs text-blue-700 font-semibold">2. Received</div>
            <div className="text-lg font-bold text-blue-900 mt-0.5">{total - pending > 0 ? total - pending : total}</div>
          </div>
          <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl text-center">
            <div className="text-xs text-teal-700 font-semibold">3. Accepted</div>
            <div className="text-lg font-bold text-teal-900 mt-0.5">{accepted + scheduled + completed + closed}</div>
          </div>
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-center">
            <div className="text-xs text-indigo-700 font-semibold">4. Scheduled</div>
            <div className="text-lg font-bold text-indigo-900 mt-0.5">{scheduled + completed + closed}</div>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
            <div className="text-xs text-emerald-700 font-semibold">5. Completed</div>
            <div className="text-lg font-bold text-emerald-900 mt-0.5">{completed + closed}</div>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-center">
            <div className="text-xs text-purple-700 font-semibold">6. Closed</div>
            <div className="text-lg font-bold text-purple-900 mt-0.5">{closed}</div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by referral ID, patient, facility, reason..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>
        <select
          value={activeStatusFilter}
          onChange={e => setActiveStatusFilter(e.target.value)}
          className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="created">Created</option>
          <option value="received">Received</option>
          <option value="accepted">Accepted</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="closed">Closed</option>
          <option value="escalated">Escalated</option>
        </select>
        <select
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value)}
          className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
        >
          <option value="all">All Priorities</option>
          <option value="routine">Routine</option>
          <option value="medium">Medium</option>
          <option value="high">High Priority</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      {/* Referrals Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Referral ID & Patient</th>
                <th className="py-3.5 px-4">Destination Facility</th>
                <th className="py-3.5 px-4">Clinical Reason</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredReferrals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No referrals found for selected filters.
                  </td>
                </tr>
              ) : (
                filteredReferrals.map(ref => (
                  <tr key={ref.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <div className="font-semibold text-slate-800">{ref.patientName}</div>
                        <div className="font-mono text-xs text-sky-600">{ref.id}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      <div className="font-medium text-xs">{ref.toFacilityName}</div>
                      <div className="text-[11px] text-slate-400">{ref.toDoctorName || 'Duty Medical Officer'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs max-w-xs truncate">
                      {ref.reason}
                    </td>
                    <td className="py-3.5 px-4">
                      <PriorityBadge priority={ref.priority} />
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={ref.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedReferral(ref)}
                        className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="View Lifecycle Timeline"
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

      {/* Referral Lifecycle Modal */}
      {selectedReferral && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Referral #{selectedReferral.id}</h2>
                <p className="text-xs text-slate-500">Patient: {selectedReferral.patientName}</p>
              </div>
              <button
                onClick={() => setSelectedReferral(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Details */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Priority Level:</span>
                <PriorityBadge priority={selectedReferral.priority} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Current Status:</span>
                <StatusBadge status={selectedReferral.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-semibold text-slate-800">{selectedReferral.toFacilityName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Clinical Reason:</span>
                <span className="font-semibold text-slate-800">{selectedReferral.reason}</span>
              </div>
              {selectedReferral.clinicalSummary && (
                <div className="pt-2 border-t border-slate-200">
                  <div className="font-semibold text-purple-700 mb-1">AI Triage / Clinical Context:</div>
                  <p className="text-slate-600 italic">{selectedReferral.clinicalSummary}</p>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Lifecycle History</h3>
              <Timeline steps={getTimelineSteps(selectedReferral)} />
            </div>

            <button
              onClick={() => setSelectedReferral(null)}
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
