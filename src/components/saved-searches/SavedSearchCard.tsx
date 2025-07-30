
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, Scale, Edit, Trash2 } from "lucide-react";
import { SavedSearch, SearchCategory } from './types';
import { buttonHandlers } from '@/utils/buttonUtils';

interface SavedSearchCardProps {
  search: SavedSearch;
}

export function SavedSearchCard({ search }: SavedSearchCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<SearchCategory, string> = {
      "Civil": "bg-blue-100 text-blue-800",
      "Économique": "bg-green-100 text-green-800",
      "Social": "bg-purple-100 text-purple-800",
      "Fiscal": "bg-orange-100 text-orange-800",
      "Pénal": "bg-red-100 text-red-800",
      "Urbanisme": "bg-yellow-100 text-yellow-800",
      "Constitutionnel": "bg-indigo-100 text-indigo-800",
      "Commercial": "bg-pink-100 text-pink-800",
      "Douanier": "bg-teal-100 text-teal-800",
      "Environnement": "bg-emerald-100 text-emerald-800",
      "Énergie": "bg-amber-100 text-amber-800",
      "Financier": "bg-cyan-100 text-cyan-800"
    };
    return colors[category as SearchCategory] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-lg text-gray-900">{search.title}</h3>
              <Badge className={getCategoryColor(search.category)}>
                {search.category}
              </Badge>
            </div>
            
            <p className="text-gray-600 mb-3">{search.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Créé le {search.date}
              </span>
              <span className="flex items-center gap-1">
                <Search className="w-4 h-4" />
                {search.results} résultats
              </span>
              <span className="flex items-center gap-1">
                <Scale className="w-4 h-4" />
                {search.lastAccessed}
              </span>
            </div>
            
            <div className="flex gap-2 mb-4">
              {search.filters.map((filter, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {filter}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex-shrink-0"
                onClick={buttonHandlers.editSavedSearch(search.title)}
                title="Modifier la recherche"
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="flex-shrink-0"
                onClick={buttonHandlers.executeSavedSearch(search.title)}
                title="Relancer la recherche"
              >
                <Search className="w-4 h-4 mr-2" />
                Relancer
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600 hover:text-red-700 flex-shrink-0"
              onClick={buttonHandlers.deleteSavedSearch(search.title)}
              title="Supprimer la recherche"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
