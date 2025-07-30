
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  BookOpen, 
  FileText,
  Star,
  Clock
} from 'lucide-react';
import { buttonHandlers } from '@/utils/buttonUtils';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

interface LibraryItem {
  id: number;
  title: string;
  type: 'livre' | 'article' | 'guide' | 'rapport';
  author: string;
  date: string;
  pages: number;
  category: string;
  rating: number;
  description: string;
}

export function LibrarySection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('tous');

  const libraryItems: LibraryItem[] = [
    {
      id: 1,
      title: "Manuel de Droit Civil Algérien",
      type: "livre",
      author: "Dr. Ahmed Benali",
      date: "2024-01-15",
      pages: 456,
      category: "Droit civil",
      rating: 4.8,
      description: "Guide complet du droit civil algérien avec les dernières réformes"
    },
    {
      id: 2,
      title: "Procédures Administratives Modernes",
      type: "guide",
      author: "Prof. Fatima Zerrouki",
      date: "2024-01-10",
      pages: 234,
      category: "Droit administratif",
      rating: 4.6,
      description: "Guide pratique des procédures administratives digitalisées"
    },
    {
      id: 3,
      title: "Rapport sur la Justice Numérique",
      type: "rapport",
      author: "Ministère de la Justice",
      date: "2024-01-05",
      pages: 89,
      category: "Justice",
      rating: 4.2,
      description: "État des lieux de la digitalisation de la justice en Algérie"
    }
  ];

  const types = ['tous', 'livre', 'article', 'guide', 'rapport'];

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'tous' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Pagination pour les éléments de la bibliothèque
  const {
    currentData: paginatedItems,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredItems,
    itemsPerPage: 8
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'livre': return <BookOpen className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'guide': return <FileText className="w-4 h-4" />;
      case 'rapport': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bibliothèque Juridique</h1>
          <p className="text-muted-foreground mt-2">
            Accédez à une vaste collection de ressources juridiques
          </p>
        </div>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={buttonHandlers.generic('Filtres avancés', 'Ouverture des filtres avancés', 'Bibliothèque')}
        >
          <Filter className="w-4 h-4" />
          Filtres avancés
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Rechercher dans la bibliothèque..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {types.map((type) => (
            <TabsTrigger key={type} value={type} className="capitalize">
              {type}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedType} className="space-y-4 mt-6">
          {/* Liste des éléments avec pagination */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <Badge variant="outline" className="capitalize">
                        {item.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Par {item.author}</span>
                      <span>{item.pages} pages</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {new Date(item.date).toLocaleDateString('fr-FR')}
                    </div>

                    <Badge variant="secondary">{item.category}</Badge>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={buttonHandlers.viewDocument(item.id.toString(), item.title, item.type)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Consulter
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={buttonHandlers.downloadDocument(item.id.toString(), item.title)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={buttonHandlers.addToFavorites('document', item.title)}
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Aucun document trouvé</h3>
              <p className="text-gray-600">
                Essayez de modifier vos critères de recherche ou votre type de document
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Nouveautés', 'Consultation des nouveautés', 'Bibliothèque')}
            >
              <BookOpen className="w-5 h-5" />
              Nouveautés
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Plus populaires', 'Documents les plus consultés', 'Bibliothèque')}
            >
              <Star className="w-5 h-5" />
              Plus populaires
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={() => {
              import('@/utils/modalManager').then(({ openDocumentSuggestionModal }) => {
                openDocumentSuggestionModal();
              });
            }}
            >
              <FileText className="w-5 h-5" />
              Suggérer un document
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={() => {
              import('@/utils/modalManager').then(({ openAccessRequestModal }) => {
                openAccessRequestModal();
              });
            }}
            >
              <Eye className="w-5 h-5" />
              Demander un accès
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}