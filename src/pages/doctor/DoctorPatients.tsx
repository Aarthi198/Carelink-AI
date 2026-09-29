import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Eye,
  Stethoscope,
  Calendar,
  Phone,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const DoctorPatients: React.FC = () => {
  const navigate = useNavigate();
  const { patientProfile } = useAuth();
  const { appointments } = useData();

  const [searchTerm, setSearchTerm] = useState('');

  const patientList = [
    {
      id: patientProfile.id,
      name: patientProfile.name,
      patientId: patientProfile.patientId || 'CLP001234',
      age: patientProfile.age,
      gender: patientProfile.gender,
      phone: patientProfile.phone,
      bloodGroup: patientProfile.bloodGroup,
      lastVisit: '30 Sep 2026',
      status: 'Active (Post-LRTI Treatment)',
      avatar: patientProfile.avatarUrl
    },
    {
      id: 'patient-ravi',
      name: 'Ravi',
      patientId: 'CLP001235',
      age: 32,
      gender: 'Male',
      phone: '+91 9876543290',
      bloodGroup: 'B+',
      lastVisit: '29 Sep 2026',
      status: 'Viral Fever Follow-up',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'patient-meena',
      name: 'Meena',
      patientId: 'CLP001236',
      age: 45,
      gender: 'Female',
      phone: '+91 8123456789',
      bloodGroup: 'A+',
      lastVisit: '29 Sep 2026',
      status: 'High Priority (SpO2 92%)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'patient-anand',
      name: 'Anand',
      patientId: 'CLP001237',
      age: 38,
      gender: 'Male',
      phone: '+91 9098765432',
      bloodGroup: 'O-',
      lastVisit: '25 Sep 2026',
      status: 'Hypertension Review',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'patient-kumar',
      name: 'Kumar',
      patientId: 'CLP001238',
      age: 70,
      gender: 'Male',
      phone: '+91 9988776655',
      bloodGroup: 'AB+',
      lastVisit: '20 Sep 2026',
      status: 'Geriatric OPD',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
    }
  ];

  const filtered = patientList.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-5 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">Patient Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Authorized clinical records for assigned & consulted patients
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search name, ID, or phone..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:bg-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(patient => (
          <div
            key={patient.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card hover:border-brand-300 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={patient.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={patient.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-brand-500/20"
                />
                <div>
                  <h3 className="text-sm font-black text-slate-900">{patient.name}</h3>
                  <p className="text-[11px] text-slate-500">{patient.age} yrs • {patient.gender}</p>
                  <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                    {patient.patientId}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl">
                {patient.bloodGroup}
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Last Visit:</span>
                <span className="font-bold text-slate-800">{patient.lastVisit}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-brand-700">{patient.status}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1 border-t border-slate-100">
              <button
                onClick={() => navigate(`/doctor/patients/${patient.id}`)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Details</span>
              </button>
              <button
                onClick={() => navigate(`/doctor/consultation?patientId=${patient.id}`)}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 rounded-xl text-xs shadow-sm flex items-center justify-center gap-1"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Consult</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
