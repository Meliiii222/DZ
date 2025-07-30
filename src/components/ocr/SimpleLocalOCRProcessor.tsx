// @ts-nocheck
// Version simplifiée du LocalAlgerianOCRProcessor pour tests
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WifiOff, Brain, Zap, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SimpleLocalOCRProcessorProps {
  onFormDataExtracted?: (data: { documentType: 'legal' | 'procedure', formData: Record<string, any> }) => void;
  onClose?: () => void;
}

export function SimpleLocalOCRProcessor({ onFormDataExtracted, onClose }: SimpleLocalOCRProcessorProps) {
  const { toast } = useToast();
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeServices = useCallback(async () => {
    toast({
      title: "🇩🇿 Initialisation Simulation",
      description: "Services OCR locaux simulés initialisés",
    });
    setIsInitialized(true);
  }, [toast]);

  const simulateOCR = useCallback(() => {
    const mockData = {
      documentType: 'legal' as const,
      formData: {
        titre: "Décret exécutif n° 24-001 du 23 janvier 2025",
        numero: "24-001",
        type: "decret_executif",
        institution: "Ministère de la Justice",
        datePublication: "23 janvier 2025"
      }
    };

    toast({
      title: "✅ OCR Simulation Réussie",
      description: "Données extraites et mappées (simulation)",
    });

    if (onFormDataExtracted) {
      onFormDataExtracted(mockData);
    }
  }, [onFormDataExtracted, toast]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <WifiOff className="w-6 h-6 text-green-600" />
            🇩🇿 OCR Juridique Algérien - Version Simplifiée
            <Badge variant="outline" className="bg-green-100 text-green-800">
              Simulation
            </Badge>
          </CardTitle>
          <p className="text-green-700">
            Version simplifiée pour tests - Simulation des fonctionnalités OCR
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!isInitialized ? (
              <Button 
                onClick={initializeServices}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <Zap className="w-4 h-4 mr-2" />
                Initialiser Services OCR (Simulation)
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-100 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Services Initialisés</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    OCR local prêt pour traitement (mode simulation)
                  </p>
                </div>
                
                <Button 
                  onClick={simulateOCR}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  🧪 Simuler Extraction OCR Juridique
                </Button>

                {onClose && (
                  <Button 
                    onClick={onClose}
                    variant="outline"
                    className="w-full"
                  >
                    Fermer
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}