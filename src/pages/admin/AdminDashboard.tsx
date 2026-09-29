import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Stethoscope,
  HeartHandshake,
  Building2,
  Calendar,
  Send,
  RotateCcw,
  FlaskConical,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { appointments, referrals, followUps, investigations, facilities, doctors } = useData();

  // Metrics matching Wireframe 2 & 4
  const totalPatients = 1248;
  const totalDoctors = 48;
  const totalHealthWorkers = 36;
  const totalFacilities = 12;

  // Referral Funnel Data (Matching Updated Admin Interface)
  const referralFunnel = [
    { status: 'Created', count: 22, color: '#38bdf8' },
    { status: 'Accepted', count: 46, color: '#0284c7' },
    { status: 'Scheduled', count: 28, color: '#0d9488' },
    { status: 'Completed', count: 20, color: '#10b981' },
    { status: 'Closed', count: 8, color: '#6366f1' }
  ];

  // Follow-up Data (Matching Updated Admin Interface)
  const followUpData = [
    { name: 'Upcoming', count: 32, color: '#0284c7' },
    { name: 'Completed', count: 41, color: '#10b981' },
    { name: 'Missed', count: 13, color: '#ef4444' }
  ];

  // Monthly Registration Trend
  const monthlyTrend = [
    { month: 'Jun', patients: 820, doctors: 32, workers: 24 },
    { month: 'Jul', patients: 940, doctors: 38, workers: 28 },
    { month: 'Aug', patients: 1080, doctors: 42, workers: 32 },
    { month: 'Sep', patients: 1248, doctors: 48, workers: 36 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 mb-1">
            <span>CareLink AI System Administration</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">Health Operations Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time overview of healthcare access, referrals, follow-ups & clinical operations</p>
        </div>

        <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          Local System Time: 30 Sep 2026
        </span>
      </div>

      {/* 4 KPI Top Cards (Matching Wireframe 2 Page 2 & Updated Admin Interface) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigate('/admin/patients')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-subtle hover:border-brand-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Total Patients</span>
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{totalPatients.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">↑ +12% this month</p>
        </div>

        <div
          onClick={() => navigate('/admin/doctors')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-subtle hover:border-brand-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Total Doctors</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{totalDoctors}</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">↑ +8% active physicians</p>
        </div>

        <div
          onClick={() => navigate('/admin/health-workers')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-subtle hover:border-brand-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Health Workers</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{totalHealthWorkers}</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">↑ +5% field coverage</p>
        </div>

        <div
          onClick={() => navigate('/admin/facilities')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-subtle hover:border-brand-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Total Facilities</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{totalFacilities}</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">PHCs, Hospitals & CHCs</p>
        </div>
      </div>

      {/* Referral & Follow-up Funnel Overview (Matching Updated Admin Interface) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Referral Overview Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900">Referral Lifecycle Overview</h3>
              <p className="text-xs text-slate-500">End-to-end community-to-hospital transitions</p>
            </div>
            <span className="bg-brand-50 text-brand-700 font-black text-xs px-3 py-1 rounded-xl">
              124 Total
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Donut Chart */}
            <div className="h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={referralFunnel} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={40} outerRadius={65}>
                    {referralFunnel.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown List */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center"><span className="text-slate-600">• Created:</span><span className="font-bold">22 (18%)</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600">• Accepted:</span><span className="font-bold text-brand-600">46 (37%)</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600">• Scheduled:</span><span className="font-bold text-teal-600">28 (23%)</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600">• Completed:</span><span className="font-bold text-emerald-600">20 (16%)</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600">• Closed:</span><span className="font-bold text-indigo-600">8 (6%)</span></div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
            <span className="text-slate-500">Referral Closure Rate: <strong className="text-slate-900">88.5%</strong></span>
            <button onClick={() => navigate('/admin/referrals')} className="text-brand-600 font-bold hover:underline">
              View Referral Funnel →
            </button>
          </div>
        </div>

        {/* Follow-up Overview Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900">Follow-up Completion Overview</h3>
              <p className="text-xs text-slate-500">Post-consultation recovery & attendance tracking</p>
            </div>
            <span className="bg-teal-50 text-teal-700 font-black text-xs px-3 py-1 rounded-xl">
              86 Total
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Donut Chart */}
            <div className="h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={followUpData} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65}>
                    {followUpData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center"><span className="text-slate-600">• Upcoming:</span><span className="font-bold text-brand-600">32 (37%)</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600">• Completed:</span><span className="font-bold text-emerald-600">41 (48%)</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-600">• Missed:</span><span className="font-bold text-red-600">13 (15%)</span></div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
            <span className="text-slate-500">Follow-up Completion Rate: <strong className="text-emerald-700">76.2%</strong></span>
            <button onClick={() => navigate('/admin/follow-ups')} className="text-brand-600 font-bold hover:underline">
              View Follow-up Tracker →
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Registrations Chart */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4">
        <h3 className="text-sm font-black text-slate-900">Platform User Growth</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="patients" stroke="#0284c7" strokeWidth={3} name="Patients" />
              <Line type="monotone" dataKey="doctors" stroke="#0d9488" strokeWidth={2} name="Doctors" />
              <Line type="monotone" dataKey="workers" stroke="#8b5cf6" strokeWidth={2} name="Health Workers" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
