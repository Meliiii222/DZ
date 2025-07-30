import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Languages, Plus, X } from 'lucide-react';

interface AddDictionaryTermFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddDictionaryTermForm({ isOpen, onClose }: AddDictionaryTermFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    termFrench: '',
    termArabic: '',
    pronunciation: '',
    definition: '',
    category: '',
    examples: [''],
    synonyms: [''],
    relatedTerms: [''],
    difficulty: 'Débutant'
  });

  const categories = [
    'Droit civil',
    'Droit pénal',
    'Droit commercial',
    'Droit administratif',
    'Droit du travail',
    'Droit constitutionnel',
    'Droit fiscal',
    'Droit international',
    'Procédure civile',
    'Procédure pénale'
  ];

  const addField = (fieldName: 'examples' | 'synonyms' | 'relatedTerms') => {
    setFormData({
      ...formData,
      [fieldName]: [...formData[fieldName], '']
    });
  };

  const removeField = (fieldName: 'examples' | 'synonyms' | 'relatedTerms', index: number) => {
    const newArray = formData[fieldName].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [fieldName]: newArray.length > 0 ? newArray : ['']
    });
  };

  const updateField = (fieldName: 'examples' | 'synonyms' | 'relatedTerms', index: number, value: string) => {
    const newArray = [...formData[fieldName]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [fieldName]: newArray
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.termFrench.trim() || !formData.definition.trim()) {
      toast({
        title: "Champs obligatoires manquants",
        description: "Veuillez remplir au minimum le terme français et la définition",
        variant: "destructive",
      });
      return;
    }

    // Filtrer les champs vides
    const cleanData = {
      ...formData,
      examples: formData.examples.filter(ex => ex.trim() !== ''),
      synonyms: formData.synonyms.filter(syn => syn.trim() !== ''),
      relatedTerms: formData.relatedTerms.filter(term => term.trim() !== '')
    };

    console.log('Nouveau terme de dictionnaire:', cleanData);
    
    toast({
      title: "✅ Terme ajouté avec succès",
      description: `Le terme "${formData.termFrench}" a été ajouté au dictionnaire juridique`,
    });
    
    // Réinitialiser le formulaire
    setFormData({
      termFrench: '',
      termArabic: '',
      pronunciation: '',
      definition: '',
      category: '',
      examples: [''],
      synonyms: [''],
      relatedTerms: [''],
      difficulty: 'Débutant'
    });
    
    onClose();
  };

  const handleReset = () => {
    setFormData({
      termFrench: '',
      termArabic: '',
      pronunciation: '',
      definition: '',
      category: '',
      examples: [''],
      synonyms: [''],
      relatedTerms: [''],
      difficulty: 'Débutant'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Ajouter un Terme au Dictionnaire Juridique
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Enrichissez le dictionnaire juridique français-arabe avec de nouveaux termes
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Termes principaux */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="termFrench">
                Terme en français <span className="text-red-500">*</span>
              </Label>
              <Input
                id="termFrench"
                value={formData.termFrench}
                onChange={(e) => setFormData({...formData, termFrench: e.target.value})}
                placeholder="Ex: Jurisprudence"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="termArabic">Terme en arabe</Label>
              <Input
                id="termArabic"
                value={formData.termArabic}
                onChange={(e) => setFormData({...formData, termArabic: e.target.value})}
                placeholder="Ex: اجتهاد قضائي"
                dir="rtl"
              />
            </div>
          </div>

          {/* Prononciation et catégorie */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pronunciation">Prononciation (API)</Label>
              <Input
                id="pronunciation"
                value={formData.pronunciation}
                onChange={(e) => setFormData({...formData, pronunciation: e.target.value})}
                placeholder="Ex: /ʒy.ʁis.pʁy.dɑ̃s/"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">
                Catégorie <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Définition */}
          <div className="space-y-2">
            <Label htmlFor="definition">
              Définition <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="definition"
              value={formData.definition}
              onChange={(e) => setFormData({...formData, definition: e.target.value})}
              placeholder="Définition claire et précise du terme juridique..."
              rows={4}
              required
            />
          </div>

          {/* Niveau de difficulté */}
          <div className="space-y-2">
            <Label htmlFor="difficulty">Niveau de difficulté</Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value) => setFormData({...formData, difficulty: value})}
            >
              <SelectTrigger id="difficulty">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Débutant">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Débutant</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="Intermédiaire">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">Intermédiaire</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="Expert">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-red-100 text-red-800">Expert</Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Exemples */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Exemples d'utilisation</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => addField('examples')}>
                <Plus className="w-4 h-4 mr-1" />
                Ajouter un exemple
              </Button>
            </div>
            {formData.examples.map((example, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={example}
                  onChange={(e) => updateField('examples', index, e.target.value)}
                  placeholder={`Exemple ${index + 1}`}
                />
                {formData.examples.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeField('examples', index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Synonymes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Synonymes</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => addField('synonyms')}>
                <Plus className="w-4 h-4 mr-1" />
                Ajouter un synonyme
              </Button>
            </div>
            {formData.synonyms.map((synonym, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={synonym}
                  onChange={(e) => updateField('synonyms', index, e.target.value)}
                  placeholder={`Synonyme ${index + 1}`}
                />
                {formData.synonyms.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeField('synonyms', index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Termes associés */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Termes associés</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => addField('relatedTerms')}>
                <Plus className="w-4 h-4 mr-1" />
                Ajouter un terme associé
              </Button>
            </div>
            {formData.relatedTerms.map((term, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={term}
                  onChange={(e) => updateField('relatedTerms', index, e.target.value)}
                  placeholder={`Terme associé ${index + 1}`}
                />
                {formData.relatedTerms.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeField('relatedTerms', index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleReset}>
              Réinitialiser
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <BookOpen className="w-4 h-4 mr-2" />
                Ajouter le terme
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}