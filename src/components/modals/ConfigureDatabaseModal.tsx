
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Database, Settings } from 'lucide-react';

interface ConfigureDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dbData: Record<string, unknown>) => void;
}

export function ConfigureDatabaseModal({ isOpen, onClose, onSave }: ConfigureDatabaseModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'PostgreSQL',
    host: '',
    port: '',
    database: '',
    username: '',
    password: '',
    connectionString: '',
    maxConnections: '100',
    timeout: '30',
    ssl: 'false',
    description: '',
    status: 'Actif',
    environment: 'production'
  });

  const handleSave = () => {
    const dbData = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      size: '0 MB',
      records: '0'
    };
    onSave(dbData);
    onClose();
    // Reset form
    setFormData({
      name: '',
      type: 'PostgreSQL',
      host: '',
      port: '',
      database: '',
      username: '',
      password: '',
      connectionString: '',
      maxConnections: '100',
      timeout: '30',
      ssl: 'false',
      description: '',
      status: 'Actif',
      environment: 'production'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Configurer une Base de Données
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
          {/* Configuration générale */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configuration générale</h3>
            
            <div className="space-y-2">
              <Label htmlFor="dbName">Nom de la base *</Label>
              <Input
                id="dbName"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Base Textes Juridiques"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Type de base de données</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                  <SelectItem value="MongoDB">MongoDB</SelectItem>
                  <SelectItem value="MySQL">MySQL</SelectItem>
                  <SelectItem value="Elasticsearch">Elasticsearch</SelectItem>
                  <SelectItem value="Redis">Redis</SelectItem>
                  <SelectItem value="MinIO">MinIO</SelectItem>
                  <SelectItem value="InfluxDB">InfluxDB</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dbHost">Hôte</Label>
                <Input
                  id="dbHost"
                  value={formData.host}
                  onChange={(e) => setFormData({...formData, host: e.target.value})}
                  placeholder="localhost"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dbPort">Port</Label>
                <Input
                  id="dbPort"
                  value={formData.port}
                  onChange={(e) => setFormData({...formData, port: e.target.value})}
                  placeholder="5432"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dbDatabase">Nom de la base</Label>
              <Input
                id="dbDatabase"
                value={formData.database}
                onChange={(e) => setFormData({...formData, database: e.target.value})}
                placeholder="legal_db"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dbDescription">Description</Label>
              <Textarea
                id="dbDescription"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Description de la base de données..."
                rows={3}
              />
            </div>
          </div>

          {/* Configuration de connexion */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configuration de connexion</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dbUsername">Utilisateur</Label>
                <Input
                  id="dbUsername"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="admin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dbPassword">Mot de passe</Label>
                <Input
                  id="dbPassword"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="connectionString">Chaîne de connexion (optionnel)</Label>
              <Textarea
                id="connectionString"
                value={formData.connectionString}
                onChange={(e) => setFormData({...formData, connectionString: e.target.value})}
                placeholder="postgresql://user:password@host:port/database"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxConnections">Connexions max</Label>
                <Input
                  id="maxConnections"
                  type="number"
                  value={formData.maxConnections}
                  onChange={(e) => setFormData({...formData, maxConnections: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeout">Timeout (sec)</Label>
                <Input
                  id="timeout"
                  type="number"
                  value={formData.timeout}
                  onChange={(e) => setFormData({...formData, timeout: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>SSL/TLS</Label>
                <Select value={formData.ssl} onValueChange={(value) => setFormData({...formData, ssl: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Activé</SelectItem>
                    <SelectItem value="false">Désactivé</SelectItem>
                    <SelectItem value="require">Requis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Environnement</Label>
                <Select value={formData.environment} onValueChange={(value) => setFormData({...formData, environment: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Développement</SelectItem>
                    <SelectItem value="staging">Test</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Statut</Label>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">{formData.status}</Badge>
                <Badge variant="outline">{formData.type}</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            <Settings className="w-4 h-4 mr-2" />
            Configurer la Base
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
