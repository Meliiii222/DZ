
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddNewsFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddNewsForm({ isOpen, onClose }: AddNewsFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    source: '',
    content: '',
    tags: '',
    urgency: 'normal'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvelle actualité:', formData);
    toast({
      title: "Actualité ajoutée",
      description: `L'actualité "${formData.title}" a été ajoutée avec succès.`,
    });
    onClose();
    setFormData({ title: '', category: '', source: '', content: '', tags: '', urgency: 'normal' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle actualité</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titre de l'actualité</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="legislation">Législation</SelectItem>
                  <SelectItem value="jurisprudence">Jurisprudence</SelectItem>
                  <SelectItem value="reforme">Réforme</SelectItem>
                  <SelectItem value="annonce">Annonce officielle</SelectItem>
                  <SelectItem value="evenement">Événement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                value={formData.source}
                onChange={(e) => setFormData({...formData, source: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="urgency">Niveau d'urgence</Label>
              <Select onValueChange={(value) => setFormData({...formData, urgency: value})}>
                <SelectTrigger id="urgency">
                  <SelectValue placeholder="Normal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="faible">Faible</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="important">Important</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="content">Contenu de l'actualité</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={6}
              required
            />
          </div>

          <div>
            <Label htmlFor="tags">Mots-clés (séparés par des virgules)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="ex: droit commercial, nouvelle loi, entreprise"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Publier l'actualité
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
