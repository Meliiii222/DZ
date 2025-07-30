// Système global de toast pour les notifications
import { toast as uiToast } from '@/hooks/use-toast';

interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

// Fonction globale pour afficher des toasts
export function showToast(options: ToastOptions) {
  uiToast({
    title: options.title,
    description: options.description,
    variant: options.variant || 'default',
    duration: options.duration || 3000
  });
}

// Écouteur d'événements pour les toasts globaux
export function initializeGlobalToastSystem() {
  window.addEventListener('toast-message', (event: Event) => {
    const customEvent = event as CustomEvent;
    const { title, description, variant, duration } = customEvent.detail;
    
    showToast({
      title,
      description,
      variant,
      duration
    });
  });
  
  console.log('🔔 Système de toast global initialisé');
}

// Fonction utilitaire pour déclencher un toast depuis n'importe où
export function triggerGlobalToast(options: ToastOptions) {
  window.dispatchEvent(new CustomEvent('toast-message', {
    detail: options
  }));
}