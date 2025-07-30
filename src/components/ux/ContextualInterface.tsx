
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  User, 
  UserCheck, 
  Scale, 
  Building, 
  Shield, 
  Settings,
  Eye,
  Palette,
  Layout,
  Zap
} from 'lucide-react';

export function ContextualInterface() {
  const [userRole, setUserRole] = useState('juriste');
  const [contextualUI, setContextualUI] = useState(true);
  const [quickActions, setQuickActions] = useState(true);
  const [roleBasedMenus, setRoleBasedMenus] = useState(true);

  const roleConfigs = {
    avocat: {
      icon: Scale,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      primaryActions: ['Nouveaux dossiers', 'Jurisprudence', 'Échéances'],
      quickAccess: ['Code civil', 'Code pénal', 'Procédure civile'],
      widgets: ['Agenda audiences', 'Dossiers urgents', 'Facturation']
    },
    'compliance-officer': {
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      primaryActions: ['Audit conformité', 'Alertes réglementaires', 'Rapports'],
      quickAccess: ['RGPD', 'Normes ISO', 'Réglementation bancaire'],
      widgets: ['Dashboard risques', 'Échéances compliance', 'Formations']
    },
    juriste: {
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      primaryActions: ['Veille juridique', 'Contrats', 'Consultations'],
      quickAccess: ['Code du travail', 'Droit des sociétés', 'Droit fiscal'],
      widgets: ['Actualités juridiques', 'Textes favoris', 'Recherches sauvées']
    },
    entreprise: {
      icon: Building,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      primaryActions: ['Obligations légales', 'Procédures', 'Documentation'],
      quickAccess: ['Réglementations secteur', 'Formulaires', 'Guides pratiques'],
      widgets: ['Alertes sectorielles', 'Procédures courantes', 'Support juridique']
    }
  };

  const currentConfig = roleConfigs[userRole as keyof typeof roleConfigs];
  const IconComponent = currentConfig.icon;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Interface Contextuelle Adaptative
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Rôle utilisateur actuel</Label>
                <Select value={userRole} onValueChange={setUserRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="avocat">Avocat</SelectItem>
                    <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                    <SelectItem value="juriste">Juriste d'entreprise</SelectItem>
                    <SelectItem value="entreprise">Utilisateur entreprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Interface contextuelle</Label>
                  <Switch checked={contextualUI} onCheckedChange={setContextualUI} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Actions rapides adaptées</Label>
                  <Switch checked={quickActions} onCheckedChange={setQuickActions} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Menus basés sur le rôle</Label>
                  <Switch checked={roleBasedMenus} onCheckedChange={setRoleBasedMenus} />
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${currentConfig.bgColor}`}>
              <div className="flex items-center gap-2 mb-4">
                <IconComponent className={`w-6 h-6 ${currentConfig.color}`} />
                <h3 className="font-semibold">Aperçu Interface {userRole}</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Actions principales :</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentConfig.primaryActions.map((action, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Accès rapide :</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentConfig.quickAccess.map((item, index) => (
                      <Badge key={index} className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Widgets tableau de bord :</h4>
                  <div className="space-y-1">
                    {currentConfig.widgets.map((widget, index) => (
                      <div key={index} className="text-xs text-gray-600">• {widget}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Settings className="w-4 h-4 mr-2" />
              Appliquer Configuration
            </Button>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Prévisualiser Interface
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
