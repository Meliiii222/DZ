
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Reply,
  Eye,
  Trash2
} from "lucide-react";
import { buttonHandlers } from "@/utils/buttonUtils";
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  type: 'info' | 'warning' | 'success' | 'notification';
  avatar: string;
}

export function MessagesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Système dalil.dz',
      subject: 'Nouveau texte juridique disponible',
      preview: 'Un nouveau décret exécutif a été publié au Journal Officiel...',
      time: 'Il y a 2h',
      unread: true,
      type: 'info',
      avatar: 'S'
    },
    {
      id: '2',
      sender: 'Équipe de modération',
      subject: 'Validation de votre contribution',
      preview: 'Votre texte juridique soumis a été approuvé et publié...',
      time: 'Il y a 5h',
      unread: true,
      type: 'success',
      avatar: 'É'
    },
    {
      id: '3',
      sender: 'Administration',
      subject: 'Maintenance programmée',
      preview: 'Une maintenance est prévue ce weekend de 2h à 6h...',
      time: 'Hier',
      unread: false,
      type: 'warning',
      avatar: 'A'
    }
  ]);

  const unreadCount = messages.filter(m => m.unread).length;

  // Pagination pour les messages
  const {
    currentData: paginatedMessages,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: messages,
    itemsPerPage: 5
  });

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info className="w-3 h-3" />;
      case 'warning': return <AlertTriangle className="w-3 h-3" />;
      case 'success': return <CheckCircle className="w-3 h-3" />;
      default: return <Bell className="w-3 h-3" />;
    }
  };

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-100 text-blue-600';
      case 'warning': return 'bg-orange-100 text-orange-600';
      case 'success': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleMessageClick = (message: Message) => {
    // Marquer comme lu
    setMessages(prev => prev.map(m => 
      m.id === message.id ? { ...m, unread: false } : m
    ));
    
    // Ouvrir le message
    buttonHandlers.generic(`Message: ${message.subject}`, 'Ouverture', 'Messages')();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MessageSquare className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Messages</CardTitle>
              <Badge variant="secondary">{unreadCount} non lus</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {paginatedMessages.map((message) => (
                <Card 
                  key={message.id} 
                  className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                    message.unread ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => handleMessageClick(message)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-medium">
                        {message.avatar}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {message.sender}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getMessageColor(message.type)}`}>
                            {getMessageIcon(message.type)}
                          </div>
                          {message.unread && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-800 mb-1 truncate">
                        {message.subject}
                      </p>
                      <p className="text-sm text-gray-600 truncate mb-2">
                        {message.preview}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          {message.time}
                        </p>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              buttonHandlers.markRead(message.id)();
                            }}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              buttonHandlers.deleteMessage(message.id)();
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4 pt-4 border-t">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                />
              </div>
            )}
            <div className="p-4 border-t border-gray-100">
              <Button 
                variant="ghost" 
                className="w-full text-green-600 hover:text-green-700"
                onClick={() => {
                  setIsOpen(false);
                  // Naviguer vers la section des messages
                  window.dispatchEvent(new CustomEvent('navigate-to-section', { 
                    detail: 'messages' 
                  }));
                }}
              >
                Voir tous les messages
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
