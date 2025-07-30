import React from 'react';
import { Scan } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ScannerInterfaceProps {
  onScan: (document: File) => void;
  onClose: () => void;
}

export function ScannerInterface({ onScan, onClose }: ScannerInterfaceProps) {
  const handleScan = () => {
    // Simuler un scan de document
    const mockFile = new File(['mock document content'], 'scanned_document.pdf', {
      type: 'application/pdf'
    });
    onScan(mockFile);
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <Scan className="w-16 h-16 mx-auto text-gray-400" />
          <h3 className="text-lg font-semibold">Interface Scanner</h3>
          <p className="text-gray-600">
            Fonctionnalité de scanner en développement
          </p>
          <div className="space-y-2">
            <Button onClick={handleScan} className="w-full">
              Simuler Scan
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Fermer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}