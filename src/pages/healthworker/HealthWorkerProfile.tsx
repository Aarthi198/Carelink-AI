import React, { useState } from 'react';
import { User, ShieldCheck, Phone, MapPin, Award, Save, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const HealthWorkerProfile: React.FC = () => {
  const { user } = useAuth();

  const [name, setName] = useState('K. Priya');
  const [role, setRole] = useState('Community Health Worker / CHO');
  const [empId, setEmpId] = useState('HW-TN-2024-412');
  const [zone, setZone] = useState('Ward 7, Tiruttani');
  const [phc, setPhc] = useState('Rural Health Sub Centre & Primary Health Centre');
  const [phone, setPhone] = useState('+91 9876543210');
  const [skills, setSkills] = useState('ANC Care, Child Immunization, NCD Blood Pressure/Glucose Screening, AI Triage Protocol');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fadeIn pb-12">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card">
        <h1 className="text-xl font-black text-slate-900">Health Worker Profile</h1>
        <p className="text-xs text-slate-500 mt-0.5">Field jurisdiction and outreach credentials</p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Health worker profile updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
            alt="Worker"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/20"
          />
          <div>
            <h3 className="text-base font-black text-slate-900">{name}</h3>
            <p className="text-xs text-emerald-700 font-bold">{role}</p>
            <span className="text-[10px] font-bold text-slate-400">Employee ID: {empId}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Area / Zone</label>
          <input
            type="text"
            value={zone}
            onChange={e => setZone(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Affiliated Primary Health Centre</label>
          <input
            type="text"
            value={phc}
            onChange={e => setPhc(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Certified Outreach Capabilities</label>
          <textarea
            rows={2}
            value={skills}
            onChange={e => setSkills(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 mt-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
};
