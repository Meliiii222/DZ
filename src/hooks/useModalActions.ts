
export function useModalActions() {
  const handleFilter = (type: string) => {
    console.log('Filtre appliqué:', type);
    
    // Toast d'information
    const toastEvent = new CustomEvent('show-toast', {
      detail: {
        type: 'info',
        title: 'Filtres',
        description: 'Ouverture du panneau de filtrage'
      }
    });
    window.dispatchEvent(toastEvent);
    
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'filter',
        title: 'Filtres avancés',
        data: { filterType: type }
      }
    });
    window.dispatchEvent(event);
  };

  const handleComparison = (items: Record<string, unknown>[]) => {
    console.log('Comparaison des éléments:', items);
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'comparison',
        title: 'Comparaison d\'éléments',
        data: { items }
      }
    });
    window.dispatchEvent(event);
  };

  const handleFeedback = (type: 'error' | 'feedback' | 'testimonial', context?: string) => {
    console.log('Feedback:', type, context);
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'feedback',
        title: type === 'error' ? 'Signaler une erreur' : 
              type === 'feedback' ? 'Donner un avis' : 'Laisser un témoignage',
        data: { feedbackType: type, context }
      }
    });
    window.dispatchEvent(event);
  };

  const handleAnalysis = (type: string, data: Record<string, unknown>[]) => {
    console.log('Analyse déclenchée:', type, data);
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'analysis',
        title: `Analyse ${type}`,
        data: { analysisType: type, data }
      }
    });
    window.dispatchEvent(event);
  };

  const handleManagement = (entityType: string) => {
    console.log('Gestion d\'entité:', entityType);
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'management',
        title: `Gestion des ${entityType}s`,
        data: { entityType }
      }
    });
    window.dispatchEvent(event);
  };

  return {
    handleFilter,
    handleComparison,
    handleFeedback,
    handleAnalysis,
    handleManagement
  };
}
