import React from 'react';
import { Button } from "@/components/ui/button";
import { ClipboardList, Scan } from 'lucide-react';

interface ProcedureInputMethodSelectorProps {
  inputMethod: 'manual' | 'ocr';
  setInputMethod: (method: 'manual' | 'ocr') => void;
}

export const ProcedureInputMethodSelector: React.FC<ProcedureInputMethodSelectorProps> = ({ inputMethod, setInputMethod }) => (
  <div className="flex justify-center">
    <div className="w-full max-w-md">
      <Button
        type="button"
        variant="default"
        onClick={() => setInputMethod('manual')}
        className="w-full h-20 flex flex-col gap-2"
      >
        <ClipboardList className="w-6 h-6" />
        <span>Insertion Manuelle</span>
        <span className="text-xs opacity-80">Saisie via le formulaire</span>
      </Button>
    </div>
  </div>
);