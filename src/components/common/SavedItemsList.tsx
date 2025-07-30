
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, Edit, Trash2, LucideIcon } from "lucide-react";

interface SavedItem {
  id: number;
  title: string;
  date: string;
  results?: number;
  category: string;
  lastAccessed: string;
  wilaya?: string;
  additionalInfo?: string;
}

interface SavedItemsListProps {
  title: string;
  description: string;
  icon: LucideIcon;
  items: SavedItem[];
  onViewAll?: () => void;
  maxItems?: number;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
  };
}

export function SavedItemsList({ 
  title, 
  description, 
  icon: Icon, 
  items, 
  onViewAll,
  maxItems = 4 
}: SavedItemsListProps) {
  const displayItems = items.slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-emerald-600" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                  <Badge variant="outline" className="text-xs">{item.category}</Badge>
                  {item.wilaya && (
                    <Badge className="bg-emerald-100 text-emerald-800 text-xs">{item.wilaya}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                  {item.results && <span>{item.results} résultats</span>}
                  <span>{item.lastAccessed}</span>
                  {item.additionalInfo && <span>{item.additionalInfo}</span>}
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Search className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Edit className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {onViewAll && items.length > maxItems && (
          <div className="mt-4 text-center">
            <Button variant="link" onClick={onViewAll} className="text-sm">
              Voir tous les éléments sauvegardés
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
