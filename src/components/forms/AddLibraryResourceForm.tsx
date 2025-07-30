
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddLibraryResourceFormProps {
  isOpen: boolean;
  onClose: () => void;
  resourceType: 'ouvrage' | 'revue' | 'journal' | 'article' | 'video' | 'directory';
}

export function AddLibraryResourceForm({ isOpen, onClose, resourceType }: AddLibraryResourceFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    year: '',
    category: '',
    description: '',
    pages: '',
    isbn: '',
    url: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation d'ajout de ressource
    console.log('Ajout de ressource:', resourceType, formData);
    
    toast({
      title: "Ressource ajoutée",
      description: `${getResourceTitle(resourceType)} "${formData.title}" a été ajouté avec succès.`,
      duration: 3000,
    });
    
    // Réinitialiser le formulaire
    setFormData({
      title: '',
      author: '',
      publisher: '',
      year: '',
      category: '',
      description: '',
      pages: '',
      isbn: '',
      url: ''
    });
    
    onClose();
  };

  const getResourceTitle = (type: string) => {
    switch (type) {
      case 'ouvrage': return 'L\'ouvrage';
      case 'revue': return 'La revue';
      case 'journal': return 'Le journal';
      case 'article': return 'L\'article';
      case 'video': return 'La vidéo';
      case 'directory': return 'L\'entrée d\'annuaire';
      default: return 'La ressource';
    }
  };

  const getFormTitle = () => {
    switch (resourceType) {
      case 'ouvrage': return 'Ajouter un Ouvrage';
      case 'revue': return 'Ajouter une Revue';
      case 'journal': return 'Ajouter un Journal';
      case 'article': return 'Ajouter un Article';
      case 'video': return 'Ajouter une Vidéo';
      case 'directory': return 'Ajouter une Entrée d\'Annuaire';
      default: return 'Ajouter une Ressource';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getFormTitle()}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Titre de la ressource"
              />
            </div>
            
            <div>
              <Label htmlFor="author">
                {resourceType === 'video' ? 'Intervenant' : 'Auteur'}
              </Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder={resourceType === 'video' ? 'Nom de l\'intervenant' : 'Nom de l\'auteur'}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="publisher">
                {resourceType === 'video' ? 'Durée' : 'Éditeur/Source'}
              </Label>
              <Input
                id="publisher"
                value={formData.publisher}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                placeholder={resourceType === 'video' ? 'ex: 1h 30min' : 'Nom de l\'éditeur'}
              />
            </div>
            
            <div>
              <Label htmlFor="year">
                {resourceType === 'video' ? 'Date' : 'Année'}
              </Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder={resourceType === 'video' ? 'Date de publication' : 'Année de publication'}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="droit-civil">Droit Civil</SelectItem>
                  <SelectItem value="droit-penal">Droit Pénal</SelectItem>
                  <SelectItem value="droit-public">Droit Public</SelectItem>
                  <SelectItem value="droit-commercial">Droit Commercial</SelectItem>
                  <SelectItem value="droit-administratif">Droit Administratif</SelectItem>
                  <SelectItem value="droit-constitutionnel">Droit Constitutionnel</SelectItem>
                  <SelectItem value="droit-international">Droit International</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {resourceType !== 'video' && (
              <div>
                <Label htmlFor="pages">Nombre de pages</Label>
                <Input
                  id="pages"
                  type="number"
                  value={formData.pages}
                  onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                  placeholder="ex: 250"
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description détaillée de la ressource"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resourceType !== 'video' && (
              <div>
                <Label htmlFor="isbn">ISBN/ISSN</Label>
                <Input
                  id="isbn"
                  value={formData.isbn}
                  onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  placeholder="Numéro ISBN ou ISSN"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="url">URL/Lien</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="Lien vers la ressource"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter la ressource
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
