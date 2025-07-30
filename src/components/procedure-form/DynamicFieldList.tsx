
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface DynamicFieldListProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  type?: 'input' | 'textarea';
}

export function DynamicFieldList({ 
  label, 
  values, 
  onChange, 
  placeholder = '', 
  type = 'input' 
}: DynamicFieldListProps) {
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
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      {displayValues.map((value, index) => (
        <div key={index} className="flex items-start gap-2">
          {type === 'textarea' ? (
            <Textarea
              value={value}
              onChange={(e) => updateField(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          ) : (
            <Input
              value={value}
              onChange={(e) => updateField(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          )}
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
