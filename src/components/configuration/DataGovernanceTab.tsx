
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  Database, 
  GitBranch, 
  Clock, 
  Shield, 
  BarChart3, 
  FileText, 
  Trash2, 
  Archive,
  Eye,
  CheckCircle,
  AlertTriangle,
  Search
} from 'lucide-react';

interface DataGovernanceTabProps {
  language?: string;
}

export function DataGovernanceTab({ language = "fr" }: DataGovernanceTabProps) {
  const [dataLineageEnabled, setDataLineageEnabled] = useState(true);
  const [retentionPoliciesEnabled, setRetentionPoliciesEnabled] = useState(true);
  const [privacyByDesign, setPrivacyByDesign] = useState(true);
  const [complianceMonitoring, setComplianceMonitoring] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");

  const dataLineageFlow = [
    {
      id: "source",
      name: "Sources de données",
      type: "source",
      items: ["Journal Officiel", "Bases légales", "Décrets ministériels", "Circulaires"],
      status: "active"
    },
    {
      id: "processing",
      name: "Traitement",
      type: "process",
      items: ["Validation juridique", "Classification", "Indexation", "Enrichissement"],
      status: "processing"
    },
    {
      id: "storage",
      name: "Stockage",
      type: "storage",
      items: ["Base principale", "Archives", "Cache distribué", "Index recherche"],
      status: "stored"
    },
    {
      id: "usage",
      name: "Utilisation",
      type: "output",
      items: ["Recherche citoyens", "Rapports admin", "API publique", "Exports"],
      status: "consumed"
    }
  ];

  const retentionPolicies = [
    {
      category: "Documents juridiques",
      retention: "Permanent",
      autoArchive: "5 ans",
      autoDelete: "Jamais",
      count: 12450,
      lastReview: "2024-12-01",
      compliance: "GDPR, Archives Nationales"
    },
    {
      category: "Procédures administratives",
      retention: "10 ans",
      autoArchive: "2 ans",
      autoDelete: "Après révision",
      count: 8920,
      lastReview: "2024-11-15",
      compliance: "Code administratif"
    },
    {
      category: "Données utilisateurs",
      retention: "3 ans",
      autoArchive: "1 an",
      autoDelete: "Automatique",
      count: 25600,
      lastReview: "2024-12-20",
      compliance: "GDPR"
    },
    {
      category: "Logs et audits",
      retention: "7 ans",
      autoArchive: "6 mois",
      autoDelete: "Automatique",
      count: 156000,
      lastReview: "2024-12-31",
      compliance: "Sécurité informatique"
    }
  ];

  const privacyProtections = [
    {
      principle: "Minimisation des données",
      description: "Collecte uniquement des données nécessaires",
      status: "implemented",
      coverage: 95,
      controls: ["Validation formulaires", "Masquage automatique", "Purge programmée"]
    },
    {
      principle: "Consentement explicite",
      description: "Demande d'autorisation claire pour chaque usage",
      status: "implemented",
      coverage: 100,
      controls: ["Opt-in obligatoire", "Révocation facile", "Traçabilité"]
    },
    {
      principle: "Droit à l'oubli",
      description: "Possibilité de suppression des données personnelles",
      status: "partial",
      coverage: 80,
      controls: ["Suppression manuelle", "Anonymisation", "Purge différée"]
    },
    {
      principle: "Portabilité des données",
      description: "Export des données dans un format standard",
      status: "implemented",
      coverage: 90,
      controls: ["Export JSON", "Export PDF", "API dédiée"]
    }
  ];

  const complianceMetrics = [
    {
      regulation: "RGPD/GDPR",
      score: 94,
      status: "Conforme",
      lastAudit: "2024-11-30",
      nextReview: "2025-05-30",
      issues: 2,
      priority: "high"
    },
    {
      regulation: "Loi algérienne sur la protection des données",
      score: 89,
      status: "Conforme",
      lastAudit: "2024-10-15",
      nextReview: "2025-04-15",
      issues: 5,
      priority: "medium"
    },
    {
      regulation: "Code des archives",
      score: 98,
      status: "Conforme",
      lastAudit: "2024-12-01",
      nextReview: "2025-06-01",
      issues: 1,
      priority: "low"
    },
    {
      regulation: "Sécurité informatique de l'État",
      score: 91,
      status: "Conforme",
      lastAudit: "2024-12-15",
      nextReview: "2025-03-15",
      issues: 3,
      priority: "high"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'missing': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Pagination pour les politiques de rétention
  const {
    currentData: paginatedRetentionPolicies,
    currentPage: retentionCurrentPage,
    totalPages: retentionTotalPages,
    itemsPerPage: retentionItemsPerPage,
    totalItems: retentionTotalItems,
    setCurrentPage: setRetentionCurrentPage,
    setItemsPerPage: setRetentionItemsPerPage
  } = usePagination({
    data: retentionPolicies,
    itemsPerPage: 4
  });

  // Pagination pour les protections de la vie privée
  const {
    currentData: paginatedPrivacyProtections,
    currentPage: privacyCurrentPage,
    totalPages: privacyTotalPages,
    itemsPerPage: privacyItemsPerPage,
    totalItems: privacyTotalItems,
    setCurrentPage: setPrivacyCurrentPage,
    setItemsPerPage: setPrivacyItemsPerPage
  } = usePagination({
    data: privacyProtections,
    itemsPerPage: 4
  });

  // Pagination pour les métriques de conformité
  const {
    currentData: paginatedComplianceMetrics,
    currentPage: complianceCurrentPage,
    totalPages: complianceTotalPages,
    itemsPerPage: complianceItemsPerPage,
    totalItems: complianceTotalItems,
    setCurrentPage: setComplianceCurrentPage,
    setItemsPerPage: setComplianceItemsPerPage
  } = usePagination({
    data: complianceMetrics,
    itemsPerPage: 4
  });

  return (
    <div className="space-y-6">
      {/* Data Lineage */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-blue-600" />
              <CardTitle>Data Lineage</CardTitle>
            </div>
            <Switch 
              checked={dataLineageEnabled} 
              onCheckedChange={setDataLineageEnabled}
            />
          </div>
          <CardDescription>
            Traçabilité de l'origine et des transformations des données
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {dataLineageFlow.map((stage, index) => (
              <div key={stage.id} className="relative">
                <Card className="p-4">
                  <div className="text-center mb-3">
                    <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                      stage.status === 'active' ? 'bg-green-100 text-green-600' :
                      stage.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                      stage.status === 'stored' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {stage.type === 'source' && <Database className="w-6 h-6" />}
                      {stage.type === 'process' && <GitBranch className="w-6 h-6" />}
                      {stage.type === 'storage' && <Archive className="w-6 h-6" />}
                      {stage.type === 'output' && <Eye className="w-6 h-6" />}
                    </div>
                    <h4 className="font-semibold text-sm">{stage.name}</h4>
                  </div>
                  <ul className="text-xs space-y-1">
                    {stage.items.map((item, idx) => (
                      <li key={idx} className="text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </Card>
                {index < dataLineageFlow.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Visualiser flux complet</Button>
            <Button variant="outline" size="sm">Générer rapport</Button>
          </div>
        </CardContent>
      </Card>

      {/* Retention Policies */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <CardTitle>Politiques de Rétention</CardTitle>
            </div>
            <Switch 
              checked={retentionPoliciesEnabled} 
              onCheckedChange={setRetentionPoliciesEnabled}
            />
          </div>
          <CardDescription>
            Gestion automatique du cycle de vie des documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedRetentionPolicies.map((policy, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold">{policy.category}</h4>
                      <p className="text-sm text-gray-600">{policy.count.toLocaleString()} éléments</p>
                    </div>
                  </div>
                  <Badge variant="outline">{policy.compliance}</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Rétention:</span>
                    <div className="font-medium">{policy.retention}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Archive auto:</span>
                    <div className="font-medium">{policy.autoArchive}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Suppression:</span>
                    <div className="font-medium">{policy.autoDelete}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Dernière révision:</span>
                    <div className="font-medium">{policy.lastReview}</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Archive className="w-4 h-4 mr-1" />
                    Archiver maintenant
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Purger expiré
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Pagination
              currentPage={retentionCurrentPage}
              totalPages={retentionTotalPages}
              totalItems={retentionTotalItems}
              itemsPerPage={retentionItemsPerPage}
              onPageChange={setRetentionCurrentPage}
              onItemsPerPageChange={setRetentionItemsPerPage}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">Nouvelle politique</Button>
            <Button variant="outline" size="sm">Rapport rétention</Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy by Design */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <CardTitle>Privacy by Design</CardTitle>
            </div>
            <Switch 
              checked={privacyByDesign} 
              onCheckedChange={setPrivacyByDesign}
            />
          </div>
          <CardDescription>
            Protection de la vie privée intégrée dès la conception
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedPrivacyProtections.map((protection, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{protection.principle}</h4>
                    <Badge className={getStatusColor(protection.status)}>
                      {protection.status === 'implemented' ? 'Implémenté' :
                       protection.status === 'partial' ? 'Partiel' : 'Manquant'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={protection.coverage} className="w-20" />
                    <span className="text-sm font-medium">{protection.coverage}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{protection.description}</p>
                <div className="flex flex-wrap gap-2">
                  {protection.controls.map((control, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {control}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Pagination
              currentPage={privacyCurrentPage}
              totalPages={privacyTotalPages}
              totalItems={privacyTotalItems}
              itemsPerPage={privacyItemsPerPage}
              onPageChange={setPrivacyCurrentPage}
              onItemsPerPageChange={setPrivacyItemsPerPage}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">Évaluation impact</Button>
            <Button variant="outline" size="sm">Audit vie privée</Button>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Dashboard */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <CardTitle>Tableau de Bord de Conformité</CardTitle>
            </div>
            <Switch 
              checked={complianceMonitoring} 
              onCheckedChange={setComplianceMonitoring}
            />
          </div>
          <CardDescription>
            Tableau de bord de conformité réglementaire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une réglementation..."
                className="pl-10"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4">
            {paginatedComplianceMetrics.map((compliance, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      compliance.score >= 95 ? 'bg-green-500' :
                      compliance.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <h4 className="font-semibold">{compliance.regulation}</h4>
                      <p className="text-sm text-gray-600">Score: {compliance.score}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(compliance.priority)}>
                      {compliance.priority === 'high' ? 'Priorité élevée' :
                       compliance.priority === 'medium' ? 'Priorité moyenne' : 'Priorité faible'}
                    </Badge>
                    <Badge className={compliance.score >= 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {compliance.status}
                    </Badge>
                  </div>
                </div>
                <div className="mb-3">
                  <Progress value={compliance.score} className="h-2" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Dernier audit:</span>
                    <div className="font-medium">{compliance.lastAudit}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Prochaine révision:</span>
                    <div className="font-medium">{compliance.nextReview}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Problèmes:</span>
                    <div className="font-medium flex items-center gap-1">
                      {compliance.issues}
                      {compliance.issues > 0 && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Statut:</span>
                    <div className="font-medium flex items-center gap-1">
                      {compliance.status}
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">Voir détails</Button>
                  <Button variant="outline" size="sm">Plan d'action</Button>
                  <Button variant="outline" size="sm">Générer rapport</Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Pagination
              currentPage={complianceCurrentPage}
              totalPages={complianceTotalPages}
              totalItems={complianceTotalItems}
              itemsPerPage={complianceItemsPerPage}
              onPageChange={setComplianceCurrentPage}
              onItemsPerPageChange={setComplianceItemsPerPage}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">Évaluation globale</Button>
            <Button variant="outline" size="sm">Rapport conformité</Button>
            <Button variant="outline" size="sm">Alertes réglementaires</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
