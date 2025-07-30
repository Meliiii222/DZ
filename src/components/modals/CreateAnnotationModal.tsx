
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Edit3 } from 'lucide-react';

interface CreateAnnotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (annotationData: Record<string, unknown>) => void;
}

export function CreateAnnotationModal({ isOpen, onClose, onSave }: CreateAnnotationModalProps) {
  const [formData, setFormData] = useState({
    document: '',
    section: '',
    text: '',
    annotation: '',
    type: 'suggestion',
    priority: 'medium',
    collaborators: [] as string[],
    tags: [] as string[]
  });
  const [newCollaborator, setNewCollaborator] = useState('');
  const [newTag, setNewTag] = useState('');

  const documentOptions = [
    "Projet de loi sur l'investissement 2025",
    "Code du travail - Révision",
    "Réforme du droit des sociétés",
    "Loi de finances 2025"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: Date.now(),
      author: "Utilisateur actuel",
      timestamp: new Date().toISOString(),
      status: 'active'
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      document: '',
      section: '',
      text: '',
      annotation: '',
      type: 'suggestion',
      priority: 'medium',
      collaborators: [],
      tags: []
    });
    setNewCollaborator('');
    setNewTag('');
  };

  const addCollaborator = () => {
    if (newCollaborator.trim() && !formData.collaborators.includes(newCollaborator.trim())) {
      setFormData(prev => ({
        ...prev,
        collaborators: [...prev.collaborators, newCollaborator.trim()]
      }));
      setNewCollaborator('');
    }
  };

  const removeCollaborator = (collaborator: string) => {
    setFormData(prev => ({
      ...prev,
      collaborators: prev.collaborators.filter(c => c !== collaborator)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-emerald-600" />
            Créer une nouvelle annotation
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Document *</label>
              <Select value={formData.document} onValueChange={(value) => setFormData(prev => ({ ...prev, document: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un document" />
                </SelectTrigger>
                <SelectContent>
                  {documentOptions.map((doc) => (
                    <SelectItem key={doc} value={doc}>{doc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Section/Article</label>
              <Input
                value={formData.section}
                onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
                placeholder="Ex: Article 15, Chapitre 3..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Texte concerné</label>
            <Textarea
              value={formData.text}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Coller ou saisir le texte sur lequel porte l'annotation"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Annotation *</label>
            <Textarea
              value={formData.annotation}
              onChange={(e) => setFormData(prev => ({ ...prev, annotation: e.target.value }))}
              placeholder="Votre commentaire, suggestion ou remarque..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type d'annotation</label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="suggestion">Suggestion</SelectItem>
                  <SelectItem value="question">Question</SelectItem>
                  <SelectItem value="correction">Correction</SelectItem>
                  <SelectItem value="commentaire">Commentaire</SelectItem>
                  <SelectItem value="alerte">Alerte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priorité</label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="high">Haute</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Collaborateurs</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newCollaborator}
                onChange={(e) => setNewCollaborator(e.target.value)}
                placeholder="Nom du collaborateur"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCollaborator())}
              />
              <Button type="button" onClick={addCollaborator} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.collaborators.map((collaborator) => (
                <Badge key={collaborator} variant="secondary" className="gap-1">
                  {collaborator}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-500"
                    onClick={() => removeCollaborator(collaborator)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="gap-1">
                  {tag}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-500"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              <Edit3 className="w-4 h-4 mr-2" />
              Créer l'annotation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
