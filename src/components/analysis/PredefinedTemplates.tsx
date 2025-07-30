
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { FileText, Eye, Settings, Bot, MoreHorizontal } from 'lucide-react';

export function PredefinedTemplates() {
  const templates = [
    { 
      title: "Rapport d'Activité Mensuel", 
      description: "Synthèse complète des activités du mois avec métriques clés",
      category: "Performance",
      frequency: "Mensuel",
      lastUpdate: "Mis à jour",
      level: "IA",
      levelColor: "bg-blue-100 text-blue-800"
    },
    { 
      title: "Analyse de Conformité Réglementaire", 
      description: "Évaluation détaillée du respect des réglementations",
      category: "Conformité",
      frequency: "Trimestriel",
      lastUpdate: "Mis à jour",
      level: "Expert",
      levelColor: "bg-purple-100 text-purple-800"
    },
    { 
      title: "Rapport de Performance Système", 
      description: "Analyse des performances techniques et opérationnelles",
      category: "Technique",
      frequency: "Hebdomadaire",
      lastUpdate: "Mis à jour",
      level: "Avancé",
      levelColor: "bg-orange-100 text-orange-800"
    },
    { 
      title: "Synthèse Exécutive", 
      description: "Résumé stratégique pour la direction",
      category: "Direction",
      frequency: "Mensuel",
      lastUpdate: "Mis à jour",
      level: "Simple",
      levelColor: "bg-green-100 text-green-800"
    },
    { 
      title: "Rapport d'Audit Sécurité", 
      description: "Évaluation complète de la sécurité du système",
      category: "Sécurité",
      frequency: "Mensuel",
      lastUpdate: "Mis à jour",
      level: "Expert",
      levelColor: "bg-red-100 text-red-800"
    },
    { 
      title: "Analyse des Tendances Juridiques", 
      description: "Évolution des pratiques et réglementations",
      category: "Analyse",
      frequency: "Trimestriel",
      lastUpdate: "Mis à jour",
      level: "Avancé",
      levelColor: "bg-indigo-100 text-indigo-800"
    },
    { 
      title: "Rapport d'Utilisation", 
      description: "Statistiques d'utilisation et métriques utilisateurs",
      category: "Utilisation",
      frequency: "Hebdomadaire",
      lastUpdate: "Mis à jour",
      level: "Simple",
      levelColor: "bg-teal-100 text-teal-800"
    },
    { 
      title: "Évaluation d'Impact Réglementaire", 
      description: "Impact des nouvelles réglementations",
      category: "Impact",
      frequency: "Mensuel",
      lastUpdate: "Mis à jour",
      level: "Expert",
      levelColor: "bg-yellow-100 text-yellow-800"
    },
    { 
      title: "Rapport de Collaboration", 
      description: "Activités collaboratives et partage de connaissances",
      category: "Collaboration",
      frequency: "Hebdomadaire",
      lastUpdate: "Mis à jour",
      level: "Avancé",
      levelColor: "bg-pink-100 text-pink-800"
    },
    { 
      title: "Analyse des Risques", 
      description: "Identification et évaluation des risques juridiques",
      category: "Risques",
      frequency: "Mensuel",
      lastUpdate: "Mis à jour",
      level: "Expert",
      levelColor: "bg-orange-100 text-orange-800"
    },
    { 
      title: "Rapport de Formation", 
      description: "Suivi des formations et compétences",
      category: "Formation",
      frequency: "Trimestriel",
      lastUpdate: "Mis à jour",
      level: "Simple",
      levelColor: "bg-green-100 text-green-800"
    },
    { 
      title: "Synthèse Financière", 
      description: "Analyse des coûts et budgets juridiques",
      category: "Finance",
      frequency: "Mensuel",
      lastUpdate: "Mis à jour",
      level: "Avancé",
      levelColor: "bg-emerald-100 text-emerald-800"
    }
  ];

  // Pagination pour les modèles de rapports
  const {
    currentData: paginatedTemplates,
    currentPage: templatesCurrentPage,
    totalPages: templatesTotalPages,
    itemsPerPage: templatesItemsPerPage,
    totalItems: templatesTotalItems,
    setCurrentPage: setTemplatesCurrentPage,
    setItemsPerPage: setTemplatesItemsPerPage
  } = usePagination({
    data: templates,
    itemsPerPage: 10
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-600" />
            Modèles de Rapports Prédéfinis
          </CardTitle>
          <CardDescription>
            Sélectionnez parmi nos modèles de rapports préconçus optimisés par IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {paginatedTemplates.map((template, index) => (
              <Card key={index} className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                    <Badge className={template.levelColor}>
                      {template.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span><strong>Catégorie:</strong> {template.category}</span>
                    <span><strong>Fréquence:</strong> {template.frequency}</span>
                    <span className="text-green-600"><strong>{template.lastUpdate}</strong></span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Aperçu
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Configurer
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Bot className="w-4 h-4 mr-1" />
                      Générer
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination pour les modèles de rapports */}
          <Pagination
            currentPage={templatesCurrentPage}
            totalPages={templatesTotalPages}
            totalItems={templatesTotalItems}
            itemsPerPage={templatesItemsPerPage}
            onPageChange={setTemplatesCurrentPage}
            onItemsPerPageChange={setTemplatesItemsPerPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
