
// @ts-nocheck
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Eye, Filter, SortAsc } from 'lucide-react';
import { useGlobalActions } from '@/hooks/useGlobalActions';
import { SimpleFilterModal, SimpleFilterOptions } from './modals/SimpleFilterModal';
import { SimpleSortModal, SimpleSortOption } from './modals/SimpleSortModal';

import { FilterOptions, SortOption, LegalText } from '@/services/filterService';

interface LegalTextsSearchActionsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddLegalText?: () => void;
  onOpenApprovalQueue?: () => void;
  availableData?: LegalText[];
  onFiltersApplied?: (filters: FilterOptions) => void;
  onSortApplied?: (sort: SortOption) => void;
  currentFilters?: FilterOptions;
  currentSort?: SortOption;
}

export function LegalTextsSearchActions({
  searchTerm,
  onSearchChange,
  onAddLegalText,
  onOpenApprovalQueue,
  availableData = [],
  onFiltersApplied,
  onSortApplied,
  currentFilters,
  currentSort
}: LegalTextsSearchActionsProps) {
  const actions = useGlobalActions();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);


  
  const handleApprovalQueueClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('File d\'approbation clicked - redirection vers Alimentation de la Banque de Données');
    
    // Dispatcher un événement pour naviguer vers la section d'alimentation
    const event = new CustomEvent('navigate-to-section', {
      detail: 'bank-feeding-legal-approval'
    });
    window.dispatchEvent(event);
  };

  const handleFilter = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFilterModalOpen(true);
  };

  const handleSort = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSortModalOpen(true);
  };

  const handleFiltersApplied = (filters: FilterOptions) => {
    onFiltersApplied?.(filters);
  };

  const handleSortApplied = (sort: SortOption) => {
    onSortApplied?.(sort);
        };

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Ajouter un texte clicked - redirection vers Alimentation de la Banque de Données');
    
    // Dispatcher un événement pour naviguer vers la section d'alimentation
    const event = new CustomEvent('navigate-to-section', {
      detail: 'bank-feeding-legal-enrichment'
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      {/* Barre de recherche */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Rechercher des textes juridiques..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Boutons d'action */}
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={handleFilter} type="button">
          <Filter className="w-4 h-4 mr-2" />
          Filtrer
        </Button>
        
        <Button variant="outline" size="sm" onClick={handleSort} type="button">
          <SortAsc className="w-4 h-4 mr-2" />
          Trier
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleApprovalQueueClick}
          className="bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition-colors"
          type="button"
        >
          <Eye className="w-4 h-4 mr-2" />
          File d'approbation
        </Button>
        
        <Button size="sm" onClick={handleAddClick} className="bg-teal-600 hover:bg-teal-700" type="button">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un texte
        </Button>
      </div>

      {/* Modales */}
      <SimpleFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={(filters) => {
          console.log('✅ Simple Filter Applied:', filters);
          // Convertir SimpleFilterOptions vers FilterOptions
          const convertedFilters: FilterOptions = {
            types: filters.type ? [filters.type] : [],
            statuses: filters.status ? [filters.status] : [],
            dateRange: filters.dateRange ? {
              start: filters.dateRange === '2024' ? '2024-01-01' : 
                     filters.dateRange === '2023' ? '2023-01-01' :
                     filters.dateRange === '2022' ? '2022-01-01' : '',
              end: filters.dateRange === '2024' ? '2024-12-31' :
                   filters.dateRange === '2023' ? '2023-12-31' :
                   filters.dateRange === '2022' ? '2022-12-31' :
                   filters.dateRange === 'before-2022' ? '2021-12-31' : ''
            } : undefined
          };
          handleFiltersApplied(convertedFilters);
        }}
      />

      <SimpleSortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        onApplySort={(sort) => {
          console.log('✅ Simple Sort Applied:', sort);
          handleSortApplied(sort as SortOption);
        }}
      />
    </div>
  );
}
