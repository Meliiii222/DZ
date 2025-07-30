
import { Button } from "@/components/ui/button";
import { Bell, User, Search, MessageSquare, Menu, Star, Flag } from "lucide-react";
import { AIIcon } from "@/components/common/AIIcon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSelector } from "@/components/LanguageSelector";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { AccountDropdown } from "@/components/AccountDropdown";
import { MessagesDropdown } from "@/components/MessagesDropdown";
import { MainNavigation } from "@/components/MainNavigation";
import { EnhancedInput } from "@/components/common/EnhancedInput";
import { useCallback, useMemo, useState } from "react";

interface MainHeaderProps {
  language: string;
  activeSection: string;
  onLanguageChange: (language: string) => void;
  onSectionChange: (section: string) => void;
}

export function MainHeader({ language, activeSection, onLanguageChange, onSectionChange }: MainHeaderProps) {
  const [quickSearchValue, setQuickSearchValue] = useState('');

  const getHeaderText = useCallback((key: string) => {
    const translations = {
      fr: {
        title: "dalil.dz",
        subtitle: "Plateforme de veille juridique et réglementaire",
        searchPlaceholder: "Recherche rapide..."
      },
      ar: {
        title: "dalil.dz",
        subtitle: "منصة المراقبة القانونية والتنظيمية",
        searchPlaceholder: "بحث سريع..."
      },
      en: {
        title: "dalil.dz",
        subtitle: "Legal and regulatory monitoring platform",
        searchPlaceholder: "Quick search..."
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['fr']] || key;
  }, [language]);

  const handleFavoritesClick = useCallback(() => {
    onSectionChange("favorites");
  }, [onSectionChange]);

  const handleAIAssistantClick = useCallback(() => {
    onSectionChange("ai-assistant");
  }, [onSectionChange]);

  const handleQuickSearchKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && quickSearchValue.trim()) {
      onSectionChange("search");
    }
  }, [quickSearchValue, onSectionChange]);

  const headerTexts = useMemo(() => ({
    title: getHeaderText("title"),
    subtitle: getHeaderText("subtitle"),
    searchPlaceholder: getHeaderText("searchPlaceholder")
  }), [getHeaderText]);

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-2 sticky top-0 z-50" role="banner">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onSectionChange("dashboard")}
                className="w-20 h-15 bg-white rounded flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-gray-50 transition-colors"
                aria-label="Retour à l'accueil"
              >
                <img src="/dalil-new-logo.png" alt="Dalil.dz Logo" className="w-21 h-15 object-contain" />
              </button>
              <div className="min-w-0">
                <button 
                  onClick={() => onSectionChange("dashboard")}
                  className="text-left cursor-pointer hover:opacity-80 transition-opacity"
                  aria-label="Retour à l'accueil"
                >
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{headerTexts.title}</h1>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">{headerTexts.subtitle}</p>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <EnhancedInput
              value={quickSearchValue}
              onChange={(e) => setQuickSearchValue(e.target.value)}
              placeholder={headerTexts.searchPlaceholder}
              context="general"
              onKeyPress={handleQuickSearchKeyPress}
              className="bg-gray-50 border-gray-200 text-sm"
              enableVoice={true}
            />
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="sm:hidden">
              <LanguageSelector onLanguageChange={onLanguageChange} />
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleFavoritesClick}
              className="relative hidden sm:flex p-2"
              title="Favoris"
              aria-label="Voir les favoris"
            >
              <Star className="w-4 h-4" aria-hidden="true" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleAIAssistantClick}
              className="relative hidden sm:flex p-2"
              title="Assistant IA Juridique"
              aria-label="Assistant IA Juridique Avancé"
            >
              <AIIcon className="w-4 h-4" />
            </Button>
            
            <MessagesDropdown />
            <NotificationDropdown />
            <AccountDropdown onSectionChange={onSectionChange} />
            
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" aria-label="Ouvrir le menu de navigation">
                  <Menu className="w-5 h-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0" aria-label="Menu de navigation mobile">
                <div className="p-4">
                  <div className="relative mb-4">
                    <EnhancedInput
                      value={quickSearchValue}
                      onChange={(e) => setQuickSearchValue(e.target.value)}
                      placeholder={headerTexts.searchPlaceholder}
                      context="general"
                      onKeyPress={handleQuickSearchKeyPress}
                      className="bg-gray-50 border-gray-200"
                      enableVoice={true}
                    />
                  </div>
                  <MainNavigation 
                    onSectionChange={onSectionChange} 
                    activeSection={activeSection}
                    isMobile={true}
                    language={language}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
