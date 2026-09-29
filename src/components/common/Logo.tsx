import React from 'react';
import { Activity } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false, className = '', onClick }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-base font-bold',
    md: 'text-lg font-bold',
    lg: 'text-2xl font-extrabold',
    xl: 'text-3xl font-black'
  };

  return (
    <div className={`flex items-center gap-2.5 cursor-pointer select-none ${className}`} onClick={onClick}>
      <div className={`relative ${iconSizes[size]} rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20`}>
        {/* Heart + Cross + AI Pulse Icon */}
        <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-current text-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          <path fill="#0284c7" d="M10.5 7.5h3v2.25h2.25v3h-2.25V15h-3v-2.25H8.25v-3h2.25z" />
        </svg>
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-300 rounded-full border-2 border-white animate-pulse" />
      </div>
      <div>
        <div className="flex items-center tracking-tight text-slate-900 leading-none">
          <span className={textSizes[size]}>CareLink</span>
          <span className={`${textSizes[size]} text-brand-600 ml-1 font-extrabold`}>AI</span>
        </div>
        {showTagline && (
          <p className="text-[11px] text-slate-500 font-medium tracking-wide mt-0.5">
            Your Health, Our Priority
          </p>
        )}
      </div>
    </div>
  );
};
