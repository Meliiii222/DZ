
import React, { useState, useEffect } from 'react';
import { AddLibraryResourceForm } from '@/components/forms/AddLibraryResourceForm';
import { AddDictionnaireJuridiqueForm } from '@/components/forms/AddDictionnaireJuridiqueForm';
import { AddTerminologieSpecialiseeForm } from '@/components/forms/AddTerminologieSpecialiseeForm';

export function LibraryFormHandler() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDictionnaireOpen, setIsDictionnaireOpen] = useState(false);
  const [isTerminologieOpen, setIsTerminologieOpen] = useState(false);
  const [resourceType, setResourceType] = useState<'ouvrage' | 'revue' | 'journal' | 'article' | 'video' | 'directory'>('ouvrage');

  useEffect(() => {
    const handleOpenLibraryForm = (event: CustomEvent) => {
      console.log('Ouverture formulaire bibliothèque:', event.detail);
      const type = event.detail.resourceType;
      
      if (type === 'dictionnaire-juridique') {
        // Formulaire spécialisé pour dictionnaires juridiques
        setIsDictionnaireOpen(true);
      } else if (type === 'terminologie-specialisee') {
        // Formulaire spécialisé pour terminologie spécialisée
        setIsTerminologieOpen(true);
      } else {
        // Formulaire générique pour les autres types
        setResourceType(type);
        setIsOpen(true);
      }
    };

    window.addEventListener('open-library-form', handleOpenLibraryForm as EventListener);

    return () => {
      window.removeEventListener('open-library-form', handleOpenLibraryForm as EventListener);
    };
  }, []);

  return (
    <>
      <AddLibraryResourceForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        resourceType={resourceType}
      />
      
      <AddDictionnaireJuridiqueForm
        isOpen={isDictionnaireOpen}
        onClose={() => setIsDictionnaireOpen(false)}
      />
      
      <AddTerminologieSpecialiseeForm
        isOpen={isTerminologieOpen}
        onClose={() => setIsTerminologieOpen(false)}
      />
    </>
  );
}
