
import { LucideIcon } from 'lucide-react';

export type ActionType = 
  | 'lire' | 'pdf' | 'partager' | 'filtres' | 'voir' | 'télécharger'
  | 'consulter' | 'comparer' | 'rapport' | 'signaler' | 'avis'
  | 'témoignage' | 'import' | 'extraction' | 'examiner' | 'rejeter'
  | 'approuver' | 'recherche-ia' | 'géolocalisation' | 'recherche-avancée'
  | 'exporter' | 'générer-ia' | 'analyser' | 'utiliser' | 'traduire'
  | 'vérifier' | 'commencer' | 'publier' | 'inviter' | 'nouveau'
  | 'aimer' | 'like' | 'favoris' | 'détails' | 'documents' | 'discussion'
  | 'fermer' | 'lire-plus' | 'comparer-textes' | 'analyse-comparative'
  | 'analyse-performance' | 'analyse-tendances' | 'auto-remplissage'
  | 'configurer-base' | 'configurer-canal' | 'créer-workflow'
  | 'consulter-dictionnaire' | 'export-excel' | 'export-json' | 'export-word'
  | 'export-pdf' | 'exporter-analyse' | 'fermer-sessions' | 'filtrer-date'
  | 'formulaires' | 'générer-formulaire' | 'générer-rapport' | 'guides'
  | 'import-lot' | 'import-zip' | 'import-csv' | 'import-excel' | 'import-json'
  | 'nouveau-modèle' | 'nouveau-projet' | 'nouveau-rôle' | 'nouveau-sujet'
  | 'nouveau-tag' | 'nouveau-template' | 'nouveau-workflow' | 'nouvel-utilisateur'
  | 'nouvelle-alerte' | 'nouvelle-permission' | 'nouvelle-politique'
  | 'partager-ressource' | 'rapport-complet' | 'télécharger-pdf'
  | 'voir-procédures' | 'voir-textes' | 'ajouter-domaine' | 'ajouter-type'
  | 'ajouter-catégorie' | 'ajouter-organisation' | 'ajouter-source';

export interface ActionConfig {
  icon: LucideIcon;
  label: string;
  variant: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary';
}

export interface ActionButtonProps {
  action: ActionType;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
  data?: Record<string, unknown>;
  itemId?: string;
  itemTitle?: string;
  onClick?: () => void;
  disabled?: boolean;
}
