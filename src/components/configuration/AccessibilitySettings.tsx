
// @ts-nocheck
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Accessibility, 
  Eye, 
  Volume2, 
  Keyboard, 
  Mouse, 
  Palette, 
  Type,
  Settings,
  Save,
  RotateCcw,
  Zap
} from 'lucide-react';

interface AccessibilitySettingsProps {
  language?: string;
}

export function AccessibilitySettings({ language = "fr" }: AccessibilitySettingsProps) {
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    screenReader: false,
    keyboardNavigation: true,
    reducedMotion: false,
    colorBlindAssist: false,
    fontSize: [16],
    voiceRate: [1],
    theme: 'default'
  });

  const handleSettingChange = (key: string, value: Record<string, unknown>) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Sauvegarder chaque paramètre individuellement
    Object.entries(settings).forEach(([key, value]) => {
      window.dispatchEvent(new CustomEvent('save-configuration', {
        detail: {
          key: `accessibility-${key}`,
          value: value,
          category: 'accessibility',
          userId: 'current-user'
        }
      }));
    });
  };

  const handleReset = () => {
    const defaultSettings = {
      highContrast: false,
      largeText: false,
      screenReader: false,
      keyboardNavigation: true,
      reducedMotion: false,
      colorBlindAssist: false,
      fontSize: [16],
      voiceRate: [1],
      theme: 'default'
    };
    
    setSettings(defaultSettings);
    
    // Réinitialiser les configurations dans le store
    window.dispatchEvent(new CustomEvent('reset-configuration', {
      detail: { category: 'accessibility' }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Accessibility className="w-6 h-6 text-emerald-600" />
          Interface adaptée aux personnes à mobilité réduite
        </h2>
        <p className="text-gray-600">
          Personnalisez l'interface pour améliorer l'accessibilité et l'utilisabilité
        </p>
      </div>

      {/* Paramètres visuels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            Paramètres visuels
          </CardTitle>
          <CardDescription>
            Ajustements pour améliorer la lisibilité et le contraste
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast">Contraste élevé</Label>
                <Switch
                  id="high-contrast"
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => handleSettingChange('highContrast', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="large-text">Texte agrandie</Label>
                <Switch
                  id="large-text"
                  checked={settings.largeText}
                  onCheckedChange={(checked) => handleSettingChange('largeText', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="reduced-motion">Mouvement réduit</Label>
                <Switch
                  id="reduced-motion"
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => handleSettingChange('reducedMotion', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="color-blind">Assistance daltonisme</Label>
                <Switch
                  id="color-blind"
                  checked={settings.colorBlindAssist}
                  onCheckedChange={(checked) => handleSettingChange('colorBlindAssist', checked)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Taille de police: {settings.fontSize[0]}px</Label>
                <Slider
                  value={settings.fontSize}
                  onValueChange={(value) => handleSettingChange('fontSize', value)}
                  max={24}
                  min={12}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Thème visuel</Label>
                <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Défaut</SelectItem>
                    <SelectItem value="dark">Sombre</SelectItem>
                    <SelectItem value="high-contrast">Contraste élevé</SelectItem>
                    <SelectItem value="large-print">Gros caractères</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Paramètres audio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-green-600" />
            Paramètres audio
          </CardTitle>
          <CardDescription>
            Assistance vocale et paramètres sonores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="screen-reader">Lecteur d'écran</Label>
            <Switch
              id="screen-reader"
              checked={settings.screenReader}
              onCheckedChange={(checked) => handleSettingChange('screenReader', checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Vitesse de lecture: {settings.voiceRate[0]}x</Label>
            <Slider
              value={settings.voiceRate}
              onValueChange={(value) => handleSettingChange('voiceRate', value)}
              max={2}
              min={0.5}
              step={0.1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Paramètres de navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-purple-600" />
            Navigation et contrôles
          </CardTitle>
          <CardDescription>
            Paramètres de navigation au clavier et à la souris
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="keyboard-nav">Navigation clavier avancée</Label>
            <Switch
              id="keyboard-nav"
              checked={settings.keyboardNavigation}
              onCheckedChange={(checked) => handleSettingChange('keyboardNavigation', checked)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-3 border rounded-lg text-center">
              <Keyboard className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-sm font-medium">TAB</div>
              <div className="text-xs text-gray-500">Navigation</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-sm font-medium">ENTER</div>
              <div className="text-xs text-gray-500">Activer</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <Mouse className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-sm font-medium">ESC</div>
              <div className="text-xs text-gray-500">Fermer</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Raccourcis clavier */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-orange-600" />
            Raccourcis clavier
          </CardTitle>
          <CardDescription>
            Raccourcis clavier personnalisés pour une navigation rapide
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: "Alt + H", action: "Accueil" },
              { key: "Alt + S", action: "Recherche" },
              { key: "Alt + N", action: "Nouveau document" },
              { key: "Alt + P", action: "Imprimer" },
              { key: "Ctrl + /", action: "Aide" },
              { key: "F1", action: "Support technique" }
            ].map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">{shortcut.action}</span>
                <Badge variant="outline" className="font-mono text-xs">
                  {shortcut.key}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder les paramètres
        </Button>
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Réinitialiser
        </Button>
      </div>
    </div>
  );
}
