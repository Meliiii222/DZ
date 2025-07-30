import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface AddDictionnaireJuridiqueFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddDictionnaireJuridiqueForm({ isOpen, onClose }: AddDictionnaireJuridiqueFormProps) {
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
    language: '',
    nbTermes: '',
    domaines: [] as string[],
    typeDictionnaire: '',
    formatDisponible: '',
    niveauDifficulte: '',
    sourceLangue: '',
    cibleLangue: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Ajout de dictionnaire juridique:', formData);
    
    toast({
      title: "Dictionnaire juridique ajouté",
      description: `Le dictionnaire "${formData.title}" a été ajouté avec succès à la bibliothèque.`,
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
      language: '',
      nbTermes: '',
      domaines: [],
      typeDictionnaire: '',
      formatDisponible: '',
      niveauDifficulte: '',
      sourceLangue: '',
      cibleLangue: ''
    });
    
    onClose();
  };

  const handleDomaineChange = (domaine: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      domaines: checked 
        ? [...prev.domaines, domaine]
        : prev.domaines.filter(d => d !== domaine)
    }));
  };

  const domaines = [
    'Droit Civil',
    'Droit Pénal',
    'Droit Commercial',
    'Droit Administratif',
    'Droit du Travail',
    'Droit Constitutionnel',
    'Droit International',
    'Procédure Civile',
    'Procédure Pénale'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un Dictionnaire Juridique</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations générales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations générales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Titre du dictionnaire *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="ex: Dictionnaire Juridique Français-Arabe"
                />
              </div>
              
              <div>
                <Label htmlFor="author">Auteur(s) *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                  placeholder="Nom de l'auteur principal"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="publisher">Éditeur</Label>
                <Input
                  id="publisher"
                  value={formData.publisher}
                  onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                  placeholder="Maison d'édition"
                />
              </div>
              
              <div>
                <Label htmlFor="year">Année de publication</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2024"
                />
              </div>

              <div>
                <Label htmlFor="pages">Nombre de pages</Label>
                <Input
                  id="pages"
                  type="number"
                  value={formData.pages}
                  onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                  placeholder="850"
                />
              </div>
            </div>
          </div>

          {/* Spécificités linguistiques */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Spécificités linguistiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="sourceLangue">Langue source *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, sourceLangue: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Langue d'origine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="francais">Français</SelectItem>
                    <SelectItem value="arabe">Arabe</SelectItem>
                    <SelectItem value="anglais">Anglais</SelectItem>
                    <SelectItem value="berber">Berbère</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cibleLangue">Langue cible</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, cibleLangue: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Langue de traduction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="francais">Français</SelectItem>
                    <SelectItem value="arabe">Arabe</SelectItem>
                    <SelectItem value="anglais">Anglais</SelectItem>
                    <SelectItem value="berber">Berbère</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="typeDictionnaire">Type de dictionnaire</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, typeDictionnaire: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bilingue">Bilingue</SelectItem>
                    <SelectItem value="monolingue">Monolingue</SelectItem>
                    <SelectItem value="multilingue">Multilingue</SelectItem>
                    <SelectItem value="etymologique">Étymologique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nbTermes">Nombre de termes</Label>
                <Input
                  id="nbTermes"
                  type="number"
                  value={formData.nbTermes}
                  onChange={(e) => setFormData({ ...formData, nbTermes: e.target.value })}
                  placeholder="15000"
                />
              </div>

              <div>
                <Label htmlFor="niveauDifficulte">Niveau de difficulté</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, niveauDifficulte: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debutant">Débutant</SelectItem>
                    <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                    <SelectItem value="avance">Avancé</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Domaines juridiques couverts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Domaines juridiques couverts</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {domaines.map((domaine) => (
                <div key={domaine} className="flex items-center space-x-2">
                  <Checkbox
                    id={domaine}
                    checked={formData.domaines.includes(domaine)}
                    onCheckedChange={(checked) => handleDomaineChange(domaine, checked as boolean)}
                  />
                  <Label htmlFor={domaine} className="text-sm">{domaine}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Autres informations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations complémentaires</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="formatDisponible">Format disponible</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, formatDisponible: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="papier">Papier uniquement</SelectItem>
                    <SelectItem value="numerique">Numérique uniquement</SelectItem>
                    <SelectItem value="hybride">Papier et numérique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  value={formData.isbn}
                  onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  placeholder="978-3-16-148410-0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description et contenu</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description détaillée du dictionnaire, méthodes utilisées, public cible..."
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Ajouter le dictionnaire
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}