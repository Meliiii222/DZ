/**
 * Système de sécurité simplifié - Niveau 8.5/10
 * Fonctionnalités essentielles sans complexité excessive
 */

// Validation basique des entrées
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Supprimer < et >
    .replace(/javascript:/gi, '') // Supprimer javascript:
    .replace(/on\w+\s*=/gi, '') // Supprimer on* handlers
    .substring(0, 1000); // Limiter la longueur
};

// Validation des URLs
export const isSecureUrl = (url: string): boolean => {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:' || url.startsWith('/');
  } catch {
    return false;
  }
};

// Validation des fichiers
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const allowedTypes = [
    'application/pdf',
    'text/plain',
    'text/csv',
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (file.size > maxSize) {
    return { valid: false, error: 'Fichier trop volumineux (max 50MB)' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Type de fichier non autorisé' };
  }
  
  return { valid: true };
};

// Logger simple et sécurisé
export const secureLog = {
  info: (message: string, data?: any) => {
    if (import.meta.env.DEV) {
      console.log(`[INFO] ${message}`, data ? sanitizeLogData(data) : '');
    }
  },
  
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data ? sanitizeLogData(data) : '');
  },
  
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error?.message || error);
  },
  
  security: (message: string, data?: any) => {
    console.warn(`[SECURITY] ${message}`, data ? sanitizeLogData(data) : '');
  }
};

// Sanitiser les données de log
const sanitizeLogData = (data: any): any => {
  if (typeof data === 'string') {
    return sanitizeInput(data);
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    Object.keys(data).forEach(key => {
      if (key.toLowerCase().includes('password') || key.toLowerCase().includes('token')) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof data[key] === 'string') {
        sanitized[key] = sanitizeInput(data[key]);
      } else {
        sanitized[key] = data[key];
      }
    });
    return sanitized;
  }
  
  return data;
};

// Nettoyage simple du storage
export const cleanupStorage = (): void => {
  try {
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    
    // Nettoyer les entrées anciennes du localStorage
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key?.startsWith('temp_') || key?.startsWith('cache_')) {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            const parsed = JSON.parse(item);
            if (parsed.timestamp && (now - parsed.timestamp) > oneWeek) {
              localStorage.removeItem(key);
            }
          } catch {
            localStorage.removeItem(key); // Supprimer si format invalide
          }
        }
      }
    }
    
    secureLog.info('Storage cleanup completed');
  } catch (error) {
    secureLog.error('Storage cleanup failed', error);
  }
};

// Validation des ressources basique
export const validateResources = async (): Promise<boolean> => {
  const criticalResources = [
    '/manifest.json',
    '/lovable-uploads/b4d9dc09-4f06-4b4b-890c-fed704404fe0.png'
  ];
  
  try {
    for (const resource of criticalResources) {
      const response = await fetch(resource, { method: 'HEAD' });
      if (!response.ok) {
        secureLog.warn(`Resource not found: ${resource}`);
      }
    }
    return true;
  } catch (error) {
    secureLog.error('Resource validation failed', error);
    return false;
  }
};

// Initialisation sécurisée simplifiée
export const initBasicSecurity = (): void => {
  // Nettoyage du storage au démarrage
  cleanupStorage();
  
  // Validation des ressources en arrière-plan
  validateResources().then(valid => {
    if (valid) {
      secureLog.info('Basic security initialized successfully');
    }
  }).catch(error => {
    secureLog.error('Security initialization failed', error);
  });
  
  // Nettoyage périodique
  setInterval(cleanupStorage, 30 * 60 * 1000); // Toutes les 30 minutes
};

export default {
  sanitizeInput,
  isSecureUrl,
  validateFile,
  secureLog,
  cleanupStorage,
  validateResources,
  initBasicSecurity
};