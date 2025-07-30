import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  MessageSquare, 
  Bell, 
  Settings, 
  Search, 
  Filter,
  CheckCircle,
  AlertCircle,
  InfoIcon,
  Calendar,
  User,
  Mail,
  Archive,
  Scale,
  FileText
} from 'lucide-react';

interface Message {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
}

interface Notification {
  id: number;
  type: 'system' | 'legal' | 'document' | 'deadline';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
}

export function MessagesNotificationsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const messages: Message[] = [
    {
      id: 1,
      type: 'info',
      title: 'Nouvelle mise à jour juridique',
      content: 'Une nouvelle loi sur le commerce électronique a été publiée au Journal Officiel.',
      timestamp: 'Il y a 2 heures',
      read: false,
      category: 'Mise à jour législative',
      priority: 'high'
    },
    {
      id: 2,
      type: 'success',
      title: 'Validation de document',
      content: 'Votre document "Procédure d\'immatriculation" a été validé et publié.',
      timestamp: 'Il y a 1 jour',
      read: true,
      category: 'Validation',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Rappel de deadline',
      content: 'N\'oubliez pas de soumettre votre rapport mensuel avant le 30 du mois.',
      timestamp: 'Il y a 3 jours',
      read: false,
      category: 'Rappel',
      priority: 'high'
    },
    {
      id: 4,
      type: 'info',
      title: 'Nouveau texte disponible',
      content: 'Le décret d\'application de la loi n° 2024-15 est maintenant disponible.',
      timestamp: 'Il y a 5 jours',
      read: true,
      category: 'Nouveau contenu',
      priority: 'medium'
    },
    {
      id: 5,
      type: 'error',
      title: 'Erreur de synchronisation',
      content: 'Problème de synchronisation avec la base de données externe.',
      timestamp: 'Il y a 1 semaine',
      read: false,
      category: 'Système',
      priority: 'high'
    },
    {
      id: 6,
      type: 'success',
      title: 'Import réussi',
      content: '150 nouveaux documents ont été importés avec succès.',
      timestamp: 'Il y a 1 semaine',
      read: true,
      category: 'Import',
      priority: 'low'
    },
    {
      id: 7,
      type: 'info',
      title: 'Maintenance programmée',
      content: 'Maintenance du système prévue le dimanche de 2h à 4h du matin.',
      timestamp: 'Il y a 2 semaines',
      read: false,
      category: 'Maintenance',
      priority: 'medium'
    },
    {
      id: 8,
      type: 'warning',
      title: 'Quota d\'utilisation',
      content: 'Vous avez atteint 80% de votre quota mensuel de recherches.',
      timestamp: 'Il y a 2 semaines',
      read: true,
      category: 'Quota',
      priority: 'medium'
    }
  ];

  const notifications: Notification[] = [
    {
      id: 1,
      type: 'legal',
      title: 'Nouvelle jurisprudence',
      content: 'Arrêt important de la Cour Suprême sur le droit commercial.',
      timestamp: 'Il y a 1 heure',
      read: false,
      actionRequired: true
    },
    {
      id: 2,
      type: 'document',
      title: 'Document en attente',
      content: 'Un document nécessite votre validation.',
      timestamp: 'Il y a 4 heures',
      read: false,
      actionRequired: true
    },
    {
      id: 3,
      type: 'system',
      title: 'Mise à jour système',
      content: 'Nouvelle version de l\'application disponible.',
      timestamp: 'Il y a 1 jour',
      read: true,
      actionRequired: false
    },
    {
      id: 4,
      type: 'deadline',
      title: 'Échéance proche',
      content: 'Date limite pour le dépôt des comptes annuels dans 3 jours.',
      timestamp: 'Il y a 2 jours',
      read: false,
      actionRequired: true
    },
    {
      id: 5,
      type: 'legal',
      title: 'Modification réglementaire',
      content: 'Nouveau décret modifiant les procédures d\'urbanisme.',
      timestamp: 'Il y a 3 jours',
      read: true,
      actionRequired: false
    },
    {
      id: 6,
      type: 'system',
      title: 'Sauvegarde automatique',
      content: 'Sauvegarde hebdomadaire effectuée avec succès.',
      timestamp: 'Il y a 1 semaine',
      read: true,
      actionRequired: false
    }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || message.category === selectedCategory;
    const matchesType = selectedType === 'all' || message.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Pagination pour les messages
  const {
    currentData: paginatedMessages,
    currentPage: messagesCurrentPage,
    totalPages: messagesTotalPages,
    itemsPerPage: messagesItemsPerPage,
    totalItems: messagesTotalItems,
    setCurrentPage: setMessagesCurrentPage,
    setItemsPerPage: setMessagesItemsPerPage
  } = usePagination({
    data: filteredMessages,
    itemsPerPage: 5
  });

  // Pagination pour les notifications
  const {
    currentData: paginatedNotifications,
    currentPage: notificationsCurrentPage,
    totalPages: notificationsTotalPages,
    itemsPerPage: notificationsItemsPerPage,
    totalItems: notificationsTotalItems,
    setCurrentPage: setNotificationsCurrentPage,
    setItemsPerPage: setNotificationsItemsPerPage
  } = usePagination({
    data: filteredNotifications,
    itemsPerPage: 5
  });

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <InfoIcon className="w-5 h-5 text-blue-600" />;
    }
  };

  const getMessageStyle = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-l-green-500 text-green-900';
      case 'warning': return 'bg-yellow-50 border-l-yellow-500 text-yellow-900';
      case 'error': return 'bg-red-50 border-l-red-500 text-red-900';
      default: return 'bg-blue-50 border-l-blue-500 text-blue-900';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'legal': return <Scale className="w-5 h-5 text-purple-600" />;
      case 'document': return <FileText className="w-5 h-5 text-orange-600" />;
      case 'deadline': return <Calendar className="w-5 h-5 text-red-600" />;
      default: return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages et Notifications</h1>
          <p className="text-gray-600">Gérez vos messages et notifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="w-4 h-4 mr-2" />
            Archiver
          </Button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtres et Recherche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Toutes les catégories</option>
              <option value="Mise à jour législative">Mise à jour législative</option>
              <option value="Validation">Validation</option>
              <option value="Rappel">Rappel</option>
              <option value="Nouveau contenu">Nouveau contenu</option>
              <option value="Système">Système</option>
            </select>
            <select
              className="px-3 py-2 border rounded-md"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="info">Information</option>
              <option value="success">Succès</option>
              <option value="warning">Avertissement</option>
              <option value="error">Erreur</option>
            </select>
            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Appliquer
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="messages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Messages ({filteredMessages.length})
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications ({filteredNotifications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Messages récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paginatedMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`p-4 border-l-4 rounded-lg ${getMessageStyle(message.type)} ${!message.read ? 'shadow-md' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getMessageIcon(message.type)}
                        <div className="flex-1">
                          <h3 className="font-medium flex items-center gap-2">
                            {message.title}
                            {!message.read && <Badge variant="secondary" className="text-xs">Nouveau</Badge>}
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                message.priority === 'high' ? 'border-red-500 text-red-700' :
                                message.priority === 'medium' ? 'border-yellow-500 text-yellow-700' :
                                'border-gray-500 text-gray-700'
                              }`}
                            >
                              {message.priority === 'high' ? 'Urgent' : 
                               message.priority === 'medium' ? 'Normal' : 'Faible'}
                            </Badge>
                          </h3>
                          <p className="text-sm mt-1">{message.content}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs">
                            <span>{message.timestamp}</span>
                            <Badge variant="outline" className="text-xs">{message.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination pour les messages */}
              <div className="mt-6">
                <Pagination
                  currentPage={messagesCurrentPage}
                  totalPages={messagesTotalPages}
                  totalItems={messagesTotalItems}
                  itemsPerPage={messagesItemsPerPage}
                  onPageChange={setMessagesCurrentPage}
                  onItemsPerPageChange={setMessagesItemsPerPage}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications système</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paginatedNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <h3 className="font-medium flex items-center gap-2">
                            {notification.title}
                            {!notification.read && <Badge variant="secondary" className="text-xs">Nouveau</Badge>}
                            {notification.actionRequired && (
                              <Badge variant="destructive" className="text-xs">Action requise</Badge>
                            )}
                          </h3>
                          <p className="text-sm text-gray-700 mt-1">{notification.content}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>{notification.timestamp}</span>
                            <Badge variant="outline" className="text-xs capitalize">{notification.type}</Badge>
                          </div>
                        </div>
                      </div>
                      {notification.actionRequired && (
                        <Button size="sm" variant="outline">
                          Action
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination pour les notifications */}
              <div className="mt-6">
                <Pagination
                  currentPage={notificationsCurrentPage}
                  totalPages={notificationsTotalPages}
                  totalItems={notificationsTotalItems}
                  itemsPerPage={notificationsItemsPerPage}
                  onPageChange={setNotificationsCurrentPage}
                  onItemsPerPageChange={setNotificationsItemsPerPage}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Paramètres */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Paramètres de notification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Notifications par email</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notifications email</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Alertes juridiques</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Messages système</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Notifications push</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Documents validés</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Nouvelles lois</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Échéances</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}