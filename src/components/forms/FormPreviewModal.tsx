// @ts-nocheck
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Copy } from 'lucide-react';
import { FormTemplate } from '@/data/formTemplates';

interface FormPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: FormTemplate | null;
  onUseTemplate: (template: FormTemplate) => void;
  onExportTemplate: (template: FormTemplate) => void;
}

export function FormPreviewModal({ 
  isOpen, 
  onClose, 
  template, 
  onUseTemplate, 
  onExportTemplate 
}: FormPreviewModalProps) {
  if (!template) return null;

  const renderField = (field: Record<string, unknown>) => {
    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={field.name}
              placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`}
              disabled
              className="resize-none"
            />
          </div>
        );
      case 'select':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder={`Sélectionnez ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 'file':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.name}
              type="file"
              disabled
              className="cursor-not-allowed"
            />
          </div>
        );
      case 'number':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.name}
              type="number"
              placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`}
              disabled
            />
          </div>
        );
      case 'date':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.name}
              type="date"
              disabled
            />
          </div>
        );
      case 'checkbox':
        return (
          <div key={field.name} className="flex items-center space-x-2">
            <input
              id={field.name}
              type="checkbox"
              disabled
              className="cursor-not-allowed"
            />
            <Label htmlFor={field.name} className="cursor-not-allowed">
              {field.label}
            </Label>
          </div>
        );
      default:
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.name}
              type="text"
              placeholder={field.placeholder || `Entrez ${field.label.toLowerCase()}`}
              disabled
            />
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Aperçu du formulaire : {template.name}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Prévisualisation du formulaire {template.type} - {template.category}
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          {/* Informations du formulaire */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Nom</p>
                  <p className="text-sm">{template.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Type</p>
                  <Badge variant="outline">{template.type}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Catégorie</p>
                  <Badge variant="secondary">{template.category}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Description</p>
                  <p className="text-sm text-gray-700">{template.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Nombre de champs</p>
                  <p className="text-sm">{template.fields.length} champs configurés</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Champs obligatoires</p>
                  <p className="text-sm">
                    {template.fields.filter(f => f.required).length} sur {template.fields.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Aperçu du formulaire */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Aperçu des champs</CardTitle>
                <CardDescription>
                  Formulaire adapté selon les textes juridiques algériens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-[400px] overflow-y-auto pr-4">
                  <div className="space-y-4">
                    {template.fields.map((field) => renderField(field))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-500">
            Formulaire système - Adapté pour l'administration algérienne
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onExportTemplate(template)}
            >
              <Copy className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button onClick={() => onUseTemplate(template)}>
              <Download className="w-4 h-4 mr-2" />
              Utiliser ce formulaire
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}