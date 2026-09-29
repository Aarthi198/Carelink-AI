import React from 'react';

interface VoiceWaveformProps {
  isListening: boolean;
  className?: string;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ isListening, className = '' }) => {
  const bars = [
    { height: 'h-4', delay: '0s' },
    { height: 'h-8', delay: '0.15s' },
    { height: 'h-12', delay: '0.3s' },
    { height: 'h-16', delay: '0.45s' },
    { height: 'h-10', delay: '0.6s' },
    { height: 'h-14', delay: '0.75s' },
    { height: 'h-6', delay: '0.9s' },
  ];

  return (
    <div className={`flex items-center justify-center gap-1.5 h-20 ${className}`}>
      {bars.map((bar, idx) => (
        <span
          key={idx}
          style={{
            animationDelay: bar.delay,
            animationDuration: '1s',
          }}
          className={`w-1.5 rounded-full bg-gradient-to-t from-brand-600 to-teal-400 transition-all ${
            isListening ? 'animate-pulse scale-y-125' : 'opacity-30'
          } ${bar.height}`}
        />
      ))}
    </div>
  );
};
