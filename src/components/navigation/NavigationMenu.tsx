
// @ts-nocheck
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { menuItems } from "./menuConfig";

interface NavigationMenuProps {
  onSectionChange: (section: string) => void;
  activeSection: string;
  isMobile?: boolean;
}

export function NavigationMenu({ onSectionChange, activeSection, isMobile = false }: NavigationMenuProps) {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback((itemId: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredMenu(itemId);
  }, [hoverTimeout]);

  const handleMouseLeave = useCallback(() => {
    const timeout = setTimeout(() => {
      setHoveredMenu(null);
    }, 150); // Délai de 150ms pour éviter les fermetures accidentelles
    setHoverTimeout(timeout);
  }, []);

  const isMenuActive = (item: Record<string, unknown>) => {
    if (item.section && activeSection === item.section) {
      return true;
    }
    if (item.submenu) {
      return item.submenu.some((subItem: Record<string, unknown>) => subItem.section === activeSection);
    }
    return false;
  };

  if (isMobile) {
    return (
      <div className="space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isActive = isMenuActive(item);

          if (hasSubmenu) {
            return (
              <div key={item.id} className="space-y-1">
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2 text-base font-medium rounded-lg transition-colors",
                  isActive ? "bg-green-50 text-green-700 border border-green-200" : "text-gray-700"
                )}>
                  <IconComponent className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                <div className="ml-8 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Button
                      key={subItem.section}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-sm",
                        activeSection === subItem.section && "bg-green-50 text-green-700 font-medium border border-green-200"
                      )}
                      onClick={() => {
                        console.log('Clicking OCR submenu item:', subItem.section, subItem.label);
                        onSectionChange(subItem.section);
                      }}
                    >
                      {subItem.label}
                    </Button>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Button
              key={item.section}
              variant="ghost"
              className={cn(
                "w-full justify-start text-base py-3 rounded-lg transition-colors",
                isActive && "bg-green-50 text-green-700 font-medium border border-green-200"
              )}
              onClick={() => onSectionChange(item.section)}
            >
              <div className="flex items-center gap-3">
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center w-full overflow-visible">
      <div className="flex items-center space-x-1 w-full">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isHovered = hoveredMenu === item.id;
          const isActive = isMenuActive(item);

          if (hasSubmenu) {
            return (
              <div 
                key={item.id} 
                className="relative flex-1 min-w-0"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "h-10 px-2 text-xs font-medium hover:bg-gray-100 flex items-center gap-1 transition-all whitespace-nowrap w-full justify-center min-w-0",
                    isHovered && "bg-gray-100",
                    isActive && "bg-green-50 text-green-700 border-b-2 border-green-500"
                  )}
                >
                  <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-[10px] lg:text-xs truncate">{item.label}</span>
                  <ChevronDown className="w-2.5 h-2.5 flex-shrink-0" />
                </Button>
                
                {isHovered && (
                  <>
                    <div className="absolute top-full left-0 w-full h-2 bg-transparent z-[61]" />
                    <div 
                      className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-72 z-[60]"
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.section}
                          className={cn(
                            "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors",
                            activeSection === subItem.section && "bg-green-50 text-green-700 font-medium border-l-2 border-green-500"
                          )}
                          onClick={() => {
                            onSectionChange(subItem.section);
                            setHoveredMenu(null);
                            if (hoverTimeout) {
                              clearTimeout(hoverTimeout);
                              setHoverTimeout(null);
                            }
                          }}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          }

          return (
            <Button
              key={item.section}
              variant="ghost"
              className={cn(
                "h-10 px-2 text-xs font-medium hover:bg-gray-100 flex items-center gap-1 transition-all whitespace-nowrap flex-1 justify-center min-w-0",
                isActive && "bg-green-50 text-green-700 border-b-2 border-green-500"
              )}
              onClick={() => onSectionChange(item.section)}
            >
              <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-[10px] lg:text-xs truncate">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
