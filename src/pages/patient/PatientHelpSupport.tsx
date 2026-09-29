import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  HelpCircle,
  Phone,
  Mail,
  FileQuestion,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const PatientHelpSupport: React.FC = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      q: 'How does CareLink AI symptom triage work?',
      a: 'CareLink AI evaluates symptoms you describe via voice or text, checks clinical risk factors, and recommends appropriate primary or emergency facilities.'
    },
    {
      q: 'Does AI replace doctor consultation?',
      a: 'No. CareLink AI provides preliminary decision support. Final medical diagnosis and prescriptions are always verified and confirmed by licensed physicians.'
    },
    {
      q: 'How do digital referrals work?',
      a: 'When an AI assessment or health worker flags a high risk case, a digital referral is immediately transmitted to the chosen hospital for priority doctor scheduling.'
    },
    {
      q: 'What should I do during an emergency?',
      a: 'Use the 108 Emergency button in the header or app to immediately contact the National Emergency Ambulance Medical Response.'
    }
  ];

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
        <h1 className="text-base font-extrabold text-slate-900">Help & Support</h1>
        <div className="w-8" />
      </div>

      {/* Support Action Cards (Matching Wireframe Page 24) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-card text-center space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
            <Phone className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">Tele-Helpdesk</h4>
          <p className="text-[10px] text-slate-500">1800-123-HEALTH (Toll Free)</p>
          <a
            href="tel:1800123456"
            className="inline-block bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold px-3 py-1 rounded-xl text-xs"
          >
            Call Support
          </a>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-card text-center space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
            <Mail className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">Email Support</h4>
          <p className="text-[10px] text-slate-500">support@carelink.ai</p>
          <a
            href="mailto:support@carelink.ai"
            className="inline-block bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold px-3 py-1 rounded-xl text-xs"
          >
            Send Mail
          </a>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-5 space-y-3">
        <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <FileQuestion className="w-4 h-4 text-brand-600" />
          Frequently Asked Questions
        </h3>

        <div className="space-y-3 pt-1">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <h5 className="text-xs font-bold text-slate-900">{faq.q}</h5>
              <p className="text-[11px] text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
