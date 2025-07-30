
/**
 * Configuration centralisée pour le système de modales unifié
 */
import { LucideIcon } from 'lucide-react';

export interface UnifiedModalConfig {
  id: string;
  title: string;
  icon?: LucideIcon;
  size?: 'small' | 'medium' | 'large' | 'xl' | 'full';
  preventClose?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export interface ModalAction {
  label: string;
  variant?: 'default' | 'outline' | 'destructive' | 'secondary';
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
}

export interface UnifiedModalProps extends UnifiedModalConfig {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  primaryAction?: ModalAction;
  secondaryActions?: ModalAction[];
  onError?: (error: string) => void;
}

// Types pour les modales spécialisées
export interface PDFViewerModalData {
  title: string;
  pdfUrl?: string;
  document?: Record<string, unknown>;
}

export interface ComparisonModalData {
  items: Record<string, unknown>[];
  type?: 'legal' | 'procedure';
}

export interface FilterModalData {
  type: 'legal' | 'procedure' | 'general';
  currentFilters?: Record<string, any>;
}

export interface ExportModalData {
  data: Record<string, unknown>[];
  filename: string;
  format?: 'pdf' | 'excel' | 'csv';
}

export interface FeedbackModalData {
  type: 'error' | 'feedback' | 'testimonial';
  itemTitle?: string;
  context?: string;
}
