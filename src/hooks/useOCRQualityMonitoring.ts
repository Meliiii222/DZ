/**
 * Hook pour le monitoring de la qualité OCR en temps réel
 * Surveille les métriques d'extraction et de mapping
 */

import { useState, useEffect, useCallback } from 'react';

export interface OCRQualityMetrics {
  extractionConfidence: number;
  mappingConfidence: number;
  processingTime: number;
  documentsProcessed: number;
  successRate: number;
  errorRate: number;
  averageConfidence: number;
  trendsData: TrendData[];
  alerts: QualityAlert[];
}

export interface TrendData {
  timestamp: string;
  confidence: number;
  processingTime: number;
  documentType: string;
}

export interface QualityAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
  documentId?: string;
  confidence?: number;
}

export interface QualityThresholds {
  minExtractionConfidence: number;
  minMappingConfidence: number;
  maxProcessingTime: number;
  minSuccessRate: number;
}

export function useOCRQualityMonitoring() {
  const [metrics, setMetrics] = useState<OCRQualityMetrics>({
    extractionConfidence: 0,
    mappingConfidence: 0,
    processingTime: 0,
    documentsProcessed: 0,
    successRate: 0,
    errorRate: 0,
    averageConfidence: 0,
    trendsData: [],
    alerts: []
  });

  const [thresholds] = useState<QualityThresholds>({
    minExtractionConfidence: 85,
    minMappingConfidence: 80,
    maxProcessingTime: 10000, // 10 seconds
    minSuccessRate: 90
  });

  const [isMonitoring, setIsMonitoring] = useState(false);

  // Initialiser avec des données d'exemple
  useEffect(() => {
    initializeMetrics();
  }, []);

  // Monitoring en temps réel
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      updateMetrics();
    }, 5000); // Mise à jour toutes les 5 secondes

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const initializeMetrics = () => {
    const now = new Date();
    const mockTrendsData: TrendData[] = [];
    const mockAlerts: QualityAlert[] = [];

    // Générer des données de tendance pour les dernières heures
    for (let i = 24; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000).toISOString();
      mockTrendsData.push({
        timestamp,
        confidence: 85 + Math.random() * 15, // 85-100%
        processingTime: 2000 + Math.random() * 3000, // 2-5 seconds
        documentType: ['décret', 'arrêté', 'loi', 'ordonnance'][Math.floor(Math.random() * 4)]
      });
    }

    // Générer quelques alertes d'exemple
    mockAlerts.push({
      id: 'alert_1',
      type: 'warning',
      message: 'Confiance d\'extraction faible détectée (78%)',
      timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
      documentId: 'doc_123',
      confidence: 78
    });

    mockAlerts.push({
      id: 'alert_2',
      type: 'info',
      message: 'Pic de performance détecté - traitement optimisé',
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString()
    });

    setMetrics({
      extractionConfidence: 92.5,
      mappingConfidence: 88.3,
      processingTime: 3200,
      documentsProcessed: 247,
      successRate: 94.7,
      errorRate: 5.3,
      averageConfidence: 90.4,
      trendsData: mockTrendsData,
      alerts: mockAlerts
    });
  };

  const updateMetrics = () => {
    setMetrics(prev => {
      const newExtraction = Math.max(70, prev.extractionConfidence + (Math.random() - 0.5) * 5);
      const newMapping = Math.max(65, prev.mappingConfidence + (Math.random() - 0.5) * 4);
      const newProcessingTime = Math.max(1000, prev.processingTime + (Math.random() - 0.5) * 1000);

      // Ajouter nouveau point de tendance
      const newTrendPoint: TrendData = {
        timestamp: new Date().toISOString(),
        confidence: (newExtraction + newMapping) / 2,
        processingTime: newProcessingTime,
        documentType: ['décret', 'arrêté', 'loi', 'ordonnance'][Math.floor(Math.random() * 4)]
      };

      const updatedTrends = [...prev.trendsData.slice(-23), newTrendPoint];

      // Générer des alertes si nécessaire
      const newAlerts = [...prev.alerts];
      if (newExtraction < thresholds.minExtractionConfidence) {
        newAlerts.push({
          id: `alert_${Date.now()}`,
          type: 'warning',
          message: `Confiance d'extraction faible: ${newExtraction.toFixed(1)}%`,
          timestamp: new Date().toISOString(),
          confidence: newExtraction
        });
      }

      if (newProcessingTime > thresholds.maxProcessingTime) {
        newAlerts.push({
          id: `alert_${Date.now()}_time`,
          type: 'error',
          message: `Temps de traitement élevé: ${(newProcessingTime / 1000).toFixed(1)}s`,
          timestamp: new Date().toISOString()
        });
      }

      // Garder seulement les 10 dernières alertes
      const recentAlerts = newAlerts.slice(-10);

      return {
        ...prev,
        extractionConfidence: newExtraction,
        mappingConfidence: newMapping,
        processingTime: newProcessingTime,
        averageConfidence: (newExtraction + newMapping) / 2,
        trendsData: updatedTrends,
        alerts: recentAlerts
      };
    });
  };

  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    console.log('📊 OCR Quality Monitoring started');
  }, []);

  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
    console.log('📊 OCR Quality Monitoring stopped');
  }, []);

  const addManualMetric = useCallback((documentMetrics: {
    extractionConfidence: number;
    mappingConfidence: number;
    processingTime: number;
    documentType: string;
    success: boolean;
  }) => {
    console.log('📈 Adding manual OCR metric:', documentMetrics);
    
    setMetrics(prev => {
      const newTrendPoint: TrendData = {
        timestamp: new Date().toISOString(),
        confidence: (documentMetrics.extractionConfidence + documentMetrics.mappingConfidence) / 2,
        processingTime: documentMetrics.processingTime,
        documentType: documentMetrics.documentType
      };

      const updatedTrends = [...prev.trendsData.slice(-23), newTrendPoint];
      const newDocumentsProcessed = prev.documentsProcessed + 1;
      const newSuccessCount = documentMetrics.success ? 1 : 0;
      const newSuccessRate = ((prev.successRate * prev.documentsProcessed / 100 + newSuccessCount) / newDocumentsProcessed) * 100;

      // Vérifier les seuils et générer des alertes
      const newAlerts = [...prev.alerts];
      
      if (documentMetrics.extractionConfidence < thresholds.minExtractionConfidence) {
        newAlerts.push({
          id: `alert_${Date.now()}_extraction`,
          type: 'warning',
          message: `Extraction ${documentMetrics.documentType}: confiance faible (${documentMetrics.extractionConfidence.toFixed(1)}%)`,
          timestamp: new Date().toISOString(),
          confidence: documentMetrics.extractionConfidence
        });
      }

      if (documentMetrics.mappingConfidence < thresholds.minMappingConfidence) {
        newAlerts.push({
          id: `alert_${Date.now()}_mapping`,
          type: 'warning',
          message: `Mapping ${documentMetrics.documentType}: confiance faible (${documentMetrics.mappingConfidence.toFixed(1)}%)`,
          timestamp: new Date().toISOString(),
          confidence: documentMetrics.mappingConfidence
        });
      }

      if (documentMetrics.processingTime > thresholds.maxProcessingTime) {
        newAlerts.push({
          id: `alert_${Date.now()}_time`,
          type: 'error',
          message: `Traitement ${documentMetrics.documentType}: temps élevé (${(documentMetrics.processingTime / 1000).toFixed(1)}s)`,
          timestamp: new Date().toISOString()
        });
      }

      return {
        extractionConfidence: documentMetrics.extractionConfidence,
        mappingConfidence: documentMetrics.mappingConfidence,
        processingTime: documentMetrics.processingTime,
        documentsProcessed: newDocumentsProcessed,
        successRate: newSuccessRate,
        errorRate: 100 - newSuccessRate,
        averageConfidence: (documentMetrics.extractionConfidence + documentMetrics.mappingConfidence) / 2,
        trendsData: updatedTrends,
        alerts: newAlerts.slice(-10)
      };
    });
  }, [thresholds]);

  const clearAlerts = useCallback(() => {
    setMetrics(prev => ({
      ...prev,
      alerts: []
    }));
  }, []);

  const getQualityStatus = useCallback((): 'excellent' | 'good' | 'warning' | 'critical' => {
    if (metrics.averageConfidence >= 95 && metrics.successRate >= 98) {
      return 'excellent';
    } else if (metrics.averageConfidence >= 85 && metrics.successRate >= 90) {
      return 'good';
    } else if (metrics.averageConfidence >= 75 && metrics.successRate >= 80) {
      return 'warning';
    } else {
      return 'critical';
    }
  }, [metrics]);

  const getRecommendations = useCallback((): string[] => {
    const recommendations: string[] = [];
    
    if (metrics.extractionConfidence < thresholds.minExtractionConfidence) {
      recommendations.push('Améliorer la qualité des images d\'entrée pour l\'OCR');
      recommendations.push('Calibrer les paramètres de détection de lignes');
    }
    
    if (metrics.mappingConfidence < thresholds.minMappingConfidence) {
      recommendations.push('Réviser les règles de mapping pour ce type de document');
      recommendations.push('Ajouter plus de patterns regex spécifiques');
    }
    
    if (metrics.processingTime > thresholds.maxProcessingTime) {
      recommendations.push('Optimiser les algorithmes de traitement d\'images');
      recommendations.push('Réduire la résolution des images si possible');
    }
    
    if (metrics.successRate < thresholds.minSuccessRate) {
      recommendations.push('Analyser les causes d\'échec les plus fréquentes');
      recommendations.push('Améliorer la validation des données extraites');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Système OCR fonctionne de manière optimale');
      recommendations.push('Continuer la surveillance des métriques');
    }
    
    return recommendations;
  }, [metrics, thresholds]);

  const exportMetrics = useCallback(() => {
    const exportData = {
      timestamp: new Date().toISOString(),
      metrics,
      thresholds,
      recommendations: getRecommendations(),
      qualityStatus: getQualityStatus()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ocr-quality-metrics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [metrics, thresholds, getRecommendations, getQualityStatus]);

  return {
    metrics,
    thresholds,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    addManualMetric,
    clearAlerts,
    getQualityStatus,
    getRecommendations,
    exportMetrics
  };
}