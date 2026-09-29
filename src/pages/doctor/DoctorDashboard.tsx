import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  Send,
  RotateCcw,
  FlaskConical,
  AlertCircle,
  Clock,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Activity,
  UserCheck
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';

export const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { appointments, referrals, followUps, investigations } = useData();

  const doctorAppointments = appointments.filter(a => a.doctorId === 'doc-1' || a.doctorName.includes('Lakshmi'));
  const pendingReferrals = referrals.filter(r => r.status === 'Received' || r.status === 'Created');
  const pendingLabReviews = investigations.filter(i => !i.doctorReviewed && i.status === 'Result Available');
  const activeFollowUps = followUps.filter(f => f.status === 'Upcoming');

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80'}
            alt="Doctor"
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-teal-500/30 shadow-sm"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 mb-1">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Attending Clinical Physician</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Welcome, Dr. R. Lakshmi!
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Government Primary Health Centre, Thiruvaiyaru • OPD Shift Active
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/doctor/consultation')}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-3 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Stethoscope className="w-4 h-4" />
          <span>New Patient Consultation</span>
        </button>
      </div>

      {/* KPI Metrics 4-Card Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigate('/doctor/appointments')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-subtle hover:border-brand-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Today's Queue</span>
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{doctorAppointments.length}</p>
          <p className="text-[11px] text-brand-600 font-semibold mt-1">Confirmed OPD slots</p>
        </div>

        <div
          onClick={() => navigate('/doctor/referrals')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-subtle hover:border-brand-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Pending Referrals</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{pendingReferrals.length}</p>
          <p className="text-[11px] text-amber-600 font-semibold mt-1">Requires Doctor Review</p>
        </div>

        <div
          onClick={() => navigate('/doctor/investigations')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-subtle hover:border-brand-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Lab Results to Review</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FlaskConical className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{pendingLabReviews.length}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Lab processing complete</p>
        </div>

        <div
          onClick={() => navigate('/doctor/follow-ups')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-subtle hover:border-brand-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Active Follow-ups</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{activeFollowUps.length}</p>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">Scheduled reviews</p>
        </div>
      </div>

      {/* Clinical Alerts Box */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-5 space-y-3">
        <h3 className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          Clinical Action Items & Alerts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div
            onClick={() => navigate('/doctor/referrals')}
            className="p-3 bg-white rounded-2xl border border-amber-200/80 cursor-pointer hover:border-brand-400 transition-colors flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-slate-900">New High-Priority Referral</p>
              <p className="text-slate-500 text-[11px]">Patient Meena (45 yrs) • Low SpO2 92%</p>
            </div>
            <StatusBadge status="High Priority" size="xs" />
          </div>

          <div
            onClick={() => navigate('/doctor/investigations')}
            className="p-3 bg-white rounded-2xl border border-amber-200/80 cursor-pointer hover:border-brand-400 transition-colors flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-slate-900">CBC Result Awaiting Doctor Notes</p>
              <p className="text-slate-500 text-[11px]">M. Aarthi (28 yrs) • WBC 12.4 elevated</p>
            </div>
            <StatusBadge status="Result Available" size="xs" />
          </div>
        </div>
      </div>

      {/* Today's Patient Queue Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900">Today's Appointment Queue</h3>
            <p className="text-xs text-slate-500">Patients scheduled for today's OPD</p>
          </div>
          <button
            onClick={() => navigate('/doctor/appointments')}
            className="text-xs font-bold text-brand-600 hover:underline"
          >
            View Full Schedule →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[10px] uppercase font-bold">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Time</th>
                <th className="p-3">Chief Complaint</th>
                <th className="p-3">Urgency</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {doctorAppointments.slice(0, 4).map(apt => (
                <tr key={apt.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 font-bold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-[10px]">
                        {apt.patientName.charAt(0)}
                      </div>
                      <div>
                        <span>{apt.patientName}</span>
                        <span className="block text-[10px] text-slate-400 font-normal">{apt.patientGender}, {apt.patientAge} yrs</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-bold text-brand-700">{apt.time}</td>
                  <td className="p-3 text-slate-600 max-w-[200px] truncate">{apt.reason}</td>
                  <td className="p-3">
                    <StatusBadge status={apt.triageUrgency || 'Routine'} size="xs" />
                  </td>
                  <td className="p-3">
                    <StatusBadge status={apt.status} size="xs" />
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => navigate(`/doctor/consultation?patientId=${apt.patientId}&appointmentId=${apt.id}`)}
                      className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs"
                    >
                      Start Consult
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
