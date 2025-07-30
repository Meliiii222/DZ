import React, { useState } from 'react';
import { X, ArrowUp, ArrowDown } from 'lucide-react';

export interface SimpleSortOption {
  field: string;
  direction: 'asc' | 'desc';
}

interface SimpleSortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySort: (sort: SimpleSortOption) => void;
}

export function SimpleSortModal({ isOpen, onClose, onApplySort }: SimpleSortModalProps) {
  const [field, setField] = useState<string>('date');
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc');

  if (!isOpen) return null;

  const handleApply = () => {
    onApplySort({ field, direction });
    onClose();
  };

  const sortFields = [
    { value: 'date', label: 'Date de publication' },
    { value: 'title', label: 'Titre' },
    { value: 'type', label: 'Type de texte' },
    { value: 'status', label: 'Statut' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Trier les textes</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sort Options */}
        <div className="space-y-4">
          {/* Champ de tri */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trier par
            </label>
            <div className="space-y-2">
              {sortFields.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="field"
                    value={option.value}
                    checked={field === option.value}
                    onChange={(e) => setField(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Direction du tri */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordre
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="direction"
                  value="desc"
                  checked={direction === 'desc'}
                  onChange={(e) => setDirection(e.target.value as 'asc' | 'desc')}
                  className="mr-2"
                />
                <ArrowDown className="w-4 h-4 mr-1" />
                <span className="text-sm text-gray-700">Décroissant (Z-A, récent-ancien)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="direction"
                  value="asc"
                  checked={direction === 'asc'}
                  onChange={(e) => setDirection(e.target.value as 'asc' | 'desc')}
                  className="mr-2"
                />
                <ArrowUp className="w-4 h-4 mr-1" />
                <span className="text-sm text-gray-700">Croissant (A-Z, ancien-récent)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
}