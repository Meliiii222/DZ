import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Download, CheckCircle } from 'lucide-react';

interface ProcessingResult {
  text: string;
  confidence: number;
  processingTime: number;
  documentType: string;
}

const SimplifiedOCRComponent: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      await processFile(pdfFile);
    } else {
      setError('Veuillez déposer un fichier PDF');
    }
  }, []);

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      await processFile(file);
    } else {
      setError('Veuillez sélectionner un fichier PDF');
    }
  }, []);

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      // Simulation du traitement OCR
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Résultat simulé pour les documents juridiques algériens
      const mockResult: ProcessingResult = {
        text: `الجمهورية الجزائرية الديمقراطية الشعبية
République Algérienne Démocratique et Populaire

DÉCRET EXÉCUTIF N° 23-XXX
du 15 Rajab 1445 correspondant au 27 janvier 2024

Article 1er : Le présent décret a pour objet de définir les modalités d'application...

Article 2 : Au sens du présent décret, on entend par :
- Institution publique : tout organisme...
- Procédure administrative : l'ensemble des démarches...

Article 3 : Les dispositions du présent décret s'appliquent à...

Fait à Alger, le 15 Rajab 1445 correspondant au 27 janvier 2024.`,
        confidence: 94.5,
        processingTime: 2847,
        documentType: 'Décret Exécutif'
      };

      setResult(mockResult);
    } catch (err) {
      setError('Erreur lors du traitement du document. Version simplifiée en cours de développement.');
      console.error('OCR Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const exportResults = () => {
    if (!result) return;
    
    const data = {
      ...result,
      exportDate: new Date().toISOString(),
      filename: 'extraction_ocr_juridique.json'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extraction_ocr_juridique.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">
          🇩🇿 OCR Juridique Simplifié
        </h1>
        <p className="text-gray-600">
          Extraction et structuration des documents juridiques algériens (Version simplifiée)
        </p>
      </div>

      {/* Upload Zone */}
      <Card className={`p-8 border-2 border-dashed transition-colors ${
        isDragOver ? 'border-green-400 bg-green-50' : 'border-gray-300'
      }`}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="text-center space-y-4"
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div>
            <p className="text-lg font-medium text-gray-700">
              Déposez votre document PDF ici
            </p>
            <p className="text-sm text-gray-500">
              ou cliquez pour sélectionner un fichier
            </p>
          </div>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className="hidden"
            id="file-input"
          />
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <label htmlFor="file-input" className="cursor-pointer">
              <FileText className="mr-2 h-4 w-4" />
              Sélectionner un PDF
            </label>
          </Button>
        </div>
      </Card>

      {/* Processing */}
      {isProcessing && (
        <Card className="p-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <div className="text-center">
              <p className="font-medium">Traitement en cours...</p>
              <p className="text-sm text-gray-500">Extraction et analyse du document juridique</p>
            </div>
          </div>
        </Card>
      )}

      {/* Error */}
      {error && (
        <Card className="p-6 border-red-200 bg-red-50">
          <div className="flex items-center space-x-3">
            <div className="text-red-600">⚠️</div>
            <div>
              <p className="font-medium text-red-800">Erreur de traitement</p>
              <p className="text-sm text-red-600">{error}</p>
              <p className="text-xs text-red-500 mt-2">
                Note: Cette version simplifiée utilise des données simulées pour les tests.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      {result && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-green-700 flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Extraction Réussie
            </h3>
            <Button onClick={exportResults} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{result.confidence}%</p>
              <p className="text-sm text-gray-600">Confiance</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{result.processingTime}ms</p>
              <p className="text-sm text-gray-600">Temps de traitement</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-lg font-bold text-purple-600">{result.documentType}</p>
              <p className="text-sm text-gray-600">Type de document</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Texte extrait :</h4>
            <pre className="text-sm whitespace-pre-wrap text-gray-700 max-h-64 overflow-y-auto">
              {result.text}
            </pre>
          </div>

          <div className="flex justify-center">
            <Button className="bg-green-600 hover:bg-green-700">
              Envoyer vers le fil d'approbation
            </Button>
          </div>
        </Card>
      )}

      {/* Info */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="text-center text-sm text-blue-700">
          <p><strong>Version simplifiée</strong> - Utilise des données simulées pour éviter les erreurs de worker</p>
          <p>Les fonctionnalités complètes OCR + IA seront activées une fois la configuration optimisée</p>
        </div>
      </Card>
    </div>
  );
};

export default SimplifiedOCRComponent;