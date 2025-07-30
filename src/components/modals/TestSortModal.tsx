import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface TestSortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySort: (sort: any) => void;
}

export function TestSortModal({ isOpen, onClose, onApplySort }: TestSortModalProps) {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleApply = () => {
    onApplySort({ field: sortField, direction: sortDirection });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5" />
            Test Tri
          </DialogTitle>
          <DialogDescription>
            Interface de test pour les fonctionnalités de tri.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Trier par :</label>
            <div className="mt-2 space-y-2">
              {[
                { value: 'date', label: 'Date' },
                { value: 'title', label: 'Titre' },
                { value: 'type', label: 'Type' },
                { value: 'status', label: 'Statut' }
              ].map(option => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="field"
                    value={option.value}
                    checked={sortField === option.value}
                    onChange={(e) => setSortField(e.target.value)}
                    className="form-radio"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Direction :</label>
            <div className="mt-2 flex gap-2">
              <Button
                type="button"
                variant={sortDirection === 'asc' ? 'default' : 'outline'}
                onClick={() => setSortDirection('asc')}
                size="sm"
              >
                Croissant
              </Button>
              <Button
                type="button"
                variant={sortDirection === 'desc' ? 'default' : 'outline'}
                onClick={() => setSortDirection('desc')}
                size="sm"
              >
                Décroissant
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleApply}>
            Appliquer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}