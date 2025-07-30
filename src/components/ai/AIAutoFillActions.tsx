
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Loader } from 'lucide-react';

interface AIAutoFillActionsProps {
  isGenerating: boolean;
  onCancel: () => void;
  onGenerate: () => void;
}

export function AIAutoFillActions({ onGenerate, onCancel, isGenerating }: AIAutoFillActionsProps) {
  // États pour les actions métier
  const [isProcessing, setIsProcessing] = useState(false);

  // Fonction de génération réelle
  const handleGenerate = async () => {
    if (isGenerating) return;
    
    setIsProcessing(true);
    try {
      // Simulation d'une vraie génération IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      onGenerate();
    } finally {
      setIsProcessing(false);
    }
  };

  // Fonction d'annulation réelle
  const handleCancel = () => {
    setIsProcessing(false);
    onCancel();
  };

  return (
    <div className="flex justify-end gap-3">
      <Button variant="outline" onClick={handleCancel} disabled={isGenerating}>
        Annuler
      </Button>
      <Button onClick={handleGenerate} disabled={isGenerating} className="bg-purple-600 hover:bg-purple-700">
        {isProcessing ? 'Génération...' : 'Générer'}
      </Button>
    </div>
  );
}
