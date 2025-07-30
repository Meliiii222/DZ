// @ts-nocheck
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Settings, 
  Palette, 
  Activity, 
  Filter,
  Save,
  RotateCcw,
  Download
} from 'lucide-react';

interface GraphSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySettings: (settings: Record<string, unknown>) => void;
}

export function GraphSettingsDialog({ isOpen, onClose, onApplySettings }: GraphSettingsDialogProps) {
  const [settings, setSettings] = useState({
    // Affichage
    showLabels: true,
    showConnections: true,
    showImportance: true,
    animateTransitions: true,
    
    // Physique
    linkStrength: [50],
    nodeRepulsion: [30],
    gravity: [10],
    friction: [80],
    
    // Filtres
    minConnections: [0],
    maxConnections: [100],
    dateRange: 'all',
    nodeTypes: ['all'],
    importanceLevel: 'all',
    
    // Couleurs
    colorScheme: 'default',
    nodeSize: 'connections',
    customColors: {
      constitution: '#ef4444',
      code: '#3b82f6',
      loi: '#22c55e',
      decret: '#eab308',
      fonctionPublique: '#8b5cf6'
    }
  });

  const handleSettingChange = (key: string, value: Record<string, unknown>) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = () => {
    onApplySettings(settings);
    onClose();
  };

  const resetToDefaults = () => {
    setSettings({
      showLabels: true,
      showConnections: true,
      showImportance: true,
      animateTransitions: true,
      linkStrength: [50],
      nodeRepulsion: [30],
      gravity: [10],
      friction: [80],
      minConnections: [0],
      maxConnections: [100],
      dateRange: 'all',
      nodeTypes: ['all'],
      importanceLevel: 'all',
      colorScheme: 'default',
      nodeSize: 'connections',
      customColors: {
        constitution: '#ef4444',
        code: '#3b82f6',
        loi: '#22c55e',
        decret: '#eab308',
        fonctionPublique: '#8b5cf6'
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            Paramètres du Graphe de Connaissance
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="display" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="display">Affichage</TabsTrigger>
            <TabsTrigger value="physics">Physique</TabsTrigger>
            <TabsTrigger value="filters">Filtres</TabsTrigger>
            <TabsTrigger value="colors">Couleurs</TabsTrigger>
          </TabsList>

          <TabsContent value="display" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Options d'Affichage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="labels">Afficher les étiquettes</Label>
                  <Switch
                    id="labels"
                    checked={settings.showLabels}
                    onCheckedChange={(checked) => handleSettingChange('showLabels', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="connections">Afficher les connexions</Label>
                  <Switch
                    id="connections"
                    checked={settings.showConnections}
                    onCheckedChange={(checked) => handleSettingChange('showConnections', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="importance">Indiquer l'importance</Label>
                  <Switch
                    id="importance"
                    checked={settings.showImportance}
                    onCheckedChange={(checked) => handleSettingChange('showImportance', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="animate">Animations de transition</Label>
                  <Switch
                    id="animate"
                    checked={settings.animateTransitions}
                    onCheckedChange={(checked) => handleSettingChange('animateTransitions', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Taille des nœuds basée sur</Label>
                  <Select 
                    value={settings.nodeSize} 
                    onValueChange={(value) => handleSettingChange('nodeSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="connections">Nombre de connexions</SelectItem>
                      <SelectItem value="importance">Niveau d'importance</SelectItem>
                      <SelectItem value="date">Date de publication</SelectItem>
                      <SelectItem value="uniform">Taille uniforme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="physics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Paramètres Physiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Force des liens: {settings.linkStrength[0]}%</Label>
                  <Slider
                    value={settings.linkStrength}
                    onValueChange={(value) => handleSettingChange('linkStrength', value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Répulsion des nœuds: {settings.nodeRepulsion[0]}%</Label>
                  <Slider
                    value={settings.nodeRepulsion}
                    onValueChange={(value) => handleSettingChange('nodeRepulsion', value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Gravité: {settings.gravity[0]}%</Label>
                  <Slider
                    value={settings.gravity}
                    onValueChange={(value) => handleSettingChange('gravity', value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Friction: {settings.friction[0]}%</Label>
                  <Slider
                    value={settings.friction}
                    onValueChange={(value) => handleSettingChange('friction', value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="filters" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtres et Sélection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Connexions min: {settings.minConnections[0]}</Label>
                    <Slider
                      value={settings.minConnections}
                      onValueChange={(value) => handleSettingChange('minConnections', value)}
                      max={50}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Connexions max: {settings.maxConnections[0]}</Label>
                    <Slider
                      value={settings.maxConnections}
                      onValueChange={(value) => handleSettingChange('maxConnections', value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Période</Label>
                  <Select 
                    value={settings.dateRange} 
                    onValueChange={(value) => handleSettingChange('dateRange', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les périodes</SelectItem>
                      <SelectItem value="recent">5 dernières années</SelectItem>
                      <SelectItem value="decade">10 dernières années</SelectItem>
                      <SelectItem value="custom">Période personnalisée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Niveau d'importance</Label>
                  <Select 
                    value={settings.importanceLevel} 
                    onValueChange={(value) => handleSettingChange('importanceLevel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les niveaux</SelectItem>
                      <SelectItem value="high">Critique seulement</SelectItem>
                      <SelectItem value="medium-high">Important et Critique</SelectItem>
                      <SelectItem value="low">Standard seulement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Schéma de Couleurs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Thème prédéfini</Label>
                  <Select 
                    value={settings.colorScheme} 
                    onValueChange={(value) => handleSettingChange('colorScheme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Par défaut</SelectItem>
                      <SelectItem value="professional">Professionnel</SelectItem>
                      <SelectItem value="colorblind">Daltonien friendly</SelectItem>
                      <SelectItem value="high-contrast">Contraste élevé</SelectItem>
                      <SelectItem value="custom">Personnalisé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {settings.colorScheme === 'custom' && (
                  <div className="space-y-4">
                    <Label>Couleurs personnalisées</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Input 
                          type="color" 
                          value={settings.customColors.constitution}
                          onChange={(e) => handleSettingChange('customColors', {
                            ...settings.customColors,
                            constitution: e.target.value
                          })}
                          className="w-12 h-8"
                        />
                        <Label>Constitution</Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Input 
                          type="color" 
                          value={settings.customColors.code}
                          onChange={(e) => handleSettingChange('customColors', {
                            ...settings.customColors,
                            code: e.target.value
                          })}
                          className="w-12 h-8"
                        />
                        <Label>Code</Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Input 
                          type="color" 
                          value={settings.customColors.loi}
                          onChange={(e) => handleSettingChange('customColors', {
                            ...settings.customColors,
                            loi: e.target.value
                          })}
                          className="w-12 h-8"
                        />
                        <Label>Loi</Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Input 
                          type="color" 
                          value={settings.customColors.fonctionPublique}
                          onChange={(e) => handleSettingChange('customColors', {
                            ...settings.customColors,
                            fonctionPublique: e.target.value
                          })}
                          className="w-12 h-8"
                        />
                        <Label>Fonction publique</Label>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetToDefaults}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Réinitialiser
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter Config
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleApply}>
              <Save className="w-4 h-4 mr-2" />
              Appliquer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}