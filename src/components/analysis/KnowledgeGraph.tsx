// @ts-nocheck
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Network, 
  GitBranch, 
  Search, 
  Filter, 
  Download, 
  Share2,
  Eye,
  Settings,
  Plus,
  Trash2
} from 'lucide-react';
import { AddNodeDialog } from './AddNodeDialog';
import { View3DDialog } from './View3DDialog';
import { GraphSettingsDialog } from './GraphSettingsDialog';

export function KnowledgeGraph() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddNode, setShowAddNode] = useState(false);
  const [showView3D, setShowView3D] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [nodes, setNodes] = useState([

    {
      id: 'constitution',
      title: 'Constitution Algérienne',
      type: 'Constitution',
      connections: 15,
      lastUpdated: '2020-12-30',
      importance: 'high'
    },
    {
      id: 'code-civil',
      title: 'Code Civil',
      type: 'Code',
      connections: 89,
      lastUpdated: '2023-06-15',
      importance: 'high'
    },
    {
      id: 'code-penal',
      title: 'Code Pénal',
      type: 'Code',
      connections: 67,
      lastUpdated: '2023-03-22',
      importance: 'high'
    },
    {
      id: 'loi-finance',
      title: 'Loi de Finances 2024',
      type: 'Loi',
      connections: 34,
      lastUpdated: '2024-01-10',
      importance: 'medium'
    },
    {
      id: 'decret-exec',
      title: 'Décret Exécutif 23-112',
      type: 'Décret',
      connections: 12,
      lastUpdated: '2023-11-05',
      importance: 'medium'
    },
    {
      id: 'fonction-publique',
      title: 'Statut Général de la Fonction Publique',
      type: 'Fonction publique',
      connections: 28,
      lastUpdated: '2022-09-14',
      importance: 'high'
    }
  ]);

  const handleAddNode = (newNode: Record<string, unknown>) => {
    setNodes(prevNodes => [...prevNodes, newNode]);
  };

  const handleApplySettings = (settings: Record<string, unknown>) => {
    console.log('Nouveaux paramètres appliqués:', settings);
    // Ici on appliquerait les paramètres au graphe
  };

  const relations = [
    {
      id: 1,
      from: 'constitution',
      to: 'code-civil',
      type: 'fonde',
      strength: 0.9
    },
    {
      id: 2,
      from: 'constitution',
      to: 'code-penal',
      type: 'fonde',
      strength: 0.8
    },
    {
      id: 3,
      from: 'code-civil',
      to: 'loi-finance',
      type: 'influence',
      strength: 0.6
    },
    {
      id: 4,
      from: 'loi-finance',
      to: 'decret-exec',
      type: 'précise',
      strength: 0.7
    }
  ];

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'Constitution': return 'bg-red-100 border-red-300 text-red-800';
      case 'Code': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'Loi': return 'bg-green-100 border-green-300 text-green-800';
      case 'Décret': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'Fonction publique': return 'bg-purple-100 border-purple-300 text-purple-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'high': return <Badge className="bg-red-500">Critique</Badge>;
      case 'medium': return <Badge className="bg-orange-500">Important</Badge>;
      case 'low': return <Badge className="bg-gray-500">Standard</Badge>;
      default: return <Badge>Non défini</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-6 h-6 text-purple-600" />
            Graphe de Connaissance Juridique
          </CardTitle>
          <p className="text-gray-600">
            Visualisation et analyse des relations entre les publications légales algériennes
          </p>
        </CardHeader>
      </Card>

      {/* Contrôles */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher dans le graphe..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowAddNode(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter Nœud
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="visualization" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="visualization">Visualisation</TabsTrigger>
          <TabsTrigger value="nodes">Nœuds</TabsTrigger>
          <TabsTrigger value="relations">Relations</TabsTrigger>
          <TabsTrigger value="analysis">Analyse</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-6">
          {/* Zone de visualisation du graphe */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Graphe Interactif</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowView3D(true)}>
                    <Eye className="w-4 h-4 mr-1" />
                    Vue 3D
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                    <Settings className="w-4 h-4 mr-1" />
                    Paramètres
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative">
                {/* Simulation de visualisation de graphe */}
                <div className="text-center">
                  <Network className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Visualisation du Graphe de Connaissance</p>
                  <p className="text-sm text-gray-500">
                    Interface interactive D3.js avec {nodes.length} nœuds et {relations.length} relations
                  </p>
                </div>
                
                {/* Éléments simulés du graphe */}
                <div className="absolute top-4 left-4">
                  <div className="p-2 bg-red-100 rounded-lg border border-red-300 text-red-800 text-xs">
                    Constitution
                  </div>
                </div>
                <div className="absolute top-12 right-8">
                  <div className="p-2 bg-blue-100 rounded-lg border border-blue-300 text-blue-800 text-xs">
                    Code Civil
                  </div>
                </div>
                <div className="absolute bottom-8 left-12">
                  <div className="p-2 bg-green-100 rounded-lg border border-green-300 text-green-800 text-xs">
                    Loi Finance
                  </div>
                </div>
                
                {/* Lignes de connexion simulées */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="80" y1="40" x2="350" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="80" y1="40" x2="120" y2="320" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* Légende */}
          <Card>
            <CardHeader>
              <CardTitle>Légende</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                  <span className="text-sm">Constitution</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                  <span className="text-sm">Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                  <span className="text-sm">Loi</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                  <span className="text-sm">Décret</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
                  <span className="text-sm">Fonction publique</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nodes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nœuds du Graphe ({nodes.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nodes.map((node) => (
                  <div 
                    key={node.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedNode === node.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{node.title}</h4>
                          <Badge className={getNodeColor(node.type)}>
                            {node.type}
                          </Badge>
                          {getImportanceBadge(node.importance)}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-4">
                          <span>Connexions: {node.connections}</span>
                          <span>Mis à jour: {node.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Relations ({relations.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relations.map((relation) => {
                  const fromNode = nodes.find(n => n.id === relation.from);
                  const toNode = nodes.find(n => n.id === relation.to);
                  return (
                    <div key={relation.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <GitBranch className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="font-medium">
                              {fromNode?.title} → {toNode?.title}
                            </div>
                            <div className="text-sm text-gray-600">
                              Type: {relation.type} • Force: {Math.round(relation.strength * 100)}%
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Métriques du Graphe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Nombre de nœuds:</span>
                    <span className="font-medium">{nodes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nombre de relations:</span>
                    <span className="font-medium">{relations.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Densité du graphe:</span>
                    <span className="font-medium">0.67</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nœud le plus connecté:</span>
                    <span className="font-medium">Code Civil</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analyse de Centralité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nodes
                    .sort((a, b) => b.connections - a.connections)
                    .slice(0, 3)
                    .map((node, index) => (
                      <div key={node.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{index + 1}</Badge>
                          <span className="text-sm">{node.title}</span>
                        </div>
                        <span className="text-sm font-medium">{node.connections} connexions</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <AddNodeDialog 
        isOpen={showAddNode} 
        onClose={() => setShowAddNode(false)}
        onAddNode={handleAddNode}
      />
      
      <View3DDialog 
        isOpen={showView3D} 
        onClose={() => setShowView3D(false)}
      />
      
      <GraphSettingsDialog 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)}
        onApplySettings={handleApplySettings}
      />
    </div>
  );
}