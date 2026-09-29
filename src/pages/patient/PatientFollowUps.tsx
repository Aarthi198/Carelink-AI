import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  RotateCcw,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Bell,
  ChevronRight,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Timeline } from '../../components/common/Timeline';
import { FollowUp } from '../../types';

export const PatientFollowUps: React.FC = () => {
  const navigate = useNavigate();
  const { followUps, markFollowUpAttended, rescheduleFollowUp } = useData();
  const { patientProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'Missed'>('Upcoming');
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);

  const patientFollowUps = followUps.filter(
    f => f.patientId === patientProfile.id || f.patientName.includes('Aarthi')
  );

  const upcoming = patientFollowUps.filter(f => f.status === 'Upcoming');
  const completed = patientFollowUps.filter(f => f.status === 'Completed');
  const missed = patientFollowUps.filter(f => f.status === 'Missed');

  const displayed = activeTab === 'Upcoming' ? upcoming : activeTab === 'Completed' ? completed : missed;

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-4 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/patient')}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-extrabold text-slate-900">Follow-up Care</h1>
        <div className="w-8" />
      </div>

      {/* Tabs (Matching Updated Patient Interface Page 3) */}
      <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
        <button
          onClick={() => setActiveTab('Upcoming')}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'Upcoming'
              ? 'bg-white text-brand-700 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Upcoming ({upcoming.length})
        </button>
        <button
          onClick={() => setActiveTab('Completed')}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'Completed'
              ? 'bg-white text-brand-700 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Completed ({completed.length})
        </button>
        <button
          onClick={() => setActiveTab('Missed')}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'Missed'
              ? 'bg-white text-brand-700 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Missed ({missed.length})
        </button>
      </div>

      {/* Follow-up Cards List */}
      <div className="space-y-3.5">
        {displayed.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-card">
            <RotateCcw className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No {activeTab.toLowerCase()} follow-ups</h3>
            <p className="text-xs text-slate-500 mt-1">
              Your attending physician will schedule clinical follow-ups after consultations.
            </p>
          </div>
        ) : (
          displayed.map((fol, index) => (
            <div
              key={fol.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card space-y-3 hover:border-brand-200 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">
                    Follow-up {index + 1} • {fol.reason}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80"
                      alt={fol.doctorName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
                    />
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900">{fol.doctorName}</h3>
                      <p className="text-[10px] text-slate-500">{fol.facilityName}</p>
                    </div>
                  </div>
                </div>

                <StatusBadge status={fol.status} />
              </div>

              {/* Date & Type */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Calendar className="w-3.5 h-3.5 text-brand-600" />
                  {fol.date} at {fol.time}
                </span>
                <span className="text-slate-600 font-medium">{fol.type}</span>
              </div>

              {/* Mini 4-Stage Lifecycle Indicator */}
              <div className="pt-1">
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold mb-1">
                  <span className="text-emerald-600">✓ Received</span>
                  <span className={fol.reminderSent ? 'text-emerald-600' : 'text-slate-400'}>
                    {fol.reminderSent ? '✓ Reminder Sent' : '• Reminder'}
                  </span>
                  <span className={fol.status === 'Completed' ? 'text-emerald-600' : 'text-brand-600 font-bold'}>
                    Attend
                  </span>
                  <span className={fol.status === 'Completed' ? 'text-emerald-600' : fol.status === 'Missed' ? 'text-red-500' : 'text-slate-400'}>
                    {fol.status === 'Completed' ? '✓ Complete' : fol.status === 'Missed' ? 'Missed' : 'Complete'}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all"
                    style={{
                      width: fol.status === 'Completed' ? '100%' : fol.status === 'Missed' ? '75%' : '50%'
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setSelectedFollowUp(fol)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition-colors"
                >
                  View Details
                </button>

                {fol.status === 'Upcoming' && (
                  <button
                    onClick={() => {
                      alert(`Added follow-up on ${fol.date} at ${fol.time} to your device calendar.`);
                    }}
                    className="flex-1 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    Add to Calendar
                  </button>
                )}

                {fol.status === 'Missed' && (
                  <button
                    onClick={() => {
                      rescheduleFollowUp(fol.id, '2026-10-15', '10:00 AM');
                      alert('Follow-up successfully rescheduled for 15 Oct 2026, 10:00 AM.');
                    }}
                    className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 rounded-xl text-xs shadow-sm"
                  >
                    Reschedule
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Follow-up Details Modal (Matching Updated Patient Interface Page 4) */}
      {selectedFollowUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Follow-up Details
                </span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  {selectedFollowUp.reason}
                </h3>
              </div>
              <StatusBadge status={selectedFollowUp.status} />
            </div>

            {/* Doctor Info */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80"
                alt={selectedFollowUp.doctorName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20"
              />
              <div className="text-xs">
                <h4 className="font-bold text-slate-900">{selectedFollowUp.doctorName}</h4>
                <p className="text-slate-500">{selectedFollowUp.facilityName}</p>
                <p className="font-semibold text-brand-600 mt-0.5">
                  {selectedFollowUp.date} at {selectedFollowUp.time} • {selectedFollowUp.type}
                </p>
              </div>
            </div>

            {/* Complete 5-Step Follow-up Lifecycle Timeline */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 mb-2">Lifecycle Progression</h4>
              <div className="space-y-3 text-xs">
                {selectedFollowUp.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      step.completed ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {step.completed ? '✓' : idx + 1}
                    </div>
                    <div>
                      <p className={`font-semibold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.title}
                      </p>
                      <p className="text-[10px] text-slate-400">{step.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedFollowUp.notes && (
              <div className="p-3 bg-brand-50 border border-brand-100 rounded-xl text-xs text-brand-900">
                <strong>Doctor Notes:</strong> {selectedFollowUp.notes}
              </div>
            )}

            {/* Actions inside Modal */}
            <div className="space-y-2 pt-2">
              {selectedFollowUp.status === 'Upcoming' && (
                <button
                  onClick={() => {
                    markFollowUpAttended(selectedFollowUp.id);
                    setSelectedFollowUp(null);
                  }}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs shadow-sm transition-all"
                >
                  Mark as Attended
                </button>
              )}
              <button
                onClick={() => setSelectedFollowUp(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
