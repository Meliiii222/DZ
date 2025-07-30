
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Network, Upload, Link } from 'lucide-react';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contributionData: Record<string, unknown>) => void;
}

export function ContributeModal({ isOpen, onClose, onSave }: ContributeModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'knowledge',
    domain: '',
    sources: [] as string[],
    tags: [] as string[],
    content: '',
    references: '',
    priority: 'medium'
  });
  const [newSource, setNewSource] = useState('');
  const [newTag, setNewTag] = useState('');

  const contributionTypes = [
    { value: 'knowledge', label: 'Contribution de connaissance' },
    { value: 'connection', label: 'Nouvelle connexion' },
    { value: 'correction', label: 'Correction' },
    { value: 'enrichment', label: 'Enrichissement' },
    { value: 'validation', label: 'Validation de contenu' }
  ];

  const domains = [
    'Droit des sociétés',
    'Droit fiscal',
    'Droit du travail',
    'Droit administratif',
    'Droit commercial',
    'Droit civil',
    'Droit pénal',
    'Droit international'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: Date.now(),
      contributor: "Utilisateur actuel",
      createdAt: new Date().toISOString(),
      status: 'En attente de validation'
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'knowledge',
      domain: '',
      sources: [],
      tags: [],
      content: '',
      references: '',
      priority: 'medium'
    });
    setNewSource('');
    setNewTag('');
  };

  const addSource = () => {
    if (newSource.trim() && !formData.sources.includes(newSource.trim())) {
      setFormData(prev => ({
        ...prev,
        sources: [...prev.sources, newSource.trim()]
      }));
      setNewSource('');
    }
  };

  const removeSource = (source: string) => {
    setFormData(prev => ({
      ...prev,
      sources: prev.sources.filter(s => s !== source)
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Network className="w-5 h-5 text-purple-600" />
            Contribuer au Knowledge Graph
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Titre de la contribution *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Ex: Nouvelle jurisprudence sur les contrats commerciaux"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Description détaillée de votre contribution..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type de contribution</label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contributionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Domaine juridique</label>
              <Select value={formData.domain} onValueChange={(value) => setFormData(prev => ({ ...prev, domain: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un domaine" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((domain) => (
                    <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contenu de la contribution</label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Détaillez votre contribution (texte, analyse, interprétation...)..."
              rows={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sources et références</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                placeholder="URL, référence légale, document..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSource())}
              />
              <Button type="button" onClick={addSource} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.sources.map((source, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  <Link className="w-3 h-3" />
                  {source.length > 30 ? `${source.substring(0, 30)}...` : source}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-500"
                    onClick={() => removeSource(source)}
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
                placeholder="Mot-clé, concept juridique..."
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

          <div>
            <label className="block text-sm font-medium mb-2">Références complémentaires</label>
            <Textarea
              value={formData.references}
              onChange={(e) => setFormData(prev => ({ ...prev, references: e.target.value }))}
              placeholder="Références bibliographiques, jurisprudences connexes, doctrine..."
              rows={3}
            />
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

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <Network className="w-4 h-4 mr-2" />
              Contribuer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
