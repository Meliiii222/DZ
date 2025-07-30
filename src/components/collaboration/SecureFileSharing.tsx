import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { AddSharedResourceModal } from '@/components/modals/AddSharedResourceModal';
import {
  Share2,
  Download,
  Eye,
  Lock,
  Users,
  Calendar,
  FileText,
  Image,
  Video,
  Link,
  Plus,
  Search,
  Filter
} from 'lucide-react';

export function SecureFileSharing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const sharedResources = [
    {
      id: 1,
      title: "Modèle de Contrat Commercial",
      type: "document",
      category: "Modèles",
      author: "Service Juridique",
      size: "2.4 MB",
      downloads: 234,
      views: 1156,
      shared: "2025-01-02",
      access: "public",
      tags: ["contrat", "commercial", "modèle"]
    },
    {
      id: 2,
      title: "Guide Procédure Référé",
      type: "document",
      category: "Guides",
      author: "M. Benali",
      size: "1.8 MB",
      downloads: 89,
      views: 456,
      shared: "2025-01-01",
      access: "members",
      tags: ["procédure", "référé", "guide"]
    },
    {
      id: 3,
      title: "Jurisprudence Récente 2024",
      type: "link",
      category: "Jurisprudence",
      author: "Mme Dubois",
      size: "-",
      downloads: 156,
      views: 789,
      shared: "2024-12-30",
      access: "restricted",
      tags: ["jurisprudence", "2024", "actualité"]
    },
    {
      id: 4,
      title: "Modèle de Contrat de Travail",
      type: "document",
      category: "Modèles",
      author: "Cabinet Juridique Alger",
      size: "1.2 MB",
      downloads: 445,
      views: 2134,
      shared: "2025-01-03",
      access: "public",
      tags: ["travail", "contrat", "modèle"]
    },
    {
      id: 5,
      title: "Base de données jurisprudentielle",
      type: "link",
      category: "Jurisprudence",
      author: "Cour Suprême",
      size: "-",
      downloads: 678,
      views: 3245,
      shared: "2025-01-02",
      access: "public",
      tags: ["jurisprudence", "base", "données"]
    },
    {
      id: 6,
      title: "Guide de Rédaction Juridique",
      type: "document",
      category: "Guides",
      author: "Prof. Amara",
      size: "3.1 MB",
      downloads: 123,
      views: 567,
      shared: "2025-01-01",
      access: "members",
      tags: ["rédaction", "guide", "méthodologie"]
    },
    {
      id: 7,
      title: "Formulaires de Procédure Administrative",
      type: "document",
      category: "Formulaires",
      author: "Ministère de la Justice",
      size: "0.8 MB",
      downloads: 890,
      views: 1789,
      shared: "2025-01-03",
      access: "public",
      tags: ["formulaires", "administrative", "procédure"]
    },
    {
      id: 8,
      title: "Modèle de Statuts d'Association",
      type: "document",
      category: "Modèles",
      author: "Service des Associations",
      size: "0.5 MB",
      downloads: 234,
      views: 789,
      shared: "2025-01-02",
      access: "public",
      tags: ["association", "statuts", "modèle"]
    },
    {
      id: 9,
      title: "Liens utiles - Sites juridiques algériens",
      type: "link",
      category: "Références",
      author: "Bibliothèque Juridique",
      size: "-",
      downloads: 345,
      views: 1234,
      shared: "2025-01-01",
      access: "public",
      tags: ["liens", "sites", "références"]
    },
    {
      id: 10,
      title: "Modèle de Contrat de Location",
      type: "document",
      category: "Modèles",
      author: "Cabinet Immobilier",
      size: "1.5 MB",
      downloads: 567,
      views: 2341,
      shared: "2025-01-04",
      access: "public",
      tags: ["location", "immobilier", "contrat"]
    },
    {
      id: 11,
      title: "Guide Procédure Contentieuse",
      type: "document",
      category: "Guides",
      author: "M. Khelifi",
      size: "2.7 MB",
      downloads: 234,
      views: 987,
      shared: "2025-01-03",
      access: "members",
      tags: ["contentieux", "procédure", "guide"]
    },
    {
      id: 12,
      title: "Base de données législative",
      type: "link",
      category: "Législation",
      author: "Assemblée Populaire Nationale",
      size: "-",
      downloads: 789,
      views: 4567,
      shared: "2025-01-02",
      access: "public",
      tags: ["législation", "lois", "base"]
    }
  ];

  const filteredResources = sharedResources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination pour les ressources partagées (toutes)
  const {
    currentData: paginatedResources,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredResources,
    itemsPerPage: 10
  });

  // Pagination pour les documents
  const documents = filteredResources.filter(resource => resource.type === 'document');
  const {
    currentData: paginatedDocuments,
    currentPage: documentsPage,
    totalPages: documentsTotalPages,
    setCurrentPage: setDocumentsPage
  } = usePagination({
    data: documents,
    itemsPerPage: 6
  });

  // Pagination pour les liens
  const links = filteredResources.filter(resource => resource.type === 'link');
  const {
    currentData: paginatedLinks,
    currentPage: linksPage,
    totalPages: linksTotalPages,
    setCurrentPage: setLinksPage
  } = usePagination({
    data: links,
    itemsPerPage: 6
  });

  // Pagination pour les modèles
  const templates = filteredResources.filter(resource => resource.category === 'Modèles');
  const {
    currentData: paginatedTemplates,
    currentPage: templatesPage,
    totalPages: templatesTotalPages,
    setCurrentPage: setTemplatesPage
  } = usePagination({
    data: templates,
    itemsPerPage: 6
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'image': return Image;
      case 'video': return Video;
      case 'link': return Link;
      default: return FileText;
    }
  };

  const getAccessColor = (access: string) => {
    switch (access) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'members': return 'bg-blue-100 text-blue-800';
      case 'restricted': return 'bg-orange-100 text-orange-800';
      case 'private': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec bouton d'ajout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ressources Partagées</h2>
          <p className="text-gray-600">Partagez et accédez aux ressources juridiques</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </Button>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Rechercher une ressource..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">342</p>
                <p className="text-sm text-gray-600">Ressources</p>
              </div>
              <Share2 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">1,567</p>
                <p className="text-sm text-gray-600">Téléchargements</p>
              </div>
              <Download className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">4,231</p>
                <p className="text-sm text-gray-600">Vues</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-gray-600">Contributeurs</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Toutes les ressources</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="links">Liens</TabsTrigger>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {paginatedResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4 flex-1">
                      <TypeIcon className="h-8 w-8 text-gray-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                            {resource.title}
                          </h3>
                          <Badge className={getAccessColor(resource.access)}>
                            {resource.access === 'public' ? 'Public' : 
                             resource.access === 'members' ? 'Membres' :
                             resource.access === 'restricted' ? 'Restreint' : 'Privé'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span>Par {resource.author}</span>
                          <Badge variant="outline">{resource.category}</Badge>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {resource.shared}
                          </div>
                          {resource.size !== '-' && <span>{resource.size}</span>}
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          {resource.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            console.log('Viewing resource:', resource.title);
                            window.dispatchEvent(new CustomEvent('view-resource', { 
                              detail: { resourceId: resource.id }
                            }));
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            console.log('Downloading resource:', resource.title);
                            window.dispatchEvent(new CustomEvent('download-resource', { 
                              detail: { resourceId: resource.id }
                            }));
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            window.dispatchEvent(new CustomEvent('share-resource', { 
                              detail: { resourceId: resource.id.toString(), title: resource.title }
                            }));
                          }}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>{resource.downloads} téléchargements</div>
                        <div>{resource.views} vues</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          </div>
          
          {/* Pagination pour toutes les ressources */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </TabsContent>

        <TabsContent value="documents" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {paginatedDocuments.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4 flex-1">
                      <TypeIcon className="h-8 w-8 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                            {resource.title}
                          </h3>
                          <Badge className={getAccessColor(resource.access)}>
                            {resource.access === 'public' ? 'Public' : 
                             resource.access === 'members' ? 'Membres' :
                             resource.access === 'restricted' ? 'Restreint' : 'Privé'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span>Par {resource.author}</span>
                          <Badge variant="outline">{resource.category}</Badge>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {resource.shared}
                          </div>
                          <span className="font-medium">{resource.size}</span>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          {resource.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>{resource.downloads} téléchargements</div>
                        <div>{resource.views} vues</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {/* Pagination pour les documents */}
          <Pagination
            currentPage={documentsPage}
            totalPages={documentsTotalPages}
            totalItems={documents.length}
            itemsPerPage={6}
            onPageChange={setDocumentsPage}
            onItemsPerPageChange={() => {}}
          />
        </TabsContent>

        <TabsContent value="links" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {paginatedLinks.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4 flex-1">
                      <TypeIcon className="h-8 w-8 text-green-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                            {resource.title}
                          </h3>
                          <Badge className={getAccessColor(resource.access)}>
                            {resource.access === 'public' ? 'Public' : 
                             resource.access === 'members' ? 'Membres' :
                             resource.access === 'restricted' ? 'Restreint' : 'Privé'}
                          </Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Lien externe</Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span>Par {resource.author}</span>
                          <Badge variant="outline">{resource.category}</Badge>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {resource.shared}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          {resource.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Link className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>{resource.downloads} accès</div>
                        <div>{resource.views} vues</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {/* Pagination pour les liens */}
          <Pagination
            currentPage={linksPage}
            totalPages={linksTotalPages}
            totalItems={links.length}
            itemsPerPage={6}
            onPageChange={setLinksPage}
            onItemsPerPageChange={() => {}}
          />
        </TabsContent>

        <TabsContent value="templates" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {paginatedTemplates.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4 flex-1">
                      <TypeIcon className="h-8 w-8 text-purple-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                            {resource.title}
                          </h3>
                          <Badge className={getAccessColor(resource.access)}>
                            {resource.access === 'public' ? 'Public' : 
                             resource.access === 'members' ? 'Membres' :
                             resource.access === 'restricted' ? 'Restreint' : 'Privé'}
                          </Badge>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700">Modèle</Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span>Par {resource.author}</span>
                          <Badge variant="outline">{resource.category}</Badge>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {resource.shared}
                          </div>
                          {resource.size !== '-' && <span className="font-medium">{resource.size}</span>}
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          {resource.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>{resource.downloads} téléchargements</div>
                        <div>{resource.views} vues</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {/* Pagination pour les modèles */}
          <Pagination
            currentPage={templatesPage}
            totalPages={templatesTotalPages}
            totalItems={templates.length}
            itemsPerPage={6}
            onPageChange={setTemplatesPage}
            onItemsPerPageChange={() => {}}
          />
        </TabsContent>
      </Tabs>

      {/* Modal d'ajout */}
      <AddSharedResourceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}
