
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  Filter, 
  Search, 
  FileText, 
  Eye, 
  Download, 
  Share, 
  Trash2,
  Star,
  BookOpen,
  Scale
} from 'lucide-react';
import { buttonHandlers } from '@/utils/buttonUtils';

interface FavoriteItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'code' | 'loi' | 'procedure';
  tags: string[];
  addedDate: string;
  viewedDate: string;
}

export function FavoritesSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const favorites: FavoriteItem[] = [
    {
      id: '1',
      title: 'Code du travail algérien',
      subtitle: 'Loi n° 90-11 du 21 avril 1990 relative aux relations de travail',
      type: 'code',
      tags: ['Travail', 'Relations sociales', 'Droit social'],
      addedDate: '2024-01-15',
      viewedDate: '2024-03-10'
    },
    {
      id: '2',
      title: 'Procédure de création d\'entreprise',
      subtitle: 'Guide complet des démarches administratives',
      type: 'procedure',
      tags: ['Entreprise', 'CNRC', 'Administratif'],
      addedDate: '2024-02-01',
      viewedDate: '2024-03-08'
    },
    {
      id: '3',
      title: 'Loi de finances 2024',
      subtitle: 'Loi n° 23-12 du 30 décembre 2023 portant loi de finances pour 2024',
      type: 'loi',
      tags: ['Finances', 'Budget', 'Fiscal'],
      addedDate: '2024-01-05',
      viewedDate: '2024-03-05'
    }
  ];

  // Filtrage des favoris
  const filteredFavorites = favorites.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Séparation par type
  const allFavorites = filteredFavorites;
  const codes = filteredFavorites.filter(item => item.type === 'code');
  const lois = filteredFavorites.filter(item => item.type === 'loi');
  const procedures = filteredFavorites.filter(item => item.type === 'procedure');

  // Pagination pour chaque onglet
  const {
    currentData: paginatedAll,
    currentPage: allCurrentPage,
    totalPages: allTotalPages,
    itemsPerPage: allItemsPerPage,
    totalItems: allTotalItems,
    setCurrentPage: setAllCurrentPage,
    setItemsPerPage: setAllItemsPerPage
  } = usePagination({
    data: allFavorites,
    itemsPerPage: 6
  });

  const {
    currentData: paginatedCodes,
    currentPage: codesCurrentPage,
    totalPages: codesTotalPages,
    itemsPerPage: codesItemsPerPage,
    totalItems: codesTotalItems,
    setCurrentPage: setCodesCurrentPage,
    setItemsPerPage: setCodesItemsPerPage
  } = usePagination({
    data: codes,
    itemsPerPage: 6
  });

  const {
    currentData: paginatedLois,
    currentPage: loisCurrentPage,
    totalPages: loisTotalPages,
    itemsPerPage: loisItemsPerPage,
    totalItems: loisTotalItems,
    setCurrentPage: setLoisCurrentPage,
    setItemsPerPage: setLoisItemsPerPage
  } = usePagination({
    data: lois,
    itemsPerPage: 6
  });

  const {
    currentData: paginatedProcedures,
    currentPage: proceduresCurrentPage,
    totalPages: proceduresTotalPages,
    itemsPerPage: proceduresItemsPerPage,
    totalItems: proceduresTotalItems,
    setCurrentPage: setProceduresCurrentPage,
    setItemsPerPage: setProceduresItemsPerPage
  } = usePagination({
    data: procedures,
    itemsPerPage: 6
  });

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
    // Ouvrir la modale de filtres avancés
    import('@/utils/modalManager').then(({ openAdvancedFiltersModal }) => {
      openAdvancedFiltersModal('Favoris');
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mes Favoris</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos documents et procédures favoris
          </p>
        </div>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={handleFilterClick}
        >
          <Filter className="w-4 h-4" />
          Filtrer
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Rechercher dans mes favoris..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="tous" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tous">Tous ({allFavorites.length})</TabsTrigger>
          <TabsTrigger value="codes">Codes ({codes.length})</TabsTrigger>
          <TabsTrigger value="lois">Lois ({lois.length})</TabsTrigger>
          <TabsTrigger value="procedures">Procédures ({procedures.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="tous" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {paginatedAll.map((item) => (
            <Card key={item.id} className="border-l-4 border-l-emerald-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{item.subtitle}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant={index === 0 ? "default" : "secondary"}
                          className={index === 0 ? "bg-blue-100 text-blue-800" : ""}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Ajouté le {new Date(item.addedDate).toLocaleDateString('fr-FR')}</span>
                      <span>Vu le {new Date(item.viewedDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 flex-shrink-0"
                        onClick={buttonHandlers.viewDocument(item.id, item.title, item.type)}
                        title="Consulter le document"
                      >
                        <Eye className="w-4 h-4" />
                        Consulter
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 flex-shrink-0"
                        onClick={buttonHandlers.downloadDocument(item.id, item.title)}
                        title="Télécharger le document"
                      >
                        <Download className="w-4 h-4" />
                        Télécharger
                      </Button>
                    </div>
                    <div className="flex gap-1 sm:ml-auto">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="p-2 h-8 w-8"
                        onClick={buttonHandlers.shareDocument(item.id, item.title)}
                        title="Partager le document"
                      >
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700 p-2 h-8 w-8"
                        onClick={buttonHandlers.removeFromFavorites(item.title)}
                        title="Retirer des favoris"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))}

            {/* Quick Actions */}
            <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
              <CardContent className="p-6 text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Ajouter aux favoris</h3>
                <p className="text-gray-600 mb-4">
                  Parcourez les textes juridiques et procédures pour les ajouter à vos favoris
                </p>
                <div className="flex gap-2 justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={buttonHandlers.browseType('legal', 'Textes juridiques')}
                  >
                    <Scale className="w-4 h-4" />
                    Textes juridiques
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={buttonHandlers.browseType('procedure', 'Procédures')}
                  >
                    <BookOpen className="w-4 h-4" />
                    Procédures
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => {
                      import('@/utils/modalManager').then(({ openClearFavoritesModal }) => {
                        openClearFavoritesModal();
                      });
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Vider
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pagination pour l'onglet Tous */}
          <div className="mt-6">
            <Pagination
              currentPage={allCurrentPage}
              totalPages={allTotalPages}
              totalItems={allTotalItems}
              itemsPerPage={allItemsPerPage}
              onPageChange={setAllCurrentPage}
              onItemsPerPageChange={setAllItemsPerPage}
            />
          </div>
        </TabsContent>

        {/* Onglet Codes */}
        <TabsContent value="codes" className="space-y-6">
          {codes.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {paginatedCodes.map((item) => (
                  <Card key={item.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-3">{item.subtitle}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="text-xs text-gray-500 space-y-1">
                            <div>Ajouté le {item.addedDate}</div>
                            <div>Consulté le {item.viewedDate}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6">
                <Pagination
                  currentPage={codesCurrentPage}
                  totalPages={codesTotalPages}
                  totalItems={codesTotalItems}
                  itemsPerPage={codesItemsPerPage}
                  onPageChange={setCodesCurrentPage}
                  onItemsPerPageChange={setCodesItemsPerPage}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Aucun code en favoris</h3>
              <p className="text-gray-600">
                Ajoutez des codes juridiques à vos favoris pour les retrouver facilement
              </p>
            </div>
          )}
        </TabsContent>

        {/* Onglet Lois */}
        <TabsContent value="lois" className="space-y-6">
          {lois.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {paginatedLois.map((item) => (
                  <Card key={item.id} className="border-l-4 border-l-purple-500">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Scale className="w-5 h-5 text-purple-600" />
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-3">{item.subtitle}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="text-xs text-gray-500 space-y-1">
                            <div>Ajouté le {item.addedDate}</div>
                            <div>Consulté le {item.viewedDate}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6">
                <Pagination
                  currentPage={loisCurrentPage}
                  totalPages={loisTotalPages}
                  totalItems={loisTotalItems}
                  itemsPerPage={loisItemsPerPage}
                  onPageChange={setLoisCurrentPage}
                  onItemsPerPageChange={setLoisItemsPerPage}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Scale className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Aucune loi en favoris</h3>
              <p className="text-gray-600">
                Ajoutez des lois à vos favoris pour les retrouver facilement
              </p>
            </div>
          )}
        </TabsContent>

        {/* Onglet Procédures */}
        <TabsContent value="procedures" className="space-y-6">
          {procedures.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {paginatedProcedures.map((item) => (
                  <Card key={item.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-green-600" />
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-3">{item.subtitle}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="text-xs text-gray-500 space-y-1">
                            <div>Ajouté le {item.addedDate}</div>
                            <div>Consulté le {item.viewedDate}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6">
                <Pagination
                  currentPage={proceduresCurrentPage}
                  totalPages={proceduresTotalPages}
                  totalItems={proceduresTotalItems}
                  itemsPerPage={proceduresItemsPerPage}
                  onPageChange={setProceduresCurrentPage}
                  onItemsPerPageChange={setProceduresItemsPerPage}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Aucune procédure en favoris</h3>
              <p className="text-gray-600">
                Ajoutez des procédures à vos favoris pour les retrouver facilement
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
