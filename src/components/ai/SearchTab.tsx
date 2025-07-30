
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { TabFormField } from '@/components/common/TabFormField';

export function SearchTab() {
  return (
    <div className="space-y-6">
      <TabFormField
        placeholder="Recherche IA avancée..."
        onSearch={(query) => console.log('Recherche IA avancée:', query)}
        onAdd={() => console.log('Nouvelle recherche')}
        onFilter={() => console.log('Filtrer recherches')}
        onSort={() => console.log('Trier recherches')}
        onExport={() => console.log('Exporter recherches')}
        onRefresh={() => console.log('Actualiser recherche IA')}
        showActions={true}
      />
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Recherche IA Avancée</h3>
            <p className="text-gray-600">Fonctionnalités de recherche intelligente avec IA</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
