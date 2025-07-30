
import React, { useState } from 'react';
import { BaseModal } from './core/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus } from 'lucide-react';

interface NewDeadlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (deadlineData: Record<string, unknown>) => void;
}

export function NewDeadlineModal({ isOpen, onClose, onSave }: NewDeadlineModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    priority: 'medium',
    status: 'pending',
    category: '',
    reminderDays: '3',
    reminderTime: '08:00',
    responsibleUser: '',
    notes: ''
  });

  const handleSave = () => {
    const deadlineData = {
      id: Date.now(),
      ...formData,
      createdAt: new Date()
    };
    
    onSave?.(deadlineData);
    onClose();
    setFormData({
      title: '',
      description: '',
      date: '',
      priority: 'medium',
      status: 'pending',
      category: '',
      reminderDays: '3',
      reminderTime: '08:00',
      responsibleUser: '',
      notes: ''
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Nouvelle Échéance"
      size="xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="deadline-title">Titre de l'échéance</Label>
            <Input
              id="deadline-title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Titre de l'échéance réglementaire"
            />
          </div>

          <div>
            <Label htmlFor="deadline-date">Date d'échéance</Label>
            <Input
              id="deadline-date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="deadline-description">Description</Label>
          <Textarea
            id="deadline-description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Description détaillée de l'échéance"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Catégorie</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fiscal">Fiscal</SelectItem>
                <SelectItem value="environnement">Environnement</SelectItem>
                <SelectItem value="travail">Travail</SelectItem>
                <SelectItem value="securite">Sécurité</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="administratif">Administratif</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Rappel (jours avant)</Label>
            <Select value={formData.reminderDays} onValueChange={(value) => setFormData(prev => ({ ...prev, reminderDays: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 jour avant</SelectItem>
                <SelectItem value="3">3 jours avant</SelectItem>
                <SelectItem value="7">1 semaine avant</SelectItem>
                <SelectItem value="14">2 semaines avant</SelectItem>
                <SelectItem value="30">1 mois avant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reminder-time">Heure du rappel</Label>
            <Input
              id="reminder-time"
              type="time"
              value={formData.reminderTime}
              onChange={(e) => setFormData(prev => ({ ...prev, reminderTime: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="responsible-user">Utilisateur responsable</Label>
          <Input
            id="responsible-user"
            value={formData.responsibleUser}
            onChange={(e) => setFormData(prev => ({ ...prev, responsibleUser: e.target.value }))}
            placeholder="Nom ou email de l'utilisateur responsable"
          />
        </div>

        <div>
          <Label htmlFor="deadline-notes">Notes additionnelles</Label>
          <Textarea
            id="deadline-notes"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Notes ou instructions spéciales"
            rows={2}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button onClick={handleSave} disabled={!formData.title.trim() || !formData.date || !formData.category}>
          <Calendar className="w-4 h-4 mr-2" />
          Créer l'échéance
        </Button>
      </div>
    </BaseModal>
  );
}
