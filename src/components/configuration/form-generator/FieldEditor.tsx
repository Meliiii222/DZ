// @ts-nocheck
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Edit, 
  Plus, 
  Trash2, 
  Copy, 
  ArrowUp, 
  ArrowDown, 
  Save,
  Eye
} from "lucide-react";
import { FormField } from "./types";
import { fieldTypes } from "./data";

interface FieldEditorProps {
  fields: FormField[];
  editingField: string | null;
  generationMethod: 'manual' | 'ocr';
  onAddField: () => void;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onRemoveField: (fieldId: string) => void;
  onDuplicateField: (fieldId: string) => void;
  onMoveField: (fieldId: string, direction: 'up' | 'down') => void;
  onEditField: (fieldId: string | null) => void;
  onPreview?: () => void;
}

export function FieldEditor({
  fields,
  editingField,
  generationMethod,
  onAddField,
  onUpdateField,
  onRemoveField,
  onDuplicateField,
  onMoveField,
  onEditField,
  onPreview
}: FieldEditorProps) {
  if (fields.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit className="w-5 h-5 text-green-600" />
            Éditeur de Champs ({fields.length} champs)
            {generationMethod === 'ocr' && (
              <Badge className="bg-green-100 text-green-800">Généré par OCR</Badge>
            )}
          </div>
          <Button onClick={onAddField} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un champ
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4 space-y-3">
            {editingField === field.id ? (
              // Mode édition
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Nom du champ</Label>
                    <Input
                      value={field.name}
                      onChange={(e) => onUpdateField(field.id, { name: e.target.value })}
                      placeholder="nom_du_champ"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Libellé</Label>
                    <Input
                      value={field.label}
                      onChange={(e) => onUpdateField(field.id, { label: e.target.value })}
                      placeholder="Libellé du champ"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Type de champ</Label>
                    <Select value={field.type} onValueChange={(value) => onUpdateField(field.id, { type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldTypes.map((type) => {
                          const IconComponent = type.icon;
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <IconComponent className="w-4 h-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Placeholder</Label>
                    <Input
                      value={field.placeholder || ''}
                      onChange={(e) => onUpdateField(field.id, { placeholder: e.target.value })}
                      placeholder="Texte d'aide"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={field.description || ''}
                    onChange={(e) => onUpdateField(field.id, { description: e.target.value })}
                    placeholder="Description du champ"
                    rows={2}
                  />
                </div>
                
                {field.type === 'select' && (
                  <div className="space-y-2">
                    <Label>Options (une par ligne)</Label>
                    <Textarea
                      value={field.options?.join('\n') || ''}
                      onChange={(e) => onUpdateField(field.id, { options: e.target.value.split('\n').filter(opt => opt.trim()) })}
                      placeholder="Option 1&#10;Option 2&#10;Option 3"
                      rows={3}
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.required}
                      onCheckedChange={(checked) => onUpdateField(field.id, { required: checked })}
                    />
                    <Label>Champ obligatoire</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.repeatable || false}
                      onCheckedChange={(checked) => onUpdateField(field.id, { repeatable: checked })}
                    />
                    <Label>Champ répétitif</Label>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={() => onEditField(null)} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </Button>
                </div>
              </div>
            ) : (
              // Mode affichage
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{field.label}</h4>
                    <Badge variant="outline">{field.type}</Badge>
                    {field.required && <Badge className="bg-red-100 text-red-800">Obligatoire</Badge>}
                    {field.repeatable && <Badge className="bg-blue-100 text-blue-800">Répétitif</Badge>}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Nom: {field.name}</p>
                  {field.description && (
                    <p className="text-xs text-gray-500">{field.description}</p>
                  )}
                  {field.placeholder && (
                    <p className="text-xs text-gray-400">Placeholder: {field.placeholder}</p>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => onMoveField(field.id, 'up')} disabled={index === 0}>
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onMoveField(field.id, 'down')} disabled={index === fields.length - 1}>
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDuplicateField(field.id)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onEditField(field.id)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onRemoveField(field.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Bouton d'ajout en bas */}
        <div className="flex justify-center pt-4 border-t">
          <Button onClick={onAddField} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un champ
          </Button>
        </div>
        
        {/* Bouton de prévisualisation */}
        {fields.length > 0 && onPreview && (
          <div className="flex justify-center pt-4">
            <Button onClick={onPreview} className="bg-blue-600 hover:bg-blue-700">
              <Eye className="w-4 h-4 mr-2" />
              Prévisualisation
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}