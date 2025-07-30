
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Accessibility, 
  Volume2, 
  Eye, 
  Mic, 
  Keyboard, 
  MousePointer,
  Languages,
  Brain,
  Settings,
  Play,
  Square,
  RotateCcw
} from 'lucide-react';

export function UniversalAccessibility() {
  const [screenReaderOptimized, setScreenReaderOptimized] = useState(true);
  const [voiceNavigation, setVoiceNavigation] = useState(false);
  const [contrastModes, setContrastModes] = useState('normal');
  const [legalTTS, setLegalTTS] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState([1.2]);
  const [voicePitch, setVoicePitch] = useState([1.0]);
  const [keyboardOnlyMode, setKeyboardOnlyMode] = useState(false);
  const [motorAssistance, setMotorAssistance] = useState(false);

  const screenReaderFeatures = [
    { name: 'Navigation par landmarks', enabled: true, description: 'Navigation ARIA optimisée' },
    { name: 'Descriptions détaillées', enabled: true, description: 'Alt-texts juridiques enrichis' },
    { name: 'Raccourcis navigation', enabled: true, description: 'Touches rapides spécialisées' },
    { name: 'Lecture continue', enabled: false, description: 'Lecture automatique des textes' },
    { name: 'Notifications vocales', enabled: true, description: 'Alertes parlées' }
  ];

  const voiceCommands = [
    { command: '"Rechercher [terme]"', action: 'Lance une recherche', category: 'Navigation' },
    { command: '"Lire document"', action: 'Lecture du document actuel', category: 'Lecture' },
    { command: '"Nouvelle annotation"', action: 'Créer une annotation', category: 'Édition' },
    { command: '"Ouvrir favoris"', action: 'Accès aux favoris', category: 'Navigation' },
    { command: '"Aide contextuelle"', action: 'Assistant IA vocal', category: 'Assistance' }
  ];

  const contrastOptions = [
    { value: 'normal', label: 'Contraste normal', preview: 'bg-white text-black' },
    { value: 'high', label: 'Contraste élevé', preview: 'bg-black text-white' },
    { value: 'yellow-black', label: 'Jaune sur noir', preview: 'bg-black text-yellow-400' },
    { value: 'blue-white', label: 'Bleu sur blanc', preview: 'bg-white text-blue-900' },
    { value: 'inverted', label: 'Couleurs inversées', preview: 'bg-gray-900 text-gray-100' }
  ];

  const legalTTSVoices = [
    { id: 'legal-fr-male', name: 'Voix masculine juridique FR', language: 'Français' },
    { id: 'legal-fr-female', name: 'Voix féminine juridique FR', language: 'Français' },
    { id: 'legal-ar-male', name: 'Voix masculine juridique AR', language: 'Arabe' },
    { id: 'legal-en-female', name: 'Voix féminine juridique EN', language: 'Anglais' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-emerald-600" />
            Accessibilité Universelle Avancée
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Lecteur d'écran optimisé */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              Lecteur d'écran optimisé
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Mode lecteur d'écran</Label>
                  <Switch checked={screenReaderOptimized} onCheckedChange={setScreenReaderOptimized} />
                </div>
                {screenReaderFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium text-sm">{feature.name}</div>
                      <div className="text-xs text-gray-500">{feature.description}</div>
                    </div>
                    <Switch checked={feature.enabled} />
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Test de compatibilité</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                    <span>NVDA compatible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                    <span>JAWS compatible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                    <span>VoiceOver compatible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation vocale */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Mic className="w-4 h-4 text-red-600" />
              Navigation vocale avancée
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Contrôle vocal activé</Label>
                  <Switch checked={voiceNavigation} onCheckedChange={setVoiceNavigation} />
                </div>
                <div className="space-y-2">
                  <Label>Commandes vocales disponibles</Label>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {voiceCommands.map((cmd, index) => (
                      <div key={index} className="p-2 border rounded-lg text-sm">
                        <div className="font-mono text-blue-600">{cmd.command}</div>
                        <div className="text-gray-600">{cmd.action}</div>
                        <Badge variant="outline" className="text-xs mt-1">{cmd.category}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Mic className="w-4 h-4 text-red-500" />
                    <span className="font-medium">Test vocal</span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-1" />
                      Démarrer
                    </Button>
                    <Button size="sm" variant="outline">
                      <Square className="w-4 h-4 mr-1" />
                      Arrêter
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">
                    Dites "Bonjour Dalil" pour activer l'assistant vocal
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modes de contraste */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-600" />
              Modes de contraste visuels
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contrastOptions.map((option) => (
                <div 
                  key={option.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    contrastModes === option.value ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                  }`}
                  onClick={() => setContrastModes(option.value)}
                >
                  <div className={`p-2 rounded mb-2 ${option.preview}`}>
                    Exemple de texte juridique
                  </div>
                  <div className="font-medium text-sm">{option.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Synthèse vocale juridique */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-green-600" />
              Synthèse vocale juridique spécialisée
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Text-to-Speech juridique</Label>
                  <Switch checked={legalTTS} onCheckedChange={setLegalTTS} />
                </div>
                
                <div className="space-y-2">
                  <Label>Voix spécialisée</Label>
                  <Select defaultValue="legal-fr-female">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {legalTTSVoices.map((voice) => (
                        <SelectItem key={voice.id} value={voice.id}>
                          {voice.name} ({voice.language})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Vitesse: {voiceSpeed[0]}x</Label>
                  <Slider
                    value={voiceSpeed}
                    onValueChange={setVoiceSpeed}
                    max={3}
                    min={0.5}
                    step={0.1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tonalité: {voicePitch[0]}</Label>
                  <Slider
                    value={voicePitch}
                    onValueChange={setVoicePitch}
                    max={2}
                    min={0.5}
                    step={0.1}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium mb-2">Fonctionnalités spécialisées</h4>
                  <ul className="text-sm space-y-1 text-green-700">
                    <li>• Prononciation correcte des termes juridiques</li>
                    <li>• Pause automatique aux virgules et points</li>
                    <li>• Accentuation des mots-clés importants</li>
                    <li>• Lecture intelligente des références légales</li>
                    <li>• Support multi-langues (FR, AR, EN)</li>
                  </ul>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-1" />
                    Test vocal
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="w-4 h-4 mr-1" />
                    Paramètres
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Assistance motrice */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <MousePointer className="w-4 h-4 text-orange-600" />
              Assistance motrice et navigation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Mode clavier uniquement</Label>
                  <Switch checked={keyboardOnlyMode} onCheckedChange={setKeyboardOnlyMode} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Assistance motrice</Label>
                  <Switch checked={motorAssistance} onCheckedChange={setMotorAssistance} />
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Options d'assistance</h4>
                <div className="text-sm space-y-1 text-gray-600">
                  <div>• Clic automatique après pause</div>
                  <div>• Zones de clic agrandies</div>
                  <div>• Navigation par sections</div>
                  <div>• Délais d'interaction personnalisés</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Accessibility className="w-4 h-4 mr-2" />
              Appliquer Configuration
            </Button>
            <Button variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
