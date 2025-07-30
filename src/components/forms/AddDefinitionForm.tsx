import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { BookOpen, Plus } from 'lucide-react';

interface AddDefinitionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddDefinitionForm({ isOpen, onClose }: AddDefinitionFormProps) {
  const [formData, setFormData] = useState({
    term: '',
    definition: '',
    domain: '',
    level: '',
    synonyms: '',
    examples: '',
    relatedTerms: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.term || !formData.definition || !formData.domain) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    console.log('Nouvelle définition juridique:', formData);
    
    toast.success("Définition ajoutée avec succès", {
      description: `Le terme "${formData.term}" a été ajouté au glossaire juridique`,
    });

    // Réinitialiser le formulaire
    setFormData({
      term: '',
      definition: '',
      domain: '',
      level: '',
      synonyms: '',
      examples: '',
      relatedTerms: ''
    });
    
    onClose();
  };

  const handleReset = () => {
    setFormData({
      term: '',
      definition: '',
      domain: '',
      level: '',
      synonyms: '',
      examples: '',
      relatedTerms: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-600" />
            Ajouter une Définition Juridique
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Enrichissez le glossaire juridique avec une nouvelle définition
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="term">Terme juridique *</Label>
              <Input
                id="term"
                value={formData.term}
                onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                placeholder="ex: Prescription"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="domain">Domaine juridique *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, domain: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un domaine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="droit-civil">Droit Civil</SelectItem>
                  <SelectItem value="droit-penal">Droit Pénal</SelectItem>
                  <SelectItem value="droit-commercial">Droit Commercial</SelectItem>
                  <SelectItem value="droit-administratif">Droit Administratif</SelectItem>
                  <SelectItem value="procedure-civile">Procédure Civile</SelectItem>
                  <SelectItem value="procedure-penale">Procédure Pénale</SelectItem>
                  <SelectItem value="droit-constitutionnel">Droit Constitutionnel</SelectItem>
                  <SelectItem value="droit-general">Droit Général</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="definition">Définition complète *</Label>
            <Textarea
              id="definition"
              value={formData.definition}
              onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
              placeholder="Définition claire et précise du terme juridique..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Niveau de complexité</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, level: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Niveau de difficulté" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debutant">Débutant</SelectItem>
                  <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                  <SelectItem value="avance">Avancé</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="synonyms">Synonymes</Label>
              <Input
                id="synonyms"
                value={formData.synonyms}
                onChange={(e) => setFormData({ ...formData, synonyms: e.target.value })}
                placeholder="Termes équivalents (séparés par des virgules)"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="examples">Exemples d'usage</Label>
            <Textarea
              id="examples"
              value={formData.examples}
              onChange={(e) => setFormData({ ...formData, examples: e.target.value })}
              placeholder="Exemples concrets d'utilisation du terme..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relatedTerms">Termes connexes</Label>
            <Input
              id="relatedTerms"
              value={formData.relatedTerms}
              onChange={(e) => setFormData({ ...formData, relatedTerms: e.target.value })}
              placeholder="Termes liés (séparés par des virgules)"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter la définition
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              Réinitialiser
            </Button>
            <Button type="button" variant="ghost" onClick={onClose}>
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}