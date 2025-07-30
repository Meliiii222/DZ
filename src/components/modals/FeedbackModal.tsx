
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MessageCircle, AlertTriangle } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'error' | 'feedback' | 'testimonial';
  itemTitle?: string;
}

export function FeedbackModal({ isOpen, onClose, type, itemTitle }: FeedbackModalProps) {
  const [formData, setFormData] = useState({
    rating: 0,
    category: '',
    title: '',
    description: '',
    email: '',
    name: ''
  });

  const handleStarClick = (rating: number) => {
    setFormData({...formData, rating});
  };

  const handleSubmit = () => {
    console.log('Feedback submitted:', formData);
    onClose();
    // Ici vous pouvez ajouter la logique pour envoyer le feedback
  };

  const getModalConfig = () => {
    switch (type) {
      case 'error':
        return {
          title: 'Signaler une erreur',
          icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
          categories: ['Erreur de contenu', 'Problème technique', 'Lien cassé', 'Information obsolète']
        };
      case 'testimonial':
        return {
          title: 'Laisser un témoignage',
          icon: <Star className="w-5 h-5 text-yellow-500" />,
          categories: ['Expérience utilisateur', 'Qualité du contenu', 'Utilité de la plateforme']
        };
      default:
        return {
          title: 'Donner un avis',
          icon: <MessageCircle className="w-5 h-5 text-blue-500" />,
          categories: ['Suggestion d\'amélioration', 'Nouvelle fonctionnalité', 'Problème général']
        };
    }
  };

  const config = getModalConfig();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {config.icon}
            {config.title}
          </DialogTitle>
          {itemTitle && (
            <p className="text-sm text-gray-600">Concernant: {itemTitle}</p>
          )}
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {type === 'testimonial' && (
            <div className="space-y-2">
              <Label>Note</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className={`text-2xl ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {config.categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              placeholder="Résumé en quelques mots"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Décrivez votre retour en détail..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom (optionnel)</Label>
              <Input
                id="name"
                placeholder="Votre nom"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email (optionnel)</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>
            Envoyer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
