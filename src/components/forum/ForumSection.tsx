import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Users, 
  ThumbsUp,
  Reply,
  Search,
  Plus,
  Eye,
  Pin,
  Clock,
  User
} from 'lucide-react';
import { buttonHandlers } from '@/utils/buttonUtils';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

interface ForumTopic {
  id: number;
  title: string;
  category: string;
  author: string;
  replies: number;
  views: number;
  lastReply: string;
  isPinned: boolean;
  isLocked: boolean;
  likes: number;
}

export function ForumSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const forumTopics: ForumTopic[] = [
    {
      id: 1,
      title: "Question sur l'application du nouveau Code du travail",
      category: "Droit social",
      author: "Dr. Ahmed Benali",
      replies: 15,
      views: 234,
      lastReply: "Il y a 2 heures",
      isPinned: true,
      isLocked: false,
      likes: 8
    },
    {
      id: 2,
      title: "Procédure de création d'entreprise - Nouveautés 2024",
      category: "Droit commercial",
      author: "Prof. Fatima Zerrouki",
      replies: 23,
      views: 456,
      lastReply: "Il y a 1 heure",
      isPinned: false,
      isLocked: false,
      likes: 12
    },
    {
      id: 3,
      title: "Interprétation de l'article 87 - Jurisprudence récente",
      category: "Jurisprudence",
      author: "Me. Karim Mansouri",
      replies: 7,
      views: 123,
      lastReply: "Il y a 30 minutes",
      isPinned: false,
      isLocked: false,
      likes: 5
    }
  ];

  // Filtrage des sujets
  const filteredTopics = forumTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination pour les sujets du forum
  const {
    currentData: paginatedTopics,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredTopics,
    itemsPerPage: 10
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Forum Juridique</h1>
          <p className="text-muted-foreground mt-2">
            Échangez avec la communauté juridique algérienne
          </p>
        </div>
        <Button 
          className="gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={buttonHandlers.startDiscussion('Nouveau sujet')}
        >
          <Plus className="w-4 h-4" />
          Nouveau sujet
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Rechercher dans le forum..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {['Tous', 'Droit social', 'Droit commercial', 'Jurisprudence', 'Procédures'].map((category) => (
          <Button 
            key={category} 
            variant="outline" 
            size="sm"
            onClick={buttonHandlers.generic(`Filtrer: ${category}`, 'Filtrage par catégorie', 'Forum')}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Liste des sujets */}
      <div className="space-y-4">
        {paginatedTopics.map((topic) => (
          <Card key={topic.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {topic.isPinned && <Pin className="w-4 h-4 text-blue-600" />}
                    <Badge variant="outline">{topic.category}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                    {topic.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {topic.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {topic.replies} réponses
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {topic.views} vues
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {topic.likes} likes
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Dernière réponse: {topic.lastReply}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={buttonHandlers.viewDocument(topic.id.toString(), topic.title, 'discussion')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Voir
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                import('@/utils/modalManager').then(({ openForumReplyModal }) => {
                  openForumReplyModal(topic.title);
                });
              }}
                  >
                    <Reply className="w-4 h-4 mr-2" />
                    Répondre
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={buttonHandlers.generic(`Like: ${topic.title}`, 'J\'aime le sujet', 'Forum')}
                  >
                    <ThumbsUp className="w-4 h-4" />
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
              onClick={() => {
              import('@/utils/modalManager').then(({ openUserDiscussionsModal }) => {
                openUserDiscussionsModal();
              });
            }}
            >
              <MessageSquare className="w-5 h-5" />
              Mes discussions
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={() => {
              import('@/utils/modalManager').then(({ openPopularTopicsModal }) => {
                openPopularTopicsModal();
              });
            }}
            >
              <ThumbsUp className="w-5 h-5" />
              Sujets populaires
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={() => {
              import('@/utils/modalManager').then(({ openOnlineExpertsModal }) => {
                openOnlineExpertsModal();
              });
            }}
            >
              <Users className="w-5 h-5" />
              Experts en ligne
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={() => {
              import('@/utils/modalManager').then(({ openForumRulesModal }) => {
                openForumRulesModal();
              });
            }}
            >
              <Clock className="w-5 h-5" />
              Règles du forum
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}