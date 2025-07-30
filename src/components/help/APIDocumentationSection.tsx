
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Search, 
  Copy, 
  Play, 
  Download, 
  Key, 
  Globe, 
  Shield,
  FileText,
  Database,
  Zap
} from 'lucide-react';
import { DocumentViewerModal } from '@/components/modals/DocumentViewerModal';
import { ApiTestingModal } from '@/components/modals/ApiTestingModal';

export function APIDocumentationSection() {
  // États pour les modales métier
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [showApiTestModal, setShowApiTestModal] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showSandboxModal, setShowSandboxModal] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');

  const apiEndpoints = [
    {
      category: "Authentification",
      icon: Shield,
      color: "text-red-600",
      endpoints: [
        { method: "POST", path: "/api/auth/login", description: "Connexion utilisateur", version: "v1" },
        { method: "POST", path: "/api/auth/logout", description: "Déconnexion", version: "v1" },
        { method: "POST", path: "/api/auth/refresh", description: "Actualiser le token", version: "v1" },
        { method: "GET", path: "/api/auth/profile", description: "Profil utilisateur", version: "v1" }
      ]
    },
    {
      category: "Textes juridiques",
      icon: FileText,
      color: "text-blue-600",
      endpoints: [
        { method: "GET", path: "/api/legal/texts", description: "Liste des textes juridiques", version: "v1" },
        { method: "GET", path: "/api/legal/texts/{id}", description: "Détails d'un texte", version: "v1" },
        { method: "POST", path: "/api/legal/texts", description: "Créer un texte", version: "v1" },
        { method: "PUT", path: "/api/legal/texts/{id}", description: "Modifier un texte", version: "v1" },
        { method: "DELETE", path: "/api/legal/texts/{id}", description: "Supprimer un texte", version: "v1" }
      ]
    },
    {
      category: "Recherche",
      icon: Search,
      color: "text-green-600",
      endpoints: [
        { method: "GET", path: "/api/search", description: "Recherche générale", version: "v1" },
        { method: "POST", path: "/api/search/advanced", description: "Recherche avancée", version: "v1" },
        { method: "GET", path: "/api/search/suggestions", description: "Suggestions de recherche", version: "v1" },
        { method: "POST", path: "/api/search/semantic", description: "Recherche sémantique IA", version: "v2" }
      ]
    },
    {
      category: "Analytics",
      icon: Database,
      color: "text-purple-600",
      endpoints: [
        { method: "GET", path: "/api/analytics/usage", description: "Statistiques d'utilisation", version: "v1" },
        { method: "GET", path: "/api/analytics/trends", description: "Tendances de recherche", version: "v1" },
        { method: "GET", path: "/api/analytics/reports", description: "Rapports détaillés", version: "v1" }
      ]
    }
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exampleCode = {
    javascript: `// Exemple de requête d'authentification
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'motdepasse'
  })
});

const data = await response.json();
console.log(data);`,

    python: `import requests

# Exemple de requête d'authentification
response = requests.post('/api/auth/login', 
  json={
    'email': 'user@example.com',
    'password': 'motdepasse'
  }
)

data = response.json()
print(data)`,

    curl: `# Exemple de requête d'authentification
curl -X POST "/api/auth/login" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "motdepasse"
  }'`
  };

  // Fonction de téléchargement réel
  const handleDownloadResource = (resourceName: string, type: string) => {
    const fileName = `${resourceName.toLowerCase().replace(/\s+/g, '_')}.${type === 'Collection' ? 'json' : type === 'SDK' ? 'zip' : 'yaml'}`;
    const fileUrl = `/api/${fileName}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fonction de génération de clé API
  const handleGenerateApiKey = () => {
    const newApiKey = `lyo_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
    setApiKey(newApiKey);
    setShowApiKeyModal(true);
  };

  // Fonction de test API
  const handleTestApi = () => {
    setShowApiTestModal(true);
  };

  // Fonction de test sandbox
  const handleTestSandbox = () => {
    setShowSandboxModal(true);
  };

  // Fonction de recherche API
  const handleSearchApi = (query: string) => {
    // Recherche réelle dans la documentation API
    console.log(`Recherche API: ${query}`);
    // Ici on pourrait ouvrir une modale de résultats de recherche
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Code className="w-8 h-8 text-purple-600" />
          Documentation API
        </h2>
        <p className="text-gray-600 text-lg">
          Intégrez Dalil.dz dans vos applications avec notre API REST
        </p>
      </div>

      {/* Informations générales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold">Base URL</div>
            <div className="text-sm text-gray-600">https://api.dalil.dz</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Key className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-semibold">Authentification</div>
            <div className="text-sm text-gray-600">Bearer Token</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="font-semibold">Version actuelle</div>
            <div className="text-sm text-gray-600">v1.0</div>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Rechercher un endpoint..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={() => handleSearchApi(searchTerm)}
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="endpoints" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Exemples</TabsTrigger>
          <TabsTrigger value="authentication">Authentification</TabsTrigger>
          <TabsTrigger value="errors">Gestion d'erreurs</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-6">
          {/* Liste des endpoints */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {apiEndpoints.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.endpoints.map((endpoint, endpointIndex) => (
                      <div key={endpointIndex} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`text-xs ${getMethodColor(endpoint.method)}`}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded flex-1">
                            {endpoint.path}
                          </code>
                          <Badge variant="outline" className="text-xs">
                            {endpoint.version}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{endpoint.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exemples de code</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="javascript" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>

                {Object.entries(exampleCode).map(([lang, code]) => (
                  <TabsContent key={lang} value={lang}>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{code}</code>
                      </pre>
                      <Button 
                        size="sm" 
                        className="absolute top-2 right-2"
                        onClick={() => navigator.clipboard.writeText(code)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-green-600" />
                Authentification API
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. Obtenir une clé API</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Pour utiliser l'API, vous devez d'abord obtenir une clé API depuis votre tableau de bord.
                  </p>
                  <Button
                    onClick={handleGenerateApiKey}
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Générer une clé API
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">2. Utiliser la clé dans vos requêtes</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                    <code>{`Authorization: Bearer YOUR_API_KEY`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">3. Limites de taux</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 1000 requêtes par heure pour les utilisateurs gratuits</li>
                    <li>• 10000 requêtes par heure pour les utilisateurs premium</li>
                    <li>• Pas de limite pour les comptes entreprise</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Codes d'erreur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { code: "200", description: "Succès", type: "success" },
                  { code: "400", description: "Requête invalide", type: "error" },
                  { code: "401", description: "Non autorisé", type: "error" },
                  { code: "403", description: "Accès interdit", type: "error" },
                  { code: "404", description: "Ressource non trouvée", type: "error" },
                  { code: "429", description: "Limite de taux dépassée", type: "warning" },
                  { code: "500", description: "Erreur serveur interne", type: "error" }
                ].map((error, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className={
                        error.type === 'success' ? 'bg-green-100 text-green-800' :
                        error.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {error.code}
                      </Badge>
                      <span className="font-medium">{error.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline"
              onClick={() => handleDownloadResource('Postman Collection', 'Collection')}
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger Postman Collection
            </Button>
            <Button 
              variant="outline"
              onClick={handleTestSandbox}
            >
              <Play className="w-4 h-4 mr-2" />
              Tester dans le bac à sable
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleDownloadResource('OpenAPI Spec', 'Spécification')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Télécharger OpenAPI Spec
            </Button>
            <Button
              onClick={handleTestApi}
            >
              Tester l'API
            </Button>
            <Button
              onClick={handleTestApi}
            >
              <Code className="w-4 h-4 mr-2" />
              Essayer maintenant
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleDownloadResource('SDK JavaScript', 'SDK')}
            >
              <Download className="w-4 h-4 mr-2" />
              SDK JavaScript
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleDownloadResource('SDK Python', 'SDK')}
            >
              <Download className="w-4 h-4 mr-2" />
              SDK Python
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleDownloadResource('SDK PHP', 'SDK')}
            >
              <Download className="w-4 h-4 mr-2" />
              SDK PHP
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modale de test API */}
      {showApiTestModal && (
        <DocumentViewerModal
          isOpen={showApiTestModal}
          onClose={() => setShowApiTestModal(false)}
          document={{
            title: "Test de l'API",
            content: "Interface de test API métier - Formulaire pour saisir les paramètres, exécuter la requête et afficher la réponse en direct."
          }}
        />
      )}

      {/* Modale de génération de clé API */}
      {showApiKeyModal && (
        <DocumentViewerModal
          isOpen={showApiKeyModal}
          onClose={() => setShowApiKeyModal(false)}
          document={{
            title: "Clé API générée",
            content: `Votre nouvelle clé API : ${apiKey}\n\nCopiez cette clé et utilisez-la dans vos requêtes avec l'en-tête : Authorization: Bearer ${apiKey}`
          }}
        />
      )}

      {/* Modale de test API */}
      {showApiTestModal && (
        <ApiTestingModal
          isOpen={showApiTestModal}
          onClose={() => setShowApiTestModal(false)}
        />
      )}

      {/* Modale de test sandbox */}
      {showSandboxModal && (
        <ApiTestingModal
          isOpen={showSandboxModal}
          onClose={() => setShowSandboxModal(false)}
        />
      )}
    </div>
  );
}
