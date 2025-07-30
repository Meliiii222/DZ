import { DocumentExtractor, ExtractedDocument } from './documentExtractor';

interface AlgerianLegalTextFormData {
  title?: string;
  type?: string;
  category?: string;
  authority?: string;
  reference?: string;
  publicationDate?: string;
  description?: string;
  language?: 'fr' | 'ar' | 'mixed';
  journal_numero?: string;
  date_journal?: string;
  numero_page?: number;
  en_tete?: string;
  content?: string;
  institution?: string;
  wilaya?: string;
  commune?: string;
  signatory?: string;
  promulgation_date?: string;
  effective_date?: string;
  modification_date?: string;
  abrogation_date?: string;
  legal_basis?: string[];
  related_texts?: string[];
  documentFormat?: string;
  extractionMetadata?: Record<string, unknown>;
}

interface AlgerianProcedureFormData {
  name?: string;
  type?: string;
  description?: string;
  sector?: string;
  reference?: string;
  institution?: string;
  wilaya?: string;
  commune?: string;
  target_audience?: string;
  required_documents?: string[];
  steps?: string[];
  duration?: string;
  cost?: string;
  location?: string;
  contact_info?: string;
  legal_basis?: string[];
  conditions?: string[];
  language?: 'fr' | 'ar' | 'mixed';
  documentFormat?: string;
  extractionMetadata?: Record<string, unknown>;
}

// Patterns spécifiques aux documents juridiques algériens
const ALGERIAN_LEGAL_PATTERNS = {
  // En-têtes officiels
  header: [
    /République\s+Algérienne\s+Démocratique\s+et\s+Populaire/gi,
    /الجمهورية\s+الجزائرية\s+الديمقراطية\s+الشعبية/g,
    /RÉPUBLIQUE\s+ALGÉRIENNE\s+DÉMOCRATIQUE\s+ET\s+POPULAIRE/g
  ],
  
  // Types de textes juridiques algériens
  type: [
    /\b(Constitution|constitution|CONSTITUTION)\b/g,
    /\b(Loi\s+organique|loi\s+organique|LOI\s+ORGANIQUE)\b/g,
    /\b(Loi|loi|LOI)\b/g,
    /\b(Ordonnance|ordonnance|ORDONNANCE)\b/g,
    /\b(Décret\s+exécutif|décret\s+exécutif|DÉCRET\s+EXÉCUTIF)\b/g,
    /\b(Décret\s+présidentiel|décret\s+présidentiel|DÉCRET\s+PRÉSIDENTIEL)\b/g,
    /\b(Arrêté\s+ministériel|arrêté\s+ministériel|ARRÊTÉ\s+MINISTÉRIEL)\b/g,
    /\b(Arrêté\s+interministériel|arrêté\s+interministériel|ARRÊTÉ\s+INTERMINISTÉRIEL)\b/g,
    /\b(Arrêté|arrêté|ARRÊTÉ)\b/g,
    /\b(Décision|décision|DÉCISION)\b/g,
    /\b(Instruction|instruction|INSTRUCTION)\b/g,
    /\b(Circulaire|circulaire|CIRCULAIRE)\b/g,
    /\b(Code\s+civil|code\s+civil|CODE\s+CIVIL)\b/g,
    /\b(Code\s+pénal|code\s+pénal|CODE\s+PÉNAL)\b/g,
    /\b(Code\s+de\s+commerce|code\s+de\s+commerce|CODE\s+DE\s+COMMERCE)\b/g
  ],
  
  // Numéros de référence algériens
  reference: [
    /n°\s*(\d{2,3}[-/]\d{2,4})/gi,
    /N°\s*(\d{2,3}[-/]\d{2,4})/g,
    /numéro\s*(\d{2,3}[-/]\d{2,4})/gi,
    /رقم\s*(\d{2,3}[-/]\d{2,4})/g
  ],
  
  // Dates algériennes
  date: [
    /\b(\d{1,2}[-/\s]\d{1,2}[-/\s]\d{4})\b/g,
    /\b(\d{4}[-/\s]\d{1,2}[-/\s]\d{1,2})\b/g,
    /\b(\d{1,2}\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+\d{4})\b/gi,
    /\b(\d{1,2}\s+(محرم|صفر|ربيع الأول|ربيع الثاني|جمادى الأولى|جمادى الثانية|رجب|شعبان|رمضان|شوال|ذو القعدة|ذو الحجة)\s+\d{4})\b/g
  ],
  
  // Journal officiel
  journal: [
    /journal\s*officiel.*?n°?\s*(\d+)/gi,
    /الجريدة\s*الرسمية.*?رقم\s*(\d+)/g,
    /J\.O\.R\.A\.D\.P.*?n°\s*(\d+)/gi
  ],
  
  // Institutions algériennes
  institutions: [
    /Présidence\s+de\s+la\s+République/gi,
    /Premier\s+Ministère/gi,
    /Ministère\s+de\s+la\s+Justice/gi,
    /Ministère\s+de\s+l'Intérieur\s+et\s+des\s+Collectivités\s+locales/gi,
    /Ministère\s+des\s+Finances/gi,
    /Ministère\s+du\s+Commerce/gi,
    /Ministère\s+de\s+l'Agriculture/gi,
    /Ministère\s+de\s+la\s+Santé/gi,
    /Ministère\s+de\s+l'Éducation\s+nationale/gi,
    /Ministère\s+de\s+l'Enseignement\s+supérieur/gi,
    /Wilaya\s+de\s+([A-Za-zÀ-ÿ\s]+)/gi,
    /Commune\s+de\s+([A-Za-zÀ-ÿ\s]+)/gi
  ],
  
  // Signataires
  signatories: [
    /Le\s+Président\s+de\s+la\s+République/gi,
    /Le\s+Premier\s+Ministre/gi,
    /Le\s+Ministre\s+de\s+([A-Za-zÀ-ÿ\s]+)/gi,
    /Le\s+Wali\s+de\s+([A-Za-zÀ-ÿ\s]+)/gi,
    /رئيس\s+الجمهورية/g,
    /الوزير\s+الأول/g
  ],
  
  // Bases juridiques
  legal_basis: [
    /vu\s+la\s+Constitution/gi,
    /vu\s+la\s+loi\s+n°\s*(\d+[-/]\d+)/gi,
    /vu\s+l'ordonnance\s+n°\s*(\d+[-/]\d+)/gi,
    /vu\s+le\s+décret\s+n°\s*(\d+[-/]\d+)/gi,
    /بناء\s+على\s+الدستور/g,
    /بناء\s+على\s+القانون\s+رقم\s*(\d+[-/]\d+)/g
  ]
};

// Patterns pour les procédures administratives algériennes
const ALGERIAN_PROCEDURE_PATTERNS = {
  // Types de procédures
  type: [
    /\b(Demande|demande|DEMANDE)\b/g,
    /\b(Autorisation|autorisation|AUTORISATION)\b/g,
    /\b(Licence|licence|LICENCE)\b/g,
    /\b(Permis|permis|PERMIS)\b/g,
    /\b(Certificat|certificat|CERTIFICAT)\b/g,
    /\b(Déclaration|déclaration|DÉCLARATION)\b/g,
    /\b(Carte|carte|CARTE)\b/g,
    /\b(Attestation|attestation|ATTESTATION)\b/g,
    /\b(Inscription|inscription|INSCRIPTION)\b/g,
    /\b(Enregistrement|enregistrement|ENREGISTREMENT)\b/g
  ],
  
  // Public cible
  target_audience: [
    /citoyens?\s+algériens?/gi,
    /personnes?\s+physiques?/gi,
    /personnes?\s+morales?/gi,
    /entreprises?/gi,
    /associations?/gi,
    /étrangers?\s+résidents?/gi,
    /المواطنون\s+الجزائريون/g,
    /الأشخاص\s+الطبيعيون/g,
    /الأشخاص\s+المعنويون/g
  ],
  
  // Secteurs d'activité
  sectors: [
    /commerce/gi,
    /industrie/gi,
    /agriculture/gi,
    /transport/gi,
    /urbanisme/gi,
    /construction/gi,
    /éducation/gi,
    /santé/gi,
    /environnement/gi,
    /fonction\s+publique/gi,
    /état\s+civil/gi,
    /fiscalité/gi
  ],
  
  // Documents requis
  required_documents: [
    /acte\s+de\s+naissance/gi,
    /certificat\s+de\s+résidence/gi,
    /casier\s+judiciaire/gi,
    /certificat\s+médical/gi,
    /diplôme/gi,
    /pièce\s+d'identité/gi,
    /passeport/gi,
    /permis\s+de\s+conduire/gi,
    /extrait\s+de\s+naissance/gi,
    /certificat\s+de\s+nationalité/gi,
    /شهادة\s+الميلاد/g,
    /شهادة\s+الإقامة/g,
    /بطاقة\s+التعريف/g
  ],
  
  // Lieux de dépôt
  locations: [
    /wilaya/gi,
    /daïra/gi,
    /commune/gi,
    /mairie/gi,
    /préfecture/gi,
    /bureau\s+de\s+poste/gi,
    /centre\s+des\s+impôts/gi,
    /tribunal/gi,
    /الولاية/g,
    /الدائرة/g,
    /البلدية/g
  ],
  
  // Durées de traitement
  duration: [
    /(\d+)\s+jours?\s+ouvrables?/gi,
    /(\d+)\s+semaines?/gi,
    /(\d+)\s+mois/gi,
    /immédiat/gi,
    /sur\s+place/gi,
    /(\d+)\s+يوم\s+عمل/g,
    /(\d+)\s+أسبوع/g,
    /(\d+)\s+شهر/g
  ],
  
  // Coûts
  cost: [
    /gratuit/gi,
    /(\d+)\s+DA/gi,
    /(\d+)\s+dinars?/gi,
    /timbre\s+fiscal/gi,
    /droit\s+de\s+timbre/gi,
    /مجاني/g,
    /(\d+)\s+دينار/g
  ]
};

export function extractAlgerianLegalTextData(ocrText: string, language: 'fr' | 'ar' | 'mixed' = 'fr'): Partial<AlgerianLegalTextFormData> {
  console.log('🇩🇿 Extraction OCR texte juridique algérien:', ocrText.substring(0, 200) + '...');
  const data: Partial<AlgerianLegalTextFormData> = {};
  
  // Extraction de l'en-tête officiel
  for (const pattern of ALGERIAN_LEGAL_PATTERNS.header) {
    const match = ocrText.match(pattern);
    if (match) {
      data.en_tete = match[0];
      break;
    }
  }
  
  // Extraction du type de texte juridique
  for (const pattern of ALGERIAN_LEGAL_PATTERNS.type) {
    const match = ocrText.match(pattern);
    if (match) {
      const detectedType = match[0].toLowerCase().trim();
      if (detectedType.includes('constitution')) data.type = 'Constitution';
      else if (detectedType.includes('loi organique')) data.type = 'Loi Organique';
      else if (detectedType.includes('loi')) data.type = 'Loi';
      else if (detectedType.includes('ordonnance')) data.type = 'Ordonnance';
      else if (detectedType.includes('décret exécutif')) data.type = 'Décret exécutif';
      else if (detectedType.includes('décret présidentiel')) data.type = 'Décret présidentiel';
      else if (detectedType.includes('arrêté ministériel')) data.type = 'Arrêté ministériel';
      else if (detectedType.includes('arrêté interministériel')) data.type = 'Arrêté interministériel';
      else if (detectedType.includes('arrêté')) data.type = 'Arrêté';
      else if (detectedType.includes('décision')) data.type = 'Décision';
      else if (detectedType.includes('instruction')) data.type = 'Instruction';
      else if (detectedType.includes('circulaire')) data.type = 'Circulaire';
      else if (detectedType.includes('code civil')) data.type = 'Code';
      else if (detectedType.includes('code pénal')) data.type = 'Code';
      else if (detectedType.includes('code de commerce')) data.type = 'Code';
      break;
    }
  }
  
  // Extraction de la référence
  for (const pattern of ALGERIAN_LEGAL_PATTERNS.reference) {
    const match = ocrText.match(pattern);
    if (match && match[1]) {
      data.reference = match[1];
      break;
    }
  }
  
  // Extraction des dates
  for (const pattern of ALGERIAN_LEGAL_PATTERNS.date) {
    const matches = ocrText.match(pattern);
    if (matches && matches.length > 0) {
      // Première date trouvée = date de publication
      data.publicationDate = matches[0];
      // Si plusieurs dates, la dernière pourrait être la date d'effet
      if (matches.length > 1) {
        data.effective_date = matches[matches.length - 1];
      }
      break;
    }
  }
  
  // Extraction du numéro de journal officiel
  for (const pattern of ALGERIAN_LEGAL_PATTERNS.journal) {
    const match = ocrText.match(pattern);
    if (match) {
      const numberMatch = match[0].match(/(\d+)/);
      if (numberMatch) {
        data.journal_numero = numberMatch[1];
      }
      break;
    }
  }
  
  // Extraction des institutions
  for (const pattern of ALGERIAN_LEGAL_PATTERNS.institutions) {
    const match = ocrText.match(pattern);
    if (match) {
      data.institution = match[0];
      
      // Extraction spécifique des wilayas et communes
      if (match[0].toLowerCase().includes('wilaya')) {
        const wilayaMatch = match[0].match(/wilaya\s+de\s+([A-Za-zÀ-ÿ\s]+)/i);
        if (wilayaMatch) data.wilaya = wilayaMatch[1].trim();
      }
      if (match[0].toLowerCase().includes('commune')) {
        const communeMatch = match[0].match(/commune\s+de\s+([A-Za-zÀ-ÿ\s]+)/i);
        if (communeMatch) data.commune = communeMatch[1].trim();
      }
      break;
    }
  }
  
  // Extraction du signataire
  for (const pattern of ALGERIAN_LEGAL_PATTERNS.signatories) {
    const match = ocrText.match(pattern);
    if (match) {
      data.signatory = match[0];
      break;
    }
  }
  
  // Extraction des bases juridiques
  const legalBases: string[] = [];
  for (const pattern of ALGERIAN_LEGAL_PATTERNS.legal_basis) {
    const matches = ocrText.match(pattern);
    if (matches) {
      legalBases.push(...matches);
    }
  }
  if (legalBases.length > 0) {
    data.legal_basis = legalBases;
  }
  
  // Extraction du titre (patterns spécifiques aux textes algériens)
  const titlePatterns = [
    /portant\s+([^.]+)/gi,
    /relative?\s+à\s+([^.]+)/gi,
    /concernant\s+([^.]+)/gi,
    /modifiant\s+([^.]+)/gi,
    /complétant\s+([^.]+)/gi,
    /fixant\s+([^.]+)/gi,
    /déterminant\s+([^.]+)/gi,
    /définissant\s+([^.]+)/gi
  ];
  
  for (const pattern of titlePatterns) {
    const match = ocrText.match(pattern);
    if (match && match[1]) {
      data.title = match[1].trim();
      break;
    }
  }
  
  // Si pas de titre spécifique, prendre la première ligne significative
  if (!data.title) {
    const lines = ocrText.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 20)
      .filter(line => !line.match(/journal|page|n°|date|république/i));
    if (lines.length > 0) {
      data.title = lines[0];
    }
  }
  
  // Détection de la catégorie/domaine juridique
  const domainPatterns = [
    { pattern: /(commercial|commerce|entreprise|société)/gi, domain: 'Droit Commercial' },
    { pattern: /(civil|famille|mariage|divorce)/gi, domain: 'Droit Civil' },
    { pattern: /(pénal|criminel|infraction|délit)/gi, domain: 'Droit Pénal' },
    { pattern: /(administratif|fonction publique|service public)/gi, domain: 'Droit Administratif' },
    { pattern: /(fiscal|impôt|taxe|douane)/gi, domain: 'Droit Fiscal' },
    { pattern: /(travail|emploi|salarié|syndicat)/gi, domain: 'Droit Social' },
    { pattern: /(environnement|pollution|écologie)/gi, domain: 'Droit de l\'Environnement' },
    { pattern: /(urbanisme|construction|habitat)/gi, domain: 'Droit de l\'Urbanisme' }
  ];
  
  for (const { pattern, domain } of domainPatterns) {
    if (ocrText.match(pattern)) {
      data.category = domain;
      break;
    }
  }
  
  // Langue du document
  data.language = language;
  
  // Contenu complet
  data.content = ocrText.trim();
  
  console.log('🇩🇿 Données juridiques algériennes extraites:', data);
  return data;
}

export function extractAlgerianProcedureData(ocrText: string, language: 'fr' | 'ar' | 'mixed' = 'fr'): Partial<AlgerianProcedureFormData> {
  console.log('🇩🇿 Extraction OCR procédure administrative algérienne:', ocrText.substring(0, 200) + '...');
  const data: Partial<AlgerianProcedureFormData> = {};
  
  // Extraction du type de procédure
  for (const pattern of ALGERIAN_PROCEDURE_PATTERNS.type) {
    const match = ocrText.match(pattern);
    if (match) {
      const detectedType = match[0].toLowerCase().trim();
      if (detectedType.includes('demande')) data.type = 'Demande';
      else if (detectedType.includes('autorisation')) data.type = 'Autorisation';
      else if (detectedType.includes('licence')) data.type = 'Licence';
      else if (detectedType.includes('permis')) data.type = 'Permis';
      else if (detectedType.includes('certificat')) data.type = 'Certificat';
      else if (detectedType.includes('déclaration')) data.type = 'Déclaration';
      else if (detectedType.includes('carte')) data.type = 'Carte';
      else if (detectedType.includes('attestation')) data.type = 'Attestation';
      else if (detectedType.includes('inscription')) data.type = 'Inscription';
      else if (detectedType.includes('enregistrement')) data.type = 'Enregistrement';
      break;
    }
  }
  
  // Extraction du public cible
  for (const pattern of ALGERIAN_PROCEDURE_PATTERNS.target_audience) {
    const match = ocrText.match(pattern);
    if (match) {
      const target = match[0].toLowerCase();
      if (target.includes('citoyen')) data.target_audience = 'Citoyens algériens';
      else if (target.includes('personne physique')) data.target_audience = 'Personnes physiques';
      else if (target.includes('personne morale')) data.target_audience = 'Personnes morales';
      else if (target.includes('entreprise')) data.target_audience = 'Entreprises';
      else if (target.includes('association')) data.target_audience = 'Associations';
      else if (target.includes('étranger')) data.target_audience = 'Étrangers résidents';
      break;
    }
  }
  
  // Extraction du secteur
  for (const pattern of ALGERIAN_PROCEDURE_PATTERNS.sectors) {
    const match = ocrText.match(pattern);
    if (match) {
      const sector = match[0].toLowerCase();
      if (sector.includes('commerce')) data.sector = 'Commerce';
      else if (sector.includes('industrie')) data.sector = 'Industrie';
      else if (sector.includes('agriculture')) data.sector = 'Agriculture';
      else if (sector.includes('transport')) data.sector = 'Transport';
      else if (sector.includes('urbanisme') || sector.includes('construction')) data.sector = 'Urbanisme';
      else if (sector.includes('éducation')) data.sector = 'Éducation';
      else if (sector.includes('santé')) data.sector = 'Santé';
      else if (sector.includes('environnement')) data.sector = 'Environnement';
      else if (sector.includes('fonction publique')) data.sector = 'Fonction Publique';
      else if (sector.includes('état civil')) data.sector = 'État Civil';
      else if (sector.includes('fiscalité')) data.sector = 'Fiscalité';
      break;
    }
  }
  
  // Extraction des documents requis
  const requiredDocs: string[] = [];
  for (const pattern of ALGERIAN_PROCEDURE_PATTERNS.required_documents) {
    const matches = ocrText.match(pattern);
    if (matches) {
      requiredDocs.push(...matches.map(doc => doc.trim()));
    }
  }
  if (requiredDocs.length > 0) {
    data.required_documents = [...new Set(requiredDocs)]; // Supprimer les doublons
  }
  
  // Extraction des lieux de dépôt
  for (const pattern of ALGERIAN_PROCEDURE_PATTERNS.locations) {
    const match = ocrText.match(pattern);
    if (match) {
      data.location = match[0];
      
      // Extraction spécifique des wilayas et communes
      if (match[0].toLowerCase().includes('wilaya')) {
        data.wilaya = match[0];
      }
      if (match[0].toLowerCase().includes('commune') || match[0].toLowerCase().includes('mairie')) {
        data.commune = match[0];
      }
      break;
    }
  }
  
  // Extraction de la durée de traitement
  for (const pattern of ALGERIAN_PROCEDURE_PATTERNS.duration) {
    const match = ocrText.match(pattern);
    if (match) {
      data.duration = match[0];
      break;
    }
  }
  
  // Extraction du coût
  for (const pattern of ALGERIAN_PROCEDURE_PATTERNS.cost) {
    const match = ocrText.match(pattern);
    if (match) {
      data.cost = match[0];
      break;
    }
  }
  
  // Extraction du nom de la procédure
  const namePatterns = [
    /(?:demande|procédure|formalité)\s+(?:de|d'|pour)\s+([^.]{10,100})/gi,
    /(?:obtention|délivrance)\s+(?:de|d'|du)\s+([^.]{10,100})/gi,
    /([^.]{20,120})\s*(?:\n|\r)/m
  ];
  
  for (const pattern of namePatterns) {
    const match = ocrText.match(pattern);
    if (match && match[1]) {
      data.name = match[1].trim();
      break;
    }
  }
  
  // Si pas de nom spécifique, utiliser la première ligne significative
  if (!data.name) {
    const lines = ocrText.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 15 && !line.match(/date|page|n°|wilaya|commune/i));
    if (lines.length > 0) {
      data.name = lines[0];
    }
  }
  
  // Extraction des étapes (patterns algériens)
  const stepPatterns = [
    /étape\s+\d+\s*:?\s*([^.]{10,200})/gi,
    /\d+\)\s+([^.]{10,200})/g,
    /\d+-\s+([^.]{10,200})/g,
    /premièrement\s*:?\s*([^.]{10,200})/gi,
    /deuxièmement\s*:?\s*([^.]{10,200})/gi,
    /troisièmement\s*:?\s*([^.]{10,200})/gi
  ];
  
  const steps: string[] = [];
  for (const pattern of stepPatterns) {
    const matches = ocrText.match(pattern);
    if (matches) {
      steps.push(...matches.map(step => step.replace(/^(étape\s+\d+\s*:?\s*|\d+\)\s+|\d+-\s+|premièrement\s*:?\s*|deuxièmement\s*:?\s*|troisièmement\s*:?\s*)/i, '').trim()));
    }
  }
  if (steps.length > 0) {
    data.steps = [...new Set(steps)];
  }
  
  // Extraction des conditions
  const conditionPatterns = [
    /condition\s*:?\s*([^.]{10,200})/gi,
    /il\s+faut\s+([^.]{10,200})/gi,
    /nécessaire\s+de\s+([^.]{10,200})/gi,
    /obligatoire\s+de\s+([^.]{10,200})/gi
  ];
  
  const conditions: string[] = [];
  for (const pattern of conditionPatterns) {
    const matches = ocrText.match(pattern);
    if (matches) {
      conditions.push(...matches.map(condition => condition.replace(/^(condition\s*:?\s*|il\s+faut\s+|nécessaire\s+de\s+|obligatoire\s+de\s+)/i, '').trim()));
    }
  }
  if (conditions.length > 0) {
    data.conditions = [...new Set(conditions)];
  }
  
  // Extraction des informations de contact
  const contactPatterns = [
    /tél\s*:?\s*(\d{2}[-\s]\d{2}[-\s]\d{2}[-\s]\d{2}[-\s]\d{2})/gi,
    /téléphone\s*:?\s*(\d{2}[-\s]\d{2}[-\s]\d{2}[-\s]\d{2}[-\s]\d{2})/gi,
    /email\s*:?\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi,
    /adresse\s*:?\s*([^.]{10,200})/gi
  ];
  
  const contacts: string[] = [];
  for (const pattern of contactPatterns) {
    const matches = ocrText.match(pattern);
    if (matches) {
      contacts.push(...matches);
    }
  }
  if (contacts.length > 0) {
    data.contact_info = contacts.join(', ');
  }
  
  // Langue du document
  data.language = language;
  
  // Description complète
  data.description = ocrText.trim();
  
  console.log('🇩🇿 Données procédure administrative algérienne extraites:', data);
  return data;
}

/**
 * Extrait les données depuis un fichier quelconque (PDF, Word, Excel, Image)
 * en utilisant le nouveau DocumentExtractor
 */
export async function extractAlgerianDataFromFile(file: File): Promise<AlgerianLegalTextFormData | AlgerianProcedureFormData> {
  try {
    console.log(`🇩🇿 Début de l'extraction depuis le fichier: ${file.name}`);
    
    // Vérifier si le fichier est supporté
    if (!DocumentExtractor.isFileSupported(file)) {
      throw new Error(`Format de fichier non supporté: ${file.name}. Formats supportés: ${DocumentExtractor.getSupportedFormats().join(', ')}`);
    }

    // Extraire le texte du document
    const extractedDoc: ExtractedDocument = await DocumentExtractor.extractText(file);
    
    console.log(`📄 Texte extrait depuis ${extractedDoc.format}:`, extractedDoc.text.substring(0, 200) + '...');
    
    // Déterminer le type de document (juridique ou procédure)
    const documentType = determineAlgerianDocumentType(extractedDoc.text);
    
    let result: AlgerianLegalTextFormData | AlgerianProcedureFormData;
    
    if (documentType === 'legal') {
      result = extractAlgerianLegalTextData(extractedDoc.text);
      (result as AlgerianLegalTextFormData).documentFormat = extractedDoc.format;
      (result as AlgerianLegalTextFormData).extractionMetadata = extractedDoc.metadata;
    } else {
      result = extractAlgerianProcedureData(extractedDoc.text);
      (result as AlgerianProcedureFormData).documentFormat = extractedDoc.format;
      (result as AlgerianProcedureFormData).extractionMetadata = extractedDoc.metadata;
    }
    
    console.log(`🇩🇿 Extraction terminée depuis ${extractedDoc.format}. Type: ${documentType}`);
    return result;
    
  } catch (error) {
    console.error('🚨 Erreur lors de l\'extraction algérienne:', error);
    throw error;
  }
}

/**
 * Détermine le type de document algérien (juridique ou procédure administrative)
 */
function determineAlgerianDocumentType(text: string): 'legal' | 'procedure' {
  const legalKeywords = [
    'république algérienne', 'journal officiel', 'loi', 'décret', 'arrêté', 
    'ordonnance', 'constitution', 'code civil', 'code pénal', 'promulgation',
    'الجمهورية الجزائرية', 'الجريدة الرسمية', 'قانون', 'مرسوم', 'قرار'
  ];
  
  const procedureKeywords = [
    'procédure', 'démarche', 'formalité', 'demande', 'dossier', 'étapes',
    'documents requis', 'conditions', 'délai', 'coût', 'wilaya', 'commune',
    'إجراء', 'طلب', 'وثائق مطلوبة', 'شروط', 'مهلة', 'تكلفة', 'ولاية', 'بلدية'
  ];
  
  const textLower = text.toLowerCase();
  
  let legalScore = 0;
  let procedureScore = 0;
  
  legalKeywords.forEach(keyword => {
    if (textLower.includes(keyword.toLowerCase())) {
      legalScore++;
    }
  });
  
  procedureKeywords.forEach(keyword => {
    if (textLower.includes(keyword.toLowerCase())) {
      procedureScore++;
    }
  });
  
  // Si scores égaux ou aucun match clair, on privilégie "legal" par défaut
  return procedureScore > legalScore ? 'procedure' : 'legal';
}

/**
 * Obtient la liste des formats supportés pour les documents algériens
 */
export function getSupportedAlgerianDocumentFormats(): string[] {
  return DocumentExtractor.getSupportedFormats();
}

/**
 * Vérifie si un fichier peut être traité pour l'extraction algérienne
 */
export function isAlgerianDocumentSupported(file: File): boolean {
  return DocumentExtractor.isFileSupported(file);
}