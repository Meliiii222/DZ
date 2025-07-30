
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export function LegalTextsEmptyState() {
  return (
    <Card className="p-8 text-center">
      <CardContent>
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun texte trouvé</h3>
        <p className="text-gray-600">Aucun texte juridique ne correspond aux critères de recherche et de filtrage sélectionnés.</p>
      </CardContent>
    </Card>
  );
}
