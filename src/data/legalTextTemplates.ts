export interface LegalTextTemplate {
  name: string;
  type: string;
  fields: LegalTextField[];
}

export interface LegalTextField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'file' | 'dynamic-list';
  required: boolean;
  options?: string[];
  placeholder?: string;
  conditional?: {
    field: string;
    values: string[];
  };
}

// Templates de base existants
const BASE_TEMPLATES: LegalTextTemplate[] = [
  {
    name: 'Constitution',
    type: 'constitution',
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true },
      { name: 'content', label: 'Contenu', type: 'textarea', required: true },
      { name: 'publicationDate', label: 'Date de publication', type: 'date', required: true },
      { name: 'organization', label: 'Organisation', type: 'text', required: true }
    ]
  }
];

// Importer tous les nouveaux templates
import { COMPLETE_LEGAL_TEXT_TEMPLATES } from './legalTextTemplatesComplete';
import { COMPLETE_LEGAL_TEXT_TEMPLATES_2 } from './legalTextTemplatesComplete2';
import { COMPLETE_LEGAL_TEXT_TEMPLATES_3 } from './legalTextTemplatesComplete3';

// Combiner tous les templates
export const ALL_LEGAL_TEXT_TEMPLATES: LegalTextTemplate[] = [
  ...BASE_TEMPLATES,
  ...COMPLETE_LEGAL_TEXT_TEMPLATES,
  ...COMPLETE_LEGAL_TEXT_TEMPLATES_2,
  ...COMPLETE_LEGAL_TEXT_TEMPLATES_3
];

export function getLegalTextTemplate(type: string): LegalTextTemplate | null {
  return ALL_LEGAL_TEXT_TEMPLATES.find(template => template.type === type) || null;
}

export function getAllLegalTextTypes(): string[] {
  return ALL_LEGAL_TEXT_TEMPLATES.map(template => template.type);
}
