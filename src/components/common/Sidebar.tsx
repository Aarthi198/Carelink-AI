import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Send,
  Stethoscope,
  FlaskConical,
  RotateCcw,
  MessageSquare,
  UserCheck,
  Building2,
  BarChart3,
  Settings,
  ClipboardList,
  HeartHandshake,
  LogOut,
  ShieldCheck,
  Activity,
  FileSpreadsheet
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { UserRole } from '../../types';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  name: string;
  path: string;
  icon: any;
  badge?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { role, user, logout } = useAuth();
  const { referrals, investigations, followUps, appointments } = useData();
  const navigate = useNavigate();

  // Pending counts for badges
  const pendingReferralsCount = referrals.filter(r => r.status === 'Received' || r.status === 'Created').length;
  const pendingInvestigationsCount = investigations.filter(i => !i.doctorReviewed && i.status === 'Result Available').length;
  const upcomingFollowUpsCount = followUps.filter(f => f.status === 'Upcoming').length;

  const doctorNav: NavItem[] = [
    { name: 'Dashboard', path: '/doctor', icon: LayoutDashboard },
    { name: 'Patients', path: '/doctor/patients', icon: Users },
    { name: 'Appointments', path: '/doctor/appointments', icon: Calendar },
    { name: 'Referrals', path: '/doctor/referrals', icon: Send, badge: pendingReferralsCount > 0 ? pendingReferralsCount : undefined },
    { name: 'Consultations', path: '/doctor/consultation', icon: Stethoscope },
    { name: 'Investigations', path: '/doctor/investigations', icon: FlaskConical, badge: pendingInvestigationsCount > 0 ? pendingInvestigationsCount : undefined },
    { name: 'Follow-ups', path: '/doctor/follow-ups', icon: RotateCcw, badge: upcomingFollowUpsCount > 0 ? upcomingFollowUpsCount : undefined },
    { name: 'Messages', path: '/doctor/messages', icon: MessageSquare },
    { name: 'Profile', path: '/doctor/profile', icon: UserCheck },
  ];

  const healthWorkerNav: NavItem[] = [
    { name: 'Home', path: '/health-worker', icon: LayoutDashboard },
    { name: 'Patients', path: '/health-worker/patients', icon: Users },
    { name: 'Visits', path: '/health-worker/visits', icon: ClipboardList },
    { name: 'Referrals', path: '/health-worker/referrals', icon: Send, badge: pendingReferralsCount > 0 ? pendingReferralsCount : undefined },
    { name: 'Reports', path: '/health-worker/reports', icon: BarChart3 },
    { name: 'Messages', path: '/health-worker/messages', icon: MessageSquare },
    { name: 'Profile', path: '/health-worker/profile', icon: UserCheck },
  ];

  const adminNav: NavItem[] = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { name: 'Patients', path: '/admin/patients', icon: UserCheck },
    { name: 'Doctors', path: '/admin/doctors', icon: Stethoscope },
    { name: 'Health Workers', path: '/admin/health-workers', icon: HeartHandshake },
    { name: 'Facilities', path: '/admin/facilities', icon: Building2 },
    { name: 'Referrals', path: '/admin/referrals', icon: Send },
    { name: 'Follow-ups', path: '/admin/follow-ups', icon: RotateCcw },
    { name: 'Investigations', path: '/admin/investigations', icon: FlaskConical },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  const currentNav = role === 'doctor' ? doctorNav : role === 'health_worker' ? healthWorkerNav : adminNav;

  return (
    <aside className={`w-64 bg-white border-r border-slate-200/80 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 ${className}`}>
      <div className="space-y-6">
        {/* Role & User Info Badge */}
        <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center gap-3">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80'}
            alt="User"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/30"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Dr. R. Lakshmi'}</p>
            <p className="text-[11px] text-slate-500 truncate">
              {role === 'doctor' ? 'General Physician' : role === 'health_worker' ? 'Community Health Officer' : 'System Administrator'}
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {currentNav.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/doctor' || item.path === '/health-worker' || item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </div>
              {item.badge !== undefined && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Support & Logout */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
