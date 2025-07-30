import React, { useState } from 'react';
import { X } from 'lucide-react';

export interface SimpleFilterOptions {
  type?: string;
  status?: string;
  dateRange?: string;
}

interface SimpleFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: SimpleFilterOptions) => void;
}

export function SimpleFilterModal({ isOpen, onClose, onApplyFilters }: SimpleFilterModalProps) {
  const [type, setType] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('');

  if (!isOpen) return null;

  const handleApply = () => {
    const filters: SimpleFilterOptions = {};
    if (type) filters.type = type;
    if (status) filters.status = status;
    if (dateRange) filters.dateRange = dateRange;
    
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setType('');
    setStatus('');
    setDateRange('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filtrer les textes</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          {/* Type de texte */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de texte
            </label>
            <div className="space-y-2">
              {['Loi', 'Ordonnance', 'Décret', 'Arrêté'].map((typeOption) => (
                <label key={typeOption} className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value={typeOption}
                    checked={type === typeOption}
                    onChange={(e) => setType(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{typeOption}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Statut */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <div className="space-y-2">
              {['En vigueur', 'Abrogé', 'Suspendu'].map((statusOption) => (
                <label key={statusOption} className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value={statusOption}
                    checked={status === statusOption}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{statusOption}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Période */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Période
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toutes les périodes</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="before-2022">Avant 2022</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Réinitialiser
          </button>
          <div className="flex gap-2">
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
    </div>
  );
}