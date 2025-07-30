/**
 * Utilitaires DOM sécurisés pour l'application LYO
 * Remplace les usages dangereux d'innerHTML par des alternatives sécurisées
 */

import { log } from './securityLogger';

/**
 * Nettoie et sécurise le contenu HTML contre les attaques XSS
 */
export function sanitizeHTML(html: string): string {
  // Créer un élément temporaire pour nettoyer le HTML
  const temp = document.createElement('div');
  temp.textContent = html;
  
  // Supprimer les scripts et autres éléments dangereux
  const dangerous = ['script', 'iframe', 'object', 'embed', 'form', 'input'];
  let cleaned = temp.innerHTML;
  
  dangerous.forEach(tag => {
    const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, 'gi');
    cleaned = cleaned.replace(regex, '');
    const selfClosing = new RegExp(`<${tag}[^>]*/>`, 'gi');
    cleaned = cleaned.replace(selfClosing, '');
  });
  
  // Supprimer les attributs dangereux
  const dangerousAttrs = ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur'];
  dangerousAttrs.forEach(attr => {
    const regex = new RegExp(`${attr}\\s*=\\s*["'][^"']*["']`, 'gi');
    cleaned = cleaned.replace(regex, '');
  });
  
  // Supprimer les URLs javascript:
  cleaned = cleaned.replace(/javascript:/gi, '');
  
  return cleaned;
}

/**
 * Alternative sécurisée à innerHTML
 */
export function setSecureHTML(element: HTMLElement, html: string): void {
  const sanitized = sanitizeHTML(html);
  element.innerHTML = sanitized;
  
  log.debug('DOM content set securely', { 
    originalLength: html.length, 
    sanitizedLength: sanitized.length 
  }, 'SecureDOM');
}

/**
 * Crée un élément DOM de manière sécurisée
 */
export function createSecureElement(
  tag: string, 
  content?: string, 
  attributes?: Record<string, string>
): HTMLElement {
  const element = document.createElement(tag);
  
  if (content) {
    // Utiliser textContent pour éviter l'injection HTML
    element.textContent = content;
  }
  
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      // Filtrer les attributs dangereux
      const dangerousAttrs = ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur'];
      if (!dangerousAttrs.includes(key.toLowerCase())) {
        // Nettoyer la valeur de l'attribut
        const cleanValue = value.replace(/javascript:/gi, '').replace(/[<>]/g, '');
        element.setAttribute(key, cleanValue);
      }
    });
  }
  
  return element;
}

/**
 * Crée une modal sécurisée
 */
export function createSecureModal(title: string, content: string, className?: string): HTMLElement {
  const modal = createSecureElement('div', '', {
    class: `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className || ''}`,
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'modal-title'
  });

  const modalContent = createSecureElement('div', '', {
    class: 'bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto m-4'
  });

  const modalHeader = createSecureElement('div', '', {
    class: 'flex justify-between items-center mb-4'
  });

  const modalTitle = createSecureElement('h2', title, {
    id: 'modal-title',
    class: 'text-xl font-bold text-gray-900'
  });

  const closeButton = createSecureElement('button', '✕', {
    class: 'text-gray-500 hover:text-gray-700 text-2xl font-bold',
    'aria-label': 'Fermer'
  });

  const modalBody = createSecureElement('div', '', {
    class: 'text-gray-700'
  });

  // Utiliser setSecureHTML pour le contenu
  setSecureHTML(modalBody, content);

  // Assembler la modal
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modal.appendChild(modalContent);

  // Ajouter les event listeners de manière sécurisée
  closeButton.addEventListener('click', () => {
    modal.remove();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  // Gestion de l'échappement
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);

  log.debug('Secure modal created', { title, contentLength: content.length }, 'SecureDOM');

  return modal;
}

/**
 * Affiche une modal sécurisée
 */
export function showSecureModal(title: string, content: string, className?: string): void {
  const modal = createSecureModal(title, content, className);
  document.body.appendChild(modal);
}

/**
 * Nettoie tous les event listeners d'un élément
 */
export function cleanupElement(element: HTMLElement): void {
  // Cloner l'élément pour supprimer tous les event listeners
  const cleanElement = element.cloneNode(true) as HTMLElement;
  element.parentNode?.replaceChild(cleanElement, element);
  
  log.debug('Element cleaned up', { tagName: element.tagName }, 'SecureDOM');
}

/**
 * Valide une URL avant utilisation
 */
export function validateURL(url: string): boolean {
  try {
    const urlObj = new URL(url);
    // Autoriser seulement http, https et mailto
    const allowedProtocols = ['http:', 'https:', 'mailto:'];
    return allowedProtocols.includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * Crée un lien sécurisé
 */
export function createSecureLink(text: string, url: string, target?: string): HTMLAnchorElement {
  const link = document.createElement('a');
  link.textContent = text;
  
  if (validateURL(url)) {
    link.href = url;
    if (target) {
      link.target = target;
      // Ajouter rel="noopener noreferrer" pour la sécurité
      if (target === '_blank') {
        link.rel = 'noopener noreferrer';
      }
    }
  } else {
    log.warn('Invalid URL blocked', { url }, 'SecureDOM');
    link.href = '#';
    link.addEventListener('click', (e) => {
      e.preventDefault();
      log.warn('Blocked click on invalid URL', { url }, 'SecureDOM');
    });
  }
  
  return link;
}

export default {
  sanitizeHTML,
  setSecureHTML,
  createSecureElement,
  createSecureModal,
  showSecureModal,
  cleanupElement,
  validateURL,
  createSecureLink
};