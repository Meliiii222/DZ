import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  Search, 
  Filter,
  BookOpen,
  Eye
} from 'lucide-react';
import { buttonHandlers } from '@/utils/buttonUtils';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: string;
  source: string;
  readTime: string;
  isUrgent?: boolean;
}

export function NewsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('toutes');

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Nouvelle loi sur la protection des données personnelles",
      summary: "Le gouvernement algérien adopte une nouvelle législation sur la protection des données personnelles, alignée sur les standards internationaux.",
      date: "2024-01-15",
      category: "Législation",
      source: "Journal Officiel",
      readTime: "5 min",
      isUrgent: true
    },
    {
      id: 2,
      title: "Réforme du Code du travail : nouvelles dispositions",
      summary: "Les dernières modifications du Code du travail incluent de nouvelles mesures pour la protection des travailleurs.",
      date: "2024-01-12",
      category: "Droit social",
      source: "Ministère du Travail",
      readTime: "7 min"
    },
    {
      id: 3,
      title: "Digitalisation des procédures judiciaires",
      summary: "Lancement officiel de la plateforme numérique pour les procédures judiciaires dans plusieurs tribunaux.",
      date: "2024-01-10",
      category: "Justice",
      source: "Ministère de la Justice",
      readTime: "4 min"
    }
  ];

  const categories = ['toutes', 'Législation', 'Droit social', 'Justice', 'Économie', 'Fiscal'];

  const filteredNews = newsItems.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'toutes' || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination pour les actualités
  const {
    currentData: paginatedNews,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredNews,
    itemsPerPage: 6
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Actualités Juridiques</h1>
          <p className="text-muted-foreground mt-2">
            Restez informé des dernières évolutions législatives et réglementaires
          </p>
        </div>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={buttonHandlers.generic('Filtres avancés', 'Ouverture des filtres avancés', 'News')}
        >
          <Filter className="w-4 h-4" />
          Filtres
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher dans les actualités..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4 mt-6">
          {/* Liste des actualités avec pagination */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedNews.map((news) => (
              <Card key={news.id} className={`hover:shadow-lg transition-shadow ${news.isUrgent ? 'border-l-4 border-l-red-500' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {news.isUrgent && (
                          <Badge variant="destructive" className="text-xs">
                            URGENT
                          </Badge>
                        )}
                        <Badge variant="outline">{news.category}</Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">{news.title}</CardTitle>
                      <p className="text-gray-600">{news.summary}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(news.date).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {news.readTime}
                      </span>
                      <span>{news.source}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={buttonHandlers.readNews(news.title)}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Lire
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={buttonHandlers.generic(`Voir source: ${news.source}`, 'Consultation de la source', 'News')}
                      >
                        <ExternalLink className="w-4 h-4" />
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

          {filteredNews.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Aucune actualité trouvée</h3>
              <p className="text-gray-600">
                Essayez de modifier vos critères de recherche ou votre catégorie
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={() => {
              import('@/utils/modalManager').then(({ openNewsletterModal }) => {
                openNewsletterModal();
              });
            }}
            >
              <BookOpen className="w-5 h-5" />
              S'abonner à la newsletter
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Alertes personnalisées', 'Configuration d\'alertes personnalisées', 'News')}
            >
              <Filter className="w-5 h-5" />
              Alertes personnalisées
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={() => {
              import('@/utils/modalManager').then(({ openNewsArchiveModal }) => {
                openNewsArchiveModal();
              });
            }}
            >
              <Calendar className="w-5 h-5" />
              Consulter les archives
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}