import React, { useState } from 'react';
import { Stethoscope, Building2, Award, Phone, Mail, Clock, Save, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const DoctorProfile: React.FC = () => {
  const { user } = useAuth();

  const [name, setName] = useState('Dr. R. Lakshmi');
  const [specialty, setSpecialty] = useState('General Physician (MBBS, MD General Medicine)');
  const [qualifications, setQualifications] = useState('MBBS (Madras Medical College), MD (Internal Medicine)');
  const [experience, setExperience] = useState('12');
  const [facility, setFacility] = useState('Government Primary Health Centre, Thiruvaiyaru');
  const [phone, setPhone] = useState('+91 9012345678');
  const [email, setEmail] = useState('dr.lakshmi@carelink.ai');
  const [opdTimings, setOpdTimings] = useState('Mon - Sat: 08:00 AM - 02:00 PM');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fadeIn pb-12">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card">
        <h1 className="text-xl font-black text-slate-900">Doctor Profile & OPD Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage physician credentials, practice availability, and contact details</p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Doctor profile updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80"
            alt="Doctor"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-teal-500/20"
          />
          <div>
            <h3 className="text-base font-black text-slate-900">{name}</h3>
            <p className="text-xs text-teal-700 font-bold">{specialty}</p>
            <span className="text-[10px] font-bold text-slate-400">Reg No: TN-MCI-884920</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Full Name & Title</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Specialization</label>
          <input
            type="text"
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Qualifications & Degrees</label>
          <input
            type="text"
            value={qualifications}
            onChange={e => setQualifications(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Experience (Years)</label>
            <input
              type="number"
              value={experience}
              onChange={e => setExperience(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Contact</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Facility</label>
          <input
            type="text"
            value={facility}
            onChange={e => setFacility(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">OPD Shift Timings</label>
          <input
            type="text"
            value={opdTimings}
            onChange={e => setOpdTimings(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 mt-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </form>
    </div>
  );
};
