
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Clock, 
  FileText, 
  Building2, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Target,
  Users
} from 'lucide-react';

interface ProcedureMetrics {
  id: string;
  name: string;
  averageTime: number;
  steps: number;
  documents: number;
  administrations: number;
  cost: number;
  complexityScore: number;
  successRate: number;
  userSatisfaction: number;
  feedbackCount: number;
  trends: {
    timeChange: number;
    satisfactionChange: number;
  };
}

interface Recommendation {
  id: string;
  procedureId: string;
  procedureName: string;
  type: 'time' | 'complexity' | 'satisfaction' | 'documents' | 'process';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  effort: 'low' | 'medium' | 'high';
  expectedImprovement: string;
}

interface ImprovementRecommendationsProps {
  procedures: ProcedureMetrics[];
}

export function ImprovementRecommendations({ procedures }: ImprovementRecommendationsProps) {
  const generateRecommendations = (procedures: ProcedureMetrics[]): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    procedures.forEach(procedure => {
      // Recommandations basées sur les délais
      if (procedure.averageTime > 30) {
        recommendations.push({
          id: `time-${procedure.id}`,
          procedureId: procedure.id,
          procedureName: procedure.name,
          type: 'time',
          priority: 'high',
          title: 'Réduire les délais de traitement',
          description: `Le délai moyen de ${procedure.averageTime} jours est supérieur à la norme. Considérer la digitalisation de certaines étapes.`,
          impact: 'Amélioration de 30-50% du délai de traitement',
          effort: 'medium',
          expectedImprovement: `Réduction potentielle de ${Math.round(procedure.averageTime * 0.3)} à ${Math.round(procedure.averageTime * 0.5)} jours`
        });
      }

      // Recommandations basées sur la complexité
      if (procedure.complexityScore > 7) {
        recommendations.push({
          id: `complexity-${procedure.id}`,
          procedureId: procedure.id,
          procedureName: procedure.name,
          type: 'complexity',
          priority: 'high',
          title: 'Simplifier la procédure',
          description: `Score de complexité élevé (${procedure.complexityScore}/10). Analyser les étapes redondantes et optimiser le parcours.`,
          impact: 'Réduction de la complexité et amélioration de l\'expérience utilisateur',
          effort: 'high',
          expectedImprovement: `Réduction potentielle du score de complexité de 1-2 points`
        });
      }

      // Recommandations basées sur la satisfaction
      if (procedure.userSatisfaction < 3.0) {
        recommendations.push({
          id: `satisfaction-${procedure.id}`,
          procedureId: procedure.id,
          procedureName: procedure.name,
          type: 'satisfaction',
          priority: 'high',
          title: 'Améliorer l\'expérience utilisateur',
          description: `Satisfaction faible (${procedure.userSatisfaction}/5). Implémenter un meilleur accompagnement et clarifier les exigences.`,
          impact: 'Amélioration significative de la satisfaction utilisateur',
          effort: 'medium',
          expectedImprovement: `Augmentation potentielle de 0.5 à 1.0 point de satisfaction`
        });
      }

      // Recommandations basées sur le nombre de documents
      if (procedure.documents > 10) {
        recommendations.push({
          id: `documents-${procedure.id}`,
          procedureId: procedure.id,
          procedureName: procedure.name,
          type: 'documents',
          priority: 'medium',
          title: 'Réduire la documentation requise',
          description: `Nombre élevé de documents requis (${procedure.documents}). Evaluer la nécessité de chaque document et envisager des alternatives digitales.`,
          impact: 'Simplification du processus pour les usagers',
          effort: 'low',
          expectedImprovement: `Réduction potentielle de 2-4 documents`
        });
      }

      // Recommandations basées sur les tendances négatives
      if (procedure.trends.satisfactionChange < -5) {
        recommendations.push({
          id: `trend-${procedure.id}`,
          procedureId: procedure.id,
          procedureName: procedure.name,
          type: 'satisfaction',
          priority: 'high',
          title: 'Inverser la tendance négative',
          description: `Baisse de satisfaction de ${Math.abs(procedure.trends.satisfactionChange)}%. Action urgente requise pour identifier et corriger les problèmes.`,
          impact: 'Prévention d\'une dégradation continue du service',
          effort: 'medium',
          expectedImprovement: `Stabilisation et amélioration progressive de la satisfaction`
        });
      }
    });

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const recommendations = generateRecommendations(procedures);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'time': return Clock;
      case 'complexity': return Target;
      case 'satisfaction': return Users;
      case 'documents': return FileText;
      case 'process': return Building2;
      default: return Lightbulb;
    }
  };

  const getEffortBadge = (effort: string) => {
    const colors = {
      low: 'bg-green-50 text-green-700',
      medium: 'bg-yellow-50 text-yellow-700',
      high: 'bg-red-50 text-red-700'
    };
    const labels = {
      low: 'Effort Faible',
      medium: 'Effort Modéré',
      high: 'Effort Élevé'
    };
    return { color: colors[effort as keyof typeof colors], label: labels[effort as keyof typeof labels] };
  };

  return (
    <div className="space-y-6">
      {/* Résumé des recommandations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recommandations Prioritaires</p>
                <p className="text-2xl font-bold text-red-600">
                  {recommendations.filter(r => r.priority === 'high').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Actions Rapides</p>
                <p className="text-2xl font-bold text-green-600">
                  {recommendations.filter(r => r.effort === 'low').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Impact Élevé</p>
                <p className="text-2xl font-bold text-blue-600">
                  {recommendations.filter(r => r.impact.includes('significative') || r.impact.includes('30-50%')).length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des recommandations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Recommandations d'Amélioration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((recommendation) => {
              const TypeIcon = getTypeIcon(recommendation.type);
              const effort = getEffortBadge(recommendation.effort);
              
              return (
                <div key={recommendation.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <TypeIcon className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">{recommendation.title}</h4>
                        <p className="text-sm text-gray-600">{recommendation.procedureName}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(recommendation.priority)}>
                        {recommendation.priority === 'high' ? 'Priorité Haute' : 
                         recommendation.priority === 'medium' ? 'Priorité Moyenne' : 'Priorité Faible'}
                      </Badge>
                      <Badge className={effort.color}>
                        {effort.label}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{recommendation.description}</p>

                  <div className="bg-blue-50 p-3 rounded-lg mb-3">
                    <h5 className="font-medium text-blue-900 mb-1">Impact Attendu:</h5>
                    <p className="text-sm text-blue-800">{recommendation.impact}</p>
                    <p className="text-sm text-blue-700 mt-1">{recommendation.expectedImprovement}</p>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Créer un Plan d'Action
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
