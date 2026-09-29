import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  User,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Timeline } from '../../components/common/Timeline';

export const PatientReferrals: React.FC = () => {
  const navigate = useNavigate();
  const { referrals } = useData();
  const { patientProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<'Timeline' | 'Details'>('Timeline');

  const patientReferrals = referrals.filter(
    r => r.patientId === patientProfile.id || r.patientName.includes('Aarthi')
  );

  const selectedRef = patientReferrals[0] || referrals[0];

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
        <h1 className="text-base font-extrabold text-slate-900">My Referral</h1>
        <div className="w-8" />
      </div>

      {/* Referral Summary Header Card (Matching Updated Patient Interface Page 2) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Referral Code: {selectedRef.referralCode}
            </span>
            <h2 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
              {selectedRef.reason}
            </h2>
            <p className="text-xs text-brand-600 font-semibold mt-0.5 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {selectedRef.toFacilityName}
            </p>
          </div>

          <StatusBadge status={selectedRef.status} />
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('Timeline')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'Timeline'
                ? 'bg-white text-brand-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setActiveTab('Details')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'Details'
                ? 'bg-white text-brand-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Details
          </button>
        </div>

        {/* Tab 1: 6-Step Referral Lifecycle Timeline */}
        {activeTab === 'Timeline' && (
          <div className="pt-2">
            <Timeline steps={selectedRef.timeline} variant="vertical" />
          </div>
        )}

        {/* Tab 2: Clinical Details */}
        {activeTab === 'Details' && (
          <div className="space-y-3 pt-2 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Initiated By</span>
              <p className="font-bold text-slate-800">{selectedRef.fromName} ({selectedRef.fromFacility})</p>
              <p className="text-slate-500 text-[11px]">Created on {selectedRef.createdDate}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Receiving Facility</span>
              <p className="font-bold text-slate-800">{selectedRef.toFacilityName}</p>
              <p className="text-slate-500 text-[11px]">Specialty: {selectedRef.specialtyRequired}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Clinical Summary</span>
              <p className="text-slate-700 leading-relaxed">{selectedRef.clinicalSummary}</p>
            </div>

            <div className="bg-brand-50 p-3.5 rounded-2xl border border-brand-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-brand-900">Priority Level</p>
                <p className="text-[11px] text-brand-700">{selectedRef.priority}</p>
              </div>
              <StatusBadge status={selectedRef.priority} />
            </div>
          </div>
        )}
      </div>

      {/* What Happens Next? Guide (Matching Wireframe Page 17) */}
      <div className="bg-gradient-to-r from-brand-50 to-teal-50 border border-brand-200 rounded-3xl p-5 space-y-2.5">
        <h4 className="text-xs font-black text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-brand-600" />
          What happens next?
        </h4>
        <ul className="space-y-2 text-xs text-slate-700">
          <li className="flex items-start gap-2">
            <span className="font-bold text-brand-600">1.</span>
            <span>Facility reviews your digital referral and clinical priority.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-brand-600">2.</span>
            <span>Doctor accepts referral and confirms consultation availability.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-brand-600">3.</span>
            <span>Attend consultation at the allocated slot with your digital CareLink ID.</span>
          </li>
        </ul>

        {selectedRef.status === 'Closed' && (
          <div className="pt-2">
            <button
              onClick={() => navigate('/patient/records')}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm transition-all"
            >
              View Consultation Summary in Records →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
