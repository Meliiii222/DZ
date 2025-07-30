
// @ts-nocheck
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination } from "@/components/common/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { useState } from "react";
import { 
  BookOpen, 
  ExternalLink, 
  Database, 
  Globe, 
  Search,
  Plus,
  Edit,
  Trash2,
  Settings
} from "lucide-react";

// Import des nouvelles modales
import { AddSourceModal } from "@/components/modals/AddSourceModal";
import { ConfigureDatabaseModal } from "@/components/modals/ConfigureDatabaseModal";
import { NewTemplateModal } from "@/components/modals/NewTemplateModal";
import { CreateWorkflowModal } from "@/components/modals/CreateWorkflowModal";
import { AddApiModal } from "@/components/modals/AddApiModal";

interface ComplementaryResourcesSectionProps {
  language?: string;
}

export function ComplementaryResourcesSection({ language = "fr" }: ComplementaryResourcesSectionProps) {
  const [sourcesFilter, setSourcesFilter] = useState("");
  const [databasesFilter, setDatabasesFilter] = useState("");
  const [templatesFilter, setTemplatesFilter] = useState("");
  const [modelsFilter, setModelsFilter] = useState("");
  const [apiFilter, setApiFilter] = useState("");

  // États pour les modales
  const [addSourceModalOpen, setAddSourceModalOpen] = useState(false);
  const [configureDatabaseModalOpen, setConfigureDatabaseModalOpen] = useState(false);
  const [newTemplateModalOpen, setNewTemplateModalOpen] = useState(false);
  const [createWorkflowModalOpen, setCreateWorkflowModalOpen] = useState(false);
  const [addApiModalOpen, setAddApiModalOpen] = useState(false);

  // États pour les listes (initialisés avec les données existantes)
  const [juridicalSources, setJuridicalSources] = useState([
    { name: "Légifrance", url: "www.legifrance.gouv.fr", description: "Droit français", status: "Actif", type: "Externe" },
    { name: "EUR-Lex", url: "eur-lex.europa.eu", description: "Droit européen", status: "Actif", type: "Externe" },
    { name: "UN Treaty Collection", url: "treaties.un.org", description: "Traités internationaux", status: "Actif", type: "Externe" },
    { name: "World Bank Law", url: "projects.worldbank.org", description: "Droit du développement", status: "Actif", type: "Externe" },
    { name: "OHCHR", url: "www.ohchr.org", description: "Droits de l'homme", status: "Actif", type: "Externe" },
    { name: "ICC-CPI", url: "www.icc-cpi.int", description: "Cour pénale internationale", status: "Actif", type: "Externe" },
    { name: "HUDOC", url: "hudoc.echr.coe.int", description: "Jurisprudence CEDH", status: "Actif", type: "Externe" },
    { name: "ICJ", url: "www.icj-cij.org", description: "Cour internationale de justice", status: "Actif", type: "Externe" },
    { name: "WTO Legal Texts", url: "www.wto.org", description: "Droit commercial international", status: "Actif", type: "Externe" },
    { name: "FAOLEX", url: "www.fao.org/faolex", description: "Droit alimentaire", status: "Actif", type: "Externe" },
    { name: "ILO", url: "www.ilo.org", description: "Droit du travail", status: "Actif", type: "Externe" },
    { name: "UNESCO", url: "portal.unesco.org", description: "Droit culturel", status: "Actif", type: "Externe" }
  ]);

  const [databases, setDatabases] = useState([
    { name: "Base Textes Juridiques", type: "PostgreSQL", size: "2.5 GB", records: "125,000", status: "Actif" },
    { name: "Base Procédures", type: "MongoDB", size: "1.8 GB", records: "89,000", status: "Actif" },
    { name: "Base Jurisprudence", type: "Elasticsearch", size: "5.2 GB", records: "234,000", status: "Actif" },
    { name: "Base Documents", type: "MinIO", size: "45.7 GB", records: "567,000", status: "Actif" },
    { name: "Base Utilisateurs", type: "PostgreSQL", size: "156 MB", records: "12,500", status: "Actif" },
    { name: "Base Audit", type: "InfluxDB", size: "892 MB", records: "2,340,000", status: "Actif" }
  ]);

  const [documentTemplates, setDocumentTemplates] = useState([
    { name: "Modèle de Loi", category: "Législatif", usage: 245, lastUpdate: "2024-12-15", status: "Actif" },
    { name: "Modèle de Décret", category: "Réglementaire", usage: 189, lastUpdate: "2024-12-10", status: "Actif" },
    { name: "Modèle d'Arrêté", category: "Administratif", usage: 567, lastUpdate: "2024-12-08", status: "Actif" },
    { name: "Modèle de Circulaire", category: "Instruction", usage: 123, lastUpdate: "2024-12-05", status: "Actif" },
    { name: "Modèle de Contrat", category: "Civil", usage: 789, lastUpdate: "2024-12-03", status: "Actif" },
    { name: "Modèle de Procédure", category: "Administrative", usage: 345, lastUpdate: "2024-12-01", status: "Actif" }
  ]);

  const [workflowModels, setWorkflowModels] = useState([
    { name: "Validation Texte Juridique", steps: 8, duration: "15 jours", usage: 234, status: "Actif" },
    { name: "Processus de Publication", steps: 5, duration: "7 jours", usage: 567, status: "Actif" },
    { name: "Révision Procédure", steps: 12, duration: "30 jours", usage: 123, status: "Actif" },
    { name: "Approbation Réglementaire", steps: 10, duration: "21 jours", usage: 345, status: "Actif" },
    { name: "Contrôle Qualité", steps: 6, duration: "10 jours", usage: 789, status: "Actif" },
    { name: "Archivage Document", steps: 4, duration: "3 jours", usage: 456, status: "Actif" }
  ]);

  const [apiConnections, setApiConnections] = useState([
    { name: "API Légifrance", endpoint: "https://api.legifrance.gouv.fr/v1", method: "GET", category: "Actualités", status: "Actif", lastSync: "2024-12-15 10:30" },
    { name: "API EUR-Lex", endpoint: "https://eur-lex.europa.eu/search", method: "POST", category: "Ouvrages", status: "Actif", lastSync: "2024-12-15 09:15" },
    { name: "API OHCHR", endpoint: "https://www.ohchr.org/api/documents", method: "GET", category: "Articles", status: "Actif", lastSync: "2024-12-15 08:45" },
    { name: "API World Bank Law", endpoint: "https://projects.worldbank.org/api", method: "GET", category: "Revues", status: "Inactif", lastSync: "2024-12-14 16:20" },
    { name: "API UN Treaties", endpoint: "https://treaties.un.org/api", method: "GET", category: "Journaux", status: "Actif", lastSync: "2024-12-15 11:10" },
    { name: "API Droit International", endpoint: "https://droit-intl.org/api/v2", method: "POST", category: "Vidéos", status: "Actif", lastSync: "2024-12-15 07:30" }
  ]);

  // Handlers pour sauvegarder les nouvelles entrées
  const handleSaveSource = (sourceData: Record<string, unknown>) => {
    setJuridicalSources([...juridicalSources, sourceData]);
    console.log('Nouvelle source ajoutée:', sourceData);
  };

  const handleSaveDatabase = (dbData: Record<string, unknown>) => {
    setDatabases([...databases, dbData]);
    console.log('Nouvelle base de données configurée:', dbData);
  };

  const handleSaveTemplate = (templateData: Record<string, unknown>) => {
    setDocumentTemplates([...documentTemplates, templateData]);
    console.log('Nouveau modèle créé:', templateData);
  };

  const handleSaveWorkflow = (workflowData: Record<string, unknown>) => {
    setWorkflowModels([...workflowModels, workflowData]);
    console.log('Nouveau workflow créé:', workflowData);
  };

  const handleSaveApi = (apiData: Record<string, unknown>) => {
    setApiConnections([...apiConnections, apiData]);
    console.log('Nouvelle API ajoutée:', apiData);
  };

  // Filtrage des données
  const filteredSources = juridicalSources.filter(source => 
    source.name.toLowerCase().includes(sourcesFilter.toLowerCase()) ||
    source.description.toLowerCase().includes(sourcesFilter.toLowerCase())
  );

  const filteredDatabases = databases.filter(db => 
    db.name.toLowerCase().includes(databasesFilter.toLowerCase()) ||
    db.type.toLowerCase().includes(databasesFilter.toLowerCase())
  );

  const filteredTemplates = documentTemplates.filter(template => 
    template.name.toLowerCase().includes(templatesFilter.toLowerCase()) ||
    template.category.toLowerCase().includes(templatesFilter.toLowerCase())
  );

  const filteredWorkflows = workflowModels.filter(model => 
    model.name.toLowerCase().includes(modelsFilter.toLowerCase())
  );

  const filteredApis = apiConnections.filter(api => 
    api.name.toLowerCase().includes(apiFilter.toLowerCase()) ||
    api.category.toLowerCase().includes(apiFilter.toLowerCase())
  );

  // Pagination pour les sources juridiques
  const {
    currentData: paginatedSources,
    currentPage: sourcesCurrentPage,
    totalPages: sourcesTotalPages,
    itemsPerPage: sourcesItemsPerPage,
    totalItems: sourcesTotalItems,
    setCurrentPage: setSourcesCurrentPage,
    setItemsPerPage: setSourcesItemsPerPage
  } = usePagination({
    data: filteredSources,
    itemsPerPage: 10
  });

  // Pagination pour les bases de données
  const {
    currentData: paginatedDatabases,
    currentPage: databasesCurrentPage,
    totalPages: databasesTotalPages,
    itemsPerPage: databasesItemsPerPage,
    totalItems: databasesTotalItems,
    setCurrentPage: setDatabasesCurrentPage,
    setItemsPerPage: setDatabasesItemsPerPage
  } = usePagination({
    data: filteredDatabases,
    itemsPerPage: 10
  });

  // Pagination pour les modèles de documents
  const {
    currentData: paginatedTemplates,
    currentPage: templatesCurrentPage,
    totalPages: templatesTotalPages,
    itemsPerPage: templatesItemsPerPage,
    totalItems: templatesTotalItems,
    setCurrentPage: setTemplatesCurrentPage,
    setItemsPerPage: setTemplatesItemsPerPage
  } = usePagination({
    data: filteredTemplates,
    itemsPerPage: 10
  });

  // Pagination pour les modèles de workflow
  const {
    currentData: paginatedWorkflows,
    currentPage: workflowsCurrentPage,
    totalPages: workflowsTotalPages,
    itemsPerPage: workflowsItemsPerPage,
    totalItems: workflowsTotalItems,
    setCurrentPage: setWorkflowsCurrentPage,
    setItemsPerPage: setWorkflowsItemsPerPage
  } = usePagination({
    data: filteredWorkflows,
    itemsPerPage: 10
  });

  // Pagination pour les APIs
  const {
    currentData: paginatedApis,
    currentPage: apisCurrentPage,
    totalPages: apisTotalPages,
    itemsPerPage: apisItemsPerPage,
    totalItems: apisTotalItems,
    setCurrentPage: setApisCurrentPage,
    setItemsPerPage: setApisItemsPerPage
  } = usePagination({
    data: filteredApis,
    itemsPerPage: 10
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sources" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="sources">Sources Juridiques</TabsTrigger>
          <TabsTrigger value="databases">Bases de Données</TabsTrigger>
          <TabsTrigger value="templates">Modèles Documents</TabsTrigger>
          <TabsTrigger value="workflows">Modèles Workflow</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une source..."
                className="pl-10"
                value={sourcesFilter}
                onChange={(e) => setSourcesFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4" onClick={() => setAddSourceModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une Source
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedSources.map((source, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{source.name}</h4>
                        <Badge variant="outline">{source.type}</Badge>
                        <Badge className="bg-green-100 text-green-800">{source.status}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{source.description}</p>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-blue-600">{source.url}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination pour les sources juridiques */}
          <Pagination
            currentPage={sourcesCurrentPage}
            totalPages={sourcesTotalPages}
            totalItems={sourcesTotalItems}
            itemsPerPage={sourcesItemsPerPage}
            onPageChange={setSourcesCurrentPage}
            onItemsPerPageChange={setSourcesItemsPerPage}
          />
        </TabsContent>

        <TabsContent value="databases" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une base de données..."
                className="pl-10"
                value={databasesFilter}
                onChange={(e) => setDatabasesFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4" onClick={() => setConfigureDatabaseModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Configurer Base
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedDatabases.map((db, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">{db.name}</h4>
                        <Badge className="bg-green-100 text-green-800">{db.status}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Type:</span> {db.type}</p>
                        <p><span className="font-medium">Taille:</span> {db.size}</p>
                        <p><span className="font-medium">Enregistrements:</span> {db.records}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Database className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination pour les bases de données */}
          <Pagination
            currentPage={databasesCurrentPage}
            totalPages={databasesTotalPages}
            totalItems={databasesTotalItems}
            itemsPerPage={databasesItemsPerPage}
            onPageChange={setDatabasesCurrentPage}
            onItemsPerPageChange={setDatabasesItemsPerPage}
          />
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un modèle..."
                className="pl-10"
                value={templatesFilter}
                onChange={(e) => setTemplatesFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4" onClick={() => setNewTemplateModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Modèle
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedTemplates.map((template, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                        <Badge variant="outline">{template.category}</Badge>
                        <Badge className="bg-green-100 text-green-800">{template.status}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Utilisations:</span> {template.usage}</p>
                        <p><span className="font-medium">Dernière MAJ:</span> {template.lastUpdate}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination pour les modèles de documents */}
          <Pagination
            currentPage={templatesCurrentPage}
            totalPages={templatesTotalPages}
            totalItems={templatesTotalItems}
            itemsPerPage={templatesItemsPerPage}
            onPageChange={setTemplatesCurrentPage}
            onItemsPerPageChange={setTemplatesItemsPerPage}
          />
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un workflow..."
                className="pl-10"
                value={modelsFilter}
                onChange={(e) => setModelsFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4" onClick={() => setCreateWorkflowModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Créer Workflow
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedWorkflows.map((model, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{model.name}</h4>
                        <Badge className="bg-green-100 text-green-800">{model.status}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Étapes:</span> {model.steps}</p>
                        <p><span className="font-medium">Durée:</span> {model.duration}</p>
                        <p><span className="font-medium">Utilisations:</span> {model.usage}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination pour les modèles de workflow */}
          <Pagination
            currentPage={workflowsCurrentPage}
            totalPages={workflowsTotalPages}
            totalItems={workflowsTotalItems}
            itemsPerPage={workflowsItemsPerPage}
            onPageChange={setWorkflowsCurrentPage}
            onItemsPerPageChange={setWorkflowsItemsPerPage}
          />
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une API..."
                className="pl-10"
                value={apiFilter}
                onChange={(e) => setApiFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4" onClick={() => setAddApiModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter API
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedApis.map((api, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{api.name}</h4>
                        <Badge variant="outline">{api.category}</Badge>
                        <Badge className={api.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {api.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Endpoint:</span> {api.endpoint}</p>
                        <p><span className="font-medium">Méthode:</span> {api.method}</p>
                        <p><span className="font-medium">Dernière sync:</span> {api.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination pour les APIs */}
          <Pagination
            currentPage={apisCurrentPage}
            totalPages={apisTotalPages}
            totalItems={apisTotalItems}
            itemsPerPage={apisItemsPerPage}
            onPageChange={setApisCurrentPage}
            onItemsPerPageChange={setApisItemsPerPage}
          />
        </TabsContent>
      </Tabs>

      {/* Modales */}
      <AddSourceModal
        isOpen={addSourceModalOpen}
        onClose={() => setAddSourceModalOpen(false)}
        onSave={handleSaveSource}
      />

      <ConfigureDatabaseModal
        isOpen={configureDatabaseModalOpen}
        onClose={() => setConfigureDatabaseModalOpen(false)}
        onSave={handleSaveDatabase}
      />

      <NewTemplateModal
        isOpen={newTemplateModalOpen}
        onClose={() => setNewTemplateModalOpen(false)}
        onSave={handleSaveTemplate}
      />

      <CreateWorkflowModal
        isOpen={createWorkflowModalOpen}
        onClose={() => setCreateWorkflowModalOpen(false)}
        onSave={handleSaveWorkflow}
      />

      <AddApiModal
        isOpen={addApiModalOpen}
        onClose={() => setAddApiModalOpen(false)}
        onSave={handleSaveApi}
      />
    </div>
  );
}
