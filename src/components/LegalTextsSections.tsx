
import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { LegalTextsTabs } from './LegalTextsTabs';
import { LegalTextFormEnhanced } from './LegalTextFormEnhanced';
import { useModalManager } from './modals/ModalManager';
import { SectionHeader } from './common/SectionHeader';

interface LegalTextsSectionsProps {
  section: string;
  language: string;
}

export function LegalTextsSections({ section, language }: LegalTextsSectionsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [ocrExtractedText, setOcrExtractedText] = useState<string>('');
  const [formInputMethod, setFormInputMethod] = useState<'manual' | 'ocr'>('manual');
  const [ocrData, setOcrData] = useState<any>(null);

  const handleOCRDataExtracted = (data: { documentType: 'legal' | 'procedure', formData: Record<string, any> }) => {
    console.log('🎯 [LegalTextsSections] Données OCR reçues:', data);
    console.log('📋 [LegalTextsSections] Type de document:', data.documentType);
    console.log('📋 [LegalTextsSections] Données formulaire:', Object.keys(data.formData));
    console.log('📋 [LegalTextsSections] État actuel showAddForm:', showAddForm);
    
    if (data.documentType === 'legal') {
      console.log('📋 [LegalTextsSections] Navigation vers le formulaire de texte juridique avec données OCR');
      setOcrData(data.formData);
      setFormInputMethod('ocr');
      setShowAddForm(true);
      console.log('✅ [LegalTextsSections] Formulaire ouvert avec données OCR');
      console.log('📋 [LegalTextsSections] Nouveau état showAddForm:', true);
    } else {
      console.warn('⚠️ [LegalTextsSections] Type de document non compatible avec les textes juridiques');
    }
  };
  const { openModal } = useModalManager();

  // Écouter l'événement de redirection OCR
  useEffect(() => {
    const handleOpenLegalTextFormOCR = () => {
      console.log('Ouverture du formulaire en mode OCR');
      setFormInputMethod('ocr');
      setShowAddForm(true);
    };

    const handleNavigateWithOCR = (event: CustomEvent) => {
      console.log('🎯 [LegalTextsSections] Réception événement OCR:', event.detail);
      setOcrData(event.detail.ocrData);
      setFormInputMethod('ocr');
      setShowAddForm(true);
    };

    window.addEventListener('open-legal-text-form-ocr', handleOpenLegalTextFormOCR);
    window.addEventListener('navigate-to-legal-form-with-ocr', handleNavigateWithOCR as EventListener);
    
    return () => {
      window.removeEventListener('open-legal-text-form-ocr', handleOpenLegalTextFormOCR);
      window.removeEventListener('navigate-to-legal-form-with-ocr', handleNavigateWithOCR as EventListener);
    };
  }, []);

  const handleAddLegalText = () => {
    console.log('🎯 [LegalTextsSections] Ouverture formulaire manuel');
    setFormInputMethod('manual');
    setShowAddForm(true);
  };

  const handleOCRTextExtracted = (text: string) => {
    console.log('Texte OCR reçu dans LegalTextsSections:', text);
    setOcrExtractedText(text);
    setFormInputMethod('ocr');
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setFormInputMethod('manual');
    setOcrExtractedText('');
  };

  const handleLegalTextSubmitted = (data: Record<string, unknown>) => {
    setShowAddForm(false);
    setFormInputMethod('manual');
    setOcrExtractedText('');
    setOcrData(null);
    
    // Enregistrer dans le fil d'approbation
    const event = new CustomEvent('add-to-approval-queue', {
      detail: {
        type: 'legal-text',
        data: data,
        title: data.titre || data.name || 'Nouveau texte juridique',
        description: data.description || 'Texte juridique'
      }
    });
    window.dispatchEvent(event);
    
    // Notification will be handled by the event listener
  };

  const getSectionTitle = () => {
    const titles = {
      fr: {
        'legal-catalog': 'Catalogue des Textes Juridiques',
        'legal-enrichment': 'Alimentation de la Banque de Données',
        'legal-search': 'Recherche de Textes Juridiques'
      },
      ar: {
        'legal-catalog': 'كتالوج النصوص القانونية',
        'legal-enrichment': 'إثراء قاعدة البيانات',
        'legal-search': 'البحث في النصوص القانونية'
      },
      en: {
        'legal-catalog': 'Legal Texts Catalog',
        'legal-enrichment': 'Database Enrichment',
        'legal-search': 'Legal Texts Search'
      }
    };
    return titles[language as keyof typeof titles]?.[section as keyof typeof titles['fr']] || 'Textes Juridiques';
  };

  const getSectionDescription = () => {
    const descriptions = {
      fr: {
        'legal-catalog': 'Consultez et gérez l\'ensemble des textes juridiques algériens disponibles dans la plateforme.',
        'legal-enrichment': 'Ajoutez et enrichissez la base de données avec de nouveaux textes juridiques.',
        'legal-search': 'Recherchez efficacement dans la collection complète de textes juridiques.'
      },
      ar: {
        'legal-catalog': 'استعرض وأدر جميع النصوص القانونية الجزائرية المتاحة في المنصة.',
        'legal-enrichment': 'أضف وأثر قاعدة البيانات بنصوص قانونية جديدة.',
        'legal-search': 'ابحث بكفاءة في المجموعة الكاملة من النصوص القانونية.'
      },
      en: {
        'legal-catalog': 'Browse and manage all Algerian legal texts available on the platform.',
        'legal-enrichment': 'Add and enrich the database with new legal texts.',
        'legal-search': 'Search efficiently through the complete collection of legal texts.'
      }
    };
    return descriptions[language as keyof typeof descriptions]?.[section as keyof typeof descriptions['fr']];
  };

  if (showAddForm) {
    return (
      <LegalTextFormEnhanced 
        onClose={handleCloseForm} 
        onSubmit={handleLegalTextSubmitted}
        initialOCRText={ocrExtractedText}
        initialInputMethod={formInputMethod}
        ocrData={ocrData}
      />
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title={getSectionTitle()}
        description={getSectionDescription() || ''}
        icon={FileText}
        iconColor="text-blue-600"
      />
      
      <LegalTextsTabs 
        section={section} 
        onAddLegalText={handleAddLegalText}
        onOCRTextExtracted={handleOCRTextExtracted}
        onOCRDataExtracted={handleOCRDataExtracted}
      />
    </div>
  );
}
