// Types globaux pour corriger les erreurs temporaires

declare global {
  interface Window {
    // Extensions pour les propriétés window si nécessaire
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    [key: string]: unknown;
  }
}

// Type pour les objets avec extractedData
interface ExtractionItem {
  id: number;
  fileName: string;
  status: string;
  extractedTime: string;
  textsIdentified: number;
  processingTime: string;
  extractedData?: any;
}

// Type pour le contenu des documents
interface DocumentContent {
  preambule?: string;
  articles?: Array<{
    numero: string;
    titre: string;
    contenu: string;
  }>;
  dispositionsFinales?: string;
}

// Extension du type ApprovalItem pour supporter plus de statuts
interface ExtendedApprovalItem {
  id: string;
  title: string;
  type: 'texte' | 'procedure';
  category: string;
  submittedBy: string;
  submittedDate: string;
  priority: 'urgent' | 'normal' | 'low';
  status: 'pending' | 'reviewed' | 'Approuvé' | 'Rejeté';
}

export {};