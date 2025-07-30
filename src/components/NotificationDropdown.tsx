
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, FileText, AlertTriangle, Calendar, ExternalLink } from "lucide-react";
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Nouveau texte publié",
      description: "Loi n° 2025-123 du 15 janvier 2025",
      time: "Il y a 2 heures",
      type: "new-text",
      icon: FileText,
      unread: true
    },
    {
      id: 2,
      title: "Mise à jour importante",
      description: "Décret n° 2025-045 modifié",
      time: "Il y a 4 heures",
      type: "update",
      icon: AlertTriangle,
      unread: true
    },
    {
      id: 3,
      title: "Rappel d'échéance",
      description: "Consultation publique se termine demain",
      time: "Il y a 1 jour",
      type: "reminder",
      icon: Calendar,
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Pagination pour les notifications
  const {
    currentData: paginatedNotifications,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: notifications,
    itemsPerPage: 5
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <Badge variant="secondary">{unreadCount} nouvelles</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {paginatedNotifications.map((notification) => (
                <Card 
                  key={notification.id}
                  className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                    notification.unread ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                      ${notification.type === 'new-text' ? 'bg-green-100 text-green-600' :
                        notification.type === 'update' ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-100 text-blue-600'}
                    `}>
                      <notification.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </p>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
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
                className="w-full text-emerald-600 hover:text-emerald-700"
                onClick={() => {
                  setIsOpen(false);
                  // Naviguer vers la section des notifications
                  window.dispatchEvent(new CustomEvent('navigate-to-section', { 
                    detail: 'alerts-notifications' 
                  }));
                }}
              >
                Voir toutes les notifications
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
