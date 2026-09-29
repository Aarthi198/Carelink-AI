import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Download,
  Calendar,
  Building2,
  FolderOpen,
  Filter,
  CheckCircle2,
  Activity,
  Heart,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { MedicalRecordCategory } from '../../types';

export const PatientRecords: React.FC = () => {
  const navigate = useNavigate();
  const { medicalRecords } = useData();
  const { patientProfile } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Consultation Records',
    'Lab Reports',
    'Medical History',
    'Growth & Vitals',
    'Vaccination Records',
    'Documents',
    'Allergies'
  ];

  const filtered = medicalRecords.filter(r => {
    if (selectedCategory === 'All') return true;
    return r.category === selectedCategory;
  });

  const handleDownloadAll = () => {
    alert('Exporting encrypted CareLink AI Complete Medical History Packet (PDF).');
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
        <h1 className="text-base font-extrabold text-slate-900">Medical Records</h1>
        <button
          onClick={handleDownloadAll}
          className="p-2 text-brand-600 hover:bg-brand-50 rounded-full"
          title="Download all records"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      {/* Category Pills (Matching Wireframe Page 19 / 20) */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Record Cards */}
      <div className="space-y-3.5">
        {filtered.map(rec => (
          <div
            key={rec.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card space-y-3 hover:border-brand-200 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider block">
                    {rec.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">
                    {rec.title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              {rec.summary}
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {rec.date}
              </span>
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {rec.facility}
              </span>
              <button
                onClick={() => alert(`Downloading record: ${rec.title}`)}
                className="text-brand-600 font-bold hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Download All Button */}
      <div className="pt-2">
        <button
          onClick={handleDownloadAll}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4 text-brand-600" />
          <span>Download Complete Health Dossier</span>
        </button>
      </div>
    </div>
  );
};
