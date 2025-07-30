
import React, { useState } from 'react';
import { BaseModal } from './core/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, X } from 'lucide-react';

interface NewPersonalizedAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (alertData: Record<string, unknown>) => void;
}

export function NewPersonalizedAlertModal({ isOpen, onClose, onSave }: NewPersonalizedAlertModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    description: '',
    keywords: [] as string[],
    newKeyword: '',
    priority: 'medium',
    frequency: 'immediate',
    isActive: true,
    notifications: 0
  });

  const handleSave = () => {
    const alertData = {
      id: Date.now(),
      ...formData,
      createdAt: new Date()
    };
    
    onSave?.(alertData);
    onClose();
    setFormData({
      name: '',
      domain: '',
      description: '',
      keywords: [],
      newKeyword: '',
      priority: 'medium',
      frequency: 'immediate',
      isActive: true,
      notifications: 0
    });
  };

  const addKeyword = () => {
    if (formData.newKeyword.trim() && !formData.keywords.includes(formData.newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, prev.newKeyword.trim()],
        newKeyword: ''
      }));
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Nouvelle Alerte Personnalisée"
      size="xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="alert-name">Nom de l'alerte</Label>
            <Input
              id="alert-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nom de l'alerte personnalisée"
            />
          </div>

          <div>
            <Label>Domaine juridique</Label>
            <Select value={formData.domain} onValueChange={(value) => setFormData(prev => ({ ...prev, domain: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un domaine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="travail">Droit du Travail</SelectItem>
                <SelectItem value="commercial">Droit Commercial</SelectItem>
                <SelectItem value="fiscal">Droit Fiscal</SelectItem>
                <SelectItem value="environnement">Droit de l'Environnement</SelectItem>
                <SelectItem value="marches">Marchés Publics</SelectItem>
                <SelectItem value="immobilier">Droit Immobilier</SelectItem>
                <SelectItem value="penal">Droit Pénal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="alert-description">Description</Label>
          <Textarea
            id="alert-description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Description de l'alerte personnalisée"
            rows={3}
          />
        </div>

        <div>
          <Label>Mots-clés surveillés</Label>
          <div className="flex gap-2 mt-2">
            <Input
              value={formData.newKeyword}
              onChange={(e) => setFormData(prev => ({ ...prev, newKeyword: e.target.value }))}
              placeholder="Ajouter un mot-clé à surveiller"
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
            />
            <Button onClick={addKeyword} variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="gap-1">
                {keyword}
                <X className="w-3 h-3 cursor-pointer" onClick={() => removeKeyword(keyword)} />
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Priorité</Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Faible</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="high">Élevée</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Fréquence de surveillance</Label>
            <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immédiat</SelectItem>
                <SelectItem value="hourly">Chaque heure</SelectItem>
                <SelectItem value="daily">Quotidien</SelectItem>
                <SelectItem value="weekly">Hebdomadaire</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Activer l'alerte</Label>
            <p className="text-sm text-gray-600">L'alerte sera active immédiatement</p>
          </div>
          <Switch 
            checked={formData.isActive} 
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))} 
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button onClick={handleSave} disabled={!formData.name.trim() || !formData.domain || formData.keywords.length === 0}>
          <Target className="w-4 h-4 mr-2" />
          Créer l'alerte personnalisée
        </Button>
      </div>
    </BaseModal>
  );
}
