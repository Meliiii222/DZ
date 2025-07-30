
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  WifiOff, 
  Download, 
  HardDrive, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Database,
  Settings,
  Smartphone
} from 'lucide-react';
import { UnifiedSectionHeader } from '../common/UnifiedSectionHeader';

interface OfflineModeProps {
  language?: string;
}

export function OfflineMode({ language = "fr" }: OfflineModeProps) {
  const [offlineEnabled, setOfflineEnabled] = useState(false);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleSync = async () => {
    setSyncInProgress(true);
    // Simulation de synchronisation
    for (let i = 0; i <= 100; i += 10) {
      setTimeout(() => {
        setDownloadProgress(i);
        if (i === 100) {
          setSyncInProgress(false);
        }
      }, i * 50);
    }
  };

  const offlineStats = [
    { label: "Documents hors-ligne", value: "1,248", icon: Database },
    { label: "Espace utilisé", value: "2.3 GB", icon: HardDrive },
    { label: "Dernière sync", value: "Il y a 2h", icon: RefreshCw },
    { label: "Statut", value: "Actif", icon: CheckCircle }
  ];

  return (
    <div className="space-y-6">
      <UnifiedSectionHeader
        icon={WifiOff}
        title="Mode hors-ligne"
        description="Configuration et gestion du mode de fonctionnement sans connexion internet"
        iconColor="text-orange-600"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {offlineStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
          <TabsTrigger value="sync">Synchronisation</TabsTrigger>
          <TabsTrigger value="storage">Stockage</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configuration du Mode Hors-ligne
              </CardTitle>
              <CardDescription>
                Activez et configurez les fonctionnalités disponibles sans connexion internet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">Activer le mode hors-ligne</h4>
                  <p className="text-sm text-gray-600">Permet d'accéder aux documents téléchargés sans internet</p>
                </div>
                <Switch
                  checked={offlineEnabled}
                  onCheckedChange={setOfflineEnabled}
                />
              </div>

              {offlineEnabled && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Synchronisation automatique</h4>
                      <p className="text-sm text-gray-600">Synchronise automatiquement lors de la connexion</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Téléchargement en arrière-plan</h4>
                      <p className="text-sm text-gray-600">Télécharge les nouveaux documents automatiquement</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Mode économie de données</h4>
                      <p className="text-sm text-gray-600">Limite les téléchargements aux contenus essentiels</p>
                    </div>
                    <Switch />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Synchronisation des Données
              </CardTitle>
              <CardDescription>
                Gérez la synchronisation de vos données avec le serveur
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {syncInProgress && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Synchronisation en cours...</span>
                    <span className="text-sm text-gray-600">{downloadProgress}%</span>
                  </div>
                  <Progress value={downloadProgress} className="w-full" />
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={handleSync} disabled={syncInProgress}>
                  <Download className="w-4 h-4 mr-2" />
                  Synchroniser maintenant
                </Button>
                <Button variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Planifier la sync
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Types de contenu à synchroniser :</h4>
                <div className="space-y-3">
                  {[
                    { label: "Textes juridiques favoris", checked: true },
                    { label: "Procédures administratives récentes", checked: true },
                    { label: "Recherches sauvegardées", checked: false },
                    { label: "Documents de travail", checked: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{item.label}</span>
                      <Switch defaultChecked={item.checked} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="w-5 h-5" />
                Gestion du Stockage Local
              </CardTitle>
              <CardDescription>
                Gérez l'espace de stockage utilisé par le mode hors-ligne
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Espace utilisé</span>
                  <span className="text-sm text-gray-600">2.3 GB / 5 GB</span>
                </div>
                <Progress value={46} className="w-full" />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Répartition par type :</h4>
                <div className="space-y-3">
                  {[
                    { type: "Documents PDF", size: "1.2 GB", color: "bg-blue-500" },
                    { type: "Textes juridiques", size: "890 MB", color: "bg-green-500" },
                    { type: "Cache de recherche", size: "156 MB", color: "bg-yellow-500" },
                    { type: "Données utilisateur", size: "54 MB", color: "bg-purple-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm">{item.type}</span>
                      </div>
                      <span className="text-sm text-gray-600">{item.size}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Nettoyer le cache
                </Button>
                <Button variant="outline">
                  <HardDrive className="w-4 h-4 mr-2" />
                  Optimiser l'espace
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900">Mode hors-ligne mobile</h4>
              <p className="text-sm text-blue-800">
                Le mode hors-ligne est également disponible sur l'application mobile pour un accès complet à vos documents en déplacement.
              </p>
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                En savoir plus
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
