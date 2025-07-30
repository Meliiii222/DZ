import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CalendarIcon, FilterIcon, X } from "lucide-react";
import { FilterOptions, LegalText, FilterService } from "@/services/filterService";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  availableData: LegalText[];
  currentFilters?: FilterOptions;
}

export function FilterModal({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  availableData, 
  currentFilters = {} 
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);
  const [availableFilters, setAvailableFilters] = useState({
    types: [] as string[],
    statuses: [] as string[],
    sources: [] as string[],
    authors: [] as string[],
    insertionMethods: [] as string[]
  });

  useEffect(() => {
    if (availableData.length > 0) {
      setAvailableFilters(FilterService.getAvailableFilters(availableData));
    }
  }, [availableData]);

  const handleCheckboxChange = (category: keyof FilterOptions, value: string, checked: boolean) => {
    setFilters(prev => {
      const currentArray = (prev[category] as string[]) || [];
      if (checked) {
        return {
          ...prev,
          [category]: [...currentArray, value]
        };
      } else {
        return {
          ...prev,
          [category]: currentArray.filter(item => item !== value)
        };
      }
    });
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: new Date(value)
      } as { start: Date; end: Date }
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({});
  };

  const isChecked = (category: keyof FilterOptions, value: string): boolean => {
    const array = filters[category] as string[];
    return array ? array.includes(value) : false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FilterIcon className="w-5 h-5" />
            Filtrer les textes juridiques
          </DialogTitle>
          <DialogDescription>
            Sélectionnez les critères pour filtrer les textes juridiques selon vos besoins.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Types de documents */}
          <div>
            <Label className="text-base font-medium">Type de document</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {availableFilters.types.map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`type-${type}`}
                    checked={isChecked('type', type)}
                    onCheckedChange={(checked) => handleCheckboxChange('type', type, !!checked)}
                  />
                  <Label htmlFor={`type-${type}`} className="text-sm">{type}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Statuts */}
          <div>
            <Label className="text-base font-medium">Statut</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {availableFilters.statuses.map(status => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`status-${status}`}
                    checked={isChecked('status', status)}
                    onCheckedChange={(checked) => handleCheckboxChange('status', status, !!checked)}
                  />
                  <Label htmlFor={`status-${status}`} className="text-sm">{status}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Méthode d'insertion */}
          <div>
            <Label className="text-base font-medium">Méthode d'insertion</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {availableFilters.insertionMethods.map(method => (
                <div key={method} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`method-${method}`}
                    checked={isChecked('insertionMethod', method)}
                    onCheckedChange={(checked) => handleCheckboxChange('insertionMethod', method, !!checked)}
                  />
                  <Label htmlFor={`method-${method}`} className="text-sm">
                    {method === 'manual' ? 'Saisie manuelle' : method === 'ocr' ? 'OCR' : method}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Plage de dates */}
          <div>
            <Label className="text-base font-medium">Plage de dates</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="date-start" className="text-sm">Date de début</Label>
                <Input
                  id="date-start"
                  type="date"
                  value={filters.dateRange?.start ? filters.dateRange.start.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="date-end" className="text-sm">Date de fin</Label>
                <Input
                  id="date-end"
                  type="date"
                  value={filters.dateRange?.end ? filters.dateRange.end.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Sources */}
          {availableFilters.sources.length > 0 && (
            <div>
              <Label className="text-base font-medium">Source</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableFilters.sources.map(source => (
                  <div key={source} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`source-${source}`}
                      checked={isChecked('source', source)}
                      onCheckedChange={(checked) => handleCheckboxChange('source', source, !!checked)}
                    />
                    <Label htmlFor={`source-${source}`} className="text-sm">{source}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            <X className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleApply}>
              Appliquer les filtres
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}