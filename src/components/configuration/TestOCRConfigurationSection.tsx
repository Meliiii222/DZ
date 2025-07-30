import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

interface TestOCRConfigurationSectionProps {
  showOCRProcessor?: boolean;
  onShowOCRProcessor?: (show: boolean) => void;
  onFormDataExtracted?: (data: { documentType: 'legal' | 'procedure', formData: Record<string, any> }) => void;
  ocrProcessor?: React.ReactNode;
}

export function TestOCRConfigurationSection({
  showOCRProcessor = false,
  onShowOCRProcessor,
  onFormDataExtracted,
  ocrProcessor
}: TestOCRConfigurationSectionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            Test Configuration OCR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Composant de test pour diagnostiquer le problème de page blanche.
            </p>
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h3 className="font-semibold text-green-800">✅ Composant Chargé</h3>
              <p className="text-green-700">
                Si vous voyez ce message, le composant se charge correctement.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <h3 className="font-semibold text-blue-800">🔍 Informations Debug</h3>
              <ul className="text-blue-700 space-y-1">
                <li>showOCRProcessor: {showOCRProcessor ? 'true' : 'false'}</li>
                <li>onShowOCRProcessor: {onShowOCRProcessor ? 'fourni' : 'non fourni'}</li>
                <li>onFormDataExtracted: {onFormDataExtracted ? 'fourni' : 'non fourni'}</li>
                <li>ocrProcessor: {ocrProcessor ? 'fourni' : 'non fourni'}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TestOCRConfigurationSection;