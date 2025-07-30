
// @ts-nocheck
import React from 'react';
import { GitCompare, Download, Eye } from 'lucide-react';
import { UnifiedModal } from '../core/UnifiedModal';
import { ComparisonModalData } from '../core/ModalConfig';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ComparisonModalData;
  onExport?: (items: Record<string, unknown>[]) => void;
}

export function ComparisonModal({ isOpen, onClose, data, onExport }: ComparisonModalProps) {
  const handleExport = () => {
    onExport?.(data?.items || []);
  };

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title="Comparaison des éléments"
      icon={GitCompare}
      size="xl"
      id="comparison"
      primaryAction={{
        label: 'Exporter la comparaison',
        icon: Download,
        onClick: handleExport
      }}
    >
      <div className="space-y-4">
        <div className="text-sm text-gray-600 mb-4">
          Comparaison de {data?.items?.length || 0} éléments
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {(data?.items || []).map((item, index) => (
            <Card key={index} className="border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{item.title || `Élément ${index + 1}`}</CardTitle>
                  <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                    {item.status || 'N/A'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Type: </span>
                  {item.type || 'Non spécifié'}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Date: </span>
                  {item.date ? new Date(item.date).toLocaleDateString('fr-FR') : 'N/A'}
                </div>
                {item.description && (
                  <div className="text-sm">
                    <span className="font-medium">Description: </span>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </UnifiedModal>
  );
}
