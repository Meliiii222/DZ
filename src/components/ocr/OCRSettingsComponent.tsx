// @ts-nocheck
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/common/SectionHeader";
import { 
  Settings, 
  Save, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle,
  Sliders,
  Database,
  Shield,
  Zap,
  Globe,
  Users
} from 'lucide-react';

interface OCRSettings {
  general: {
    defaultLanguage: string;
    confidenceThreshold: number;
    processingTimeout: number;
    maxFileSize: number;
    enableBatchProcessing: boolean;
    autoApprovalThreshold: number;
  };
  ocr: {
    tesseractMode: string;
    imagePreprocessing: boolean;
    dpiThreshold: number;
    noiseReduction: boolean;
    textOrientation: boolean;
  };
  ai: {
    entityDetectionEnabled: boolean;
    intelligentMappingEnabled: boolean;
    confidenceBoostEnabled: boolean;
    learningModeEnabled: boolean;
  };
  workflow: {
    autoAssignment: boolean;
    notificationEnabled: boolean;
    escalationTimeout: number;
    requireDoubleValidation: boolean;
  };
  security: {
    dataEncryption: boolean;
    auditLogging: boolean;
    accessControl: boolean;
    dataRetentionDays: number;
  };
}

const OCRSettingsComponent: React.FC = () => {
  const [settings, setSettings] = useState<OCRSettings>({
    general: {
      defaultLanguage: 'mixed',
      confidenceThreshold: 85,
      processingTimeout: 30,
      maxFileSize: 50,
      enableBatchProcessing: true,
      autoApprovalThreshold: 95
    },
    ocr: {
      tesseractMode: 'PSM_AUTO',
      imagePreprocessing: true,
      dpiThreshold: 300,
      noiseReduction: true,
      textOrientation: true
    },
    ai: {
      entityDetectionEnabled: true,
      intelligentMappingEnabled: true,
      confidenceBoostEnabled: true,
      learningModeEnabled: false
    },
    workflow: {
      autoAssignment: true,
      notificationEnabled: true,
      escalationTimeout: 48,
      requireDoubleValidation: false
    },
    security: {
      dataEncryption: true,
      auditLogging: true,
      accessControl: true,
      dataRetentionDays: 365
    }
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const updateSetting = (section: keyof OCRSettings, key: string, value: Record<string, unknown>) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
    setSaveStatus('idle');
  };

  const saveSettings = async () => {
    setSaveStatus('saving');
    setHasChanges(false);
    
    // Simulation de sauvegarde
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const resetToDefaults = () => {
    setSettings({
      general: {
        defaultLanguage: 'mixed',
        confidenceThreshold: 85,
        processingTimeout: 30,
        maxFileSize: 50,
        enableBatchProcessing: true,
        autoApprovalThreshold: 95
      },
      ocr: {
        tesseractMode: 'PSM_AUTO',
        imagePreprocessing: true,
        dpiThreshold: 300,
        noiseReduction: true,
        textOrientation: true
      },
      ai: {
        entityDetectionEnabled: true,
        intelligentMappingEnabled: true,
        confidenceBoostEnabled: true,
        learningModeEnabled: false
      },
      workflow: {
        autoAssignment: true,
        notificationEnabled: true,
        escalationTimeout: 48,
        requireDoubleValidation: false
      },
      security: {
        dataEncryption: true,
        auditLogging: true,
        accessControl: true,
        dataRetentionDays: 365
      }
    });
    setHasChanges(true);
  };

  const getSaveButtonText = () => {
    switch (saveStatus) {
      case 'saving': return 'Sauvegarde...';
      case 'saved': return 'Sauvegardé ✓';
      case 'error': return 'Erreur';
      default: return 'Sauvegarder';
    }
  };

  const getSaveButtonIcon = () => {
    switch (saveStatus) {
      case 'saving': return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>;
      case 'saved': return <CheckCircle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <Save className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionHeader
          title="⚙️ Paramètres OCR"
          description="Configuration avancée du système de reconnaissance et d'intelligence artificielle"
          icon={Settings}
          iconColor="text-blue-600"
        />
        <div className="flex items-center gap-3">
          <Button
            onClick={resetToDefaults}
            variant="outline"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Réinitialiser
          </Button>
          <Button
            onClick={saveSettings}
            disabled={!hasChanges || saveStatus === 'saving'}
            className={`${
              saveStatus === 'saved' ? 'bg-green-600' : 
              saveStatus === 'error' ? 'bg-red-600' : 'bg-blue-600'
            } hover:opacity-90`}
          >
            {getSaveButtonIcon()}
            <span className="ml-2">{getSaveButtonText()}</span>
          </Button>
        </div>
      </div>

      {/* Status Banner */}
      {hasChanges && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800">
              Vous avez des modifications non sauvegardées. N'oubliez pas de sauvegarder vos changements.
            </p>
          </div>
        </Card>
      )}

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="ocr">OCR</TabsTrigger>
          <TabsTrigger value="ai">Intelligence IA</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Paramètres Généraux
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Langue par défaut</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={settings.general.defaultLanguage}
                  onChange={(e) => updateSetting('general', 'defaultLanguage', e.target.value)}
                >
                  <option value="ar">Arabe</option>
                  <option value="fr">Français</option>
                  <option value="mixed">Bilingue (AR/FR)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Seuil de confiance minimum ({settings.general.confidenceThreshold}%)
                </label>
                <input
                  type="range"
                  min="70"
                  max="100"
                  value={settings.general.confidenceThreshold}
                  onChange={(e) => updateSetting('general', 'confidenceThreshold', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Timeout de traitement (secondes)</label>
                <Input
                  type="number"
                  value={settings.general.processingTimeout}
                  onChange={(e) => updateSetting('general', 'processingTimeout', parseInt(e.target.value))}
                  min="10"
                  max="300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Taille max fichier (MB)</label>
                <Input
                  type="number"
                  value={settings.general.maxFileSize}
                  onChange={(e) => updateSetting('general', 'maxFileSize', parseInt(e.target.value))}
                  min="1"
                  max="200"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="batchProcessing"
                  checked={settings.general.enableBatchProcessing}
                  onChange={(e) => updateSetting('general', 'enableBatchProcessing', e.target.checked)}
                />
                <label htmlFor="batchProcessing" className="text-sm font-medium">
                  Activer le traitement par lot
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Seuil d'approbation automatique ({settings.general.autoApprovalThreshold}%)
                </label>
                <input
                  type="range"
                  min="90"
                  max="100"
                  value={settings.general.autoApprovalThreshold}
                  onChange={(e) => updateSetting('general', 'autoApprovalThreshold', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* OCR Settings */}
        <TabsContent value="ocr" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Sliders className="mr-2 h-5 w-5" />
              Paramètres OCR Avancés
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Mode Tesseract</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={settings.ocr.tesseractMode}
                  onChange={(e) => updateSetting('ocr', 'tesseractMode', e.target.value)}
                >
                  <option value="PSM_AUTO">Détection automatique</option>
                  <option value="PSM_SINGLE_BLOCK">Bloc unique</option>
                  <option value="PSM_SINGLE_COLUMN">Colonne unique</option>
                  <option value="PSM_SINGLE_LINE">Ligne unique</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Seuil DPI minimum ({settings.ocr.dpiThreshold})
                </label>
                <input
                  type="range"
                  min="150"
                  max="600"
                  step="50"
                  value={settings.ocr.dpiThreshold}
                  onChange={(e) => updateSetting('ocr', 'dpiThreshold', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="preprocessing"
                  checked={settings.ocr.imagePreprocessing}
                  onChange={(e) => updateSetting('ocr', 'imagePreprocessing', e.target.checked)}
                />
                <label htmlFor="preprocessing" className="text-sm font-medium">
                  Prétraitement d'image
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="noiseReduction"
                  checked={settings.ocr.noiseReduction}
                  onChange={(e) => updateSetting('ocr', 'noiseReduction', e.target.checked)}
                />
                <label htmlFor="noiseReduction" className="text-sm font-medium">
                  Réduction du bruit
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="textOrientation"
                  checked={settings.ocr.textOrientation}
                  onChange={(e) => updateSetting('ocr', 'textOrientation', e.target.checked)}
                />
                <label htmlFor="textOrientation" className="text-sm font-medium">
                  Détection d'orientation du texte
                </label>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* AI Settings */}
        <TabsContent value="ai" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              Intelligence Artificielle
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Détection d'entités juridiques</h4>
                  <p className="text-sm text-gray-600">
                    Extraction automatique des numéros, dates, articles et signataires
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.ai.entityDetectionEnabled}
                  onChange={(e) => updateSetting('ai', 'entityDetectionEnabled', e.target.checked)}
                  className="scale-125"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Mapping intelligent</h4>
                  <p className="text-sm text-gray-600">
                    Association automatique des données extraites aux champs de formulaire
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.ai.intelligentMappingEnabled}
                  onChange={(e) => updateSetting('ai', 'intelligentMappingEnabled', e.target.checked)}
                  className="scale-125"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Boost de confiance IA</h4>
                  <p className="text-sm text-gray-600">
                    Amélioration du score de confiance basée sur l'analyse contextuelle
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.ai.confidenceBoostEnabled}
                  onChange={(e) => updateSetting('ai', 'confidenceBoostEnabled', e.target.checked)}
                  className="scale-125"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <h4 className="font-medium flex items-center">
                    Mode apprentissage automatique
                    <Badge className="ml-2 bg-yellow-100 text-yellow-800">Expérimental</Badge>
                  </h4>
                  <p className="text-sm text-gray-600">
                    Amélioration continue des modèles basée sur les validations utilisateur
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.ai.learningModeEnabled}
                  onChange={(e) => updateSetting('ai', 'learningModeEnabled', e.target.checked)}
                  className="scale-125"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Workflow Settings */}
        <TabsContent value="workflow" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Gestion du Workflow
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Attribution automatique</h4>
                  <p className="text-sm text-gray-600">
                    Assignation automatique des documents aux experts disponibles
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.workflow.autoAssignment}
                  onChange={(e) => updateSetting('workflow', 'autoAssignment', e.target.checked)}
                  className="scale-125"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Notifications</h4>
                  <p className="text-sm text-gray-600">
                    Notifications par email des nouveaux documents et changements de statut
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.workflow.notificationEnabled}
                  onChange={(e) => updateSetting('workflow', 'notificationEnabled', e.target.checked)}
                  className="scale-125"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Délai d'escalade (heures)
                  </label>
                  <Input
                    type="number"
                    value={settings.workflow.escalationTimeout}
                    onChange={(e) => updateSetting('workflow', 'escalationTimeout', parseInt(e.target.value))}
                    min="1"
                    max="168"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Double validation</h4>
                  <p className="text-sm text-gray-600">
                    Exiger une validation par deux experts pour les documents critiques
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.workflow.requireDoubleValidation}
                  onChange={(e) => updateSetting('workflow', 'requireDoubleValidation', e.target.checked)}
                  className="scale-125"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Sécurité et Conformité
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Chiffrement des données</h4>
                  <p className="text-sm text-gray-600">
                    Chiffrement AES-256 des documents et données sensibles
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.security.dataEncryption}
                  onChange={(e) => updateSetting('security', 'dataEncryption', e.target.checked)}
                  className="scale-125"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Journalisation d'audit</h4>
                  <p className="text-sm text-gray-600">
                    Enregistrement détaillé de toutes les actions et modifications
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.security.auditLogging}
                  onChange={(e) => updateSetting('security', 'auditLogging', e.target.checked)}
                  className="scale-125"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Contrôle d'accès</h4>
                  <p className="text-sm text-gray-600">
                    Gestion des permissions et authentification renforcée
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.security.accessControl}
                  onChange={(e) => updateSetting('security', 'accessControl', e.target.checked)}
                  className="scale-125"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Rétention des données (jours)
                </label>
                <Input
                  type="number"
                  value={settings.security.dataRetentionDays}
                  onChange={(e) => updateSetting('security', 'dataRetentionDays', parseInt(e.target.value))}
                  min="30"
                  max="2555"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Durée de conservation des documents et logs (30 jours minimum, 7 ans maximum)
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Status */}
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Système opérationnel</span>
          </div>
          <div className="text-sm text-green-700">
            Dernière mise à jour: {new Date().toLocaleString()}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OCRSettingsComponent;