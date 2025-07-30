
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus } from 'lucide-react';

interface NewTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (templateData: Record<string, unknown>) => void;
}

export function NewTemplateModal({ isOpen, onClose, onSave }: NewTemplateModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    content: '',
    variables: '',
    tags: '',
    language: 'fr',
    version: '1.0',
    status: 'Actif',
    accessLevel: 'public',
    isDefault: false
  });

  const handleSave = () => {
    const templateData = {
      ...formData,
      id: Date.now().toString(),
      usage: 0,
      lastUpdate: new Date().toISOString().split('T')[0],
      createdBy: 'Current User'
    };
    onSave(templateData);
    onClose();
    // Reset form
    setFormData({
      name: '',
      category: '',
      description: '',
      content: '',
      variables: '',
      tags: '',
      language: 'fr',
      version: '1.0',
      status: 'Actif',
      accessLevel: 'public',
      isDefault: false
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Nouveau Modèle de Document
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
          {/* Informations générales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations générales</h3>
            
            <div className="space-y-2">
              <Label htmlFor="templateName">Nom du modèle *</Label>
              <Input
                id="templateName"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Modèle de Loi, Modèle de Décret..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Législatif">Législatif</SelectItem>
                  <SelectItem value="Réglementaire">Réglementaire</SelectItem>
                  <SelectItem value="Administratif">Administratif</SelectItem>
                  <SelectItem value="Instruction">Instruction</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Pénal">Pénal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="templateDescription">Description</Label>
              <Textarea
                id="templateDescription"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Description du modèle de document..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Langue</Label>
                <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="ar">Arabe</SelectItem>
                    <SelectItem value="en">Anglais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={formData.version}
                  onChange={(e) => setFormData({...formData, version: e.target.value})}
                  placeholder="1.0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="loi, décret, juridique..."
              />
            </div>
          </div>

          {/* Contenu et configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contenu et configuration</h3>
            
            <div className="space-y-2">
              <Label htmlFor="templateContent">Contenu du modèle *</Label>
              <Textarea
                id="templateContent"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Tapez le contenu du modèle ici... Utilisez {{variable}} pour les variables."
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="variables">Variables disponibles</Label>
              <Textarea
                id="variables"
                value={formData.variables}
                onChange={(e) => setFormData({...formData, variables: e.target.value})}
                placeholder="{{titre}}, {{date}}, {{auteur}}, {{numero}}..."
                rows={3}
                className="font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Statut</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Actif">Actif</SelectItem>
                    <SelectItem value="Brouillon">Brouillon</SelectItem>
                    <SelectItem value="Archivé">Archivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Niveau d'accès</Label>
                <Select value={formData.accessLevel} onValueChange={(value) => setFormData({...formData, accessLevel: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Privé</SelectItem>
                    <SelectItem value="restricted">Restreint</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Aperçu des badges</Label>
              <div className="flex flex-wrap gap-2">
                {formData.category && <Badge variant="outline">{formData.category}</Badge>}
                <Badge className="bg-green-100 text-green-800">{formData.status}</Badge>
                <Badge variant="secondary">{formData.language.toUpperCase()}</Badge>
                {formData.version && <Badge variant="secondary">v{formData.version}</Badge>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            <Plus className="w-4 h-4 mr-2" />
            Créer le Modèle
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
