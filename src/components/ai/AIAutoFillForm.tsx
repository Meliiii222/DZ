
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AIAutoFillFormProps {
  formType: 'legal-text' | 'procedure' | 'general';
  prompt: string;
  onFormTypeChange: (value: string) => void;
  onPromptChange: (value: string) => void;
}

export function AIAutoFillForm({ formType, prompt, onFormTypeChange, onPromptChange }: AIAutoFillFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Type de formulaire</Label>
        <Select value={formType} onValueChange={onFormTypeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="legal-text">Texte juridique</SelectItem>
            <SelectItem value="procedure">Procédure administrative</SelectItem>
            <SelectItem value="general">Général</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Description du contenu à générer</Label>
        <Textarea
          placeholder="Décrivez le type de contenu que vous souhaitez générer automatiquement..."
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          rows={4}
          className="resize-none"
        />
      </div>
    </div>
  );
}
