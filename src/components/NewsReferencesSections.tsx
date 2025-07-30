
import { Newspaper, BookOpen, Users, Building } from 'lucide-react';
import { UnifiedSectionHeader } from './common/UnifiedSectionHeader';
import { NewsSection } from "./news-references/NewsSection";
import { LibrarySection } from "./news-references/LibrarySection";
import { DictionariesSection } from "./news-references/DictionariesSection";
import { DirectoriesSection } from "./news-references/DirectoriesSection";
import { LibraryFormHandler } from './common/LibraryFormHandler';

interface NewsReferencesSectionsProps {
  section: string;
  language?: string;
}

export function NewsReferencesSections({ section, language = "fr" }: NewsReferencesSectionsProps) {
  const getSectionConfig = () => {
    switch (section) {
      case "news":
        return {
          icon: Newspaper,
          title: "Actualités Juridiques",
          description: "Dernières nouvelles et actualités du secteur juridique algérien",
          iconColor: "text-red-600",
          component: <NewsSection />
        };
      case "library":
        return {
          icon: BookOpen,
          title: "Bibliothèque Juridique Algérienne",
          description: "Collection complète de ressources juridiques et documents de référence",
          iconColor: "text-blue-600",
          component: <LibrarySection />
        };
      case "dictionaries":
        return {
          icon: BookOpen,
          title: "Dictionnaires Juridiques",
          description: "Dictionnaires et lexiques juridiques spécialisés",
          iconColor: "text-green-600",
          component: <DictionariesSection />
        };
      case "directories":
        return {
          icon: Building,
          title: "Annuaires Juridiques Algériens",
          description: "Répertoire complet des institutions, professionnels et organismes juridiques",
          iconColor: "text-purple-600",
          component: <DirectoriesSection />
        };
      default:
        return {
          icon: Newspaper,
          title: "Actualités & Références",
          description: "Ressources d'information juridique",
          iconColor: "text-blue-600",
          component: <div>Section non trouvée</div>
        };
    }
  };

  const config = getSectionConfig();

  return (
    <div className="space-y-6">
      <UnifiedSectionHeader
        icon={config.icon}
        title={config.title}
        description={config.description}
        iconColor={config.iconColor}
      />
      {config.component}
      <LibraryFormHandler />
    </div>
  );
}
