
import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainNavigation } from "@/components/MainNavigation";
import { Footer } from "@/components/Footer";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { GovernmentHeader } from "@/components/layout/GovernmentHeader";
import { MainHeader } from "@/components/layout/MainHeader";
import { ContentRenderer } from "@/components/layout/ContentRenderer";
import { SecurityProvider } from "@/components/security/SecurityProvider";
import { useModalManager } from "@/utils/modalManager";
import { UniversalModal } from "@/components/modals/UniversalModal";
// import { AutoRefreshToggle } from "@/components/common/AutoRefreshToggle"; // Temporairement commenté pour test

const VALID_SECTIONS = new Set([
  "dashboard", "legal-catalog", "legal-enrichment", "legal-search",
  "procedures-catalog", "procedures-enrichment", "procedures-search", "procedures-resources",
  "dashboards", "analytics-dashboards", "analysis", "reports", "assisted-writing",
  "forum", "collaborative-workspace", "shared-resources",
  "news", "library", "dictionaries", "directories",
  "nomenclature", "complementary-resources", "data-management", "alerts-notifications", "user-management",
  "security", "performance-scalability", "integrations-interoperability", "accessibility-settings", "offline-mode", "mobile-app",
  "about", "contact", "technical-support", "privacy-policy", "terms-of-use", "messages", "ai-search", "ai-advanced", "favorites",
  "data-extraction", "document-templates", "advanced-search", "saved-searches",
  "ai-assistant", "ai-comprehensive-test", "admin",
  "ocr-extraction", "batch-processing", "ocr-analytics", "approval-workflow", "ocr-settings", "monitoring"
]);

const Index = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(section || "dashboard");
  const [language, setLanguage] = useState("fr");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Gestionnaire de modales
  const { currentModal, closeModal } = useModalManager();

  // Sync activeSection with URL
  useEffect(() => {
    const urlSection = section || "dashboard";
    if (VALID_SECTIONS.has(urlSection) && urlSection !== activeSection) {
      setActiveSection(urlSection);
    }
  }, [section, activeSection]);

  // Navigation with browser history
  const handleSectionChange = useCallback((newSection: string) => {
    console.log('Attempting to navigate to section:', newSection);
    
    // Vérifier que la section est valide et ne contient pas d'URL externe
    if (typeof newSection !== 'string' || newSection.includes('http://') || newSection.includes('https://')) {
      console.warn(`Section invalide ou URL externe détectée: ${newSection}`);
      return;
    }
    
    if (VALID_SECTIONS.has(newSection)) {
      try {
        if (newSection === "dashboard") {
          navigate("/", { replace: false });
        } else {
          navigate(`/${newSection}`, { replace: false });
        }
        console.log('Successfully navigated to section:', newSection);
      } catch (error) {
        console.error('Navigation error:', error);
      }
    } else {
      console.warn(`Section invalide tentée: ${newSection}`);
    }
  }, [navigate]);

  useEffect(() => {
    const handleNavigateToSection = (event: CustomEvent) => {
      console.log('Navigation event received:', event.detail);
      const targetSection = event.detail;
      
      // Gérer les redirections spéciales vers Alimentation de la Banque de Données
      if (targetSection === 'bank-feeding-legal-enrichment') {
        handleSectionChange('legal-enrichment');
        // L'onglet par défaut est 'enrichment' pour les textes juridiques
        return;
      }
      
      if (targetSection === 'bank-feeding-legal-approval') {
        handleSectionChange('legal-enrichment');
        // Navigation vers l'onglet approval-queue des textes juridiques
        setTimeout(() => {
          const tabEvent = new CustomEvent('switch-to-tab', {
            detail: { section: 'legal-enrichment', tab: 'approval-queue' }
          });
          window.dispatchEvent(tabEvent);
        }, 100);
        return;
      }
      
      if (targetSection === 'bank-feeding-procedures-enrichment') {
        handleSectionChange('procedures-enrichment');
        // L'onglet par défaut est 'enrichment' pour les procédures
        return;
      }
      
      if (targetSection === 'bank-feeding-procedures-approval') {
        handleSectionChange('procedures-enrichment');
        // Navigation vers l'onglet approval-queue des procédures
        setTimeout(() => {
          const tabEvent = new CustomEvent('switch-to-tab', {
            detail: { section: 'procedures-enrichment', tab: 'approval-queue' }
          });
          window.dispatchEvent(tabEvent);
        }, 100);
        return;
      }
      
      if (typeof targetSection === 'string' && VALID_SECTIONS.has(targetSection)) {
        handleSectionChange(targetSection);
        
        // Amélioration de l'accessibilité - annoncer le changement de section
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Navigation vers la section: ${targetSection}`;
        document.body.appendChild(announcement);
        
        // Nettoyer l'annonce après un délai
        setTimeout(() => {
          if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
          }
        }, 1000);
      } else {
        console.warn(`Section invalide reçue via événement: ${targetSection}`);
      }
    };

    window.addEventListener('navigate-to-section', handleNavigateToSection as EventListener);

    return () => {
      window.removeEventListener('navigate-to-section', handleNavigateToSection as EventListener);
    };
  }, [handleSectionChange]);

  // Gestionnaire de changement de langue mémorisé
  const handleLanguageChange = useCallback((newLanguage: string) => {
    setLanguage(newLanguage);
  }, []);

  // Fonction de refresh pour l'auto-refresh
  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
    console.log('Page refreshed via auto-refresh');
  }, []);

  // Props mémorisées pour éviter les re-rendus inutiles
  const headerProps = useMemo(() => ({
    language,
    activeSection,
    onLanguageChange: handleLanguageChange,
    onSectionChange: handleSectionChange
  }), [language, activeSection, handleLanguageChange, handleSectionChange]);

  const navigationProps = useMemo(() => ({
    onSectionChange: handleSectionChange,
    activeSection,
    language
  }), [handleSectionChange, activeSection, language]);

  const breadcrumbProps = useMemo(() => ({
    currentSection: activeSection,
    onSectionChange: handleSectionChange,
    language,
    onRefresh: handleRefresh
  }), [activeSection, handleSectionChange, language, handleRefresh]);

  return (
    <SecurityProvider>
      <div className="min-h-screen w-full algerian-green-bg flex flex-col">
        {/* Skip to main content link pour l'accessibilité */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
        >
          Aller au contenu principal
        </a>

        {/* Header gouvernemental */}
        <GovernmentHeader language={language} onLanguageChange={handleLanguageChange} />

        {/* Header principal */}
        <MainHeader {...headerProps} />

        {/* Menu de navigation principal - Hidden on mobile */}
        <div className="hidden md:block">
          <MainNavigation {...navigationProps} />
        </div>

        <BreadcrumbNavigation {...breadcrumbProps} />



        {/* Main Content avec landmark ARIA */}
        <main id="main-content" className="flex-grow bg-gray-50" role="main" aria-label="Contenu principal">
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
            <ContentRenderer activeSection={activeSection} language={language} refreshTrigger={refreshTrigger} />
          </div>
        </main>

        {/* Footer */}
        <Footer onSectionChange={handleSectionChange} />
        
        {/* Modales universelles */}
        <UniversalModal modal={currentModal} onClose={closeModal} />
      </div>
    </SecurityProvider>
  );
};

export default Index;
