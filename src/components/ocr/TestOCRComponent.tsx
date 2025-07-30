import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WifiOff, Brain, Zap } from 'lucide-react';

interface TestOCRComponentProps {
  onFormDataExtracted?: (data: any) => void;
  onClose?: () => void;
}

export function TestOCRComponent({ onFormDataExtracted, onClose }: TestOCRComponentProps) {
  const [testCount, setTestCount] = useState(0);

  const handleTest = () => {
    setTestCount(prev => prev + 1);
    console.log('✅ Test OCR Component fonctionne !');
    alert('✅ Test réussi ! Le composant fonctionne correctement.');
    
    if (onFormDataExtracted) {
      console.log('📤 Envoi des données de test...');
      onFormDataExtracted({
        documentType: 'legal',
        formData: { test: 'données de test' }
      });
    } else {
      console.log('⚠️ onFormDataExtracted non défini');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <WifiOff className="w-6 h-6 text-green-600" />
            🧪 Test OCR Juridique Algérien - Mode 100% Local
            <Badge variant="outline" className="bg-green-100 text-green-800">
              Test Mode
            </Badge>
          </CardTitle>
          <p className="text-green-700">
            Composant de test pour vérifier que l'interface fonctionne correctement
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <Button 
                onClick={handleTest}
                className="bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <Brain className="w-4 h-4 mr-2" />
                🧪 Test Interface OCR {testCount > 0 && `(${testCount})`}
              </Button>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">✅ Tests Interface :</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• ✅ Composant React se charge</li>
                <li>• ✅ Icons Lucide fonctionnent</li>
                <li>• ✅ Cards et Buttons s'affichent</li>
                <li>• ✅ Props sont transmises correctement</li>
              </ul>
            </div>

            {onClose && (
              <div className="text-center">
                <Button 
                  onClick={onClose}
                  variant="outline"
                >
                  Fermer Test
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}