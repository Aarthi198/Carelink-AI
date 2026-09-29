import React from 'react';
import { WifiOff, RefreshCw, Wifi } from 'lucide-react';
import { useNetwork } from '../../context/NetworkContext';

export const OfflineBanner: React.FC = () => {
  const { isOnline, connectionStatus, retryConnection, toggleSimulatedOffline, isSimulatedOffline } = useNetwork();

  if (isOnline) {
    return null;
  }

  return (
    <div className="bg-amber-600 text-white px-4 py-2 text-xs md:text-sm font-medium shadow-md sticky top-0 z-50 transition-all flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 animate-pulse shrink-0" />
        <span>
          <strong>No internet connection.</strong> You are viewing cached health records. Changes will sync once reconnected.
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => retryConnection()}
          disabled={connectionStatus === 'Retrying...'}
          className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${connectionStatus === 'Retrying...' ? 'animate-spin' : ''}`} />
          {connectionStatus === 'Retrying...' ? 'Retrying...' : 'Retry'}
        </button>

        <button
          onClick={toggleSimulatedOffline}
          className="text-[11px] underline text-amber-100 hover:text-white"
        >
          {isSimulatedOffline ? 'Resume Online' : 'Dismiss'}
        </button>
      </div>
    </div>
  );
};
