import React from 'react';
import { Check, Clock, AlertCircle, Circle } from 'lucide-react';

export interface TimelineStepItem {
  status?: string;
  title: string;
  timestamp?: string;
  actor?: string;
  note?: string;
  completed: boolean;
  isCurrent?: boolean;
}

interface TimelineProps {
  steps: TimelineStepItem[];
  variant?: 'vertical' | 'horizontal';
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  steps,
  variant = 'vertical',
  className = ''
}) => {
  if (variant === 'horizontal') {
    return (
      <div className={`w-full py-4 ${className}`}>
        <div className="flex items-center justify-between relative">
          {/* Connector line */}
          <div className="absolute top-4 left-4 right-4 h-1 bg-slate-200 -z-0" />
          <div
            className="absolute top-4 left-4 h-1 bg-brand-500 -z-0 transition-all duration-500"
            style={{
              width: `${(steps.filter(s => s.completed).length - 1) / Math.max(steps.length - 1, 1) * 100}%`
            }}
          />

          {steps.map((step, idx) => {
            const isCompleted = step.completed;
            const isLast = idx === steps.length - 1;

            return (
              <div key={idx} className="flex flex-col items-center relative z-10 text-center px-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span className="text-xs font-semibold">{idx + 1}</span>
                  )}
                </div>
                <span className={`text-[11px] font-semibold mt-2 max-w-[80px] leading-tight ${
                  isCompleted ? 'text-slate-800' : 'text-slate-400'
                }`}>
                  {step.title}
                </span>
                {step.timestamp && step.timestamp !== 'Pending' && (
                  <span className="text-[9px] text-slate-400 mt-0.5 max-w-[85px] truncate">
                    {step.timestamp}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 relative ${className}`}>
      {/* Vertical line */}
      <div className="absolute top-4 bottom-4 left-4 w-0.5 bg-slate-200 -z-0" />

      {steps.map((step, idx) => {
        const isCompleted = step.completed;

        return (
          <div key={idx} className="flex items-start gap-3.5 relative z-10">
            <div
              className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-all ${
                isCompleted
                  ? 'bg-brand-600 text-white shadow-sm ring-4 ring-brand-50'
                  : 'bg-white border-2 border-slate-300 text-slate-400 ring-4 ring-slate-50'
              }`}
            >
              {isCompleted ? (
                <Check className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <Circle className="w-3 h-3 text-slate-300 fill-slate-200" />
              )}
            </div>
            <div className="flex-1 pt-0.5">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <h4 className={`text-sm font-semibold ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                  {step.title}
                </h4>
                {step.timestamp && (
                  <span className={`text-xs ${isCompleted ? 'text-slate-500 font-medium' : 'text-slate-400 italic'}`}>
                    {step.timestamp}
                  </span>
                )}
              </div>
              {step.actor && (
                <p className="text-xs font-medium text-brand-700 mt-0.5">
                  {step.actor}
                </p>
              )}
              {step.note && (
                <p className="text-xs text-slate-600 mt-0.5 bg-slate-50 border border-slate-100 p-2 rounded-lg">
                  {step.note}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
