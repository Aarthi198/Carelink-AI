import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  ClipboardList,
  Send,
  AlertTriangle,
  RotateCcw,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Heart,
  Activity,
  Plus
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';

export const HealthWorkerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { healthWorkerVisits, referrals, followUps } = useData();

  const highRiskReferrals = referrals.filter(r => r.priority === 'High Priority' || r.priority === 'Emergency');

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Banner */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
            alt="Health Worker"
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/30 shadow-sm"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Community Health Worker • Ward 7, Tiruttani</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Welcome, K. Priya!
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Rural Health Sub Centre & Primary Outreach Field Division
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/health-worker/visits')}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-3 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Record Home / Field Visit</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigate('/health-worker/visits')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-subtle hover:border-brand-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Today's Visits</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{healthWorkerVisits.length}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Field visits logged</p>
        </div>

        <div
          onClick={() => navigate('/health-worker/referrals')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-subtle hover:border-brand-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">High Risk Cases</span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-red-600 mt-2">{highRiskReferrals.length}</p>
          <p className="text-[11px] text-red-600 font-semibold mt-1">Immediate escalation</p>
        </div>

        <div
          onClick={() => navigate('/health-worker/referrals')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-subtle hover:border-brand-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Active Referrals</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{referrals.length}</p>
          <p className="text-[11px] text-brand-600 font-semibold mt-1">Transmitted to Doctors</p>
        </div>

        <div
          onClick={() => navigate('/health-worker/patients')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-subtle hover:border-brand-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Assigned Ward</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">142</p>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">Households in Ward 7</p>
        </div>
      </div>

      {/* High-Risk Action Box */}
      <div className="bg-red-50/80 border border-red-200 rounded-3xl p-5 space-y-3">
        <h3 className="text-xs font-black text-red-900 uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          High Risk Patients Requiring Doctor Escalation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div
            onClick={() => navigate('/health-worker/visits')}
            className="p-3.5 bg-white rounded-2xl border border-red-200 cursor-pointer hover:border-red-400 transition-colors flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-slate-900">Patient Meena (45 yrs, Female)</p>
              <p className="text-red-700 font-semibold text-[11px]">SpO2: 92% • Shortness of breath</p>
            </div>
            <StatusBadge status="High Priority" size="xs" />
          </div>

          <div
            onClick={() => navigate('/health-worker/visits')}
            className="p-3.5 bg-white rounded-2xl border border-red-200 cursor-pointer hover:border-red-400 transition-colors flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-slate-900">M. Aarthi (28 yrs, Female)</p>
              <p className="text-slate-600 text-[11px]">3-day Fever • Escalated to Dr. R. Lakshmi</p>
            </div>
            <StatusBadge status="Closed" size="xs" />
          </div>
        </div>
      </div>

      {/* Recent Field Visits Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900">Recent Field Outreach Logs</h3>
          <button
            onClick={() => navigate('/health-worker/visits')}
            className="text-xs font-bold text-brand-600 hover:underline"
          >
            Record New Visit →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[10px] uppercase font-bold">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Visit Type</th>
                <th className="p-3">Date</th>
                <th className="p-3">Chief Complaint</th>
                <th className="p-3">AI Risk Level</th>
                <th className="p-3 text-right">Referral</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {healthWorkerVisits.map(visit => (
                <tr key={visit.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{visit.patientName}</td>
                  <td className="p-3 text-brand-700 font-semibold">{visit.visitType}</td>
                  <td className="p-3 text-slate-500">{visit.visitDate}</td>
                  <td className="p-3 text-slate-600 max-w-[200px] truncate">{visit.chiefComplaint}</td>
                  <td className="p-3">
                    <StatusBadge status={visit.aiDecisionSupport.riskClassification} size="xs" />
                  </td>
                  <td className="p-3 text-right">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Escalated ✓
                    </span>
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
