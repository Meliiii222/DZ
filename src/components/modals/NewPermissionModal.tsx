
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Key } from 'lucide-react';

interface NewPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (permissionData: Record<string, unknown>) => void;
}

export function NewPermissionModal({ isOpen, onClose, onSave }: NewPermissionModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: ''
  });

  const categories = [
    'Lecture', 'Écriture', 'Publication', 'Administration', 
    'Analyse', 'Export', 'Procédures', 'Configuration'
  ];

  const handleSave = () => {
    const permissionData = {
      ...formData,
      users: 0,
      id: Date.now()
    };
    onSave(permissionData);
    setFormData({ name: '', description: '', category: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Nouvelle Permission
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="permissionName">Nom de la permission *</Label>
            <Input
              id="permissionName"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Ex: Consulter Documents"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Catégorie *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="permissionDesc">Description</Label>
            <Textarea
              id="permissionDesc"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Description de la permission..."
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={!formData.name.trim() || !formData.category}>
            Créer la permission
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
