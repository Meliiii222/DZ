
// @ts-nocheck
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Building, Tag, FileText, Globe, Database, Users, Shield } from 'lucide-react';

interface ManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'domain' | 'textType' | 'category' | 'organization' | 'source' | 'role' | 'permission' | 'policy';
  onSave: (data: Record<string, unknown>) => void;
}

export function ManagementModal({ isOpen, onClose, type, onSave }: ManagementModalProps) {
  const [formData, setFormData] = useState<any>({});

  const getModalConfig = () => {
    switch (type) {
      case 'domain':
        return {
          title: 'Ajouter un Domaine',
          icon: <Globe className="w-5 h-5" />,
          fields: [
            { name: 'name', label: 'Nom du domaine', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'color', label: 'Couleur', type: 'color' },
            { name: 'parent', label: 'Domaine parent', type: 'select', options: ['Droit civil', 'Droit commercial', 'Droit administratif'] }
          ]
        };
      
      case 'textType':
        return {
          title: 'Ajouter un Type de texte',
          icon: <FileText className="w-5 h-5" />,
          fields: [
            { name: 'name', label: 'Nom du type', type: 'text', required: true },
            { name: 'code', label: 'Code', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'hierarchy', label: 'Niveau hiérarchique', type: 'select', options: ['1 - Constitution', '2 - Loi', '3 - Décret', '4 - Arrêté'] }
          ]
        };
      
      case 'category':
        return {
          title: 'Ajouter une catégorie de procédure',
          icon: <Tag className="w-5 h-5" />,
          fields: [
            { name: 'name', label: 'Nom de la catégorie', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'icon', label: 'Icône', type: 'select', options: ['Building', 'User', 'FileText', 'Shield'] },
            { name: 'color', label: 'Couleur', type: 'color' }
          ]
        };
      
      case 'organization':
        return {
          title: 'Ajouter une Organisation',
          icon: <Building className="w-5 h-5" />,
          fields: [
            { name: 'name', label: 'Nom de l\'organisation', type: 'text', required: true },
            { name: 'type', label: 'Type', type: 'select', options: ['Ministère', 'Organisme public', 'Collectivité locale'] },
            { name: 'address', label: 'Adresse', type: 'textarea' },
            { name: 'contact', label: 'Contact', type: 'text' },
            { name: 'website', label: 'Site web', type: 'url' }
          ]
        };
      
      case 'source':
        return {
          title: 'Ajouter une Source',
          icon: <Database className="w-5 h-5" />,
          fields: [
            { name: 'name', label: 'Nom de la source', type: 'text', required: true },
            { name: 'type', label: 'Type', type: 'select', options: ['Journal officiel', 'Site web', 'Base de données', 'Document physique'] },
            { name: 'url', label: 'URL', type: 'url' },
            { name: 'reliability', label: 'Fiabilité', type: 'select', options: ['Très élevée', 'Élevée', 'Moyenne', 'Faible'] }
          ]
        };
      
      case 'role':
        return {
          title: 'Nouveau Rôle',
          icon: <Users className="w-5 h-5" />,
          fields: [
            { name: 'name', label: 'Nom du rôle', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'level', label: 'Niveau d\'accès', type: 'select', options: ['1 - Lecteur', '2 - Contributeur', '3 - Modérateur', '4 - Administrateur'] },
            { name: 'permissions', label: 'Permissions', type: 'multiselect', options: ['Lecture', 'Écriture', 'Modification', 'Suppression', 'Administration'] }
          ]
        };
      
      case 'permission':
        return {
          title: 'Nouvelle Permission',
          icon: <Shield className="w-5 h-5" />,
          fields: [
            { name: 'name', label: 'Nom de la permission', type: 'text', required: true },
            { name: 'code', label: 'Code', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'resource', label: 'Ressource', type: 'select', options: ['Textes juridiques', 'Procédures', 'Utilisateurs', 'Système'] }
          ]
        };
      
      case 'policy':
        return {
          title: 'Nouvelle Politique',
          icon: <Shield className="w-5 h-5" />,
          fields: [
            { name: 'name', label: 'Nom de la politique', type: 'text', required: true },
            { name: 'type', label: 'Type', type: 'select', options: ['Sécurité', 'Accès', 'Données', 'Utilisation'] },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'rules', label: 'Règles', type: 'textarea' },
            { name: 'active', label: 'Active', type: 'checkbox' }
          ]
        };
      
      default:
        return {
          title: 'Nouvel élément',
          icon: <Plus className="w-5 h-5" />,
          fields: []
        };
    }
  };

  const config = getModalConfig();

  const handleSave = () => {
    onSave(formData);
    onClose();
    setFormData({});
  };

  const renderField = (field: Record<string, unknown>) => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            value={formData[field.name] || ''}
            onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
            placeholder={`Entrez ${field.label.toLowerCase()}`}
          />
        );
      
      case 'select':
        return (
          <Select value={formData[field.name]} onValueChange={(value) => setFormData({...formData, [field.name]: value})}>
            <SelectTrigger>
              <SelectValue placeholder={`Sélectionner ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'color':
        return (
          <Input
            type="color"
            value={formData[field.name] || '#000000'}
            onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
          />
        );
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={formData[field.name] || false}
            onChange={(e) => setFormData({...formData, [field.name]: e.target.checked})}
            className="w-4 h-4"
          />
        );
      
      default:
        return (
          <Input
            type={field.type || 'text'}
            value={formData[field.name] || ''}
            onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
            placeholder={`Entrez ${field.label.toLowerCase()}`}
            required={field.required}
          />
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {config.icon}
            {config.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {config.fields.map((field: Record<string, unknown>) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {renderField(field)}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
