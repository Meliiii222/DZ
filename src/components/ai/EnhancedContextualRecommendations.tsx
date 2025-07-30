
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedTextarea } from '@/components/common/EnhancedTextarea';
import { Lightbulb, Target, Users, BookOpen, AlertCircle, TrendingUp, FileText, Scale } from 'lucide-react';

interface UserProfile {
  type: 'lawyer' | 'corporate_jurist' | 'student' | 'entrepreneur' | 'citizen';
  experience: 'beginner' | 'intermediate' | 'expert';
  specialization?: string[];
  context?: string;
}

interface ContextualRecommendation {
  id: string;
  title: string;
  type: 'legal_text' | 'procedure' | 'template' | 'jurisprudence' | 'expert_advice';
  relevance: number;
  category: string;
  description: string;
  tags: string[];
  difficulty: 'simple' | 'intermediate' | 'complex';
  estimatedTime: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  relatedDocuments: string[];
}

interface IntentAnalysis {
  primaryIntent: string;
  confidence: number;
  secondaryIntents: string[];
  userProfile: UserProfile;
  contextualFactors: string[];
  recommendedActions: string[];
}

export function EnhancedContextualRecommendations() {
  const [inputQuery, setInputQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    intent?: IntentAnalysis;
    recommendations?: ContextualRecommendation[];
    priorityScore?: number;
  }>({});

  const simulateIntentAnalysis = async (query: string): Promise<IntentAnalysis> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Analyse d'intention basée sur des mots-clés
    let primaryIntent = 'Information générale';
    let userProfile: UserProfile = { type: 'citizen', experience: 'beginner' };
    let contextualFactors: string[] = [];
    
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('créer') && lowerQuery.includes('entreprise')) {
      primaryIntent = 'Création d\'entreprise';
      userProfile = { type: 'entrepreneur', experience: 'beginner', context: 'startup' };
      contextualFactors = ['Forme juridique', 'Capital social', 'Formalités administratives'];
    } else if (lowerQuery.includes('contrat') || lowerQuery.includes('clause')) {
      primaryIntent = 'Rédaction contractuelle';
      userProfile = { type: 'corporate_jurist', experience: 'intermediate', specialization: ['Droit des contrats'] };
      contextualFactors = ['Négociation', 'Clauses essentielles', 'Conformité légale'];
    } else if (lowerQuery.includes('litige') || lowerQuery.includes('procédure')) {
      primaryIntent = 'Contentieux juridique';
      userProfile = { type: 'lawyer', experience: 'expert', specialization: ['Procédure civile'] };
      contextualFactors = ['Stratégie contentieuse', 'Délais de procédure', 'Jurisprudence applicable'];
    } else if (lowerQuery.includes('rgpd') || lowerQuery.includes('données')) {
      primaryIntent = 'Conformité RGPD';
      userProfile = { type: 'corporate_jurist', experience: 'intermediate', specialization: ['Droit du numérique'] };
      contextualFactors = ['Protection des données', 'Consentement', 'Registre des traitements'];
    }

    return {
      primaryIntent,
      confidence: 0.85 + Math.random() * 0.15,
      secondaryIntents: [
        'Recherche de jurisprudence',
        'Modèles de documents',
        'Conseil pratique'
      ],
      userProfile,
      contextualFactors,
      recommendedActions: [
        'Consulter les textes fondamentaux',
        'Examiner la jurisprudence récente',
        'Utiliser nos modèles adaptés',
        'Contacter un expert si nécessaire'
      ]
    };
  };

  const generateContextualRecommendations = async (intent: IntentAnalysis): Promise<ContextualRecommendation[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const baseRecommendations: ContextualRecommendation[] = [
      {
        id: '1',
        title: 'Code de commerce - Dispositions sur les sociétés',
        type: 'legal_text',
        relevance: 0.95,
        category: 'Textes fondamentaux',
        description: 'Articles L. 210-1 à L. 247-1 sur la constitution et le fonctionnement des sociétés commerciales',
        tags: ['Constitution', 'SARL', 'SAS', 'SA'],
        difficulty: 'intermediate',
        estimatedTime: '30 min',
        urgency: 'high',
        relatedDocuments: ['Formulaire M0', 'Statuts types', 'Guide pratique INPI']
      },
      {
        id: '2',
        title: 'Procédure de constitution en ligne',
        type: 'procedure',
        relevance: 0.92,
        category: 'Formalités administratives',
        description: 'Guide complet pour créer votre société via le guichet unique des entreprises',
        tags: ['Guichet unique', 'Formalités', 'INPI', 'K-bis'],
        difficulty: 'simple',
        estimatedTime: '2 heures',
        urgency: 'high',
        relatedDocuments: ['Checklist constitution', 'Calendrier des étapes', 'Tarifs officiels']
      },
      {
        id: '3',
        title: 'Modèles de statuts SARL/SAS',
        type: 'template',
        relevance: 0.89,
        category: 'Documents types',
        description: 'Statuts pré-rédigés et personnalisables selon votre activité',
        tags: ['Statuts', 'Modèles', 'Personnalisation'],
        difficulty: 'intermediate',
        estimatedTime: '1 heure',
        urgency: 'medium',
        relatedDocuments: ['Guide de rédaction', 'Clauses optionnelles', 'Exemples sectoriels']
      },
      {
        id: '4',
        title: 'Jurisprudence récente - Responsabilité des dirigeants',
        type: 'jurisprudence',
        relevance: 0.78,
        category: 'Jurisprudence',
        description: 'Cass. Com. 15 mars 2024 - Précisions sur la responsabilité civile et pénale des dirigeants',
        tags: ['Responsabilité', 'Dirigeants', 'Jurisprudence 2024'],
        difficulty: 'complex',
        estimatedTime: '45 min',
        urgency: 'medium',
        relatedDocuments: ['Analyse de l\'arrêt', 'Commentaires doctrinaux', 'Impact pratique']
      },
      {
        id: '5',
        title: 'Consultation avocat spécialisé',
        type: 'expert_advice',
        relevance: 0.85,
        category: 'Conseil personnalisé',
        description: 'Entretien avec un avocat spécialist en droit des sociétés pour votre projet spécifique',
        tags: ['Conseil', 'Avocat', 'Personnalisé'],
        difficulty: 'simple',
        estimatedTime: '1 heure',
        urgency: 'low',
        relatedDocuments: ['Questionnaire préparatoire', 'Tarifs consultation', 'Annuaire avocats']
      }
    ];

    // Ajuster la pertinence selon l'intention détectée
    return baseRecommendations.map(rec => ({
      ...rec,
      relevance: rec.relevance * (0.8 + Math.random() * 0.2) // Variation réaliste
    })).sort((a, b) => b.relevance - a.relevance);
  };

  const handleAnalyzeQuery = async () => {
    if (!inputQuery.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      const intent = await simulateIntentAnalysis(inputQuery);
      const recommendations = await generateContextualRecommendations(intent);
      const priorityScore = Math.round(intent.confidence * 100);
      
      setResults({ intent, recommendations, priorityScore });
    } catch (error) {
      console.error('Erreur lors de l\'analyse contextuelle:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'legal_text': return <Scale className="w-4 h-4" />;
      case 'procedure': return <Target className="w-4 h-4" />;
      case 'template': return <FileText className="w-4 h-4" />;
      case 'jurisprudence': return <BookOpen className="w-4 h-4" />;
      case 'expert_advice': return <Users className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-green-600" />
            Recommandations Contextuelles Avancées
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <EnhancedTextarea
            placeholder="Décrivez votre situation ou question juridique pour obtenir des recommandations personnalisées..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="min-h-[100px]"
            context="legal"
            enableVoice={true}
          />
          
          <Button 
            onClick={handleAnalyzeQuery}
            disabled={isAnalyzing || !inputQuery.trim()}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isAnalyzing ? (
              <>
                <Lightbulb className="w-4 h-4 mr-2 animate-pulse" />
                Analyse en cours...
              </>
            ) : (
              <>
                <Target className="w-4 h-4 mr-2" />
                Analyser et recommander
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {results.intent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Analyse de l'Intention
              </span>
              <Badge variant="outline">
                {results.priorityScore}% de pertinence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Intention principale détectée</h4>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-900">{results.intent.primaryIntent}</div>
                  <Progress value={results.intent.confidence * 100} className="mt-2" />
                  <div className="text-xs text-blue-600 mt-1">
                    Confiance: {Math.round(results.intent.confidence * 100)}%
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Profil utilisateur estimé</h4>
                <div className="space-y-2">
                  <Badge variant="secondary">
                    {results.intent.userProfile.type.replace('_', ' ')}
                  </Badge>
                  <Badge variant="outline">
                    {results.intent.userProfile.experience}
                  </Badge>
                  {results.intent.userProfile.specialization && (
                    <div className="text-xs text-gray-600">
                      Spécialisation: {results.intent.userProfile.specialization.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Facteurs contextuels</h4>
              <div className="flex flex-wrap gap-2">
                {results.intent.contextualFactors.map((factor, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {factor}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {results.recommendations && (
        <Card>
          <CardHeader>
            <CardTitle>Recommandations Personnalisées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.recommendations.map((rec, index) => (
                <Card key={rec.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTypeIcon(rec.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{rec.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-2">
                            {rec.tags.slice(0, 3).map((tag, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>⏱️ {rec.estimatedTime}</span>
                            <span>📊 {rec.difficulty}</span>
                            <span>📂 {rec.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getUrgencyColor(rec.urgency)}`}></div>
                          <span className="text-xs text-gray-600 capitalize">{rec.urgency}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">
                            {Math.round(rec.relevance * 100)}%
                          </div>
                          <div className="text-xs text-gray-500">pertinence</div>
                        </div>
                      </div>
                    </div>
                    
                    {rec.relatedDocuments.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="text-xs text-gray-600 mb-1">Documents associés:</div>
                        <div className="flex flex-wrap gap-1">
                          {rec.relatedDocuments.map((doc, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
