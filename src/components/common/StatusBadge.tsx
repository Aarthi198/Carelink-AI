import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, AlertCircle, Sparkles, ShieldCheck, UserCheck, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  type?: 'status' | 'priority' | 'lifecycle' | 'ai' | 'verified';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = 'status',
  size = 'sm',
  className = ''
}) => {
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  const getStyle = () => {
    const s = status.toLowerCase();

    // Red / Emergency / High Priority / Missed / Rejected
    if (
      s.includes('high priority') ||
      s.includes('urgent') ||
      s.includes('emergency') ||
      s.includes('high risk') ||
      s.includes('missed') ||
      s.includes('rejected') ||
      s.includes('cancelled')
    ) {
      return {
        bg: 'bg-red-50 text-red-700 border-red-200',
        icon: <AlertCircle className="w-3.5 h-3.5 text-red-600 mr-1 inline" />
      };
    }

    // Green / Confirmed / Accepted / Completed / Reviewed / Active / Routine
    if (
      s.includes('confirmed') ||
      s.includes('accepted') ||
      s.includes('completed') ||
      s.includes('closed') ||
      s.includes('reviewed') ||
      s.includes('active') ||
      s.includes('notified') ||
      s.includes('routine') ||
      s.includes('normal')
    ) {
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1 inline" />
      };
    }

    // Orange / Yellow / Pending / Scheduled / Received / Processing / Moderate
    if (
      s.includes('pending') ||
      s.includes('scheduled') ||
      s.includes('received') ||
      s.includes('processing') ||
      s.includes('under review') ||
      s.includes('result available') ||
      s.includes('medium') ||
      s.includes('moderate') ||
      s.includes('upcoming')
    ) {
      return {
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        icon: <Clock className="w-3.5 h-3.5 text-amber-600 mr-1 inline" />
      };
    }

    // AI / Purple
    if (s.includes('ai') || s.includes('preliminary') || s.includes('support')) {
      return {
        bg: 'bg-purple-50 text-purple-700 border-purple-200',
        icon: <Sparkles className="w-3.5 h-3.5 text-purple-600 mr-1 inline" />
      };
    }

    // Blue / Default
    return {
      bg: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-sky-600 mr-1 inline" />
    };
  };

  const style = getStyle();

  if (type === 'verified') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 ${sizeClasses[size]} ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mr-1" />
        Verified
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center font-semibold rounded-full border tracking-tight ${style.bg} ${sizeClasses[size]} ${className}`}>
      {style.icon}
      <span>{status}</span>
    </span>
  );
};

export const PriorityBadge: React.FC<{ priority: string; size?: 'xs' | 'sm' | 'md'; className?: string }> = ({
  priority,
  size = 'sm',
  className = ''
}) => {
  return <StatusBadge status={priority} type="priority" size={size} className={className} />;
};

