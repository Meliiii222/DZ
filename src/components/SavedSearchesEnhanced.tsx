
import { useState } from "react";
import { Star } from "lucide-react";
import { SearchFilter } from "./saved-searches/SearchFilter";
import { StatisticsCards } from "./saved-searches/StatisticsCards";
import { SavedSearchCard } from "./saved-searches/SavedSearchCard";
import { EmptyState } from "./saved-searches/EmptyState";
import { savedSearches } from "./saved-searches/mockData";
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

export function SavedSearchesEnhanced() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSearches = savedSearches.filter(search =>
    search.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    search.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    search.filters.some(filter => filter.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination pour les recherches sauvegardées
  const {
    currentData: paginatedSearches,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredSearches,
    itemsPerPage: 8
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Star className="w-8 h-8 text-yellow-500" />
          Recherches Sauvegardées
        </h2>
        <p className="text-gray-600 text-lg">
          Accédez rapidement à vos recherches juridiques algériennes précédentes
        </p>
      </div>

      <SearchFilter 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />

      <StatisticsCards savedSearches={savedSearches} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {paginatedSearches.length > 0 ? (
          paginatedSearches.map((search) => (
            <SavedSearchCard key={search.id} search={search} />
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState />
          </div>
        )}
      </div>

      {/* Pagination */}
      {paginatedSearches.length > 0 && (
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
      )}
    </div>
  );
}
