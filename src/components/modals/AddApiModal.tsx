import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X, Key, Settings } from 'lucide-react';

interface AddApiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiData: Record<string, unknown>) => void;
}

export function AddApiModal({ isOpen, onClose, onSave }: AddApiModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    endpoint: '',
    method: 'GET',
    category: '',
    description: '',
    authType: 'none',
    apiKey: '',
    headers: [{ key: '', value: '' }],
    status: 'Actif'
  });

  const [testResult, setTestResult] = useState<string>('');
  const [testing, setTesting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...formData.headers];
    newHeaders[index][field] = value;
    setFormData(prev => ({
      ...prev,
      headers: newHeaders
    }));
  };

  const addHeader = () => {
    setFormData(prev => ({
      ...prev,
      headers: [...prev.headers, { key: '', value: '' }]
    }));
  };

  const removeHeader = (index: number) => {
    setFormData(prev => ({
      ...prev,
      headers: prev.headers.filter((_, i) => i !== index)
    }));
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult('');
    
    try {
      // Simulation du test de connexion
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTestResult('✅ Connexion réussie - API répond correctement');
    } catch (error) {
      setTestResult('❌ Échec de la connexion - Vérifiez l\'endpoint et les paramètres');
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    const apiData = {
      ...formData,
      lastSync: new Date().toISOString().replace('T', ' ').substring(0, 16),
      headers: formData.headers.filter(h => h.key && h.value)
    };
    onSave(apiData);
    onClose();
    setFormData({
      name: '',
      endpoint: '',
      method: 'GET',
      category: '',
      description: '',
      authType: 'none',
      apiKey: '',
      headers: [{ key: '', value: '' }],
      status: 'Actif'
    });
    setTestResult('');
  };

  const categories = [
    'Actualités Récentes',
    'Ouvrages',
    'Revues',
    'Journaux',
    'Articles',
    'Vidéos',
    'Dictionnaires',
    'Annuaires'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Ajouter une nouvelle API
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
          {/* Configuration de base */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Configuration de base</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'API</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="ex: API Légifrance"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endpoint">Endpoint URL</Label>
              <Input
                id="endpoint"
                value={formData.endpoint}
                onChange={(e) => handleInputChange('endpoint', e.target.value)}
                placeholder="https://api.example.com/v1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="method">Méthode HTTP</Label>
                <Select value={formData.method} onValueChange={(value) => handleInputChange('method', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Description de l'API et de son utilisation..."
                rows={3}
              />
            </div>
          </div>

          {/* Authentification et Headers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Authentification & Headers</h3>
            
            <div className="space-y-2">
              <Label htmlFor="authType">Type d'authentification</Label>
              <Select value={formData.authType} onValueChange={(value) => handleInputChange('authType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Aucune</SelectItem>
                  <SelectItem value="apikey">API Key</SelectItem>
                  <SelectItem value="bearer">Bearer Token</SelectItem>
                  <SelectItem value="basic">Basic Auth</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.authType !== 'none' && (
              <div className="space-y-2">
                <Label htmlFor="apiKey">
                  <Key className="w-4 h-4 inline mr-1" />
                  Clé d'authentification
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => handleInputChange('apiKey', e.target.value)}
                  placeholder="Entrez votre clé API..."
                />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Headers personnalisés</Label>
                <Button size="sm" variant="outline" onClick={addHeader}>
                  <Plus className="w-4 h-4 mr-1" />
                  Ajouter
                </Button>
              </div>
              
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {formData.headers.map((header, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Clé"
                      value={header.key}
                      onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Valeur"
                      value={header.value}
                      onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeHeader(index)}
                      disabled={formData.headers.length === 1}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Test de connexion */}
        <Card className="mb-4">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Test de connexion</h4>
              <Button
                onClick={handleTestConnection}
                disabled={testing || !formData.endpoint}
                variant="outline"
              >
                {testing ? 'Test en cours...' : 'Tester la connexion'}
              </Button>
            </div>
            {testResult && (
              <div className="text-sm p-2 bg-gray-50 rounded">
                {testResult}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={!formData.name || !formData.endpoint || !formData.category}>
            Ajouter l'API
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}