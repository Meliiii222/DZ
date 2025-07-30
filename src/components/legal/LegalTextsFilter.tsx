
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LegalTextsFilterProps {
  onFilterChange: (filters: { type?: string; status?: string }) => void;
}

export function LegalTextsFilter({ onFilterChange }: LegalTextsFilterProps) {
  const [activeTab, setActiveTab] = useState<'type' | 'status'>('type');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const types = [
    { id: 'all', label: 'Tous', color: 'bg-teal-600' },
    { id: 'Loi', label: 'Loi', color: 'bg-gray-600' },
    { id: 'Ordonnance', label: 'Ordonnance', color: 'bg-gray-600' },
    { id: 'Décret', label: 'Décret', color: 'bg-gray-600' },
    { id: 'Arrêté', label: 'Arrêté', color: 'bg-gray-600' },
    { id: 'Instruction', label: 'Instruction', color: 'bg-gray-600' }
  ];

  const statuses = [
    { id: 'all', label: 'Tous', color: 'bg-gray-600' },
    { id: 'En vigueur', label: 'En vigueur', color: 'bg-green-600' },
    { id: 'Suspendu', label: 'Suspendu', color: 'bg-yellow-600' },
    { id: 'Abrogé', label: 'Abrogé', color: 'bg-red-600' }
  ];

  const handleTypeSelect = (typeId: string) => {
    const type = typeId === 'all' ? null : typeId;
    setSelectedType(type);
    onFilterChange({ type, status: selectedStatus });
  };

  const handleStatusSelect = (statusId: string) => {
    const status = statusId === 'all' ? null : statusId;
    setSelectedStatus(status);
    onFilterChange({ type: selectedType, status });
  };

  const getTabButtonClass = (tab: 'type' | 'status') => {
    const isActive = activeTab === tab;
    return `px-6 py-2 rounded-l-lg font-medium transition-colors ${
      isActive 
        ? 'bg-emerald-600 text-white' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`;
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-4">
        <div className="flex flex-col gap-4">
          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => setActiveTab('type')}
              className={getTabButtonClass('type')}
            >
              Type
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`px-6 py-2 rounded-r-lg font-medium transition-colors ${
                activeTab === 'status' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Statut
            </button>
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap gap-2">
            {activeTab === 'type' && types.map((type) => (
              <Badge
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-sm ${
                  selectedType === type.id || (selectedType === null && type.id === 'all')
                    ? `${type.color} text-white hover:opacity-80`
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleTypeSelect(type.id)}
              >
                {type.label}
              </Badge>
            ))}
            
            {activeTab === 'status' && statuses.map((status) => (
              <Badge
                key={status.id}
                variant={selectedStatus === status.id ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-sm ${
                  selectedStatus === status.id || (selectedStatus === null && status.id === 'all')
                    ? `${status.color} text-white hover:opacity-80`
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleStatusSelect(status.id)}
              >
                {status.label}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
