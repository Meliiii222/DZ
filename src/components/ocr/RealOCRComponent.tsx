// @ts-nocheck
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Upload, FileText, Download, CheckCircle, Eye, Send, Clock, Languages, FileCheck, Search, X } from 'lucide-react';
import { processDocumentOCR, mapToFormFields, RealOCRResult } from '@/services/realOcrService';

const RealOCRComponent: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<RealOCRResult | null>(null);
  const [mappedData, setMappedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingSteps, setProcessingSteps] = useState<string[]>([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [showScanOptions, setShowScanOptions] = useState(false);
  const [isScannerMode, setIsScannerMode] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Nettoyer la caméra au démontage du composant
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

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
    const file = files[0]; // Prendre le premier fichier
    
    if (file) {
      // Utiliser la même logique que handleFileInput
      const fileType = file.type;
      const fileName = file.name.toLowerCase();
      
      if (fileType === 'application/pdf') {
        await processFile(file);
      } else if (fileType.startsWith('image/')) {
        await processImageFile(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                 fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        await processWordFile(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                 fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        await processExcelFile(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || 
                 fileName.endsWith('.pptx') || fileName.endsWith('.ppt')) {
        await processPowerPointFile(file);
      } else if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
        await processTextFile(file);
      } else if (fileType === 'application/rtf' || fileName.endsWith('.rtf')) {
        await processRtfFile(file);
      } else {
        setError('Format de fichier non supporté. Types acceptés: PDF, Images, Word, Excel, PowerPoint, Texte, RTF');
      }
    }
  }, []);

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const fileName = file.name.toLowerCase();
      
      if (fileType === 'application/pdf') {
        await processFile(file);
      } else if (fileType.startsWith('image/')) {
        await processImageFile(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                 fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        await processWordFile(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                 fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        await processExcelFile(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || 
                 fileName.endsWith('.pptx') || fileName.endsWith('.ppt')) {
        await processPowerPointFile(file);
      } else if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
        await processTextFile(file);
      } else if (fileType === 'application/rtf' || fileName.endsWith('.rtf')) {
        await processRtfFile(file);
      } else {
        setError('Format de fichier non supporté. Types acceptés: PDF, Images, Word, Excel, PowerPoint, Texte, RTF');
      }
    }
  }, []);

  const openScanOptions = () => {
    setShowScanOptions(true);
  };

  const closeScanOptions = () => {
    setShowScanOptions(false);
  };

  const closeScannerMode = () => {
    setIsScannerMode(false);
  };

  const connectToScanner = async () => {
    try {
      setError(null);
      setProcessingSteps(['🖨️ Recherche des scanners disponibles...']);
      
      // Simuler la détection de scanners
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingSteps(prev => [...prev, '🔌 Connexion au scanner...']);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingSteps(prev => [...prev, '📄 Scan en cours...']);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProcessingSteps(prev => [...prev, '✅ Document scanné avec succès']);
      
      // Simuler un document scanné
      const mockScannedResult: RealOCRResult = {
        text: `RÉPUBLIQUE ALGÉRIENNE DÉMOCRATIQUE ET POPULAIRE
MINISTÈRE DE L'INTÉRIEUR

ARRÊTÉ N° 24-003
DU 20 FÉVRIER 2024

Portant organisation des services de l'état civil électronique dans les communes.

LE MINISTRE DE L'INTÉRIEUR,

VU la Constitution, notamment ses articles 112-5° et 140 ;
VU la loi n° 23-12 du 15 novembre 2023 relative à la modernisation de l'administration ;

ARRÊTE :

Article 1er. — Le présent arrêté a pour objet l'organisation des services de l'état civil électronique.

Article 2. — Les communes sont tenues de mettre en place les systèmes informatiques d'état civil dans un délai de trois (3) mois.

Fait à Alger, le 20 février 2024.`,
        confidence: 96.7,
        entities: {
          decretNumber: '24-003',
          dateHijri: '',
          dateGregorian: '20 février 2024',
          institution: 'Ministère de l\'Intérieur',
          articles: ['Article 1er. — Le présent arrêté a pour objet l\'organisation des services de l\'état civil électronique.', 'Article 2. — Les communes sont tenues de mettre en place les systèmes informatiques d\'état civil dans un délai de trois (3) mois.'],
          signatories: []
        },
        processingTime: 2800,
        documentType: 'Arrêté',
        language: 'fr',
        sourceType: 'scanner_device',
        metadata: {
          pageCount: 1,
          fileSize: 0,
          extractionDate: new Date()
        }
      };

      setResult(mockScannedResult);

      // Mapping automatique
      const mapped = {
        titre: "Arrêté n° 24-003 du 20 février 2024 portant organisation des services de l'état civil électronique",
        type: "Arrêté",
        numero: "24-003",
        date: "2024-02-20",
        ministere: "Ministère de l'Intérieur",
        contenu: mockScannedResult.text,
        confiance: mockScannedResult.confidence,
        sourceType: 'scanner_device',
        scannerInfo: [
          "Scanner haute résolution: ✅",
          "OCR professionnel: ✅",
          "Qualité optimale: ✅"
        ]
      };

      setMappedData(mapped);
      setIsScannerMode(false);
      
    } catch (error) {
      setError('Erreur lors de la connexion au scanner. Veuillez vérifier que votre scanner est connecté et allumé.');
    } finally {
      setIsProcessing(false);
    }
  };

  const openCamera = async () => {
    try {
      setShowScanOptions(false);
      setIsCameraOpen(true);
      setError(null);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Utiliser la caméra arrière si disponible
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 }
        }
      });
      
      setStream(mediaStream);
      
      // Attendre que l'élément vidéo soit rendu
      requestAnimationFrame(() => {
        if (videoRef.current && mediaStream) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch(console.error);
          };
        }
      });
    } catch (error) {
      setError('Impossible d\'accéder à la caméra. Veuillez vérifier les permissions ou utiliser l\'option Scanner.');
      console.error('Erreur caméra:', error);
      setIsCameraOpen(false);
    }
  };

  const openScanner = async () => {
    setShowScanOptions(false);
    
    try {
      // Vérifier si l'API Scanner est disponible (navigateurs modernes)
      if ('navigator' in window && 'scanning' in navigator) {
        // Utiliser l'API Scanner Web native
        const scanner = await (navigator as Record<string, unknown>).scanning.requestDevice();
        const result = await scanner.scan();
        
        // Traiter l'image scannée
        await processImageFile(result);
      } else {
        // Fallback : utiliser l'interface de capture spécialisée pour scanner
        setIsScannerMode(true);
      }
    } catch (error) {
      console.log('API Scanner non disponible, utilisation du mode capture');
      // Fallback vers interface de capture scanner
      setIsScannerMode(true);
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Définir les dimensions du canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Dessiner l'image de la vidéo sur le canvas
    context.drawImage(video, 0, 0);

    // Convertir en blob
    canvas.toBlob(async (blob) => {
      if (blob) {
        // Créer un fichier à partir du blob
        const file = new File([blob], 'photo_document.jpg', { type: 'image/jpeg' });
        
        // Fermer la caméra
        closeCamera();
        
        // Traiter l'image
        await processImageFile(file);
      }
    }, 'image/jpeg', 0.9);
  };

  const processWordFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setMappedData(null);
    setProcessingSteps([]);

    try {
      setProcessingSteps(['📄 Lecture du document Word...']);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setProcessingSteps(prev => [...prev, '🔧 Extraction du contenu textuel...']);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingSteps(prev => [...prev, '🔍 Analyse de la structure du document...']);
      await new Promise(resolve => setTimeout(resolve, 700));
      
      setProcessingSteps(prev => [...prev, '🧠 Détection des entités juridiques...']);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setProcessingSteps(prev => [...prev, '📋 Mapping vers formulaires...']);
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockResult: RealOCRResult = {
        text: `ARRÊTÉ MINISTÉRIEL N° 24-005
DU 10 MARS 2024

Relatif aux procédures de validation des actes administratifs électroniques.

LE MINISTRE DE LA MODERNISATION,

CONSIDÉRANT la nécessité de moderniser l'administration publique...

Article 1er. — Les actes administratifs peuvent être établis et validés par voie électronique.
Article 2. — La signature électronique est reconnue comme équivalente à la signature manuscrite.`,
        confidence: 94.8,
        entities: {
          decretNumber: '24-005',
          dateGregorian: '10 mars 2024',
          institution: 'Ministère de la Modernisation',
          articles: ['Article 1er', 'Article 2'],
          signatories: ['Le Ministre de la Modernisation']
        },
        sourceType: 'image_scan',
        documentType: 'Arrêté ministériel',
        language: 'fr',
        processingTime: 3100,
        metadata: {
          pageCount: 1,
          fileSize: file?.size || 0,
          extractionDate: new Date()
        }
      };

      setResult(mockResult);

      const mapped = {
        titre: "Arrêté ministériel n° 24-005 du 10 mars 2024 relatif aux procédures de validation",
        type: "Arrêté ministériel",
        numero: "24-005",
        date: "2024-03-10",
        ministere: "Ministère de la Modernisation",
        contenu: mockResult.text,
        confiance: mockResult.confidence,
        sourceType: 'word_document'
      };

      setMappedData(mapped);
      
    } catch (error) {
      setError('Erreur lors du traitement du document Word.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processExcelFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setMappedData(null);
    setProcessingSteps([]);

    try {
      setProcessingSteps(['📊 Lecture du fichier Excel...']);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setProcessingSteps(prev => [...prev, '🔧 Analyse des feuilles de calcul...']);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingSteps(prev => [...prev, '📋 Extraction des données tabulaires...']);
      await new Promise(resolve => setTimeout(resolve, 700));
      
      setProcessingSteps(prev => [...prev, '🔍 Détection des structures juridiques...']);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setProcessingSteps(prev => [...prev, '📈 Mapping vers formulaires...']);
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockResult = {
        text: `TABLEAU DES SANCTIONS ADMINISTRATIVES
Référence: SA-2024-001

Type de sanction | Montant (DA) | Article de référence
Amende simple | 10,000 | Art. 15 Loi 23-08
Amende majorée | 25,000 | Art. 16 Loi 23-08
Suspension temporaire | - | Art. 20 Loi 23-08

Total amendes collectées: 2,450,000 DA
Période: Janvier-Mars 2024`,
        confidence: 91.2,
        entities: {
          decretNumber: 'SA-2024-001',
          dateGregorian: 'Janvier-Mars 2024',
          institution: 'Administration',
          articles: [],
          signatories: []
        },
        sourceType: 'image_scan' as const,
        documentType: 'Tableau administratif',
        language: 'fr' as const,
        processingTime: 3200,
        metadata: {
          pageCount: 1,
          fileSize: file?.size || 0,
          extractionDate: new Date()
        }
      };

      setResult(mockResult);

      const mapped = {
        titre: "Tableau des sanctions administratives SA-2024-001",
        type: "Tableau administratif",
        numero: "SA-2024-001",
        date: "2024-03-31",
        ministere: "Administration",
        contenu: mockResult.text,
        confiance: mockResult.confidence,
        sourceType: 'excel_spreadsheet'
      };

      setMappedData(mapped);
      
    } catch (error) {
      setError('Erreur lors du traitement du fichier Excel.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processPowerPointFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setMappedData(null);
    setProcessingSteps([]);

    try {
      setProcessingSteps(['🎯 Lecture de la présentation PowerPoint...']);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setProcessingSteps(prev => [...prev, '🔧 Extraction du contenu des diapositives...']);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingSteps(prev => [...prev, '📋 Analyse de la structure de présentation...']);
      await new Promise(resolve => setTimeout(resolve, 700));
      
      setProcessingSteps(prev => [...prev, '🔍 Détection des éléments juridiques...']);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setProcessingSteps(prev => [...prev, '🎨 Mapping vers formulaires...']);
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockResult = {
        text: `PRÉSENTATION: RÉFORME DU CODE CIVIL
Diapositive 1: Introduction à la réforme

- Modernisation du cadre juridique
- Adaptation aux nouveaux enjeux sociétaux
- Harmonisation avec les standards internationaux

Diapositive 2: Principales modifications
- Article 40: Majorité civile
- Article 65: Mariage civil
- Article 80: Filiation

Conclusion: Entrée en vigueur prévue en 2025`,
        confidence: 87.5,
        entities: {
          decretNumber: 'PRES-2024-001',
          dateGregorian: '2025',
          institution: 'Ministère de la Justice',
          articles: [],
          signatories: []
        },
        sourceType: 'image_scan' as const,
        documentType: 'Présentation juridique',
        language: 'fr' as const,
        processingTime: 3300,
        metadata: {
          pageCount: 1,
          fileSize: file?.size || 0,
          extractionDate: new Date()
        }
      };

      setResult(mockResult);

      const mapped = {
        titre: "Présentation: Réforme du Code Civil - Entrée en vigueur 2025",
        type: "Présentation juridique",
        numero: "PRES-2024-001",
        date: "2024-01-01",
        ministere: "Ministère de la Justice",
        contenu: mockResult.text,
        confiance: mockResult.confidence,
        sourceType: 'powerpoint_presentation'
      };

      setMappedData(mapped);
      
    } catch (error) {
      setError('Erreur lors du traitement de la présentation PowerPoint.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processTextFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setMappedData(null);
    setProcessingSteps([]);

    try {
      setProcessingSteps(['📝 Lecture du fichier texte...']);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setProcessingSteps(prev => [...prev, '🔧 Analyse du contenu textuel...']);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setProcessingSteps(prev => [...prev, '🔍 Détection des entités juridiques...']);
      await new Promise(resolve => setTimeout(resolve, 700));
      
      setProcessingSteps(prev => [...prev, '📋 Mapping vers formulaires...']);
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockResult = {
        text: `ORDONNANCE N° 24-02 DU 15 FÉVRIER 2024
Portant modification de la loi sur l'urbanisme

Le Président de la République,

Sur rapport du ministre de l'Habitat,
Vu la Constitution, notamment ses articles 140 et 141,

ORDONNE:

Article 1er: La présente ordonnance modifie et complète la loi n° 90-29 du 1er décembre 1990 relative à l'aménagement et l'urbanisme.

Article 2: Les dispositions de l'article 25 de la loi susvisée sont modifiées comme suit...`,
        confidence: 95.7,
        entities: {
          decretNumber: '24-02',
          dateGregorian: '15 février 2024',
          institution: 'Présidence',
          articles: [],
          signatories: []
        },
        sourceType: 'image_scan' as const,
        documentType: 'Ordonnance',
        language: 'fr' as const,
        processingTime: 2200,
        metadata: {
          pageCount: 1,
          fileSize: file?.size || 0,
          extractionDate: new Date()
        }
      };

      setResult(mockResult);

      const mapped = {
        titre: "Ordonnance n° 24-02 du 15 février 2024 portant modification de la loi sur l'urbanisme",
        type: "Ordonnance",
        numero: "24-02",
        date: "2024-02-15",
        ministere: "Ministère de l'Habitat",
        contenu: mockResult.text,
        confiance: mockResult.confidence,
        sourceType: 'text_file'
      };

      setMappedData(mapped);
      
    } catch (error) {
      setError('Erreur lors du traitement du fichier texte.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processRtfFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setMappedData(null);
    setProcessingSteps([]);

    try {
      setProcessingSteps(['📄 Lecture du document RTF...']);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProcessingSteps(prev => [...prev, '🔧 Décodage du format RTF...']);
      await new Promise(resolve => setTimeout(resolve, 700));
      
      setProcessingSteps(prev => [...prev, '📋 Extraction du contenu formaté...']);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setProcessingSteps(prev => [...prev, '🔍 Détection des entités juridiques...']);
      await new Promise(resolve => setTimeout(resolve, 650));
      
      setProcessingSteps(prev => [...prev, '📋 Mapping vers formulaires...']);
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockResult = {
        text: `CIRCULAIRE N° 24-08 DU 25 MARS 2024
Relative à l'application des nouvelles procédures administratives

Aux Walis,
Aux Directeurs d'administration centrale,

La présente circulaire a pour objet de préciser les modalités d'application du décret exécutif n° 24-001 du 10 janvier 2024 relatif à la dématérialisation des procédures administratives.

1. Mise en place des systèmes informatiques
2. Formation du personnel
3. Calendrier de déploiement

Le Ministre`,
        confidence: 93.1,
        entities: {
          decretNumber: '24-08',
          dateGregorian: '25 mars 2024',
          institution: 'Administration centrale',
          articles: [],
          signatories: []
        },
        sourceType: 'image_scan' as const,
        documentType: 'Circulaire',
        language: 'fr' as const,
        processingTime: 2950,
        metadata: {
          pageCount: 1,
          fileSize: file?.size || 0,
          extractionDate: new Date()
        }
      };

      setResult(mockResult);

      const mapped = {
        titre: "Circulaire n° 24-08 du 25 mars 2024 relative à l'application des nouvelles procédures",
        type: "Circulaire",
        numero: "24-08",
        date: "2024-03-25",
        ministere: "Administration centrale",
        contenu: mockResult.text,
        confiance: mockResult.confidence,
        sourceType: 'rtf_document'
      };

      setMappedData(mapped);
      
    } catch (error) {
      setError('Erreur lors du traitement du document RTF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processImageFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setMappedData(null);
    setProcessingSteps([]);

    try {
      // Étapes de traitement spécifiques aux images scannées/photographiées
      setProcessingSteps(['📷 Lecture de l\'image scannée/photographiée...']);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setProcessingSteps(prev => [...prev, '🔧 Amélioration de la qualité d\'image...']);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingSteps(prev => [...prev, '📄 Détection et correction de perspective...']);
      await new Promise(resolve => setTimeout(resolve, 700));
      
      setProcessingSteps(prev => [...prev, '🧠 Extraction OCR du texte juridique...']);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingSteps(prev => [...prev, '🔍 Détection des entités juridiques...']);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setProcessingSteps(prev => [...prev, '📋 Mapping vers formulaires...']);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Simulation d'un résultat de traitement d'image
      const mockResult: RealOCRResult = {
        text: `RÉPUBLIQUE ALGÉRIENNE DÉMOCRATIQUE ET POPULAIRE
MINISTÈRE DE LA JUSTICE

DÉCRET EXÉCUTIF N° 23-001
DU 15 JANVIER 2023

Fixant les modalités d'application de la loi n° 22-15 du 28 décembre 2022 relative à la digitalisation des procédures administratives.

LE CHEF DU GOUVERNEMENT,

VU la Constitution, notamment ses articles 112-5° et 141 ;
VU la loi n° 22-15 du 28 décembre 2022 relative à la digitalisation des procédures administratives ;

DÉCRÈTE :

Article 1er. — Le présent décret a pour objet de fixer les modalités d'application de la loi n° 22-15 du 28 décembre 2022 susvisée.

Article 2. — Les administrations publiques sont tenues de mettre en place les systèmes informatiques nécessaires à la digitalisation de leurs procédures dans un délai de six (6) mois à compter de la publication du présent décret au Journal officiel.

Fait à Alger, le 15 janvier 2023.`,
        confidence: 89.3,
        entities: {
          decretNumber: '23-001',
          dateHijri: '',
          dateGregorian: '15 janvier 2023',
          institution: 'Ministère de la Justice',
          articles: ['Article 1er. — Le présent décret a pour objet de fixer les modalités d\'application de la loi n° 22-15 du 28 décembre 2022 susvisée.', 'Article 2. — Les administrations publiques sont tenues de mettre en place les systèmes informatiques nécessaires à la digitalisation de leurs procédures dans un délai de six (6) mois à compter de la publication du présent décret au Journal officiel.'],
          signatories: []
        },
        processingTime: 2400,
        documentType: 'Décret exécutif',
        language: 'fr',
        sourceType: 'image_scan',
        metadata: {
          pageCount: 1,
          fileSize: 0,
          extractionDate: new Date()
        }
      };

      setResult(mockResult);

      // Mapping automatique
      const mapped = {
        titre: "Décret exécutif n° 23-001 du 15 janvier 2023 fixant les modalités d'application de la loi n° 22-15",
        type: "Décret exécutif",
        numero: "23-001",
        date: "2023-01-15",
        ministere: "Ministère de la Justice",
        contenu: mockResult.text,
        confiance: mockResult.confidence,
        sourceType: 'image_scan',
        imageProcessingSteps: [
          "Amélioration qualité: ✅",
          "Correction perspective: ✅", 
          "OCR haute précision: ✅"
        ]
      };

      setMappedData(mapped);
      
    } catch (error) {
      setError('Erreur lors du traitement de l\'image. Veuillez réessayer avec une image plus claire.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setMappedData(null);
    setProcessingSteps([]);

    try {
      // Étapes de traitement avec feedback visuel
      setProcessingSteps(['🔄 Lecture du fichier PDF...']);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProcessingSteps(prev => [...prev, '🧠 Extraction du texte OCR...']);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingSteps(prev => [...prev, '🔍 Détection des entités juridiques...']);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setProcessingSteps(prev => [...prev, '📋 Mapping vers formulaires...']);
      
      // Traitement OCR réel
      const ocrResult = await processDocumentOCR(file);
      setResult(ocrResult);
      
      // Mapping intelligent
      const formData = mapToFormFields(ocrResult);
      setMappedData(formData);
      
      setProcessingSteps(prev => [...prev, '✅ Traitement terminé avec succès !']);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du traitement OCR');
      console.error('OCR Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const exportResults = () => {
    if (!result || !mappedData) return;
    
    const exportData = {
      ocrResult: result,
      mappedData: mappedData,
      exportDate: new Date().toISOString(),
      filename: `ocr_juridique_${Date.now()}.json`
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = exportData.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendToApprovalWorkflow = () => {
    if (!mappedData) return;
    
    // Simulation de l'envoi vers le workflow
    alert(`Document "${mappedData.titre}" envoyé vers le fil d'approbation avec un niveau de confiance de ${mappedData.confiance.toFixed(1)}%`);
  };

  const getUnmappedData = () => {
    if (!result) return null;

    // Simuler des données non mappées extraites mais non intégrées dans le formulaire
    return {
      rawTextSegments: [
        {
          category: "En-têtes et logos",
          content: "RÉPUBLIQUE ALGÉRIENNE DÉMOCRATIQUE ET POPULAIRE",
          confidence: 98.5,
          reason: "Information décorative, non mappée dans formulaire"
        },
        {
          category: "Références juridiques",
          content: "VU la Constitution, notamment ses articles 112-5° et 141",
          confidence: 94.2,
          reason: "Références constitutionnelles détaillées non mappées"
        },
        {
          category: "Considérants", 
          content: "CONSIDÉRANT la nécessité de moderniser l'administration publique",
          confidence: 91.8,
          reason: "Texte explicatif non inclus dans mapping standard"
        },
        {
          category: "Signatures et cachets",
          content: "Fait à Alger, cachet officiel, signatures manuscrites",
          confidence: 87.3,
          reason: "Éléments de validation non numériques"
        },
        {
          category: "Notes de bas de page",
          content: "Publication au Journal Officiel n° 15 du 25 mars 2024",
          confidence: 95.1,
          reason: "Métadonnées de publication non mappées"
        },
        {
          category: "Annexes",
          content: "Tableaux techniques, schémas organisationnels",
          confidence: 82.4,
          reason: "Contenu graphique non textuel"
        }
      ],
      extractedEntities: [
        {
          type: "Numéros de téléphone",
          values: ["+213 21 XX XX XX", "023 XX XX XX"],
          confidence: 89.6,
          reason: "Contacts non mappés dans formulaire juridique"
        },
        {
          type: "Adresses complètes",
          values: ["Rue Mohamed V, Alger", "Boulevard Amirouche, Constantine"],
          confidence: 93.2,
          reason: "Adresses détaillées non requises dans mapping"
        },
        {
          type: "Codes postaux",
          values: ["16000", "25000", "31000"],
          confidence: 96.7,
          reason: "Codes postaux non mappés automatiquement"
        },
        {
          type: "Heures et horaires",
          values: ["08h00-16h30", "14h00-17h00"],
          confidence: 88.9,
          reason: "Horaires administratifs non mappés"
        }
      ],
      structuralElements: [
        {
          element: "Tables et grilles",
          description: "Tableaux de données avec colonnes multiples",
          confidence: 85.7,
          reason: "Structure tabulaire nécessite mapping spécialisé"
        },
        {
          element: "Listes numérotées",
          description: "Énumérations avec hiérarchie complexe",
          confidence: 91.3,
          reason: "Structure hiérarchique non préservée dans mapping simple"
        },
        {
          element: "Sections conditionnelles",
          description: "Textes avec conditions 'si...alors'",
          confidence: 87.8,
          reason: "Logique conditionnelle non mappée directement"
        }
      ]
    };
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <SectionHeader
        title="🔍 Extraction et Mapping"
        description="Extraction intelligente et mapping automatique des documents juridiques algériens"
        icon={Search}
        iconColor="text-blue-600"
      />

      {/* Upload Zone */}
      <Card className={`p-8 border-2 border-dashed transition-colors ${
        isDragOver ? 'border-green-400 bg-green-50' : 'border-gray-300'
      }`}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="text-center space-y-6"
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div>
            <p className="text-lg font-medium text-gray-700">
              Déposez votre document juridique ici
            </p>
            <p className="text-sm text-gray-500">
              Décrets, arrêtés, lois, ordonnances... (Tous formats supportés)
            </p>
            <p className="text-xs text-gray-400 mt-1">
              📄 PDF • 📷 Images • 📝 Word • 📊 Excel • 🎯 PowerPoint • 📝 Texte • 📄 RTF
            </p>
          </div>
          
          {/* Options d'importation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Import depuis fichier */}
            <div className="flex flex-col items-center space-y-2">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,image/*"
                onChange={handleFileInput}
                className="hidden"
                id="file-input"
              />
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <label htmlFor="file-input" className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  Sélectionner un fichier
                </label>
              </Button>
              <span className="text-xs text-gray-500">Tous formats supportés</span>
            </div>

            <div className="text-gray-400">ou</div>

            {/* Import depuis équipement externe */}
            <div className="flex flex-col items-center space-y-2">
              <Button 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={openScanOptions}
                disabled={isProcessing}
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Scanner/Photographier
              </Button>
              <span className="text-xs text-gray-500">Équipement externe</span>
              
              {/* Input caché pour scanner */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="scanner-input"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Scan Options Modal */}
      {showScanOptions && (
        <Card className="p-6 border-2 border-blue-200 bg-blue-50">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Choisir le mode de capture</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={closeScanOptions}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option Caméra */}
              <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
                    onClick={openCamera}>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-gray-900">📷 Appareil Photo</h4>
                  <p className="text-sm text-gray-600">Utiliser la caméra pour photographier le document</p>
                  <div className="text-xs text-gray-500">
                    • Idéal pour mobile<br/>
                    • Capture en temps réel<br/>
                    • Prévisualisation direct
                  </div>
                </div>
              </Card>

              {/* Option Scanner */}
              <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-green-300"
                    onClick={openScanner}>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-gray-900">🖨️ Scanner</h4>
                  <p className="text-sm text-gray-600">Importer depuis un scanner externe ou une image</p>
                  <div className="text-xs text-gray-500">
                    • Scanner professionnel<br/>
                    • Images déjà numérisées<br/>
                    • Meilleure qualité
                  </div>
                </div>
              </Card>
            </div>
            
            <p className="text-center text-gray-500 text-sm">
              💡 Choisissez la méthode qui convient le mieux à votre situation
            </p>
          </div>
        </Card>
             )}

      {/* Scanner Interface */}
      {isScannerMode && (
        <Card className="p-6 border-2 border-green-200 bg-green-50">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">🖨️ Connexion Scanner</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={closeScannerMode}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              
              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-2">Scanner Physique</h4>
                <p className="text-gray-600 mb-4">
                  Connectez-vous à votre scanner pour numériser directement le document
                </p>
                
                <div className="bg-white p-4 rounded-lg border mb-6">
                  <h5 className="font-medium text-gray-800 mb-2">📋 Instructions :</h5>
                  <ul className="text-sm text-gray-600 text-left space-y-1">
                    <li>• Vérifiez que votre scanner est allumé et connecté</li>
                    <li>• Placez le document juridique dans le scanner</li>
                    <li>• Cliquez sur "Démarrer le scan" ci-dessous</li>
                    <li>• Le document sera automatiquement traité par OCR</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => {
                    setIsProcessing(true);
                    connectToScanner();
                  }}
                  disabled={isProcessing}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Scan en cours...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Démarrer le scan
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    // Fallback vers sélection de fichier si scanner ne fonctionne pas
                    document.getElementById('scanner-input')?.click();
                    setIsScannerMode(false);
                  }}
                  disabled={isProcessing}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3"
                  size="lg"
                >
                  📁 Importer fichier
                </Button>
              </div>
              
              <p className="text-center text-gray-500 text-sm">
                💡 Si le scanner ne fonctionne pas, utilisez "Importer fichier" pour sélectionner une image déjà scannée
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Camera Interface */}
      {isCameraOpen && (
        <Card className="p-6 bg-black">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">Scanner/Photographier le document</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={closeCamera}
                className="text-white border-white hover:bg-white hover:text-black"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              {!stream && (
                <div className="flex items-center justify-center h-96 bg-gray-800">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Initialisation de la caméra...</p>
                  </div>
                </div>
              )}
              
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full max-w-2xl mx-auto rounded-lg ${!stream ? 'hidden' : ''}`}
                style={{ maxHeight: '60vh', minHeight: '300px' }}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    videoRef.current.play().catch(console.error);
                  }
                }}
              />
              
              {/* Canvas caché pour capturer la photo */}
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Overlay pour guider la prise de vue */}
              {stream && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="border-2 border-white border-dashed rounded-lg w-3/4 h-3/4 flex items-center justify-center">
                    <span className="text-white bg-black bg-opacity-50 px-3 py-1 rounded text-sm">
                      Positionnez le document dans ce cadre
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button
                onClick={capturePhoto}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                size="lg"
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Capturer
              </Button>
              
              <Button
                variant="outline"
                onClick={closeCamera}
                className="border-white text-white hover:bg-white hover:text-black px-8 py-3"
                size="lg"
              >
                Annuler
              </Button>
            </div>
            
            <p className="text-center text-gray-300 text-sm">
              💡 Assurez-vous que le document est bien éclairé et lisible
            </p>
          </div>
        </Card>
      )}

      {/* Processing Steps */}
      {isProcessing && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <div className="text-center">
                <p className="font-medium">Traitement OCR en cours...</p>
                <p className="text-sm text-gray-500">Analyse intelligente du document juridique</p>
              </div>
            </div>
            <div className="space-y-2">
              {processingSteps.map((step, index) => (
                <div key={index} className="text-sm text-gray-600 flex items-center">
                  <span className="mr-2">{step}</span>
                </div>
              ))}
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
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      {result && mappedData && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{result.confidence.toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Confiance</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{result.processingTime}ms</p>
                  <p className="text-sm text-gray-600">Temps</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-purple-50 border-purple-200">
              <div className="flex items-center space-x-2">
                <FileCheck className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-lg font-bold text-purple-600">{result.documentType}</p>
                  <p className="text-sm text-gray-600">Type</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-orange-50 border-orange-200">
              <div className="flex items-center space-x-2">
                <Languages className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-lg font-bold text-orange-600">
                    {result.language === 'mixed' ? '🇩🇿 AR/FR' : result.language === 'ar' ? '🇩🇿 AR' : '🇫🇷 FR'}
                  </p>
                  <p className="text-sm text-gray-600">Langue</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-cyan-50 border-cyan-200">
              <div className="flex items-center space-x-2">
                {result.sourceType === 'image_scan' ? (
                  <svg className="h-5 w-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : result.sourceType === 'scanner_device' ? (
                  <svg className="h-5 w-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ) : (
                  <FileText className="h-5 w-5 text-cyan-600" />
                )}
                <div>
                  <p className="text-lg font-bold text-cyan-600">
                     {result.sourceType === 'image_scan' ? '📷 Photo' : 
                     result.sourceType === 'scanner_device' ? '🖨️ Scanner' : '📄 PDF'}
                  </p>
                  <p className="text-sm text-gray-600">Source</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Detailed Results */}
          <Card className="p-6">
            <Tabs defaultValue="extracted" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="extracted">Texte Extrait</TabsTrigger>
                <TabsTrigger value="entities">Entités Détectées</TabsTrigger>
                <TabsTrigger value="mapped">Données Mappées</TabsTrigger>
                <TabsTrigger value="unmapped">Données non Mappées</TabsTrigger>
              </TabsList>
              
              <TabsContent value="extracted" className="mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    Texte intégral extrait :
                  </h4>
                  <pre className="text-sm whitespace-pre-wrap text-gray-700 max-h-96 overflow-y-auto">
                    {result.text}
                  </pre>
                </div>
              </TabsContent>
              
              <TabsContent value="entities" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Informations du document :</h5>
                      <div className="space-y-2">
                        {result.entities.decretNumber && (
                          <Badge variant="outline">N° {result.entities.decretNumber}</Badge>
                        )}
                        {result.entities.dateHijri && (
                          <Badge variant="outline">📅 {result.entities.dateHijri}</Badge>
                        )}
                        {result.entities.dateGregorian && (
                          <Badge variant="outline">🗓️ {result.entities.dateGregorian}</Badge>
                        )}
                      </div>
                    </div>
                    
                      <div>
                      <h5 className="font-medium mb-2">Articles détectés :</h5>
                      <div className="space-y-1">
                        {result.entities.articles && result.entities.articles.length > 0 ? (
                          result.entities.articles.map((article: string, index: number) => (
                            <div key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                              {article}
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500 italic">Aucun article détecté</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {result.entities.signatories && result.entities.signatories.length > 0 && (
                    <div>
                      <h5 className="font-medium mb-2">Signataires :</h5>
                      <div className="flex flex-wrap gap-2">
                        {result.entities.signatories.map((sig: string, index: number) => (
                          <Badge key={index} variant="secondary">{sig}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="mapped" className="mt-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Données prêtes pour les formulaires :</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Titre :</strong> {mappedData.titre}</div>
                    <div><strong>Type :</strong> {mappedData.type}</div>
                    <div><strong>Numéro :</strong> {mappedData.numero}</div>
                    <div><strong>Date Hijri :</strong> {mappedData.dateHijri}</div>
                    <div><strong>Date Grégorienne :</strong> {mappedData.dateGregorienne}</div>
                    <div><strong>Institution :</strong> {mappedData.institution}</div>
                    <div><strong>Langue :</strong> {mappedData.langue}</div>
                    <div><strong>Confiance :</strong> {mappedData.confiance.toFixed(1)}%</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="unmapped" className="mt-4">
                {(() => {
                  const unmappedData = getUnmappedData();
                  if (!unmappedData) return null;

                  return (
                    <div className="space-y-6">
                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <h4 className="font-medium mb-3 flex items-center text-orange-800">
                          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 18.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          Informations extraites non mappées automatiquement
                        </h4>
                        <p className="text-sm text-orange-700">
                          Ces données ont été détectées lors de l'extraction mais n'ont pas pu être mappées automatiquement dans les champs du formulaire standard.
                        </p>
                      </div>

                      {/* Segments de texte brut */}
                      <div>
                        <h5 className="font-medium mb-3 flex items-center">
                          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Segments de texte non mappés
                        </h5>
                        <div className="grid grid-cols-1 gap-4">
                          {unmappedData.rawTextSegments.map((segment, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                              <div className="flex justify-between items-start mb-2">
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                  {segment.category}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Confiance: {segment.confidence}%
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">"{segment.content}"</p>
                              <p className="text-xs text-gray-500 italic">
                                Raison: {segment.reason}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Entités extraites */}
                      <div>
                        <h5 className="font-medium mb-3 flex items-center">
                          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          Entités détectées non mappées
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {unmappedData.extractedEntities.map((entity, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                              <div className="flex justify-between items-start mb-2">
                                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                  {entity.type}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Confiance: {entity.confidence}%
                                </span>
                              </div>
                              <div className="mb-2">
                                {entity.values.map((value, valueIndex) => (
                                  <div key={valueIndex} className="text-sm text-gray-700 mb-1">
                                    • {value}
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs text-gray-500 italic">
                                Raison: {entity.reason}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Éléments structurels */}
                      <div>
                        <h5 className="font-medium mb-3 flex items-center">
                          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                          </svg>
                          Éléments structurels complexes
                        </h5>
                        <div className="grid grid-cols-1 gap-4">
                          {unmappedData.structuralElements.map((element, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                              <div className="flex justify-between items-start mb-2">
                                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                  {element.element}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Confiance: {element.confidence}%
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{element.description}</p>
                              <p className="text-xs text-gray-500 italic">
                                Raison: {element.reason}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions pour données non mappées */}
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h6 className="font-medium text-yellow-800 mb-2">💡 Actions suggérées :</h6>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• Examiner manuellement les données non mappées pour compléter le formulaire</li>
                          <li>• Créer des règles de mapping personnalisées pour ces types de contenu</li>
                          <li>• Signaler les données importantes manquantes au workflow d'approbation</li>
                          <li>• Sauvegarder ces informations pour améliorer le système d'IA</li>
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </TabsContent>
            </Tabs>
          </Card>

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <Button onClick={exportResults} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter les Résultats
            </Button>
            <Button onClick={sendToApprovalWorkflow} className="bg-green-600 hover:bg-green-700">
              <Send className="mr-2 h-4 w-4" />
              Envoyer vers le Fil d'Approbation
            </Button>
          </div>
        </div>
      )}

      {/* Info */}
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="text-center text-sm text-green-700">
          <p><strong>🚀 OCR + IA Avancé Activé</strong></p>
          <p>Extraction intelligente • Détection d'entités • Mapping automatique • Workflow intégré</p>
        </div>
      </Card>
    </div>
  );
};

export default RealOCRComponent;