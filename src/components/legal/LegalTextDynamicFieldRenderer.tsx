
// @ts-nocheck
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Upload, File, X } from 'lucide-react';
import { LegalTextField } from '@/data/legalTextTemplates';

interface LegalTextDynamicFieldRendererProps {
  field: LegalTextField;
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
  formData?: Record<string, unknown>;
}

export function LegalTextDynamicFieldRenderer({ 
  field, 
  value, 
  onChange,
  formData = {} 
}: LegalTextDynamicFieldRendererProps) {

  // Check if field should be shown based on conditional logic
  if (field.conditional) {
    const conditionValue = formData[field.conditional.field];
    if (!field.conditional.values.includes(conditionValue)) {
      return null;
    }
  }

  const renderBasicField = () => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`}
            required={field.required}
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`}
            required={field.required}
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`}
            required={field.required}
            rows={4}
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        );

      case 'select':
        return (
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger className="border-gray-200 focus:border-blue-500">
              <SelectValue placeholder={`Sélectionner ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'date':
        return (
          <Input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        );

      case 'file':
        return (
          <div className="space-y-2">
            {value ? (
              <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-md bg-gray-50">
                <File className="w-4 h-4 text-blue-600" />
                <span className="flex-1 text-sm text-gray-700">{value}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onChange('')}
                  className="text-red-500 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="relative">
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={(e) => onChange(e.target.files?.[0]?.name || '')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 transition-colors">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Cliquer pour télécharger ou glisser-déposer
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Formats supportés: PDF, DOC, DOCX, JPG, PNG
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderDynamicList = () => {
    const values = Array.isArray(value) ? value : [''];

    const addField = () => {
      onChange([...values, '']);
    };

    const removeField = (index: number) => {
      const newValues = values.filter((_, i) => i !== index);
      onChange(newValues);
    };

    const updateField = (index: number, fieldValue: string) => {
      const newValues = [...values];
      newValues[index] = fieldValue;
      onChange(newValues);
    };

    return (
      <div className="space-y-3">
        {values.map((fieldValue, index) => (
          <div key={index} className="flex items-start gap-2">
            <Textarea
              value={fieldValue || ''}
              onChange={(e) => updateField(index, e.target.value)}
              placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}...`}
              className="flex-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
            {values.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeField(index)}
                className="text-red-500 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={addField}
          className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
        >
          <Plus className="w-4 h-4" />
          Ajouter {field.label.toLowerCase()}
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {field.type === 'dynamic-list' ? renderDynamicList() : renderBasicField()}
    </div>
  );
}
