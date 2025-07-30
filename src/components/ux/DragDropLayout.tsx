
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Layout, 
  Grid, 
  Move, 
  RotateCcw, 
  Save, 
  Eye, 
  Plus,
  Trash2,
  Settings,
  Maximize2
} from 'lucide-react';

export function DragDropLayout() {
  const [editMode, setEditMode] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

  const availableWidgets = [
    { id: 'search', name: 'Recherche rapide', category: 'navigation' },
    { id: 'recent-docs', name: 'Documents récents', category: 'content' },
    { id: 'alerts', name: 'Alertes juridiques', category: 'notification' },
    { id: 'favorites', name: 'Favoris', category: 'content' },
    { id: 'calendar', name: 'Calendrier échéances', category: 'planning' },
    { id: 'analytics', name: 'Tableau de bord', category: 'analytics' },
    { id: 'tasks', name: 'Tâches en cours', category: 'workflow' },
    { id: 'news', name: 'Actualités juridiques', category: 'content' }
  ];

  const layoutPresets = [
    { id: 'default', name: 'Disposition par défaut', icon: Layout },
    { id: 'compact', name: 'Vue compacte', icon: Grid },
    { id: 'focus', name: 'Mode focus', icon: Maximize2 },
    { id: 'dashboard', name: 'Tableau de bord', icon: Eye }
  ];

  const currentLayout = [
    { id: 'search', position: { x: 0, y: 0, w: 2, h: 1 } },
    { id: 'recent-docs', position: { x: 2, y: 0, w: 2, h: 2 } },
    { id: 'alerts', position: { x: 0, y: 1, w: 2, h: 1 } },
    { id: 'favorites', position: { x: 0, y: 2, w: 1, h: 2 } },
    { id: 'calendar', position: { x: 1, y: 2, w: 1, h: 2 } },
    { id: 'analytics', position: { x: 2, y: 2, w: 2, h: 1 } }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      navigation: 'bg-blue-100 text-blue-800',
      content: 'bg-green-100 text-green-800',
      notification: 'bg-orange-100 text-orange-800',
      planning: 'bg-purple-100 text-purple-800',
      analytics: 'bg-red-100 text-red-800',
      workflow: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5 text-blue-600" />
              Personnalisation Layout Drag & Drop
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={editMode ? "default" : "outline"}
                size="sm"
                onClick={() => setEditMode(!editMode)}
              >
                <Move className="w-4 h-4 mr-2" />
                {editMode ? 'Terminer' : 'Éditer'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {editMode && (
            <div className="p-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50">
              <h3 className="font-medium mb-3 text-blue-800">Mode édition activé</h3>
              <p className="text-sm text-blue-600 mb-4">
                Glissez-déposez les widgets pour réorganiser votre interface. 
                Utilisez les poignées pour redimensionner.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  <Save className="w-4 h-4 mr-1" />
                  Sauvegarder
                </Button>
                <Button size="sm" variant="outline">
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Réinitialiser
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-1" />
                  Prévisualiser
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-4">Widgets disponibles</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {availableWidgets.map((widget) => (
                  <div 
                    key={widget.id}
                    className={`p-3 border rounded-lg cursor-move transition-all ${
                      selectedWidget === widget.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedWidget(widget.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Move className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{widget.name}</span>
                      </div>
                      <Badge className={getCategoryColor(widget.category)}>
                        {widget.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Dispositions prédéfinies</h3>
              <div className="grid grid-cols-2 gap-3">
                {layoutPresets.map((preset) => (
                  <div 
                    key={preset.id}
                    className="p-3 border rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <preset.icon className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{preset.name}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 h-12">
                      {[...Array(16)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`rounded ${i % 3 === 0 ? 'bg-blue-200' : 'bg-gray-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Grid className="w-4 h-4" />
              Aperçu de votre disposition actuelle
            </h3>
            <div className="grid grid-cols-4 gap-4 h-64 border-2 border-dashed border-gray-300 rounded-lg p-4">
              {currentLayout.map((item) => {
                const widget = availableWidgets.find(w => w.id === item.id);
                return (
                  <div 
                    key={item.id}
                    className={`bg-white border rounded-lg p-2 shadow-sm cursor-move ${
                      editMode ? 'hover:shadow-md border-blue-300' : ''
                    }`}
                    style={{
                      gridColumn: `span ${item.position.w}`,
                      gridRow: `span ${item.position.h}`
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">{widget?.name}</span>
                      {editMode && (
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Settings className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className={`h-8 rounded ${getCategoryColor(widget?.category || 'content').replace('text-', 'bg-').replace('-800', '-200')}`} />
                  </div>
                );
              })}
              {editMode && (
                <div className="border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500">
                  <Plus className="w-6 h-6" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
