
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Zap, 
  Keyboard, 
  Brain, 
  TrendingUp, 
  Clock, 
  Target,
  Plus,
  Edit3,
  Trash2,
  Star
} from 'lucide-react';

export function IntelligentShortcuts() {
  const [adaptiveShortcuts, setAdaptiveShortcuts] = useState(true);
  const [learningMode, setLearningMode] = useState(true);
  const [contextualSuggestions, setContextualSuggestions] = useState(true);
  const [newShortcutKey, setNewShortcutKey] = useState('');
  const [newShortcutAction, setNewShortcutAction] = useState('');

  const intelligentShortcuts = [
    {
      keys: 'Ctrl + Alt + S',
      action: 'Recherche sémantique',
      usage: 89,
      context: 'Recherche',
      adaptive: true,
      learned: true
    },
    {
      keys: 'Ctrl + Shift + N',
      action: 'Nouveau document juridique',
      usage: 76,
      context: 'Création',
      adaptive: true,
      learned: false
    },
    {
      keys: 'Alt + F',
      action: 'Favoris rapides',
      usage: 92,
      context: 'Navigation',
      adaptive: false,
      learned: true
    },
    {
      keys: 'Ctrl + T',
      action: 'Timeline des modifications',
      usage: 45,
      context: 'Historique',
      adaptive: true,
      learned: false
    },
    {
      keys: 'Shift + Alt + A',
      action: 'Assistant IA contextuel',
      usage: 67,
      context: 'IA',
      adaptive: true,
      learned: true
    }
  ];

  const contextualSuggestionsList = [
    {
      context: 'Lors de la rédaction',
      suggestion: 'Ctrl + Space → Autocomplétion juridique',
      frequency: 'Très fréquent'
    },
    {
      context: 'En consultation de texte',
      suggestion: 'Alt + C → Créer annotation',
      frequency: 'Fréquent'
    },
    {
      context: 'En mode recherche',
      suggestion: 'F3 → Recherche dans le résultat',
      frequency: 'Moyen'
    }
  ];

  const usagePatterns = [
    { time: '9h-11h', actions: ['Recherche', 'Veille'], shortcuts: 12 },
    { time: '11h-14h', actions: ['Rédaction', 'Analyse'], shortcuts: 18 },
    { time: '14h-17h', actions: ['Révision', 'Validation'], shortcuts: 15 },
    { time: '17h-19h', actions: ['Export', 'Archivage'], shortcuts: 8 }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            Raccourcis Intelligents Adaptatifs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between">
              <Label>Raccourcis adaptatifs</Label>
              <Switch checked={adaptiveShortcuts} onCheckedChange={setAdaptiveShortcuts} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Mode apprentissage</Label>
              <Switch checked={learningMode} onCheckedChange={setLearningMode} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Suggestions contextuelles</Label>
              <Switch checked={contextualSuggestions} onCheckedChange={setContextualSuggestions} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-600" />
                Raccourcis Intelligents
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {intelligentShortcuts.map((shortcut, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {shortcut.keys}
                        </Badge>
                        {shortcut.adaptive && (
                          <Badge className="bg-purple-100 text-purple-800 text-xs">
                            <Brain className="w-3 h-3 mr-1" />
                            IA
                          </Badge>
                        )}
                        {shortcut.learned && (
                          <Star className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm font-medium mb-1">{shortcut.action}</div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Contexte: {shortcut.context}</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>{shortcut.usage}% d'utilisation</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-600" />
                  Suggestions Contextuelles
                </h3>
                <div className="space-y-2">
                  {contextualSuggestionsList.map((item, index) => (
                    <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-sm font-medium text-green-800 mb-1">
                        {item.context}
                      </div>
                      <div className="text-sm text-green-700 mb-2">
                        {item.suggestion}
                      </div>
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        {item.frequency}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Patterns d'Usage
                </h3>
                <div className="space-y-2">
                  {usagePatterns.map((pattern, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{pattern.time}</span>
                        <Badge variant="outline">{pattern.shortcuts} raccourcis</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {pattern.actions.map((action, idx) => (
                          <Badge key={idx} className="text-xs bg-blue-100 text-blue-800">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Créer un nouveau raccourci</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Combinaison de touches</Label>
                <Input 
                  placeholder="ex: Ctrl + Alt + X"
                  value={newShortcutKey}
                  onChange={(e) => setNewShortcutKey(e.target.value)}
                />
              </div>
              <div>
                <Label>Action</Label>
                <Input 
                  placeholder="Nom de l'action"
                  value={newShortcutAction}
                  onChange={(e) => setNewShortcutAction(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <Keyboard className="w-4 h-4 mr-2" />
              Enregistrer Configuration
            </Button>
            <Button variant="outline">
              <Brain className="w-4 h-4 mr-2" />
              Réinitialiser IA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
