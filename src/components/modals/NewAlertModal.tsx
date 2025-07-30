
import React, { useState } from 'react';
import { BaseModal } from './core/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, Plus, X } from 'lucide-react';

interface NewAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (alertData: Record<string, unknown>) => void;
  alertTypes: Array<{ id: string; name: string; active: boolean }>;
  alertChannels: Array<{ id: string; name: string; active: boolean }>;
}

export function NewAlertModal({ isOpen, onClose, onSave, alertTypes, alertChannels }: NewAlertModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    priority: 'medium',
    targetUsers: 'all',
    channels: [] as string[],
    keywords: [] as string[],
    newKeyword: '',
    startDate: '',
    endDate: '',
    isActive: true,
    frequency: 'immediate'
  });

  const handleSave = () => {
    const alertData = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date(),
      status: 'active'
    };
    
    onSave?.(alertData);
    onClose();
    setFormData({
      title: '',
      description: '',
      type: '',
      priority: 'medium',
      targetUsers: 'all',
      channels: [],
      keywords: [],
      newKeyword: '',
      startDate: '',
      endDate: '',
      isActive: true,
      frequency: 'immediate'
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

  const toggleChannel = (channelId: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channelId)
        ? prev.channels.filter(id => id !== channelId)
        : [...prev.channels, channelId]
    }));
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Nouvelle Alerte"
      size="xl"
    >
      <div className="grid grid-cols-2 gap-6">
        {/* Colonne gauche */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="alert-title">Titre de l'alerte</Label>
            <Input
              id="alert-title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Titre de l'alerte"
            />
          </div>

          <div>
            <Label htmlFor="alert-description">Description</Label>
            <Textarea
              id="alert-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Description de l'alerte"
              rows={3}
            />
          </div>

          <div>
            <Label>Type d'alerte</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                {alertTypes.filter(type => type.active).map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <Label>Fréquence</Label>
              <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immédiat</SelectItem>
                  <SelectItem value="daily">Quotidien</SelectItem>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  <SelectItem value="monthly">Mensuel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Destinataires</Label>
            <Select value={formData.targetUsers} onValueChange={(value) => setFormData(prev => ({ ...prev, targetUsers: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les utilisateurs</SelectItem>
                <SelectItem value="admin">Administrateurs</SelectItem>
                <SelectItem value="juriste">Juristes</SelectItem>
                <SelectItem value="citoyen">Citoyens</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          <div>
            <Label>Canaux d'alertes</Label>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {alertChannels.filter(channel => channel.active).map((channel) => (
                <div key={channel.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <span className="text-sm">{channel.name}</span>
                  <Switch
                    checked={formData.channels.includes(channel.id)}
                    onCheckedChange={() => toggleChannel(channel.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Mots-clés</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={formData.newKeyword}
                onChange={(e) => setFormData(prev => ({ ...prev, newKeyword: e.target.value }))}
                placeholder="Ajouter un mot-clé"
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
              <Label htmlFor="start-date">Date de début</Label>
              <Input
                id="start-date"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="end-date">Date de fin</Label>
              <Input
                id="end-date"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              />
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
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button onClick={handleSave} disabled={!formData.title.trim() || !formData.type}>
          <Bell className="w-4 h-4 mr-2" />
          Créer l'alerte
        </Button>
      </div>
    </BaseModal>
  );
}
