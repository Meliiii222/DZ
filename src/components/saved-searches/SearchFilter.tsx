
// @ts-nocheck
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { EnhancedInput } from "@/components/common/EnhancedInput";
import { FilterModal } from "@/components/modals/FilterModal";
import { FilterOptions, LegalText } from "@/services/filterService";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  availableData?: LegalText[];
  onFiltersApplied?: (filters: FilterOptions) => void;
}

export function SearchFilter({ searchTerm, onSearchChange, availableData = [], onFiltersApplied }: SearchFilterProps) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <EnhancedInput
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher dans vos recherches sauvegardées..."
              context="search"
              enableVoice={true}
            />
          </div>
          <Button variant="outline" onClick={() => setIsFilterModalOpen(true)}>
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
        </div>
      </CardContent>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={(filters) => onFiltersApplied?.(filters)}
        availableData={availableData}
      />
    </Card>
  );
}
