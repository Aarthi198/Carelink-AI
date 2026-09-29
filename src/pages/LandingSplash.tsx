import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Stethoscope, Users, Building2, PhoneCall } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const LandingSplash: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const handleQuickDemo = (role: UserRole) => {
    switchRole(role);
    if (role === 'patient') navigate('/patient');
    else if (role === 'doctor') navigate('/doctor');
    else if (role === 'health_worker') navigate('/health-worker');
    else if (role === 'admin') navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/60 via-white to-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Logo size="lg" showTagline={true} />
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-600 px-3 py-2 rounded-xl transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-md shadow-brand-500/20 transition-all active:scale-95"
          >
            Create Account
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto w-full my-auto py-8 text-center">
        {/* Healthcare AI Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200/80 px-4 py-1.5 rounded-full text-brand-700 text-xs font-bold mb-6 shadow-xs animate-bounce">
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span>CareLink AI 2.0 • AI-Assisted Healthcare Access & Continuity</span>
        </div>

        {/* Hero Graphic / Illustration */}
        <div className="relative max-w-sm mx-auto mb-6">
          <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full bg-gradient-to-tr from-brand-400 via-teal-300 to-sky-200 p-1 shadow-2xl flex items-center justify-center relative">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80"
              alt="Healthcare professional using technology"
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute -bottom-2 bg-white text-brand-700 border border-brand-100 px-3.5 py-1 rounded-full text-[11px] font-extrabold shadow-md flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              Verified Clinical Support
            </div>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          Smarter Care for a <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-teal-500">
            Healthier You
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-8 font-medium leading-relaxed">
          AI-powered healthcare support for you and your family. Describe your symptoms in voice or text, get instant clinical triage, book nearby healthcare facilities, and track your referrals & follow-ups effortlessly.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-10">
          <button
            onClick={() => {
              switchRole('patient');
              navigate('/patient');
            }}
            className="w-full sm:w-auto flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 text-sm transition-all active:scale-98"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold py-3.5 px-6 rounded-2xl border border-slate-200 text-sm shadow-xs transition-all"
          >
            Login to Portal
          </button>
        </div>

        {/* 4 Interactive Portal Demonstrators */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 border border-slate-200/80 shadow-card max-w-3xl mx-auto">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3.5 text-center">
            Explore Dedicated Healthcare Roles
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => handleQuickDemo('patient')}
              className="p-3 rounded-2xl bg-brand-50/70 hover:bg-brand-100/80 text-brand-800 border border-brand-200/60 text-left transition-all active:scale-95 group"
            >
              <Heart className="w-5 h-5 text-brand-600 mb-1.5 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold">1. Patient</p>
              <p className="text-[10px] text-slate-500">M. Aarthi</p>
            </button>

            <button
              onClick={() => handleQuickDemo('doctor')}
              className="p-3 rounded-2xl bg-teal-50/70 hover:bg-teal-100/80 text-teal-800 border border-teal-200/60 text-left transition-all active:scale-95 group"
            >
              <Stethoscope className="w-5 h-5 text-teal-600 mb-1.5 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold">2. Doctor</p>
              <p className="text-[10px] text-slate-500">Dr. R. Lakshmi</p>
            </button>

            <button
              onClick={() => handleQuickDemo('health_worker')}
              className="p-3 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200/60 text-left transition-all active:scale-95 group"
            >
              <Users className="w-5 h-5 text-emerald-600 mb-1.5 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold">3. Health Worker</p>
              <p className="text-[10px] text-slate-500">K. Priya (Ward 7)</p>
            </button>

            <button
              onClick={() => handleQuickDemo('admin')}
              className="p-3 rounded-2xl bg-purple-50/70 hover:bg-purple-100/80 text-purple-800 border border-purple-200/60 text-left transition-all active:scale-95 group"
            >
              <Building2 className="w-5 h-5 text-purple-600 mb-1.5 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold">4. Admin</p>
              <p className="text-[10px] text-slate-500">Health Operations</p>
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Footer */}
      <div className="max-w-xl mx-auto w-full text-center pt-4">
        <a
          href="tel:108"
          className="inline-flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-full transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Medical Emergency in India? Call 108</span>
        </a>
      </div>
    </div>
  );
};
