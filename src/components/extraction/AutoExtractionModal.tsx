// @ts-nocheck
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Upload, 
  FileText, 
  Globe, 
  Download, 
  Play, 
  Pause, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Eye,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AutoExtractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: 'procedures' | 'legal-texts';
}

interface ExtractionJob {
  id: string;
  source: string;
  type: 'url' | 'file' | 'api';
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  extractedCount: number;
  errors: string[];
  results: Record<string, unknown>[];
}

export function AutoExtractionModal({ isOpen, onClose, context }: AutoExtractionModalProps) {
  const [activeTab, setActiveTab] = useState('url');
  const [extractionJobs, setExtractionJobs] = useState<ExtractionJob[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // États pour les différents types d'extraction
  const [urlList, setUrlList] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [apiHeaders, setApiHeaders] = useState('');
  const [batchFiles, setBatchFiles] = useState<FileList | null>(null);

  const contextConfig = {
    procedures: {
      title: 'Extraction Automatique - Procédures Administratives',
      description: 'Extraire automatiquement des procédures depuis diverses sources',
      placeholderUrls: 'https://example.gov.dz/procedures\nhttps://portal.gov.dz/admin-guide\nhttps://ministry.dz/procedures-list',
      placeholderApi: 'https://api.procedures.dz/v1/procedures',
      extractionTargets: ['Titre de la procédure', 'Description', 'Étapes', 'Documents requis', 'Délais', 'Coût']
    },
    'legal-texts': {
      title: 'Extraction Automatique - Textes Juridiques',
      description: 'Extraire automatiquement des textes juridiques depuis diverses sources',
      placeholderUrls: 'https://joradp.dz/HAR/Index.htm\nhttps://mjustice.dz/textes\nhttps://parliament.dz/lois',
      placeholderApi: 'https://api.joradp.dz/v1/textes',
      extractionTargets: ['Numéro', 'Titre', 'Type', 'Date publication', 'Contenu', 'Références']
    }
  };

  const config = contextConfig[context];

  const handleStartExtraction = async () => {
    setIsRunning(true);
    
    try {
      let sources: string[] = [];
      
      if (activeTab === 'url' && urlList.trim()) {
        sources = urlList.split('\n').filter(url => url.trim());
      } else if (activeTab === 'api' && apiEndpoint.trim()) {
        sources = [apiEndpoint];
      } else if (activeTab === 'files' && batchFiles) {
        sources = Array.from(batchFiles).map(f => f.name);
      }

      if (sources.length === 0) {
        toast({
          title: "Aucune source définie",
          description: "Veuillez spécifier au moins une source d'extraction",
          variant: "destructive"
        });
        setIsRunning(false);
        return;
      }

      // Simuler le processus d'extraction
      for (const source of sources) {
        const jobId = `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newJob: ExtractionJob = {
          id: jobId,
          source,
          type: activeTab as Record<string, unknown>,
          status: 'running',
          progress: 0,
          extractedCount: 0,
          errors: [],
          results: []
        };

        setExtractionJobs(prev => [...prev, newJob]);

        // Simuler le progrès
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          
          setExtractionJobs(prev => prev.map(job => 
            job.id === jobId 
              ? { 
                  ...job, 
                  progress,
                  extractedCount: Math.floor((progress / 100) * Math.random() * 50),
                  status: progress === 100 ? 'completed' : 'running'
                }
              : job
          ));
        }

        // Ajouter des résultats simulés
        const mockResults = generateMockResults(context);
        setExtractionJobs(prev => prev.map(job => 
          job.id === jobId 
            ? { ...job, results: mockResults, extractedCount: mockResults.length }
            : job
        ));
      }

      toast({
        title: "Extraction terminée",
        description: `${sources.length} source(s) traitée(s) avec succès`,
      });

    } catch (error) {
      toast({
        title: "Erreur d'extraction",
        description: "Une erreur s'est produite pendant l'extraction",
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
    }
  };

  const generateMockResults = (context: string) => {
    if (context === 'procedures') {
      return [
        {
          titre: "Demande de passeport biométrique",
          description: "Procédure pour obtenir un passeport biométrique algérien",
          etapes: ["Dépôt du dossier", "Prise d'empreintes", "Retrait"],
          documents: ["Acte de naissance", "Photo d'identité", "Justificatif domicile"],
          delai: "15 jours ouvrables",
          cout: "6000 DA"
        },
        {
          titre: "Carte d'identité nationale",
          description: "Établissement ou renouvellement de la carte d'identité",
          etapes: ["Constitution du dossier", "Dépôt en mairie", "Retrait"],
          documents: ["Acte de naissance", "Photo", "Certificat de résidence"],
          delai: "10 jours ouvrables",
          cout: "200 DA"
        }
      ];
    } else {
      return [
        {
          numero: "Loi n° 23-05",
          titre: "Loi relative à la fonction publique",
          type: "Loi",
          datePublication: "2023-06-15",
          contenu: "Cette loi définit les règles générales de la fonction publique...",
          references: ["Constitution", "Loi n° 06-03"]
        },
        {
          numero: "Décret n° 23-234",
          titre: "Décret exécutif relatif aux procédures administratives",
          type: "Décret exécutif",
          datePublication: "2023-07-20",
          contenu: "Le présent décret fixe les modalités d'application...",
          references: ["Loi n° 23-05", "Décret n° 22-145"]
        }
      ];
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setBatchFiles(files);
  };

  const handleStopExtraction = () => {
    setIsRunning(false);
    setExtractionJobs(prev => prev.map(job => 
      job.status === 'running' 
        ? { ...job, status: 'error', errors: ['Extraction interrompue par l\'utilisateur'] }
        : job
    ));
  };

  const handleClearJobs = () => {
    setExtractionJobs([]);
  };

  const handleViewResults = (job: ExtractionJob) => {
    console.log('Résultats de l\'extraction:', job.results);
    toast({
      title: "Résultats disponibles",
      description: `${job.extractedCount} éléments extraits de ${job.source}`,
    });
  };

  const totalExtracted = extractionJobs.reduce((sum, job) => sum + job.extractedCount, 0);
  const averageProgress = extractionJobs.length > 0 
    ? extractionJobs.reduce((sum, job) => sum + job.progress, 0) / extractionJobs.length 
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="w-6 h-6 text-orange-600" />
            {config.title}
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            {config.description}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Configuration de l'extraction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configuration de l'extraction</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="url" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    URLs
                  </TabsTrigger>
                  <TabsTrigger value="api" className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    API
                  </TabsTrigger>
                  <TabsTrigger value="files" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Fichiers
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="url" className="space-y-4">
                  <div>
                    <Label htmlFor="urls">URLs à extraire (une par ligne)</Label>
                    <Textarea
                      id="urls"
                      placeholder={config.placeholderUrls}
                      value={urlList}
                      onChange={(e) => setUrlList(e.target.value)}
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="api" className="space-y-4">
                  <div>
                    <Label htmlFor="endpoint">Point d'accès API</Label>
                    <Input
                      id="endpoint"
                      placeholder={config.placeholderApi}
                      value={apiEndpoint}
                      onChange={(e) => setApiEndpoint(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="headers">En-têtes HTTP (JSON)</Label>
                    <Textarea
                      id="headers"
                      placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                      value={apiHeaders}
                      onChange={(e) => setApiHeaders(e.target.value)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="files" className="space-y-4">
                  <div>
                    <Label htmlFor="files">Fichiers à traiter</Label>
                    <div className="mt-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt,.html"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Sélectionner des fichiers
                      </Button>
                      {batchFiles && (
                        <div className="mt-2 text-sm text-gray-600">
                          {batchFiles.length} fichier(s) sélectionné(s)
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Données à extraire :</h4>
                <div className="flex flex-wrap gap-2">
                  {config.extractionTargets.map((target, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      {target}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contrôles d'extraction */}
          <div className="flex items-center gap-4">
            {!isRunning ? (
              <Button onClick={handleStartExtraction} className="bg-orange-600 hover:bg-orange-700">
                <Play className="w-4 h-4 mr-2" />
                Démarrer l'extraction
              </Button>
            ) : (
              <Button onClick={handleStopExtraction} variant="destructive">
                <Pause className="w-4 h-4 mr-2" />
                Arrêter l'extraction
              </Button>
            )}
            
            {extractionJobs.length > 0 && (
              <Button onClick={handleClearJobs} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Effacer l'historique
              </Button>
            )}

            <div className="flex-1" />
            
            {totalExtracted > 0 && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                {totalExtracted} éléments extraits
              </Badge>
            )}
          </div>

          {/* Progrès global */}
          {isRunning && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progrès global</span>
                    <span>{Math.round(averageProgress)}%</span>
                  </div>
                  <Progress value={averageProgress} className="w-full" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Liste des tâches d'extraction */}
          {extractionJobs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tâches d'extraction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {extractionJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {job.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {job.status === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
                          {job.status === 'running' && <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />}
                          <span className="font-medium truncate max-w-md">{job.source}</span>
                          <Badge variant={job.type === 'url' ? 'default' : job.type === 'api' ? 'secondary' : 'outline'}>
                            {job.type.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {job.status === 'completed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewResults(job)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Voir ({job.extractedCount})
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {job.status !== 'pending' && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Progrès</span>
                            <span>{job.progress}%</span>
                          </div>
                          <Progress value={job.progress} className="w-full h-2" />
                        </div>
                      )}

                      {job.errors.length > 0 && (
                        <div className="mt-2 text-sm text-red-600">
                          <span className="font-medium">Erreurs : </span>
                          {job.errors.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Fermer
          </Button>
          <Button 
            onClick={() => {
              // Traiter les résultats et fermer
              const allResults = extractionJobs.flatMap(job => job.results);
              console.log('Résultats finaux:', allResults);
              toast({
                title: "Extraction terminée",
                description: `${allResults.length} éléments prêts à être importés`,
              });
              onClose();
            }}
            disabled={totalExtracted === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Importer les résultats ({totalExtracted})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}