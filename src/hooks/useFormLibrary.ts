import { useState, useEffect } from 'react';
import { ALL_FORM_TEMPLATES } from '@/data/formTemplatesFinal';
import { FormTemplate } from '@/data/formTemplates';

export function useFormLibrary() {
  const [templates, setTemplates] = useState<FormTemplate[]>([]);

  useEffect(() => {
    setTemplates(ALL_FORM_TEMPLATES);
  }, []);

  const getTemplateByType = (type: string): FormTemplate | undefined => {
    return templates.find(template => 
      template.type.toLowerCase() === type.toLowerCase() ||
      template.name.toLowerCase() === type.toLowerCase()
    );
  };

  const getTemplatesByCategory = (category: string): FormTemplate[] => {
    return templates.filter(template => 
      template.category.toLowerCase() === category.toLowerCase()
    );
  };

  const getFormFieldsForType = (type: string) => {
    const template = getTemplateByType(type);
    return template ? template.fields : [];
  };

  const getLegalTextFormForType = (type: string) => {
    // Mapping des types de textes juridiques vers les templates
    const typeMapping: { [key: string]: string } = {
      'loi': 'Loi',
      'ordonnance': 'Ordonnance',
      'decret': 'Décret',
      'arrete': 'Arrêté',
      'circulaire': 'Circulaire',
      'decision': 'Décision',
      'constitution': 'Constitution',
      'reglement': 'Règlement',
      'instruction': 'Instruction'
    };

    const templateType = typeMapping[type.toLowerCase()];
    return templateType ? getTemplateByType(templateType) : null;
  };

  const getProcedureFormForCategory = (category: string) => {
    // Mapping des catégories de procédures vers les templates
    const categoryMapping: { [key: string]: string } = {
      'urbanisme': 'Urbanisme',
      'etat-civil': 'État civil',
      'social': 'Social',
      'fiscal': 'Fiscal',
      'commerce': 'Commerce',
      'environnement': 'Environnement'
    };

    const templateType = categoryMapping[category.toLowerCase()];
    return templateType ? getTemplatesByCategory(templateType)[0] : null;
  };

  return {
    templates,
    getTemplateByType,
    getTemplatesByCategory,
    getFormFieldsForType,
    getLegalTextFormForType,
    getProcedureFormForCategory
  };
}