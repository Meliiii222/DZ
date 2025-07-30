
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Shield, X, Plus } from 'lucide-react';

interface NewRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (roleData: Record<string, unknown>) => void;
}

export function NewRoleModal({ isOpen, onClose, onSave }: NewRoleModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
    status: 'Actif'
  });

  const availablePermissions = [
    'Consulter Textes', 'Modifier Textes', 'Publier Textes', 'Gérer Utilisateurs',
    'Configurer Système', 'Consulter Statistiques', 'Exporter Données', 'Gérer Procédures'
  ];

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleAddPermission = (permission: string) => {
    if (!selectedPermissions.includes(permission)) {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleRemovePermission = (permission: string) => {
    setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
  };

  const handleSave = () => {
    const roleData = {
      ...formData,
      permissions: selectedPermissions,
      users: 0,
      id: Date.now()
    };
    onSave(roleData);
    setFormData({ name: '', description: '', permissions: [], status: 'Actif' });
    setSelectedPermissions([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Nouveau Rôle
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="roleName">Nom du rôle *</Label>
            <Input
              id="roleName"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Ex: Gestionnaire"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roleDesc">Description</Label>
            <Textarea
              id="roleDesc"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Description du rôle..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="border rounded-md p-3 max-h-32 overflow-y-auto">
              {availablePermissions.map((permission) => (
                <div key={permission} className="flex items-center justify-between py-1">
                  <span className="text-sm">{permission}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant={selectedPermissions.includes(permission) ? "default" : "outline"}
                    onClick={() => selectedPermissions.includes(permission) 
                      ? handleRemovePermission(permission) 
                      : handleAddPermission(permission)
                    }
                  >
                    {selectedPermissions.includes(permission) ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </Button>
                </div>
              ))}
            </div>
            
            {selectedPermissions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedPermissions.map((permission) => (
                  <Badge key={permission} variant="outline" className="text-xs">
                    {permission}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => handleRemovePermission(permission)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={!formData.name.trim()}>
            Créer le rôle
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
