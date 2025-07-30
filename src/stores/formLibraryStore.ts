import { create } from 'zustand';
import { FormField } from '@/components/configuration/form-generator/types';
import { ALL_FORM_TEMPLATES } from '@/data/formTemplatesFinal';
import { FormTemplate } from '@/data/formTemplates';

export interface SavedForm {
  id: string;
  name: string;
  description: string;
  type: string;
  fields: FormField[];
  createdAt: string;
  category: string;
}

interface FormLibraryStore {
  forms: SavedForm[];
  addForm: (form: Omit<SavedForm, 'id' | 'createdAt'>) => void;
  removeForm: (id: string) => void;
  updateForm: (id: string, updates: Partial<SavedForm>) => void;
  getForm: (id: string) => SavedForm | undefined;
}

// Fonction pour convertir FormTemplate en SavedForm
const convertTemplateToSavedForm = (template: FormTemplate): SavedForm => ({
  id: template.id,
  name: template.name,
  description: template.description,
  type: template.type,
  fields: template.fields.map((field, index) => ({
    ...field,
    id: `${template.id}_field_${index}`,
    type: field.type as string
  })),
  createdAt: template.createdAt,
  category: template.category
});

// Initialiser les formulaires avec tous les templates, en excluant "Fonction Publique"
const initializeForms = (): SavedForm[] => {
  return ALL_FORM_TEMPLATES
    .filter(template => template.name !== 'Fonction Publique')
    .map(convertTemplateToSavedForm);
};

export const useFormLibraryStore = create<FormLibraryStore>((set, get) => ({
  forms: initializeForms(),
  
  addForm: (formData) => {
    const newForm: SavedForm = {
      ...formData,
      id: `form_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    set((state) => ({
      forms: [...state.forms, newForm]
    }));
  },
  
  removeForm: (id) => {
    set((state) => ({
      forms: state.forms.filter(form => form.id !== id)
    }));
  },
  
  updateForm: (id, updates) => {
    set((state) => ({
      forms: state.forms.map(form => 
        form.id === id ? { ...form, ...updates } : form
      )
    }));
  },
  
  getForm: (id) => {
    return get().forms.find(form => form.id === id);
  }
}));