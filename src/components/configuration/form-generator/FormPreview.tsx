import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Check, X, Plus } from "lucide-react";
import { FormField } from "./types";

interface FormPreviewProps {
  fields: FormField[];
  formDescription: string;
  onValidate?: () => void;
  onCancel?: () => void;
}

export function FormPreview({ fields, formDescription, onValidate, onCancel }: FormPreviewProps) {
  if (fields.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucun formulaire à prévisualiser</h3>
          <p className="text-gray-500">Générez d'abord un formulaire pour voir la prévisualisation</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-600" />
          Prévisualisation du Formulaire
        </CardTitle>
        {formDescription && (
          <p className="text-sm text-gray-600">{formDescription}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={`preview-${field.id}`} className="flex items-center gap-2">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
                {field.repeatable && <Badge variant="outline" className="text-xs">Répétitif</Badge>}
              </Label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={`preview-${field.id}`}
                  placeholder={field.placeholder}
                  readOnly
                  className="bg-gray-50"
                />
              ) : field.type === 'select' ? (
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options && field.options.length > 0 ? (
                      field.options.map((option, optionIndex) => (
                        <SelectItem key={optionIndex} value={option}>
                          {option}
                        </SelectItem>
                      ))
                    ) : (
                      <>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              ) : field.type === 'checkbox' ? (
                <div className="flex items-center space-x-2">
                  <Switch id={`preview-${field.id}`} />
                  <Label htmlFor={`preview-${field.id}`} className="text-sm text-gray-600">
                    {field.placeholder}
                  </Label>
                </div>
              ) : (
                <Input
                  id={`preview-${field.id}`}
                  type={field.type}
                  placeholder={field.placeholder}
                  readOnly
                  className="bg-gray-50"
                />
              )}
              {field.description && (
                <p className="text-xs text-gray-500">{field.description}</p>
              )}
              {field.repeatable && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 text-xs h-6"
                  disabled
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Ajouter
                </Button>
              )}
            </div>
          ))}
        </div>
        
        {/* Boutons d'action */}
        <div className="flex gap-3 pt-4 border-t">
          <Button 
            onClick={onValidate}
            className="flex-1"
            disabled={!onValidate}
          >
            <Check className="w-4 h-4 mr-2" />
            Valider
          </Button>
          <Button 
            onClick={onCancel}
            variant="outline"
            className="flex-1"
            disabled={!onCancel}
          >
            <X className="w-4 h-4 mr-2" />
            Annuler
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}