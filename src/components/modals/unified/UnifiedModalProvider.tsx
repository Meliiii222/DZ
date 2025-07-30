
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalState {
  isOpen: boolean;
  data?: any;
}

interface ModalContextType {
  modals: Record<string, ModalState>;
  openModal: (name: string, data?: any) => void;
  closeModal: (name: string) => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface UnifiedModalProviderProps {
  children: ReactNode;
}

export function UnifiedModalProvider({ children }: UnifiedModalProviderProps) {
  const [modals, setModals] = useState<Record<string, ModalState>>({});

  const openModal = (name: string, data?: any) => {
    setModals(prev => ({
      ...prev,
      [name]: { isOpen: true, data }
    }));
  };

  const closeModal = (name: string) => {
    setModals(prev => ({
      ...prev,
      [name]: { isOpen: false }
    }));
  };

  const closeAllModals = () => {
    setModals({});
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal, closeAllModals }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useUnifiedModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useUnifiedModals must be used within UnifiedModalProvider');
  }
  return context;
}
