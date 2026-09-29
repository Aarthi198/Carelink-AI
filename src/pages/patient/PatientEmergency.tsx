import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  PhoneCall,
  MapPin,
  HeartHandshake,
  ShieldAlert,
  Building2,
  AlertOctagon,
  Clock,
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const PatientEmergency: React.FC = () => {
  const navigate = useNavigate();
  const { patientProfile } = useAuth();
  const { facilities } = useData();

  const emergencyHospital = facilities.find(f => f.emergencyAvailable) || facilities[1];

  const handleCall108 = () => {
    window.open('tel:108', '_self');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-5 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/patient')}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-extrabold text-red-600 flex items-center gap-1.5">
          <AlertOctagon className="w-5 h-5" />
          Emergency Support
        </h1>
        <div className="w-8" />
      </div>

      {/* Main 108 Emergency Speed Dial Card (Matching Wireframe Page 22) */}
      <div className="bg-gradient-to-br from-red-600 via-red-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-center text-white shadow-xl shadow-red-500/25 space-y-4">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto shadow-inner animate-pulse">
          <PhoneCall className="w-10 h-10 text-white" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black">Need Immediate Help?</h2>
          <p className="text-xs sm:text-sm text-red-100 mt-1 font-medium">
            National Ambulance & Emergency Medical Response Service
          </p>
        </div>

        <button
          onClick={handleCall108}
          className="w-full bg-white hover:bg-red-50 text-red-600 font-black py-4 rounded-2xl text-base shadow-lg shadow-black/10 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <PhoneCall className="w-5 h-5 animate-bounce" />
          <span>Call 108 Ambulance Now</span>
        </button>
      </div>

      {/* Nearest Emergency Facility Card (Matching Wireframe Page 22) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card space-y-3">
        <div className="flex items-center gap-2 text-red-700 font-extrabold text-xs uppercase tracking-wider">
          <Building2 className="w-4 h-4" />
          <span>Nearest 24x7 Emergency Casualty</span>
        </div>

        <div className="flex gap-3.5">
          <img
            src={emergencyHospital.imageUrl}
            alt={emergencyHospital.name}
            className="w-20 h-20 rounded-2xl object-cover shrink-0"
          />
          <div className="text-xs space-y-1 min-w-0">
            <h4 className="font-black text-slate-900 truncate">{emergencyHospital.name}</h4>
            <p className="text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              {emergencyHospital.distance} ({emergencyHospital.travelTime}) • {emergencyHospital.address}
            </p>
            <p className="text-emerald-600 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Open 24 Hours / 7 Days
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-1 border-t border-slate-100">
          <a
            href={`tel:${emergencyHospital.phone}`}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Casualty</span>
          </a>
          <button
            onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(emergencyHospital.name)}`, '_blank')}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Directions</span>
          </button>
        </div>
      </div>

      {/* Emergency Contacts Card (Matching Wireframe Page 22) */}
      {patientProfile.emergencyContact && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-teal-600" />
            <span>Personal Emergency Contacts</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="text-xs">
              <h5 className="font-bold text-slate-800">
                {patientProfile.emergencyContact.name} ({patientProfile.emergencyContact.relation})
              </h5>
              <p className="text-slate-500 font-medium">{patientProfile.emergencyContact.phone}</p>
            </div>
            <a
              href={`tel:${patientProfile.emergencyContact.phone}`}
              className="bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
          </div>
        </div>
      )}

      {/* Emergency Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Warning:</strong> For severe chest pain, sudden breathlessness, poisoning, severe burns or loss of consciousness, do not wait for clinic appointments. Dial 108 or proceed to casualty immediately.
        </p>
      </div>
    </div>
  );
};
