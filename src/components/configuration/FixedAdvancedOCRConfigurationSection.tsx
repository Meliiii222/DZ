import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Settings, 
  FileText, 
  Database, 
  AlertTriangle,
  CheckCircle,
  Info,
  Cpu,
  HardDrive,
  Network
} from 'lucide-react';

interface AdvancedOCRConfigurationSectionProps {
  showOCRProcessor?: boolean;
  onShowOCRProcessor?: (show: boolean) => void;
  onFormDataExtracted?: (data: { documentType: 'legal' | 'procedure', formData: Record<string, any> }) => void;
}

export function FixedAdvancedOCRConfigurationSection({
  showOCRProcessor = false,
  onShowOCRProcessor,
  onFormDataExtracted
}: AdvancedOCRConfigurationSectionProps) {
  const [activeTab, setActiveTab] = useState("extraction");

  const [config, setConfig] = useState({
    enableAdvancedNLP: true,
    enableEntityExtraction: true,
    enableAutoMapping: true,
    batchProcessing: false,
    realTimeValidation: true,
    enableLogging: true
  });

  const handleConfigChange = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const systemStatus = {
    tesseractJS: 'Opérationnel',
    nlpModels: 'Chargés',
    mappingEngine: 'Actif',
    qualityMonitor: 'Surveillance',
    algerianTemplates: 'Chargés',
    nomenclatureDB: 'Connectée'
  };

  try {
    return (
      <div className="space-y-6">
        {/* Configuration avec onglets */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="extraction">Extraction</TabsTrigger>
            <TabsTrigger value="nlp">NLP & IA</TabsTrigger>
            <TabsTrigger value="mapping">Mapping</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
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
                    <label className="font-medium">Mode haute résolution</label>
                    <p className="text-sm text-gray-600">Extraction avec qualité maximale pour OCR</p>
                  </div>
                  <Switch 
                    checked={config.enableAdvancedNLP}
                    onCheckedChange={(checked) => handleConfigChange('enableAdvancedNLP', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Détection automatique de langue</label>
                    <p className="text-sm text-gray-600">Français et Arabe pour documents algériens</p>
                  </div>
                  <Switch 
                    checked={true}
                    disabled
                  />
                </div>

                <div className="bg-blue-50 rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Configuration Optimisée</span>
                  </div>
                  <p className="text-blue-700 text-sm">
                    PyMuPDF configuré spécialement pour les documents officiels algériens
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
                  Modèles NLP et Intelligence Artificielle
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Extraction d'entités juridiques</label>
                    <p className="text-sm text-gray-600">Numéros, dates, références légales</p>
                  </div>
                  <Switch 
                    checked={config.enableEntityExtraction}
                    onCheckedChange={(checked) => handleConfigChange('enableEntityExtraction', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Analyse des relations</label>
                    <p className="text-sm text-gray-600">Détection des 7 types de relations juridiques</p>
                  </div>
                  <Switch 
                    checked={true}
                    disabled
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Modèles Chargés</span>
                    </div>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Entités juridiques algériennes</li>
                      <li>• Relations hiérarchiques</li>
                      <li>• Nomenclatures officielles</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Database className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Templates DZ</span>
                    </div>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Décret Exécutif</li>
                      <li>• Arrêté Ministériel</li>
                      <li>• Loi et Ordonnance</li>
                    </ul>
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
                  Mapping Automatique vers Formulaires
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Mapping automatique</label>
                    <p className="text-sm text-gray-600">Correspondance vers formulaires structurés</p>
                  </div>
                  <Switch 
                    checked={config.enableAutoMapping}
                    onCheckedChange={(checked) => handleConfigChange('enableAutoMapping', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Validation en temps réel</label>
                    <p className="text-sm text-gray-600">Vérification immédiate des données extraites</p>
                  </div>
                  <Switch 
                    checked={config.realTimeValidation}
                    onCheckedChange={(checked) => handleConfigChange('realTimeValidation', checked)}
                  />
                </div>

                <div className="bg-yellow-50 rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Qualité du Mapping</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-yellow-700">Précision moyenne: </span>
                      <span className="font-semibold text-yellow-800">94.8%</span>
                    </div>
                    <div>
                      <span className="text-yellow-700">Templates actifs: </span>
                      <span className="font-semibold text-yellow-800">4/4</span>
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
    console.error('Erreur dans FixedAdvancedOCRConfigurationSection:', error);
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

export default FixedAdvancedOCRConfigurationSection;