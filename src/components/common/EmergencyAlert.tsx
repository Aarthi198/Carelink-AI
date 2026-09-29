import React, { useState } from 'react';
import { PhoneCall, AlertOctagon, X, MapPin, ShieldAlert, HeartHandshake } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface EmergencyAlertProps {
  variant?: 'banner' | 'card' | 'compact';
  className?: string;
}

export const EmergencyAlert: React.FC<EmergencyAlertProps> = ({ variant = 'banner', className = '' }) => {
  const [showModal, setShowModal] = useState(false);
  const { patientProfile } = useAuth();

  const handleCall108 = () => {
    window.open('tel:108', '_self');
  };

  return (
    <>
      {variant === 'banner' && (
        <div className={`bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl p-3.5 shadow-md shadow-red-500/15 flex items-center justify-between gap-3 ${className}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 animate-pulse">
              <PhoneCall className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-red-100 uppercase tracking-wider">Medical Emergency</p>
              <h4 className="text-sm font-bold">Emergency? Call 108</h4>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-red-700 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-bold shadow transition-all active:scale-95"
          >
            Emergency 108
          </button>
        </div>
      )}

      {variant === 'card' && (
        <div className={`bg-red-50 border border-red-200 rounded-2xl p-4 text-slate-800 ${className}`}>
          <div className="flex items-center gap-2.5 text-red-700 font-bold mb-1.5">
            <AlertOctagon className="w-5 h-5" />
            <span>URGENT CARE NEEDED</span>
          </div>
          <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">
            High risk symptoms detected. Immediate clinical assessment is required. Please call emergency services or visit the casualty department.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleCall108}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow shadow-red-600/20 active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              Call 108 Now
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 py-2.5 px-3 rounded-xl text-xs font-semibold"
            >
              Emergency Info
            </button>
          </div>
        </div>
      )}

      {/* Emergency Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-red-100 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner animate-pulse">
                <PhoneCall className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Need Immediate Help?</h3>
              <p className="text-xs text-slate-500 mt-1">
                24x7 Government & Emergency Medical Response System
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {/* 108 Primary Action */}
              <button
                onClick={handleCall108}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-red-600/25 active:scale-98 transition-all"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <PhoneCall className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-base">Call 108 Ambulance</h5>
                    <p className="text-xs text-red-100">National Emergency Medical Service</p>
                  </div>
                </div>
                <span className="bg-white text-red-700 text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm">
                  Dial 108
                </span>
              </button>

              {/* Nearest Emergency Hospital */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div className="text-left text-xs">
                  <h6 className="font-bold text-slate-800">Nearest 24x7 Emergency Casualty</h6>
                  <p className="text-slate-600 mt-0.5">City Care Hospital & Trauma Unit (3.8 km)</p>
                  <p className="text-[11px] text-slate-500">Bazaar Street, Tiruttani • Open 24/7</p>
                </div>
              </div>

              {/* Patient's Emergency Contact */}
              {patientProfile?.emergencyContact && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HeartHandshake className="w-5 h-5 text-teal-600" />
                    <div className="text-left text-xs">
                      <h6 className="font-bold text-slate-800">
                        {patientProfile.emergencyContact.name} ({patientProfile.emergencyContact.relation})
                      </h6>
                      <p className="text-slate-500">{patientProfile.emergencyContact.phone}</p>
                    </div>
                  </div>
                  <a
                    href={`tel:${patientProfile.emergencyContact.phone}`}
                    className="bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 px-3 py-1.5 rounded-xl text-xs font-bold"
                  >
                    Call
                  </a>
                </div>
              )}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-800 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                For severe breathlessness, sudden chest pain, loss of consciousness, or severe trauma, call 108 immediately.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
