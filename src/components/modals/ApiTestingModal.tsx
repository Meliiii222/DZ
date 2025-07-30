import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Play, 
  Copy, 
  Download, 
  Key, 
  Code, 
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  FileText,
  Database,
  Send
} from 'lucide-react';

interface ApiTestingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ApiRequest {
  method: string;
  endpoint: string;
  headers: Record<string, string>;
  body?: string;
  params?: Record<string, string>;
}

interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  responseTime: number;
}

export function ApiTestingModal({ isOpen, onClose }: ApiTestingModalProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('{\n  "Authorization": "Bearer YOUR_API_KEY",\n  "Content-Type": "application/json"\n}');
  const [requestBody, setRequestBody] = useState('');
  const [params, setParams] = useState('');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('sk-test-1234567890abcdef');

  const endpoints = [
    {
      category: "Authentification",
      methods: [
        { method: "POST", path: "/api/auth/login", description: "Connexion utilisateur" },
        { method: "POST", path: "/api/auth/refresh", description: "Renouveler le token" },
        { method: "GET", path: "/api/auth/profile", description: "Profil utilisateur" }
      ]
    },
    {
      category: "Textes juridiques", 
      methods: [
        { method: "GET", path: "/api/legal/texts", description: "Liste des textes" },
        { method: "GET", path: "/api/legal/texts/{id}", description: "Détails d'un texte" },
        { method: "POST", path: "/api/legal/texts", description: "Créer un texte" },
        { method: "PUT", path: "/api/legal/texts/{id}", description: "Modifier un texte" }
      ]
    },
    {
      category: "Recherche",
      methods: [
        { method: "GET", path: "/api/search", description: "Recherche simple" },
        { method: "POST", path: "/api/search/advanced", description: "Recherche avancée" },
        { method: "POST", path: "/api/search/semantic", description: "Recherche sémantique IA" }
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

  const generateApiKey = () => {
    const key = 'sk-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(key);
    
    // Mise à jour automatique du header Authorization
    const headersObj = JSON.parse(headers);
    headersObj.Authorization = `Bearer ${key}`;
    setHeaders(JSON.stringify(headersObj, null, 2));
  };

  const handleEndpointSelect = (endpoint: any) => {
    setMethod(endpoint.method);
    setUrl(`http://localhost:8080${endpoint.path}`);
    setSelectedEndpoint(endpoint.path);
    
    // Préremplir le body pour les requêtes POST/PUT
    if (endpoint.method === 'POST' || endpoint.method === 'PUT') {
      if (endpoint.path.includes('/auth/login')) {
        setRequestBody('{\n  "email": "user@example.com",\n  "password": "password123"\n}');
      } else if (endpoint.path.includes('/legal/texts')) {
        setRequestBody('{\n  "title": "Nouveau texte juridique",\n  "type": "loi",\n  "content": "Contenu du texte...",\n  "institution": "Ministère de la Justice"\n}');
      } else if (endpoint.path.includes('/search')) {
        setRequestBody('{\n  "query": "droit commercial",\n  "filters": {\n    "type": "loi",\n    "dateFrom": "2020-01-01"\n  }\n}');
      }
    } else {
      setRequestBody('');
    }
  };

  const executeRequest = async () => {
    setIsLoading(true);
    const startTime = Date.now();
    
    try {
      // Simulation d'une vraie requête API
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // Génération d'une réponse simulée réaliste
      let simulatedResponse: any;
      let status = 200;
      
      if (selectedEndpoint.includes('/auth/login')) {
        simulatedResponse = {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          user: {
            id: 1,
            email: "user@example.com",
            name: "Utilisateur Test",
            role: "admin"
          }
        };
      } else if (selectedEndpoint.includes('/legal/texts') && !selectedEndpoint.includes('{id}')) {
        simulatedResponse = {
          data: [
            {
              id: 1,
              title: "Loi sur le commerce électronique",
              type: "loi",
              date: "2024-01-15",
              institution: "Ministère du Commerce"
            },
            {
              id: 2, 
              title: "Décret d'application n° 24-01",
              type: "décret",
              date: "2024-01-20",
              institution: "Premier Ministère"
            }
          ],
          total: 2,
          page: 1,
          limit: 10
        };
      } else if (selectedEndpoint.includes('/search')) {
        simulatedResponse = {
          results: [
            {
              id: 1,
              title: "Code de commerce - Article 15",
              relevance: 0.95,
              excerpt: "Les règles relatives au commerce électronique...",
              type: "loi"
            },
            {
              id: 2,
              title: "Décret sur les transactions numériques", 
              relevance: 0.87,
              excerpt: "Les modalités de validation des transactions...",
              type: "décret"
            }
          ],
          total: 2,
          query: "droit commercial",
          searchTime: responseTime
        };
      } else {
        simulatedResponse = {
          message: "Requête exécutée avec succès",
          timestamp: new Date().toISOString(),
          endpoint: selectedEndpoint
        };
      }
      
      setResponse({
        status,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': Math.random().toString(36).substring(2, 15),
          'X-Rate-Limit-Remaining': '999'
        },
        data: simulatedResponse,
        responseTime
      });
      
    } catch (error) {
      const endTime = Date.now();
      setResponse({
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        data: { error: 'Une erreur est survenue lors de l\'exécution de la requête' },
        responseTime: endTime - startTime
      });
    }
    
    setIsLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const exportResponse = () => {
    if (response) {
      const exportData = {
        request: {
          method,
          url,
          headers: JSON.parse(headers),
          body: requestBody ? JSON.parse(requestBody) : undefined
        },
        response: {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          data: response.data,
          responseTime: response.responseTime
        },
        timestamp: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `api-test-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            Console de test API
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-6">
          {/* Panneau de sélection des endpoints */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Endpoints disponibles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {endpoints.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">{category.category}</h4>
                    <div className="space-y-1">
                      {category.methods.map((endpoint, endpointIndex) => (
                        <div 
                          key={endpointIndex}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer text-sm"
                          onClick={() => handleEndpointSelect(endpoint)}
                        >
                          <Badge className={getMethodColor(endpoint.method)}>
                            {endpoint.method}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <p className="font-mono text-xs truncate">{endpoint.path}</p>
                            <p className="text-xs text-gray-500">{endpoint.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Configuration API Key */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Clé API
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Votre clé API"
                  className="font-mono text-xs"
                />
                <Button size="sm" onClick={generateApiKey} className="w-full">
                  Générer une nouvelle clé
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Configuration de la requête */}
          <div className="col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Configuration de la requête</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="URL de l'endpoint"
                    className="flex-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Headers</label>
                  <Textarea
                    value={headers}
                    onChange={(e) => setHeaders(e.target.value)}
                    className="mt-1 font-mono text-xs"
                    rows={6}
                  />
                </div>

                {(method === 'POST' || method === 'PUT') && (
                  <div>
                    <label className="text-sm font-medium">Corps de la requête (JSON)</label>
                    <Textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      placeholder='{"key": "value"}'
                      className="mt-1 font-mono text-xs"
                      rows={8}
                    />
                  </div>
                )}

                <Button 
                  onClick={executeRequest} 
                  disabled={isLoading || !url}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Exécution en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Exécuter la requête
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Réponse */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Réponse</CardTitle>
              </CardHeader>
              <CardContent>
                {response ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {response.status >= 200 && response.status < 300 ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <Badge className={response.status >= 200 && response.status < 300 ? 
                          'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }>
                          {response.status} {response.statusText}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">
                        {response.responseTime}ms
                      </span>
                    </div>

                    <Tabs defaultValue="body" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="body">Corps</TabsTrigger>
                        <TabsTrigger value="headers">Headers</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="body" className="mt-3">
                        <div className="relative">
                          <Textarea
                            value={JSON.stringify(response.data, null, 2)}
                            readOnly
                            className="font-mono text-xs"
                            rows={12}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2))}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="headers" className="mt-3">
                        <div className="space-y-2">
                          {Object.entries(response.headers).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-xs">
                              <span className="font-medium">{key}:</span>
                              <span className="text-gray-600">{value}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                        className="flex-1"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copier
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={exportResponse}
                        className="flex-1"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Exporter
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    <Database className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    Aucune réponse encore.
                    <br />
                    Exécutez une requête pour voir les résultats.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}