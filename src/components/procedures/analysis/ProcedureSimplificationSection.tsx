
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Clock, 
  Users, 
  FileText, 
  TrendingDown, 
  CheckCircle,
  AlertCircle,
  Target
} from 'lucide-react';

export function ProcedureSimplificationSection() {
  const simplificationOpportunities = [
    {
      id: 1,
      procedure: "Demande de permis de construire",
      complexity: "Élevée",
      steps: 12,
      proposedSteps: 7,
      potentialReduction: "42%",
      priority: "Haute",
      status: "En cours"
    },
    {
      id: 2,
      procedure: "Inscription au registre du commerce",
      complexity: "Moyenne",
      steps: 8,
      proposedSteps: 5,
      potentialReduction: "38%",
      priority: "Moyenne",
      status: "Planifié"
    },
    {
      id: 3,
      procedure: "Demande de passeport",
      complexity: "Faible",
      steps: 6,
      proposedSteps: 4,
      potentialReduction: "33%",
      priority: "Faible",
      status: "Terminé"
    }
  ];

  const simplificationMetrics = [
    { label: "Procédures analysées", value: "156", icon: FileText, trend: "+12%" },
    { label: "Temps moyen économisé", value: "35 min", icon: Clock, trend: "+18%" },
    { label: "Étapes réduites", value: "248", icon: TrendingDown, trend: "+25%" },
    { label: "Satisfaction usagers", value: "87%", icon: Users, trend: "+8%" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute': return 'bg-red-100 text-red-800';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'Faible': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Terminé': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'En cours': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'Planifié': return <Target className="w-4 h-4 text-blue-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-yellow-600" />
        <h3 className="text-xl font-semibold">Simplification et allègement des procédures</h3>
      </div>

      {/* Métriques de simplification */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {simplificationMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-green-600">{metric.trend}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <metric.icon className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Opportunités de simplification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Opportunités de simplification identifiées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {simplificationOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">{opportunity.procedure}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Complexité: {opportunity.complexity}</span>
                      <span>Étapes actuelles: {opportunity.steps}</span>
                      <span>Étapes proposées: {opportunity.proposedSteps}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(opportunity.status)}
                    <Badge className={getPriorityColor(opportunity.priority)}>
                      {opportunity.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Réduction potentielle: {opportunity.potentialReduction}</span>
                    <span>{opportunity.status}</span>
                  </div>
                  <Progress 
                    value={parseInt(opportunity.potentialReduction)} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions de simplification */}
      <Card>
        <CardHeader>
          <CardTitle>Actions recommandées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium">Analyser nouvelle procédure</p>
                <p className="text-xs text-gray-500">Identifier les étapes redondantes</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <p className="font-medium">Consulter les usagers</p>
                <p className="text-xs text-gray-500">Recueillir les retours d'expérience</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <div className="text-left">
                <p className="font-medium">Automatiser les étapes</p>
                <p className="text-xs text-gray-500">Réduire les interventions manuelles</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
