
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

export function NLPAnalysisTab() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            Traitement du Langage Naturel Juridique
          </CardTitle>
          <p className="text-gray-600">
            Traitement du langage naturel spécialisé pour l'analyse automatique de textes juridiques
          </p>
        </CardHeader>
        <CardContent>
          <p>Interface d'analyse NLP - Fonctionnalités en cours de développement</p>
        </CardContent>
      </Card>
    </div>
  );
}
