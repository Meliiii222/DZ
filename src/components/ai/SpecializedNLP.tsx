
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { EnhancedTextarea } from '@/components/common/EnhancedTextarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Users, Calendar, DollarSign, Scale, BookOpen, Zap, MessageSquare, AlertCircle } from 'lucide-react';

interface LegalEntity {
  type: 'person' | 'company' | 'date' | 'amount' | 'legal_ref' | 'jurisdiction' | 'contract_type';
  text: string;
  startIndex: number;
  endIndex: number;
  confidence: number;
  metadata?: {
    role?: string;
    category?: string;
    currency?: string;
    entityDetails?: string;
  };
}

interface AutoSummary {
  executiveSummary: string;
  keyPoints: string[];
  userTypeSpecific: {
    lawyer: string;
    corporateJurist: string;
    student: string;
  };
  complexity: 'simple' | 'intermediate' | 'complex';
  readingTime: number;
  criticalInformation: string[];
}

interface DocumentClassification {
  primaryCategory: string;
  subCategories: string[];
  confidence: number;
  specializedDomains: Array<{
    domain: string;
    relevance: number;
    keywords: string[];
  }>;
  documentType: string;
  legalFramework: string[];
  jurisdictionLevel: 'local' | 'national' | 'international';
}

interface EnhancedSentimentAnalysis {
  overall: {
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
    intensity: number;
  };
  aspects: Array<{
    aspect: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
    mentions: string[];
    impact: 'low' | 'medium' | 'high';
  }>;
  legalTone: {
    formality: number;
    objectivity: number;
    assertiveness: number;
    technicalComplexity: number;
  };
  decisionOrientation: {
    favorable: number;
    unfavorable: number;
    neutral: number;
    keyIndicators: string[];
  };
}

export function SpecializedNLP() {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<{
    entities?: LegalEntity[];
    summary?: AutoSummary;
    classification?: DocumentClassification;
    sentiment?: EnhancedSentimentAnalysis;
  }>({});

  const simulateAdvancedEntityExtraction = async (text: string): Promise<LegalEntity[]> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const entities: LegalEntity[] = [];
    
    // Patterns améliorés pour l'extraction d'entités juridiques
    const patterns = [
      {
        regex: /\b(M\.|Mme|Monsieur|Madame|Me|Maître)\s+([A-Z][a-zA-Z\s-]+?)(?=\s|,|\.|\()/g,
        type: 'person' as const,
        metadata: (match: string) => ({ role: match.includes('Me') || match.includes('Maître') ? 'avocat' : 'partie' })
      },
      {
        regex: /\b\d{1,2}[/.-]\d{1,2}[/.-]\d{4}\b/g,
        type: 'date' as const,
        metadata: () => ({ category: 'date_document' })
      },
      {
        regex: /\b\d+(?:\s?\d{3})*(?:[,.]\d{2})?\s*(?:€|EUR|euros?|DZD|dinars?)\b/g,
        type: 'amount' as const,
        metadata: (match: string) => ({ 
          currency: match.includes('€') || match.includes('EUR') ? 'EUR' : 'DZD' 
        })
      },
      {
        regex: /\b(?:SARL|SAS|SA|EURL|SNC|SASU)\s+[A-Z][A-Za-z\s&]+/g,
        type: 'company' as const,
        metadata: (match: string) => ({ category: 'société_commerciale' })
      },
      {
        regex: /\b(?:article|art\.?)\s+(?:L\.?\s*)?\d+(?:-\d+)*(?:\s+(?:du|de\s+la)\s+code\s+\w+)?/gi,
        type: 'legal_ref' as const,
        metadata: (match: string) => ({ 
          category: match.toLowerCase().includes('code') ? 'code_legal' : 'article_simple' 
        })
      },
      {
        regex: /\b(?:Cour|Tribunal|Cass\.|CA|TGI|TI|Conseil)\s+[A-Za-z\s,]+?(?=\s*[,.]|\s*du)/g,
        type: 'jurisdiction' as const,
        metadata: (match: string) => ({
          category: match.includes('Cour') ? 'cour' : 
                   match.includes('Tribunal') ? 'tribunal' : 'autre'
        })
      }
    ];

    patterns.forEach(({ regex, type, metadata }) => {
      let match;
      while ((match = regex.exec(text)) !== null) {
        entities.push({
          type,
          text: match[0].trim(),
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          confidence: 0.80 + Math.random() * 0.20,
          metadata: metadata(match[0])
        });
      }
    });

    return entities.sort((a, b) => b.confidence - a.confidence);
  };

  const simulateEnhancedAutoSummary = async (text: string): Promise<AutoSummary> => {
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    const wordCount = text.split(' ').length;
    const complexity = wordCount > 1000 ? 'complex' : wordCount > 400 ? 'intermediate' : 'simple';
    
    return {
      executiveSummary: "Ce document juridique traite principalement d'une relation contractuelle entre parties avec des clauses spécifiques de responsabilité, de paiement et de résiliation. L'analyse révèle des éléments de droit commercial et civil avec des références jurisprudentielles pertinentes.",
      keyPoints: [
        "Contrat commercial avec clauses de force majeure détaillées",
        "Conditions de paiement : 30 jours à réception avec pénalités de retard",
        "Clause de résiliation anticipée pour manquement grave",
        "Juridiction compétente : Tribunal de Commerce avec clause attributive",
        "Garanties et responsabilités limitées selon les usages commerciaux"
      ],
      userTypeSpecific: {
        lawyer: "Points d'attention juridique : Vérifier la conformité de la clause 5.2 (responsabilité limitée) avec la jurisprudence Chronopost. Analyser la validité de la clause pénale au regard de l'article 1231-5 du Code civil. Recommandation d'audit des conditions générales.",
        corporateJurist: "Impact business : Les délais de paiement affectent la trésorerie (DSO +5 jours). Risque de contentieux évalué à moyen terme. Recommandation d'indexation des prix pour les contrats >12 mois. Mise à jour nécessaire des CGV selon nouvelle réglementation.",
        student: "Cas d'étude typique illustrant les principes fondamentaux du droit des contrats : formation, exécution, inexécution et résolution. Bon exemple des clauses essentielles en droit commercial moderne avec application pratique des articles 1103 et suivants du Code civil."
      },
      complexity,
      readingTime: Math.ceil(wordCount / 200),
      criticalInformation: [
        "Délais de prescription : 5 ans pour actions contractuelles",
        "Clause de force majeure activée depuis mars 2020",
        "Mise en demeure préalable obligatoire avant résiliation"
      ]
    };
  };

  const simulateAdvancedClassification = async (text: string): Promise<DocumentClassification> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Classification intelligente basée sur le contenu
    const lowerText = text.toLowerCase();
    let primaryCategory = "Droit général";
    let documentType = "Document juridique";
    let specializedDomains = [];
    
    if (lowerText.includes('contrat') || lowerText.includes('clause')) {
      primaryCategory = "Droit des contrats";
      documentType = "Contrat commercial";
      specializedDomains = [
        { domain: "Droit commercial", relevance: 0.92, keywords: ["fourniture", "livraison", "B2B", "commercial"] },
        { domain: "Droit des obligations", relevance: 0.85, keywords: ["obligation", "responsabilité", "exécution"] },
        { domain: "Droit de la consommation", relevance: 0.34, keywords: ["consommateur", "garantie"] }
      ];
    } else if (lowerText.includes('jugement') || lowerText.includes('arrêt')) {
      primaryCategory = "Jurisprudence";
      documentType = "Décision de justice";
      specializedDomains = [
        { domain: "Procédure civile", relevance: 0.88, keywords: ["procédure", "juridiction", "appel"] },
        { domain: "Droit judiciaire", relevance: 0.76, keywords: ["tribunal", "juge", "décision"] }
      ];
    } else if (lowerText.includes('bail') || lowerText.includes('loyer')) {
      primaryCategory = "Droit immobilier";
      documentType = "Bail commercial";
      specializedDomains = [
        { domain: "Droit immobilier", relevance: 0.95, keywords: ["bail", "loyer", "locataire", "propriétaire"] },
        { domain: "Droit commercial", relevance: 0.67, keywords: ["commercial", "fonds de commerce"] }
      ];
    }

    return {
      primaryCategory,
      subCategories: ["Droit des affaires", "Contentieux commercial", "Droit contractuel"],
      confidence: 0.87 + Math.random() * 0.13,
      specializedDomains,
      documentType,
      legalFramework: ["Code civil", "Code de commerce", "Jurisprudence"],
      jurisdictionLevel: lowerText.includes('international') ? 'international' : 
                        lowerText.includes('européen') ? 'international' : 'national'
    };
  };

  const simulateEnhancedSentimentAnalysis = async (text: string): Promise<EnhancedSentimentAnalysis> => {
    await new Promise(resolve => setTimeout(resolve, 1400));
    
    const positiveTerms = ['favorable', 'accordé', 'approuvé', 'réussi', 'validé', 'accepté', 'conforme'];
    const negativeTerms = ['rejeté', 'refusé', 'sanctionné', 'condamné', 'interdit', 'annulé', 'invalide'];
    const neutralTerms = ['constaté', 'établi', 'déterminé', 'fixé', 'prévu'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveTerms.filter(term => lowerText.includes(term)).length;
    const negativeCount = negativeTerms.filter(term => lowerText.includes(term)).length;
    const neutralCount = neutralTerms.filter(term => lowerText.includes(term)).length;
    
    let overallSentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    let confidence = 0.6;
    let intensity = 0.5;
    
    if (positiveCount > negativeCount + 1) {
      overallSentiment = 'positive';
      confidence = 0.75 + (positiveCount * 0.05);
      intensity = 0.6 + (positiveCount * 0.1);
    } else if (negativeCount > positiveCount + 1) {
      overallSentiment = 'negative';
      confidence = 0.75 + (negativeCount * 0.05);
      intensity = 0.6 + (negativeCount * 0.1);
    }

    return {
      overall: {
        sentiment: overallSentiment,
        confidence: Math.min(confidence, 0.95),
        intensity: Math.min(intensity, 1.0)
      },
      aspects: [
        {
          aspect: "Conditions contractuelles",
          sentiment: positiveCount > 0 ? 'positive' : 'neutral',
          confidence: 0.82,
          mentions: ["conditions équilibrées", "modalités favorables"],
          impact: 'medium'
        },
        {
          aspect: "Clauses de résiliation",
          sentiment: negativeCount > 0 ? 'negative' : 'neutral',
          confidence: 0.78,
          mentions: ["résiliation immédiate", "manquement grave"],
          impact: 'high'
        },
        {
          aspect: "Conditions de paiement",
          sentiment: 'neutral',
          confidence: 0.85,
          mentions: ["délai standard", "modalités usuelles"],
          impact: 'medium'
        }
      ],
      legalTone: {
        formality: 0.92,
        objectivity: 0.88,
        assertiveness: 0.74,
        technicalComplexity: text.length > 1000 ? 0.85 : 0.65
      },
      decisionOrientation: {
        favorable: positiveCount * 25,
        unfavorable: negativeCount * 25,
        neutral: Math.max(20, 100 - (positiveCount + negativeCount) * 25),
        keyIndicators: [
          positiveCount > 0 ? "Éléments favorables détectés" : "Aucun élément favorable explicite",
          negativeCount > 0 ? "Points de vigilance identifiés" : "Pas de signaux négatifs majeurs",
          "Analyse basée sur le vocabulaire juridique utilisé"
        ]
      }
    };
  };

  const handleNLPAnalysis = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    
    try {
      const [entities, summary, classification, sentiment] = await Promise.all([
        simulateAdvancedEntityExtraction(inputText),
        simulateEnhancedAutoSummary(inputText),
        simulateAdvancedClassification(inputText),
        simulateEnhancedSentimentAnalysis(inputText)
      ]);

      setResults({ entities, summary, classification, sentiment });
    } catch (error) {
      console.error('Erreur lors de l\'analyse NLP avancée:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'person': return <Users className="w-3 h-3" />;
      case 'company': return <FileText className="w-3 h-3" />;
      case 'date': return <Calendar className="w-3 h-3" />;
      case 'amount': return <DollarSign className="w-3 h-3" />;
      case 'legal_ref': return <Scale className="w-3 h-3" />;
      case 'jurisdiction': return <BookOpen className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 0.9) return { label: 'Très élevée', color: 'text-green-600' };
    if (confidence >= 0.7) return { label: 'Élevée', color: 'text-blue-600' };
    if (confidence >= 0.5) return { label: 'Moyenne', color: 'text-yellow-600' };
    return { label: 'Faible', color: 'text-red-600' };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            NLP Juridique Spécialisé Avancé
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <EnhancedTextarea
            placeholder="Collez votre texte juridique (contrat, jugement, loi, procédure, etc.) pour une analyse NLP complète et spécialisée..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px]"
            context="legal"
            enableVoice={true}
          />
          
          <Button 
            onClick={handleNLPAnalysis}
            disabled={isProcessing || !inputText.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isProcessing ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                Analyse NLP en cours...
              </>
            ) : (
              <>
                <MessageSquare className="w-4 h-4 mr-2" />
                Lancer l'analyse NLP avancée
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {(results.entities || results.summary || results.classification || results.sentiment) && (
        <Card>
          <CardHeader>
            <CardTitle>Résultats de l'Analyse NLP</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="entities" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="entities">Entités</TabsTrigger>
                <TabsTrigger value="summary">Résumé</TabsTrigger>
                <TabsTrigger value="classification">Classification</TabsTrigger>
                <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
              </TabsList>

              <TabsContent value="entities" className="space-y-4">
                {results.entities && results.entities.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Entités juridiques extraites</h4>
                      <Badge variant="outline">{results.entities.length} entités détectées</Badge>
                    </div>
                    
                    {results.entities.map((entity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {getEntityIcon(entity.type)}
                          </div>
                          <div>
                            <div className="font-medium">{entity.text}</div>
                            <div className="text-sm text-gray-600">
                              {entity.type === 'person' ? 'Personne' :
                               entity.type === 'company' ? 'Société' :
                               entity.type === 'date' ? 'Date' :
                               entity.type === 'amount' ? 'Montant' :
                               entity.type === 'legal_ref' ? 'Référence légale' :
                               entity.type === 'jurisdiction' ? 'Juridiction' : 'Autre'}
                              {entity.metadata?.role && ` - ${entity.metadata.role}`}
                              {entity.metadata?.category && ` (${entity.metadata.category})`}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {Math.round(entity.confidence * 100)}%
                          </div>
                          <div className="text-xs text-gray-500">confiance</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Aucune entité juridique détectée dans le texte
                  </div>
                )}
              </TabsContent>

              <TabsContent value="summary" className="space-y-4">
                {results.summary && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-4 text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {results.summary.complexity.toUpperCase()}
                          </div>
                          <div className="text-sm text-gray-600">Complexité</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4 text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {results.summary.readingTime} min
                          </div>
                          <div className="text-sm text-gray-600">Temps de lecture</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4 text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {results.summary.keyPoints.length}
                          </div>
                          <div className="text-sm text-gray-600">Points clés</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Résumé exécutif</h4>
                      <p className="text-sm">{results.summary.executiveSummary}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Points clés identifiés</h4>
                      <ul className="space-y-2">
                        {results.summary.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {results.summary.criticalInformation.length > 0 && (
                      <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                        <h4 className="font-semibold mb-2 text-orange-800">Informations critiques</h4>
                        <ul className="space-y-1">
                          {results.summary.criticalInformation.map((info, index) => (
                            <li key={index} className="text-sm text-orange-700">⚠️ {info}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Tabs defaultValue="lawyer" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="lawyer">Avocat</TabsTrigger>
                        <TabsTrigger value="corporateJurist">Juriste d'entreprise</TabsTrigger>
                        <TabsTrigger value="student">Étudiant</TabsTrigger>
                      </TabsList>
                      
                      {Object.entries(results.summary.userTypeSpecific).map(([type, content]) => (
                        <TabsContent key={type} value={type} className="mt-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm">{content}</p>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="classification" className="space-y-4">
                {results.classification && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="pt-4">
                          <h4 className="font-semibold mb-2">Classification principale</h4>
                          <div className="text-lg font-medium text-blue-600 mb-2">
                            {results.classification.primaryCategory}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            Type: {results.classification.documentType}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Confiance:</span>
                            <Progress value={results.classification.confidence * 100} className="flex-1" />
                            <span className="text-sm font-medium">
                              {Math.round(results.classification.confidence * 100)}%
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-4">
                          <h4 className="font-semibold mb-2">Niveau de juridiction</h4>
                          <Badge className="mb-3" variant={
                            results.classification.jurisdictionLevel === 'international' ? 'default' :
                            results.classification.jurisdictionLevel === 'national' ? 'secondary' : 'outline'
                          }>
                            {results.classification.jurisdictionLevel}
                          </Badge>
                          <div className="space-y-1">
                            <div className="text-sm text-gray-600">Cadre légal:</div>
                            {results.classification.legalFramework.map((framework, index) => (
                              <Badge key={index} variant="outline" className="mr-1 text-xs">
                                {framework}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Domaines juridiques spécialisés</h4>
                      <div className="space-y-3">
                        {results.classification.specializedDomains.map((domain, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium">{domain.domain}</h5>
                              <span className="text-sm text-gray-600">
                                {Math.round(domain.relevance * 100)}% de pertinence
                              </span>
                            </div>
                            <Progress value={domain.relevance * 100} className="mb-2" />
                            <div className="flex flex-wrap gap-1">
                              {domain.keywords.map((keyword, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Sous-catégories</h4>
                      <div className="flex flex-wrap gap-2">
                        {results.classification.subCategories.map((subCat, index) => (
                          <Badge key={index} variant="outline">
                            {subCat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="sentiment" className="space-y-4">
                {results.sentiment && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="pt-4">
                          <h4 className="font-semibold mb-3">Sentiment global</h4>
                          <div className="text-center">
                            <Badge className={`text-lg px-4 py-2 ${getSentimentColor(results.sentiment.overall.sentiment)}`}>
                              {results.sentiment.overall.sentiment.toUpperCase()}
                            </Badge>
                            <div className="mt-3 space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Confiance:</span>
                                <span className="font-medium">
                                  {Math.round(results.sentiment.overall.confidence * 100)}%
                                </span>
                              </div>
                              <Progress value={results.sentiment.overall.confidence * 100} />
                              
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Intensité:</span>
                                <span className="font-medium">
                                  {Math.round(results.sentiment.overall.intensity * 100)}%
                                </span>
                              </div>
                              <Progress value={results.sentiment.overall.intensity * 100} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-4">
                          <h4 className="font-semibold mb-3">Orientation de la décision</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Favorable</span>
                              <div className="flex items-center gap-2">
                                <Progress value={results.sentiment.decisionOrientation.favorable} className="w-20" />
                                <span className="text-sm font-medium w-8">
                                  {results.sentiment.decisionOrientation.favorable}%
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Défavorable</span>
                              <div className="flex items-center gap-2">
                                <Progress value={results.sentiment.decisionOrientation.unfavorable} className="w-20" />
                                <span className="text-sm font-medium w-8">
                                  {results.sentiment.decisionOrientation.unfavorable}%
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Neutre</span>
                              <div className="flex items-center gap-2">
                                <Progress value={results.sentiment.decisionOrientation.neutral} className="w-20" />
                                <span className="text-sm font-medium w-8">
                                  {results.sentiment.decisionOrientation.neutral}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Analyse par aspects</h4>
                      <div className="space-y-3">
                        {results.sentiment.aspects.map((aspect, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium">{aspect.aspect}</h5>
                              <div className="flex items-center gap-2">
                                <Badge className={getSentimentColor(aspect.sentiment)}>
                                  {aspect.sentiment}
                                </Badge>
                                <Badge variant="outline" className={
                                  aspect.impact === 'high' ? 'border-red-500 text-red-600' :
                                  aspect.impact === 'medium' ? 'border-yellow-500 text-yellow-600' :
                                  'border-green-500 text-green-600'
                                }>
                                  Impact {aspect.impact}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              Confiance: {Math.round(aspect.confidence * 100)}%
                            </div>
                            {aspect.mentions.length > 0 && (
                              <div className="text-xs text-gray-500">
                                Mentions: {aspect.mentions.join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Analyse du ton juridique</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(results.sentiment.legalTone).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-blue-600">
                              {Math.round((value as number) * 100)}%
                            </div>
                            <div className="text-xs text-gray-600 capitalize">
                              {key === 'technicalComplexity' ? 'Complexité technique' :
                               key === 'formality' ? 'Formalité' :
                               key === 'objectivity' ? 'Objectivité' :
                               key === 'assertiveness' ? 'Assertivité' : key}
                            </div>
                            <Progress value={(value as number) * 100} className="mt-1" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Indicateurs clés</h4>
                      <ul className="space-y-1">
                        {results.sentiment.decisionOrientation.keyIndicators.map((indicator, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            {indicator}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
