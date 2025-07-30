
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Search, Building2, Calendar } from "lucide-react";
import { SavedSearch } from './types';

interface StatisticsCardsProps {
  savedSearches: SavedSearch[];
}

export function StatisticsCards({ savedSearches }: StatisticsCardsProps) {
  const totalResults = savedSearches.reduce((sum, search) => sum + search.results, 0);
  const uniqueCategories = new Set(savedSearches.map(s => s.category)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6 text-center">
          <FileText className="w-8 h-8 mx-auto text-blue-600 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{savedSearches.length}</div>
          <div className="text-sm text-gray-500">Recherches sauvées</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6 text-center">
          <Search className="w-8 h-8 mx-auto text-green-600 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{totalResults}</div>
          <div className="text-sm text-gray-500">Résultats totaux</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6 text-center">
          <Building2 className="w-8 h-8 mx-auto text-purple-600 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{uniqueCategories}</div>
          <div className="text-sm text-gray-500">Catégories</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6 text-center">
          <Calendar className="w-8 h-8 mx-auto text-orange-600 mb-2" />
          <div className="text-2xl font-bold text-gray-900">30</div>
          <div className="text-sm text-gray-500">Jours d'historique</div>
        </CardContent>
      </Card>
    </div>
  );
}
