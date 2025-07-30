import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Move3D, 
  Eye, 
  Layers,
  Box,
  Orbit,
  Navigation
} from 'lucide-react';

interface View3DDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function View3DDialog({ isOpen, onClose }: View3DDialogProps) {
  const [viewMode, setViewMode] = useState('sphere');
  const [showLabels, setShowLabels] = useState(true);
  const [zoom, setZoom] = useState(50);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Box className="w-5 h-5 text-blue-600" />
            Visualisation 3D du Graphe de Connaissance
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-4 gap-6 h-[70vh]">
          {/* Panneau de contrôle */}
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-3">Mode de Vue</h3>
                <div className="space-y-2">
                  <Button 
                    variant={viewMode === 'sphere' ? 'default' : 'outline'}
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => setViewMode('sphere')}
                  >
                    <Orbit className="w-4 h-4 mr-2" />
                    Sphère 3D
                  </Button>
                  <Button 
                    variant={viewMode === 'cube' ? 'default' : 'outline'}
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => setViewMode('cube')}
                  >
                    <Box className="w-4 h-4 mr-2" />
                    Cube
                  </Button>
                  <Button 
                    variant={viewMode === 'force' ? 'default' : 'outline'}
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => setViewMode('force')}
                  >
                    <Move3D className="w-4 h-4 mr-2" />
                    Force Layout
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-3">Contrôles</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <ZoomIn className="w-4 h-4 mr-2" />
                    Zoom +
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <ZoomOut className="w-4 h-4 mr-2" />
                    Zoom -
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Réinitialiser
                  </Button>
                  <Button 
                    variant={showLabels ? 'default' : 'outline'} 
                    size="sm" 
                    className="w-full"
                    onClick={() => setShowLabels(!showLabels)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showLabels ? 'Masquer' : 'Afficher'} Labels
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-3">Légende</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs">Constitution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs">Code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Loi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs">Décret</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-xs">Fonction publique</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Zone de visualisation 3D */}
          <div className="col-span-3">
            <Card className="h-full">
              <CardContent className="pt-4 h-full">
                <Tabs defaultValue="3d" className="h-full">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="3d">Vue 3D</TabsTrigger>
                    <TabsTrigger value="analysis">Analyse</TabsTrigger>
                    <TabsTrigger value="navigation">Navigation</TabsTrigger>
                  </TabsList>

                  <TabsContent value="3d" className="h-full">
                    <div className="h-full bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
                      {/* Simulation de l'environnement 3D */}
                      <div className="text-center text-white">
                        <div className="mb-4">
                          <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full animate-pulse flex items-center justify-center">
                            <Box className="w-8 h-8" />
                          </div>
                          <p className="text-lg mb-2">Environnement 3D Interactif</p>
                          <p className="text-sm text-gray-300">
                            Mode: <Badge className="ml-1">{viewMode}</Badge>
                          </p>
                        </div>
                        
                        <div className="text-xs text-gray-400 space-y-1">
                          <p>• Clic gauche + glisser: Rotation</p>
                          <p>• Molette: Zoom</p>
                          <p>• Clic droit + glisser: Panoramique</p>
                          <p>• Double-clic: Focus sur nœud</p>
                        </div>
                      </div>

                      {/* Éléments 3D simulés */}
                      <div className="absolute top-4 left-4">
                        <div className="w-8 h-8 bg-red-500 rounded-full animate-bounce opacity-80"></div>
                        {showLabels && <span className="text-xs text-white block mt-1">Constitution</span>}
                      </div>
                      
                      <div className="absolute top-12 right-8">
                        <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse opacity-80"></div>
                        {showLabels && <span className="text-xs text-white block mt-1">Code Civil</span>}
                      </div>
                      
                      <div className="absolute bottom-8 left-12">
                        <div className="w-5 h-5 bg-green-500 rounded-full animate-pulse opacity-80"></div>
                        {showLabels && <span className="text-xs text-white block mt-1">Loi</span>}
                      </div>
                      
                      <div className="absolute bottom-12 right-16">
                        <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce opacity-80"></div>
                        {showLabels && <span className="text-xs text-white block mt-1">Fonction publique</span>}
                      </div>

                      {/* Lignes de connexion 3D simulées */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <line x1="80" y1="40" x2="350" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        <line x1="80" y1="40" x2="120" y2="320" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        <line x1="350" y1="80" x2="380" y2="280" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                      </svg>
                    </div>
                  </TabsContent>

                  <TabsContent value="analysis" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="pt-4">
                          <h4 className="font-semibold mb-2">Clusters détectés</h4>
                          <div className="space-y-2">
                            <Badge variant="outline">Droit Civil (15 nœuds)</Badge>
                            <Badge variant="outline">Droit Pénal (12 nœuds)</Badge>
                            <Badge variant="outline">Fonction publique (8 nœuds)</Badge>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-4">
                          <h4 className="font-semibold mb-2">Nœuds centraux</h4>
                          <div className="space-y-2 text-sm">
                            <div>1. Constitution (centralité: 0.95)</div>
                            <div>2. Code Civil (centralité: 0.87)</div>
                            <div>3. Code Pénal (centralité: 0.73)</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="navigation" className="space-y-4">
                    <Card>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">Parcours recommandés</h4>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">Parcours Droit Civil</div>
                            <div className="text-xs text-gray-600 mt-1">
                              Constitution → Code Civil → Loi 84-11 → Fonction publique
                            </div>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <div className="font-medium text-sm">Parcours Administratif</div>
                            <div className="text-xs text-gray-600 mt-1">
                              Constitution → Ordonnance 06-03 → Fonction publique → Décrets d'application
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button>
            <Navigation className="w-4 h-4 mr-2" />
            Mode Plein Écran
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}