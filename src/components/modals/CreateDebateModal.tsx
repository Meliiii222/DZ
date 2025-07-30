import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { X, Plus, MessageSquare } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface CreateDebateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (debateData: Record<string, unknown>) => void;
}

export function CreateDebateModal({ isOpen, onClose, onSave }: CreateDebateModalProps) {
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    context: '',
    type: 'structured',
    duration: '7',
    moderator: '',
    participants: [] as string[],
    domains: [] as string[],
    rules: '',
    dateRange: undefined as DateRange | undefined
  });
  const [newParticipant, setNewParticipant] = useState('');
  const [newDomain, setNewDomain] = useState('');

  const debateTypes = [
    { value: 'structured', label: 'Débat structuré' },
    { value: 'open', label: 'Discussion ouverte' },
    { value: 'vote', label: 'Débat avec vote' },
    { value: 'expert', label: 'Panel d\'experts' }
  ];

  const durationOptions = [
    { value: '3', label: '3 jours' },
    { value: '7', label: '1 semaine' },
    { value: '14', label: '2 semaines' },
    { value: '30', label: '1 mois' },
    { value: 'custom', label: 'Personnalisé' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: Date.now(),
      creator: "Utilisateur actuel",
      createdAt: new Date().toISOString(),
      status: 'En cours',
      phase: 'Arguments initiaux',
      arguments: { for: 0, against: 0 },
      participantCount: formData.participants.length
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      topic: '',
      description: '',
      context: '',
      type: 'structured',
      duration: '7',
      moderator: '',
      participants: [],
      domains: [],
      rules: '',
      dateRange: undefined
    });
    setNewParticipant('');
    setNewDomain('');
  };

  const addParticipant = () => {
    if (newParticipant.trim() && !formData.participants.includes(newParticipant.trim())) {
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, newParticipant.trim()]
      }));
      setNewParticipant('');
    }
  };

  const removeParticipant = (participant: string) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p !== participant)
    }));
  };

  const addDomain = () => {
    if (newDomain.trim() && !formData.domains.includes(newDomain.trim())) {
      setFormData(prev => ({
        ...prev,
        domains: [...prev.domains, newDomain.trim()]
      }));
      setNewDomain('');
    }
  };

  const removeDomain = (domain: string) => {
    setFormData(prev => ({
      ...prev,
      domains: prev.domains.filter(d => d !== domain)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Créer un nouveau débat
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Sujet du débat *</label>
            <Input
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              placeholder="Ex: Réforme du droit des sociétés : Impact sur les PME"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Description détaillée du sujet à débattre..."
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contexte juridique</label>
            <Textarea
              value={formData.context}
              onChange={(e) => setFormData(prev => ({ ...prev, context: e.target.value }))}
              placeholder="Contexte législatif, réglementaire ou jurisprudentiel pertinent..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type de débat</label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {debateTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Durée</label>
              <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Modérateur</label>
              <Input
                value={formData.moderator}
                onChange={(e) => setFormData(prev => ({ ...prev, moderator: e.target.value }))}
                placeholder="Nom du modérateur"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Période du débat</label>
              <DatePickerWithRange
                date={formData.dateRange}
                onDateChange={(dateRange) => setFormData(prev => ({ ...prev, dateRange }))}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Participants invités</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                placeholder="Nom du participant"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addParticipant())}
              />
              <Button type="button" onClick={addParticipant} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.participants.map((participant) => (
                <Badge key={participant} variant="secondary" className="gap-1">
                  {participant}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-500"
                    onClick={() => removeParticipant(participant)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Domaines juridiques</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                placeholder="Ex: Droit des sociétés, Droit fiscal..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDomain())}
              />
              <Button type="button" onClick={addDomain} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.domains.map((domain) => (
                <Badge key={domain} variant="outline" className="gap-1">
                  {domain}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-500"
                    onClick={() => removeDomain(domain)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Règles du débat</label>
            <Textarea
              value={formData.rules}
              onChange={(e) => setFormData(prev => ({ ...prev, rules: e.target.value }))}
              placeholder="Règles spécifiques, format des arguments, critères d'évaluation..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Créer le débat
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
