// src/contexts/SettingsContext.tsx
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface SettingsContextType {
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings debe usarse dentro de SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const openSettings  = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  return (
    <SettingsContext.Provider value={{ isSettingsOpen, openSettings, closeSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};