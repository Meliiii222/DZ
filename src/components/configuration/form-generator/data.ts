// @ts-nocheck
import { Type, FileText, Hash, Calendar, Mail, Phone, MapPin, List, ToggleLeft, Star } from 'lucide-react';

export interface FieldType {
  value: string;
  label: string;
  icon: any;
}

export interface GenerationTemplate {
  id: string;
  name: string;
  category: string;
  fields: string[];
  isDefault: boolean;
}

export const fieldTypes: FieldType[] = [
  { value: "text", label: "Texte", icon: Type },
  { value: "textarea", label: "Zone de texte", icon: FileText },
  { value: "number", label: "Nombre", icon: Hash },
  { value: "date", label: "Date", icon: Calendar },
  { value: "email", label: "Email", icon: Mail },
  { value: "tel", label: "Téléphone", icon: Phone },
  { value: "url", label: "URL", icon: MapPin },
  { value: "select", label: "Liste déroulante", icon: List },
  { value: "checkbox", label: "Case à cocher", icon: ToggleLeft },
  { value: "radio", label: "Bouton radio", icon: Star }
];

export const generationTemplates: GenerationTemplate[] = [
  {
    id: "texte-juridique",
    name: "Texte Juridique",
    category: "Législatif",
    fields: ["title", "number", "date", "category", "content"],
    isDefault: true
  },
  {
    id: "procedure-admin",
    name: "Procédure Administrative",
    category: "Administratif",
    fields: ["name", "description", "steps", "documents", "deadline"],
    isDefault: true
  },
  {
    id: "formulaire-demande",
    name: "Formulaire de Demande",
    category: "Service",
    fields: ["applicant", "request_type", "reason", "documents", "contact"],
    isDefault: true
  }
];

export const algerianDocumentTypes = [
  { value: "loi", label: "Loi" },
  { value: "decret", label: "Décret" },
  { value: "arrete", label: "Arrêté" },
  { value: "circulaire", label: "Circulaire" },
  { value: "instruction", label: "Instruction" },
  { value: "decision", label: "Décision" },
  { value: "ordonnance", label: "Ordonnance" },
  { value: "reglement", label: "Règlement" }
];

export const algerianInstitutions = [
  { value: "presidence", label: "Présidence de la République" },
  { value: "gouvernement", label: "Gouvernement" },
  { value: "assemblee", label: "Assemblée Populaire Nationale" },
  { value: "conseil-nation", label: "Conseil de la Nation" },
  { value: "cour-supreme", label: "Cour Suprême" },
  { value: "conseil-etat", label: "Conseil d'État" },
  { value: "ministere", label: "Ministère" },
  { value: "wilaya", label: "Wilaya" },
  { value: "commune", label: "Commune" }
];

// Additional exports needed by other components
export const formTypes = [
  { value: "legal", label: "Texte Juridique" },
  { value: "procedure", label: "Procédure Administrative" },
  { value: "form", label: "Formulaire" }
];

export const formLists = [
  { value: "laws", label: "Lois" },
  { value: "decrees", label: "Décrets" },
  { value: "procedures", label: "Procédures" }
];

export const organizationOptions = [
  { value: "ministry", label: "Ministère" },
  { value: "wilaya", label: "Wilaya" },
  { value: "commune", label: "Commune" },
  { value: "agency", label: "Agence" }
];