
import { useState } from 'react';

interface UseOCRHandlerProps {
  onAddProcedure?: () => void;
}

export function useOCRHandler({ onAddProcedure }: UseOCRHandlerProps = {}) {
  const [ocrExtractedText, setOcrExtractedText] = useState<string>('');

  const handleOCRTextExtracted = (text: string) => {
    console.log('Texte OCR reçu dans ProceduresTabs:', text);
    setOcrExtractedText(text);
    // Rediriger vers le formulaire avec le texte OCR
    if (onAddProcedure) {
      onAddProcedure();
    }
  };

  return {
    ocrExtractedText,
    handleOCRTextExtracted
  };
}
