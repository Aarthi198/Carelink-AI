import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  Plus,
  RotateCcw,
  XCircle,
  HelpCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';

export const PatientAppointments: React.FC = () => {
  const navigate = useNavigate();
  const { appointments, cancelAppointment } = useData();
  const { patientProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past'>('Upcoming');
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);

  const patientAppointments = appointments.filter(
    a => a.patientId === patientProfile.id || a.patientName.includes('Aarthi')
  );

  const upcoming = patientAppointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending');
  const past = patientAppointments.filter(a => a.status === 'Completed' || a.status === 'Cancelled');

  const displayed = activeTab === 'Upcoming' ? upcoming : past;

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
        <h1 className="text-base font-extrabold text-slate-900">My Appointments</h1>
        <button
          onClick={() => navigate('/patient/book-appointment')}
          className="p-2 text-brand-600 hover:bg-brand-50 rounded-full"
          title="Book new appointment"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs (Matching Wireframe Page 19 / 1) */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setActiveTab('Upcoming')}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'Upcoming'
              ? 'bg-white text-brand-700 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Upcoming ({upcoming.length})
        </button>
        <button
          onClick={() => setActiveTab('Past')}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'Past'
              ? 'bg-white text-brand-700 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Past ({past.length})
        </button>
      </div>

      {/* Appointment Cards List */}
      <div className="space-y-3.5">
        {displayed.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-card">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No {activeTab.toLowerCase()} appointments</h3>
            <p className="text-xs text-slate-500 mt-1">Book a consultation with our verified healthcare network.</p>
            <button
              onClick={() => navigate('/patient/book-appointment')}
              className="mt-4 bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm"
            >
              Book Appointment
            </button>
          </div>
        ) : (
          displayed.map(apt => (
            <div
              key={apt.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-card space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-brand-50 text-brand-600 flex flex-col items-center justify-center font-bold text-xs shrink-0">
                    <span className="text-[10px] uppercase font-semibold text-brand-500">
                      {apt.date.split('-')[1] === '09' ? 'Sep' : 'Oct'}
                    </span>
                    <span className="text-sm leading-none font-black text-brand-700">
                      {apt.date.split('-')[2] || '30'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900">{apt.doctorName}</h3>
                    <p className="text-[11px] text-brand-600 font-semibold">{apt.doctorSpecialty}</p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {apt.facilityName}
                    </p>
                  </div>
                </div>

                <StatusBadge status={apt.status} />
              </div>

              {/* Date & Time Slot Pill */}
              <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl text-slate-700">
                <span className="flex items-center gap-1.5 font-bold">
                  <Clock className="w-3.5 h-3.5 text-brand-500" />
                  {apt.time}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {apt.type} • Fee: {apt.consultationFee === 0 ? 'Free' : `₹${apt.consultationFee}`}
                </span>
              </div>

              {apt.reason && (
                <p className="text-[11px] text-slate-600">
                  <strong className="text-slate-800">Reason:</strong> {apt.reason}
                </p>
              )}

              {/* Actions */}
              {apt.status === 'Confirmed' && (
                <div className="flex gap-2 pt-1 border-t border-slate-100">
                  <button
                    onClick={() => navigate(`/patient/book-appointment?doctorId=${apt.doctorId}`)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => setShowCancelModal(apt.id)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Need Help Card (Matching Wireframe Page 19 / 1) */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <h4 className="font-bold text-slate-900">Need Help?</h4>
          <p className="text-slate-600 mt-0.5">
            Call the clinic or reschedule your appointment from here. In case of urgent symptoms, proceed directly to casualty.
          </p>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Cancel Appointment?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to cancel this appointment? You can re-book anytime.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowCancelModal(null)}
                className="flex-1 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
              >
                No, Keep
              </button>
              <button
                onClick={() => {
                  cancelAppointment(showCancelModal);
                  setShowCancelModal(null);
                }}
                className="flex-1 bg-red-600 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
