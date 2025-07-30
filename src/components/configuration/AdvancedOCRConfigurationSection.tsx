import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Settings, 
  Zap, 
  FileText, 
  Database, 
  AlertTriangle,
  CheckCircle,
  Info,
  Cpu,
  HardDrive,
  Network
} from 'lucide-react';
import { AdvancedAlgerianOCRProcessor } from '@/components/ocr/AdvancedAlgerianOCRProcessor';

interface AdvancedOCRConfigurationSectionProps {
  showOCRProcessor?: boolean;
  onShowOCRProcessor?: (show: boolean) => void;
  onFormDataExtracted?: (data: { documentType: 'legal' | 'procedure', formData: Record<string, any> }) => void;
  ocrProcessor?: React.ReactNode;
}

export function AdvancedOCRConfigurationSection({
  showOCRProcessor = false,
  onShowOCRProcessor,
  onFormDataExtracted,
  ocrProcessor
}: AdvancedOCRConfigurationSectionProps) {
  const [activeTab, setActiveTab] = useState("extraction");
  
  // Effet pour changer d'onglet quand le processeur OCR est lancé
  useEffect(() => {
    if (showOCRProcessor) {
      setActiveTab("processor");
    }
  }, [showOCRProcessor]);

  const [config, setConfig] = useState({
    enableAdvancedNLP: true,
    enableEntityExtraction: true,
    enableAutoMapping: true,
    confidenceThreshold: [75],
    batchProcessing: false,
    realTimeValidation: true,
    enableLogging: true
  });

  const handleConfigChange = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const systemStatus = {
    nlpEngine: 'Opérationnel',
    textExtractor: 'Opérationnel',
    mappingService: 'Opérationnel',
    nomenclatureDB: 'Connectée'
  };

  try {
    return (
      <div className="space-y-6">
        {/* En-tête de configuration */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-600" />
                Configuration OCR Avancé - Textes Juridiques Algériens
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Système Actif</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Extraction, structuration et mapping opérationnels
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Base Locale</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Nomenclature algérienne chargée
                  </p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-800">IA Prête</span>
                  </div>
                  <p className="text-sm text-purple-700">
                    NLP et mapping automatique activés
                  </p>
                </div>
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => onShowOCRProcessor?.(true)}
              >
                <Brain className="w-4 h-4 mr-2" />
                Lancer le Scanner OCR Avancé
              </Button>
            </CardContent>
          </Card>

          {/* Configuration détaillée */}
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
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Configuration d'Extraction PyMuPDF
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Détection des bordures</label>
                      <p className="text-sm text-gray-600">Suppression automatique des bordures de journaux officiels</p>
                    </div>
                    <Switch 
                      checked={true} 
                      disabled 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Détection de colonnes</label>
                      <p className="text-sm text-gray-600">Identification des lignes verticales séparatrices</p>
                    </div>
                    <Switch 
                      checked={true} 
                      disabled 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Extraction de tables</label>
                      <p className="text-sm text-gray-600">Détection et extraction des tableaux avec OpenCV</p>
                    </div>
                    <Switch 
                      checked={true} 
                      disabled 
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Algorithme Implémenté</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Utilise l'algorithme d'extraction selon les spécifications annexe : 
                      détection de lignes, suppression de bordures, zones de texte et tables.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nlp" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Configuration NLP & Entités
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Extraction d'entités avancée</label>
                      <p className="text-sm text-gray-600">spaCy + modèles juridiques algériens</p>
                    </div>
                    <Switch 
                      checked={config.enableEntityExtraction}
                      onCheckedChange={(checked) => handleConfigChange('enableEntityExtraction', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Relations juridiques</label>
                      <p className="text-sm text-gray-600">Extraction des liens entre publications (abrogations, annexes...)</p>
                    </div>
                    <Switch 
                      checked={config.enableAdvancedNLP}
                      onCheckedChange={(checked) => handleConfigChange('enableAdvancedNLP', checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-medium">Seuil de confiance minimum</label>
                    <Slider
                      value={config.confidenceThreshold}
                      onValueChange={(value) => handleConfigChange('confidenceThreshold', value)}
                      max={100}
                      min={30}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-600">
                      Actuellement: {config.confidenceThreshold[0]}%
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Entités Détectées Automatiquement</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <Badge variant="secondary">Institutions</Badge>
                      <Badge variant="secondary">Wilayas</Badge>
                      <Badge variant="secondary">Dates (Hijri/Grégorien)</Badge>
                      <Badge variant="secondary">Numéros de lois</Badge>
                      <Badge variant="secondary">Références juridiques</Badge>
                      <Badge variant="secondary">Signataires</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mapping" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Configuration du Mapping Dynamique
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Mapping automatique</label>
                      <p className="text-sm text-gray-600">Adaptation automatique selon le type de document</p>
                    </div>
                    <Switch 
                      checked={config.enableAutoMapping}
                      onCheckedChange={(checked) => handleConfigChange('enableAutoMapping', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Validation temps réel</label>
                      <p className="text-sm text-gray-600">Vérification avec la nomenclature algérienne</p>
                    </div>
                    <Switch 
                      checked={config.realTimeValidation}
                      onCheckedChange={(checked) => handleConfigChange('realTimeValidation', checked)}
                    />
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Bibliothèques de Formulaires</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Textes juridiques algériens</span>
                        <Badge className="bg-green-100 text-green-800">Chargée</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Procédures administratives</span>
                        <Badge className="bg-green-100 text-green-800">Chargée</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Wilayas et communes</span>
                        <Badge className="bg-green-100 text-green-800">Chargée</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="w-5 h-5" />
                    Performance et Ressources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Cpu className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">CPU</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">12%</div>
                      <div className="text-sm text-gray-600">Utilisation moyenne</div>
                    </div>

                    <div className="bg-gray-50 rounded p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <HardDrive className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Mémoire</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">245MB</div>
                      <div className="text-sm text-gray-600">Modèles chargés</div>
                    </div>

                    <div className="bg-gray-50 rounded p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Network className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Réseau</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">Local</div>
                      <div className="text-sm text-gray-600">Aucune connexion requise</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Traitement par lot</label>
                      <p className="text-sm text-gray-600">Traitement simultané de plusieurs documents</p>
                    </div>
                    <Switch 
                      checked={config.batchProcessing}
                      onCheckedChange={(checked) => handleConfigChange('batchProcessing', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-medium">Logs détaillés</label>
                      <p className="text-sm text-gray-600">Enregistrement des opérations pour débogage</p>
                    </div>
                    <Switch 
                      checked={config.enableLogging}
                      onCheckedChange={(checked) => handleConfigChange('enableLogging', checked)}
                    />
                  </div>
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
                      <p className="text-blue-700 text-sm">
                        Scanner intelligent pour l'extraction de données à partir de documents juridiques algériens
                      </p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(systemStatus).map(([service, status]) => (
                  <div key={service} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="font-medium capitalize">
                      {service.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      {status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
      </div>
    );
  } catch (error) {
    console.error('Erreur dans AdvancedOCRConfigurationSection:', error);
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <h3 className="font-semibold text-red-800">❌ Erreur de Rendu</h3>
          <p className="text-red-700">
            Une erreur s'est produite lors du chargement de la configuration OCR avancée.
          </p>
          <pre className="text-xs text-red-600 mt-2">
            {error?.toString()}
          </pre>
        </div>
      </div>
    );
  }
}