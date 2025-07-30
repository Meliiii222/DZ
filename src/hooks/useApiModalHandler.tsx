
import { useState } from 'react';

export function useApiModalHandler() {
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiContext, setApiContext] = useState<'legal-texts' | 'procedures' | 'news' | 'library'>('legal-texts');

  const openApiModal = (context: 'legal-texts' | 'procedures' | 'news' | 'library') => {
    setApiContext(context);
    setShowApiModal(true);
  };

  const closeApiModal = () => {
    setShowApiModal(false);
  };

  return {
    showApiModal,
    apiContext,
    openApiModal,
    closeApiModal
  };
}
