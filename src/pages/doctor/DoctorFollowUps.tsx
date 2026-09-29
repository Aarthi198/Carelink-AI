import React, { useState } from 'react';
import { RotateCcw, Calendar, Clock, User, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';

export const DoctorFollowUps: React.FC = () => {
  const { followUps, markFollowUpAttended, markFollowUpMissed } = useData();

  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'Missed'>('Upcoming');

  const filtered = followUps.filter(f => f.status === activeTab);

  return (
    <div className="space-y-5 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Follow-up Clinical Tracker</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor post-treatment patient recovery, attendance, and missed consultations
          </p>
        </div>
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200">
          {followUps.filter(f => f.status === 'Upcoming').length} Scheduled
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['Upcoming', 'Completed', 'Missed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab} ({followUps.filter(f => f.status === tab).length})
          </button>
        ))}
      </div>

      {/* Follow-up Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(fol => (
          <div
            key={fol.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card space-y-3.5 hover:border-brand-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-black text-slate-900">{fol.patientName}</h3>
                  <p className="text-xs text-brand-600 font-bold">{fol.reason}</p>
                </div>
                <StatusBadge status={fol.status} size="xs" />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs space-y-1">
                <p className="text-slate-700"><strong>Date:</strong> {fol.date} at {fol.time}</p>
                <p className="text-slate-700"><strong>Type:</strong> {fol.type}</p>
                {fol.notes && <p className="text-slate-500 text-[11px] pt-1">Notes: {fol.notes}</p>}
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              {fol.status === 'Upcoming' && (
                <>
                  <button
                    onClick={() => {
                      markFollowUpAttended(fol.id);
                      alert('Marked follow-up as Attended / Completed.');
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs shadow-xs"
                  >
                    Mark Attended
                  </button>
                  <button
                    onClick={() => {
                      markFollowUpMissed(fol.id);
                      alert('Marked follow-up as Missed. Community Health Worker notified for home visit.');
                    }}
                    className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold py-2 rounded-xl text-xs"
                  >
                    Mark Missed
                  </button>
                </>
              )}

              {fol.status === 'Missed' && (
                <button
                  onClick={() => alert(`Escalated missed follow-up for ${fol.patientName} to Health Worker K. Priya for field check.`)}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 rounded-xl text-xs shadow-xs"
                >
                  Alert Community Health Worker
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
