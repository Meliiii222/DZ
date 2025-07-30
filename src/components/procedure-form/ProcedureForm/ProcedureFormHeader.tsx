import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings, ArrowLeft, Wand2 } from 'lucide-react';

interface ProcedureFormHeaderProps {
  onClose: () => void;
  onAutoFill: () => void;
}

export const ProcedureFormHeader: React.FC<ProcedureFormHeaderProps> = ({ onClose, onAutoFill }) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-4">
      <Button variant="outline" onClick={onClose} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Retour
      </Button>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Settings className="w-8 h-8 text-blue-600" />
          Ajouter une nouvelle procédure administrative
        </h1>
        <p className="text-gray-600 mt-1">Configuration complète d'une procédure administrative</p>
      </div>
    </div>
    <Button onClick={onAutoFill} variant="outline" className="gap-2 bg-purple-50 border-purple-200 hover:bg-purple-100">
      <Wand2 className="w-4 h-4 text-purple-600" />
      Auto-remplissage IA
    </Button>
  </div>
);