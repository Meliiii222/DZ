
export function useFormActions() {
  const handleAddLegalText = () => {
    console.log('Ouverture formulaire texte juridique');
    
    // Toast d'information
    const toastEvent = new CustomEvent('show-toast', {
      detail: {
        type: 'info',
        title: 'Nouveau texte juridique',
        description: 'Ouverture du formulaire d\'ajout'
      }
    });
    window.dispatchEvent(toastEvent);
    
    const event = new CustomEvent('open-add-form', {
      detail: { type: 'legal-text' }
    });
    window.dispatchEvent(event);
  };

  const handleAddProcedure = () => {
    console.log('Ouverture formulaire procédure');
    
    // Toast d'information
    const toastEvent = new CustomEvent('show-toast', {
      detail: {
        type: 'info',
        title: 'Nouvelle procédure',
        description: 'Ouverture du formulaire d\'ajout'
      }
    });
    window.dispatchEvent(toastEvent);
    
    const event = new CustomEvent('open-add-form', {
      detail: { type: 'procedure' }
    });
    window.dispatchEvent(event);
  };

  const handleAddNews = () => {
    console.log('Ouverture formulaire actualité');
    const event = new CustomEvent('open-add-form', {
      detail: { type: 'news' }
    });
    window.dispatchEvent(event);
  };

  const handleAddLibraryResource = (resourceType: 'ouvrage' | 'revue' | 'journal' | 'article' | 'video' | 'directory') => {
    console.log('Ouverture formulaire ressource:', resourceType);
    
    const event = new CustomEvent('open-library-form', {
      detail: { resourceType }
    });
    window.dispatchEvent(event);
  };

  return {
    handleAddLegalText,
    handleAddProcedure,
    handleAddNews,
    handleAddLibraryResource
  };
}
