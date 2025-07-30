
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useAIAutoFill() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [context, setContext] = useState<'legal-text' | 'procedure' | 'general'>('general');
  const { toast } = useToast();

  const openModal = useCallback((modalContext: 'legal-text' | 'procedure' | 'general' = 'general') => {
    setContext(modalContext);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleDataGenerated = useCallback((data: Record<string, unknown>) => {
    console.log('AI Generated data:', data);
    
    // Dispatch custom event with generated data
    const event = new CustomEvent('ai-data-generated', {
      detail: { data, context }
    });
    window.dispatchEvent(event);

    toast({
      title: "Données générées",
      description: "Les données ont été générées et peuvent être utilisées pour remplir le formulaire.",
    });
  }, [context, toast]);

  return {
    isModalOpen,
    context,
    openModal,
    closeModal,
    handleDataGenerated
  };
}
