
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export function RecommendationsTab() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-green-600" />
            Recommandations Contextuelles
          </CardTitle>
          <p className="text-gray-600">
            Système de recommandations intelligentes basé sur l'analyse contextuelle
          </p>
        </CardHeader>
        <CardContent>
          <p>Interface de recommandations - Fonctionnalités en cours de développement</p>
        </CardContent>
      </Card>
    </div>
  );
}
