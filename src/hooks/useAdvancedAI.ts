import { useState, useCallback } from 'react';

export interface LegalEntity {
  type: 'person' | 'company' | 'date' | 'amount' | 'legal_reference' | 'jurisdiction';
  value: string;
  confidence: number;
  startIndex: number;
  endIndex: number;
}

export interface RiskAssessment {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  score: number;
  factors: string[];
  recommendations: string[];
}

export interface PredictiveAnalysis {
  outcome: string;
  probability: number;
  reasoning: string[];
  similarCases: string[];
}

export interface SentimentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  keyPoints: string[];
}

export function useAdvancedAI() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const extractLegalEntities = useCallback(async (text: string): Promise<LegalEntity[]> => {
    setIsAnalyzing(true);
    
    // Simulation d'extraction d'entités juridiques
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const entities: LegalEntity[] = [];
    
    // Détection des dates
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b\d{1,2}\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+\d{4}\b/gi;
    let match;
    while ((match = dateRegex.exec(text)) !== null) {
      entities.push({
        type: 'date',
        value: match[0],
        confidence: 0.95,
        startIndex: match.index,
        endIndex: match.index + match[0].length
      });
    }
    
    // Détection des montants
    const amountRegex = /\b\d+(?:\s*\d{3})*(?:,\d{2})?\s*€|\b\d+(?:\s*\d{3})*(?:\.\d{2})?\s*euros?\b/gi;
    while ((match = amountRegex.exec(text)) !== null) {
      entities.push({
        type: 'amount',
        value: match[0],
        confidence: 0.90,
        startIndex: match.index,
        endIndex: match.index + match[0].length
      });
    }
    
    // Détection des références légales
    const legalRefRegex = /article\s+\d+(?:-\d+)*(?:\s+du\s+code\s+\w+)?|L\.\s*\d+(?:-\d+)*|R\.\s*\d+(?:-\d+)*/gi;
    while ((match = legalRefRegex.exec(text)) !== null) {
      entities.push({
        type: 'legal_reference',
        value: match[0],
        confidence: 0.88,
        startIndex: match.index,
        endIndex: match.index + match[0].length
      });
    }
    
    setIsAnalyzing(false);
    return entities;
  }, []);

  const assessRisk = useCallback(async (context: string): Promise<RiskAssessment> => {
    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Analyse de risque basée sur des mots-clés
    const highRiskTerms = ['sanction', 'amende', 'pénalité', 'responsabilité', 'dommages'];
    const mediumRiskTerms = ['obligation', 'procédure', 'délai', 'conformité'];
    
    const lowercaseContext = context.toLowerCase();
    const highRiskCount = highRiskTerms.filter(term => lowercaseContext.includes(term)).length;
    const mediumRiskCount = mediumRiskTerms.filter(term => lowercaseContext.includes(term)).length;
    
    let riskLevel: RiskAssessment['riskLevel'] = 'low';
    let score = 0.2;
    const factors: string[] = [];
    const recommendations: string[] = [];
    
    if (highRiskCount > 2) {
      riskLevel = 'critical';
      score = 0.9;
      factors.push('Présence de termes à haut risque juridique');
      recommendations.push('Consultation urgente d\'un avocat spécialisé recommandée');
    } else if (highRiskCount > 0) {
      riskLevel = 'high';
      score = 0.7;
      factors.push('Éléments de responsabilité détectés');
      recommendations.push('Revue juridique approfondie nécessaire');
    } else if (mediumRiskCount > 2) {
      riskLevel = 'medium';
      score = 0.5;
      factors.push('Obligations de conformité identifiées');
      recommendations.push('Vérification des procédures internes');
    }
    
    recommendations.push('Documentation complète de la situation');
    
    setIsAnalyzing(false);
    return { riskLevel, score, factors, recommendations };
  }, []);

  const predictOutcome = useCallback(async (caseDescription: string): Promise<PredictiveAnalysis> => {
    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulation d'analyse prédictive
    const outcomes = [
      {
        type: 'contrat',
        outcome: 'Résolution favorable',
        probability: 0.75,
        reasoning: ['Jurisprudence récente favorable', 'Textes légaux clairs', 'Précédents similaires'],
        similarCases: ['CE, 15 mars 2023, n°456789', 'Cass. Com., 8 juin 2023, n°21-12345']
      },
      {
        type: 'responsabilité',
        outcome: 'Responsabilité partagée probable',
        probability: 0.68,
        reasoning: ['Faits complexes', 'Jurisprudence évolutive', 'Facteurs multiples'],
        similarCases: ['Cass. Civ. 1ère, 12 janvier 2023, n°22-11111']
      }
    ];
    
    const selectedOutcome = caseDescription.toLowerCase().includes('contrat') ? outcomes[0] : outcomes[1];
    
    setIsAnalyzing(false);
    return selectedOutcome;
  }, []);

  const analyzeSentiment = useCallback(async (text: string): Promise<SentimentAnalysis> => {
    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const positiveTerms = ['favorable', 'accordé', 'approuvé', 'réussi', 'validé'];
    const negativeTerms = ['rejeté', 'refusé', 'sanctionné', 'condamné', 'interdit'];
    
    const lowercaseText = text.toLowerCase();
    const positiveCount = positiveTerms.filter(term => lowercaseText.includes(term)).length;
    const negativeCount = negativeTerms.filter(term => lowercaseText.includes(term)).length;
    
    let sentiment: SentimentAnalysis['sentiment'] = 'neutral';
    let confidence = 0.6;
    const keyPoints: string[] = [];
    
    if (positiveCount > negativeCount) {
      sentiment = 'positive';
      confidence = 0.8;
      keyPoints.push('Orientation favorable détectée');
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative';
      confidence = 0.8;
      keyPoints.push('Éléments défavorables identifiés');
    } else {
      keyPoints.push('Tonalité équilibrée');
    }
    
    setIsAnalyzing(false);
    return { sentiment, confidence, keyPoints };
  }, []);

  return {
    isAnalyzing,
    extractLegalEntities,
    assessRisk,
    predictOutcome,
    analyzeSentiment
  };
}