// @ts-nocheck
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, FileText, ClipboardList, Wand2 } from "lucide-react";
import { formTypes, formLists } from "./data";

interface FormConfigurationProps {
  selectedFormType: string;
  selectedFormList: string;
  formDescription: string;
  onFormTypeChange: (value: string) => void;
  onFormListChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onGenerate: () => void;
}

export function FormConfiguration({
  selectedFormType,
  selectedFormList,
  formDescription,
  onFormTypeChange,
  onFormListChange,
  onDescriptionChange,
  onGenerate
}: FormConfigurationProps) {
  const getAvailableForms = () => {
    if (!selectedFormType) return [];
    return formLists[selectedFormType as keyof typeof formLists] || [];
  };

  // Fonction pour remplir automatiquement la description
  const handleFormListChange = (value: string) => {
    onFormListChange(value);
    
    if (value) {
      const availableForms = getAvailableForms();
      const selectedForm = availableForms.find(form => form.value === value);
      if (selectedForm) {
        // Auto-remplir la description basée sur le formulaire sélectionné
        const autoDescription = `Formulaire ${selectedForm.label} - ${selectedForm.code}. Champs inclus: ${selectedForm.fields.join(', ')}.`;
        onDescriptionChange(autoDescription);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          Configuration du Formulaire
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="form-type">Type de Formulaire *</Label>
            <Select value={selectedFormType} onValueChange={onFormTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                {formTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="form-list">Liste des formulaires *</Label>
            <Select 
              value={selectedFormList} 
              onValueChange={handleFormListChange}
              disabled={!selectedFormType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un formulaire" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableForms().map((form) => (
                  <SelectItem key={form.value} value={form.value}>
                    <div className="flex items-center gap-2">
                      {selectedFormType === 'textes_juridiques' ? (
                        <FileText className="w-4 h-4" />
                      ) : (
                        <ClipboardList className="w-4 h-4" />
                      )}
                      {form.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="form-description">
            Description du formulaire
          </Label>
          <Textarea
            id="form-description"
            placeholder="Description détaillée du formulaire et de son utilisation..."
            value={formDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={3}
          />
        </div>
        
        <Button 
          onClick={onGenerate} 
          disabled={!selectedFormType || !selectedFormList}
          className="w-full md:w-auto"
        >
          <Wand2 className="w-4 h-4 mr-2" />
          Générer le Formulaire de Base
        </Button>
      </CardContent>
    </Card>
  );
}