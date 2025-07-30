import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SmartAutocomplete } from '@/components/common/SmartAutocomplete';
import { 
  Clock, 
  FileText, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Users,
  BarChart3,
  Target,
  Lightbulb,
  Search,
  Filter,
  Star,
  MessageSquare,
  Brain
} from 'lucide-react';
import { ProcedureMetrics } from './types';
import { getComplexityLevel } from './utils';

interface ProcedureDetailAnalysisProps {
  procedures: ProcedureMetrics[];
}

const extendedProcedures: ProcedureMetrics[] = [
  {
    id: '1',
    name: 'Création SARL',
    averageTime: 22,
    steps: 12,
    documents: 8,
    administrations: 4,
    cost: 25000,
    complexityScore: 7.8,
    successRate: 92,
    userSatisfaction: 3.4,
    feedbackCount: 156,
    trends: { timeChange: -15, satisfactionChange: 8 },
    description: 'Procédure de création d\'une Société à Responsabilité Limitée avec dépôt de capital et immatriculation au registre du commerce.',
    risks: ['Délais d\'instruction variables', 'Exigences documentaires strictes', 'Contrôle fiscal potentiel'],
    recommendations: ['Préparer tous les documents avant le dépôt', 'Consulter un expert-comptable', 'Prévoir un délai supplémentaire'],
    simplificationRecommendations: ['Dématérialiser complètement le dépôt de capital', 'Créer un guichet unique pour toutes les formalités', 'Automatiser la vérification des documents'],
    aiInsights: ['Taux de réussite en amélioration (+8%)', 'Délais raccourcis grâce à la dématérialisation', 'Documents manquants = cause principale de rejet']
  },
  {
    id: '2',
    name: 'Demande Passeport',
    averageTime: 8,
    steps: 6,
    documents: 5,
    administrations: 2,
    cost: 3000,
    complexityScore: 4.2,
    successRate: 98,
    userSatisfaction: 4.1,
    feedbackCount: 432,
    trends: { timeChange: -3, satisfactionChange: 12 },
    description: 'Demande de passeport biométrique pour les citoyens algériens avec prise de rendez-vous en ligne.',
    risks: ['Délais d\'attente pour RDV', 'Photos non conformes', 'Documents périmés'],
    recommendations: ['Vérifier la validité des documents', 'Respecter les normes photos', 'Prendre RDV à l\'avance'],
    simplificationRecommendations: ['Augmenter les créneaux de rendez-vous', 'Permettre la prise de photo sur place', 'Intégrer la vérification automatique des documents'],
    aiInsights: ['Satisfaction en hausse grâce au service en ligne', 'Photos conformes = 95% de réussite', 'RDV en ligne réduit l\'attente de 60%']
  },
  {
    id: '3',
    name: 'Permis de Construire',
    averageTime: 45,
    steps: 18,
    documents: 15,
    administrations: 6,
    cost: 50000,
    complexityScore: 9.2,
    successRate: 78,
    userSatisfaction: 2.8,
    feedbackCount: 89,
    trends: { timeChange: 5, satisfactionChange: -8 },
    description: 'Autorisation de construire pour les projets immobiliers avec étude d\'impact et conformité urbanistique.',
    risks: ['Non-conformité au POS', 'Études techniques insuffisantes', 'Recours des tiers'],
    recommendations: ['Consulter le POS en amont', 'Faire appel à un architecte', 'Prévoir une étude géotechnique'],
    simplificationRecommendations: ['Créer une plateforme unique pour toutes les validations', 'Réduire le nombre d\'étapes de 18 à 10', 'Automatiser les vérifications de conformité de base'],
    aiInsights: ['Complexité croissante due aux nouvelles normes', 'Recours fréquents = principal facteur de délai', 'Dossiers complets = 85% d\'acceptation']
  }
];

export function ProcedureDetailAnalysis({ procedures }: ProcedureDetailAnalysisProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProcedure, setSelectedProcedure] = useState<ProcedureMetrics | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredProcedures = extendedProcedures.filter(procedure => {
    const matchesSearch = procedure.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || 
      (filterType === 'simple' && procedure.complexityScore <= 5) ||
      (filterType === 'complex' && procedure.complexityScore > 5);
    return matchesSearch && matchesFilter;
  });

  const getSuggestions = () => [
    { id: '1', text: 'Création SARL', type: 'suggestion' as const },
    { id: '2', text: 'Demande Passeport', type: 'suggestion' as const },
    { id: '3', text: 'Permis de Construire', type: 'suggestion' as const },
    { id: '4', text: 'Procédures administratives', type: 'recent' as const },
    { id: '5', text: 'Délais moyens', type: 'recent' as const }
  ];

  return (
    <div className="space-y-6">
      {/* Barre de recherche et filtres */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Rechercher une Procédure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <SmartAutocomplete
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Rechercher une procédure (ex: création SARL, passeport...)..."
                context="procedure"
                suggestions={getSuggestions()}
                enableVoice={true}
              />
            </div>
            <div className="w-48">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les procédures</SelectItem>
                  <SelectItem value="simple">Procédures simples</SelectItem>
                  <SelectItem value="complex">Procédures complexes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste des procédures */}
        <Card>
          <CardHeader>
            <CardTitle>Procédures Disponibles ({filteredProcedures.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredProcedures.map((procedure) => {
                const complexity = getComplexityLevel(procedure.complexityScore);
                return (
                  <div 
                    key={procedure.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedProcedure?.id === procedure.id ? 'border-emerald-500 bg-emerald-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedProcedure(procedure)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold">{procedure.name}</h4>
                      <Badge className={`${complexity.bg} ${complexity.color} border-0`}>
                        {complexity.level}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{procedure.averageTime}j</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>{procedure.documents} docs</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{procedure.successRate}% réussite</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{procedure.userSatisfaction}/5</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Détails de la procédure sélectionnée */}
        <div className="space-y-6">
          {selectedProcedure ? (
            <>
              {/* Métriques principales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    {selectedProcedure.name} - Analyse Détaillée
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">{selectedProcedure.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                        <div className="text-2xl font-bold text-blue-600">{selectedProcedure.averageTime}j</div>
                        <div className="text-sm text-gray-600">Délai moyen</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                        <div className="text-2xl font-bold text-green-600">{selectedProcedure.successRate}%</div>
                        <div className="text-sm text-gray-600">Taux de réussite</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <FileText className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                        <div className="text-2xl font-bold text-purple-600">{selectedProcedure.documents}</div>
                        <div className="text-sm text-gray-600">Documents requis</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <Target className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                        <div className="text-2xl font-bold text-orange-600">{selectedProcedure.complexityScore}/10</div>
                        <div className="text-sm text-gray-600">Complexité</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risques identifiés */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Risques Identifiés
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedProcedure.risks?.map((risk, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-red-700">{risk}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommandations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    Recommandations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedProcedure.recommendations?.map((recommendation, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                        <Lightbulb className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                        <span className="text-sm text-yellow-700">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommandations de simplification et d'allègement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    Recommandations de simplification et d'allègement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedProcedure.simplificationRecommendations?.map((recommendation, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-emerald-50 rounded">
                        <Target className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm text-emerald-700">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Insights IA */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    Insights IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedProcedure.aiInsights?.map((insight, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                        <Brain className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span className="text-sm text-purple-700">{insight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Feedback utilisateurs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Feedback Utilisateurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold">{selectedProcedure.userSatisfaction}/5</span>
                      <span className="text-gray-600">({selectedProcedure.feedbackCount} avis)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {selectedProcedure.trends.satisfactionChange > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={selectedProcedure.trends.satisfactionChange > 0 ? 'text-green-600' : 'text-red-600'}>
                        {Math.abs(selectedProcedure.trends.satisfactionChange)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p>Les utilisateurs apprécient particulièrement la clarté des instructions et la disponibilité du support.</p>
                    <p className="mt-2">Points d'amélioration identifiés : réduction des délais et simplification des documents requis.</p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Sélectionnez une procédure</h3>
                <p className="text-gray-500">Choisissez une procédure dans la liste pour voir son analyse détaillée</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
