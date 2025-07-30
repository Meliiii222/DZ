
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { secureLog } from '@/utils/basicSecurity';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';

interface SecurityContextType {
  securityLevel: 'low' | 'medium' | 'high';
  threats: string[];
  logThreat: (threat: string, details?: any) => void;
  clearThreats: () => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [threats, setThreats] = useState<string[]>([]);

  const logThreat = useCallback((threat: string, details?: any) => {
    secureLog.warn('Security threat detected', { threat, details });
    setThreats(prev => [...prev, threat]);
  }, []);

  const clearThreats = useCallback(() => {
    setThreats([]);
  }, []);

  const contextValue = useMemo(() => ({
    securityLevel,
    threats,
    logThreat,
    clearThreats
  }), [securityLevel, threats, logThreat, clearThreats]);

  return (
    <SecurityContext.Provider value={contextValue}>
      {children}
      {threats.length > 0 && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {threats.length} menace(s) détectée(s). Vérifiez la sécurité de votre session.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within SecurityProvider');
  }
  return context;
}
