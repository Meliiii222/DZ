
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { buttonHandlers } from '@/utils/buttonUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Settings, Bell, Mail, MessageSquare, Smartphone, Plus, Trash2 } from 'lucide-react';

interface AlertsConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AlertsConfigurationModal({ isOpen, onClose }: AlertsConfigurationModalProps) {
  const [globalSettings, setGlobalSettings] = useState({
    enabled: true,
    frequency: 'immediate',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    },
    maxDaily: 50
  });

  const [channelSettings, setChannelSettings] = useState({
    email: { enabled: true, priority: 'medium' },
    sms: { enabled: false, priority: 'high' },
    push: { enabled: true, priority: 'low' },
    webhook: { enabled: false, priority: 'medium' }
  });

  const [templates, setTemplates] = useState([
    { id: 1, name: 'Alerte Juridique', subject: 'Nouvelle mise à jour juridique', active: true },
    { id: 2, name: 'Échéance Procédure', subject: 'Échéance à venir', active: true },
    { id: 3, name: 'Alerte Conformité', subject: 'Non-conformité détectée', active: false }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Configuration alertes:', { globalSettings, channelSettings, templates });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-blue-600" />
            <DialogTitle className="text-lg font-semibold">Configuration Alertes & Notifications</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="py-4">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Paramètres Généraux</TabsTrigger>
              <TabsTrigger value="channels">Canaux</TabsTrigger>
              <TabsTrigger value="templates">Modèles</TabsTrigger>
              <TabsTrigger value="rules">Règles</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Paramètres Globaux
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enabled"
                      checked={globalSettings.enabled}
                      onCheckedChange={(checked) => setGlobalSettings(prev => ({...prev, enabled: checked}))}
                    />
                    <Label htmlFor="enabled">Activer les notifications</Label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Fréquence des notifications</Label>
                      <Select 
                        value={globalSettings.frequency} 
                        onValueChange={(value) => setGlobalSettings(prev => ({...prev, frequency: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immédiate</SelectItem>
                          <SelectItem value="hourly">Toutes les heures</SelectItem>
                          <SelectItem value="daily">Quotidienne</SelectItem>
                          <SelectItem value="weekly">Hebdomadaire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxDaily">Limite quotidienne</Label>
                      <Input
                        id="maxDaily"
                        type="number"
                        value={globalSettings.maxDaily}
                        onChange={(e) => setGlobalSettings(prev => ({...prev, maxDaily: parseInt(e.target.value)}))}
                        min="1"
                        max="100"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="quietHours"
                        checked={globalSettings.quietHours.enabled}
                        onCheckedChange={(checked) => setGlobalSettings(prev => ({
                          ...prev,
                          quietHours: {...prev.quietHours, enabled: checked}
                        }))}
                      />
                      <Label htmlFor="quietHours">Heures de silence</Label>
                    </div>
                    {globalSettings.quietHours.enabled && (
                      <div className="grid grid-cols-2 gap-4 ml-6">
                        <div className="space-y-2">
                          <Label htmlFor="quietStart">Début</Label>
                          <Input
                            id="quietStart"
                            type="time"
                            value={globalSettings.quietHours.start}
                            onChange={(e) => setGlobalSettings(prev => ({
                              ...prev,
                              quietHours: {...prev.quietHours, start: e.target.value}
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quietEnd">Fin</Label>
                          <Input
                            id="quietEnd"
                            type="time"
                            value={globalSettings.quietHours.end}
                            onChange={(e) => setGlobalSettings(prev => ({
                              ...prev,
                              quietHours: {...prev.quietHours, end: e.target.value}
                            }))}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="channels" className="space-y-4">
              {Object.entries(channelSettings).map(([channel, settings]) => {
                const icons = {
                  email: Mail,
                  sms: MessageSquare,
                  push: Smartphone,
                  webhook: Settings
                };
                const Icon = icons[channel as keyof typeof icons];
                
                return (
                  <Card key={channel}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <div>
                            <h4 className="font-semibold capitalize">{channel}</h4>
                            <p className="text-sm text-gray-600">
                              {channel === 'email' && 'Notifications par email'}
                              {channel === 'sms' && 'Messages SMS'}
                              {channel === 'push' && 'Notifications push'}
                              {channel === 'webhook' && 'Webhooks personnalisés'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Select 
                            value={settings.priority}
                            onValueChange={(value) => setChannelSettings(prev => ({
                              ...prev,
                              [channel]: {...settings, priority: value}
                            }))}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Faible</SelectItem>
                              <SelectItem value="medium">Moyen</SelectItem>
                              <SelectItem value="high">Élevé</SelectItem>
                            </SelectContent>
                          </Select>
                          <Switch
                            checked={settings.enabled}
                            onCheckedChange={(checked) => setChannelSettings(prev => ({
                              ...prev,
                              [channel]: {...settings, enabled: checked}
                            }))}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Modèles de Notifications</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={buttonHandlers.generic('Nouveau modèle', 'Création d\'un nouveau modèle de notification', 'Alertes')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau Modèle
                </Button>
              </div>
              
              {templates.map((template) => (
                <Card key={template.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.subject}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={template.active}
                          onCheckedChange={(checked) => setTemplates(prev => 
                            prev.map(t => t.id === template.id ? {...t, active: checked} : t)
                          )}
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={buttonHandlers.generic(`Modifier modèle: ${template.name}`, 'Modification du modèle', 'Alertes')}
                        >
                          Modifier
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={buttonHandlers.generic(`Supprimer modèle: ${template.name}`, 'Suppression du modèle', 'Alertes')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="rules" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Règles de Notification</CardTitle>
                  <CardDescription>
                    Configurez les conditions d'envoi des notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Fonctionnalité en développement - Permettra de créer des règles complexes 
                    pour déclencher les notifications selon des critères spécifiques.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-6 border-t mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Sauvegarder la Configuration
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
