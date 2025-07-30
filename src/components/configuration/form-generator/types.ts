export interface FormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  repeatable?: boolean;
  placeholder?: string;
  description?: string;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  defaultValue?: string;
}

export interface FormGeneratorProps {
  selectedFormType: string;
  selectedFormList: string;
  formDescription: string;
  generatedFields: FormField[];
  editingField: string | null;
  showOCRScanner: boolean;
  generationMethod: 'manual' | 'ocr';
}

export interface FieldType {
  value: string;
  label: string;
  icon: Record<string, unknown>;
}

export interface FormTemplate {
  value: string;
  label: string;
  code: string;
  fields: string[];
}