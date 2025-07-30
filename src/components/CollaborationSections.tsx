
import { Users, MessageSquare, Share2 } from 'lucide-react';
import { UnifiedSectionHeader } from './common/UnifiedSectionHeader';
import { EnhancedForum } from "./collaboration/EnhancedForum";
import { AdvancedCollaborativeTools } from "./collaboration/AdvancedCollaborativeTools";
import { SecureFileSharing } from "./collaboration/SecureFileSharing";

interface CollaborationSectionsProps {
  section: string;
  language?: string;
}

export function CollaborationSections({ section, language = "fr" }: CollaborationSectionsProps) {
  const getSectionConfig = () => {
    switch (section) {
      case "forum":
        return {
          icon: MessageSquare,
          title: "Forum de discussion juridique",
          description: "Espace d'échange et de discussion entre professionnels du droit",
          iconColor: "text-blue-600",
          component: <EnhancedForum />
        };
      case "collaborative-workspace":
        return {
          icon: Users,
          title: "Espace de travail collaboratif",
          description: "Outils collaboratifs avancés pour le travail d'équipe juridique",
          iconColor: "text-green-600",
          component: <AdvancedCollaborativeTools />
        };
      case "shared-resources":
        return {
          icon: Share2,
          title: "Ressources partagées",
          description: "Partage sécurisé de documents et ressources juridiques",
          iconColor: "text-purple-600",
          component: <SecureFileSharing />
        };
      default:
        return {
          icon: Users,
          title: "Collaboration",
          description: "Outils collaboratifs pour professionnels du droit",
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
    </div>
  );
}
