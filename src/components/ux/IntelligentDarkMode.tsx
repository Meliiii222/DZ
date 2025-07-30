
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Moon, 
  Sun, 
  Palette, 
  Eye, 
  Clock, 
  Zap,
  Monitor,
  Sunset,
  Timer
} from 'lucide-react';

export function IntelligentDarkMode() {
  const [darkMode, setDarkMode] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [adaptiveContrast, setAdaptiveContrast] = useState(true);
  const [blueLightFilter, setBlueLightFilter] = useState(false);
  const [scheduledMode, setScheduledMode] = useState(false);
  const [brightness, setBrightness] = useState([75]);
  const [colorTemperature, setColorTemperature] = useState([6500]);
  const [themeVariant, setThemeVariant] = useState('adaptive');

  const themePresets = [
    { id: 'adaptive', name: 'Adaptatif intelligent', icon: Zap },
    { id: 'dark-blue', name: 'Sombre bleu', icon: Moon },
    { id: 'high-contrast', name: 'Contraste élevé', icon: Eye },
    { id: 'warm-dark', name: 'Sombre chaleureux', icon: Sunset },
    { id: 'auto-schedule', name: 'Programmé automatique', icon: Timer }
  ];

  const timeSchedule = {
    dayStart: '07:00',
    nightStart: '19:00',
    weekendOffset: true
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-600" />
            Dark Mode Intelligent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Mode sombre activé</Label>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Basculement automatique</Label>
                <Switch checked={autoMode} onCheckedChange={setAutoMode} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Contraste adaptatif</Label>
                <Switch checked={adaptiveContrast} onCheckedChange={setAdaptiveContrast} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Filtre lumière bleue</Label>
                <Switch checked={blueLightFilter} onCheckedChange={setBlueLightFilter} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Mode programmé</Label>
                <Switch checked={scheduledMode} onCheckedChange={setScheduledMode} />
              </div>

              <div className="space-y-2">
                <Label>Variant de thème</Label>
                <Select value={themeVariant} onValueChange={setThemeVariant}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {themePresets.map((preset) => (
                      <SelectItem key={preset.id} value={preset.id}>
                        {preset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Luminosité: {brightness[0]}%</Label>
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  max={100}
                  min={10}
                  step={5}
                />
              </div>

              <div className="space-y-2">
                <Label>Température couleur: {colorTemperature[0]}K</Label>
                <Slider
                  value={colorTemperature}
                  onValueChange={setColorTemperature}
                  max={10000}
                  min={2000}
                  step={100}
                />
              </div>

              <div className="p-4 border rounded-lg bg-gray-50">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Configuration horaire
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-xs">Mode jour (début)</Label>
                    <div className="font-mono">{timeSchedule.dayStart}</div>
                  </div>
                  <div>
                    <Label className="text-xs">Mode nuit (début)</Label>
                    <div className="font-mono">{timeSchedule.nightStart}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themePresets.slice(0, 3).map((preset) => (
              <div 
                key={preset.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  themeVariant === preset.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                }`}
                onClick={() => setThemeVariant(preset.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <preset.icon className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-sm">{preset.name}</span>
                </div>
                <div className="h-8 rounded flex">
                  {preset.id === 'dark-blue' && (
                    <>
                      <div className="flex-1 bg-slate-900"></div>
                      <div className="flex-1 bg-blue-900"></div>
                      <div className="flex-1 bg-slate-800"></div>
                    </>
                  )}
                  {preset.id === 'high-contrast' && (
                    <>
                      <div className="flex-1 bg-black"></div>
                      <div className="flex-1 bg-white"></div>
                      <div className="flex-1 bg-yellow-400"></div>
                    </>
                  )}
                  {preset.id === 'adaptive' && (
                    <>
                      <div className="flex-1 bg-gradient-to-r from-blue-900 to-slate-900"></div>
                      <div className="flex-1 bg-gradient-to-r from-slate-900 to-gray-800"></div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Palette className="w-4 h-4 mr-2" />
              Appliquer Thème
            </Button>
            <Button variant="outline">
              <Monitor className="w-4 h-4 mr-2" />
              Prévisualiser
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
