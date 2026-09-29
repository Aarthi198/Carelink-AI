import React from 'react';
import { BarChart3, TrendingUp, Users, Heart, AlertTriangle, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export const HealthWorkerReports: React.FC = () => {
  const visitProgramData = [
    { program: 'ANC Care', count: 34 },
    { program: 'Immunization', count: 48 },
    { program: 'NCD Screening', count: 52 },
    { program: 'Elderly Care', count: 28 },
    { program: 'General Home', count: 42 }
  ];

  const riskData = [
    { name: 'Low Risk', value: 120, color: '#10b981' },
    { name: 'Moderate Risk', value: 45, color: '#f59e0b' },
    { name: 'High Risk (Escalated)', value: 18, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Community Health Field Analytics</h1>
          <p className="text-xs text-slate-500 mt-0.5">Ward 7 Monthly Outreach & Preventive Healthcare Performance</p>
        </div>
        <button
          onClick={() => alert('Exported Ward 7 Health Outreach Report (CSV/PDF).')}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Monthly Summary</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-subtle">
          <span className="text-xs text-slate-500 font-bold">Total Field Visits</span>
          <p className="text-2xl font-black text-slate-900 mt-1">204</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">+14% vs last month</p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-subtle">
          <span className="text-xs text-slate-500 font-bold">High-Risk Escalations</span>
          <p className="text-2xl font-black text-red-600 mt-1">18</p>
          <p className="text-[11px] text-slate-500 mt-1">100% Hospital Referred</p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-subtle">
          <span className="text-xs text-slate-500 font-bold">Referral Closure Rate</span>
          <p className="text-2xl font-black text-brand-600 mt-1">88.5%</p>
          <p className="text-[11px] text-brand-700 font-bold mt-1">16 Completed</p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-subtle">
          <span className="text-xs text-slate-500 font-bold">Vaccine Coverage</span>
          <p className="text-2xl font-black text-teal-600 mt-1">96%</p>
          <p className="text-[11px] text-teal-700 font-bold mt-1">Universal immunization</p>
        </div>
      </div>

      {/* Charts 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-3">
          <h3 className="text-sm font-black text-slate-900">Visits by Healthcare Program</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitProgramData}>
                <XAxis dataKey="program" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#0284c7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-3">
          <h3 className="text-sm font-black text-slate-900">Community Risk Stratification</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
