
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { X, BarChart3, Plus, Trash2 } from 'lucide-react';

interface NewDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewDashboardModal({ isOpen, onClose }: NewDashboardModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    layout: 'grid',
    isPublic: false,
    widgets: [],
    refreshInterval: '5',
    filters: {
      dateRange: true,
      categories: true,
      status: true
    }
  });

  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);

  const availableWidgets = [
    { id: 'legal-texts-stats', name: 'Statistiques Textes Juridiques', category: 'Statistiques' },
    { id: 'procedures-overview', name: 'Aperçu Procédures', category: 'Procédures' },
    { id: 'alerts-summary', name: 'Résumé Alertes', category: 'Alertes' },
    { id: 'activity-chart', name: 'Graphique d\'Activité', category: 'Activité' },
    { id: 'compliance-metrics', name: 'Métriques de Conformité', category: 'Conformité' },
    { id: 'document-usage', name: 'Usage Documents', category: 'Documents' },
    { id: 'search-trends', name: 'Tendances Recherche', category: 'Recherche' },
    { id: 'user-activity', name: 'Activité Utilisateurs', category: 'Utilisateurs' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Création nouveau tableau de bord:', {
      ...formData,
      widgets: selectedWidgets
    });
    onClose();
  };

  const handleWidgetToggle = (widgetId: string) => {
    setSelectedWidgets(prev => 
      prev.includes(widgetId) 
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <DialogTitle className="text-lg font-semibold">Nouveau Tableau de Bord</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du tableau de bord *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                placeholder="Ex: Tableau de bord exécutif"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="executive">Direction</SelectItem>
                  <SelectItem value="operational">Opérationnel</SelectItem>
                  <SelectItem value="compliance">Conformité</SelectItem>
                  <SelectItem value="analytics">Analytique</SelectItem>
                  <SelectItem value="personal">Personnel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
              placeholder="Description du tableau de bord..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="layout">Disposition</Label>
              <Select value={formData.layout} onValueChange={(value) => setFormData(prev => ({...prev, layout: value}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grille</SelectItem>
                  <SelectItem value="masonry">Mosaïque</SelectItem>
                  <SelectItem value="list">Liste</SelectItem>
                  <SelectItem value="tabs">Onglets</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="refreshInterval">Intervalle de rafraîchissement (minutes)</Label>
              <Select value={formData.refreshInterval} onValueChange={(value) => setFormData(prev => ({...prev, refreshInterval: value}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 minute</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 heure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Widgets disponibles</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto border rounded-lg p-4">
              {availableWidgets.map((widget) => (
                <div key={widget.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={widget.id}
                    checked={selectedWidgets.includes(widget.id)}
                    onCheckedChange={() => handleWidgetToggle(widget.id)}
                  />
                  <Label htmlFor={widget.id} className="text-sm">
                    <div>
                      <div className="font-medium">{widget.name}</div>
                      <div className="text-xs text-gray-500">{widget.category}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Filtres disponibles</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="dateRange"
                  checked={formData.filters.dateRange}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    filters: {...prev.filters, dateRange: checked}
                  }))}
                />
                <Label htmlFor="dateRange">Plage de dates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="categories"
                  checked={formData.filters.categories}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    filters: {...prev.filters, categories: checked}
                  }))}
                />
                <Label htmlFor="categories">Catégories</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.filters.status}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    filters: {...prev.filters, status: checked}
                  }))}
                />
                <Label htmlFor="status">Statut</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isPublic"
              checked={formData.isPublic}
              onCheckedChange={(checked) => setFormData(prev => ({...prev, isPublic: checked}))}
            />
            <Label htmlFor="isPublic">Tableau de bord public</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Créer le Tableau de Bord
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
