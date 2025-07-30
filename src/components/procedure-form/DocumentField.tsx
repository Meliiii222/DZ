
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, Trash2 } from 'lucide-react';

interface DocumentFieldProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  type: 'existing' | 'text';
  onTypeChange: (type: 'existing' | 'text') => void;
}

export function DocumentField({ 
  label, 
  values, 
  onChange, 
  type, 
  onTypeChange 
}: DocumentFieldProps) {
  const addField = () => {
    onChange([...values, '']);
  };

  const removeField = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const updateField = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    onChange(newValues);
  };

  // Ensure we always have at least one field
  const displayValues = values.length === 0 ? [''] : values;

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      
      <RadioGroup
        value={type}
        onValueChange={(value) => onTypeChange(value as 'existing' | 'text')}
        className="mb-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="existing" id={`${label}-existing`} />
          <Label htmlFor={`${label}-existing`}>Sélection pour les procédures existantes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="text" id={`${label}-text`} />
          <Label htmlFor={`${label}-text`}>Texte pour les nouveaux</Label>
        </div>
      </RadioGroup>

      {displayValues.map((value, index) => (
        <div key={index} className="flex items-start gap-2">
          <Textarea
            value={value}
            onChange={(e) => updateField(index, e.target.value)}
            placeholder={type === 'existing' ? 'Sélectionner depuis la liste...' : 'Décrire le document...'}
            className="flex-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
          {displayValues.length > 1 && (
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
        Ajouter {label.toLowerCase()}
      </Button>
    </div>
  );
}
