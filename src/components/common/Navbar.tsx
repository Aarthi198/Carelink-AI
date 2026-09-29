import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bell,
  Wifi,
  WifiOff,
  PhoneCall,
  User as UserIcon,
  ChevronDown,
  LogOut,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Users,
  Building2,
  Check
} from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNetwork } from '../../context/NetworkContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, switchRole, logout, patientProfile } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const { isOnline, toggleSimulatedOffline, isSimulatedOffline } = useNetwork();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read);

  const handleRoleChange = (newRole: UserRole) => {
    switchRole(newRole);
    setShowRoleDropdown(false);
    if (newRole === 'patient') navigate('/patient');
    else if (newRole === 'doctor') navigate('/doctor');
    else if (newRole === 'health_worker') navigate('/health-worker');
    else if (newRole === 'admin') navigate('/admin');
  };

  const roleLabels: Record<UserRole, { label: string; sub: string; icon: any; color: string }> = {
    patient: {
      label: 'Patient Portal',
      sub: patientProfile.name || 'M. Aarthi',
      icon: UserIcon,
      color: 'bg-brand-50 text-brand-700 border-brand-200'
    },
    doctor: {
      label: 'Doctor Portal',
      sub: 'Dr. R. Lakshmi (MD)',
      icon: Stethoscope,
      color: 'bg-teal-50 text-teal-700 border-teal-200'
    },
    health_worker: {
      label: 'Health Worker',
      sub: 'K. Priya (Ward 7)',
      icon: Users,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    admin: {
      label: 'Admin Portal',
      sub: 'Health Operations',
      icon: Building2,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <Logo
            size="md"
            showTagline={false}
            onClick={() => {
              if (role === 'patient') navigate('/patient');
              else if (role === 'doctor') navigate('/doctor');
              else if (role === 'health_worker') navigate('/health-worker');
              else if (role === 'admin') navigate('/admin');
              else navigate('/');
            }}
          />
        </div>

        {/* Center: Role Switcher for Interactive Demonstration */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-xs transition-all hover:shadow-sm ${roleLabels[role].color}`}
            title="Switch user role"
          >
            {React.createElement(roleLabels[role].icon, { className: 'w-3.5 h-3.5' })}
            <span className="hidden sm:inline">{roleLabels[role].label}:</span>
            <span className="font-bold">{roleLabels[role].sub}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>

          {showRoleDropdown && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fadeIn">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Active Persona
              </div>
              {(Object.keys(roleLabels) as UserRole[]).map(r => {
                const item = roleLabels[r];
                const isCurrent = role === r;
                return (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      isCurrent ? 'bg-brand-50 text-brand-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {React.createElement(item.icon, {
                        className: `w-4 h-4 ${isCurrent ? 'text-brand-600' : 'text-slate-400'}`
                      })}
                      <div>
                        <p className="font-semibold">{item.label}</p>
                        <p className="text-[10px] text-slate-500">{item.sub}</p>
                      </div>
                    </div>
                    {isCurrent && <Check className="w-4 h-4 text-brand-600" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Action Icons: Network status, 108 Emergency, Notifications, Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Network Simulator Toggle */}
          <button
            onClick={toggleSimulatedOffline}
            title={isOnline ? 'Online (Click to test offline mode)' : 'Offline mode active'}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
              isOnline
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
            }`}
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{isOnline ? 'Online' : 'Offline Mode'}</span>
          </button>

          {/* Quick Call 108 */}
          <a
            href="tel:108"
            className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-2.5 py-1 rounded-full text-xs font-bold transition-all active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span className="hidden sm:inline">108</span>
          </a>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadNotifs.length}
                </span>
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-sm text-slate-800">Notifications</h5>
                    {unreadNotifs.length > 0 && (
                      <span className="bg-brand-100 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {unreadNotifs.length} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-brand-600 hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto space-y-2">
                  {notifications.slice(0, 6).map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.link) {
                          navigate(n.link);
                          setShowNotifDropdown(false);
                        }
                      }}
                      className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                        n.read ? 'bg-white hover:bg-slate-50 text-slate-600' : 'bg-brand-50/70 text-slate-900 font-medium'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-bold text-slate-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{n.message}</p>
                    </div>
                  ))}
                </div>

                {role === 'patient' && (
                  <div className="pt-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        navigate('/patient/notifications');
                        setShowNotifDropdown(false);
                      }}
                      className="text-xs font-bold text-brand-600 hover:text-brand-700"
                    >
                      View All Notifications →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Profile Avatar / Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User'}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
              />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-fadeIn">
                <div className="p-3 border-b border-slate-100">
                  <p className="font-bold text-xs text-slate-900">{user?.name || 'M. Aarthi'}</p>
                  <p className="text-[11px] text-slate-500">{user?.email || 'aarthi@gmail.com'}</p>
                  <span className="inline-block mt-1.5 text-[10px] uppercase tracking-wider font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                    {role.replace('_', ' ')}
                  </span>
                </div>

                <div className="p-1">
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      if (role === 'patient') navigate('/patient/profile');
                      else if (role === 'doctor') navigate('/doctor/profile');
                      else if (role === 'health_worker') navigate('/health-worker/profile');
                      else navigate('/admin/settings');
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setShowProfileDropdown(false);
                      navigate('/');
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
