
import React, { useState, useMemo } from 'react';
import { LegalTextsFilter } from './LegalTextsFilter';
import { LegalTextsInstitutions } from './LegalTextsInstitutions';
import { LegalTextsTypes } from './LegalTextsTypes';
import { LegalTextsFeatured } from './LegalTextsFeatured';
import { LegalTextsTestimonials } from './LegalTextsTestimonials';
import { LegalTextsContribute } from './LegalTextsContribute';
import { LegalTextsStatistics } from './LegalTextsStatistics';
import { LegalTextsSearchActions } from './LegalTextsSearchActions';
import { LegalTextCard } from './LegalTextCard';
import { LegalTextsEmptyState } from './LegalTextsEmptyState';
import { useLegalTextsData } from './hooks/useLegalTextsData';
import { TabSearchField } from '@/components/common/TabSearchField';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilterOptions, SortOption, FilterService, LegalText } from '@/services/filterService';

interface LegalTextsCatalogTabProps {
  onAddLegalText?: () => void;
  onOpenApprovalQueue?: () => void;
}

export function LegalTextsCatalogTab({ onAddLegalText, onOpenApprovalQueue }: LegalTextsCatalogTabProps) {
  const {
    filteredTexts,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters
  } = useLegalTextsData();

  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({});
  const [currentSort, setCurrentSort] = useState<SortOption>({ field: 'date', direction: 'desc' });

  // Convertir les données en format LegalText pour le service de filtrage
  const convertedTexts: any[] = useMemo(() => {
    return filteredTexts.map(text => ({
      id: String(text.id),
      title: text.title,
      type: text.type || 'Loi',
      category: text.category || 'Général',
      publishDate: text.publishDate || new Date().toISOString(),
      description: text.description || '',
      authority: text.authority || 'Non spécifié',
      joNumber: text.joNumber || '',
      status: text.status || 'En vigueur',
      date: new Date(text.date || Date.now()),
      source: text.source || 'Journal Officiel',
      author: text.author || 'République Algérienne',
      insertionMethod: text.insertionMethod || 'manual',
      popularity: text.views || 0,
      ...text
    }));
  }, [filteredTexts]);

  // Appliquer les filtres et le tri
  const processedTexts = useMemo(() => {
    let result = FilterService.applyLegalTextFilters(convertedTexts, currentFilters);
    result = FilterService.applySortOrder(result, currentSort);
    return result;
  }, [convertedTexts, currentFilters, currentSort]);

  const handleFilterChange = (newFilters: { type?: string; status?: string }) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
  };

  const handleFiltersApplied = (filters: FilterOptions) => {
    setCurrentFilters(filters);
    console.log('✅ Advanced filters applied:', filters);
  };

  const handleSortApplied = (sort: SortOption) => {
    setCurrentSort(sort);
    console.log('✅ Sort applied:', sort);
  };

  const handleOpenApprovalQueue = () => {
    console.log('Opening approval queue...');
    if (onOpenApprovalQueue) {
      onOpenApprovalQueue();
    }
  };

  const handleTabSearch = (query: string) => {
    setSearchTerm(query);
    console.log('Tab search:', query);
  };

  // Pagination
  const {
    currentData: paginatedTexts,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: processedTexts,
    itemsPerPage: 10
  });

  return (
    <div className="space-y-6">
      {/* Nouveau champ de recherche avec reconnaissance vocale */}
      <TabSearchField
        placeholder="Rechercher des textes juridiques..."
        onSearch={handleTabSearch}
        suggestions={[
          "Code civil algérien",
          "Loi sur l'investissement 2022",
          "Décret exécutif",
          "Ordonnance présidentielle",
          "Code de procédure civile",
          "Loi de finances",
          "Code pénal",
          "Code du travail"
        ]}
      />

      {/* Statistiques */}
      <LegalTextsStatistics filteredTexts={processedTexts as any} />

      {/* Barre de recherche et boutons d'action avec bouton File d'approbation fonctionnel */}
      <LegalTextsSearchActions
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddLegalText={onAddLegalText}
        onOpenApprovalQueue={handleOpenApprovalQueue}
        availableData={convertedTexts}
        onFiltersApplied={handleFiltersApplied}
        onSortApplied={handleSortApplied}
        currentFilters={currentFilters}
        currentSort={currentSort}
      />

      {/* Filtre avec onglets */}
      <LegalTextsFilter onFilterChange={handleFilterChange} />

      {/* Liste des textes juridiques filtrés avec pagination */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {paginatedTexts.length === 0 ? (
            <div className="col-span-full">
              <LegalTextsEmptyState />
            </div>
          ) : (
            paginatedTexts.map((text) => (
              <LegalTextCard key={text.id} text={text as any} />
            ))
          )}
        </div>

        {/* Pagination */}
        {processedTexts.length > 0 && (
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

      {/* Onglets horizontaux pour les nouvelles sections */}
      <Tabs defaultValue="institutions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="institutions">Institutions</TabsTrigger>
          <TabsTrigger value="types">Types de textes juridiques</TabsTrigger>
          <TabsTrigger value="featured">Textes juridiques en vedette</TabsTrigger>
          <TabsTrigger value="testimonials">Témoignages récents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="institutions" className="mt-6">
          <LegalTextsInstitutions />
        </TabsContent>

        <TabsContent value="types" className="mt-6">
          <LegalTextsTypes />
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <LegalTextsFeatured />
        </TabsContent>

        <TabsContent value="testimonials" className="mt-6">
          <LegalTextsTestimonials />
        </TabsContent>
      </Tabs>

      <LegalTextsContribute onAddLegalText={onAddLegalText} />
    </div>
  );
}
