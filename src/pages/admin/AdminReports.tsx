import React, { useState } from 'react';
import {
  TrendingUp,
  Download,
  Calendar,
  Filter,
  Users,
  Stethoscope,
  HeartHandshake,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RotateCcw,
  Send,
  FlaskConical,
  Activity
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
  Cell,
  Legend
} from 'recharts';

export const AdminReports: React.FC = () => {
  const [dateRange, setDateRange] = useState('01 Sep 2026 - 30 Sep 2026');

  // Chart datasets matching wireframe 10 & updated dashboard
  const appointmentStatusData = [
    { name: 'Completed', value: 62, color: '#10b981' },
    { name: 'Pending', value: 22, color: '#f59e0b' },
    { name: 'Cancelled', value: 14, color: '#ef4444' }
  ];

  const patientAgeGroupData = [
    { range: '0-18', count: 195 },
    { range: '19-35', count: 480 },
    { range: '36-60', count: 370 },
    { range: '60+', count: 203 }
  ];

  const monthlyRegistrationsData = [
    { month: 'Jun', patients: 120, doctors: 4, healthWorkers: 6 },
    { month: 'Jul', patients: 210, doctors: 8, healthWorkers: 10 },
    { month: 'Aug', patients: 350, doctors: 14, healthWorkers: 18 },
    { month: 'Sep', patients: 568, doctors: 22, healthWorkers: 32 }
  ];

  const facilityWorkloadData = [
    { name: 'Govt PHC', consultations: 420, referrals: 95, followUps: 88 },
    { name: 'City Care Hospital', consultations: 380, referrals: 82, followUps: 75 },
    { name: 'Sri Lakshmi Clinic', consultations: 260, referrals: 40, followUps: 45 },
    { name: 'Rural Health Sub Centre', consultations: 180, referrals: 35, followUps: 30 }
  ];

  const commonHealthIssues = [
    { issue: 'Fever / Pyrexia', percentage: 45, count: 562 },
    { issue: 'Cough / Upper RTI', percentage: 38, count: 474 },
    { issue: 'Body Pain / Myalgia', percentage: 28, count: 349 },
    { issue: 'Hypertension', percentage: 20, count: 250 },
    { issue: 'Type 2 Diabetes', percentage: 15, count: 187 }
  ];

  const handleExport = () => {
    alert('Generating consolidated CareLink AI Executive Summary PDF Report...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reports & Analytics</h1>
          <p className="text-sm text-slate-500">Comprehensive public health intelligence, operational KPIs, and facility metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-sm">
            <Calendar className="w-4 h-4 text-sky-600" />
            <span>{dateRange}</span>
          </div>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold shadow-sm transition-colors text-sm"
          >
            <Download className="w-4 h-4" /> Generate Report
          </button>
        </div>
      </div>

      {/* Top Level Metric Cards (Wireframe 10) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Total Appointments</span>
            <Calendar className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-800 mt-2">342</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">+18% this month</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>New Patients Registered</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2">120</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">+12% vs last month</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Active Doctors</span>
            <Stethoscope className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-indigo-600 mt-2">48</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">Across 12 facilities</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Active Health Workers</span>
            <HeartHandshake className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 mt-2">36</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">100% zones covered</div>
        </div>
      </div>

      {/* Row 1 Charts: Appointments by Status & Patients by Age */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments by Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Appointments by Status</h3>
            <span className="text-xs font-semibold text-slate-400">September 2026</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <div className="h-56 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={appointmentStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {appointmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-slate-800">342</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Total</span>
              </div>
            </div>
            <div className="space-y-3">
              {appointmentStatusData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-semibold text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Patients by Age Group */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Patients by Age Group</h3>
            <span className="text-xs font-semibold text-slate-400">Total 1,248</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientAgeGroupData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="range" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                  formatter={(val: number) => [val, 'Patients']}
                />
                <Bar dataKey="count" fill="#0284c7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Common Health Issues & Monthly Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Common Health Issues */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Common Health Issues</h3>
            <span className="text-xs font-semibold text-slate-400">AI Triage Inferred</span>
          </div>
          <div className="space-y-3.5">
            {commonHealthIssues.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.issue}</span>
                  <span className="text-sky-700">{item.percentage}% ({item.count} cases)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Registrations */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Monthly Registration Trends</h3>
            <span className="text-xs font-semibold text-slate-400">Patients / Staff</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRegistrationsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="patients" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4 }} name="Patients" />
                <Line type="monotone" dataKey="doctors" stroke="#10b981" strokeWidth={2} name="Doctors" />
                <Line type="monotone" dataKey="healthWorkers" stroke="#f59e0b" strokeWidth={2} name="Health Workers" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Facility Workload & Referral Performance */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800">Facility Workload & Continuum of Care</h3>
            <p className="text-xs text-slate-500">Consultation volume, referral throughput, and follow-up coverage by facility</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">Quarterly View</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={facilityWorkloadData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="consultations" fill="#0284c7" radius={[4, 4, 0, 0]} name="Consultations" />
              <Bar dataKey="referrals" fill="#0d9488" radius={[4, 4, 0, 0]} name="Referrals Handled" />
              <Bar dataKey="followUps" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Follow-ups" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
