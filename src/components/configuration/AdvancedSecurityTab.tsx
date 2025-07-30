
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  Shield, 
  Lock, 
  Eye, 
  Brain, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Users,
  Database,
  Key
} from 'lucide-react';

interface AdvancedSecurityTabProps {
  language?: string;
}

export function AdvancedSecurityTab({ language = "fr" }: AdvancedSecurityTabProps) {
  const [zeroTrustEnabled, setZeroTrustEnabled] = useState(true);
  const [endToEndEncryption, setEndToEndEncryption] = useState(true);
  const [auditTrailEnabled, setAuditTrailEnabled] = useState(true);
  const [behavioralDetection, setBehavioralDetection] = useState(true);
  const [threatLevel, setThreatLevel] = useState(15);

  const zeroTrustMetrics = [
    { name: "Vérifications d'identité", value: "1,247", status: "active", icon: Users },
    { name: "Autorisations validées", value: "892", status: "secure", icon: Key },
    { name: "Accès refusés", value: "23", status: "warning", icon: Shield },
    { name: "Sessions actives", value: "156", status: "active", icon: Activity }
  ];

  const encryptionStatus = [
    { component: "Base de données", status: "AES-256", level: 100, icon: Database },
    { component: "Communications", status: "TLS 1.3", level: 100, icon: Activity },
    { component: "Fichiers stockés", status: "RSA-4096", level: 100, icon: Lock },
    { component: "Métadonnées", status: "ChaCha20", level: 95, icon: Eye }
  ];

  const auditTrailData = [
    { user: "admin@ministry.dz", action: "Accès document confidentiel", resource: "LOI_2024_01.pdf", time: "2025-01-08 14:30", risk: "low" },
    { user: "juriste@ministry.dz", action: "Modification procédure", resource: "PROC_VISA_001", time: "2025-01-08 14:15", risk: "medium" },
    { user: "citoyen@email.dz", action: "Recherche multiple", resource: "Système", time: "2025-01-08 14:00", risk: "high" },
    { user: "admin@ministry.dz", action: "Export données", resource: "Reports_Q4", time: "2025-01-08 13:45", risk: "medium" }
  ];

  const behavioralAnomalies = [
    { type: "Accès inhabituel", description: "Connexion depuis un nouvel appareil", severity: "medium", user: "juriste@ministry.dz", time: "14:25" },
    { type: "Activité suspecte", description: "Téléchargements multiples rapides", severity: "high", user: "citoyen@email.dz", time: "14:20" },
    { type: "Horaire atypique", description: "Accès en dehors des heures ouvrables", severity: "low", user: "admin@ministry.dz", time: "02:15" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatLevel(prev => Math.max(0, prev + (Math.random() - 0.5) * 10));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  // Pagination pour l'audit trail
  const {
    currentData: paginatedAuditTrail,
    currentPage: auditCurrentPage,
    totalPages: auditTotalPages,
    itemsPerPage: auditItemsPerPage,
    totalItems: auditTotalItems,
    setCurrentPage: setAuditCurrentPage,
    setItemsPerPage: setAuditItemsPerPage
  } = usePagination({
    data: auditTrailData,
    itemsPerPage: 4
  });

  // Pagination pour les anomalies comportementales
  const {
    currentData: paginatedAnomalies,
    currentPage: anomaliesCurrentPage,
    totalPages: anomaliesTotalPages,
    itemsPerPage: anomaliesItemsPerPage,
    totalItems: anomaliesTotalItems,
    setCurrentPage: setAnomaliesCurrentPage,
    setItemsPerPage: setAnomaliesItemsPerPage
  } = usePagination({
    data: behavioralAnomalies,
    itemsPerPage: 3
  });

  return (
    <div className="space-y-6">
      {/* Alert de niveau de menace */}
      <Alert className={threatLevel > 30 ? "border-red-500 bg-red-50" : "border-green-500 bg-green-50"}>
        <Shield className={`w-4 h-4 ${threatLevel > 30 ? 'text-red-600' : 'text-green-600'}`} />
        <AlertDescription className={threatLevel > 30 ? 'text-red-800' : 'text-green-800'}>
          <strong>Niveau de menace actuel: {Math.round(threatLevel)}%</strong>
          {threatLevel > 30 ? " - Surveillance renforcée activée" : " - Système sécurisé"}
        </AlertDescription>
      </Alert>

      {/* Architecture Zero-Trust */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <CardTitle>Architecture Zero-Trust</CardTitle>
            </div>
            <Switch 
              checked={zeroTrustEnabled} 
              onCheckedChange={setZeroTrustEnabled}
            />
          </div>
          <CardDescription>
            Vérification continue de l'identité et des autorisations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {zeroTrustMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.name}</div>
                  <Badge className={`mt-2 ${
                    metric.status === 'secure' ? 'bg-green-100 text-green-800' :
                    metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {metric.status === 'secure' ? 'Sécurisé' :
                     metric.status === 'warning' ? 'Attention' : 'Actif'}
                  </Badge>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Configurer politiques</Button>
            <Button variant="outline" size="sm">Voir détails</Button>
          </div>
        </CardContent>
      </Card>

      {/* Chiffrement End-to-End */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-600" />
              <CardTitle>Chiffrement End-to-End</CardTitle>
            </div>
            <Switch 
              checked={endToEndEncryption} 
              onCheckedChange={setEndToEndEncryption}
            />
          </div>
          <CardDescription>
            Protection complète des données sensibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {encryptionStatus.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">{item.component}</div>
                      <div className="text-sm text-gray-600">Algorithme: {item.status}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={item.level} className="w-24" />
                    <span className="text-sm font-medium">{item.level}%</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">Renouveler clés</Button>
            <Button variant="outline" size="sm">Audit chiffrement</Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Trail Complet */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-600" />
              <CardTitle>Audit Trail Complet</CardTitle>
            </div>
            <Switch 
              checked={auditTrailEnabled} 
              onCheckedChange={setAuditTrailEnabled}
            />
          </div>
          <CardDescription>
            Traçabilité de toutes les actions utilisateur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paginatedAuditTrail.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="font-medium">{entry.action}</div>
                    <div className="text-sm text-gray-600">
                      {entry.user} • {entry.resource}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{entry.time}</span>
                  <Badge className={getSeverityColor(entry.risk)}>
                    {entry.risk === 'high' ? 'Élevé' : entry.risk === 'medium' ? 'Moyen' : 'Faible'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Pagination
              currentPage={auditCurrentPage}
              totalPages={auditTotalPages}
              totalItems={auditTotalItems}
              itemsPerPage={auditItemsPerPage}
              onPageChange={setAuditCurrentPage}
              onItemsPerPageChange={setAuditItemsPerPage}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">Exporter audit</Button>
            <Button variant="outline" size="sm">Filtres avancés</Button>
          </div>
        </CardContent>
      </Card>

      {/* Détection Comportementale */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-orange-600" />
              <CardTitle>Détection d'Intrusion Comportementale</CardTitle>
            </div>
            <Switch 
              checked={behavioralDetection} 
              onCheckedChange={setBehavioralDetection}
            />
          </div>
          <CardDescription>
            IA pour détecter les accès anormaux
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paginatedAnomalies.map((anomaly, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`w-4 h-4 ${getRiskColor(anomaly.severity)}`} />
                  <div>
                    <div className="font-medium">{anomaly.type}</div>
                    <div className="text-sm text-gray-600">{anomaly.description}</div>
                    <div className="text-xs text-gray-500">Utilisateur: {anomaly.user}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{anomaly.time}</span>
                  <Badge className={getSeverityColor(anomaly.severity)}>
                    {anomaly.severity === 'high' ? 'Critique' : 
                     anomaly.severity === 'medium' ? 'Moyen' : 'Faible'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Pagination
              currentPage={anomaliesCurrentPage}
              totalPages={anomaliesTotalPages}
              totalItems={anomaliesTotalItems}
              itemsPerPage={anomaliesItemsPerPage}
              onPageChange={setAnomaliesCurrentPage}
              onItemsPerPageChange={setAnomaliesItemsPerPage}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">Configurer seuils</Button>
            <Button variant="outline" size="sm">Entraîner modèle IA</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
