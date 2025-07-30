// @ts-nocheck
import { useState, useEffect } from 'react';
import { useFormLibrary } from './useFormLibrary';

// Types de données nomenclature
interface NomenclatureData {
  legalTypes: LegalType[];
  procedureCategories: ProcedureCategory[];
  juridicalDomains: JuridicalDomain[];
  organizations: Organization[];
  signatories: Signatory[];
}

interface LegalType {
  name: string;
  code: string;
  description: string;
  count: number;
  status: string;
}

interface ProcedureCategory {
  name: string;
  code: string;
  description: string;
  count: number;
  status: string;
}

interface JuridicalDomain {
  name: string;
  code: string;
  description: string;
  count: number;
  status: string;
}

interface Organization {
  name: string;
  code: string;
  description: string;
  count: number;
  status: string;
}

interface Signatory {
  name: string;
  title: string;
  organization: string;
  status: string;
}

export function useNomenclatureData() {
  const [nomenclatureData, setNomenclatureData] = useState<NomenclatureData | null>(null);
  const { templates, getTemplateByType, getLegalTextFormForType, getProcedureFormForCategory } = useFormLibrary();

  useEffect(() => {
    // Charger les données de la nomenclature
    const loadNomenclatureData = () => {
      const data: NomenclatureData = {
        legalTypes: [
          { name: "Constitution", code: "CON", description: "Loi fondamentale de l'État", count: 1, status: "Actif" },
          { name: "Accord International", code: "ACI", description: "Accord signé avec d'autres États", count: 45, status: "Actif" },
          { name: "Convention Internationale", code: "CVI", description: "Convention multilatérale", count: 67, status: "Actif" },
          { name: "Code", code: "COD", description: "Compilation de textes juridiques", count: 45, status: "Actif" },
          { name: "Loi Organique", code: "LOR", description: "Loi définissant l'organisation des pouvoirs", count: 23, status: "Actif" },
          { name: "Loi", code: "LOI", description: "Texte voté par le Parlement", count: 1250, status: "Actif" },
          { name: "Ordonnance", code: "ORD", description: "Acte du Président de la République", count: 234, status: "Actif" },
          { name: "Décret Législatif", code: "DLG", description: "Décret ayant force de loi", count: 89, status: "Actif" },
          { name: "Décret Présidentiel", code: "DPR", description: "Décret du Président de la République", count: 345, status: "Actif" },
          { name: "Décret Exécutif", code: "DEC", description: "Acte réglementaire du Premier ministre", count: 890, status: "Actif" },
          { name: "Arrêté", code: "ARR", description: "Décision administrative", count: 2340, status: "Actif" },
          { name: "Arrêté interministérielle", code: "AIM", description: "Arrêté signé par plusieurs ministres", count: 456, status: "Actif" },
          { name: "Arrêté ministérielle", code: "ARM", description: "Décision d'un ministre", count: 1234, status: "Actif" },
          { name: "Décision", code: "DEC", description: "Acte administratif individuel", count: 3456, status: "Actif" },
          { name: "Décision interministérielle", code: "DIM", description: "Décision prise par plusieurs ministères", count: 234, status: "Actif" },
          { name: "Avis", code: "AVI", description: "Opinion consultative", count: 567, status: "Actif" },
          { name: "Proclamation", code: "PRO", description: "Annonce officielle solennelle", count: 89, status: "Actif" },
          { name: "Instruction", code: "INS", description: "Directive d'application", count: 789, status: "Actif" },
          { name: "Instruction interministérielle", code: "IIM", description: "Instruction commune à plusieurs ministères", count: 123, status: "Actif" },
          { name: "Règlements", code: "REG", description: "Règles générales d'application", count: 345, status: "Actif" },
          { name: "Circulaire", code: "CIR", description: "Instruction administrative", count: 567, status: "Actif" },
          { name: "Circulaire interministérielle", code: "CIM", description: "Circulaire commune à plusieurs ministères", count: 178, status: "Actif" },
          { name: "Convention", code: "COV", description: "Accord contractuel", count: 234, status: "Actif" },
          { name: "Note", code: "NOT", description: "Communication écrite", count: 456, status: "Actif" },
          { name: "Note circulaire", code: "NCR", description: "Note d'information générale", count: 123, status: "Actif" },
          { name: "Notification", code: "NTF", description: "Acte de porter à connaissance", count: 789, status: "Actif" },
          { name: "Communiqué", code: "COM", description: "Communication publique", count: 345, status: "Actif" },
          { name: "Correspondance", code: "COR", description: "Échange de courriers", count: 567, status: "Actif" },
          { name: "Délibération", code: "DEL", description: "Décision prise après débat", count: 234, status: "Actif" },
          { name: "Résolutions", code: "RES", description: "Décision formelle", count: 456, status: "Actif" },
          { name: "Déclaration", code: "DCL", description: "Énoncé officiel", count: 123, status: "Actif" },
          { name: "Bulletin d'information", code: "BIN", description: "Publication d'informations", count: 789, status: "Actif" },
          { name: "Jurisprudence", code: "JUR", description: "Ensemble des décisions de justice", count: 2456, status: "Actif" },
          { name: "Jurisprudence Fonction Publique", code: "JURFP", description: "Décisions de justice relatives à la fonction publique", count: 234, status: "Actif" },
          { name: "Cahier de charge", code: "CDC", description: "Document définissant les exigences", count: 345, status: "Actif" },
          { name: "Cahier des clauses administratives générales", code: "CAG", description: "Clauses générales des marchés publics", count: 67, status: "Actif" },
          { name: "Discours", code: "DIS", description: "Allocution officielle", count: 234, status: "Actif" },
          { name: "Rapport, Guide", code: "RAP", description: "Document d'analyse ou de guidance", count: 567, status: "Actif" },
          { name: "Plan d'action", code: "PLA", description: "Programme d'actions structuré", count: 123, status: "Actif" },
          { name: "Barème, Norme", code: "BAR", description: "Échelle de valeurs ou standard", count: 456, status: "Actif" },
          { name: "Procès-verbal", code: "PVB", description: "Compte-rendu officiel", count: 789, status: "Actif" },
          { name: "Fonction Publique", code: "FP", description: "Textes relatifs à la fonction publique", count: 456, status: "Actif" }
        ],
        procedureCategories: [
          { name: "Urbanisme", code: "URB", description: "Procédures d'aménagement et construction", count: 234, status: "Actif" },
          { name: "État civil", code: "EC", description: "Procédures d'état civil", count: 567, status: "Actif" },
          { name: "Social", code: "SOC", description: "Procédures sociales", count: 345, status: "Actif" },
          { name: "Fiscal", code: "FIS", description: "Procédures fiscales", count: 123, status: "Actif" },
          { name: "Commerce", code: "COM", description: "Procédures commerciales", count: 789, status: "Actif" },
          { name: "Environnement", code: "ENV", description: "Procédures environnementales", count: 456, status: "Actif" },
          { name: "Agriculture", code: "AGR", description: "Procédures agricoles", count: 234, status: "Actif" },
          { name: "Transport", code: "TRA", description: "Procédures de transport", count: 345, status: "Actif" },
          { name: "Éducation", code: "EDU", description: "Procédures éducatives", count: 567, status: "Actif" },
          { name: "Santé", code: "SAN", description: "Procédures de santé", count: 123, status: "Actif" },
          { name: "Fiscalité", code: "FISC", description: "Procédures fiscales", count: 789, status: "Actif" }
        ],
        juridicalDomains: [
          { name: "Droit Civil", code: "CIV", description: "Droit des personnes et des biens", count: 567, status: "Actif" },
          { name: "Droit Commercial", code: "COM", description: "Droit des affaires", count: 234, status: "Actif" },
          { name: "Droit Pénal", code: "PEN", description: "Droit pénal et procédure pénale", count: 345, status: "Actif" },
          { name: "Droit Administratif", code: "ADM", description: "Droit public et administratif", count: 456, status: "Actif" },
          { name: "Droit Fiscal", code: "FIS", description: "Droit fiscal et taxation", count: 123, status: "Actif" },
          { name: "Droit Social", code: "SOC", description: "Droit du travail et sécurité sociale", count: 789, status: "Actif" },
          { name: "Droit de l'Environnement", code: "ENV", description: "Droit environnemental", count: 234, status: "Actif" },
          { name: "Droit de l'Urbanisme", code: "URB", description: "Droit de l'urbanisme et construction", count: 345, status: "Actif" },
          { name: "Droit de la Fonction Publique", code: "FP", description: "Statut et droits des fonctionnaires", count: 567, status: "Actif" }
        ],
        organizations: [
          { name: "Ministère de la santé et de la population", code: "MSP", description: "Politique sanitaire et démographique", count: 234, status: "Actif" },
          { name: "Assemblée Populaire Nationale", code: "APN", description: "Chambre basse du Parlement", count: 456, status: "Actif" },
          { name: "Conseil Constitutionnel", code: "CC", description: "Contrôle de constitutionnalité", count: 789, status: "Actif" },
          { name: "Conseil d'État", code: "CE", description: "Juridiction administrative suprême", count: 432, status: "Actif" },
          { name: "Cour Suprême", code: "CS", description: "Juridiction suprême", count: 567, status: "Actif" },
          { name: "Ministère de l'Education Nationale", code: "MEN", description: "Système éducatif", count: 789, status: "Actif" },
          { name: "Ministère de l'Enseignement Supérieur et de la Recherche Scientifique", code: "MESRS", description: "Université et recherche", count: 678, status: "Actif" },
          { name: "Ministère de l'Agriculture et du développement rural", code: "MADR", description: "Développement rural", count: 678, status: "Actif" },
          { name: "Ministère de la Justice", code: "MJUS", description: "Justice", count: 234, status: "Actif" },
          { name: "Ministère de l'Intérieur et des Collectivités Locales", code: "MICL", description: "Administration territoriale", count: 789, status: "Actif" }
        ],
        signatories: [
          { name: "Président de la République", title: "Président", organization: "Présidence de la République", status: "Actif" },
          { name: "Premier Ministre", title: "Premier Ministre", organization: "Gouvernement", status: "Actif" },
          { name: "Ministre de la Justice", title: "Ministre", organization: "Ministère de la Justice", status: "Actif" },
          { name: "Ministre de l'Intérieur", title: "Ministre", organization: "Ministère de l'Intérieur", status: "Actif" },
          { name: "Ministre de l'Education", title: "Ministre", organization: "Ministère de l'Education", status: "Actif" },
          { name: "Ministre de la Santé", title: "Ministre", organization: "Ministère de la Santé", status: "Actif" },
          { name: "Ministre de l'Agriculture", title: "Ministre", organization: "Ministère de l'Agriculture", status: "Actif" },
          { name: "Ministre des Finances", title: "Ministre", organization: "Ministère des Finances", status: "Actif" }
        ]
      };
      setNomenclatureData(data);
    };

    loadNomenclatureData();
  }, []);

  const getFormTemplateWithNomenclature = (type: string) => {
    const template = getTemplateByType(type);
    if (!template || !nomenclatureData) return null;

    // Enrichir le template avec les données de nomenclature
    const enrichedTemplate = {
      ...template,
      fields: template.fields.map(field => {
        // Ajouter les options de nomenclature aux champs select
        if (field.type === 'select') {
          switch (field.name) {
            case 'type':
              return {
                ...field,
                options: nomenclatureData.legalTypes.map(t => t.name)
              };
            case 'category':
              return {
                ...field,
                options: nomenclatureData.procedureCategories.map(c => c.name)
              };
            case 'domain':
              return {
                ...field,
                options: nomenclatureData.juridicalDomains.map(d => d.name)
              };
            case 'organization':
            case 'authority':
              return {
                ...field,
                options: nomenclatureData.organizations.map(o => o.name)
              };
            case 'signatory':
              return {
                ...field,
                options: nomenclatureData.signatories.map(s => s.name)
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

  const mapOCRDataToForm = (ocrData: Record<string, unknown>, documentType: 'legal' | 'procedure') => {
    if (!nomenclatureData) return ocrData;

    const mappedData = { ...ocrData };

    if (documentType === 'legal') {
      // Mapper les types de textes juridiques
      if (mappedData.type) {
        const legalType = nomenclatureData.legalTypes.find(t => 
          t.name.toLowerCase().includes(mappedData.type.toLowerCase()) ||
          t.code.toLowerCase() === mappedData.type.toLowerCase()
        );
        if (legalType) {
          mappedData.type = legalType.name;
        }
      }

      // Mapper les organisations
      if (mappedData.authority) {
        const organization = nomenclatureData.organizations.find(o => 
          o.name.toLowerCase().includes(mappedData.authority.toLowerCase()) ||
          mappedData.authority.toLowerCase().includes(o.name.toLowerCase())
        );
        if (organization) {
          mappedData.authority = organization.name;
        }
      }

      // Mapper les domaines juridiques
      if (mappedData.category) {
        const domain = nomenclatureData.juridicalDomains.find(d => 
          d.name.toLowerCase().includes(mappedData.category.toLowerCase()) ||
          mappedData.category.toLowerCase().includes(d.name.toLowerCase())
        );
        if (domain) {
          mappedData.category = domain.name;
        }
      }
    } else if (documentType === 'procedure') {
      // Mapper les catégories de procédures
      if (mappedData.sector) {
        const category = nomenclatureData.procedureCategories.find(c => 
          c.name.toLowerCase().includes(mappedData.sector.toLowerCase()) ||
          mappedData.sector.toLowerCase().includes(c.name.toLowerCase())
        );
        if (category) {
          mappedData.sector = category.name;
        }
      }
    }

    return mappedData;
  };

  return {
    nomenclatureData,
    templates,
    getFormTemplateWithNomenclature,
    mapOCRDataToForm,
    getLegalTextFormForType,
    getProcedureFormForCategory
  };
}