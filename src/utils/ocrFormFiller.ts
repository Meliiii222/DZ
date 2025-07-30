
interface LegalTextFormData {
  title?: string;
  type?: string;
  category?: string;
  authority?: string;
  reference?: string;
  publicationDate?: string;
  description?: string;
  language?: string;
  journal_numero?: string;
  date_journal?: string;
  numero_page?: number;
  en_tete?: string;
  content?: string;
}

interface ProcedureFormData {
  name?: string;
  type?: string;
  description?: string;
  sector?: string;
  reference?: string;
}

import { log } from './securityLogger';

export function extractLegalTextData(ocrText: string): Partial<LegalTextFormData> {
  log.debug('Extraction OCR du texte:', { textLength: ocrText.length, preview: ocrText.substring(0, 200) + '...' }, 'OCRFormFiller');
  const data: Partial<LegalTextFormData> = {};
  
  // Recherche de patterns spécifiques aux textes juridiques algériens
  const patterns = {
    // Loi, Décret, Ordonnance, Arrêté
    type: /\b(Loi|loi|LOI|Décret|décret|DÉCRET|Ordonnance|ordonnance|ORDONNANCE|Arrêté|arrêté|ARRÊTÉ|Code|code|CODE|Instruction|instruction|INSTRUCTION|Circulaire|circulaire|CIRCULAIRE)\b/gi,
    // Numéro de référence plus flexible
    reference: /(?:n°|N°|numero|numéro)\s*[\s:]*(\d{1,3}[-/]\d{1,4}|\d{2,4})/gi,
    // Date plus flexible
    date: /\b(\d{1,2}[-/\s]\d{1,2}[-/\s]\d{4}|\d{4}[-/\s]\d{1,2}[-/\s]\d{1,2})\b/g,
    // Journal officiel
    journal: /journal\s*officiel.*?n°?\s*(\d+)/gi,
    // Page
    page: /page\s*(\d+)/gi,
    // Autorités et organisations
    authority: /(Président|président|Gouvernement|gouvernement|Ministre|ministre|Ministère|ministère|République|république|Algérie|algérie|Premier|premier)/gi,
    // Domaine juridique
    domain: /(commercial|Commercial|civil|Civil|pénal|Pénal|administratif|Administratif|fiscal|Fiscal|social|Social|environnement|Environnement|urbanisme|Urbanisme|fonction publique|Fonction publique)/gi,
    // Titre du document
    title: /(?:portant|relative|relatif|concernant|modifiant|complétant|fixant|déterminant|définissant)\s+([^.]+)/gi,
    // En-tête
    header: /(République\s+Algérienne\s+Démocratique\s+et\s+Populaire|RÉPUBLIQUE\s+ALGÉRIENNE\s+DÉMOCRATIQUE\s+ET\s+POPULAIRE)/gi,
    // Description/objet
    description: /(?:objet|OBJET|Object)\s*[:]\s*([^.]+)/gi,
    // Signataire
    signatory: /(?:signé|Signé|Le\s+Président|Le\s+Premier\s+Ministre|Le\s+Ministre)\s+([^.]+)/gi,
    // Langue
    language: /(arabe|Arabe|français|Français|tamazight|Tamazight)/gi
  };

  // Extraction du type avec mapping correct
  const typeMatches = ocrText.match(patterns.type);
  if (typeMatches && typeMatches.length > 0) {
    const detectedType = typeMatches[0].toLowerCase();
    console.log('Type détecté:', detectedType);
    
    if (detectedType.includes('loi')) {
      data.type = 'loi';
    } else if (detectedType.includes('décret')) {
      data.type = 'decret-executif';
    } else if (detectedType.includes('ordonnance')) {
      data.type = 'ordonnance';
    } else if (detectedType.includes('arrêté')) {
      data.type = 'arrete-ministeriel';
    } else if (detectedType.includes('code')) {
      data.type = 'code';
    } else if (detectedType.includes('instruction')) {
      data.type = 'instruction';
    } else if (detectedType.includes('circulaire')) {
      data.type = 'circulaire';
    }
  }

  // Extraction des autorités/organisations
  const authorityMatches = ocrText.match(patterns.authority);
  if (authorityMatches && authorityMatches.length > 0) {
    data.authority = authorityMatches[0];
    console.log('Autorité détectée:', data.authority);
  }

  // Extraction du domaine juridique
  const domainMatches = ocrText.match(patterns.domain);
  if (domainMatches && domainMatches.length > 0) {
    data.category = domainMatches[0].toLowerCase();
    console.log('Domaine détecté:', data.category);
  }

  // Extraction du titre améliorée
  const titleMatches = ocrText.match(patterns.title);
  if (titleMatches && titleMatches.length > 0) {
    data.title = titleMatches[0].trim();
    console.log('Titre détecté:', data.title);
  }

  // Extraction de l'en-tête
  const headerMatches = ocrText.match(patterns.header);
  if (headerMatches && headerMatches.length > 0) {
    data.en_tete = headerMatches[0];
    console.log('En-tête détecté:', data.en_tete);
  }

  // Extraction de la description/objet
  const descriptionMatches = ocrText.match(patterns.description);
  if (descriptionMatches && descriptionMatches.length > 0) {
    data.description = descriptionMatches[0].replace(/^objet\s*[:]\s*/i, '').trim();
    console.log('Description détectée:', data.description);
  }

  // Extraction du signataire
  const signatoryMatches = ocrText.match(patterns.signatory);
  if (signatoryMatches && signatoryMatches.length > 0) {
    data.authority = signatoryMatches[0];
    console.log('Signataire détecté:', data.authority);
  }

  // Extraction de la langue
  const languageMatches = ocrText.match(patterns.language);
  if (languageMatches && languageMatches.length > 0) {
    data.language = languageMatches[0].toLowerCase();
    console.log('Langue détectée:', data.language);
  }

  // Extraction de la référence
  const refMatches = ocrText.match(patterns.reference);
  if (refMatches && refMatches.length > 0) {
    data.reference = refMatches[refMatches.length - 1]; // Prendre la dernière occurrence
    console.log('Référence détectée:', data.reference);
  }

  // Extraction du numéro de journal
  const journalMatches = ocrText.match(patterns.journal);
  if (journalMatches && journalMatches.length > 0) {
    const match = journalMatches[0].match(/(\d+)/);
    if (match) {
      data.journal_numero = match[1];
      console.log('Journal N° détecté:', data.journal_numero);
    }
  }

  // Extraction du numéro de page
  const pageMatches = ocrText.match(patterns.page);
  if (pageMatches && pageMatches.length > 0) {
    const match = pageMatches[0].match(/(\d+)/);
    if (match) {
      data.numero_page = parseInt(match[1]);
      console.log('Page détectée:', data.numero_page);
    }
  }

  // Extraction de la date
  const dateMatches = ocrText.match(patterns.date);
  if (dateMatches && dateMatches.length > 0) {
    const dateStr = dateMatches[0];
    try {
      // Essayer différents formats de date
      const cleaned = dateStr.replace(/[\s/-]/g, '-');
      const parts = cleaned.split('-');
      
      let date;
      if (parts.length === 3) {
        // Essayer DD-MM-YYYY ou YYYY-MM-DD
        if (parts[0].length === 4) {
          date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        } else {
          date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        }
        
        if (!isNaN(date.getTime())) {
          data.date_journal = date.toISOString().split('T')[0];
          console.log('Date détectée:', data.date_journal);
        }
      }
    } catch (e) {
      console.warn('Parsing de date échoué:', dateStr, e);
    }
  }

  // Si pas de titre détecté, utiliser la première ligne significative
  if (!data.title) {
    const lines = ocrText.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 15)
      .filter(line => !line.match(/journal|page|n°|date/i));
      
    if (lines.length > 0) {
      data.title = lines[0];
      console.log('Titre par défaut détecté:', data.title);
    }
  }

  // En-tête (première ligne avec metadata)
  const headerLines = ocrText.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 10 && line.match(/journal|république|algérie/i));
    
  if (headerLines.length > 0) {
    data.en_tete = headerLines[0];
    console.log('En-tête détecté:', data.en_tete);
  }

  // Contenu complet
  data.content = ocrText.trim();

  console.log('Données extraites finales:', data);
  return data;
}

export function extractProcedureData(ocrText: string): Partial<ProcedureFormData> {
  console.log('Extraction OCR procédure du texte:', ocrText.substring(0, 200) + '...');
  const data: Partial<ProcedureFormData> = {};
  
  // Patterns pour les procédures administratives
  const patterns = {
    // Types de procédures
    type: /\b(demande|autorisation|licence|permis|certificat|déclaration|carte|attestation)\b/gi,
    // Secteurs
    sector: /(commerce|industrie|agriculture|transport|urbanisme|éducation|santé|social|fiscalité)/gi,
    // Référence/Dossier
    reference: /(?:dossier|ref|référence|n°)\s*:?\s*([A-Z0-9-/]+)/gi,
    // Nom/Titre de procédure
    title: /(?:demande|procédure)\s+(?:de|d'|pour)\s+([^.]+)/gi
  };

  // Extraction du type
  const typeMatches = ocrText.match(patterns.type);
  if (typeMatches && typeMatches.length > 0) {
    const detectedType = typeMatches[0].toLowerCase();
    console.log('Type de procédure détecté:', detectedType);
    
    if (detectedType.includes('demande')) data.type = 'Demande';
    else if (detectedType.includes('autorisation')) data.type = 'Autorisation';
    else if (detectedType.includes('licence')) data.type = 'Licence';
    else if (detectedType.includes('permis')) data.type = 'Permis';
    else if (detectedType.includes('certificat')) data.type = 'Certificat';
    else if (detectedType.includes('déclaration')) data.type = 'Déclaration';
    else if (detectedType.includes('carte')) data.type = 'Carte';
    else if (detectedType.includes('attestation')) data.type = 'Attestation';
  }

  // Extraction du secteur
  const sectorMatches = ocrText.match(patterns.sector);
  if (sectorMatches && sectorMatches.length > 0) {
    const detectedSector = sectorMatches[0].toLowerCase();
    console.log('Secteur détecté:', detectedSector);
    
    if (detectedSector.includes('commerce')) data.sector = 'Commerce';
    else if (detectedSector.includes('industrie')) data.sector = 'Commerce'; // Map to Commerce
    else if (detectedSector.includes('agriculture')) data.sector = 'Agriculture';
    else if (detectedSector.includes('transport')) data.sector = 'Transport';
    else if (detectedSector.includes('urbanisme')) data.sector = 'Urbanisme';
    else if (detectedSector.includes('éducation')) data.sector = 'Éducation';
    else if (detectedSector.includes('santé')) data.sector = 'Santé';
    else if (detectedSector.includes('social')) data.sector = 'Social';
    else if (detectedSector.includes('fiscalité')) data.sector = 'Fiscalité';
  }

  // Extraction de la référence
  const refMatches = ocrText.match(patterns.reference);
  if (refMatches && refMatches.length > 0) {
    const match = refMatches[0].match(/([A-Z0-9-/]+)$/);
    if (match) {
      data.reference = match[1];
      console.log('Référence détectée:', data.reference);
    }
  }

  // Extraction du nom de procédure
  const titleMatches = ocrText.match(patterns.title);
  if (titleMatches && titleMatches.length > 0) {
    const match = titleMatches[0].match(/(?:de|d'|pour)\s+([^.]+)/i);
    if (match) {
      data.name = match[1].trim();
      console.log('Nom de procédure détecté:', data.name);
    }
  }

  // Si pas de nom spécifique trouvé, utiliser la première ligne significative
  if (!data.name) {
    const lines = ocrText.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 10 && !line.match(/date|page|n°/i));
    if (lines.length > 0) {
      data.name = lines[0];
      console.log('Nom par défaut:', data.name);
    }
  }

  // Description complète
  data.description = ocrText.trim();

  console.log('Données de procédure extraites:', data);
  return data;
}
