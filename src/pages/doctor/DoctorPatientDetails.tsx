import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Stethoscope,
  FileText,
  Heart,
  User,
  FlaskConical,
  RotateCcw,
  Send,
  Pill,
  Calendar,
  Clock,
  ShieldCheck,
  Edit2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';

export const DoctorPatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patientProfile } = useAuth();
  const { medicalRecords, investigations, prescriptions, followUps, referrals } = useData();

  const [activeTab, setActiveTab] = useState<'Overview' | 'Medical History' | 'Vitals' | 'Investigations' | 'Prescriptions' | 'Follow-ups' | 'Referrals'>('Overview');

  return (
    <div className="space-y-5 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/doctor/patients')}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-extrabold text-slate-900">Clinical Patient Dossier</h1>
        <button
          onClick={() => navigate(`/doctor/consultation?patientId=${patientProfile.id}`)}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm flex items-center gap-1.5"
        >
          <Stethoscope className="w-4 h-4" />
          <span>Start Consultation</span>
        </button>
      </div>

      {/* Patient Profile Card (Matching Wireframe Page 8) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={patientProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
              alt={patientProfile.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">{patientProfile.name}</h2>
                <span className="text-xs text-slate-500 font-semibold">{patientProfile.age} yrs • {patientProfile.gender}</span>
              </div>
              <p className="text-xs text-brand-700 font-bold">PID: {patientProfile.patientId || 'CLP001234'} • Blood Group: {patientProfile.bloodGroup}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Last OPD Visit: 15 Aug 2026 • Govt PHC Thiruvaiyaru</p>
            </div>
          </div>

          <div className="flex gap-2">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Patient
            </span>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-100">
          {(['Overview', 'Medical History', 'Vitals', 'Investigations', 'Prescriptions', 'Follow-ups', 'Referrals'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'text-brand-600 border-b-2 border-brand-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">
                Personal & Contact Details
              </h4>
              <p><strong>Mobile:</strong> {patientProfile.phone}</p>
              <p><strong>Email:</strong> {patientProfile.email}</p>
              <p><strong>Address:</strong> {patientProfile.address}</p>
              <p><strong>Emergency:</strong> {patientProfile.emergencyContact.name} ({patientProfile.emergencyContact.relation}) - {patientProfile.emergencyContact.phone}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">
                Clinical Baseline
              </h4>
              <p><strong>Height / Weight:</strong> {patientProfile.height} / {patientProfile.weight}</p>
              <p><strong>Existing Conditions:</strong> {patientProfile.existingConditions.join(', ')}</p>
              <p><strong>Known Allergies:</strong> {patientProfile.allergies.join(', ')}</p>
              <p><strong>Current Medications:</strong> {patientProfile.regularMedications.join(', ')}</p>
            </div>
          </div>
        )}

        {/* Tab 2: Medical History */}
        {activeTab === 'Medical History' && (
          <div className="space-y-3 pt-2">
            {medicalRecords.map(rec => (
              <div key={rec.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{rec.title}</span>
                  <span className="text-slate-400 font-normal">{rec.date}</span>
                </div>
                <p className="text-slate-600">{rec.summary}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Vitals */}
        {activeTab === 'Vitals' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-red-50 rounded-2xl border border-red-200">
              <span className="text-[10px] font-bold text-red-700 uppercase">Temperature</span>
              <p className="text-base font-black text-red-900 mt-1">101.2 °F</p>
            </div>
            <div className="p-3 bg-brand-50 rounded-2xl border border-brand-200">
              <span className="text-[10px] font-bold text-brand-700 uppercase">Heart Rate</span>
              <p className="text-base font-black text-brand-900 mt-1">96 bpm</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200">
              <span className="text-[10px] font-bold text-indigo-700 uppercase">Blood Pressure</span>
              <p className="text-base font-black text-indigo-900 mt-1">110/70 mmHg</p>
            </div>
            <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200">
              <span className="text-[10px] font-bold text-teal-700 uppercase">Oxygen (SpO2)</span>
              <p className="text-base font-black text-teal-900 mt-1">98 %</p>
            </div>
          </div>
        )}

        {/* Tab 4: Investigations */}
        {activeTab === 'Investigations' && (
          <div className="space-y-2.5 pt-2">
            {investigations.map(inv => (
              <div key={inv.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{inv.testName}</h4>
                  <p className="text-slate-500 text-[11px]">Ordered on {inv.orderedDate}</p>
                </div>
                <StatusBadge status={inv.status} size="xs" />
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Prescriptions */}
        {activeTab === 'Prescriptions' && (
          <div className="space-y-3 pt-2">
            {prescriptions.map(rx => (
              <div key={rx.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{rx.diagnosis}</span>
                  <span className="text-slate-400 font-normal">{rx.date}</span>
                </div>
                <div className="space-y-1">
                  {rx.medications.map((m, idx) => (
                    <p key={idx} className="text-slate-700">• <strong>{m.name}</strong> ({m.dosage}) - {m.frequency} for {m.duration}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 6: Follow-ups */}
        {activeTab === 'Follow-ups' && (
          <div className="space-y-2.5 pt-2">
            {followUps.map(fol => (
              <div key={fol.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{fol.reason}</h4>
                  <p className="text-slate-500 text-[11px]">{fol.date} at {fol.time} • {fol.type}</p>
                </div>
                <StatusBadge status={fol.status} size="xs" />
              </div>
            ))}
          </div>
        )}

        {/* Tab 7: Referrals */}
        {activeTab === 'Referrals' && (
          <div className="space-y-2.5 pt-2">
            {referrals.map(ref => (
              <div key={ref.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{ref.reason}</h4>
                  <p className="text-slate-500 text-[11px]">{ref.referralCode} • To: {ref.toFacilityName}</p>
                </div>
                <StatusBadge status={ref.status} size="xs" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
