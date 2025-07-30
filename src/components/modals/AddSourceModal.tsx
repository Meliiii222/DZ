
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Globe, Plus } from 'lucide-react';

interface AddSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sourceData: Record<string, unknown>) => void;
}

export function AddSourceModal({ isOpen, onClose, onSave }: AddSourceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    type: 'Externe',
    status: 'Actif',
    category: '',
    authentication: 'none',
    apiKey: '',
    refreshInterval: '24',
    priority: 'medium'
  });

  const handleSave = () => {
    const sourceData = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastSync: new Date().toISOString()
    };
    onSave(sourceData);
    onClose();
    // Reset form
    setFormData({
      name: '',
      url: '',
      description: '',
      type: 'Externe',
      status: 'Actif',
      category: '',
      authentication: 'none',
      apiKey: '',
      refreshInterval: '24',
      priority: 'medium'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Ajouter une Source Juridique
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
          {/* Informations générales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations générales</h3>
            
            <div className="space-y-2">
              <Label htmlFor="sourceName">Nom de la source *</Label>
              <Input
                id="sourceName"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Légifrance, EUR-Lex..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sourceUrl">URL *</Label>
              <Input
                id="sourceUrl"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                placeholder="www.exemple.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sourceDescription">Description</Label>
              <Textarea
                id="sourceDescription"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Description de la source juridique..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Externe">Externe</SelectItem>
                    <SelectItem value="Interne">Interne</SelectItem>
                    <SelectItem value="API">API</SelectItem>
                    <SelectItem value="Base de données">Base de données</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Statut</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Actif">Actif</SelectItem>
                    <SelectItem value="Inactif">Inactif</SelectItem>
                    <SelectItem value="En maintenance">En maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sourceCategory">Catégorie</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Droit civil">Droit civil</SelectItem>
                  <SelectItem value="Droit pénal">Droit pénal</SelectItem>
                  <SelectItem value="Droit administratif">Droit administratif</SelectItem>
                  <SelectItem value="Droit commercial">Droit commercial</SelectItem>
                  <SelectItem value="Droit international">Droit international</SelectItem>
                  <SelectItem value="Jurisprudence">Jurisprudence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Configuration technique */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configuration technique</h3>
            
            <div className="space-y-2">
              <Label>Authentification</Label>
              <Select value={formData.authentication} onValueChange={(value) => setFormData({...formData, authentication: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Aucune</SelectItem>
                  <SelectItem value="api_key">Clé API</SelectItem>
                  <SelectItem value="oauth">OAuth</SelectItem>
                  <SelectItem value="basic">Authentification basique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.authentication === 'api_key' && (
              <div className="space-y-2">
                <Label htmlFor="apiKey">Clé API</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                  placeholder="Votre clé API..."
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="refreshInterval">Intervalle de synchronisation (heures)</Label>
              <Input
                id="refreshInterval"
                type="number"
                value={formData.refreshInterval}
                onChange={(e) => setFormData({...formData, refreshInterval: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Priorité</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Haute</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="low">Basse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Aperçu des badges</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{formData.type}</Badge>
                <Badge className="bg-green-100 text-green-800">{formData.status}</Badge>
                {formData.category && <Badge variant="secondary">{formData.category}</Badge>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter la Source
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
