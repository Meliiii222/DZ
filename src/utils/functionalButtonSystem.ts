// Système automatique pour rendre tous les boutons et liens fonctionnels
import { openFunctionalModal } from '@/components/modals/FunctionalModalSystem';

interface ButtonMapping {
  keywords: string[];
  type: string;
  action?: string;
}

// Mappings pour identifier le type d'action selon le texte du bouton
const buttonMappings: ButtonMapping[] = [
  // Guides et documentation
  {
    keywords: ['guide', 'consulter', 'voir guide', 'lire guide', 'documentation'],
    type: 'guide'
  },
  
  // Formulaires
  {
    keywords: ['formulaire', 'télécharger formulaire', 'obtenir formulaire', 'form'],
    type: 'formulaire'
  },
  
  // Téléchargements
  {
    keywords: ['télécharger', 'download', 'télécharger pdf', 'télécharger doc'],
    type: 'document'
  },
  
  // Modèles et templates
  {
    keywords: ['modèle', 'template', 'utiliser modèle', 'appliquer modèle'],
    type: 'template'
  },
  
  // Procédures
  {
    keywords: ['procédure', 'voir procédure', 'consulter procédure', 'détails procédure'],
    type: 'procedure'
  },
  
  // Ressources
  {
    keywords: ['ressource', 'ressources', 'voir ressources', 'accéder ressources'],
    type: 'resource'
  },
  
  // Vidéos et tutoriels
  {
    keywords: ['vidéo', 'tutoriel', 'voir vidéo', 'regarder', 'lecture'],
    type: 'video'
  },
  
  // Recherche
  {
    keywords: ['rechercher', 'search', 'recherche', 'lancer recherche'],
    type: 'search'
  },
  
  // Filtres
  {
    keywords: ['filtrer', 'filter', 'filtre', 'filtres', 'affiner'],
    type: 'filter'
  },
  
  // Configuration
  {
    keywords: ['configuration', 'paramètres', 'settings', 'configurer'],
    type: 'settings'
  },
  
  // Actions générales
  {
    keywords: ['exporter', 'export', 'partager', 'share'],
    type: 'document'
  }
];

// Fonction pour déterminer le type d'action selon le texte
function determineActionType(text: string): string {
  const lowerText = text.toLowerCase();
  
  for (const mapping of buttonMappings) {
    for (const keyword of mapping.keywords) {
      if (lowerText.includes(keyword)) {
        return mapping.type;
      }
    }
  }
  
  // Type par défaut
  return 'document';
}

// Fonction pour extraire le contexte depuis le texte du bouton
function extractContext(text: string, element?: HTMLElement): any {
  const context: any = {
    title: text
  };
  
  // Chercher dans les éléments parents pour plus de contexte
  if (element) {
    let parent = element.parentElement;
    let searchDepth = 0;
    
    while (parent && searchDepth < 5) {
      // Chercher des titres ou descriptions
      const titleElement = parent.querySelector('h1, h2, h3, h4, h5, h6');
      const descElement = parent.querySelector('p, .description, [data-description]');
      
      if (titleElement && !context.parentTitle) {
        context.parentTitle = titleElement.textContent?.trim();
      }
      
      if (descElement && !context.description) {
        context.description = descElement.textContent?.trim();
      }
      
      // Chercher des attributs data-*
      if (parent.dataset) {
        Object.keys(parent.dataset).forEach(key => {
          if (!context[key]) {
            context[key] = parent.dataset[key];
          }
        });
      }
      
      parent = parent.parentElement;
      searchDepth++;
    }
  }
  
  return context;
}

// Fonction pour créer un handler fonctionnel
function createFunctionalHandler(button: HTMLElement): () => void {
  const text = button.textContent?.trim() || '';
  const actionType = determineActionType(text);
  const context = extractContext(text, button);
  
  return () => {
    // Désactiver temporairement le bouton pour éviter les doubles clics
    button.style.opacity = '0.7';
    button.style.pointerEvents = 'none';
    
    setTimeout(() => {
      button.style.opacity = '';
      button.style.pointerEvents = '';
    }, 1000);
    
    // Ouvrir la modal appropriée
    openFunctionalModal(actionType, context);
  };
}

// Fonction pour identifier si un bouton/lien n'est pas fonctionnel
function isNonFunctional(element: HTMLElement): boolean {
  const tag = element.tagName.toLowerCase();
  
  // Vérifier si c'est un bouton ou un lien
  if (tag !== 'button' && tag !== 'a') {
    return false;
  }
  
  // Exclure les éléments avec des redirections internes fonctionnelles
  const href = element.getAttribute('href');
  if (href && (href.startsWith('/') || href.startsWith('#'))) {
    return false; // Lien interne fonctionnel
  }
  
  // Exclure les boutons avec des onClick déjà fonctionnels
  const onClick = element.getAttribute('onclick');
  if (onClick && onClick.includes('navigate') || onClick && onClick.includes('window.location')) {
    return false; // Navigation fonctionnelle
  }
  
  // Exclure l'AccountDropdown et éléments spécifiques
  const classes = element.className || '';
  const id = element.id || '';
  
  if (classes.includes('account-dropdown') || 
      id.includes('account') ||
      classes.includes('navigation') ||
      element.closest('[data-exclude-functional]')) {
    return false;
  }
  
  // Exclure les liens vers les formulaires d'ajout (déjà fonctionnels)
  const text = element.textContent?.toLowerCase() || '';
  if (text.includes('ajouter un texte') || 
      text.includes('ajouter une procédure') ||
      text.includes('file d\'approbation')) {
    return false;
  }
  
  // Exclure les onglets
  if (element.closest('[role="tab"]') || 
      element.closest('.tabs') ||
      classes.includes('tab')) {
    return false;
  }
  
  // Vérifier si l'élément a déjà un gestionnaire d'événement React
  const reactKey = Object.keys(element).find(key => key.startsWith('__reactInternalInstance') || key.startsWith('__reactFiber'));
  if (reactKey) {
    const reactInstance = (element as any)[reactKey];
    if (reactInstance?.memoizedProps?.onClick) {
      return false; // A déjà un onClick React fonctionnel
    }
  }
  
  return true;
}

// Fonction principale pour rendre tous les boutons fonctionnels
export function makeFunctionalButtons(): void {
  // Attendre que le DOM soit complètement chargé
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', makeFunctionalButtons);
    return;
  }
  
  let processedCount = 0;
  
  // Sélectionner tous les boutons et liens
  const buttons = document.querySelectorAll('button, a');
  
  buttons.forEach((element) => {
    const htmlElement = element as HTMLElement;
    
    // Vérifier si l'élément n'est pas fonctionnel
    if (isNonFunctional(htmlElement)) {
      // Vérifier qu'il n'a pas déjà été traité
      if (!htmlElement.dataset.functionalHandlerAdded) {
        // Ajouter le gestionnaire fonctionnel
        const handler = createFunctionalHandler(htmlElement);
        htmlElement.addEventListener('click', handler);
        
        // Marquer comme traité
        htmlElement.dataset.functionalHandlerAdded = 'true';
        
        // Ajouter un style visuel subtil pour indiquer la fonctionnalité
        htmlElement.style.cursor = 'pointer';
        htmlElement.title = htmlElement.title || `Action: ${htmlElement.textContent?.trim()}`;
        
        processedCount++;
      }
    }
  });
  
  console.log(`🎯 Système fonctionnel: ${processedCount} boutons/liens rendus opérationnels`);
}

// Observer pour les nouveaux éléments ajoutés dynamiquement
export function observeNewElements(): void {
  const observer = new MutationObserver((mutations) => {
    let hasNewButtons = false;
    
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            
            // Vérifier si c'est un bouton/lien ou contient des boutons/liens
            if (element.tagName === 'BUTTON' || element.tagName === 'A' ||
                element.querySelectorAll('button, a').length > 0) {
              hasNewButtons = true;
            }
          }
        });
      }
    });
    
    if (hasNewButtons) {
      // Délai court pour laisser React finir ses mises à jour
      setTimeout(makeFunctionalButtons, 100);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Fonction d'initialisation
export function initializeFunctionalSystem(): void {
  // Traitement initial
  makeFunctionalButtons();
  
  // Observer les nouveaux éléments
  observeNewElements();
  
  // Re-traitement périodique pour s'assurer que rien n'est manqué
  setInterval(makeFunctionalButtons, 5000);
  
  console.log('🚀 Système de boutons fonctionnels initialisé');
}

// Types pour les événements personnalisés
declare global {
  interface WindowEventMap {
    'open-functional-modal': CustomEvent<{type: string, context: any}>;
  }
}