import React, { useState } from 'react';
import {
  FlaskConical,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  User,
  X,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Investigation, InvestigationStatus } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Timeline } from '../../components/common/Timeline';

export const AdminInvestigations: React.FC = () => {
  const { investigations } = useData();
  const [activeTab, setActiveTab] = useState<'all' | InvestigationStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvestigation, setSelectedInvestigation] = useState<Investigation | null>(null);

  const total = investigations.length;
  const pendingReview = investigations.filter(i => i.status === 'Result Available').length;
  const notified = investigations.filter(i => i.status === 'Patient Notified' || i.status === 'Doctor Reviewed').length;
  const inProgress = investigations.filter(i => i.status === 'Ordered' || i.status === 'Sample Collected' || i.status === 'Processing').length;

  const filteredInvestigations = investigations.filter(inv => {
    const matchesTab = activeTab === 'all' || inv.status === activeTab;
    const matchesSearch =
      inv.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Lab & Investigation Monitoring</h1>
          <p className="text-sm text-slate-500">Track diagnostic orders, processing TAT, doctor review verification, and patient notification</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Total Lab Orders</span>
            <FlaskConical className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-800 mt-2">{total}</div>
          <div className="text-[11px] text-slate-500 mt-1">Across 4 district PHCs</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Awaiting Doctor Review</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 mt-2">{pendingReview}</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">Lab ready, pending MD sign-off</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Reviewed & Closed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-2">{notified}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">100% patients notified</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Avg Lab Turnaround</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-sky-600 mt-2">14.2 hrs</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> -2.4 hrs vs target
          </div>
        </div>
      </div>

      {/* Lifecycle Stage Filter */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {(['all', 'Ordered', 'Sample Collected', 'Processing', 'Result Available', 'Doctor Reviewed', 'Patient Notified'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === tab
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by test name, patient, doctor, or ID..."
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
                <th className="py-3.5 px-4">Test Name & ID</th>
                <th className="py-3.5 px-4">Patient</th>
                <th className="py-3.5 px-4">Ordering Doctor</th>
                <th className="py-3.5 px-4">Ordered At</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredInvestigations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No investigation records found.
                  </td>
                </tr>
              ) : (
                filteredInvestigations.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{inv.testName}</div>
                      <div className="font-mono text-xs text-sky-600">{inv.id}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {inv.patientName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs">
                      {inv.doctorName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs">
                      {inv.orderedDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={inv.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedInvestigation(inv)}
                        className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="View Report & Lifecycle"
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

      {/* Investigation Details Modal */}
      {selectedInvestigation && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-800">{selectedInvestigation.testName}</h2>
                <p className="text-xs text-slate-500">ID: {selectedInvestigation.id} • Patient: {selectedInvestigation.patientName}</p>
              </div>
              <button
                onClick={() => setSelectedInvestigation(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Test Status and Values */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Status:</span>
                <StatusBadge status={selectedInvestigation.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ordering Doctor:</span>
                <span className="font-semibold text-slate-800">{selectedInvestigation.doctorName}</span>
              </div>

              {selectedInvestigation.labValues && selectedInvestigation.labValues.length > 0 && (
                <div className="pt-2 border-t border-slate-200">
                  <div className="font-semibold text-slate-700 mb-2">Lab Parameters:</div>
                  <div className="space-y-1">
                    {selectedInvestigation.labValues.map((lv, idx) => (
                      <div key={idx} className="flex justify-between p-1.5 bg-white rounded border border-slate-200">
                        <span className="font-medium text-slate-700">{lv.parameter}</span>
                        <span className={`font-bold ${lv.status === 'High' || lv.status === 'Abnormal' ? 'text-rose-600' : 'text-slate-800'}`}>
                          {lv.value} {lv.unit} (Ref: {lv.referenceRange})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedInvestigation.doctorInterpretation && (
                <div className="pt-2 border-t border-slate-200">
                  <div className="font-semibold text-emerald-700 mb-1">Doctor Interpretation:</div>
                  <p className="text-slate-600 italic">{selectedInvestigation.doctorInterpretation}</p>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Diagnostic Workflow</h3>
              <Timeline
                steps={[
                  { title: 'Lab Order Placed', completed: true, timestamp: selectedInvestigation.orderedDate },
                  { title: 'Sample Collected', completed: !!selectedInvestigation.sampleCollectedDate, timestamp: selectedInvestigation.sampleCollectedDate },
                  { title: 'Processing & Analysis', completed: !!selectedInvestigation.resultAvailableDate },
                  { title: 'Result Available in Portal', completed: !!selectedInvestigation.resultAvailableDate, timestamp: selectedInvestigation.resultAvailableDate },
                  { title: 'Doctor Reviewed & Approved', completed: !!selectedInvestigation.reviewedDate, timestamp: selectedInvestigation.reviewedDate },
                  { title: 'Patient SMS/App Notified', completed: !!selectedInvestigation.patientNotifiedDate, timestamp: selectedInvestigation.patientNotifiedDate }
                ]}
              />
            </div>

            <button
              onClick={() => setSelectedInvestigation(null)}
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
