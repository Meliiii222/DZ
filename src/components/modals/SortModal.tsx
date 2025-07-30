import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SortAsc, SortDesc, ArrowUpDown } from "lucide-react";
import { SortOption } from "@/services/filterService";

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySort: (sortOption: SortOption) => void;
  currentSort?: SortOption;
}

export function SortModal({ 
  isOpen, 
  onClose, 
  onApplySort, 
  currentSort = { field: 'date', direction: 'desc' }
}: SortModalProps) {
  const [sortOption, setSortOption] = useState<SortOption>(currentSort);

  const sortFields = [
    { value: 'date', label: 'Date de publication', description: 'Trier par date de publication' },
    { value: 'title', label: 'Titre', description: 'Trier par ordre alphabétique du titre' },
    { value: 'type', label: 'Type de document', description: 'Trier par type (loi, décret, etc.)' },
    { value: 'status', label: 'Statut', description: 'Trier par statut de validation' },
    { value: 'popularity', label: 'Popularité', description: 'Trier par nombre de consultations' }
  ] as const;

  const handleFieldChange = (field: string) => {
    setSortOption(prev => ({
      ...prev,
      field: field as SortOption['field']
    }));
  };

  const handleDirectionChange = (direction: 'asc' | 'desc') => {
    setSortOption(prev => ({
      ...prev,
      direction
    }));
  };

  const handleApply = () => {
    onApplySort(sortOption);
    onClose();
  };

  const handleReset = () => {
    setSortOption({ field: 'date', direction: 'desc' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5" />
            Options de tri
          </DialogTitle>
          <DialogDescription>
            Choisissez comment vous souhaitez trier les textes juridiques.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Champ de tri */}
          <div>
            <Label className="text-base font-medium mb-3 block">Trier par</Label>
            <RadioGroup 
              value={sortOption.field} 
              onValueChange={handleFieldChange}
              className="space-y-3"
            >
              {sortFields.map(field => (
                <div key={field.value} className="flex items-start space-x-3">
                  <RadioGroupItem 
                    value={field.value} 
                    id={`field-${field.value}`}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={`field-${field.value}`} className="font-medium cursor-pointer">
                      {field.label}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">{field.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Direction du tri */}
          <div>
            <Label className="text-base font-medium mb-3 block">Ordre de tri</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={sortOption.direction === 'asc' ? 'default' : 'outline'}
                onClick={() => handleDirectionChange('asc')}
                className="flex items-center justify-center gap-2"
              >
                <SortAsc className="w-4 h-4" />
                Croissant
              </Button>
              <Button
                variant={sortOption.direction === 'desc' ? 'default' : 'outline'}
                onClick={() => handleDirectionChange('desc')}
                className="flex items-center justify-center gap-2"
              >
                <SortDesc className="w-4 h-4" />
                Décroissant
              </Button>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {sortOption.direction === 'asc' 
                ? 'A → Z, plus ancien → plus récent, moins → plus populaire'
                : 'Z → A, plus récent → plus ancien, plus → moins populaire'
              }
            </p>
          </div>

          {/* Aperçu */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <Label className="text-sm font-medium">Aperçu du tri :</Label>
            <p className="text-sm text-gray-700 mt-1">
              {sortFields.find(f => f.value === sortOption.field)?.label} - {' '}
              {sortOption.direction === 'asc' ? 'Croissant' : 'Décroissant'}
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Réinitialiser
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleApply}>
              Appliquer le tri
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}