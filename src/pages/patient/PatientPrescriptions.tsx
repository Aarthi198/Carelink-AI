import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Pill,
  Download,
  Calendar,
  Clock,
  ShieldCheck,
  Stethoscope,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const PatientPrescriptions: React.FC = () => {
  const navigate = useNavigate();
  const { prescriptions } = useData();
  const { patientProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<'Current' | 'Past'>('Current');

  const patientRx = prescriptions.filter(
    p => p.patientId === patientProfile.id || p.patientName.includes('Aarthi')
  );

  const displayed = patientRx.filter(p => p.status === activeTab);

  const handleDownload = (rxNumber: string) => {
    alert(`Downloading digital prescription ${rxNumber} signed by Dr. R. Lakshmi (PDF).`);
  };

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
        <h1 className="text-base font-extrabold text-slate-900">Prescriptions</h1>
        <div className="w-8" />
      </div>

      {/* Tabs (Matching Wireframe Page 20 / 21) */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
        <button
          onClick={() => setActiveTab('Current')}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'Current'
              ? 'bg-white text-brand-700 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Current Active
        </button>
        <button
          onClick={() => setActiveTab('Past')}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'Past'
              ? 'bg-white text-brand-700 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Past Prescriptions
        </button>
      </div>

      {/* Prescription Cards */}
      <div className="space-y-4">
        {displayed.map(rx => (
          <div
            key={rx.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card space-y-4"
          >
            {/* Header with Doctor and Date (Matching Wireframe Page 20) */}
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80"
                  alt={rx.doctorName}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-500/20"
                />
                <div>
                  <h3 className="text-sm font-black text-slate-900">{rx.doctorName}</h3>
                  <p className="text-[11px] text-brand-600 font-semibold">{rx.facilityName}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Rx No: {rx.prescriptionNumber}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-xl">
                {rx.date}
              </span>
            </div>

            {/* Diagnosis */}
            <div className="bg-brand-50/60 p-3 rounded-2xl border border-brand-100">
              <span className="text-[10px] font-bold text-brand-700 uppercase block tracking-wider">
                Diagnosis
              </span>
              <p className="text-xs font-bold text-slate-900 mt-0.5">{rx.diagnosis}</p>
            </div>

            {/* Medication Cards List (Matching Wireframe Page 20) */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Prescribed Medicines ({rx.medications.length})
              </h4>
              {rx.medications.map((med, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      <Pill className="w-3.5 h-3.5 text-brand-600" />
                      {med.name}
                    </span>
                    <span className="text-[11px] font-bold text-brand-700 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                      {med.dosage}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 flex items-center gap-3">
                    <span><strong>Frequency:</strong> {med.frequency}</span>
                    <span>•</span>
                    <span><strong>Duration:</strong> {med.duration}</span>
                  </div>
                  {med.instructions && (
                    <p className="text-[10px] text-slate-500 italic mt-0.5">
                      Instructions: {med.instructions}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Instructions & Advice */}
            {rx.instructions && rx.instructions.length > 0 && (
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs space-y-1">
                <span className="font-bold text-slate-800 block text-[11px]">Instructions:</span>
                <ul className="list-disc list-inside text-slate-600 space-y-0.5 text-[11px]">
                  {rx.instructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Download Button (Matching Wireframe Page 20) */}
            <button
              onClick={() => handleDownload(rx.prescriptionNumber)}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Prescription PDF</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
