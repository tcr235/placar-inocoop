import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ClockContextProps = {
  currentTime: string;
};

const ClockContext = createContext<ClockContextProps | undefined>(undefined);

interface ClockProviderProps {
  children: ReactNode;
}

function formatHHMM(date: Date): string {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

export const ClockProvider: React.FC<ClockProviderProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState<string>(() => formatHHMM(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatHHMM(new Date()));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <ClockContext.Provider value={{ currentTime }}>
      {children}
    </ClockContext.Provider>
  );
};

export function useClockContext(): ClockContextProps {
  const context = useContext(ClockContext);
  if (!context) {
    throw new Error('useClockContext must be used within a ClockProvider');
  }
  return context;
}