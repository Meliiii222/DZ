
import React, { useState } from 'react';
import { BaseModal } from './core/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Zap } from 'lucide-react';

interface NewAlertTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (typeData: Record<string, unknown>) => void;
}

export function NewAlertTypeModal({ isOpen, onClose, onSave }: NewAlertTypeModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'immediate',
    active: true,
    category: '',
    icon: 'bell',
    color: 'blue',
    autoSend: true,
    emailTemplate: '',
    priority: 'medium'
  });

  const handleSave = () => {
    const typeData = {
      id: Date.now(),
      ...formData,
      createdAt: new Date()
    };
    
    onSave?.(typeData);
    onClose();
    setFormData({
      name: '',
      description: '',
      frequency: 'immediate',
      active: true,
      category: '',
      icon: 'bell',
      color: 'blue',
      autoSend: true,
      emailTemplate: '',
      priority: 'medium'
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Nouveau Type d'Alerte"
      size="xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type-name">Nom du type</Label>
            <Input
              id="type-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Textes juridiques, Jurisprudence..."
            />
          </div>

          <div>
            <Label>Catégorie</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="legal">Textes légaux</SelectItem>
                <SelectItem value="jurisprudence">Jurisprudence</SelectItem>
                <SelectItem value="regulatory">Réglementaire</SelectItem>
                <SelectItem value="administrative">Administratif</SelectItem>
                <SelectItem value="deadline">Échéances</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="type-description">Description</Label>
          <Textarea
            id="type-description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Description du type d'alerte"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Fréquence par défaut</Label>
            <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immédiat</SelectItem>
                <SelectItem value="daily">Quotidien</SelectItem>
                <SelectItem value="weekly">Hebdomadaire</SelectItem>
                <SelectItem value="monthly">Mensuel</SelectItem>
                <SelectItem value="custom">Personnalisé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Priorité par défaut</Label>
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Icône</Label>
            <Select value={formData.icon} onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bell">Cloche</SelectItem>
                <SelectItem value="file">Document</SelectItem>
                <SelectItem value="calendar">Calendar</SelectItem>
                <SelectItem value="alert">Alerte</SelectItem>
                <SelectItem value="info">Information</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Couleur</Label>
            <Select value={formData.color} onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">Bleu</SelectItem>
                <SelectItem value="green">Vert</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="red">Rouge</SelectItem>
                <SelectItem value="purple">Violet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="email-template">Modèle d'email (optionnel)</Label>
          <Textarea
            id="email-template"
            value={formData.emailTemplate}
            onChange={(e) => setFormData(prev => ({ ...prev, emailTemplate: e.target.value }))}
            placeholder="Modèle d'email pour ce type d'alerte"
            rows={3}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Type actif</Label>
              <p className="text-sm text-gray-600">Ce type d'alerte peut être utilisé</p>
            </div>
            <Switch 
              checked={formData.active} 
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Envoi automatique</Label>
              <p className="text-sm text-gray-600">Envoyer automatiquement les alertes de ce type</p>
            </div>
            <Switch 
              checked={formData.autoSend} 
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, autoSend: checked }))} 
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button onClick={handleSave} disabled={!formData.name.trim() || !formData.category}>
          <Zap className="w-4 h-4 mr-2" />
          Créer le type
        </Button>
      </div>
    </BaseModal>
  );
}
