import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Sparkles, Calendar, FileText, User } from 'lucide-react';

export const PatientBottomNav: React.FC = () => {
  const navItems = [
    { name: 'Home', path: '/patient', icon: Home, end: true },
    { name: 'AI Assistant', path: '/patient/ai-assistant', icon: Sparkles },
    { name: 'Appointments', path: '/patient/appointments', icon: Calendar },
    { name: 'Records', path: '/patient/records', icon: FileText },
    { name: 'Profile', path: '/patient/profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-brand-600 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-lg ${isActive ? 'bg-brand-50' : ''}`}>
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-600 stroke-[2.5]' : 'text-slate-500'}`} />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
