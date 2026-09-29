import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Building2, Calendar, AlertTriangle, Eye, Plus, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Timeline } from '../../components/common/Timeline';
import { Referral } from '../../types';

export const HealthWorkerReferrals: React.FC = () => {
  const navigate = useNavigate();
  const { referrals } = useData();

  const [selectedRef, setSelectedRef] = useState<Referral | null>(null);

  return (
    <div className="space-y-5 animate-fadeIn pb-12">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Field Referral & Escalation Tracker</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track community patient referrals to hospitals and doctor acceptances</p>
        </div>
        <button
          onClick={() => navigate('/health-worker/visits')}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Referral</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {referrals.map(ref => (
          <div
            key={ref.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card space-y-3.5 hover:border-brand-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-black text-slate-900">{ref.patientName}</h3>
                  <p className="text-[10px] text-slate-400 font-bold">{ref.referralCode} • {ref.patientAge} yrs, {ref.patientGender}</p>
                </div>
                <StatusBadge status={ref.priority} size="xs" />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs space-y-1">
                <p className="font-bold text-slate-800">{ref.reason}</p>
                <p className="text-slate-500 text-[11px]">To: {ref.toFacilityName}</p>
                <p className="text-[11px] text-slate-600"><strong>Summary:</strong> {ref.clinicalSummary}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Created: {ref.createdDate}</span>
                <StatusBadge status={ref.status} size="xs" />
              </div>
            </div>

            <button
              onClick={() => setSelectedRef(ref)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Full Lifecycle Timeline</span>
            </button>
          </div>
        ))}
      </div>

      {/* Lifecycle Modal */}
      {selectedRef && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">{selectedRef.patientName}</h3>
                <p className="text-[11px] text-slate-500">Referral ID: {selectedRef.referralCode}</p>
              </div>
              <StatusBadge status={selectedRef.status} />
            </div>

            <Timeline steps={selectedRef.timeline} variant="vertical" />

            <button
              onClick={() => setSelectedRef(null)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
