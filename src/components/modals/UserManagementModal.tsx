
// @ts-nocheck
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus, UserCheck, Mail, Shield, Key, X } from 'lucide-react';

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'create' | 'edit' | 'invite';
  user?: Record<string, unknown>;
  onSave: (userData: Record<string, unknown>) => void;
}

export function UserManagementModal({ isOpen, onClose, action, user, onSave }: UserManagementModalProps) {
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    role: user?.role || 'user',
    department: user?.department || '',
    phone: user?.phone || '',
    notes: user?.notes || '',
    selectedRoles: user?.selectedRoles || [],
    selectedPermissions: user?.selectedPermissions || []
  });

  // Données des rôles disponibles
  const availableRoles = [
    {
      id: 'admin',
      name: 'Administrateur',
      description: 'Accès complet au système',
      level: 4,
      permissions: ['Lecture', 'Écriture', 'Modification', 'Suppression', 'Administration']
    },
    {
      id: 'moderator',
      name: 'Modérateur',
      description: 'Gestion du contenu et modération',
      level: 3,
      permissions: ['Lecture', 'Écriture', 'Modification']
    },
    {
      id: 'contributor',
      name: 'Contributeur',
      description: 'Création et modification de contenu',
      level: 2,
      permissions: ['Lecture', 'Écriture']
    },
    {
      id: 'reader',
      name: 'Lecteur',
      description: 'Consultation des documents',
      level: 1,
      permissions: ['Lecture']
    }
  ];

  // Données des permissions disponibles
  const availablePermissions = [
    {
      id: 'read_legal_texts',
      name: 'Consulter Textes Juridiques',
      category: 'Lecture',
      description: 'Accès en lecture aux textes juridiques'
    },
    {
      id: 'write_legal_texts',
      name: 'Créer Textes Juridiques',
      category: 'Écriture',
      description: 'Création de nouveaux textes juridiques'
    },
    {
      id: 'modify_legal_texts',
      name: 'Modifier Textes Juridiques',
      category: 'Modification',
      description: 'Modification des textes existants'
    },
    {
      id: 'delete_legal_texts',
      name: 'Supprimer Textes Juridiques',
      category: 'Suppression',
      description: 'Suppression de textes juridiques'
    },
    {
      id: 'read_procedures',
      name: 'Consulter Procédures',
      category: 'Lecture',
      description: 'Accès en lecture aux procédures'
    },
    {
      id: 'write_procedures',
      name: 'Créer Procédures',
      category: 'Écriture',
      description: 'Création de nouvelles procédures'
    },
    {
      id: 'modify_procedures',
      name: 'Modifier Procédures',
      category: 'Modification',
      description: 'Modification des procédures existantes'
    },
    {
      id: 'manage_users',
      name: 'Gérer Utilisateurs',
      category: 'Administration',
      description: 'Gestion des comptes utilisateurs'
    },
    {
      id: 'system_config',
      name: 'Configuration Système',
      category: 'Administration',
      description: 'Configuration des paramètres système'
    },
    {
      id: 'export_data',
      name: 'Exporter Données',
      category: 'Export',
      description: 'Export des données et rapports'
    },
    {
      id: 'view_analytics',
      name: 'Consulter Analyses',
      category: 'Analyse',
      description: 'Accès aux analyses et statistiques'
    },
    {
      id: 'manage_workflows',
      name: 'Gérer Workflows',
      category: 'Procédures',
      description: 'Gestion des flux de travail'
    }
  ];

  const getModalConfig = () => {
    switch (action) {
      case 'create':
        return {
          title: 'Créer un utilisateur',
          icon: <UserPlus className="w-5 h-5" />,
          submitText: 'Créer'
        };
      case 'edit':
        return {
          title: 'Modifier l\'utilisateur',
          icon: <UserCheck className="w-5 h-5" />,
          submitText: 'Modifier'
        };
      case 'invite':
        return {
          title: 'Inviter un utilisateur',
          icon: <Mail className="w-5 h-5" />,
          submitText: 'Envoyer l\'invitation'
        };
      default:
        return {
          title: 'Gestion utilisateur',
          icon: <UserPlus className="w-5 h-5" />,
          submitText: 'Sauvegarder'
        };
    }
  };

  const config = getModalConfig();

  const handleRoleChange = (roleId: string, checked: boolean) => {
    let updatedRoles;
    if (checked) {
      updatedRoles = [...formData.selectedRoles, roleId];
    } else {
      updatedRoles = formData.selectedRoles.filter((id: string) => id !== roleId);
    }
    
    setFormData({
      ...formData,
      selectedRoles: updatedRoles
    });
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    let updatedPermissions;
    if (checked) {
      updatedPermissions = [...formData.selectedPermissions, permissionId];
    } else {
      updatedPermissions = formData.selectedPermissions.filter((id: string) => id !== permissionId);
    }
    
    setFormData({
      ...formData,
      selectedPermissions: updatedPermissions
    });
  };

  const handleSave = () => {
    const userData = {
      ...formData,
      action,
      roles: availableRoles.filter(role => formData.selectedRoles.includes(role.id)),
      permissions: availablePermissions.filter(permission => formData.selectedPermissions.includes(permission.id))
    };
    onSave(userData);
    onClose();
  };

  // Grouper les permissions par catégorie
  const permissionsByCategory = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof availablePermissions>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {config.icon}
            {config.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
          {/* Informations personnelles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations personnelles</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  placeholder="Prénom"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Nom"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="email@exemple.com"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Rôle principal</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Utilisateur</SelectItem>
                    <SelectItem value="editor">Éditeur</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Département</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  placeholder="Département"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+213 ..."
              />
            </div>

            {action !== 'invite' && (
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Notes additionnelles..."
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* Rôles et Permissions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rôles et Permissions</h3>
            
            {/* Section Rôles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="w-4 h-4" />
                  Rôles supplémentaires
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableRoles.map((role) => (
                  <div key={role.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={`role-${role.id}`}
                      checked={formData.selectedRoles.includes(role.id)}
                      onCheckedChange={(checked) => handleRoleChange(role.id, checked as boolean)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`role-${role.id}`} className="font-medium">
                          {role.name}
                        </Label>
                        <Badge variant="outline">Niveau {role.level}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{role.description}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {role.permissions.map((perm) => (
                          <Badge key={perm} variant="secondary" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Section Permissions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Key className="w-4 h-4" />
                  Permissions spécifiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-700 border-b pb-1">
                      {category}
                    </h4>
                    <div className="space-y-2">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-start space-x-3">
                          <Checkbox
                            id={`perm-${permission.id}`}
                            checked={formData.selectedPermissions.includes(permission.id)}
                            onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                          />
                          <div className="flex-1">
                            <Label htmlFor={`perm-${permission.id}`} className="text-sm font-medium">
                              {permission.name}
                            </Label>
                            <p className="text-xs text-gray-600">{permission.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end space-x-2 border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            {config.submitText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
