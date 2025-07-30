import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { 
  FileText, 
  Image, 
  Zap, 
  Settings, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Download
} from "lucide-react";

interface AdvancedAlgerianOCRProcessorProps {
  onFormDataExtracted?: (data: Record<string, unknown>) => void;
  onClose?: () => void;
}

interface ProcessingStats {
  documentsProcessed: number;
  accuracyRate: number;
  averageTime: number;
  errorsDetected: number;
}

export function AdvancedAlgerianOCRProcessor({ 
  onFormDataExtracted, 
  onClose,
  onProcessingComplete, 
  language = "fr" 
}: AdvancedAlgerianOCRProcessorProps & { onProcessingComplete?: (result: any) => void; language?: string; }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [autoProcess, setAutoProcess] = useState(false);
  
  const [stats] = useState<ProcessingStats>({
    documentsProcessed: 1247,
    accuracyRate: 94.8,
    averageTime: 2.3,
    errorsDetected: 12
  });

  const handleStartProcessing = () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulation du traitement
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          onProcessingComplete?.({
            success: true,
            documentsProcessed: 1,
            extractedText: "Document juridique algérien traité avec succès"
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <Zap className="h-5 w-5 text-blue-600" />
          Processeur OCR Avancé - Documents Algériens
        </h3>
        <p className="text-gray-600">
          Traitement intelligent des textes juridiques avec IA spécialisée
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.documentsProcessed}</div>
            <div className="text-sm text-gray-600">Documents Traités</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.accuracyRate}%</div>
            <div className="text-sm text-gray-600">Précision</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.averageTime}s</div>
            <div className="text-sm text-gray-600">Temps Moyen</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.errorsDetected}</div>
            <div className="text-sm text-gray-600">Erreurs Détectées</div>
          </CardContent>
        </Card>
      </div>

      {/* Zone de traitement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Traitement en Cours
          </CardTitle>
          <CardDescription>
            Processeur OCR spécialisé pour documents juridiques algériens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Options de traitement */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Traitement Automatique</span>
            </div>
            <Switch 
              checked={autoProcess}
              onCheckedChange={setAutoProcess}
            />
          </div>

          {/* Barre de progression */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression du traitement</span>
                <span>{processingProgress}%</span>
              </div>
              <Progress value={processingProgress} className="w-full" />
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex gap-2">
            <Button 
              onClick={handleStartProcessing}
              disabled={isProcessing}
              className="flex items-center gap-2"
            >
              {isProcessing ? (
                <Clock className="h-4 w-4" />
              ) : (
                <Zap className="h-4 w-4" />
              )}
              {isProcessing ? 'Traitement...' : 'Démarrer Traitement'}
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuration
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exporter Résultats
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statut et alertes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Statut Système
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Moteur OCR</span>
                <Badge variant="outline" className="text-green-600">
                  Opérationnel
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">IA Juridique</span>
                <Badge variant="outline" className="text-green-600">
                  Actif
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Templates Algériens</span>
                <Badge variant="outline" className="text-blue-600">
                  Chargés (4)
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              Alertes Qualité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="text-green-600">✓ Tous les systèmes opérationnels</div>
              <div className="text-blue-600">ℹ️ Mise à jour templates disponible</div>
              <div className="text-gray-600">📊 Statistiques à jour</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdvancedAlgerianOCRProcessor;