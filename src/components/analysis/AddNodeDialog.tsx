import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNode: (node: Record<string, unknown>) => void;
}

export function AddNodeDialog({ isOpen, onClose, onAddNode }: AddNodeDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    importance: 'medium',
    reference: '',
    date: '',
    connections: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newNode = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type,
      description: formData.description,
      importance: formData.importance,
      reference: formData.reference,
      lastUpdated: formData.date || new Date().toISOString().split('T')[0],
      connections: 0
    };

    onAddNode(newNode);
    toast({
      title: "Nœud ajouté",
      description: `Le nœud "${formData.title}" a été ajouté au graphe.`,
    });
    
    onClose();
    setFormData({
      title: '',
      type: '',
      description: '',
      importance: 'medium',
      reference: '',
      date: '',
      connections: []
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau nœud au graphe</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Titre du texte juridique</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="ex: Code Civil Algérien"
                required
              />
            </div>
            <div>
              <Label htmlFor="reference">Référence</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => setFormData({...formData, reference: e.target.value})}
                placeholder="ex: Loi 05-10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Type de texte</Label>
              <Select onValueChange={(value) => setFormData({...formData, type: value})} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Constitution">Constitution</SelectItem>
                  <SelectItem value="Code">Code</SelectItem>
                  <SelectItem value="Loi">Loi</SelectItem>
                  <SelectItem value="Loi Organique">Loi Organique</SelectItem>
                  <SelectItem value="Ordonnance">Ordonnance</SelectItem>
                  <SelectItem value="Décret">Décret</SelectItem>
                  <SelectItem value="Décret Exécutif">Décret Exécutif</SelectItem>
                  <SelectItem value="Arrêté">Arrêté</SelectItem>
                  <SelectItem value="Circulaire">Circulaire</SelectItem>
                  <SelectItem value="Instruction">Instruction</SelectItem>
                  <SelectItem value="Règlement">Règlement</SelectItem>
                  <SelectItem value="Jurisprudence">Jurisprudence</SelectItem>
                  <SelectItem value="Fonction publique">Fonction publique</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="importance">Niveau d'importance</Label>
              <Select onValueChange={(value) => setFormData({...formData, importance: value})} defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Critique</SelectItem>
                  <SelectItem value="medium">Important</SelectItem>
                  <SelectItem value="low">Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="date">Date de publication</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Description courte du texte juridique et de son domaine d'application..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter au Graphe
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}