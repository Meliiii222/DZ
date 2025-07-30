
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Scan, Upload, Camera, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useOCRScanner } from '@/hooks/useOCRScanner';

interface OCRScannerProps {
  onTextExtracted: (text: string) => void;
  onClose?: () => void;
  title?: string;
  className?: string;
}

export function OCRScanner({ 
  onTextExtracted, 
  onClose, 
  title = "Scanner OCR", 
  className = "" 
}: OCRScannerProps) {
  const [extractedText, setExtractedText] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isProcessing, error, scanDocument, scanFromCamera, clearError } = useOCRScanner();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await scanDocument(file);
    if (result) {
      setExtractedText(result.text);
      setConfidence(result.confidence);
    }
  };

  const handleCameraCapture = async () => {
    const result = await scanFromCamera();
    if (result) {
      setExtractedText(result.text);
      setConfidence(result.confidence);
    }
  };

  const handleUseText = () => {
    if (extractedText.trim()) {
      onTextExtracted(extractedText);
      if (onClose) onClose();
    }
  };

  const handleNewScan = () => {
    setExtractedText('');
    setConfidence(0);
    clearError();
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="w-5 h-5 text-blue-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scan Options */}
        {!extractedText && !isProcessing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="h-20 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="w-6 h-6" />
              <span>Importer un fichier</span>
              <span className="text-xs opacity-80">Images ou PDF</span>
            </Button>
            
            <Button
              onClick={handleCameraCapture}
              variant="outline"
              className="h-20 flex flex-col gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Camera className="w-6 h-6" />
              <span>Prendre une photo</span>
            </Button>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Processing State */}
        {isProcessing && (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Scan className="w-5 h-5 animate-spin text-blue-600" />
              <span>Traitement en cours...</span>
            </div>
            <Progress value={45} className="w-full" />
            <p className="text-sm text-gray-600">
              Extraction du texte en cours, veuillez patienter
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Erreur</span>
            </div>
            <p className="text-red-600 mt-1">{error}</p>
            <Button 
              onClick={clearError} 
              variant="outline" 
              size="sm" 
              className="mt-2"
            >
              Réessayer
            </Button>
          </div>
        )}

        {/* Results */}
        {extractedText && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Texte extrait avec succès</span>
              <span className="text-sm text-gray-600">
                (Confiance: {confidence}%)
              </span>
            </div>
            
            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Texte extrait:
                </span>
              </div>
              <div className="bg-white border rounded p-3 max-h-40 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm">
                  {extractedText}
                </pre>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleUseText} className="flex-1">
                Utiliser ce texte
              </Button>
              <Button onClick={handleNewScan} variant="outline">
                Nouveau scan
              </Button>
              {onClose && (
                <Button onClick={onClose} variant="ghost">
                  Fermer
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
