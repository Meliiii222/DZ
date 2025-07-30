import React, { useState, useEffect } from 'react';
import { EnhancedAIAutoFillModal } from './EnhancedAIAutoFillModal';

export function AIAutoFillGlobalManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<'legal-text' | 'procedure' | 'general'>('general');

  useEffect(() => {
    const handleOpenAIAutoFill = (event: CustomEvent) => {
      const { context: eventContext } = event.detail || {};
      setContext(eventContext || 'general');
      setIsOpen(true);
    };

    window.addEventListener('open-ai-autofill', handleOpenAIAutoFill as EventListener);

    return () => {
      window.removeEventListener('open-ai-autofill', handleOpenAIAutoFill as EventListener);
    };
  }, []);

  const handleDataGenerated = (data: Record<string, unknown>) => {
    // Dispatch event avec les données générées
    const event = new CustomEvent('ai-data-generated', {
      detail: { data, context }
    });
    window.dispatchEvent(event);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <EnhancedAIAutoFillModal
      isOpen={isOpen}
      onClose={handleClose}
      context={context}
      onDataGenerated={handleDataGenerated}
    />
  );
}