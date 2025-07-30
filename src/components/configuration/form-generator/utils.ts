// @ts-nocheck
import { FormField } from "./types";
import { organizationOptions } from "./data";

export const getFieldType = (fieldName: string) => {
  if (fieldName.includes('date')) return 'date';
  if (fieldName.includes('numero') || fieldName.includes('cout') || fieldName.includes('capital')) return 'number';
  if (fieldName.includes('contenu') || fieldName.includes('description') || fieldName.includes('observations')) return 'textarea';
  if (fieldName.includes('email')) return 'email';
  if (fieldName.includes('tel') || fieldName.includes('phone')) return 'tel';
  if (fieldName.includes('url') || fieldName.includes('site')) return 'url';
  if (fieldName === 'organisation') return 'select'; // Champ organisation doit être une liste déroulante
  if (fieldName.includes('ministere') || fieldName.includes('ministeres')) return 'select';
  return 'text';
};

export const isRequiredField = (fieldName: string) => {
  const requiredFields = ['titre', 'nom_procedure', 'numero', 'date'];
  return requiredFields.some(req => fieldName.includes(req));
};

export const getFieldDescription = (fieldName: string) => {
  const descriptions: { [key: string]: string } = {
    'titre': 'Titre officiel du document',
    'numero': 'Numéro d\'identification unique',
    'date_promulgation': 'Date de promulgation officielle',
    'date_signature': 'Date de signature du document',
    'journal_officiel': 'Référence du Journal Officiel',
    'contenu': 'Contenu complet du texte',
    'domaine_juridique': 'Domaine juridique concerné',
    'organisation': 'Organisation responsable (selon l\'onglet Organisation)',
    'signataire': 'Personne ou autorité signataire',
    'ministere': 'Ministère concerné',
    'ministeres': 'Ministères concernés (si plusieurs)',
    'autorite': 'Autorité responsable',
    'nom_procedure': 'Nom de la procédure administrative',
    'documents_requis': 'Liste des documents nécessaires',
    'delai_traitement': 'Délai de traitement estimé',
    'cout': 'Coût de la procédure en DA',
    'lieu_depot': 'Lieu de dépôt de la demande',
    'conditions': 'Conditions requises pour la procédure',
    'pieces_jointes': 'Pièces jointes nécessaires',
    'observations': 'Observations et remarques importantes',
    'type_permis': 'Type de permis demandé',
    'surface': 'Surface concernée',
    'localisation': 'Localisation du projet',
    'documents_techniques': 'Documents techniques requis',
    'frais': 'Frais de la procédure',
    'commission': 'Commission d\'examen',
    'zone': 'Zone géographique concernée',
    'contraintes': 'Contraintes et restrictions'
  };
  return descriptions[fieldName] || `Information relative à ${fieldName.replace(/_/g, ' ')}`;
};

export const parseTextToFormFields = (text: string): FormField[] => {
  const lines = text.split('\n').filter(line => line.trim());
  const fields: FormField[] = [];
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.length > 0) {
      // Détecter les types de champs basés sur le contenu
      let fieldType = 'text';
      const fieldName = trimmedLine.toLowerCase().replace(/[^a-z0-9]/g, '_');
      
      if (trimmedLine.toLowerCase().includes('date')) fieldType = 'date';
      else if (trimmedLine.toLowerCase().includes('email')) fieldType = 'email';
      else if (trimmedLine.toLowerCase().includes('téléphone') || trimmedLine.toLowerCase().includes('tel')) fieldType = 'tel';
      else if (trimmedLine.toLowerCase().includes('nombre') || /\d+/.test(trimmedLine)) fieldType = 'number';
      else if (trimmedLine.length > 50) fieldType = 'textarea';
      
      fields.push({
        id: `ocr_field_${index}`,
        name: fieldName,
        label: trimmedLine,
        type: fieldType,
        required: false,
        placeholder: `Saisir ${trimmedLine.toLowerCase()}`,
        description: `Champ généré à partir du texte: "${trimmedLine}"`
      });
    }
  });
  
  return fields;
};

// Nouvelle fonction pour analyser et mapper le texte OCR vers les formulaires existants
export const parseOCRTextToFormData = (text: string): { documentType: 'legal' | 'procedure', formData: Record<string, unknown> } => {
  const lowerText = text.toLowerCase();
  
  // Détecter le type de document avec plus de précision
  const isLegalDocument = lowerText.includes('décret') || lowerText.includes('arrêté') || 
                         lowerText.includes('loi') || lowerText.includes('ordonnance') ||
                         lowerText.includes('journal officiel') || lowerText.includes('promulgation') ||
                         lowerText.includes('république algérienne') || lowerText.includes('ministère');
  
  const isProcedureDocument = lowerText.includes('procédure') || lowerText.includes('demande') ||
                             lowerText.includes('dossier') || lowerText.includes('formulaire') ||
                             lowerText.includes('pièces jointes') || lowerText.includes('délai') ||
                             lowerText.includes('documents requis') || lowerText.includes('étapes');
  
  const documentType = isLegalDocument ? 'legal' : 'procedure';
  const formData: Record<string, any> = {};
  
  // Patterns étendus pour une extraction plus complète
  const patterns = {
    // Patterns pour textes juridiques
    titre: /(?:titre|intitulé|objet|décret|arrêté|loi)\s*(?:n°|numéro)?\s*[0-9-/]*\s*(?:du|de)?\s*[0-9/-]*\s*(?:portant|relatif)?\s*:?\s*([^\n\r.]{10,})/i,
    numero: /(?:n°|numéro|num|décret|arrêté)\s*:?\s*([0-9]{2,}[-/][0-9]{1,4}|[0-9]{3,})/i,
    date_promulgation: /(?:promulgu[eé]|sign[eé]|dat[eé]|du)\s+(?:le\s+)?([0-9]{1,2}[/-][0-9]{1,2}[/-][0-9]{4})/i,
    journal_officiel: /(?:journal officiel|j\.o\.?|jo)\s*:?\s*n°?\s*([0-9]+[^\n\r]*)/i,
    signataire: /(?:sign[eé] par|signataire|le ministre|président)\s*:?\s*([^\n\r]{5,50})/i,
    ministere: /(?:ministère|ministre)\s+(?:de\s+|du\s+|des\s+|chargé)?([^\n\r]{5,50})/i,
    autorite: /(?:autorité|responsable|chef)\s*:?\s*([^\n\r]{5,50})/i,
    domaine_juridique: /(?:domaine|secteur|matière)\s*:?\s*([^\n\r]{5,30})/i,
    
    // Patterns pour procédures - extraction plus détaillée
    nom_procedure: /(?:procédure|demande|dossier|service)\s+(?:de\s+|du\s+|des\s+|pour\s+)?([^\n\r]{10,80})/i,
    documents_requis: /(?:documents?\s+(?:requis|nécessaires?|à fournir|demandés)|pièces?\s+(?:jointes?|à joindre|requises))\s*:?\s*([^.]{20,200})/i,
    delai_traitement: /(?:délai|durée|temps)\s+(?:de\s+)?(?:traitement|instruction|réponse)\s*:?\s*([^\n\r]{5,50})/i,
    cout: /(?:coût|frais|montant|tarif|prix)\s*:?\s*([0-9\s,.]+)\s*(?:da|dinars?|€|euros?)/i,
    lieu_depot: /(?:lieu|adresse|bureau|service)\s+(?:de\s+)?(?:dépôt|soumission|réception)\s*:?\s*([^\n\r]{10,100})/i,
    conditions: /(?:conditions?|critères?|exigences?|prérequis)\s*:?\s*([^.]{20,150})/i,
    etapes: /(?:étapes?|phases?|procédure)\s*:?\s*([^.]{20,200})/i,
    observations: /(?:observations?|remarques?|notes?|précisions?)\s*:?\s*([^.]{10,100})/i
  };
  
  // Extraire les informations avec les patterns
  for (const [fieldName, pattern] of Object.entries(patterns)) {
    const match = text.match(pattern);
    if (match && match[1]) {
      formData[fieldName] = match[1].trim().replace(/\s+/g, ' ');
    }
  }
  
  // Extraction intelligente de sections pour distribuer le contenu
  const lines = text.split('\n').filter(line => line.trim().length > 5);
  
  // Pour les textes juridiques
  if (documentType === 'legal') {
    // Si pas de titre trouvé, chercher dans les premières lignes
    if (!formData.titre) {
      const titleLine = lines.find(line => 
        line.length > 15 && line.length < 150 && 
        (line.toLowerCase().includes('décret') || 
         line.toLowerCase().includes('arrêté') ||
         line.toLowerCase().includes('loi') ||
         line.toLowerCase().includes('portant'))
      );
      if (titleLine) formData.titre = titleLine.trim();
    }
    
    // Extraire l'article principal
    const articleMatch = text.match(/article\s+(?:premier|1er|1)\s*:?\s*([^.]{20,300})/i);
    if (articleMatch) {
      formData.article_principal = articleMatch[1].trim();
    }
    
    // Organisation par défaut basée sur le ministère détecté
    if (formData.ministere) {
      formData.organisation = formData.ministere;
    }
  }
  
  // Pour les procédures administratives
  if (documentType === 'procedure') {
    // Si pas de nom de procédure, prendre la première ligne significative
    if (!formData.nom_procedure) {
      const procedureLine = lines.find(line => 
        line.length > 10 && line.length < 100 &&
        !line.toLowerCase().includes('république') &&
        !line.toLowerCase().includes('ministère')
      );
      if (procedureLine) formData.nom_procedure = procedureLine.trim();
    }
    
    // Extraction des étapes si pas trouvées
    if (!formData.etapes) {
      const stepLines = lines.filter(line => 
        line.match(/^\s*[0-9-*•]\s*/) || 
        line.toLowerCase().includes('étape') ||
        line.toLowerCase().includes('phase')
      );
      if (stepLines.length > 0) {
        formData.etapes = stepLines.join(' | ');
      }
    }
    
    // Détection automatique de la catégorie
    const content = text.toLowerCase();
    if (content.includes('commerce') || content.includes('entreprise') || content.includes('société')) {
      formData.procedureCategory = 'Commerce';
    } else if (content.includes('urbanisme') || content.includes('construction') || content.includes('permis')) {
      formData.procedureCategory = 'Urbanisme';
    } else if (content.includes('état civil') || content.includes('naissance') || content.includes('mariage')) {
      formData.procedureCategory = 'État civil';
    } else if (content.includes('fiscalité') || content.includes('impôt') || content.includes('taxe')) {
      formData.procedureCategory = 'Fiscalité';
    } else if (content.includes('santé') || content.includes('médical') || content.includes('hôpital')) {
      formData.procedureCategory = 'Santé';
    }
  }
  
  // Extraire le contenu principal (tout le texte)
  formData.contenu = text.trim();
  
  // Ajout de métadonnées
  formData.date_extraction = new Date().toLocaleDateString('fr-FR');
  formData.source_ocr = true;
  
  // Ajouter des valeurs par défaut selon le type
  if (documentType === 'legal') {
    formData.domaine_juridique = formData.domaine_juridique || 'Droit administratif';
    formData.organisation = formData.organisation || 'À sélectionner';
    formData.statut = 'Publié';
  } else {
    formData.type_procedure = formData.type_procedure || 'Administrative';
    formData.statut = formData.statut || 'Active';
    formData.sectorAdministration = formData.organisation || 'À sélectionner';
  }
  
  return { documentType, formData };
};

export const generateFormFields = (selectedFormType: string, selectedFormList: string, formLists: Record<string, unknown>): FormField[] => {
  const selectedType = selectedFormType as keyof typeof formLists;
  const selectedForm = formLists[selectedType]?.find((form: Record<string, unknown>) => form.value === selectedFormList);
  
  if (selectedForm) {
    const fields: FormField[] = selectedForm.fields.map((field: string, index: number) => {
      const fieldType = getFieldType(field);
      let options: string[] | undefined;
      
      // Ajouter les options pour les champs de type select
      if (field === 'organisation') {
        options = organizationOptions;
      } else if (field === 'ministere' || field === 'ministeres') {
        options = organizationOptions.filter(org => org.includes('Ministère'));
      }
      
      return {
        id: `field_${index}`,
        name: field,
        label: field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        type: fieldType,
        required: isRequiredField(field),
        placeholder: fieldType === 'select' ? `Sélectionner ${field.replace(/_/g, ' ').toLowerCase()}` : `Saisir ${field.replace(/_/g, ' ').toLowerCase()}`,
        description: getFieldDescription(field),
        options: options
      };
    });
    return fields;
  }
  return [];
};