import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Building2,
  FileText,
  Pill,
  Send,
  RotateCcw,
  FlaskConical,
  PhoneCall,
  ChevronRight,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmergencyAlert } from '../../components/common/EmergencyAlert';

export const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { patientProfile } = useAuth();
  const { appointments, referrals, followUps, investigations, prescriptions } = useData();

  const patientAppointments = appointments.filter(a => a.patientId === patientProfile.id || a.patientName.includes('Aarthi'));
  const nextAppointment = patientAppointments.find(a => a.status === 'Confirmed' || a.status === 'Pending');

  const activeReferral = referrals.find(r => r.patientId === patientProfile.id || r.patientName.includes('Aarthi'));
  const upcomingFollowUp = followUps.find(f => (f.patientId === patientProfile.id || f.patientName.includes('Aarthi')) && f.status === 'Upcoming');
  const recentInvestigation = investigations.find(i => i.patientId === patientProfile.id || i.patientName.includes('Aarthi'));

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 pb-24 md:pb-8">
      {/* Patient Greeting Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <img
            src={patientProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
            alt={patientProfile.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/30 shadow-sm"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Hello, {patientProfile.name.split(' ')[1] || patientProfile.name}!
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              How are you feeling today?
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-100">
            ID: {patientProfile.patientId || 'CLP001234'}
          </span>
        </div>
      </div>

      {/* Main AI Health Assistant CTA Card */}
      <div
        onClick={() => navigate('/patient/ai-assistant')}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-teal-500 text-white p-5 sm:p-6 shadow-float cursor-pointer group active:scale-98 transition-all"
      >
        {/* Background decorative circles */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute top-0 right-10 w-24 h-24 rounded-full bg-teal-300/20 blur-lg pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-teal-200" />
              <span>Voice & Text Symptom Check</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black">AI Health Assistant</h2>
            <p className="text-xs sm:text-sm text-brand-50 max-w-md font-medium">
              Describe your symptoms in English or தமிழ் and get instant guidance.
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-white text-brand-600 flex items-center justify-center shrink-0 shadow-lg group-hover:translate-x-1 transition-transform">
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Quick Actions Grid (Matching Wireframe Page 6) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => navigate('/patient/book-appointment')}
          className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left shadow-subtle transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">Book Appointment</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Find doctors & slots</p>
        </button>

        <button
          onClick={() => navigate('/patient/facilities')}
          className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left shadow-subtle transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">Find Healthcare</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">PHCs, clinics & hospitals</p>
        </button>

        <button
          onClick={() => navigate('/patient/records')}
          className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left shadow-subtle transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">My Records</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Lab, vitals & history</p>
        </button>

        <button
          onClick={() => navigate('/patient/prescriptions')}
          className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left shadow-subtle transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Pill className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">Prescriptions</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Active & past dosage</p>
        </button>

        {/* New Referral & Follow-up & Lab Quick Trackers */}
        <button
          onClick={() => navigate('/patient/referrals')}
          className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left shadow-subtle transition-all active:scale-95 group relative"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Send className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">My Referral</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Lifecycle tracking</p>
          {activeReferral && (
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-brand-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => navigate('/patient/follow-ups')}
          className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left shadow-subtle transition-all active:scale-95 group relative"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <RotateCcw className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">Follow-up Care</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Doctor review plans</p>
          {upcomingFollowUp && (
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping" />
          )}
        </button>

        <button
          onClick={() => navigate('/patient/investigations')}
          className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left shadow-subtle transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <FlaskConical className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">My Investigations</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Lab test results & notes</p>
        </button>

        <button
          onClick={() => navigate('/patient/emergency')}
          className="bg-red-50/70 hover:bg-red-100/80 border border-red-200/80 rounded-2xl p-4 text-left shadow-subtle transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform shadow-xs">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-red-700">Emergency 108</h3>
          <p className="text-[10px] text-red-500 mt-0.5">Instant ambulance support</p>
        </button>
      </div>

      {/* Emergency Alert Banner */}
      <EmergencyAlert variant="banner" />

      {/* Upcoming Appointment Widget */}
      {nextAppointment && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-card">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Upcoming Appointment
              </h3>
            </div>
            <StatusBadge status={nextAppointment.status} />
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">{nextAppointment.doctorName}</h4>
              <p className="text-xs text-brand-600 font-medium">{nextAppointment.doctorSpecialty}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {nextAppointment.facilityName}
              </p>
              <p className="text-xs text-slate-700 font-bold flex items-center gap-1.5 mt-2 bg-slate-50 px-2.5 py-1 rounded-lg inline-flex">
                <Clock className="w-3.5 h-3.5 text-brand-500" />
                {nextAppointment.date} at {nextAppointment.time}
              </p>
            </div>

            <button
              onClick={() => navigate('/patient/appointments')}
              className="bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold px-3 py-2 rounded-xl transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      )}

      {/* Active Referral Lifecycle Progress */}
      {activeReferral && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-card">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-sky-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Active Referral Tracker
              </h3>
            </div>
            <StatusBadge status={activeReferral.status} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{activeReferral.referralCode}</p>
                <p className="text-xs text-slate-600 mt-0.5">{activeReferral.reason}</p>
                <p className="text-[11px] text-slate-500">To: {activeReferral.toFacilityName}</p>
              </div>
              <button
                onClick={() => navigate('/patient/referrals')}
                className="text-xs font-bold text-brand-600 hover:underline"
              >
                View Timeline →
              </button>
            </div>

            {/* Mini Progress Bar */}
            <div className="pt-2">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${(activeReferral.timeline.filter(t => t.completed).length / activeReferral.timeline.length) * 100}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
                <span>Created</span>
                <span>Accepted</span>
                <span>Completed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
