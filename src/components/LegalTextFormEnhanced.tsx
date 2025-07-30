import React, { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { LegalTextFormHeader } from './legal/LegalTextFormHeader';

import { LegalTextFormOCRSection } from './legal/LegalTextFormOCRSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FileText, Save, ArrowLeft, Wand2 } from 'lucide-react';
import { LegalTextDynamicFieldRenderer } from './legal/LegalTextDynamicFieldRenderer';
import { useNomenclatureData } from '@/hooks/useNomenclatureData';
import { useAlgerianNomenclatureData } from '@/hooks/useAlgerianNomenclatureData';
import { sanitizeDateForInput } from '@/utils/dateFormatter';
import { useFormLibraryStore } from '@/stores/formLibraryStore';

interface LegalTextFormEnhancedProps {
  onClose: () => void;
  onSubmit: (data: Record<string, unknown>) => void;
  initialOCRText?: string;
  initialInputMethod?: 'manual' | 'ocr';
  ocrData?: Record<string, unknown>;
}

function LegalTextFormEnhanced({ 
  onClose, 
  onSubmit, 
  initialOCRText,
  initialInputMethod = 'manual',
  ocrData
}: LegalTextFormEnhancedProps) {
  const { toast } = useToast();
  const { nomenclatureData, mapOCRDataToForm } = useNomenclatureData();
  const { nomenclatureData: algerianData, mapAlgerianOCRDataToForm, validateAlgerianDocument } = useAlgerianNomenclatureData();
  const { forms: customForms } = useFormLibraryStore();
  const [inputMethod, setInputMethod] = useState<'manual' | 'ocr'>(initialInputMethod);
  const [showOCRScanner, setShowOCRScanner] = useState(false);
  const [selectedTextType, setSelectedTextType] = useState<string>('');
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  // Écouter l'événement pour ouvrir directement l'onglet OCR
  useEffect(() => {
    const handleOpenOCRTab = (event: CustomEvent) => {
      console.log('🎯 [LegalTextFormEnhanced] Ouverture directe onglet OCR');
      setInputMethod('ocr');
    };

    window.addEventListener('open-legal-form-with-ocr', handleOpenOCRTab as EventListener);
    return () => {
      window.removeEventListener('open-legal-form-with-ocr', handleOpenOCRTab as EventListener);
    };
  }, []);

  // Optimisation avec useMemo pour éviter les recalculs à chaque rendu
  const { uniqueLegalTextForms, availableTypes, availableCategories } = useMemo(() => {
    const LEGAL_TEXT_TYPES = [
      'Loi', 'Décret', 'Ordonnance', 'Arrêté', 'Circulaire', 'Instruction',
      'Constitution', 'Règlement', 'Décision', 'Texte Constitutionnel', 
      'Accord', 'Convention', 'Code Juridique', 'Déclaration', 'Bulletin'
    ];
    
    const LEGAL_TEXT_CATEGORIES = [
      'Textes Législatifs', 'Textes Réglementaires', 'Décisions Judiciaires', 
      'Administration Publique', 'Communications Officielles', 'Textes Juridiques',
      'Publications', 'Accords Internationaux', 'Textes Constitutionnels'
    ];
    
    const legalTextForms = customForms.filter(form => 
      LEGAL_TEXT_TYPES.includes(form.type) || 
      LEGAL_TEXT_CATEGORIES.includes(form.category) ||
      form.type === 'textes_juridiques' || 
      form.category === 'Textes Juridiques'
    );

    // Déduplication par nom pour éviter les doublons
    const uniqueForms = legalTextForms.reduce((acc: any[], current) => {
      const exists = acc.find(form => (form as any).name.toLowerCase() === (current as any).name.toLowerCase());
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);

    const types = [...new Set(customForms.map(f => f.type))].filter(Boolean);
    const categories = [...new Set(customForms.map(f => f.category))].filter(Boolean);

    return {
      uniqueLegalTextForms: uniqueForms,
      availableTypes: types,
      availableCategories: categories
    };
  }, [customForms]);

  // Logs de debug optimisés - seulement quand les données changent
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('=== DEBUG LegalTextFormEnhanced ===');
      console.log('Nombre total de formulaires dans la bibliothèque:', customForms.length);
      console.log('Formulaires juridiques uniques:', uniqueLegalTextForms.length);
      console.log('Types trouvés:', `(${availableTypes.length})`, availableTypes);
      console.log('Catégories trouvées:', `(${availableCategories.length})`, availableCategories);
    }
  }, [customForms.length, uniqueLegalTextForms.length, availableTypes.length, availableCategories.length]);

  const handleOCRFormDataExtracted = (data: { documentType: 'legal', formData: Record<string, any> }) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎯 [LegalTextFormEnhanced] Traitement des données OCR reçues:', data);
    }
    
    // Si aucun formulaire n'est sélectionné, essayer de le détecter automatiquement
    let formToUse = selectedForm;
    if (!formToUse) {
      const ocrData = data.formData;
      // Détecter automatiquement le type de formulaire basé sur les données OCR
      if (ocrData.type || ocrData.TYPE) {
        const detectedType = ocrData.type || ocrData.TYPE;
        formToUse = uniqueLegalTextForms.find(form => 
          form.type === detectedType || 
          form.type.toLowerCase().includes(String(detectedType).toLowerCase()) ||
          String(detectedType).toLowerCase().includes(form.type.toLowerCase())
        );
      }
      
      // Si toujours pas trouvé, utiliser le premier formulaire juridique disponible
      if (!formToUse) {
        formToUse = uniqueLegalTextForms[0];
      }
      
      if (formToUse) {
        if (process.env.NODE_ENV === 'development') {
          console.log('🎯 [LegalTextForm] Formulaire détecté automatiquement:', formToUse);
        }
        setSelectedForm(formToUse);
      }
    }
    
    // Utiliser le mapping algérien spécialisé pour les textes juridiques
    const algerianMappedData: Record<string, unknown> = mapAlgerianOCRDataToForm(data.formData, 'legal');
    if (process.env.NODE_ENV === 'development') {
      console.log('🇩🇿 [LegalTextForm] Données mappées avec nomenclature algérienne:', algerianMappedData);
    }
    
    // Validation spécifique aux documents juridiques algériens
    const validationResult = validateAlgerianDocument(data);
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ [LegalTextForm] Validation algérienne:', validationResult);
    }
    
    // Fallback sur le mapping générique si nécessaire
    const genericMappedData: Record<string, unknown> = mapOCRDataToForm(data.formData, 'legal');
    
    // Fusionner les deux mappings (priorité au mapping algérien)
    const mappedData: Record<string, unknown> = { ...genericMappedData, ...algerianMappedData };
    if (process.env.NODE_ENV === 'development') {
      console.log('📋 [LegalTextForm] Données finales fusionnées:', mappedData);
      console.log('🔍 [LegalTextForm] Clés disponibles dans mappedData:', Object.keys(mappedData));
      console.log('🔍 [LegalTextForm] Valeurs non vides:', Object.entries(mappedData).filter(([k, v]) => v && v !== ''));
    }
    
    // Initialiser tous les champs du formulaire sélectionné avec les données OCR
    const completeFormData: { [key: string]: string } = {};
    
    // Parcourir tous les champs du formulaire sélectionné ou utiliser un formulaire par défaut
    const fieldsToProcess = selectedForm?.fields || formToUse?.fields || [];
    fieldsToProcess.forEach((field: Record<string, unknown>) => {
      let fieldValue = '';
      
      // Mapping intelligent des champs OCR vers les champs du formulaire
      switch (field.name) {
        case 'titre':
        case 'title':
          // Essayer plusieurs variations possibles avec priorité aux données extraites
          fieldValue = String(mappedData.titre || mappedData.title || mappedData.name || mappedData.nom || 
                      mappedData.intitule || mappedData.denomination || mappedData.libelle || '');
          // Si toujours vide, essayer d'extraire du contenu avec patterns plus robustes
          if (!fieldValue && (mappedData.content || mappedData.contenu || mappedData.text)) {
            const content = String(mappedData.content || mappedData.contenu || mappedData.text);
            // Patterns multiples pour détecter le titre
            const patterns = [
              /(?:titre|objet|sujet|intitulé)\s*:?\s*([^\n\r]{10,200})/i,
              /^([^\n\r]{20,150})\s*(?:\n|\r)/m,
              /(?:décret|arrêté|loi|ordonnance)\s+(?:n°|numéro)?\s*[\d-/]*\s+(?:du|en date)\s+[\d/-]+\s+(?:relatif|portant|fixant)\s+([^\n\r]{10,150})/i,
              /(?:concernant|relative?|portant sur)\s+([^\n\r]{10,150})/i
            ];
            
            for (const pattern of patterns) {
              const match = content.match(pattern);
              if (match && match[1]) {
                fieldValue = match[1].trim();
                break;
              }
            }
          }
          break;
          
        case 'numero_texte':
        case 'reference':
        case 'numero_ref':
          fieldValue = String(mappedData.reference || mappedData.numero_ref || mappedData.numero_texte || '');
          break;
          
        case 'journal_numero':
          fieldValue = String(mappedData.journal_numero || '');
          break;
          
        case 'date_journal':
        case 'date_promulgation':
        case 'date_signature':
        case 'date':
          fieldValue = sanitizeDateForInput(String(mappedData.date_journal || mappedData.publicationDate || mappedData.date || ''));
          break;
          
        case 'numero_page':
          fieldValue = String(mappedData.numero_page || '');
          break;
          
        case 'en_tete':
          fieldValue = String(mappedData.en_tete || '');
          break;
          
        case 'organisation':
        case 'autorite_signataire':
        case 'authority':
          fieldValue = String(mappedData.authority || mappedData.organisation || mappedData.autorite_signataire || '');
          break;
          
        case 'contenu':
        case 'content':
          fieldValue = String(mappedData.content || mappedData.contenu || '');
          break;
          
        case 'objet':
        case 'description':
          fieldValue = String(mappedData.description || mappedData.objet || '');
          break;
          
        case 'type_texte':
        case 'type':
          fieldValue = String(mappedData.type || '');
          break;
          
        case 'domaine':
        case 'category':
          fieldValue = String(mappedData.category || mappedData.domaine || '');
          break;
          
        case 'langue':
        case 'language':
          fieldValue = String(mappedData.language || mappedData.langue || 'Français');
          break;
          
        case 'statut':
        case 'status':
          fieldValue = String(mappedData.status || mappedData.statut || 'En vigueur');
          break;
          
        case 'motif':
          fieldValue = String(mappedData.motif || '');
          break;
          
        case 'considerants': {
          // Extraire automatiquement les considérants du contenu
          const content = String(mappedData.content || mappedData.contenu || '');
          const considerantMatch = content.match(/considérant\s+(?:que\s+)?([^.]{50,200})/i);
          fieldValue = considerantMatch ? considerantMatch[1].trim() : '';
          break;
        }
          
        case 'article_1':
        case 'article_premier': {
          // Extraire automatiquement l'article 1 du contenu
          const contentForArticle = String(mappedData.content || mappedData.contenu || '');
          const articleMatch = contentForArticle.match(/article\s+(?:premier|1er|1)\s*:?\s*([^.]{50,300})/i);
          fieldValue = articleMatch ? articleMatch[1].trim() : '';
          break;
        }
          
        case 'dispositions_finales': {
          // Extraire automatiquement les dispositions finales
          const contentForDispositions = String(mappedData.content || mappedData.contenu || '');
          const finalMatch = contentForDispositions.match(/(?:article\s+(?:final|dernier)|dispositions?\s+finales?)\s*:?\s*([^.]{30,200})/i);
          fieldValue = finalMatch ? finalMatch[1].trim() : '';
          break;
        }
          
        case 'mots_cles':
        case 'keywords':
          fieldValue = String(mappedData.keywords || mappedData.mots_cles || '');
          break;
          
        case 'source':
          fieldValue = String(mappedData.source || 'Journal Officiel');
          break;
          
        case 'piece_jointe':
          fieldValue = String(mappedData.piece_jointe || '');
          break;
          
        default:
          // Pour les autres champs, essayer de trouver une correspondance directe
          fieldValue = String(mappedData[field.name as string] || '');
          break;
      }
      
      completeFormData[field.name as string] = fieldValue;
      
      // Log pour chaque champ mappé
      if (fieldValue) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`🎯 [LegalTextForm] Champ ${field.name} mappé vers: ${fieldValue.toString().substring(0, 100)}`);
        }
      }
    });
    
    // Logs de debug du mapping
    if (process.env.NODE_ENV === 'development') {
      console.log('🎯 [LegalTextForm] Mapping terminé. Données à injecter:', completeFormData);
      console.log('🎯 [LegalTextForm] Champs mappés:', Object.keys(completeFormData));
      console.log('🎯 [LegalTextForm] Valeurs mappées non vides:', Object.entries(completeFormData).filter(([k, v]) => v && v !== ''));
    }
    
    // S'assurer qu'un type est sélectionné (priorité aux données OCR)
    if (mappedData.type && !completeFormData.selectedType) {
      completeFormData.selectedType = String(mappedData.type);
      if (process.env.NODE_ENV === 'development') {
        console.log('🎯 [LegalTextForm] Type automatiquement sélectionné:', mappedData.type);
      }
    } else if (!completeFormData.selectedType) {
      // Fallback sur le premier type disponible
      completeFormData.selectedType = 'loi';
      if (process.env.NODE_ENV === 'development') {
        console.log('🎯 [LegalTextForm] Type par défaut sélectionné: loi');
      }
    }

    // Mise à jour du formulaire avec toutes les données
    setFormData(prev => {
      const newFormData = { ...prev, ...completeFormData };
      if (process.env.NODE_ENV === 'development') {
        console.log('🎯 [LegalTextForm] FormData après injection:', newFormData);
      }
      return newFormData;
    });
    
    // S'assurer qu'un type est sélectionné automatiquement si détecté
    if (formToUse && !selectedTextType) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🎯 [LegalTextForm] Sélection automatique du type de formulaire:', formToUse.type);
      }
      setSelectedTextType(formToUse.type);
    }
    
    // Forcer la mise à jour des données du formulaire
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 [LegalTextForm] Forçage de la mise à jour avec les données complètes:', completeFormData);
    }
    
    // Notification à l'utilisateur et redirection automatique vers le formulaire
    const filledFieldsCount = Object.values(completeFormData).filter(value => value && value !== '').length;
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ [LegalTextForm] Formulaire rempli avec', Object.keys(completeFormData).length, 'champs');
      console.log('📋 [LegalTextForm] Données du formulaire final:', completeFormData);
      console.log('📊 [LegalTextForm] Nombre de champs remplis:', filledFieldsCount);
    }
    
    toast({
      title: "Formulaire rempli par OCR",
      description: `${filledFieldsCount} champs ont été remplis automatiquement. Redirection vers le formulaire...`,
    });
    
    // Redirection vers l'onglet formulaire avec un petit délai pour permettre aux données de se propager
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 [LegalTextForm] Basculement vers le mode manuel...');
    }
    setTimeout(() => {
      setInputMethod('manual'); // Basculer vers le mode manuel pour afficher le formulaire
    }, 500);
  };

  // Process OCR data when received
  useEffect(() => {
    if (ocrData) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🎯 [LegalTextFormEnhanced] Traitement des données OCR reçues:', ocrData);
      }
      handleOCRFormDataExtracted(ocrData as { documentType: 'legal', formData: Record<string, any> });
    }
  }, [ocrData]);

  useEffect(() => {
    if (initialOCRText) {
      import('@/utils/ocrFormFiller').then(({ extractLegalTextData }) => {
        const extractedData = extractLegalTextData(initialOCRText);
        if (process.env.NODE_ENV === 'development') {
          console.log('Pré-remplissage avec OCR:', extractedData);
        }
        setFormData(extractedData);
      }).catch(() => {
        setFormData({ content: initialOCRText });
      });
    }
  }, [initialOCRText]);

  const handleOCRTextExtracted = (extractedText: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Texte OCR reçu:', extractedText.substring(0, 200) + '...');
    }
    
    import('@/utils/ocrFormFiller').then(({ extractLegalTextData }) => {
      const extractedData = extractLegalTextData(extractedText);
      if (process.env.NODE_ENV === 'development') {
        console.log('Données extraites par OCR:', extractedData);
      }
      
      // Auto-fill form based on extracted data
      setFormData(prev => ({ ...prev, ...extractedData }));
      
      // Auto-select text type if detected
      if (extractedData.type) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Auto-sélection du type:', extractedData.type);
        }
        setSelectedTextType(extractedData.type);
      }
    }).catch(error => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erreur lors de l\'extraction OCR:', error);
      }
      setFormData(prev => ({ ...prev, content: extractedText }));
    });
    
    setShowOCRScanner(false);
    setInputMethod('manual');
  };

  const handleAutoFill = () => {
    const event = new CustomEvent('open-ai-autofill', {
      detail: { context: 'legal-text' }
    });
    window.dispatchEvent(event);
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData, textType: selectedTextType, formTemplate: selectedForm };
    if (process.env.NODE_ENV === 'development') {
      console.log('Données finales du formulaire:', finalData);
    }
    onSubmit(finalData);
    toast({
      title: "Texte juridique ajouté",
      description: `Le texte juridique "${selectedForm?.name || selectedTextType}" a été ajouté avec succès.`,
    });
  };

  // Effet pour mettre à jour le formulaire sélectionné
  useEffect(() => {
    if (selectedTextType) {
      const form = uniqueLegalTextForms.find(f => f.id === selectedTextType);
      if (form) {
        setSelectedForm(form);
        // Initialiser les données du formulaire avec des valeurs vides
        const initialData: { [key: string]: string } = {};
        (form.fields as any[]).forEach((field: Record<string, unknown>) => {
          initialData[field.name as string] = '';
        });
        setFormData(prev => ({ ...prev, ...initialData }));
      }
    } else {
      setSelectedForm(null);
    }
  }, [selectedTextType, uniqueLegalTextForms]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onClose} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-600" />
                Ajout d'un Texte Juridique Algérien
              </h1>
              <p className="text-gray-600 mt-1">Saisie complète d'un texte juridique avec formulaire adapté</p>
            </div>
          </div>
          <Button onClick={handleAutoFill} variant="outline" className="gap-2 bg-purple-50 border-purple-200 hover:bg-purple-100">
            <Wand2 className="w-4 h-4 text-purple-600" />
            Auto-remplissage IA
          </Button>
        </div>
        
        {/* Formulaire d'insertion manuelle directement */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sélection du type de texte juridique */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Type de Texte Juridique
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Label htmlFor="text-type" className="text-sm font-medium text-gray-700">
                    Sélectionnez le type de texte juridique *
                  </Label>
                  <Select value={selectedTextType} onValueChange={setSelectedTextType}>
                    <SelectTrigger className="border-gray-200 focus:border-emerald-500">
                      <SelectValue placeholder={
                        uniqueLegalTextForms.length === 0 
                          ? "Aucun formulaire de texte juridique disponible dans la bibliothèque"
                          : "Choisir un type de texte juridique depuis la bibliothèque"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueLegalTextForms.map((form) => (
                        <SelectItem key={form.id} value={form.id}>
                          {form.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Formulaire dynamique adapté au type */}
            {selectedForm && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
                  <CardTitle className="text-xl text-gray-900">
                    Formulaire : {selectedForm.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {selectedForm.description || 'Remplissez les champs spécifiques à ce type de texte juridique'}
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(selectedForm.fields as any[]).map((field: Record<string, unknown>) => (
                      <div 
                        key={field.name as string} 
                        className={field.type === 'textarea' || field.type === 'dynamic-list' ? 'md:col-span-2' : ''}
                      >
                        <LegalTextDynamicFieldRenderer
                          field={field as any}
                          value={formData[field.name as string]}
                          onChange={(value) => handleFieldChange(field.name as string, String(value))}
                          formData={formData}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" onClick={onClose} className="px-8">
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="px-8 bg-emerald-600 hover:bg-emerald-700 gap-2"
                disabled={!selectedForm}
              >
                <Save className="w-4 h-4" />
                Enregistrer le texte juridique
              </Button>
            </div>
          </form>
      </div>
    </div>
  );
}

export { LegalTextFormEnhanced };
