
import React, { useState } from 'react';
import { Filter, Search, X } from 'lucide-react';
import { UnifiedModal } from '../core/UnifiedModal';
import { FilterModalData } from '../core/ModalConfig';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FilterModalData;
  onFiltersApply: (filters: Record<string, unknown>) => void;
}

export function FilterModal({ isOpen, onClose, data, onFiltersApply }: FilterModalProps) {
  const [filters, setFilters] = useState(data.currentFilters || {});

  const handleApplyFilters = () => {
    onFiltersApply(filters);
    onClose();
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title="Filtres de recherche"
      icon={Filter}
      size="medium"
      id="filter"
      primaryAction={{
        label: 'Appliquer les filtres',
        icon: Search,
        onClick: handleApplyFilters
      }}
      secondaryActions={[
        {
          label: 'Effacer',
          icon: X,
          onClick: handleClearFilters,
          variant: 'outline'
        }
      ]}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="search">Mots-clés</Label>
            <Input
              id="search"
              placeholder="Rechercher..."
              value={filters.keywords || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, keywords: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="type">Type de document</Label>
            <Select
              value={filters.type || ''}
              onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="loi">Loi</SelectItem>
                <SelectItem value="decret">Décret</SelectItem>
                <SelectItem value="arrete">Arrêté</SelectItem>
                <SelectItem value="ordonnance">Ordonnance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="domain">Domaine juridique</Label>
            <Select
              value={filters.domain || ''}
              onValueChange={(value) => setFilters(prev => ({ ...prev, domain: value }))}
            >
              <SelectTrigger id="domain">
                <SelectValue placeholder="Sélectionner un domaine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="commercial">Droit commercial</SelectItem>
                <SelectItem value="civil">Droit civil</SelectItem>
                <SelectItem value="penal">Droit pénal</SelectItem>
                <SelectItem value="administratif">Droit administratif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Options avancées</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recent"
                checked={filters.recentOnly || false}
                onCheckedChange={(checked) => 
                  setFilters(prev => ({ ...prev, recentOnly: checked }))
                }
              />
              <Label htmlFor="recent">Documents récents uniquement</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="official"
                checked={filters.officialOnly || false}
                onCheckedChange={(checked) => 
                  setFilters(prev => ({ ...prev, officialOnly: checked }))
                }
              />
              <Label htmlFor="official">Documents officiels uniquement</Label>
            </div>
          </div>
        </div>
      </div>
    </UnifiedModal>
  );
}
