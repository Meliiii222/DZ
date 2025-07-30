
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Share2, Upload, Link, FileText } from 'lucide-react';

interface AddSharedResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddSharedResourceModal({ isOpen, onClose }: AddSharedResourceModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    category: '',
    url: '',
    file: null as File | null,
    tags: '',
    accessLevel: 'public',
    allowDownload: true,
    allowSharing: true,
    expirationDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ajout ressource partagée:', formData);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData(prev => ({...prev, file}));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Share2 className="h-5 w-5 text-purple-600" />
            <DialogTitle className="text-lg font-semibold">Ajouter une Ressource Partagée</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre de la ressource *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
              placeholder="Nom de la ressource..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
              placeholder="Description de la ressource..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type de ressource</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({...prev, type: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="link">Lien externe</SelectItem>
                  <SelectItem value="template">Modèle</SelectItem>
                  <SelectItem value="presentation">Présentation</SelectItem>
                  <SelectItem value="video">Vidéo</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jurisprudence">Jurisprudence</SelectItem>
                  <SelectItem value="legislation">Législation</SelectItem>
                  <SelectItem value="doctrine">Doctrine</SelectItem>
                  <SelectItem value="formulaires">Formulaires</SelectItem>
                  <SelectItem value="guides">Guides pratiques</SelectItem>
                  <SelectItem value="outils">Outils</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.type === 'link' ? (
            <div className="space-y-2">
              <Label htmlFor="url">URL de la ressource *</Label>
              <div className="flex gap-2">
                <Link className="h-5 w-5 text-gray-400 mt-2" />
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({...prev, url: e.target.value}))}
                  placeholder="https://..."
                  required
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="file">Fichier *</Label>
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-gray-400" />
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  required
                />
              </div>
              {formData.file && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  {formData.file.name}
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({...prev, tags: e.target.value}))}
              placeholder="Ex: contrat, commercial, modèle"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accessLevel">Niveau d'accès</Label>
              <Select value={formData.accessLevel} onValueChange={(value) => setFormData(prev => ({...prev, accessLevel: value}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="members">Membres seulement</SelectItem>
                  <SelectItem value="restricted">Accès restreint</SelectItem>
                  <SelectItem value="private">Privé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expirationDate">Date d'expiration (optionnel)</Label>
              <Input
                id="expirationDate"
                type="date"
                value={formData.expirationDate}
                onChange={(e) => setFormData(prev => ({...prev, expirationDate: e.target.value}))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="allowDownload"
                checked={formData.allowDownload}
                onCheckedChange={(checked) => setFormData(prev => ({...prev, allowDownload: checked}))}
              />
              <Label htmlFor="allowDownload">Autoriser le téléchargement</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="allowSharing"
                checked={formData.allowSharing}
                onCheckedChange={(checked) => setFormData(prev => ({...prev, allowSharing: checked}))}
              />
              <Label htmlFor="allowSharing">Autoriser le partage</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter la Ressource
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
