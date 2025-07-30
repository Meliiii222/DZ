import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scan, FileImage, Brain, Zap, WifiOff, HardDrive, Shield } from "lucide-react";
import { OCRScanner } from "@/components/common/OCRScanner";
import { AdvancedAlgerianOCRProcessor } from "@/components/ocr/AdvancedAlgerianOCRProcessor";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface OCRConfigurationProps {
  showOCRScanner: boolean;
  onShowOCRScanner: (show: boolean) => void;
  onTextExtracted: (text: string) => void;
  onFormDataExtracted?: (data: Record<string, unknown>) => void;
  formType?: 'legal-text' | 'procedure' | 'general';
}

export function OCRConfiguration({
  showOCRScanner,
  onShowOCRScanner,
  onTextExtracted,
  onFormDataExtracted,
  formType = 'legal-text'
}: OCRConfigurationProps) {
  const [useLocalOCR, setUseLocalOCR] = useState(true); // Par défaut, utiliser l'OCR local

  const handleFormDataExtracted = (data: Record<string, unknown>) => {
    if (onFormDataExtracted) {
      onFormDataExtracted(data);
    } else {
      // Fallback: convertir en texte pour l'ancien système
      const textContent = Object.values(data).filter(value => 
        typeof value === 'string' && value.length > 10
      ).join('\n\n');
      onTextExtracted(textContent);
    }
    onShowOCRScanner(false);
  };

  return (
    <Card>
      <CardHeader className="border-b border-green-100 bg-green-50">
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-green-600" />
          <WifiOff className="w-5 h-5 text-green-600" />
          OCR 100% Local pour Textes Juridiques Algériens
        </CardTitle>
        <CardDescription>
          Extraction complètement hors ligne avec PyMuPDF, Tesseract.js et analyse NLP locale - Aucune donnée transmise sur Internet
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showOCRScanner ? (
          <div className="space-y-6">
            
            {/* Badge de confidentialité */}
            <Alert className="border-green-200 bg-green-50">
              <Shield className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <strong>Confidentialité totale :</strong> Vos documents sont traités entièrement en local sur votre machine. 
                Aucune donnée n'est envoyée vers des serveurs externes ou des services cloud.
              </AlertDescription>
            </Alert>

            {/* Options d'OCR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* OCR Local Avancé - Recommandé */}
              <div className="relative">
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge className="bg-green-500 text-white">
                    100% Local
                  </Badge>
                </div>
                <Card className="border-2 border-green-200 bg-green-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-5 h-5 text-green-600" />
                      <WifiOff className="w-4 h-4 text-green-600" />
                      <h4 className="font-semibold text-green-800">OCR Local IA Juridique</h4>
                    </div>
                    <p className="text-sm text-green-700 mb-3">
                      • <strong>PyMuPDF + Tesseract.js</strong> : Extraction haute qualité<br/>
                      • <strong>NLP avec compromise.js</strong> : Analyse linguistique locale<br/>
                      • <strong>Mapping automatique</strong> : Selon nomenclature algérienne<br/>
                      • <strong>Expressions régulières</strong> : Entités juridiques spécialisées<br/>
                      • <strong>Algorithme 16 étapes</strong> : Selon spécifications annexées
                    </p>
                    <div className="bg-green-100 p-2 rounded mb-3">
                      <p className="text-xs text-green-800">
                        <HardDrive className="w-3 h-3 inline mr-1" />
                        Tous les traitements s'exécutent dans votre navigateur
                      </p>
                    </div>
                    <Button 
                      onClick={() => {
                        setUseLocalOCR(true);
                        onShowOCRScanner(true);
                      }}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Utiliser l'IA Juridique Locale
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* OCR Standard - Moins recommandé */}
              <Card className="border border-gray-200 opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Scan className="w-5 h-5 text-gray-600" />
                    <h4 className="font-semibold text-gray-700">OCR Standard (Basique)</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    • Extraction de texte basique uniquement<br/>
                    • Pas d'analyse juridique spécialisée<br/>
                    • Mapping manuel requis<br/>
                    • Performances limitées pour les documents algériens
                  </p>
                  <Button 
                    onClick={() => {
                      setUseLocalOCR(false);
                      onShowOCRScanner(true);
                    }}
                    variant="outline"
                    className="w-full"
                    disabled
                  >
                    <Scan className="w-4 h-4 mr-2" />
                    OCR Basique (Non recommandé)
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Désactivé - Utilisez l'OCR Local pour de meilleurs résultats
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Avantages du mode local */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800 text-lg">
                  🇩🇿 Avantages du Mode 100% Local
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <strong>Sécurité maximale</strong>
                    </div>
                    <p className="text-blue-700 ml-6">
                      Vos documents confidentiels ne quittent jamais votre ordinateur
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <WifiOff className="w-4 h-4 text-blue-600" />
                      <strong>Fonctionnement hors ligne</strong>
                    </div>
                    <p className="text-blue-700 ml-6">
                      Aucune connexion Internet requise après initialisation
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <strong>Performance optimale</strong>
                    </div>
                    <p className="text-blue-700 ml-6">
                      Traitement direct sans latence réseau
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-blue-600" />
                      <strong>Conformité RGPD</strong>
                    </div>
                    <p className="text-blue-700 ml-6">
                      Respect total de la confidentialité des données
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information sur les types de documents supportés */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                📄 Documents Juridiques Algériens Supportés
                <Badge variant="outline" className="bg-amber-100 text-amber-800">100% Local</Badge>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-amber-700">
                <div>• <strong>Journaux Officiels</strong> (toutes éditions)</div>
                <div>• <strong>Lois et Ordonnances</strong> (APN, Président)</div>
                <div>• <strong>Décrets Exécutifs</strong> (tous ministères)</div>
                <div>• <strong>Décrets Présidentiels</strong></div>
                <div>• <strong>Arrêtés Ministériels</strong> et Interministériels</div>
                <div>• <strong>Procédures Administratives</strong> (toutes wilayas)</div>
                <div>• <strong>Circulaires et Instructions</strong></div>
                <div>• <strong>Décisions</strong> (organismes publics)</div>
              </div>
              <p className="text-xs text-amber-600 mt-2">
                Support spécialisé pour les expressions régulières juridiques algériennes, 
                dates hégirien/grégorien, institutions nationales et nomenclature officielle.
              </p>
            </div>

            {/* Algorithme technique */}
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-800 text-sm">
                  ⚙️ Algorithme d'Extraction (16 Étapes)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-purple-700 space-y-1">
                  <p><strong>1-2:</strong> Extraction pages PDF → Conversion images haute résolution</p>
                  <p><strong>3:</strong> Détection lignes horizontales/verticales (dilatation + érosion + HoughLinesP)</p>
                  <p><strong>4:</strong> Suppression bordures (3 lignes haut, 2 bas, 2 côtés - spéc. algérienne)</p>
                  <p><strong>5:</strong> Détection lignes séparatrices de colonnes (centre ± ε)</p>
                  <p><strong>6:</strong> Détection tables (intersection lignes H/V)</p>
                  <p><strong>7:</strong> Extraction rectangles zones texte vs tables</p>
                  <p><strong>8-11:</strong> OCR zones texte avec Tesseract.js (FR+AR)</p>
                  <p><strong>12-15:</strong> Extraction cellules tables + OCR</p>
                  <p><strong>16:</strong> Structuration finale avec expressions régulières juridiques</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            {useLocalOCR ? (
                              <AdvancedAlgerianOCRProcessor
                onFormDataExtracted={handleFormDataExtracted}
                onClose={() => onShowOCRScanner(false)}
              />
            ) : (
              <OCRScanner
                onTextExtracted={onTextExtracted}
                onClose={() => onShowOCRScanner(false)}
                title="Scanner pour Générer un Formulaire"
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}