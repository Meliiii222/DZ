import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, ClipboardList, Scan } from "lucide-react";

interface GenerationMethodSelectorProps {
  generationMethod: 'manual' | 'ocr';
  onMethodChange: (method: 'manual' | 'ocr') => void;
}

export function GenerationMethodSelector({
  generationMethod,
  onMethodChange
}: GenerationMethodSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          Méthode de Génération
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant={generationMethod === 'manual' ? 'default' : 'outline'}
            onClick={() => onMethodChange('manual')}
            className="h-20 flex flex-col gap-2"
          >
            <ClipboardList className="w-6 h-6" />
            <span>Génération Manuelle</span>
            <span className="text-xs opacity-80">À partir des modèles prédéfinis</span>
          </Button>
          
          <Button
            variant={generationMethod === 'ocr' ? 'default' : 'outline'}
            onClick={() => onMethodChange('ocr')}
            className="h-20 flex flex-col gap-2"
          >
            <Scan className="w-6 h-6" />
            <span>Génération OCR</span>
            <span className="text-xs opacity-80">À partir d'un document scanné</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}