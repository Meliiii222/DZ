
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, SortAsc, Download, Settings, RefreshCw, Plus, Eye } from 'lucide-react';

interface TabFormFieldProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  onSort?: () => void;
  onExport?: () => void;
  onSettings?: () => void;
  onRefresh?: () => void;
  onAdd?: () => void;
  onView?: () => void;
  showActions?: boolean;
}

export function TabFormField({
  placeholder = "Rechercher...",
  onSearch,
  onFilter,
  onSort,
  onExport,
  onSettings,
  onRefresh,
  onAdd,
  onView,
  showActions = true
}: TabFormFieldProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    // Suppression de preventDefault pour éviter de bloquer la navigation
    onSearch?.(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Recherche en temps réel
    onSearch?.(e.target.value);
  };

  const actions = [
    { icon: Plus, label: "Ajouter", onClick: onAdd, variant: "default" as const },
    { icon: Filter, label: "Filtrer", onClick: onFilter, variant: "outline" as const },
    { icon: SortAsc, label: "Trier", onClick: onSort, variant: "outline" as const },
    { icon: Download, label: "Exporter", onClick: onExport, variant: "outline" as const },
    { icon: Eye, label: "Afficher", onClick: onView, variant: "outline" as const },
    { icon: RefreshCw, label: "Actualiser", onClick: onRefresh, variant: "outline" as const },
    { icon: Settings, label: "Paramètres", onClick: onSettings, variant: "outline" as const }
  ];

  return (
    <Card className="mb-6 border-l-4 border-l-blue-500">
      <CardContent className="pt-4">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleInputChange}
                className="pl-10 pr-4 py-2"
              />
            </div>
            {showActions && (
              <div className="flex gap-2 flex-wrap">
                {actions.filter(action => action.onClick).map((action, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant={action.variant}
                    size="sm"
                    onClick={action.onClick}
                    className="gap-2"
                  >
                    <action.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{action.label}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
          
          {/* Badges d'information */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                Interface optimisée
              </Badge>
              <Badge variant="outline" className="text-xs">
                Recherche intelligente
              </Badge>
            </div>
            {searchQuery && (
              <Badge variant="default" className="text-xs">
                Résultats pour: "{searchQuery}"
              </Badge>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
