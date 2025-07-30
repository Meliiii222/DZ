import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Database, 
  Settings, 
  Play, 
  Pause, 
  Download, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Filter
} from 'lucide-react';

interface ApiImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: 'legal-texts' | 'procedures' | 'news' | 'library';
}

export function ApiImportModal({ isOpen, onClose, context }: ApiImportModalProps) {
  const [selectedApis, setSelectedApis] = useState<string[]>([]);
  const [importMode, setImportMode] = useState<'manual' | 'scheduled'>('manual');
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importLog, setImportLog] = useState<string[]>([]);
  const [scheduleFrequency, setScheduleFrequency] = useState('daily');
  const [filterCriteria, setFilterCriteria] = useState('');

  // APIs disponibles selon le contexte
  const availableApis = [
    { 
      id: 'legifrance', 
      name: 'API Légifrance', 
      status: 'active', 
      category: context === 'legal-texts' ? 'Textes juridiques' : 'Procédures',
      lastSync: '2024-12-15 10:30',
      description: 'Base de données officielle du droit français'
    },
    { 
      id: 'eurlex', 
      name: 'API EUR-Lex', 
      status: 'active', 
      category: context === 'legal-texts' ? 'Textes européens' : 'Procédures UE',
      lastSync: '2024-12-15 09:15',
      description: 'Droit de l\'Union européenne'
    },
    { 
      id: 'ohchr', 
      name: 'API OHCHR', 
      status: 'active', 
      category: 'Droits humains',
      lastSync: '2024-12-15 08:45',
      description: 'Haut-Commissariat aux droits de l\'homme'
    },
    { 
      id: 'worldbank', 
      name: 'API World Bank Law', 
      status: 'inactive', 
      category: 'Droit du développement',
      lastSync: '2024-12-14 16:20',
      description: 'Banque mondiale - aspects juridiques'
    },
    { 
      id: 'untreaties', 
      name: 'API UN Treaties', 
      status: 'active', 
      category: 'Traités internationaux',
      lastSync: '2024-12-15 11:10',
      description: 'Collection des traités des Nations Unies'
    }
  ];

  const handleApiToggle = (apiId: string) => {
    setSelectedApis(prev => 
      prev.includes(apiId) 
        ? prev.filter(id => id !== apiId)
        : [...prev, apiId]
    );
  };

  const handleImport = async () => {
    if (selectedApis.length === 0) return;
    
    setIsImporting(true);
    setImportProgress(0);
    setImportLog([]);

    const apis = availableApis.filter(api => selectedApis.includes(api.id));
    const totalApis = apis.length;

    for (let i = 0; i < totalApis; i++) {
      const api = apis[i];
      setImportLog(prev => [...prev, `🔄 Connexion à ${api.name}...`]);
      
      // Simulation du processus d'import
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setImportLog(prev => [...prev, `📡 Récupération des données depuis ${api.name}...`]);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const recordsCount = Math.floor(Math.random() * 500) + 50;
      setImportLog(prev => [...prev, `✅ ${recordsCount} enregistrements importés depuis ${api.name}`]);
      
      setImportProgress(((i + 1) / totalApis) * 100);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setImportLog(prev => [...prev, `🎉 Import terminé avec succès !`]);
    setTimeout(() => {
      setIsImporting(false);
      setImportProgress(0);
      onClose();
    }, 2000);
  };

  const handleScheduleImport = () => {
    const message = `Import programmé: ${scheduleFrequency} pour ${selectedApis.length} API(s)`;
    setImportLog([`⏰ ${message}`]);
    console.log('Import programmé:', { selectedApis, frequency: scheduleFrequency, context });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Import via API - {context === 'legal-texts' ? 'Textes Juridiques' : 'Procédures Administratives'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-4">
          {/* Sélection des APIs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">APIs disponibles</h3>
              <Badge variant="outline">
                {selectedApis.length} sélectionnée(s)
              </Badge>
            </div>

            <div className="space-y-3">
              {availableApis.map((api) => (
                <Card 
                  key={api.id} 
                  className={`cursor-pointer transition-all ${
                    selectedApis.includes(api.id) ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                  } ${api.status === 'inactive' ? 'opacity-60' : ''}`}
                  onClick={() => api.status === 'active' && handleApiToggle(api.id)}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedApis.includes(api.id)}
                          disabled={api.status === 'inactive'}
                          onChange={() => handleApiToggle(api.id)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{api.name}</h4>
                            <Badge variant="outline">{api.category}</Badge>
                            <Badge className={api.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {api.status === 'active' ? 'Actif' : 'Inactif'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{api.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Dernière sync: {api.lastSync}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Configuration d'import */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Configuration</h3>

            <div className="space-y-2">
              <Label>Mode d'import</Label>
              <Select value={importMode} onValueChange={(value: 'manual' | 'scheduled') => setImportMode(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Import manuel</SelectItem>
                  <SelectItem value="scheduled">Import programmé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {importMode === 'scheduled' && (
              <div className="space-y-2">
                <Label>Fréquence</Label>
                <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Toutes les heures</SelectItem>
                    <SelectItem value="daily">Quotidien</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>
                <Filter className="w-4 h-4 inline mr-1" />
                Critères de filtrage
              </Label>
              <Textarea
                value={filterCriteria}
                onChange={(e) => setFilterCriteria(e.target.value)}
                placeholder="ex: date > 2024-01-01, domaine = civil..."
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="space-y-2">
              {importMode === 'manual' ? (
                <Button
                  onClick={handleImport}
                  disabled={selectedApis.length === 0 || isImporting}
                  className="w-full"
                >
                  {isImporting ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Import en cours...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Démarrer l'import
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleScheduleImport}
                  disabled={selectedApis.length === 0}
                  className="w-full"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Programmer l'import
                </Button>
              )}

              <Button variant="outline" onClick={onClose} className="w-full">
                Fermer
              </Button>
            </div>
          </div>
        </div>

        {/* Barre de progression et logs */}
        {(isImporting || importLog.length > 0) && (
          <div className="space-y-4 mt-6 pt-6 border-t">
            {isImporting && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progression</span>
                  <span className="text-sm text-gray-600">{Math.round(importProgress)}%</span>
                </div>
                <Progress value={importProgress} className="w-full" />
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-medium">Journal d'import</h4>
              <div className="bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto">
                {importLog.map((log, index) => (
                  <div key={index} className="text-sm font-mono text-gray-700">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}