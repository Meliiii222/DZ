import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Pagination } from "@/components/common/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { SectionHeader } from "@/components/common/SectionHeader";
import { AdvancedSecurityTab } from "./AdvancedSecurityTab";
import { NewSecurityPolicyModal } from "@/components/modals/NewSecurityPolicyModal";
import { AlertsConfigurationModal } from "@/components/modals/AlertsConfigurationModal";
import { useState } from "react";
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  Activity, 
  Search,
  Plus,
  Settings,
  RefreshCw,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { DataGovernanceTab } from "./DataGovernanceTab";
import { RGPDComplianceTab } from "./RGPDComplianceTab";

interface SecuritySectionProps {
  language?: string;
}

export function SecuritySection({ language = "fr" }: SecuritySectionProps) {
  const [threatsFilter, setThreatsFilter] = useState("");
  const [showNewPolicyModal, setShowNewPolicyModal] = useState(false);
  const [showAlertsConfigModal, setShowAlertsConfigModal] = useState(false);

  const securityMetrics = [
    { name: "Système de Sécurité", status: "Optimal", score: 95, lastCheck: "2025-01-02 15:30" },
    { name: "Authentification", status: "Sécurisé", score: 98, lastCheck: "2025-01-02 15:25" },
    { name: "Chiffrement", status: "Actif", score: 100, lastCheck: "2025-01-02 15:20" },
    { name: "Pare-feu", status: "Actif", score: 92, lastCheck: "2025-01-02 15:15" },
    { name: "Antivirus", status: "À jour", score: 96, lastCheck: "2025-01-02 14:45" },
    { name: "Sauvegarde", status: "Opérationnel", score: 88, lastCheck: "2025-01-02 02:00" }
  ];

  const securityPolicies = [
    { name: "Politique de Mots de Passe", description: "Exigences de complexité des mots de passe", active: true, lastUpdate: "2024-12-15" },
    { name: "Authentification à Deux Facteurs", description: "2FA obligatoire pour les administrateurs", active: true, lastUpdate: "2024-12-10" },
    { name: "Tentatives de Connexion", description: "Limitation des tentatives de connexion", active: true, lastUpdate: "2024-12-05" },
    { name: "Session Timeout", description: "Expiration automatique des sessions", active: true, lastUpdate: "2024-11-20" },
    { name: "Chiffrement des Données", description: "Chiffrement AES-256 des données sensibles", active: true, lastUpdate: "2024-11-15" },
    { name: "Audit de Sécurité", description: "Journalisation des activités de sécurité", active: true, lastUpdate: "2024-11-10" }
  ];

  const detectedThreats = [
    { 
      type: "Tentative de Force Brutale", 
      severity: "Élevé", 
      source: "192.168.1.150", 
      target: "Connexion Admin", 
      time: "2025-01-02 14:45", 
      status: "Bloqué",
      attempts: 25
    },
    { 
      type: "Scan de Ports", 
      severity: "Moyen", 
      source: "10.0.0.75", 
      target: "Serveur Web", 
      time: "2025-01-02 13:20", 
      status: "Surveillé",
      attempts: 12
    },
    { 
      type: "Injection SQL", 
      severity: "Critique", 
      source: "203.0.113.45", 
      target: "Base de Données", 
      time: "2025-01-02 11:15", 
      status: "Bloqué",
      attempts: 8
    },
    { 
      type: "Accès Non Autorisé", 
      severity: "Élevé", 
      source: "172.16.0.100", 
      target: "Documents Confidentiels", 
      time: "2025-01-02 09:30", 
      status: "Investigué",
      attempts: 3
    },
    { 
      type: "Malware Détecté", 
      severity: "Critique", 
      source: "Poste Client", 
      target: "Système Fichiers", 
      time: "2025-01-01 16:45", 
      status: "Nettoyé",
      attempts: 1
    },
    { 
      type: "Phishing Suspect", 
      severity: "Moyen", 
      source: "Email Externe", 
      target: "Utilisateurs", 
      time: "2025-01-01 10:20", 
      status: "Quarantaine",
      attempts: 15
    }
  ].filter(threat => 
    threat.type.toLowerCase().includes(threatsFilter.toLowerCase()) ||
    threat.source.toLowerCase().includes(threatsFilter.toLowerCase()) ||
    threat.target.toLowerCase().includes(threatsFilter.toLowerCase()) ||
    threat.severity.toLowerCase().includes(threatsFilter.toLowerCase())
  );

  const auditLogs = [
    { time: "2025-01-02 15:30", user: "Admin", action: "Modification Politique Sécurité", resource: "Système", result: "Succès" },
    { time: "2025-01-02 14:45", user: "Système", action: "Blocage IP Suspect", resource: "Pare-feu", result: "Succès" },
    { time: "2025-01-02 13:20", user: "A.Benali", action: "Consultation Document Confidentiel", resource: "Document #1234", result: "Succès" },
    { time: "2025-01-02 11:15", user: "Système", action: "Détection Injection SQL", resource: "Base de Données", result: "Bloqué" },
    { time: "2025-01-02 09:30", user: "Inconnu", action: "Tentative Accès Non Autorisé", resource: "Admin Panel", result: "Échec" },
    { time: "2025-01-01 16:45", user: "Système", action: "Suppression Malware", resource: "Poste #15", result: "Succès" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critique': return 'bg-red-100 text-red-800';
      case 'Élevé': return 'bg-orange-100 text-orange-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Bloqué': return 'bg-red-100 text-red-800';
      case 'Nettoyé': return 'bg-green-100 text-green-800';
      case 'Surveillé': return 'bg-blue-100 text-blue-800';
      case 'Quarantaine': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Pagination pour les menaces détectées
  const {
    currentData: paginatedThreats,
    currentPage: threatsCurrentPage,
    totalPages: threatsTotalPages,
    itemsPerPage: threatsItemsPerPage,
    totalItems: threatsTotalItems,
    setCurrentPage: setThreatsCurrentPage,
    setItemsPerPage: setThreatsItemsPerPage
  } = usePagination({
    data: detectedThreats,
    itemsPerPage: 10
  });

  // Pagination pour les logs d'audit
  const {
    currentData: paginatedAuditLogs,
    currentPage: auditLogsCurrentPage,
    totalPages: auditLogsTotalPages,
    itemsPerPage: auditLogsItemsPerPage,
    totalItems: auditLogsTotalItems,
    setCurrentPage: setAuditLogsCurrentPage,
    setItemsPerPage: setAuditLogsItemsPerPage
  } = usePagination({
    data: auditLogs,
    itemsPerPage: 10
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SectionHeader
          title="Gouvernance et Sécurité"
          description="Surveillance et gestion de la sécurité du système et gouvernance des données"
          icon={Shield}
          iconColor="text-red-600"
        />
        <Button onClick={() => setShowAlertsConfigModal(true)} variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Configuration Alertes & Notifications
        </Button>
      </div>

      <Tabs defaultValue="status" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="status">Statut Sécurité</TabsTrigger>
          <TabsTrigger value="policies">Politiques</TabsTrigger>
          <TabsTrigger value="threats">Menaces Détectées</TabsTrigger>
          <TabsTrigger value="audit">Journal Audit</TabsTrigger>
          <TabsTrigger value="governance">Gouvernance des Données</TabsTrigger>
          <TabsTrigger value="rgpd">Conformité RGPD</TabsTrigger>
          <TabsTrigger value="advanced">Sécurité Avancée</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">{metric.name}</h4>
                    </div>
                    <Badge className={metric.score >= 95 ? 'bg-green-100 text-green-800' : metric.score >= 90 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                      {metric.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score de sécurité</span>
                      <span className="font-medium">{metric.score}%</span>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                    <p className="text-xs text-gray-500">Dernière vérification: {metric.lastCheck}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                Activité de Sécurité en Temps Réel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">1,250</div>
                  <div className="text-sm text-gray-600">Connexions Sécurisées</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">45</div>
                  <div className="text-sm text-gray-600">Sessions Actives</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">8</div>
                  <div className="text-sm text-gray-600">Tentatives Bloquées</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-sm text-gray-600">Alertes Actives</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Politiques de Sécurité</h3>
            <Button onClick={() => setShowNewPolicyModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Politique
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityPolicies.map((policy, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">{policy.name}</h4>
                        <Switch checked={policy.active} />
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{policy.description}</p>
                      <p className="text-xs text-gray-500">Dernière mise à jour: {policy.lastUpdate}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une menace..."
                className="pl-10"
                value={threatsFilter}
                onChange={(e) => setThreatsFilter(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
              <Button variant="outline">
                Export
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {paginatedThreats.map((threat, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <AlertTriangle className={`w-6 h-6 ${
                        threat.severity === 'Critique' ? 'text-red-600' :
                        threat.severity === 'Élevé' ? 'text-orange-600' :
                        'text-yellow-600'
                      }`} />
                      <div>
                        <h4 className="font-semibold text-gray-900">{threat.type}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span><strong>Source:</strong> {threat.source}</span>
                          <span><strong>Cible:</strong> {threat.target}</span>
                          <span><strong>Tentatives:</strong> {threat.attempts}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-500">{threat.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-2 mb-2">
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity}
                        </Badge>
                        <Badge className={getStatusColor(threat.status)}>
                          {threat.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Ban className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
          
          {/* Pagination pour les menaces détectées */}
          <Pagination
            currentPage={threatsCurrentPage}
            totalPages={threatsTotalPages}
            totalItems={threatsTotalItems}
            itemsPerPage={threatsItemsPerPage}
            onPageChange={setThreatsCurrentPage}
            onItemsPerPageChange={setThreatsItemsPerPage}
          />
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Journal d'Audit de Sécurité</h3>
            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
              <Button variant="outline">
                Export
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {paginatedAuditLogs.map((log, index) => (
              <Card key={index}>
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-500 min-w-[120px]">
                        {log.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{log.user}</Badge>
                        <span className="text-sm font-medium">{log.action}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        sur <span className="font-medium">{log.resource}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {log.result === 'Succès' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : log.result === 'Échec' ? (
                        <XCircle className="w-4 h-4 text-red-600" />
                      ) : (
                        <Ban className="w-4 h-4 text-orange-600" />
                      )}
                      <Badge className={
                        log.result === 'Succès' ? 'bg-green-100 text-green-800' :
                        log.result === 'Échec' ? 'bg-red-100 text-red-800' :
                        'bg-orange-100 text-orange-800'
                      }>
                        {log.result}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
          
          {/* Pagination pour les logs d'audit */}
          <Pagination
            currentPage={auditLogsCurrentPage}
            totalPages={auditLogsTotalPages}
            totalItems={auditLogsTotalItems}
            itemsPerPage={auditLogsItemsPerPage}
            onPageChange={setAuditLogsCurrentPage}
            onItemsPerPageChange={setAuditLogsItemsPerPage}
          />
        </TabsContent>
        
        <TabsContent value="governance">
          <DataGovernanceTab language={language} />
        </TabsContent>

        <TabsContent value="rgpd">
          <RGPDComplianceTab language={language} />
        </TabsContent>

        <TabsContent value="advanced">
          <AdvancedSecurityTab language={language} />
        </TabsContent>
      </Tabs>

      {/* Modales */}
      <NewSecurityPolicyModal
        isOpen={showNewPolicyModal}
        onClose={() => setShowNewPolicyModal(false)}
      />
      <AlertsConfigurationModal
        isOpen={showAlertsConfigModal}
        onClose={() => setShowAlertsConfigModal(false)}
      />
    </div>
  );
}
