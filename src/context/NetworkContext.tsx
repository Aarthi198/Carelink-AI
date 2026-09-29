import React, { createContext, useContext, useState, useEffect } from 'react';

interface NetworkContextType {
  isOnline: boolean;
  isSimulatedOffline: boolean;
  toggleSimulatedOffline: () => void;
  retryConnection: () => Promise<boolean>;
  connectionStatus: 'Connected' | 'Offline' | 'Retrying...';
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBrowserOnline, setIsBrowserOnline] = useState<boolean>(navigator.onLine);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<'Connected' | 'Offline' | 'Retrying...'>('Connected');

  useEffect(() => {
    const handleOnline = () => {
      setIsBrowserOnline(true);
      if (!isSimulatedOffline) setConnectionStatus('Connected');
    };
    const handleOffline = () => {
      setIsBrowserOnline(false);
      setConnectionStatus('Offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isSimulatedOffline]);

  const toggleSimulatedOffline = () => {
    setIsSimulatedOffline(prev => {
      const next = !prev;
      setConnectionStatus(next ? 'Offline' : (isBrowserOnline ? 'Connected' : 'Offline'));
      return next;
    });
  };

  const retryConnection = async (): Promise<boolean> => {
    setConnectionStatus('Retrying...');
    await new Promise(resolve => setTimeout(resolve, 1200));
    if (isSimulatedOffline) {
      // If simulated, remain offline unless toggled, but return false to show graceful retry failure
      setConnectionStatus('Offline');
      return false;
    }
    const online = navigator.onLine;
    setConnectionStatus(online ? 'Connected' : 'Offline');
    return online;
  };

  const effectiveIsOnline = isBrowserOnline && !isSimulatedOffline;

  return (
    <NetworkContext.Provider
      value={{
        isOnline: effectiveIsOnline,
        isSimulatedOffline,
        toggleSimulatedOffline,
        retryConnection,
        connectionStatus
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};
