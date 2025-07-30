
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Scale, BookOpen, Building } from 'lucide-react';
import { LegalText } from './hooks/useLegalTextsData';

interface LegalTextsStatisticsProps {
  filteredTexts: LegalText[];
}

export function LegalTextsStatistics({ filteredTexts }: LegalTextsStatisticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 text-center">
          <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-600">{filteredTexts.length}</p>
          <p className="text-sm text-gray-600">Textes filtrés</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Scale className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">{filteredTexts.filter(t => t.type === 'Loi').length}</p>
          <p className="text-sm text-gray-600">Lois</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-600">{filteredTexts.filter(t => t.type === 'Ordonnance').length}</p>
          <p className="text-sm text-gray-600">Ordonnances</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Building className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-orange-600">{filteredTexts.filter(t => t.type === 'Décret').length}</p>
          <p className="text-sm text-gray-600">Décrets</p>
        </CardContent>
      </Card>
    </div>
  );
}
