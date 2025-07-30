
import { LanguageSelector } from "@/components/LanguageSelector";

interface GovernmentHeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

export function GovernmentHeader({ language, onLanguageChange }: GovernmentHeaderProps) {
  const getHeaderText = (key: string) => {
    const translations = {
      fr: {
        republicAr: "الجمهورية الجزائرية الديمقراطية الشعبية",
        republicFr: "République Algérienne Démocratique et Populaire",
      },
      ar: {
        republicAr: "الجمهورية الجزائرية الديمقراطية الشعبية",
        republicFr: "République Algérienne Démocratique et Populaire",
      },
      en: {
        republicAr: "الجمهورية الجزائرية الديمقراطية الشعبية",
        republicFr: "People's Democratic Republic of Algeria",
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['fr']] || key;
  };

  return (
    <header className="text-white px-4 sm:px-6 py-2" style={{ backgroundColor: '#40915d' }}>
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Texte centré sur toute la largeur de la page */}
          <div className="absolute left-0 right-0 flex justify-center items-center pointer-events-none">
            <div className="text-center max-w-4xl">
              <div 
                className="text-sm sm:text-base font-medium leading-tight text-center algerian-republic-text-matched" 
                dir="rtl"
              >
                {getHeaderText("republicAr")}
              </div>
              <div className="text-[9px] sm:text-[11px] font-normal opacity-90 mt-1 leading-tight tracking-[0.15em] text-center">
                {getHeaderText("republicFr")}
              </div>
            </div>
          </div>
          
          <div className="hidden sm:block ml-auto pointer-events-auto">
            <LanguageSelector onLanguageChange={onLanguageChange} />
          </div>
        </div>
      </div>
    </header>
  );
}
