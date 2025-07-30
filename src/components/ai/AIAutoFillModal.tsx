
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AIAutoFillForm } from './AIAutoFillForm';
import { AIAutoFillFeatures } from './AIAutoFillFeatures';
import { AIAutoFillActions } from './AIAutoFillActions';

interface AIAutoFillModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: 'legal-text' | 'procedure' | 'general';
  onDataGenerated?: (data: Record<string, unknown>) => void;
}

export function AIAutoFillModal({ isOpen, onClose, context = 'general', onDataGenerated }: AIAutoFillModalProps) {
  const { toast } = useToast();
  const [formType, setFormType] = useState<'legal-text' | 'procedure' | 'general'>(context);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormTypeChange = (value: string) => {
    setFormType(value as 'legal-text' | 'procedure' | 'general');
  };

  const generateMockData = (type: string, userPrompt: string) => {
    const mockData = {
      'legal-text': {
        title: "Loi relative aux procédures administratives",
        content: "Contenu généré automatiquement basé sur votre description...",
        category: "Droit administratif",
        keywords: ["procédures", "administratif", "réglementation"],
        references: ["Journal Officiel n°45", "Décret n°21-234"]
      },
      'procedure': {
        name: "Demande de certificat de résidence",
        category: "Documents administratifs",
        institution: "Mairie",
        duration: "5 jours ouvrables",
        cost: "500 DA",
        description: "Procédure générée automatiquement pour obtenir un certificat de résidence...",
        requirements: ["Carte d'identité", "Justificatif de domicile", "Formulaire de demande"],
        steps: ["Retirer le formulaire", "Compléter le dossier", "Déposer la demande", "Récupérer le certificat"]
      },
      'general': {
        content: "Contenu généré basé sur votre description...",
        suggestions: ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
      }
    };

    return mockData[type as keyof typeof mockData] || mockData.general;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une description pour l'auto-remplissage.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulation de génération IA
    setTimeout(() => {
      const generatedData = generateMockData(formType, prompt);
      
      setIsGenerating(false);
      toast({
        title: "Auto-remplissage généré",
        description: "Les données ont été générées avec succès. Elles seront appliquées au formulaire.",
      });
      
      if (onDataGenerated) {
        onDataGenerated(generatedData);
      }
      
      onClose();
    }, 3000);
  };

  const handleClose = () => {
    setPrompt('');
    setIsGenerating(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-600" />
            Auto-remplissage IA
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <AIAutoFillForm
            formType={formType}
            prompt={prompt}
            onFormTypeChange={handleFormTypeChange}
            onPromptChange={setPrompt}
          />

          <AIAutoFillFeatures />

          <AIAutoFillActions
            isGenerating={isGenerating}
            onCancel={handleClose}
            onGenerate={handleGenerate}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
