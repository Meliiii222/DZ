
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { secureLog } from '@/utils/basicSecurity';
import { Shield, AlertTriangle, Activity, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

export function SecurityMonitor() {
  const [isVisible, setIsVisible] = useState(false);
  const [report, setReport] = useState({
    level: 'medium' as 'low' | 'medium' | 'high',
    threats: 0,
    lastCheck: new Date().toISOString()
  });
  const { user } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setReport(prev => ({
        ...prev,
        lastCheck: new Date().toISOString()
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const refreshReport = () => {
    secureLog.info('Security report refreshed');
    setReport({
      level: 'medium',
      threats: 0,
      lastCheck: new Date().toISOString()
    });
  };

  if (!user) {
    return null;
  }

  // SecurityMonitor désactivé - Branche LYO
  return null;
  
  // return (
  //   <div className="fixed bottom-4 right-4 z-50">
  //     <Button
  //       variant="outline"
  //       size="sm"
  //       onClick={() => setIsVisible(!isVisible)}
  //       className="mb-2"
  //     >
  //       {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
  //       {isVisible ? 'Masquer' : 'Sécurité'}
  //     </Button>

  //     {isVisible && (
  //       <Card className="w-80 shadow-lg">
  //         <CardHeader className="pb-2">
  //           <CardTitle className="text-sm flex items-center gap-2">
  //             <Shield className="w-4 h-4" />
  //             Moniteur de Sécurité
  //             <Badge variant={report.level === 'high' ? 'destructive' : 'default'}>
  //               {report.level}
  //             </Badge>
  //           </CardTitle>
  //         </CardHeader>
  //         <CardContent className="space-y-3">
  //           <div className="flex justify-between text-sm">
  //             <span>Menaces détectées:</span>
  //             <span className={report.threats > 0 ? 'text-red-600' : 'text-green-600'}>
  //               {report.threats}
  //             </span>
  //           </div>
  //           
  //           <div className="flex justify-between text-sm">
  //             <span>Dernière vérification:</span>
  //             <span className="text-gray-600">
  //               {new Date(report.lastCheck).toLocaleTimeString()}
  //             </span>
  //           </div>

  //           <div className="flex gap-2">
  //             <Button size="sm" onClick={refreshReport} className="flex-1">
  //               <Activity className="w-3 h-3 mr-1" />
  //               Actualiser
  //             </Button>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     )}
  //   </div>
  // );
}
