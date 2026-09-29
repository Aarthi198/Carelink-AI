import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Heart,
  PhoneCall,
  Globe,
  ShieldCheck,
  Bell,
  Lock,
  HelpCircle,
  ChevronRight,
  Save,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PatientSettings: React.FC = () => {
  const navigate = useNavigate();
  const { patientProfile, updateProfile } = useAuth();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState(true);
  const [aiDataSharing, setAiDataSharing] = useState(true);

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
        <h1 className="text-base font-extrabold text-slate-900">Settings</h1>
        <div className="w-8" />
      </div>

      {/* Settings Navigation Groups (Matching Wireframe Page 23) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card divide-y divide-slate-100 overflow-hidden">
        <div
          onClick={() => navigate('/patient/profile/edit')}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-brand-600" />
            <span className="text-xs font-bold text-slate-900">Personal Information</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div
          onClick={() => navigate('/patient/profile/edit')}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-xs font-bold text-slate-900">Health Information</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div
          onClick={() => navigate('/patient/profile/edit')}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <PhoneCall className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-bold text-slate-900">Emergency Contacts</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div
          onClick={() => navigate('/patient/profile/edit')}
          className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-900">Language (English / தமிழ்)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Notifications & Toggles */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-5 space-y-4">
        <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
          Notification Preferences
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-800">Appointment & Follow-up Reminders</p>
            <p className="text-[11px] text-slate-500">Receive in-app reminder alerts</p>
          </div>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={e => setNotificationsEnabled(e.target.checked)}
            className="w-4 h-4 rounded text-brand-600"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-800">SMS Notification Broadcasts</p>
            <p className="text-[11px] text-slate-500">Emergency updates on your registered phone</p>
          </div>
          <input
            type="checkbox"
            checked={smsAlertsEnabled}
            onChange={e => setSmsAlertsEnabled(e.target.checked)}
            className="w-4 h-4 rounded text-brand-600"
          />
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-5 space-y-4">
        <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
          Privacy & Clinical Consent
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-800">AI Decision Support Data Processing</p>
            <p className="text-[11px] text-slate-500">Secure end-to-end encrypted triage processing</p>
          </div>
          <input
            type="checkbox"
            checked={aiDataSharing}
            onChange={e => setAiDataSharing(e.target.checked)}
            className="w-4 h-4 rounded text-brand-600"
          />
        </div>

        <p className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
          CareLink AI complies with digital healthcare privacy standards. Your medical records are accessible only by you and authorized attending clinicians.
        </p>
      </div>
    </div>
  );
};
