import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck, Heart, Stethoscope, Users, Building2 } from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchRole } = useAuth();

  const [identifier, setIdentifier] = useState('aarthi@gmail.com');
  const [password, setPassword] = useState('carelink123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');

  const handleRoleTab = (r: UserRole) => {
    setSelectedRole(r);
    if (r === 'patient') {
      setIdentifier('aarthi@gmail.com');
    } else if (r === 'doctor') {
      setIdentifier('dr.lakshmi@carelink.ai');
    } else if (r === 'health_worker') {
      setIdentifier('priya.hw@carelink.ai');
    } else if (r === 'admin') {
      setIdentifier('admin@carelinkai.com');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(identifier, selectedRole);
    if (selectedRole === 'patient') navigate('/patient');
    else if (selectedRole === 'doctor') navigate('/doctor');
    else if (selectedRole === 'health_worker') navigate('/health-worker');
    else if (selectedRole === 'admin') navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100">
        {/* Header */}
        <div className="text-center mb-6">
          <Logo size="lg" className="justify-center mb-3" />
          <h2 className="text-2xl font-black text-slate-900">Welcome Back</h2>
          <p className="text-xs text-slate-500 mt-1">
            Login to continue your healthcare journey.
          </p>
        </div>

        {/* Role Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => handleRoleTab('patient')}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all ${
              selectedRole === 'patient'
                ? 'bg-white text-brand-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Patient
          </button>
          <button
            type="button"
            onClick={() => handleRoleTab('doctor')}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all ${
              selectedRole === 'doctor'
                ? 'bg-white text-teal-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Doctor
          </button>
          <button
            type="button"
            onClick={() => handleRoleTab('health_worker')}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all ${
              selectedRole === 'health_worker'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Worker
          </button>
          <button
            type="button"
            onClick={() => handleRoleTab('admin')}
            className={`py-2 text-[11px] font-bold rounded-xl transition-all ${
              selectedRole === 'admin'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Email or Mobile Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                required
                placeholder="e.g. aarthi@gmail.com or +91 9876543210"
                className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all pl-10"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <a href="#forgot" onClick={e => e.preventDefault()} className="text-[11px] text-brand-600 hover:underline font-semibold">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all pl-10"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Social Logins */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">OR</span>
          <div className="h-px bg-slate-200 flex-1" />
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-2.5 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2.5 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.39 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.61 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-2.5 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2.5 transition-all"
          >
            <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.13.64-2.82 1.44-.61.71-1.15 1.85-1 2.95 1.07.08 2.17-.55 2.83-1.35z"/>
            </svg>
            <span>Continue with Apple</span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-600 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
