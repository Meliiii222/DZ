
import React, { useState } from 'react';
import { BaseModal } from './core/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { MessageSquare, Mail, Bell, Smartphone } from 'lucide-react';

interface NewChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (channelData: Record<string, unknown>) => void;
}

export function NewChannelModal({ isOpen, onClose, onSave }: NewChannelModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    settings: '',
    active: true,
    priority: 'medium',
    maxRetries: '3',
    timeout: '30',
    apiEndpoint: '',
    apiKey: '',
    webhookUrl: '',
    emailTemplate: ''
  });

  const handleSave = () => {
    const channelData = {
      id: Date.now(),
      ...formData,
      createdAt: new Date()
    };
    
    onSave?.(channelData);
    onClose();
    setFormData({
      name: '',
      type: '',
      description: '',
      settings: '',
      active: true,
      priority: 'medium',
      maxRetries: '3',
      timeout: '30',
      apiEndpoint: '',
      apiKey: '',
      webhookUrl: '',
      emailTemplate: ''
    });
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'sms': return Smartphone;
      case 'push': return Bell;
      case 'webhook': return MessageSquare;
      default: return Bell;
    }
  };

  const IconComponent = getIconForType(formData.type);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Nouveau Canal d'Alerte"
      size="xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="channel-name">Nom du canal</Label>
            <Input
              id="channel-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Email Principal, SMS Urgence..."
            />
          </div>

          <div>
            <Label>Type de canal</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="push">Push Browser</SelectItem>
                <SelectItem value="webhook">Webhook</SelectItem>
                <SelectItem value="teams">Microsoft Teams</SelectItem>
                <SelectItem value="slack">Slack</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="channel-description">Description</Label>
          <Textarea
            id="channel-description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Description du canal d'alerte"
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="channel-settings">Configuration</Label>
          <Input
            id="channel-settings"
            value={formData.settings}
            onChange={(e) => setFormData(prev => ({ ...prev, settings: e.target.value }))}
            placeholder="Ex: admin@domain.com, +213555123456, #canal-alertes..."
          />
        </div>

        {formData.type === 'webhook' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="webhook-url">URL du Webhook</Label>
              <Input
                id="webhook-url"
                value={formData.webhookUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, webhookUrl: e.target.value }))}
                placeholder="https://api.example.com/webhook"
              />
            </div>
            
            <div>
              <Label htmlFor="api-key">Clé API (optionnelle)</Label>
              <Input
                id="api-key"
                type="password"
                value={formData.apiKey}
                onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                placeholder="Clé d'authentification"
              />
            </div>
          </div>
        )}

        {formData.type === 'email' && (
          <div>
            <Label htmlFor="email-template">Modèle d'email (optionnel)</Label>
            <Textarea
              id="email-template"
              value={formData.emailTemplate}
              onChange={(e) => setFormData(prev => ({ ...prev, emailTemplate: e.target.value }))}
              placeholder="Modèle HTML pour les emails"
              rows={3}
            />
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
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
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="max-retries">Tentatives max</Label>
            <Input
              id="max-retries"
              type="number"
              value={formData.maxRetries}
              onChange={(e) => setFormData(prev => ({ ...prev, maxRetries: e.target.value }))}
              min="1"
              max="10"
            />
          </div>

          <div>
            <Label htmlFor="timeout">Timeout (sec)</Label>
            <Input
              id="timeout"
              type="number"
              value={formData.timeout}
              onChange={(e) => setFormData(prev => ({ ...prev, timeout: e.target.value }))}
              min="5"
              max="300"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Canal actif</Label>
            <p className="text-sm text-gray-600">Ce canal peut recevoir des alertes</p>
          </div>
          <Switch 
            checked={formData.active} 
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))} 
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button onClick={handleSave} disabled={!formData.name.trim() || !formData.type || !formData.settings.trim()}>
          <IconComponent className="w-4 h-4 mr-2" />
          Créer le canal
        </Button>
      </div>
    </BaseModal>
  );
}
