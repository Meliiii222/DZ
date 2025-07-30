import { 
  Home,
  FileText, 
  ClipboardList, 
  BarChart3, 
  Users, 
  BookOpen, 
  Settings,
  TrendingUp,
  Scan
} from "lucide-react";

export const menuItems = [
  {
    id: "accueil",
    label: "Accueil",
    icon: Home,
    section: "dashboard"
  },
  {
    id: "textes-juridiques",
    label: "Textes Juridiques",
    icon: FileText,
    submenu: [
      { label: "Catalogue", section: "legal-catalog" },
      { label: "Alimentation de la banque de données", section: "legal-enrichment" },
      { label: "Recherche", section: "legal-search" }
    ]
  },
  {
    id: "procedures-administratives",
    label: "Procédures Administratives",
    icon: ClipboardList,
    submenu: [
      { label: "Catalogue", section: "procedures-catalog" },
      { label: "Alimentation de la banque de données", section: "procedures-enrichment" },
      { label: "Recherche", section: "procedures-search" },
      { label: "Ressources", section: "procedures-resources" }
    ]
  },
  {
    id: "ocr-ia-juridique",
    label: "DZ OCR-IA",
    icon: Scan,
    submenu: [
      { label: "🔍 Extraction et Mapping", section: "ocr-extraction" },
      { label: "📦 Traitement par Lot", section: "batch-processing" },
      { label: "📋 File d'approbation", section: "approval-workflow" },
      { label: "📊 Analytics et Rapports", section: "ocr-analytics" }
    ]
  },
  {
    id: "analyse-rapports",
    label: "Analyse & Rapports",
    icon: BarChart3,
    submenu: [
      { label: "Tableaux de Bord", section: "analytics-dashboards" },
      { label: "Assistant IA Juridique", section: "ai-assistant" },
      { label: "Analyses", section: "analysis" },
      { label: "Rapports", section: "reports" },
      { label: "Rédaction assistée", section: "assisted-writing" }
    ]
  },
  {
    id: "collaboration",
    label: "Collaboration",
    icon: Users,
    submenu: [
      { label: "Forum", section: "forum" },
      { label: "Espace collaboratif", section: "collaborative-workspace" },
      { label: "Ressources partagées", section: "shared-resources" }
    ]
  },
  {
    id: "actualites-references",
    label: "Actualités & Références",
    icon: BookOpen,
    submenu: [
      { label: "Actualités", section: "news" },
      { label: "Bibliothèque", section: "library" },
      { label: "Dictionnaires", section: "dictionaries" },
      { label: "Annuaires", section: "directories" }
    ]
  },
  {
    id: "configuration",
    label: "Configuration",
    icon: Settings,
    submenu: [
      { label: "Nomenclature", section: "nomenclature" },
      { label: "Ressources complémentaires", section: "complementary-resources" },
      { label: "Alertes & Notifications", section: "alerts-notifications" },
      { label: "Gestion utilisateurs", section: "user-management" },
      { label: "Gouvernance et Sécurité", section: "security" },
      { label: "Performance et Scalabilité", section: "performance-scalability" },
      { label: "Intégrations et Interopérabilité", section: "integrations-interoperability" },
      { label: "Personnes à mobilité réduite", section: "accessibility-settings" },
      { label: "Mode hors-ligne", section: "offline-mode" },
      { label: "Version mobile native", section: "mobile-app" }
    ]
  }
];
