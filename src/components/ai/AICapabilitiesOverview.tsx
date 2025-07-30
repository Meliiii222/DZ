
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Brain, TrendingUp, Zap } from 'lucide-react';

export function AICapabilitiesOverview() {
  return (
    <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border-2 border-green-200">
      <CardContent className="pt-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Vue d'ensemble - Intelligence Artificielle Juridique
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-sm border-2 border-green-100">
              <Bot className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h4 className="font-bold text-lg mb-3 text-green-600">Assistant IA</h4>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• Recherche intelligente</li>
                <li>• Suggestions contextuelles</li>
                <li>• Actions rapides</li>
                <li>• Historique et insights</li>
              </ul>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm border-2 border-purple-100">
              <TrendingUp className="w-10 h-10 text-purple-600 mx-auto mb-4" />
              <h4 className="font-bold text-lg mb-3 text-purple-600">Analyse Prédictive</h4>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• Prédiction d'issues judiciaires</li>
                <li>• Évaluation automatique des risques</li>
                <li>• Détection d'anomalies</li>
                <li>• Recommandations contextuelles</li>
              </ul>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm border-2 border-blue-100">
              <Zap className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h4 className="font-bold text-lg mb-3 text-blue-600">NLP Spécialisé</h4>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• Extraction d'entités juridiques</li>
                <li>• Résumés automatiques intelligents</li>
                <li>• Classification automatique avancée</li>
                <li>• Analyse de sentiment juridique</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-gray-700">
              <strong>🚀 Intelligence Artificielle et Machine Learning Avancé :</strong> 
              Toutes les fonctionnalités d'IA juridique sont maintenant intégrées et accessibles dans cette section.
              Utilisez les onglets ci-dessus pour explorer chaque fonctionnalité en détail.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
