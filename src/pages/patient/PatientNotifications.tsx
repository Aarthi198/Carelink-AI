import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Calendar,
  Send,
  FlaskConical,
  RotateCcw,
  Sparkles,
  Info,
  CheckCheck
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const PatientNotifications: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();

  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = [
    'All',
    'Appointments',
    'Referrals',
    'Follow-ups',
    'Lab Results',
    'Health Tips',
    'System'
  ];

  const filtered = notifications.filter(n => {
    if (activeTab === 'All') return true;
    return n.category === activeTab;
  });

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'Appointments': return <Calendar className="w-4 h-4 text-brand-600" />;
      case 'Referrals': return <Send className="w-4 h-4 text-sky-600" />;
      case 'Follow-ups': return <RotateCcw className="w-4 h-4 text-indigo-600" />;
      case 'Lab Results': return <FlaskConical className="w-4 h-4 text-teal-600" />;
      case 'Health Tips': return <Sparkles className="w-4 h-4 text-amber-500" />;
      default: return <Info className="w-4 h-4 text-slate-500" />;
    }
  };

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
        <h1 className="text-base font-extrabold text-slate-900">Messages & Notifications</h1>
        <button
          onClick={markAllNotificationsRead}
          className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark all read</span>
        </button>
      </div>

      {/* Category Filter Pills (Matching Wireframe Page 21) */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === cat
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notification Items List (Matching Wireframe Page 21) */}
      <div className="space-y-3">
        {filtered.map(notif => (
          <div
            key={notif.id}
            onClick={() => {
              markNotificationRead(notif.id);
              if (notif.link) navigate(notif.link);
            }}
            className={`p-4 rounded-3xl border transition-all cursor-pointer ${
              notif.read
                ? 'bg-white border-slate-200/80 shadow-subtle hover:border-slate-300'
                : 'bg-brand-50/50 border-brand-200 shadow-card hover:border-brand-300'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                {getIcon(notif.category)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium shrink-0">
                    {notif.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {notif.message}
                </p>
                <span className="inline-block mt-2 text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">
                  {notif.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
