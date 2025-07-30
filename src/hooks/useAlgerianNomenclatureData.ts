// @ts-nocheck
import { useState, useEffect } from 'react';
import { useFormLibrary } from './useFormLibrary';

// Types spécifiques aux données algériennes
interface AlgerianNomenclatureData {
  legalTypes: AlgerianLegalType[];
  procedureCategories: AlgerianProcedureCategory[];
  juridicalDomains: AlgerianJuridicalDomain[];
  algerianInstitutions: AlgerianInstitution[];
  algerianSignatories: AlgerianSignatory[];
  wilayas: Wilaya[];
  communes: Commune[];
  sectors: AlgerianSector[];
}

interface AlgerianLegalType {
  name: string;
  nameAr: string;
  code: string;
  description: string;
  hierarchy: number;
  status: string;
  examples: string[];
}

interface AlgerianProcedureCategory {
  name: string;
  nameAr: string;
  code: string;
  description: string;
  targetAudience: string[];
  commonDocuments: string[];
  status: string;
}

interface AlgerianJuridicalDomain {
  name: string;
  nameAr: string;
  code: string;
  description: string;
  relatedCodes: string[];
  status: string;
}

interface AlgerianInstitution {
  name: string;
  nameAr: string;
  code: string;
  type: 'federal' | 'ministerial' | 'regional' | 'local';
  level: 'national' | 'wilaya' | 'daira' | 'commune';
  description: string;
  address?: string;
  website?: string;
  status: string;
}

interface AlgerianSignatory {
  name: string;
  nameAr: string;
  title: string;
  titleAr: string;
  institution: string;
  institutionAr: string;
  level: 'president' | 'prime_minister' | 'minister' | 'wali' | 'mayor' | 'director';
  status: string;
}

interface Wilaya {
  code: string;
  name: string;
  nameAr: string;
  region: string;
  population: number;
  surface: number;
  chefLieu: string;
  dairas: string[];
}

interface Commune {
  code: string;
  name: string;
  nameAr: string;
  wilaya: string;
  daira: string;
  population: number;
  type: 'urban' | 'rural';
}

interface AlgerianSector {
  name: string;
  nameAr: string;
  code: string;
  ministry: string;
  description: string;
  commonProcedures: string[];
}

export function useAlgerianNomenclatureData() {
  const [nomenclatureData, setNomenclatureData] = useState<AlgerianNomenclatureData | null>(null);
  const { templates, getTemplateByType } = useFormLibrary();

  useEffect(() => {
    // Charger les données spécifiques à l'Algérie
    const loadAlgerianNomenclatureData = () => {
      const data: AlgerianNomenclatureData = {
        legalTypes: [
          { name: "Constitution", nameAr: "الدستور", code: "CON", description: "Loi fondamentale de l'État algérien", hierarchy: 1, status: "Actif", examples: ["Constitution de 2020"] },
          { name: "Loi Organique", nameAr: "قانون عضوي", code: "LOR", description: "Loi définissant l'organisation des pouvoirs publics", hierarchy: 2, status: "Actif", examples: ["Loi organique relative au régime électoral"] },
          { name: "Loi", nameAr: "قانون", code: "LOI", description: "Texte voté par le Parlement algérien", hierarchy: 3, status: "Actif", examples: ["Loi de finances", "Code de la famille"] },
          { name: "Ordonnance", nameAr: "أمر", code: "ORD", description: "Acte du Président de la République algérienne", hierarchy: 4, status: "Actif", examples: ["Ordonnance relative au code pénal"] },
          { name: "Décret Présidentiel", nameAr: "مرسوم رئاسي", code: "DPR", description: "Décret du Président de la République", hierarchy: 5, status: "Actif", examples: ["Nomination des ministres"] },
          { name: "Décret Exécutif", nameAr: "مرسوم تنفيذي", code: "DEC", description: "Acte réglementaire du Premier ministre", hierarchy: 6, status: "Actif", examples: ["Modalités d'application des lois"] },
          { name: "Arrêté Ministériel", nameAr: "قرار وزاري", code: "ARM", description: "Décision d'un ministre algérien", hierarchy: 7, status: "Actif", examples: ["Programmes scolaires", "Tarifs douaniers"] },
          { name: "Arrêté Interministériel", nameAr: "قرار مشترك بين الوزارات", code: "AIM", description: "Arrêté signé par plusieurs ministres", hierarchy: 7, status: "Actif", examples: ["Coordination entre ministères"] },
          { name: "Décision", nameAr: "قرار", code: "DEC", description: "Acte administratif individuel", hierarchy: 8, status: "Actif", examples: ["Nomination de fonctionnaires"] },
          { name: "Instruction", nameAr: "تعليمة", code: "INS", description: "Directive d'application", hierarchy: 9, status: "Actif", examples: ["Instructions aux services"] },
          { name: "Circulaire", nameAr: "منشور", code: "CIR", description: "Instruction administrative générale", hierarchy: 10, status: "Actif", examples: ["Circulaires aux administrations"] }
        ],
        
        procedureCategories: [
          { name: "État Civil", nameAr: "الحالة المدنية", code: "EC", description: "Procédures d'état civil algérienne", targetAudience: ["Citoyens"], commonDocuments: ["Acte de naissance", "Certificat de résidence"], status: "Actif" },
          { name: "Commerce", nameAr: "التجارة", code: "COM", description: "Procédures commerciales algériennes", targetAudience: ["Entreprises", "Commerçants"], commonDocuments: ["Registre de commerce", "Certificat fiscal"], status: "Actif" },
          { name: "Urbanisme", nameAr: "التعمير", code: "URB", description: "Procédures d'urbanisme et construction", targetAudience: ["Particuliers", "Promoteurs"], commonDocuments: ["Permis de construire", "Certificat d'urbanisme"], status: "Actif" },
          { name: "Fiscalité", nameAr: "الضرائب", code: "FIS", description: "Procédures fiscales algériennes", targetAudience: ["Contribuables", "Entreprises"], commonDocuments: ["Déclaration fiscale", "Quitus fiscal"], status: "Actif" },
          { name: "Social", nameAr: "الشؤون الاجتماعية", code: "SOC", description: "Procédures sociales", targetAudience: ["Citoyens", "Travailleurs"], commonDocuments: ["Certificat médical", "Attestation de travail"], status: "Actif" },
          { name: "Transport", nameAr: "النقل", code: "TRA", description: "Procédures de transport", targetAudience: ["Conducteurs", "Transporteurs"], commonDocuments: ["Permis de conduire", "Carte grise"], status: "Actif" },
          { name: "Éducation", nameAr: "التربية والتعليم", code: "EDU", description: "Procédures éducatives", targetAudience: ["Élèves", "Étudiants", "Parents"], commonDocuments: ["Diplômes", "Relevés de notes"], status: "Actif" },
          { name: "Santé", nameAr: "الصحة", code: "SAN", description: "Procédures de santé", targetAudience: ["Patients", "Professionnels de santé"], commonDocuments: ["Certificat médical", "Carte Chifa"], status: "Actif" },
          { name: "Agriculture", nameAr: "الفلاحة", code: "AGR", description: "Procédures agricoles", targetAudience: ["Agriculteurs", "Éleveurs"], commonDocuments: ["Titre de propriété", "Attestation d'activité"], status: "Actif" },
          { name: "Environnement", nameAr: "البيئة", code: "ENV", description: "Procédures environnementales", targetAudience: ["Entreprises", "Associations"], commonDocuments: ["Étude d'impact", "Autorisation environnementale"], status: "Actif" }
        ],
        
        juridicalDomains: [
          { name: "Droit Civil", nameAr: "القانون المدني", code: "CIV", description: "Droit des personnes et des biens en Algérie", relatedCodes: ["Code civil algérien"], status: "Actif" },
          { name: "Droit Commercial", nameAr: "القانون التجاري", code: "COM", description: "Droit des affaires algérien", relatedCodes: ["Code de commerce"], status: "Actif" },
          { name: "Droit Pénal", nameAr: "القانون الجنائي", code: "PEN", description: "Droit pénal algérien", relatedCodes: ["Code pénal", "Code de procédure pénale"], status: "Actif" },
          { name: "Droit Administratif", nameAr: "القانون الإداري", code: "ADM", description: "Droit public algérien", relatedCodes: ["Statut de la fonction publique"], status: "Actif" },
          { name: "Droit Fiscal", nameAr: "القانون الضريبي", code: "FIS", description: "Droit fiscal algérien", relatedCodes: ["Code des impôts directs", "Code des douanes"], status: "Actif" },
          { name: "Droit Social", nameAr: "القانون الاجتماعي", code: "SOC", description: "Droit du travail algérien", relatedCodes: ["Code du travail", "Loi sur la sécurité sociale"], status: "Actif" },
          { name: "Droit de la Famille", nameAr: "قانون الأسرة", code: "FAM", description: "Code de la famille algérien", relatedCodes: ["Code de la famille"], status: "Actif" },
          { name: "Droit de l'Environnement", nameAr: "قانون البيئة", code: "ENV", description: "Droit environnemental algérien", relatedCodes: ["Loi sur l'environnement"], status: "Actif" }
        ],
        
        algerianInstitutions: [
          { name: "Présidence de la République", nameAr: "رئاسة الجمهورية", code: "PR", type: "federal", level: "national", description: "Institution présidentielle algérienne", status: "Actif" },
          { name: "Premier Ministère", nameAr: "الوزارة الأولى", code: "PM", type: "federal", level: "national", description: "Chef du gouvernement algérien", status: "Actif" },
          { name: "Ministère de la Justice", nameAr: "وزارة العدل", code: "MJ", type: "ministerial", level: "national", description: "Justice algérienne", status: "Actif" },
          { name: "Ministère de l'Intérieur et des Collectivités locales", nameAr: "وزارة الداخلية والجماعات المحلية", code: "MICL", type: "ministerial", level: "national", description: "Administration territoriale", status: "Actif" },
          { name: "Ministère des Finances", nameAr: "وزارة المالية", code: "MF", type: "ministerial", level: "national", description: "Finances publiques", status: "Actif" },
          { name: "Ministère du Commerce", nameAr: "وزارة التجارة", code: "MC", type: "ministerial", level: "national", description: "Commerce et artisanat", status: "Actif" },
          { name: "Ministère de l'Agriculture", nameAr: "وزارة الفلاحة", code: "MA", type: "ministerial", level: "national", description: "Agriculture et développement rural", status: "Actif" },
          { name: "Wilaya", nameAr: "الولاية", code: "WIL", type: "regional", level: "wilaya", description: "Administration de wilaya", status: "Actif" },
          { name: "Commune", nameAr: "البلدية", code: "COM", type: "local", level: "commune", description: "Administration communale", status: "Actif" }
        ],
        
        algerianSignatories: [
          { name: "Président de la République", nameAr: "رئيس الجمهورية", title: "Président", titleAr: "الرئيس", institution: "Présidence de la République", institutionAr: "رئاسة الجمهورية", level: "president", status: "Actif" },
          { name: "Premier Ministre", nameAr: "الوزير الأول", title: "Premier Ministre", titleAr: "الوزير الأول", institution: "Premier Ministère", institutionAr: "الوزارة الأولى", level: "prime_minister", status: "Actif" },
          { name: "Ministre de la Justice", nameAr: "وزير العدل", title: "Ministre", titleAr: "الوزير", institution: "Ministère de la Justice", institutionAr: "وزارة العدل", level: "minister", status: "Actif" },
          { name: "Wali", nameAr: "الوالي", title: "Wali", titleAr: "الوالي", institution: "Wilaya", institutionAr: "الولاية", level: "wali", status: "Actif" },
          { name: "Maire", nameAr: "رئيس المجلس الشعبي البلدي", title: "Président d'APC", titleAr: "رئيس المجلس الشعبي البلدي", institution: "Commune", institutionAr: "البلدية", level: "mayor", status: "Actif" }
        ],
        
        wilayas: [
          { code: "01", name: "Adrar", nameAr: "أدرار", region: "Sud", population: 450000, surface: 439700, chefLieu: "Adrar", dairas: ["Adrar", "Aoulef", "Bordj Badji Mokhtar"] },
          { code: "02", name: "Chlef", nameAr: "الشلف", region: "Nord", population: 1200000, surface: 4795, chefLieu: "Chlef", dairas: ["Chlef", "Boukadir", "El Karimia"] },
          { code: "03", name: "Laghouat", nameAr: "الأغواط", region: "Hauts Plateaux", population: 520000, surface: 25052, chefLieu: "Laghouat", dairas: ["Laghouat", "Aflou", "Ksar El Hirane"] },
          { code: "16", name: "Alger", nameAr: "الجزائر", region: "Nord", population: 3500000, surface: 1190, chefLieu: "Alger", dairas: ["Sidi M'Hamed", "El Madania", "Bab El Oued"] },
          { code: "31", name: "Oran", nameAr: "وهران", region: "Nord", population: 1700000, surface: 2121, chefLieu: "Oran", dairas: ["Oran", "Gdyel", "Bir El Djir"] },
          { code: "25", name: "Constantine", nameAr: "قسنطينة", region: "Nord", population: 1200000, surface: 2187, chefLieu: "Constantine", dairas: ["Constantine", "Hamma Bouziane", "Ibn Ziad"] }
        ],
        
        communes: [
          { code: "1601", name: "Sidi M'Hamed", nameAr: "سيدي امحمد", wilaya: "Alger", daira: "Sidi M'Hamed", population: 90000, type: "urban" },
          { code: "1602", name: "El Madania", nameAr: "المدنية", wilaya: "Alger", daira: "El Madania", population: 75000, type: "urban" },
          { code: "3101", name: "Oran", nameAr: "وهران", wilaya: "Oran", daira: "Oran", population: 650000, type: "urban" },
          { code: "2501", name: "Constantine", nameAr: "قسنطينة", wilaya: "Constantine", daira: "Constantine", population: 450000, type: "urban" }
        ],
        
        sectors: [
          { name: "Commerce", nameAr: "التجارة", code: "COM", ministry: "Ministère du Commerce", description: "Secteur commercial", commonProcedures: ["Registre de commerce", "Licence d'importation"] },
          { name: "Agriculture", nameAr: "الفلاحة", code: "AGR", ministry: "Ministère de l'Agriculture", description: "Secteur agricole", commonProcedures: ["Exploitation agricole", "Subventions agricoles"] },
          { name: "Industrie", nameAr: "الصناعة", code: "IND", ministry: "Ministère de l'Industrie", description: "Secteur industriel", commonProcedures: ["Autorisation industrielle", "Certificat de conformité"] },
          { name: "Transport", nameAr: "النقل", code: "TRA", ministry: "Ministère des Transports", description: "Secteur des transports", commonProcedures: ["Permis de conduire", "Carte grise"] },
          { name: "Éducation", nameAr: "التربية والتعليم", code: "EDU", ministry: "Ministère de l'Éducation nationale", description: "Secteur éducatif", commonProcedures: ["Inscription scolaire", "Équivalence de diplômes"] }
        ]
      };
      setNomenclatureData(data);
    };

    loadAlgerianNomenclatureData();
  }, []);

  const mapAlgerianOCRDataToForm = (ocrData: Record<string, unknown>, documentType: 'legal' | 'procedure') => {
    if (!nomenclatureData) return ocrData;

    const mappedData = { ...ocrData };

    if (documentType === 'legal') {
      // Mapper les types de textes juridiques algériens
      if (mappedData.type) {
        const legalType = nomenclatureData.legalTypes.find(t => 
          t.name.toLowerCase().includes(mappedData.type.toLowerCase()) ||
          t.nameAr.includes(mappedData.type) ||
          t.code.toLowerCase() === mappedData.type.toLowerCase()
        );
        if (legalType) {
          mappedData.type = legalType.name;
          mappedData.typeCode = legalType.code;
          mappedData.hierarchy = legalType.hierarchy;
        }
      }

      // Mapper les institutions algériennes
      if (mappedData.institution || mappedData.authority) {
        const institutionText = (mappedData.institution || mappedData.authority).toLowerCase();
        const institution = nomenclatureData.algerianInstitutions.find(i => 
          i.name.toLowerCase().includes(institutionText) ||
          institutionText.includes(i.name.toLowerCase()) ||
          i.nameAr.includes(mappedData.institution || mappedData.authority)
        );
        if (institution) {
          mappedData.institution = institution.name;
          mappedData.institutionAr = institution.nameAr;
          mappedData.institutionLevel = institution.level;
        }
      }

      // Mapper les domaines juridiques algériens
      if (mappedData.category) {
        const domain = nomenclatureData.juridicalDomains.find(d => 
          d.name.toLowerCase().includes(mappedData.category.toLowerCase()) ||
          mappedData.category.toLowerCase().includes(d.name.toLowerCase()) ||
          d.nameAr.includes(mappedData.category)
        );
        if (domain) {
          mappedData.category = domain.name;
          mappedData.categoryAr = domain.nameAr;
          mappedData.relatedCodes = domain.relatedCodes;
        }
      }

      // Mapper les wilayas si mentionnées
      if (mappedData.wilaya) {
        const wilaya = nomenclatureData.wilayas.find(w => 
          w.name.toLowerCase().includes(mappedData.wilaya.toLowerCase()) ||
          w.nameAr.includes(mappedData.wilaya)
        );
        if (wilaya) {
          mappedData.wilayaCode = wilaya.code;
          mappedData.wilayaName = wilaya.name;
          mappedData.wilayaNameAr = wilaya.nameAr;
          mappedData.region = wilaya.region;
        }
      }

    } else if (documentType === 'procedure') {
      // Mapper les catégories de procédures algériennes
      if (mappedData.sector) {
        const category = nomenclatureData.procedureCategories.find(c => 
          c.name.toLowerCase().includes(mappedData.sector.toLowerCase()) ||
          mappedData.sector.toLowerCase().includes(c.name.toLowerCase()) ||
          c.nameAr.includes(mappedData.sector)
        );
        if (category) {
          mappedData.sector = category.name;
          mappedData.sectorAr = category.nameAr;
          mappedData.targetAudience = category.targetAudience;
          mappedData.commonDocuments = category.commonDocuments;
        }
      }

      // Mapper les secteurs d'activité
      if (mappedData.sector) {
        const sector = nomenclatureData.sectors.find(s => 
          s.name.toLowerCase().includes(mappedData.sector.toLowerCase()) ||
          s.nameAr.includes(mappedData.sector)
        );
        if (sector) {
          mappedData.ministry = sector.ministry;
          mappedData.commonProcedures = sector.commonProcedures;
        }
      }

      // Mapper les wilayas et communes
      if (mappedData.wilaya) {
        const wilaya = nomenclatureData.wilayas.find(w => 
          w.name.toLowerCase().includes(mappedData.wilaya.toLowerCase()) ||
          w.nameAr.includes(mappedData.wilaya)
        );
        if (wilaya) {
          mappedData.wilayaCode = wilaya.code;
          mappedData.wilayaName = wilaya.name;
          mappedData.region = wilaya.region;
        }
      }

      if (mappedData.commune) {
        const commune = nomenclatureData.communes.find(c => 
          c.name.toLowerCase().includes(mappedData.commune.toLowerCase()) ||
          c.nameAr.includes(mappedData.commune)
        );
        if (commune) {
          mappedData.communeCode = commune.code;
          mappedData.communeName = commune.name;
          mappedData.communeType = commune.type;
        }
      }
    }

    return mappedData;
  };

  const validateAlgerianDocument = (parsedData: { documentType: 'legal' | 'procedure', formData: Record<string, any> }) => {
    let confidence = 50; // Base confidence
    const validationErrors: string[] = [];

    if (parsedData.documentType === 'legal') {
      // Validation pour textes juridiques algériens
      if (parsedData.formData.en_tete && parsedData.formData.en_tete.includes('République Algérienne')) confidence += 20;
      if (parsedData.formData.type && nomenclatureData?.legalTypes.some(t => t.name === parsedData.formData.type)) confidence += 15;
      if (parsedData.formData.reference && parsedData.formData.reference.match(/\d{2,3}[-/]\d{2,4}/)) confidence += 10;
      if (parsedData.formData.journal_numero) confidence += 10;
      if (parsedData.formData.institution) confidence += 10;
      
      // Vérifications de cohérence
      if (parsedData.formData.type === 'Constitution' && !parsedData.formData.reference?.includes('2020')) {
        validationErrors.push('Constitution algérienne attendue de 2020');
        confidence -= 10;
      }
      
    } else if (parsedData.documentType === 'procedure') {
      // Validation pour procédures administratives algériennes
      if (parsedData.formData.name && parsedData.formData.name.length > 10) confidence += 15;
      if (parsedData.formData.sector && nomenclatureData?.procedureCategories.some(c => c.name === parsedData.formData.sector)) confidence += 15;
      if (parsedData.formData.required_documents && parsedData.formData.required_documents.length > 0) confidence += 10;
      if (parsedData.formData.wilaya || parsedData.formData.commune) confidence += 10;
      if (parsedData.formData.duration) confidence += 5;
      if (parsedData.formData.cost) confidence += 5;
      
      // Documents typiquement algériens
      const algerianDocs = ['acte de naissance', 'certificat de résidence', 'casier judiciaire', 'carte chifa'];
      if (parsedData.formData.required_documents?.some((doc: string) => 
        algerianDocs.some(algerianDoc => doc.toLowerCase().includes(algerianDoc))
      )) {
        confidence += 10;
      }
    }

    // Validation de la langue
    if (parsedData.formData.language === 'mixed') confidence += 5;
    
    // Plafonner la confiance
    confidence = Math.min(confidence, 95);
    
    return {
      confidence,
      validationErrors,
      isValid: confidence >= 60
    };
  };

  const getAlgerianFormTemplateWithNomenclature = (type: string) => {
    const template = getTemplateByType(type);
    if (!template || !nomenclatureData) return null;

    // Enrichir le template avec les données algériennes
    const enrichedTemplate = {
      ...template,
      fields: template.fields.map(field => {
        if (field.type === 'select') {
          switch (field.name) {
            case 'type':
              return {
                ...field,
                options: nomenclatureData.legalTypes.map(t => ({ value: t.name, label: `${t.name} (${t.nameAr})` }))
              };
            case 'category':
            case 'sector':
              return {
                ...field,
                options: nomenclatureData.procedureCategories.map(c => ({ value: c.name, label: `${c.name} (${c.nameAr})` }))
              };
            case 'domain':
              return {
                ...field,
                options: nomenclatureData.juridicalDomains.map(d => ({ value: d.name, label: `${d.name} (${d.nameAr})` }))
              };
            case 'institution':
            case 'authority':
              return {
                ...field,
                options: nomenclatureData.algerianInstitutions.map(i => ({ value: i.name, label: `${i.name} (${i.nameAr})` }))
              };
            case 'wilaya':
              return {
                ...field,
                options: nomenclatureData.wilayas.map(w => ({ value: w.name, label: `${w.name} (${w.nameAr}) - ${w.code}` }))
              };
            case 'signatory':
              return {
                ...field,
                options: nomenclatureData.algerianSignatories.map(s => ({ value: s.name, label: `${s.title} (${s.titleAr})` }))
              };
            default:
              return field;
          }
        }
        return field;
      })
    };

    return enrichedTemplate;
  };

  return {
    nomenclatureData,
    mapAlgerianOCRDataToForm,
    validateAlgerianDocument,
    getAlgerianFormTemplateWithNomenclature
  };
}