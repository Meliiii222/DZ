import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface AddTerminologieSpecialiseeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTerminologieSpecialiseeForm({ isOpen, onClose }: AddTerminologieSpecialiseeFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    year: '',
    description: '',
    pages: '',
    isbn: '',
    domaineSpecialisation: '',
    typeTerminologie: '',
    niveauSpecialisation: '',
    contexteApplication: '',
    methodologie: '',
    sourcesReference: '',
    publicCible: '',
    formatOrganisation: '',
    criteresInclusion: [] as string[],
    exemplesUtilisation: '',
    referencesBibliographiques: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Ajout de terminologie spécialisée:', formData);
    
    toast({
      title: "Terminologie spécialisée ajoutée",
      description: `La terminologie "${formData.title}" a été ajoutée avec succès à la bibliothèque.`,
      duration: 3000,
    });
    
    // Réinitialiser le formulaire
    setFormData({
      title: '',
      author: '',
      publisher: '',
      year: '',
      description: '',
      pages: '',
      isbn: '',
      domaineSpecialisation: '',
      typeTerminologie: '',
      niveauSpecialisation: '',
      contexteApplication: '',
      methodologie: '',
      sourcesReference: '',
      publicCible: '',
      formatOrganisation: '',
      criteresInclusion: [],
      exemplesUtilisation: '',
      referencesBibliographiques: ''
    });
    
    onClose();
  };

  const handleCritereChange = (critere: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      criteresInclusion: checked 
        ? [...prev.criteresInclusion, critere]
        : prev.criteresInclusion.filter(c => c !== critere)
    }));
  };

  const criteresInclusion = [
    'Fréquence d\'usage élevée',
    'Termes techniques spécialisés',
    'Néologismes juridiques',
    'Expressions idiomatiques',
    'Abréviations officielles',
    'Formules consacrées',
    'Variantes régionales',
    'Évolution historique'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter une Terminologie Spécialisée</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations bibliographiques */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations bibliographiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Titre de la terminologie *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="ex: Terminologie du Droit Commercial"
                />
              </div>
              
              <div>
                <Label htmlFor="author">Auteur(s) ou Institution *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                  placeholder="Nom de l'auteur ou institution"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="publisher">Éditeur/Source</Label>
                <Input
                  id="publisher"
                  value={formData.publisher}
                  onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                  placeholder="Éditeur ou source de publication"
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
                <Label htmlFor="pages">Nombre de pages/entrées</Label>
                <Input
                  id="pages"
                  type="number"
                  value={formData.pages}
                  onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                  placeholder="320"
                />
              </div>
            </div>
          </div>

          {/* Spécialisation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Domaine de spécialisation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="domaineSpecialisation">Domaine principal *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, domaineSpecialisation: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Domaine de spécialisation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="droit-civil">Droit Civil</SelectItem>
                    <SelectItem value="droit-penal">Droit Pénal</SelectItem>
                    <SelectItem value="droit-commercial">Droit Commercial</SelectItem>
                    <SelectItem value="droit-administratif">Droit Administratif</SelectItem>
                    <SelectItem value="droit-travail">Droit du Travail</SelectItem>
                    <SelectItem value="droit-constitutionnel">Droit Constitutionnel</SelectItem>
                    <SelectItem value="droit-international">Droit International</SelectItem>
                    <SelectItem value="procedure-civile">Procédure Civile</SelectItem>
                    <SelectItem value="procedure-penale">Procédure Pénale</SelectItem>
                    <SelectItem value="droit-foncier">Droit Foncier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="typeTerminologie">Type de terminologie</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, typeTerminologie: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="glossaire">Glossaire</SelectItem>
                    <SelectItem value="lexique">Lexique spécialisé</SelectItem>
                    <SelectItem value="vocabulaire">Vocabulaire technique</SelectItem>
                    <SelectItem value="thesaurus">Thésaurus</SelectItem>
                    <SelectItem value="index">Index terminologique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="niveauSpecialisation">Niveau de spécialisation</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, niveauSpecialisation: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Général</SelectItem>
                    <SelectItem value="specialise">Spécialisé</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                    <SelectItem value="recherche">Recherche avancée</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="publicCible">Public cible</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, publicCible: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Public" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="etudiants">Étudiants en droit</SelectItem>
                    <SelectItem value="praticiens">Praticiens du droit</SelectItem>
                    <SelectItem value="chercheurs">Chercheurs</SelectItem>
                    <SelectItem value="traducteurs">Traducteurs juridiques</SelectItem>
                    <SelectItem value="fonctionnaires">Fonctionnaires</SelectItem>
                    <SelectItem value="general">Grand public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Méthodologie et organisation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Méthodologie et organisation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="methodologie">Méthodologie utilisée</Label>
                <Textarea
                  id="methodologie"
                  value={formData.methodologie}
                  onChange={(e) => setFormData({ ...formData, methodologie: e.target.value })}
                  placeholder="Description de la méthode de collecte et d'organisation des termes"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="formatOrganisation">Format d'organisation</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, formatOrganisation: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Organisation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alphabetique">Alphabétique</SelectItem>
                    <SelectItem value="thematique">Thématique</SelectItem>
                    <SelectItem value="conceptuel">Conceptuel</SelectItem>
                    <SelectItem value="frequence">Par fréquence</SelectItem>
                    <SelectItem value="chronologique">Chronologique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="contexteApplication">Contexte d'application</Label>
              <Textarea
                id="contexteApplication"
                value={formData.contexteApplication}
                onChange={(e) => setFormData({ ...formData, contexteApplication: e.target.value })}
                placeholder="Contexte juridique et professionnel d'utilisation de cette terminologie"
                rows={2}
              />
            </div>
          </div>

          {/* Critères d'inclusion */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Critères d'inclusion des termes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {criteresInclusion.map((critere) => (
                <div key={critere} className="flex items-center space-x-2">
                  <Checkbox
                    id={critere}
                    checked={formData.criteresInclusion.includes(critere)}
                    onCheckedChange={(checked) => handleCritereChange(critere, checked as boolean)}
                  />
                  <Label htmlFor={critere} className="text-sm">{critere}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Informations complémentaires */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations complémentaires</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sourcesReference">Sources de référence</Label>
                <Textarea
                  id="sourcesReference"
                  value={formData.sourcesReference}
                  onChange={(e) => setFormData({ ...formData, sourcesReference: e.target.value })}
                  placeholder="Principales sources utilisées (codes, jurisprudence, doctrine...)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="exemplesUtilisation">Exemples d'utilisation</Label>
                <Textarea
                  id="exemplesUtilisation"
                  value={formData.exemplesUtilisation}
                  onChange={(e) => setFormData({ ...formData, exemplesUtilisation: e.target.value })}
                  placeholder="Exemples concrets d'usage des termes dans des contextes juridiques"
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="isbn">ISBN/Référence</Label>
                <Input
                  id="isbn"
                  value={formData.isbn}
                  onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  placeholder="ISBN ou référence de publication"
                />
              </div>

              <div>
                <Label htmlFor="referencesBibliographiques">Références bibliographiques</Label>
                <Input
                  id="referencesBibliographiques"
                  value={formData.referencesBibliographiques}
                  onChange={(e) => setFormData({ ...formData, referencesBibliographiques: e.target.value })}
                  placeholder="Références complémentaires"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description générale</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description générale du contenu, objectifs et particularités de cette terminologie"
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Ajouter la terminologie
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}