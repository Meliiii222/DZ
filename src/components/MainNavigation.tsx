
import { NavigationMenu } from "./navigation/NavigationMenu";

interface MainNavigationProps {
  onSectionChange: (section: string) => void;
  activeSection: string;
  isMobile?: boolean;
  language?: string;
}

export function MainNavigation({ onSectionChange, activeSection, isMobile = false }: MainNavigationProps) {
  if (isMobile) {
    return (
      <NavigationMenu 
        onSectionChange={onSectionChange}
        activeSection={activeSection}
        isMobile={true}
      />
    );
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-0">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-none overflow-visible">
          <NavigationMenu 
            onSectionChange={onSectionChange}
            activeSection={activeSection}
            isMobile={false}
          />
        </div>
      </div>
    </nav>
  );
}
