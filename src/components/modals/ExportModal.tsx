
import React, { useState } from 'react';
import { BaseModal } from './core/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, FileText } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Record<string, unknown>[];
  filename: string;
}

export function ExportModal({ isOpen, onClose, data, filename }: ExportModalProps) {
  const [exportConfig, setExportConfig] = useState({
    format: 'xlsx',
    filename: filename,
    includeHeaders: true,
    includeMetadata: false,
    dateRange: 'all'
  });

  const handleExport = () => {
    console.log('Exporting data:', { data, config: exportConfig });
    // Ici, vous implémenteriez la logique d'export réelle
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Exporter les données"
      size="md"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
          <FileText className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-900">
              {data.length} élément(s) à exporter
            </p>
            <p className="text-sm text-blue-600">
              Configurez les options d'export ci-dessous
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="filename">Nom du fichier</Label>
          <Input
            id="filename"
            value={exportConfig.filename}
            onChange={(e) => setExportConfig({...exportConfig, filename: e.target.value})}
            placeholder="Nom du fichier"
          />
        </div>

        <div className="space-y-2">
          <Label>Format d'export</Label>
          <Select value={exportConfig.format} onValueChange={(value) => setExportConfig({...exportConfig, format: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
              <SelectItem value="csv">CSV (.csv)</SelectItem>
              <SelectItem value="json">JSON (.json)</SelectItem>
              <SelectItem value="pdf">PDF (.pdf)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeHeaders"
              checked={exportConfig.includeHeaders}
              onCheckedChange={(checked) => setExportConfig({...exportConfig, includeHeaders: !!checked})}
            />
            <Label htmlFor="includeHeaders">Inclure les en-têtes</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeMetadata"
              checked={exportConfig.includeMetadata}
              onCheckedChange={(checked) => setExportConfig({...exportConfig, includeMetadata: !!checked})}
            />
            <Label htmlFor="includeMetadata">Inclure les métadonnées</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Exporter
        </Button>
      </div>
    </BaseModal>
  );
}
