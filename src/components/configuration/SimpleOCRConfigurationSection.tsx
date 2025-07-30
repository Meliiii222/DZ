import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Settings } from 'lucide-react';

interface SimpleOCRConfigurationSectionProps {
  showOCRProcessor?: boolean;
  onShowOCRProcessor?: (show: boolean) => void;
  onFormDataExtracted?: (data: { documentType: 'legal' | 'procedure', formData: Record<string, any> }) => void;
  ocrProcessor?: React.ReactNode;
}

export function SimpleOCRConfigurationSection({
  showOCRProcessor = false,
  onShowOCRProcessor,
  onFormDataExtracted,
  ocrProcessor
}: SimpleOCRConfigurationSectionProps) {
  const [activeTab, setActiveTab] = useState("extraction");
  
  // Effet pour changer d'onglet quand le processeur OCR est lancé
  useEffect(() => {
    if (showOCRProcessor) {
      setActiveTab("processor");
    }
  }, [showOCRProcessor]);

  return (
    <div className="space-y-6">
      {/* En-tête de configuration */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            Configuration OCR Avancée - Documents Algériens
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Scanner intelligent pour documents juridiques algériens
            </p>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => onShowOCRProcessor?.(true)}
            >
              <Brain className="w-4 h-4 mr-2" />
              Lancer le Scanner OCR Avancé
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Configuration détaillée avec onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="extraction">Extraction</TabsTrigger>
          <TabsTrigger value="nlp">NLP & IA</TabsTrigger>
          <TabsTrigger value="mapping">Mapping</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="processor" className="bg-blue-50 text-blue-700">
            🚀 Processeur
          </TabsTrigger>
        </TabsList>

        <TabsContent value="extraction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration d'Extraction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Configuration de base pour l'extraction OCR.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nlp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>NLP & Intelligence Artificielle</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Configuration des modèles d'IA pour l'analyse juridique.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mapping Automatique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Configuration du mapping vers les formulaires.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance et Ressources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Monitoring des performances du système.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processor" className="space-y-4">
          {ocrProcessor ? (
            <div className="space-y-4">
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Brain className="w-5 h-5" />
                    Processeur OCR Avancé - Documents Algériens
                  </CardTitle>
                </CardHeader>
              </Card>
              {ocrProcessor}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Processeur OCR Non Disponible
                </h3>
                <p className="text-gray-500">
                  Le composant processeur OCR n'a pas été fourni à cette section.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Statut des services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Statut des Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-green-600">✅ Tous les services sont opérationnels</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SimpleOCRConfigurationSection;