import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Scan, CheckCircle, FileText, Settings, AlertTriangle, BookOpen, Building, ClipboardList } from 'lucide-react';
import { OCRScanner } from './OCRScanner';
import { extractAlgerianProcedureData } from '@/utils/algerianOCRExtractor';
import { useAlgerianNomenclatureData } from '@/hooks/useAlgerianNomenclatureData';

interface AlgerianProcedureOCRProcessorProps {
  onFormDataExtracted: (data: { documentType: 'procedure', formData: Record<string, any> }) => void;
  onClose?: () => void;
  title?: string;
  className?: string;
}

export function AlgerianProcedureOCRProcessor({ 
  onFormDataExtracted, 
  onClose, 
  title = "Scanner OCR - Procédures Administratives Algériennes", 
  className = "" 
}: AlgerianProcedureOCRProcessorProps) {
  const [extractedData, setExtractedData] = useState<{ documentType: 'procedure', formData: Record<string, any> } | null>(null);
  const [showScanner, setShowScanner] = useState(true);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const [detectedLanguage, setDetectedLanguage] = useState<'ar' | 'fr' | 'mixed'>('fr');
  const [detectedInstitution, setDetectedInstitution] = useState<string>('');
  const { mapAlgerianOCRDataToForm, validateAlgerianDocument } = useAlgerianNomenclatureData();

  const handleTextExtracted = async (text: string) => {
    console.log('🇩🇿 [AlgerianProcedureOCRProcessor] Texte OCR extrait pour analyse procédure:', text.substring(0, 300) + '...');
    
    setProcessingStage('Analyse de la procédure administrative algérienne...');
    
    // Détecter la langue du document (français/arabe/mixte)
    const arabicPattern = /[\u0600-\u06FF]/g;
    const frenchPattern = /[àâäéèêëïîôöùûüÿç]/gi;
    const arabicMatches = text.match(arabicPattern)?.length || 0;
    const frenchMatches = text.match(frenchPattern)?.length || 0;
    
    let language: 'ar' | 'fr' | 'mixed' = 'fr';
    if (arabicMatches > frenchMatches && arabicMatches > 10) {
      language = 'ar';
    } else if (arabicMatches > 0 && frenchMatches > 0) {
      language = 'mixed';
    }
    setDetectedLanguage(language);
    
    // Vérifier que c'est bien une procédure administrative algérienne
    const lowerText = text.toLowerCase();
    const isProcedureDocument = 
      // Types de procédures
      lowerText.includes('demande') ||
      lowerText.includes('autorisation') ||
      lowerText.includes('certificat') ||
      lowerText.includes('attestation') ||
      lowerText.includes('permis') ||
      lowerText.includes('licence') ||
      lowerText.includes('carte') ||
      lowerText.includes('inscription') ||
      lowerText.includes('enregistrement') ||
      // Documents typiques algériens
      lowerText.includes('acte de naissance') ||
      lowerText.includes('certificat de résidence') ||
      lowerText.includes('casier judiciaire') ||
      lowerText.includes('registre de commerce') ||
      lowerText.includes('carte chifa') ||
      // Lieux algériens
      lowerText.includes('wilaya') ||
      lowerText.includes('commune') ||
      lowerText.includes('daïra') ||
      lowerText.includes('mairie') ||
      // Termes administratifs
      lowerText.includes('dossier') ||
      lowerText.includes('formalité') ||
      lowerText.includes('procédure') ||
      lowerText.includes('démarche');

    if (!isProcedureDocument) {
      setProcessingStage('⚠️ Document non reconnu comme procédure administrative algérienne');
      console.warn('⚠️ [AlgerianProcedureOCRProcessor] Document ne semble pas être une procédure administrative algérienne');
      return;
    }

    setProcessingStage('Identification de l\'organisme compétent...');
    
    // Détecter l'organisme/institution
    const institutions = [
      'Wilaya',
      'Commune',
      'Mairie',
      'Centre National du Registre de Commerce',
      'Caisse Nationale d\'Assurances Sociales',
      'Centre des Impôts',
      'Bureau de Poste',
      'Tribunal',
      'Préfecture',
      'Direction de l\'Éducation',
      'Direction de la Santé',
      'Direction de l\'Agriculture'
    ];
    
    for (const institution of institutions) {
      if (lowerText.includes(institution.toLowerCase())) {
        setDetectedInstitution(institution);
        break;
      }
    }
    
    setProcessingStage('Extraction des données de procédure administrative...');
    const procedureData = extractAlgerianProcedureData(text, language);
    const mappedProcedureData = mapAlgerianOCRDataToForm(procedureData, 'procedure');
    const parsedData = { documentType: 'procedure' as const, formData: mappedProcedureData };
    
    setProcessingStage('Validation des données extraites...');
    
    // Valider les données avec les référentiels algériens
    const validationResult = validateAlgerianDocument(parsedData);
    setConfidence(validationResult.confidence);
    
    console.log('🇩🇿 [AlgerianProcedureOCRProcessor] Données procédure parsées et validées:', parsedData);
    console.log('🎯 [AlgerianProcedureOCRProcessor] Confiance:', validationResult.confidence + '%');
    console.log('🏛️ [AlgerianProcedureOCRProcessor] Institution détectée:', detectedInstitution);
    console.log('🗣️ [AlgerianProcedureOCRProcessor] Langue détectée:', language);
    
    setExtractedData(parsedData);
    setShowScanner(false);
    setProcessingStage('Traitement terminé');
  };

  const handleValidateAndUse = () => {
    console.log('✅ [AlgerianProcedureOCRProcessor] Validation et utilisation des données procédure:', extractedData);
    if (extractedData) {
      console.log('📤 [AlgerianProcedureOCRProcessor] Envoi des données vers le formulaire parent');
      console.log('🏛️ [AlgerianProcedureOCRProcessor] Type de document procédure:', extractedData.documentType);
      console.log('📝 [AlgerianProcedureOCRProcessor] Données formulaire:', extractedData.formData);
      console.log('📊 [AlgerianProcedureOCRProcessor] Nombre de champs dans formData:', Object.keys(extractedData.formData).length);
      
      try {
        onFormDataExtracted(extractedData);
        console.log('✅ [AlgerianProcedureOCRProcessor] Callback onFormDataExtracted appelé avec succès');
        
        // Fermer le scanner après un délai pour permettre au parent de traiter
        if (onClose) {
          console.log('🔒 [AlgerianProcedureOCRProcessor] Fermeture du scanner dans 100ms');
          setTimeout(() => {
            onClose();
          }, 100);
        }
      } catch (error) {
        console.error('❌ [AlgerianProcedureOCRProcessor] Erreur lors de l\'appel du callback:', error);
      }
    } else {
      console.warn('⚠️ [AlgerianProcedureOCRProcessor] Aucune donnée extraite disponible');
    }
  };

  const handleNewScan = () => {
    setExtractedData(null);
    setShowScanner(true);
    setProcessingStage('');
    setConfidence(0);
    setDetectedLanguage('fr');
    setDetectedInstitution('');
  };

  if (showScanner) {
    return (
      <div className="space-y-4">
        <OCRScanner
          onTextExtracted={handleTextExtracted}
          onClose={onClose}
          title={title}
          className={className}
        />
        {processingStage && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-4 h-4 text-green-600 animate-spin" />
                <span className="text-sm font-medium text-green-800">{processingStage}</span>
              </div>
              <Progress value={75} className="h-2" />
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50">
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <ClipboardList className="w-5 h-5 text-green-600" />
          Données Extraites - Procédure Administrative Algérienne
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Informations sur le document détecté */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">Type:</span>
            <Badge variant="default" className="bg-green-600">
              Procédure Administrative
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">Langue:</span>
            <Badge variant="outline">
              {detectedLanguage === 'ar' ? 'Arabe' : detectedLanguage === 'fr' ? 'Français' : 'Bilingue'}
            </Badge>
          </div>
          
          {detectedInstitution && (
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium">Organisme:</span>
              <Badge variant="outline" className="text-xs">
                {detectedInstitution}
              </Badge>
            </div>
          )}
        </div>

        {/* Indicateur de confiance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Confiance de l'extraction</span>
            <span className={`text-sm font-bold ${confidence >= 80 ? 'text-green-600' : confidence >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              {confidence}%
            </span>
          </div>
          <Progress 
            value={confidence} 
            className={`h-2 ${confidence >= 80 ? 'bg-green-100' : confidence >= 60 ? 'bg-yellow-100' : 'bg-red-100'}`} 
          />
          {confidence < 60 && (
            <div className="flex items-center gap-2 text-amber-700 bg-amber-50 p-3 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs">
                Confiance faible. Veuillez vérifier attentivement les données extraites.
              </span>
            </div>
          )}
        </div>

        {/* Aperçu des données extraites */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-800 mb-3">Données procédure extraites ({Object.keys(extractedData?.formData || {}).length} champs)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
            {Object.entries(extractedData?.formData || {}).map(([key, value]) => (
              <div key={key} className="text-xs">
                <span className="font-medium text-green-700">{key}:</span>
                <span className="ml-2 text-green-600">
                  {typeof value === 'string' ? value.substring(0, 50) + (value.length > 50 ? '...' : '') : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            onClick={handleValidateAndUse}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Utiliser ces données de procédure
          </Button>
          
          <Button 
            onClick={handleNewScan}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            <Scan className="w-4 h-4 mr-2" />
            Nouveau scan
          </Button>
          
          {onClose && (
            <Button variant="ghost" onClick={onClose}>
              Annuler
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}