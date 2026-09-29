import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Filter, AlertTriangle, Eye, ClipboardList, Phone, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';

export const HealthWorkerPatients: React.FC = () => {
  const navigate = useNavigate();
  const { patientProfile } = useAuth();

  const [activeFilter, setActiveFilter] = useState<'All' | 'Pregnant Women' | 'Children' | 'Elderly' | 'High Risk' | 'Chronic Conditions'>('All');
  const [search, setSearch] = useState('');

  const communityPatients = [
    {
      id: patientProfile.id,
      name: patientProfile.name,
      patientId: patientProfile.patientId || 'CLP001234',
      age: patientProfile.age,
      gender: patientProfile.gender,
      phone: patientProfile.phone,
      category: 'General',
      risk: 'High Risk (Post-LRTI)',
      lastCheck: '27 Sep 2026'
    },
    {
      id: 'patient-meena',
      name: 'Meena',
      patientId: 'CLP001236',
      age: 45,
      gender: 'Female',
      phone: '+91 8123456789',
      category: 'Chronic Conditions',
      risk: 'High Risk (SpO2 92%)',
      lastCheck: '29 Sep 2026'
    },
    {
      id: 'patient-selvi',
      name: 'Selvi',
      patientId: 'CLP001239',
      age: 24,
      gender: 'Female',
      phone: '+91 9345671234',
      category: 'Pregnant Women',
      risk: 'Moderate (2nd Trimester ANC)',
      lastCheck: '25 Sep 2026'
    },
    {
      id: 'patient-kumar',
      name: 'Kumar',
      patientId: 'CLP001238',
      age: 70,
      gender: 'Male',
      phone: '+91 9988776655',
      category: 'Elderly',
      risk: 'Chronic (Hypertension)',
      lastCheck: '20 Sep 2026'
    },
    {
      id: 'patient-baby-ananya',
      name: 'Baby Ananya',
      patientId: 'CLP001240',
      age: 2,
      gender: 'Female',
      phone: '+91 9840112233',
      category: 'Children',
      risk: 'Routine (MMR Vaccine Due)',
      lastCheck: '18 Sep 2026'
    }
  ];

  const filtered = communityPatients.filter(p => {
    const matchCategory = activeFilter === 'All' ? true :
      activeFilter === 'High Risk' ? p.risk.includes('High') :
      p.category === activeFilter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.patientId.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-5 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">Assigned Community Patients</h1>
          <p className="text-xs text-slate-500 mt-0.5">Ward 7 Health Jurisdiction • Maternal, Child & Chronic Care</p>
        </div>

        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search name or ID..."
          className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['All', 'Pregnant Women', 'Children', 'Elderly', 'High Risk', 'Chronic Conditions'] as const).map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === f
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(patient => (
          <div
            key={patient.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card hover:border-brand-300 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-black text-slate-900">{patient.name}</h3>
                  <p className="text-[11px] text-slate-500">{patient.age} yrs • {patient.gender} • {patient.phone}</p>
                  <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                    {patient.patientId}
                  </span>
                </div>
                <StatusBadge status={patient.risk.includes('High') ? 'High Priority' : 'Routine'} size="xs" />
              </div>

              <div className="mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                <p><strong>Program:</strong> {patient.category}</p>
                <p><strong>Risk Note:</strong> <span className="text-slate-700 font-semibold">{patient.risk}</span></p>
                <p className="text-slate-500 text-[11px]">Last Field Check: {patient.lastCheck}</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/health-worker/visits')}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Record Visit</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
