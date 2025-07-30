
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useNomenclatureData } from '@/hooks/useNomenclatureData';
import { useAlgerianNomenclatureData } from '@/hooks/useAlgerianNomenclatureData';
import { useFormLibraryStore } from '@/stores/formLibraryStore';
import { ProcedureFormOCRSection } from './procedures/ProcedureFormOCRSection';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { X, FileText, Scan, Eye, ArrowLeft, Settings, Save, Wand2, ClipboardList, FileImage } from 'lucide-react';
import { SmartOCRProcessor } from '@/components/common/SmartOCRProcessor';
import { DynamicFieldList } from '@/components/procedure-form/DynamicFieldList';
import { DocumentField } from '@/components/procedure-form/DocumentField';
import { FileUploadField } from '@/components/procedure-form/FileUploadField';
import { sanitizeDateForInput } from '@/utils/dateFormatter';
import { ProcedureFormHeader } from '@/components/procedure-form/ProcedureForm/ProcedureFormHeader';


interface ProcedureFormProps {
  onClose: () => void;
  onSubmit: (data: Record<string, unknown>) => void;
  ocrData?: Record<string, unknown>;
  initialInputMethod?: 'manual' | 'ocr';
}

// Ces données seront maintenant récupérées via useNomenclatureData

export function ProcedureForm({ onClose, onSubmit, ocrData, initialInputMethod = 'manual' }: ProcedureFormProps) {
  const { toast } = useToast();
  const { nomenclatureData, mapOCRDataToForm } = useNomenclatureData();
  const { nomenclatureData: algerianData, mapAlgerianOCRDataToForm, validateAlgerianDocument } = useAlgerianNomenclatureData();
  const { forms: customForms } = useFormLibraryStore();
  const [inputMethod, setInputMethod] = useState<'manual' | 'ocr'>(initialInputMethod);
  const [showOCRScanner, setShowOCRScanner] = useState(false);

  // Filtrer les formulaires de la bibliothèque pour les procédures administratives
  const PROCEDURE_TYPES = [
    'Procédure Administrative', 'Procédure', 'Procedure Administrative'
  ];
  
  const PROCEDURE_CATEGORIES = [
    'Procédures Administratives', 'Urbanisme', 'État civil', 'Social', 'Fiscal', 
    'Commerce', 'Environnement', 'Santé', 'Éducation', 'Transport', 'Agriculture',
    'Fiscalité', 'Fonction Publique', 'État Civil', 'Emploi'
  ];
  
  const procedureForms = customForms.filter(form => 
    PROCEDURE_TYPES.includes(form.type) || 
    PROCEDURE_CATEGORIES.includes(form.category) ||
    form.type === 'procedures_administratives' || 
    form.category === 'Procédures Administratives'
  );

  // Déduplication par nom pour éviter les doublons
  const uniqueProcedureForms = useMemo(() => {
    return procedureForms.reduce((acc: any[], current) => {
      const exists = acc.find(form => (form as any).name.toLowerCase() === (current as any).name.toLowerCase());
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);
  }, [procedureForms]);

  // Logs de debug optimisés - seulement en mode développement
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('=== DEBUG ProcedureForm ===');
      console.log('Nombre total de formulaires dans la bibliothèque:', customForms.length);
      console.log('Formulaires de procédures filtrés:', procedureForms.length);
      console.log('Formulaires de procédures uniques:', uniqueProcedureForms.length);
      const availableTypes = [...new Set(customForms.map(f => f.type))].filter(Boolean);
      const availableCategories = [...new Set(customForms.map(f => f.category))].filter(Boolean);
      console.log('Types trouvés:', `(${availableTypes.length})`, availableTypes);
      console.log('Catégories trouvées:', `(${availableCategories.length})`, availableCategories);
    }
  }, [customForms.length, procedureForms.length, uniqueProcedureForms.length]);

  // Listen for OCR tab activation events and process OCR data
  useEffect(() => {
    const handleActivateOCRTab = () => {
      setInputMethod('ocr');
    };

    const handleOpenOCRTab = (event: CustomEvent) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('🎯 [ProcedureForm] Ouverture directe onglet OCR');
      }
      setInputMethod('ocr');
    };

    window.addEventListener('activate-ocr-tab', handleActivateOCRTab);
    window.addEventListener('open-procedure-form-with-ocr', handleOpenOCRTab as EventListener);
    return () => {
      window.removeEventListener('activate-ocr-tab', handleActivateOCRTab);
      window.removeEventListener('open-procedure-form-with-ocr', handleOpenOCRTab as EventListener);
    };
  }, []);

  // Process OCR data when received
  useEffect(() => {
    if (ocrData) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🎯 [ProcedureForm] Traitement des données OCR reçues:', ocrData);
      }
      handleOCRFormDataExtracted({ documentType: 'procedure', formData: ocrData });
      setInputMethod('manual'); // Switch to manual mode to show filled form
    }
  }, [ocrData]);

  const [formData, setFormData] = useState({
    // Informations de base
    name: '',
    description: '',
    procedureCategory: '',
    sectorAdministration: '',
    targetCategory: '',
    
    // Champs dynamiques
    steps: [''],
    conditions: [''],
    requiredDocuments: [''],
    requiredDocumentsType: 'text' as 'existing' | 'text',
    complementaryDocuments: [''],
    complementaryDocumentsType: 'text' as 'existing' | 'text',
    legalBasis: [''],
    
    // Modalités
    submissionLocation: '',
    validityType: 'periodic' as 'periodic' | 'open',
    validityStartDate: '',
    validityEndDate: '',
    processingDuration: '',
    feeType: 'gratuit' as 'gratuit' | 'payant',
    feeAmount: '',
    paymentMethods: '',
    
    // Numérisation
    digitization: false,
    digitizationDate: '',
    electronicPortalLink: '',
    mobileAppLink: '',
    thirdPartySubmission: false,
    
    // Retrait et validité
    withdrawalTime: '',
    withdrawalMethod: '',
    documentValidity: '',
    
    // Recours
    hasAppeal: false,
    appealLocation: '',
    appealDeadline: '',
    appealFees: '',
    
    // Fichiers
    userGuide: '',
    downloadableForm: '',
    
    // FAQ et contact
    faq: '',
    contactAddress: '',
    contactPhone: '',
    contactGreenNumber: '',
    contactEmail: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOCRFormDataExtracted = (data: { documentType: 'procedure', formData: Record<string, any> }) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🇩🇿 [ProcedureForm] Réception des données OCR algériennes:', data);
      console.log('📋 [ProcedureForm] Nombre de champs reçus:', Object.keys(data.formData).length);
    }
    
    if (data.documentType !== 'procedure') {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ [ProcedureForm] Type de document incompatible:', data.documentType);
      }
      return;
    }

    // Utiliser le mapping algérien spécialisé
    const algerianMappedData: Record<string, unknown> = mapAlgerianOCRDataToForm(data.formData, 'procedure');
    if (process.env.NODE_ENV === 'development') {
      console.log('🇩🇿 [ProcedureForm] Données mappées avec nomenclature algérienne:', algerianMappedData);
    }
    
    // Validation spécifique aux documents algériens
    const validationResult = validateAlgerianDocument(data);
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ [ProcedureForm] Validation algérienne:', validationResult);
    }
    
    // Fallback sur le mapping générique si nécessaire
    const genericMappedData: Record<string, unknown> = mapOCRDataToForm(data.formData, 'procedure');
    
    // Fusionner les deux mappings (priorité au mapping algérien)
    const mappedData: Record<string, unknown> = { ...genericMappedData, ...algerianMappedData };
    console.log('📋 [ProcedureForm] Données finales fusionnées:', mappedData);
    console.log('🔍 [ProcedureForm] Clés disponibles dans mappedData:', Object.keys(mappedData));
    console.log('🔍 [ProcedureForm] Valeurs non vides:', Object.entries(mappedData).filter(([k, v]) => v && v !== ''));
    
    // Mapping direct vers les champs exacts du formulaire ProcedureForm
    const completeFormData: Record<string, unknown> = {};
    
    // Mapping du nom de la procédure vers le champ 'name'
    completeFormData.name = mappedData.name || mappedData.titre || mappedData.title || 
                           mappedData.nom || mappedData.intitule || mappedData.denomination || '';
    
    // Si toujours vide, extraire du contenu
    if (!completeFormData.name && (mappedData.content || mappedData.contenu || mappedData.description)) {
      const content = String(mappedData.content || mappedData.contenu || mappedData.description);
      const patterns = [
        /(?:demande|procédure|formalité)\s+(?:de|d'|pour)\s+([^.]{10,100})/gi,
        /(?:obtention|délivrance)\s+(?:de|d'|du)\s+([^.]{10,100})/gi,
        /([^.]{20,120})\s*(?:\n|\r)/m
      ];
      
      for (const pattern of patterns) {
        const match = content.match(pattern);
        if (match && match[1]) {
          completeFormData.name = match[1].trim();
          break;
        }
      }
    }
    
    // Mapping de la description
    completeFormData.description = mappedData.description || mappedData.contenu || 
                                  mappedData.content || mappedData.text || mappedData.objet || '';
    
    // Mapping du secteur vers 'sectorAdministration'
    completeFormData.sectorAdministration = mappedData.sector || mappedData.ministry || 
                                           mappedData.institution || 'Commerce';
    
    // Mapping de la durée vers 'processingDuration'
    completeFormData.processingDuration = mappedData.duration || '';
    
    // Mapping des dates avec conversion automatique
    completeFormData.validityStartDate = sanitizeDateForInput(String(mappedData.startDate || mappedData.validityStartDate || ''));
    completeFormData.validityEndDate = sanitizeDateForInput(String(mappedData.endDate || mappedData.validityEndDate || ''));
    completeFormData.digitizationDate = sanitizeDateForInput(String(mappedData.digitizationDate || ''));
    
    // Mapping du coût vers 'feeAmount' et 'feeType'
    if (mappedData.cost) {
      const costStr = String(mappedData.cost);
      if (costStr.toLowerCase().includes('gratuit')) {
        completeFormData.feeType = 'gratuit';
        completeFormData.feeAmount = '';
      } else {
        completeFormData.feeType = 'payant';
        completeFormData.feeAmount = costStr;
      }
    }
    
    // Mapping du lieu vers 'submissionLocation'
    completeFormData.submissionLocation = mappedData.location || mappedData.wilaya || mappedData.commune || '';
    
    // Mapping des documents requis vers 'requiredDocuments'
    if (mappedData.required_documents && Array.isArray(mappedData.required_documents)) {
      completeFormData.requiredDocuments = mappedData.required_documents;
      completeFormData.requiredDocumentsType = 'text';
    }
    
    // Mapping des étapes vers 'steps'
    if (mappedData.steps && Array.isArray(mappedData.steps)) {
      completeFormData.steps = mappedData.steps;
    }
    
    // Mapping des conditions vers 'conditions'
    if (mappedData.conditions && Array.isArray(mappedData.conditions)) {
      completeFormData.conditions = mappedData.conditions;
    }
    
    // Mapping des informations de contact
    if (mappedData.contact_info) {
      completeFormData.contactAddress = mappedData.contact_info;
    }
    
    // Assurer des valeurs par défaut
    if (!completeFormData.name) completeFormData.name = 'Procédure extraite par OCR';
    if (!completeFormData.description) completeFormData.description = 'Description extraite automatiquement';
    if (!completeFormData.sectorAdministration) completeFormData.sectorAdministration = 'Commerce';

    // Sélectionner automatiquement une catégorie si disponible
    if (!formData.procedureCategory && uniqueProcedureForms.length > 0) {
      const matchingForm = uniqueProcedureForms.find(form => 
        form.category === completeFormData.sector
      ) || uniqueProcedureForms[0];
      
      setFormData(prev => ({ 
        ...prev, 
        procedureCategory: matchingForm.name,
        ...completeFormData 
      }));
      console.log('🎯 [ProcedureForm] Catégorie automatiquement sélectionnée:', matchingForm.name);
    } else {
      setFormData(prev => ({ ...prev, ...completeFormData }));
    }
    
    // Parcourir tous les champs du formulaire sélectionné (si disponible)
    // Auto-détecter la catégorie si pas encore définie
    // Auto-détecter la catégorie si pas encore définie
    const content = (data.formData.contenu || data.formData.content || data.formData.description || '').toLowerCase();
    if (!completeFormData.procedureCategory) {
      if (content.includes('commerce') || content.includes('entreprise') || content.includes('société')) {
        completeFormData.procedureCategory = 'Commerce';
      } else if (content.includes('urbanisme') || content.includes('construction') || content.includes('permis')) {
        completeFormData.procedureCategory = 'Urbanisme';
      } else if (content.includes('état civil') || content.includes('naissance') || content.includes('mariage')) {
        completeFormData.procedureCategory = 'État Civil';
      } else if (content.includes('fiscalité') || content.includes('impôt') || content.includes('taxe')) {
        completeFormData.procedureCategory = 'Fiscalité';
      } else if (content.includes('santé') || content.includes('médical') || content.includes('hôpital')) {
        completeFormData.procedureCategory = 'Santé';
      } else if (content.includes('éducation') || content.includes('école') || content.includes('université')) {
        completeFormData.procedureCategory = 'Éducation';
      } else if (content.includes('transport') || content.includes('permis de conduire') || content.includes('véhicule')) {
        completeFormData.procedureCategory = 'Transport';
      } else if (content.includes('environnement') || content.includes('écologie') || content.includes('pollution')) {
        completeFormData.procedureCategory = 'Environnement';
      } else if (content.includes('agriculture') || content.includes('agricole') || content.includes('exploitation')) {
        completeFormData.procedureCategory = 'Agriculture';
      }
    }
    
    // Auto-détecter l'organisation si pas encore définie
    if (!completeFormData.sectorAdministration) {
      if (content.includes('intérieur') || content.includes('wilaya') || content.includes('commune')) {
        completeFormData.sectorAdministration = 'Ministère de l\'Intérieur';
      } else if (content.includes('finance') || content.includes('impôt') || content.includes('fiscal')) {
        completeFormData.sectorAdministration = 'Ministère des Finances';
      } else if (content.includes('justice') || content.includes('tribunal') || content.includes('juridique')) {
        completeFormData.sectorAdministration = 'Ministère de la Justice';
      } else if (content.includes('santé') || content.includes('médical') || content.includes('hôpital')) {
        completeFormData.sectorAdministration = 'Ministère de la Santé';
      } else if (content.includes('éducation') || content.includes('école') || content.includes('université')) {
        completeFormData.sectorAdministration = 'Ministère de l\'Éducation';
      } else if (content.includes('commerce') || content.includes('entreprise') || content.includes('commercial')) {
        completeFormData.sectorAdministration = 'Ministère du Commerce';
      } else if (content.includes('agriculture') || content.includes('agricole') || content.includes('exploitation')) {
        completeFormData.sectorAdministration = 'Ministère de l\'Agriculture';
      } else if (content.includes('transport') || content.includes('véhicule') || content.includes('route')) {
        completeFormData.sectorAdministration = 'Ministère des Transports';
      }
    }
    
    // Déterminer la catégorie ciblée
    if (content.includes('citoyen') || content.includes('individu') || content.includes('personne physique')) {
      completeFormData.targetCategory = 'citoyen';
    } else if (content.includes('entreprise') || content.includes('société') || content.includes('personne morale')) {
      completeFormData.targetCategory = 'entreprise';
    } else if (content.includes('professionnel') || content.includes('métier') || content.includes('profession')) {
      completeFormData.targetCategory = 'professionnel';
    } else if (content.includes('association') || content.includes('organisme') || content.includes('collectif')) {
      completeFormData.targetCategory = 'association';
    } else if (content.includes('étranger') || content.includes('expatrié') || content.includes('visa')) {
      completeFormData.targetCategory = 'etranger';
    } else {
      completeFormData.targetCategory = 'citoyen';
    }
    
    // Logs de debug du mapping
    console.log('🎯 [ProcedureForm] Mapping terminé. Données à injecter:', completeFormData);
    console.log('🎯 [ProcedureForm] Champs mappés:', Object.keys(completeFormData));
    console.log('🎯 [ProcedureForm] Valeurs mappées non vides:', Object.entries(completeFormData).filter(([k, v]) => v && v !== ''));
    
    // Mise à jour du formulaire avec toutes les données
    setFormData(prev => {
      const newFormData = { ...prev, ...completeFormData };
      console.log('🎯 [ProcedureForm] FormData après injection:', newFormData);
      return newFormData;
    });
    
    console.log('✅ [ProcedureForm] Formulaire rempli avec', Object.keys(completeFormData).length, 'champs');
    console.log('📋 [ProcedureForm] Données du formulaire final:', completeFormData);
    
    // Afficher les informations de validation algérienne
    if (validationResult.confidence >= 80) {
      toast({
        title: "🇩🇿 Document algérien détecté avec haute confiance",
        description: `Confiance: ${validationResult.confidence}% - ${Object.keys(completeFormData).length} champs extraits`,
        variant: "default"
      });
    } else if (validationResult.confidence >= 60) {
      toast({
        title: "🇩🇿 Document algérien détecté",
        description: `Confiance: ${validationResult.confidence}% - Veuillez vérifier les données extraites`,
        variant: "default"
      });
    } else {
      toast({
        title: "⚠️ Confiance faible pour le document algérien",
        description: `Confiance: ${validationResult.confidence}% - Vérification manuelle recommandée`,
        variant: "destructive"
      });
    }

    // Notification à l'utilisateur
    const filledFieldsCount = Object.values(completeFormData).filter(value => 
      value && value !== '' && !(Array.isArray(value) && value.length === 0)
    ).length;
    
    console.log('✅ [ProcedureForm] Formulaire rempli avec', Object.keys(completeFormData).length, 'champs');
    console.log('📋 [ProcedureForm] Données du formulaire final:', completeFormData);
    console.log('📊 [ProcedureForm] Nombre de champs remplis:', filledFieldsCount);
    
    toast({
      title: "Formulaire rempli par OCR",
      description: `${filledFieldsCount} champs ont été remplis automatiquement. Redirection vers le formulaire...`,
    });
    
    // Redirection vers l'onglet formulaire avec un petit délai pour permettre aux données de se propager
    console.log('🔄 [ProcedureForm] Basculement vers le mode manuel...');
    setTimeout(() => {
      setInputMethod('manual'); // Basculer vers le mode manuel pour afficher le formulaire
    }, 500);
  };

  const handleAutoFill = () => {
    // Ouvrir la modal d'auto-remplissage IA
    const event = new CustomEvent('open-ai-autofill', {
      detail: { context: 'procedure' }
    });
    window.dispatchEvent(event);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Données de la procédure:', formData);
    onSubmit(formData);
    toast({
      title: "Procédure ajoutée",
      description: `La procédure "${formData.name || 'nouvelle procédure'}" a été ajoutée avec succès.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ProcedureFormHeader onClose={onClose} onAutoFill={handleAutoFill} />
        {/* Formulaire de procédure directement */}
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Informations générales */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
                <CardTitle className="text-xl text-gray-900">Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nom de la procédure *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Nom de la procédure"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="procedureCategory" className="text-sm font-medium text-gray-700">Catégorie de procédure *</Label>
                    <Select onValueChange={(value) => handleInputChange('procedureCategory', value)} value={formData.procedureCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder={
                          uniqueProcedureForms.length === 0 
                            ? "Aucun formulaire de procédure administrative disponible dans la bibliothèque"
                            : "Sélectionner une catégorie depuis la bibliothèque"
                        } />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueProcedureForms.map((form) => (
                          <SelectItem key={form.id} value={form.name}>
                            {form.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Description de la procédure"
                    rows={4}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sectorAdministration" className="text-sm font-medium text-gray-700">Secteur et/ou administration *</Label>
                    <Select onValueChange={(value) => handleInputChange('sectorAdministration', value)} value={formData.sectorAdministration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une organisation" />
                      </SelectTrigger>
                      <SelectContent>
                        {nomenclatureData?.organizations.map((org) => (
                          <SelectItem key={org.code} value={org.name}>{org.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetCategory" className="text-sm font-medium text-gray-700">Catégorie Ciblée</Label>
                    <Select onValueChange={(value) => handleInputChange('targetCategory', value)} value={formData.targetCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la catégorie ciblée" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="citoyen">Citoyen</SelectItem>
                        <SelectItem value="administration">Administration</SelectItem>
                        <SelectItem value="entreprises">Entreprises</SelectItem>
                        <SelectItem value="investisseur">Investisseur</SelectItem>
                        <SelectItem value="associations">Associations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Détails de la procédure */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
                <CardTitle className="text-xl text-gray-900">Détails de la procédure</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <DynamicFieldList
                  label="Étapes (avec démonstration si disponible)"
                  values={formData.steps}
                  onChange={(values) => handleInputChange('steps', values)}
                  placeholder="Décrire une étape de la procédure..."
                  type="textarea"
                />

                <DynamicFieldList
                  label="Conditions d'utilisation du service"
                  values={formData.conditions}
                  onChange={(values) => handleInputChange('conditions', values)}
                  placeholder="Décrire une condition d'utilisation..."
                  type="textarea"
                />
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
                <CardTitle className="text-xl text-gray-900">Documents requis</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <DocumentField
                  label="Documents demandés"
                  values={formData.requiredDocuments}
                  onChange={(values) => handleInputChange('requiredDocuments', values)}
                  type={formData.requiredDocumentsType}
                  onTypeChange={(type) => handleInputChange('requiredDocumentsType', type)}
                />

                <DocumentField
                  label="Documents Complémentaires"
                  values={formData.complementaryDocuments}
                  onChange={(values) => handleInputChange('complementaryDocuments', values)}
                  type={formData.complementaryDocumentsType}
                  onTypeChange={(type) => handleInputChange('complementaryDocumentsType', type)}
                />
              </CardContent>
            </Card>

            {/* Modalités */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
                <CardTitle className="text-xl text-gray-900">Modalités de la procédure</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="submissionLocation" className="text-sm font-medium text-gray-700">Où déposer le dossier - Administration concernée</Label>
                  <Input
                    id="submissionLocation"
                    value={formData.submissionLocation}
                    onChange={(e) => handleInputChange('submissionLocation', e.target.value)}
                    placeholder="Administration concernée"
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Validité de la procédure */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">Validité de la procédure</Label>
                  <RadioGroup
                    value={formData.validityType}
                    onValueChange={(value) => handleInputChange('validityType', value)}
                    className="mb-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="periodic" id="periodic" />
                      <Label htmlFor="periodic">Périodique</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="open" id="open" />
                      <Label htmlFor="open">Ouverte</Label>
                    </div>
                  </RadioGroup>
                  {formData.validityType === 'periodic' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="validityStartDate">Du</Label>
                        <Input
                          id="validityStartDate"
                          type="date"
                          value={formData.validityStartDate}
                          onChange={(e) => handleInputChange('validityStartDate', e.target.value)}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="validityEndDate">Au</Label>
                        <Input
                          id="validityEndDate"
                          type="date"
                          value={formData.validityEndDate}
                          onChange={(e) => handleInputChange('validityEndDate', e.target.value)}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="processingDuration" className="text-sm font-medium text-gray-700">Durée du traitement (jours)</Label>
                    <Input
                      id="processingDuration"
                      type="number"
                      value={formData.processingDuration}
                      onChange={(e) => handleInputChange('processingDuration', e.target.value)}
                      placeholder="Nombre de jours"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Frais</Label>
                    <RadioGroup
                      value={formData.feeType}
                      onValueChange={(value) => handleInputChange('feeType', value)}
                      className="mb-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="gratuit" id="gratuit" />
                        <Label htmlFor="gratuit">Gratuit</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="payant" id="payant" />
                        <Label htmlFor="payant">Payant</Label>
                      </div>
                    </RadioGroup>
                    {formData.feeType === 'payant' && (
                      <div className="space-y-2">
                        <Input
                          placeholder="Montant en DA"
                          value={formData.feeAmount}
                          onChange={(e) => handleInputChange('feeAmount', e.target.value)}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <Input
                          placeholder="Méthodes de paiement"
                          value={formData.paymentMethods}
                          onChange={(e) => handleInputChange('paymentMethods', e.target.value)}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Numérisation et modalités */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
                <CardTitle className="text-xl text-gray-900">Numérisation et modalités</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Numérisation */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="digitization"
                      checked={formData.digitization}
                      onCheckedChange={(checked) => handleInputChange('digitization', checked)}
                    />
                    <Label htmlFor="digitization">Numérisation de la procédure</Label>
                  </div>

                  {formData.digitization && (
                    <div className="space-y-4 pl-6 border-l-2 border-muted">
                      <div>
                        <Label htmlFor="digitizationDate">Date de la numérisation</Label>
                        <Input
                          id="digitizationDate"
                          type="date"
                          value={formData.digitizationDate}
                          onChange={(e) => handleInputChange('digitizationDate', e.target.value)}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="electronicPortalLink">Lien du portail électronique</Label>
                        <Input
                          id="electronicPortalLink"
                          type="url"
                          value={formData.electronicPortalLink}
                          onChange={(e) => handleInputChange('electronicPortalLink', e.target.value)}
                          placeholder="https://..."
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="mobileAppLink">Lien de l'application mobile (si elle existe)</Label>
                        <Input
                          id="mobileAppLink"
                          type="url"
                          value={formData.mobileAppLink}
                          onChange={(e) => handleInputChange('mobileAppLink', e.target.value)}
                          placeholder="https://..."
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Modalités de retrait */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="thirdPartySubmission"
                      checked={formData.thirdPartySubmission}
                      onCheckedChange={(checked) => handleInputChange('thirdPartySubmission', checked)}
                    />
                    <Label htmlFor="thirdPartySubmission">Dépôt par une tierce personne</Label>
                  </div>

                  <div>
                    <Label htmlFor="withdrawalTime">Quand retirer l'acte ou le service administratif demandé</Label>
                    <Input
                      id="withdrawalTime"
                      value={formData.withdrawalTime}
                      onChange={(e) => handleInputChange('withdrawalTime', e.target.value)}
                      placeholder="Délai de retrait"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="withdrawalMethod">Comment retirer l'acte ou le service administratif demandé</Label>
                    <Textarea
                      id="withdrawalMethod"
                      value={formData.withdrawalMethod}
                      onChange={(e) => handleInputChange('withdrawalMethod', e.target.value)}
                      placeholder="Modalités de retrait"
                      rows={2}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="documentValidity">Validité de l'acte ou du service administratif demandé</Label>
                    <Input
                      id="documentValidity"
                      value={formData.documentValidity}
                      onChange={(e) => handleInputChange('documentValidity', e.target.value)}
                      placeholder="Durée de validité"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Recours */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="hasAppeal"
                      checked={formData.hasAppeal}
                      onCheckedChange={(checked) => handleInputChange('hasAppeal', checked)}
                    />
                    <Label htmlFor="hasAppeal">Recours disponible</Label>
                  </div>

                  {formData.hasAppeal && (
                    <div className="space-y-4 pl-6 border-l-2 border-muted">
                      <div>
                        <Label htmlFor="appealLocation">Où déposer</Label>
                        <Input
                          id="appealLocation"
                          value={formData.appealLocation}
                          onChange={(e) => handleInputChange('appealLocation', e.target.value)}
                          placeholder="Lieu de dépôt du recours"
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="appealDeadline">Les délais</Label>
                        <Input
                          id="appealDeadline"
                          value={formData.appealDeadline}
                          onChange={(e) => handleInputChange('appealDeadline', e.target.value)}
                          placeholder="Délais de recours"
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="appealFees">Les frais</Label>
                        <Input
                          id="appealFees"
                          value={formData.appealFees}
                          onChange={(e) => handleInputChange('appealFees', e.target.value)}
                          placeholder="Frais de recours"
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Ancrage juridique et fichiers */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
                <CardTitle className="text-xl text-gray-900">Ancrage juridique et fichiers</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <DynamicFieldList
                  label="Ancrage juridique"
                  values={formData.legalBasis}
                  onChange={(values) => handleInputChange('legalBasis', values)}
                  placeholder="Référence légale ou réglementaire..."
                  type="textarea"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUploadField
                    label="Guide d'utilisation à télécharger"
                    value={formData.userGuide}
                    onChange={(value) => handleInputChange('userGuide', value)}
                    accept=".pdf,.doc,.docx"
                  />

                  <FileUploadField
                    label="Formulaire à télécharger"
                    value={formData.downloadableForm}
                    onChange={(value) => handleInputChange('downloadableForm', value)}
                    accept=".pdf,.doc,.docx"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Informations complémentaires */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
                <CardTitle className="text-xl text-gray-900">Informations complémentaires</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="faq">Questions fréquemment posées</Label>
                  <Textarea
                    id="faq"
                    value={formData.faq}
                    onChange={(e) => handleInputChange('faq', e.target.value)}
                    placeholder="FAQ sur la procédure..."
                    rows={3}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
                  
                  <div>
                    <Label htmlFor="contactAddress">Adresse</Label>
                    <Textarea
                      id="contactAddress"
                      value={formData.contactAddress}
                      onChange={(e) => handleInputChange('contactAddress', e.target.value)}
                      placeholder="Adresse complète"
                      rows={2}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactPhone">N° Téléphone</Label>
                      <Input
                        id="contactPhone"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                        placeholder="Numéro de téléphone"
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactGreenNumber">N° Vert</Label>
                      <Input
                        id="contactGreenNumber"
                        value={formData.contactGreenNumber}
                        onChange={(e) => handleInputChange('contactGreenNumber', e.target.value)}
                        placeholder="Numéro vert"
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contactEmail">E-mail</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      placeholder="Adresse e-mail"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" onClick={onClose} className="px-8">
                Annuler
              </Button>
              <Button type="submit" className="px-8 bg-blue-600 hover:bg-blue-700 gap-2">
                <Save className="w-4 h-4" />
                Enregistrer la procédure
              </Button>
            </div>
          </form>
      </div>
    </div>
  );
}
