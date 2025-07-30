
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Shield, AlertTriangle, Sparkles, Users, Bot, BarChart3, MessageSquare } from 'lucide-react';

export const aiCapabilities = {
  prediction: [
    {
      icon: <Target className="w-5 h-5 text-purple-600" />,
      title: "Prédiction d'issues judiciaires",
      description: "Algorithmes d'IA pour prédire les résultats de litiges basés sur l'historique jurisprudentiel"
    },
    {
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      title: "Évaluation automatique des risques",
      description: "Scoring automatique de conformité réglementaire"
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
      title: "Détection d'anomalies",
      description: "IA pour identifier automatiquement les incohérences dans les textes juridiques"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-green-600" />,
      title: "Recommandations contextuelles",
      description: "Suggestions proactives de textes pertinents basées sur le comportement utilisateur"
    }
  ],
  nlp: [
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      title: "Extraction d'entités juridiques",
      description: "Reconnaissance automatique de parties, dates, montants, références légales"
    },
    {
      icon: <Bot className="w-5 h-5 text-green-600" />,
      title: "Résumé automatique intelligent",
      description: "Synthèses personnalisées selon le profil utilisateur (avocat, juriste d'entreprise, etc.)"
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-purple-600" />,
      title: "Classification automatique avancée",
      description: "Catégorisation fine des documents par domaine de droit spécialisé"
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-orange-600" />,
      title: "Analyse de sentiment juridique",
      description: "Détection du ton et de l'orientation des décisions judiciaires"
    }
  ]
};

interface AICapabilitiesGridProps {
  type: 'prediction' | 'nlp';
}

export function AICapabilitiesGrid({ type }: AICapabilitiesGridProps) {
  const capabilities = aiCapabilities[type];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {capabilities.map((capability, index) => (
        <Card key={index} className="border-2 border-dashed border-purple-200 hover:border-purple-400 transition-colors">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3 mb-2">
              {capability.icon}
              <h3 className="font-semibold text-sm">{capability.title}</h3>
            </div>
            <p className="text-xs text-gray-600">{capability.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
