import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  User,
  Heart,
  PhoneCall,
  MapPin,
  Globe,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PatientProfile: React.FC = () => {
  const navigate = useNavigate();
  const { patientProfile, logout } = useAuth();

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
        <h1 className="text-base font-extrabold text-slate-900">My Profile</h1>
        <button
          onClick={() => navigate('/patient/profile/edit')}
          className="p-2 text-brand-600 hover:bg-brand-50 rounded-full"
          title="Edit Profile"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>

      {/* Patient Avatar Card (Matching Wireframe Page 13) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 text-center shadow-card space-y-2">
        <div className="relative inline-block">
          <img
            src={patientProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
            alt={patientProfile.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-brand-100 mx-auto shadow-md"
          />
        </div>
        <h2 className="text-lg font-black text-slate-900">{patientProfile.name}</h2>
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <span>{patientProfile.age} yrs</span>
          <span>•</span>
          <span>{patientProfile.gender}</span>
          <span>•</span>
          <span className="font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100">
            {patientProfile.patientId || 'CLP001234'}
          </span>
        </div>
      </div>

      {/* Profile Sections List (Matching Wireframe Page 13) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card divide-y divide-slate-100 overflow-hidden">
        {/* Personal Information */}
        <div
          onClick={() => navigate('/patient/profile/edit')}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Personal Information</h4>
              <p className="text-[11px] text-slate-500">{patientProfile.phone} • {patientProfile.email}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Health Information */}
        <div
          onClick={() => navigate('/patient/profile/edit')}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Health Information</h4>
              <p className="text-[11px] text-slate-500">Blood: {patientProfile.bloodGroup} • {patientProfile.height} / {patientProfile.weight}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Emergency Contacts */}
        <div
          onClick={() => navigate('/patient/profile/edit')}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Emergency Contacts</h4>
              <p className="text-[11px] text-slate-500">
                {patientProfile.emergencyContact.name} ({patientProfile.emergencyContact.relation})
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Address */}
        <div
          onClick={() => navigate('/patient/profile/edit')}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Address</h4>
              <p className="text-[11px] text-slate-500 line-clamp-1">{patientProfile.address}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Language */}
        <div
          onClick={() => navigate('/patient/profile/edit')}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Language</h4>
              <p className="text-[11px] text-slate-500">{patientProfile.language}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-brand-600">English / தமிழ்</span>
        </div>

        {/* Privacy & Consent */}
        <div
          onClick={() => navigate('/patient/settings')}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Privacy & Consent</h4>
              <p className="text-[11px] text-slate-500">Data protection & permissions</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Help & Support */}
        <div
          onClick={() => navigate('/patient/help')}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Help & Support</h4>
              <p className="text-[11px] text-slate-500">FAQs, guide & report issue</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-2">
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
