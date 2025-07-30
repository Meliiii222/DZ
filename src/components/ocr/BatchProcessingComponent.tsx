// @ts-nocheck
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/common/SectionHeader";
import { 
  Upload, 
  FileText, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Trash2,
  FolderOpen,
  Package
} from 'lucide-react';
import { processDocumentOCR } from '@/services/realOcrService';

interface BatchFile {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  result?: Record<string, unknown>;
  error?: string;
  startTime?: Date;
  endTime?: Date;
}

const BatchProcessingComponent: React.FC = () => {
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentProcessingIndex, setCurrentProcessingIndex] = useState(0);

  const handleFilesSelected = useCallback((selectedFiles: FileList) => {
    const newFiles: BatchFile[] = Array.from(selectedFiles)
      .filter(file => file.type === 'application/pdf')
      .map(file => ({
        id: `${Date.now()}-${Math.random()}`,
        file,
        status: 'pending' as const,
        progress: 0
      }));
    
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    handleFilesSelected(droppedFiles);
  }, [handleFilesSelected]);

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const clearAll = () => {
    setFiles([]);
    setCurrentProcessingIndex(0);
    setIsProcessing(false);
    setIsPaused(false);
  };

  const processNextFile = async (index: number): Promise<void> => {
    if (index >= files.length || isPaused) return;
    
    const file = files[index];
    if (file.status !== 'pending') {
      return processNextFile(index + 1);
    }

    // Mettre à jour le statut en cours de traitement
    setFiles(prev => prev.map((f, i) => 
      i === index 
        ? { ...f, status: 'processing' as const, startTime: new Date(), progress: 0 }
        : f
    ));

    try {
      // Simulation du progrès
      const progressInterval = setInterval(() => {
        setFiles(prev => prev.map((f, i) => 
          i === index && f.progress < 90
            ? { ...f, progress: f.progress + 10 }
            : f
        ));
      }, 200);

      // Traitement OCR réel
      const result = await processDocumentOCR(file.file);
      
      clearInterval(progressInterval);
      
      // Marquer comme terminé
      setFiles(prev => prev.map((f, i) => 
        i === index 
          ? { 
              ...f, 
              status: 'completed' as const, 
              progress: 100,
              result,
              endTime: new Date()
            }
          : f
      ));

      // Continuer avec le fichier suivant
      setTimeout(() => {
        if (!isPaused) {
          processNextFile(index + 1);
        }
      }, 500);

    } catch (error) {
      setFiles(prev => prev.map((f, i) => 
        i === index 
          ? { 
              ...f, 
              status: 'error' as const, 
              error: error.message,
              endTime: new Date()
            }
          : f
      ));
      
      // Continuer malgré l'erreur
      setTimeout(() => {
        if (!isPaused) {
          processNextFile(index + 1);
        }
      }, 500);
    }
  };

  const startBatchProcessing = async () => {
    setIsProcessing(true);
    setIsPaused(false);
    setCurrentProcessingIndex(0);
    
    // Réinitialiser les fichiers en erreur ou terminés si on recommence
    setFiles(prev => prev.map(f => 
      f.status === 'error' || f.status === 'completed'
        ? { ...f, status: 'pending' as const, progress: 0, error: undefined }
        : f
    ));

    await processNextFile(0);
    setIsProcessing(false);
  };

  const pauseProcessing = () => {
    setIsPaused(true);
  };

  const resumeProcessing = () => {
    setIsPaused(false);
    const nextIndex = files.findIndex(f => f.status === 'pending');
    if (nextIndex !== -1) {
      processNextFile(nextIndex);
    }
  };

  const exportResults = () => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.result);
    const exportData = {
      batchId: `batch_${Date.now()}`,
      processedAt: new Date().toISOString(),
      totalFiles: files.length,
      completedFiles: completedFiles.length,
      results: completedFiles.map(f => ({
        filename: f.file.name,
        processingTime: f.endTime && f.startTime 
          ? f.endTime.getTime() - f.startTime.getTime()
          : 0,
        result: f.result
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch_ocr_results_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-gray-500" />;
      case 'processing': return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const completedCount = files.filter(f => f.status === 'completed').length;
  const errorCount = files.filter(f => f.status === 'error').length;
  const overallProgress = files.length > 0 ? ((completedCount + errorCount) / files.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="📦 Traitement par Lot"
        description="Traitement automatique de multiples documents juridiques algériens"
        icon={Package}
        iconColor="text-green-600"
      />

      {/* Upload Zone */}
      <Card className="p-8 border-2 border-dashed border-gray-300">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="text-center space-y-4"
        >
          <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
          <div>
            <p className="text-lg font-medium text-gray-700">
              Déposez vos documents PDF ici
            </p>
            <p className="text-sm text-gray-500">
              ou sélectionnez plusieurs fichiers à traiter en lot
            </p>
          </div>
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={(e) => e.target.files && handleFilesSelected(e.target.files)}
            className="hidden"
            id="batch-file-input"
          />
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <label htmlFor="batch-file-input" className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              Sélectionner plusieurs PDF
            </label>
          </Button>
        </div>
      </Card>

      {files.length > 0 && (
        <>
          {/* Progress Overview */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Progression globale</h3>
                <span className="text-sm text-gray-600">
                  {completedCount + errorCount} / {files.length} fichiers traités
                </span>
              </div>
              <Progress value={overallProgress} className="w-full" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-700">{files.length}</p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-700">
                    {files.filter(f => f.status === 'processing').length}
                  </p>
                  <p className="text-sm text-blue-600">En cours</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-700">{completedCount}</p>
                  <p className="text-sm text-green-600">Terminés</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-700">{errorCount}</p>
                  <p className="text-sm text-red-600">Erreurs</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Controls */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {!isProcessing ? (
                <Button 
                  onClick={startBatchProcessing}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={files.length === 0}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Démarrer le traitement
                </Button>
              ) : isPaused ? (
                <Button 
                  onClick={resumeProcessing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Reprendre
                </Button>
              ) : (
                <Button 
                  onClick={pauseProcessing}
                  variant="outline"
                >
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </Button>
              )}
              
              <Button 
                onClick={clearAll}
                variant="outline"
                disabled={isProcessing && !isPaused}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Réinitialiser
              </Button>
              
              {completedCount > 0 && (
                <Button 
                  onClick={exportResults}
                  variant="outline"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exporter les résultats ({completedCount})
                </Button>
              )}
            </div>
          </Card>

          {/* Files List */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Fichiers en traitement</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {files.map((file, index) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1">
                    {getStatusIcon(file.status)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{file.file.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <span>{(file.file.size / 1024 / 1024).toFixed(1)} MB</span>
                        <Badge className={`${getStatusColor(file.status)} text-xs`}>
                          {file.status === 'pending' && 'En attente'}
                          {file.status === 'processing' && 'Traitement...'}
                          {file.status === 'completed' && 'Terminé'}
                          {file.status === 'error' && 'Erreur'}
                        </Badge>
                      </div>
                      {file.status === 'processing' && (
                        <Progress value={file.progress} className="w-full mt-1" />
                      )}
                      {file.status === 'error' && file.error && (
                        <p className="text-xs text-red-600 mt-1">{file.error}</p>
                      )}
                      {file.status === 'completed' && file.result && (
                        <p className="text-xs text-green-600 mt-1">
                          Confiance: {file.result.confidence.toFixed(1)}% • 
                          Type: {file.result.documentType}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => removeFile(file.id)}
                    variant="ghost"
                    size="sm"
                    disabled={file.status === 'processing'}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* Info */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="text-center text-sm text-blue-700">
          <p><strong>💡 Traitement par lot optimisé</strong></p>
          <p>Upload multiple • Traitement séquentiel • Export groupé • Gestion d'erreurs</p>
        </div>
      </Card>
    </div>
  );
};

export default BatchProcessingComponent;