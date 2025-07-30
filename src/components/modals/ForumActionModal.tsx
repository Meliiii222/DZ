
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, MessageSquare, Users, UserPlus, Plus } from 'lucide-react';

interface ForumActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'discussion' | 'join' | 'register';
}

export function ForumActionModal({ isOpen, onClose, action }: ForumActionModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    privacy: 'public',
    name: '',
    email: '',
    expertise: '',
    organization: '',
    forumId: ''
  });

  const getModalConfig = () => {
    switch (action) {
      case 'discussion':
        return {
          icon: MessageSquare,
          title: 'Nouvelle Discussion',
          submitText: 'Créer la Discussion'
        };
      case 'join':
        return {
          icon: Users,
          title: 'Rejoindre un Forum',
          submitText: 'Rejoindre'
        };
      case 'register':
        return {
          icon: UserPlus,
          title: 'S\'inscrire au Forum',
          submitText: 'S\'inscrire'
        };
      default:
        return {
          icon: MessageSquare,
          title: 'Action Forum',
          submitText: 'Valider'
        };
    }
  };

  const config = getModalConfig();
  const Icon = config.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Action forum ${action}:`, formData);
    onClose();
  };

  const renderDiscussionForm = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Titre de la discussion *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
          placeholder="Titre de votre discussion..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Contenu *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
          placeholder="Décrivez votre question ou sujet de discussion..."
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="droit-civil">Droit Civil</SelectItem>
              <SelectItem value="droit-penal">Droit Pénal</SelectItem>
              <SelectItem value="droit-administratif">Droit Administratif</SelectItem>
              <SelectItem value="droit-commercial">Droit Commercial</SelectItem>
              <SelectItem value="jurisprudence">Jurisprudence</SelectItem>
              <SelectItem value="procedure">Procédure</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="privacy">Visibilité</Label>
          <Select value={formData.privacy} onValueChange={(value) => setFormData(prev => ({...prev, privacy: value}))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Privé</SelectItem>
              <SelectItem value="members">Membres seulement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData(prev => ({...prev, tags: e.target.value}))}
          placeholder="Ex: contrat, responsabilité, jurisprudence"
        />
      </div>
    </>
  );

  const renderJoinForm = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="forumId">Forum à rejoindre</Label>
        <Select value={formData.forumId} onValueChange={(value) => setFormData(prev => ({...prev, forumId: value}))}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un forum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="droit-civil-forum">Forum Droit Civil</SelectItem>
            <SelectItem value="droit-penal-forum">Forum Droit Pénal</SelectItem>
            <SelectItem value="jurisprudence-forum">Forum Jurisprudence</SelectItem>
            <SelectItem value="procedure-forum">Forum Procédure</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="expertise">Domaine d'expertise</Label>
        <Input
          id="expertise"
          value={formData.expertise}
          onChange={(e) => setFormData(prev => ({...prev, expertise: e.target.value}))}
          placeholder="Votre domaine de spécialisation..."
        />
      </div>
    </>
  );

  const renderRegisterForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
            placeholder="Votre nom complet"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
            placeholder="votre@email.com"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="organization">Organisation</Label>
        <Input
          id="organization"
          value={formData.organization}
          onChange={(e) => setFormData(prev => ({...prev, organization: e.target.value}))}
          placeholder="Cabinet, entreprise, institution..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="expertise">Domaine d'expertise</Label>
        <Textarea
          id="expertise"
          value={formData.expertise}
          onChange={(e) => setFormData(prev => ({...prev, expertise: e.target.value}))}
          placeholder="Décrivez vos domaines de spécialisation juridique..."
          rows={3}
        />
      </div>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-blue-600" />
            <DialogTitle className="text-lg font-semibold">{config.title}</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {action === 'discussion' && renderDiscussionForm()}
          {action === 'join' && renderJoinForm()}
          {action === 'register' && renderRegisterForm()}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {config.submitText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
