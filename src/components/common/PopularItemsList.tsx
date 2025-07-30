
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BarChart3, LucideIcon } from "lucide-react";

interface PopularItem {
  query: string;
  count: string;
  category: string;
  wilaya: string;
  trend: string;
  description: string;
}

interface PopularItemsListProps {
  title: string;
  description: string;
  icon: LucideIcon;
  items: PopularItem[];
  statistics?: {
    monthlySearches: string;
    wilayas: string;
    procedures: string;
    evolution: string;
  };
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
  };
}

export function PopularItemsList({ 
  title, 
  description, 
  icon: Icon, 
  items,
  statistics 
}: PopularItemsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-orange-500" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {items.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{item.query}</h4>
                  <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4" />
                      {item.count}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${item.trend.startsWith('+') ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}
                    >
                      {item.trend}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xs mb-1">{item.category}</Badge>
                  <Badge className="bg-blue-100 text-blue-800 text-xs block">{item.wilaya}</Badge>
                  <Button variant="outline" size="sm" className="mt-2 h-8 w-8 p-0">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {statistics && (
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              Statistiques des recherches populaires
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{statistics.monthlySearches}</div>
                <div className="text-sm text-gray-600">Recherches mensuelles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{statistics.wilayas}</div>
                <div className="text-sm text-gray-600">Wilayas couvertes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{statistics.procedures}</div>
                <div className="text-sm text-gray-600">Éléments référencés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{statistics.evolution}</div>
                <div className="text-sm text-gray-600">Évolution mensuelle</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
