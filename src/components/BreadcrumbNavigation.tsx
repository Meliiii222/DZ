import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AutoRefreshToggle } from "@/components/common/AutoRefreshToggle";

interface BreadcrumbNavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  language?: string;
  onRefresh?: () => void;
}

export function BreadcrumbNavigation({ currentSection, onSectionChange, language = "fr", onRefresh }: BreadcrumbNavigationProps) {
  if (currentSection === "dashboard") {
    return null; // No breadcrumb for home page
  }

  // Sections à exclure de l'auto-refresh : Configuration et Alimentation de la Banque de Données
  const excludeFromAutoRefresh = [
    "legal-enrichment", "procedures-enrichment", // Alimentation de la Banque de Données
    "nomenclature", "complementary-resources", "data-management", "alerts-notifications", 
    "user-management", "security", "performance-scalability", "integrations-interoperability", 
    "accessibility-settings", "offline-mode", "mobile-app" // Configuration
  ];

  const shouldShowAutoRefresh = onRefresh && !excludeFromAutoRefresh.includes(currentSection);

  const getText = (key: string) => {
    const translations = {
      fr: {
        legalTexts: "Textes Juridiques",
        procedures: "Procédures Administratives",
        ocrIA: "OCR-IA",
        ai: "Intelligence Artificielle",
        analysisReports: "Analyse & Rapports",
        collaboration: "Collaboration",
        newsReferences: "Actualités & Références",
        configuration: "Configuration",
        help: "Aide",
        
        "legal-catalog": "Catalogue des textes juridiques",
        "legal-enrichment": "Alimentation de la Banque de Données",
        "legal-search": "Recherche",
        "procedures-catalog": "Catalogue des procédures administratives",
        "procedures-enrichment": "Alimentation de la Banque de Données",
        "procedures-search": "Recherche",
        "procedures-resources": "Ressources",
        
        // Sections OCR-IA
        "ocr-extraction": "Extraction OCR",
        "batch-processing": "Traitement par lots",
        "ocr-analytics": "Analyse OCR",
        "approval-workflow": "Fil d'Approbation OCR-IA",
        "ocr-settings": "Paramètres OCR",
        "monitoring": "Surveillance",
        
        // Sections IA
        "ai-search": "Recherche IA",
        "ai-advanced": "IA Avancée",
        "ai-assistant": "Assistant IA",
        "ai-comprehensive-test": "Test Complet IA",
        
        // Autres sections
        "favorites": "Favoris",
        "data-extraction": "Extraction de données",
        "document-templates": "Modèles de documents",
        "advanced-search": "Recherche avancée",
        "saved-searches": "Recherches sauvegardées",
        "admin": "Administration",
        "security": "Sécurité",
        "performance-scalability": "Performance & Évolutivité",
        "integrations-interoperability": "Intégrations & Interopérabilité",
        "accessibility-settings": "Paramètres d'accessibilité",
        "offline-mode": "Mode hors ligne",
        "mobile-app": "Application mobile",
        
        "dashboards": "Tableaux de Bord",
        "analysis": "Analyse",
        "reports": "Rapport",
        "assisted-writing": "Rédaction assistée",
        "information-sharing": "Partage d'information",
        "collaborative-workspace": "Espace de travail collaboratif",
        "user-contributions": "Contribution des utilisateurs",
        "collaboration-resources": "Ressources",
        "forum": "Forum",
        "shared-resources": "Ressources Partagées",
        "news": "Actualités & Activités juridiques",
        "library": "Bibliothèque",
        "dictionaries": "Dictionnaires",
        "directories": "Annuaires",
        "nomenclature": "Nomenclature",
        "complementary-resources": "Ressources Complémentaires",
        "data-management": "Gestion des données",
        "alerts-notifications": "Alertes & Notifications",
        "user-management": "Gestion des utilisateurs",
        "about": "À propos",
        "contact": "Contact",
        "technical-support": "Support technique"
      },
      ar: {
        legalTexts: "النصوص القانونية",
        procedures: "الإجراءات الإدارية",
        ocrIA: "OCR-IA",
        ai: "الذكاء الاصطناعي",
        analysisReports: "التحليل والتقارير",
        collaboration: "التعاون",
        newsReferences: "الأخبار والمراجع",
        configuration: "الإعدادات",
        help: "المساعدة",
        
        "legal-catalog": "كتالوج النصوص القانونية",
        "legal-enrichment": "إثراء قاعدة البيانات",
        "legal-search": "البحث",
        "procedures-catalog": "كتالوج الإجراءات الإدارية",
        "procedures-enrichment": "إثراء قاعدة البيانات",
        "procedures-search": "البحث",
        "procedures-resources": "الموارد",
        
        // Sections OCR-IA
        "ocr-extraction": "استخراج OCR",
        "batch-processing": "المعالجة المجمعة",
        "ocr-analytics": "تحليل OCR",
        "approval-workflow": "سير الموافقة OCR-IA",
        "ocr-settings": "إعدادات OCR",
        "monitoring": "المراقبة",
        
        // Sections IA
        "ai-search": "البحث بالذكاء الاصطناعي",
        "ai-advanced": "الذكاء الاصطناعي المتقدم",
        "ai-assistant": "مساعد الذكاء الاصطناعي",
        "ai-comprehensive-test": "اختبار شامل للذكاء الاصطناعي",
        
        // Autres sections
        "favorites": "المفضلة",
        "data-extraction": "استخراج البيانات",
        "document-templates": "قوالب المستندات",
        "advanced-search": "البحث المتقدم",
        "saved-searches": "البحثات المحفوظة",
        "admin": "الإدارة",
        "security": "الأمان",
        "performance-scalability": "الأداء والقابلية للتوسع",
        "integrations-interoperability": "التكامل والتشغيل البيني",
        "accessibility-settings": "إعدادات إمكانية الوصول",
        "offline-mode": "الوضع غير المتصل",
        "mobile-app": "التطبيق المحمول",
        
        "dashboards": "لوحات المعلومات",
        "analysis": "التحليل",
        "reports": "التقرير",
        "assisted-writing": "الكتابة المساعدة",
        "information-sharing": "مشاركة المعلومات",
        "collaborative-workspace": "مساحة العمل التعاونية",
        "user-contributions": "مساهمات المستخدمين",
        "collaboration-resources": "الموارد",
        "forum": "المنتدى",
        "shared-resources": "الموارد المشتركة",
        "news": "الأخبار والأنشطة القانونية",
        "library": "المكتبة",
        "dictionaries": "القواميس",
        "directories": "الأدلة",
        "nomenclature": "التسمية",
        "complementary-resources": "الموارد التكميلية",
        "data-management": "إدارة البيانات",
        "alerts-notifications": "التنبيهات والإشعارات",
        "user-management": "إدارة المستخدمين",
        "about": "حول",
        "contact": "اتصل بنا",
        "technical-support": "الدعم الفني"
      },
      en: {
        legalTexts: "Legal Texts",
        procedures: "Administrative Procedures",
        ocrIA: "OCR-IA",
        ai: "Artificial Intelligence",
        analysisReports: "Analysis & Reports",
        collaboration: "Collaboration",
        newsReferences: "News & References",
        configuration: "Configuration",
        help: "Help",
        
        "legal-catalog": "Legal texts catalog",
        "legal-enrichment": "Database enrichment",
        "legal-search": "Search",
        "procedures-catalog": "Administrative procedures catalog",
        "procedures-enrichment": "Database enrichment",
        "procedures-search": "Search",
        "procedures-resources": "Resources",
        
        // OCR-IA Sections
        "ocr-extraction": "OCR Extraction",
        "batch-processing": "Batch Processing",
        "ocr-analytics": "OCR Analytics",
        "approval-workflow": "OCR-IA Approval Workflow",
        "ocr-settings": "OCR Settings",
        "monitoring": "Monitoring",
        
        // AI Sections
        "ai-search": "AI Search",
        "ai-advanced": "Advanced AI",
        "ai-assistant": "AI Assistant", 
        "ai-comprehensive-test": "Comprehensive AI Test",
        
        // Other sections
        "favorites": "Favorites",
        "data-extraction": "Data Extraction",
        "document-templates": "Document Templates",
        "advanced-search": "Advanced Search",
        "saved-searches": "Saved Searches",
        "admin": "Administration",
        "security": "Security",
        "performance-scalability": "Performance & Scalability",
        "integrations-interoperability": "Integrations & Interoperability",
        "accessibility-settings": "Accessibility Settings",
        "offline-mode": "Offline Mode",
        "mobile-app": "Mobile App",
        
        "dashboards": "Dashboards",
        "analysis": "Analysis",
        "reports": "Reports",
        "assisted-writing": "Assisted writing",
        "information-sharing": "Information sharing",
        "collaborative-workspace": "Collaborative workspace",
        "user-contributions": "User contributions",
        "collaboration-resources": "Resources",
        "forum": "Forum",
        "shared-resources": "Shared Resources",
        "news": "News & Legal Activities",
        "library": "Library",
        "dictionaries": "Dictionaries",
        "directories": "Directories",
        "nomenclature": "Nomenclature",
        "complementary-resources": "Complementary resources",
        "data-management": "Data management",
        "alerts-notifications": "Alerts & Notifications",
        "user-management": "User management",
        "about": "About",
        "contact": "Contact",
        "technical-support": "Technical support"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['fr']] || key;
  };

  const getParentSection = (section: string) => {
    if (section.startsWith("legal-")) return "legalTexts";
    if (section.startsWith("procedures-")) return "procedures";
    if (["ocr-extraction", "batch-processing", "ocr-analytics", "approval-workflow", "ocr-settings", "monitoring"].includes(section)) return "ocrIA";
    if (["ai-search", "ai-advanced", "ai-assistant", "ai-comprehensive-test"].includes(section)) return "ai";
    if (["dashboards", "analysis", "reports", "assisted-writing"].includes(section)) return "analysisReports";
    if (["forum", "information-sharing", "collaborative-workspace", "user-contributions", "collaboration-resources", "shared-resources"].includes(section)) return "collaboration";
    if (["news", "library", "dictionaries", "directories"].includes(section)) return "newsReferences";
    if (["nomenclature", "complementary-resources", "data-management", "alerts-notifications", "user-management", "security", "performance-scalability", "integrations-interoperability", "accessibility-settings", "offline-mode", "mobile-app"].includes(section)) return "configuration";
    if (["about", "contact", "technical-support"].includes(section)) return "help";
    // Sections autonomes (pas de parent)
    if (["favorites", "data-extraction", "document-templates", "advanced-search", "saved-searches", "admin"].includes(section)) return null;
    return null;
  };

  const parentSection = getParentSection(currentSection);

  return (
    <div className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-[60px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={() => onSectionChange("dashboard")}
                  className="flex items-center gap-1 cursor-pointer hover:text-green-600"
                >
                  <Home className="w-4 h-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              {parentSection && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      className="cursor-pointer hover:text-green-600"
                      onClick={() => onSectionChange(parentSection)}
                    >
                      {getText(parentSection)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-green-600 font-medium">
                  {getText(currentSection)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {shouldShowAutoRefresh && (
            <AutoRefreshToggle 
              onRefresh={onRefresh} 
              className="ml-4"
            />
          )}
        </div>
      </div>
    </div>
  );
}
