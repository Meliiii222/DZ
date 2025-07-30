import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  FileText,
  Users,
  BookOpen,
  Settings,
  HelpCircle,
  MessageSquare,
  BarChart3,
  Flag,
  Newspaper,
  Library,
  Languages,
  Building
} from "lucide-react";

interface FooterProps {
  onSectionChange?: (section: string) => void;
}

export function Footer({ onSectionChange }: FooterProps) {
  const handleNavigation = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section);
      // Scroll to top when navigating
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="text-white mt-auto" style={{ backgroundColor: '#40915d' }}>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Main footer content */}
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Logo and description */}
            <div className="lg:col-span-1">
              <button 
                onClick={() => handleNavigation('dashboard')}
                className="flex items-center gap-3 mb-3 cursor-pointer hover:opacity-80 transition-opacity"
                aria-label="Retour à l'accueil"
              >
                <div className="w-9 h-7 bg-white rounded-lg flex items-center justify-center">
                  <img src="/dalil-new-logo.png" alt="Dalil.dz Logo" className="w-9 h-7 object-contain" />
                </div>
                <h3 className="font-bold text-lg">dalil.dz</h3>
              </button>
              <p className="text-green-100 text-sm leading-relaxed mb-3">
                Plateforme nationale de veille juridique et réglementaire de la République Algérienne Démocratique et Populaire.
              </p>
              <div className="flex items-center gap-2 text-green-100 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Alger, Algérie</span>
              </div>
            </div>
            
            {/* Fonctionnalités */}
            <div>
              <h4 className="font-semibold text-base mb-3 text-white">Fonctionnalités</h4>
              <ul className="space-y-2">
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-green-100 hover:text-white hover:bg-green-600 p-0 h-auto font-normal justify-start text-sm"
                    onClick={() => handleNavigation('legal-catalog')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Textes Juridiques
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-green-100 hover:text-white hover:bg-green-600 p-0 h-auto font-normal justify-start text-sm"
                    onClick={() => handleNavigation('procedures-catalog')}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Procédures Administratives
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-green-100 hover:text-white hover:bg-green-600 p-0 h-auto font-normal justify-start text-sm"
                    onClick={() => handleNavigation('analysis')}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analyse & Rapports
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-green-100 hover:text-white hover:bg-green-600 p-0 h-auto font-normal justify-start text-sm"
                    onClick={() => handleNavigation('collaborative-workspace')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Collaboration
                  </Button>
                </li>
              </ul>
            </div>
            
            {/* Ressources */}
            <div>
              <h4 className="font-semibold text-base mb-3 text-white">Ressources</h4>
              <ul className="space-y-2">
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-green-100 hover:text-white hover:bg-green-600 p-0 h-auto font-normal justify-start text-sm"
                    onClick={() => handleNavigation('news')}
                  >
                    <Newspaper className="w-4 h-4 mr-2" />
                    Actualités
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-green-100 hover:text-white hover:bg-green-600 p-0 h-auto font-normal justify-start text-sm"
                    onClick={() => handleNavigation('library')}
                  >
                    <Library className="w-4 h-4 mr-2" />
                    Bibliothèque
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-green-100 hover:text-white hover:bg-green-600 p-0 h-auto font-normal justify-start text-sm"
                    onClick={() => handleNavigation('dictionaries')}
                  >
                    <Languages className="w-4 h-4 mr-2" />
                    Dictionnaires
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-green-100 hover:text-white hover:bg-green-600 p-0 h-auto font-normal justify-start text-sm"
                    onClick={() => handleNavigation('directories')}
                  >
                    <Building className="w-4 h-4 mr-2" />
                    Annuaires
                  </Button>
                </li>
              </ul>
            </div>
            
            {/* Aide */}
            <div>
              <h4 className="font-semibold text-base mb-3 text-white">Aide</h4>
              <ul className="space-y-2">
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-green-100 hover:text-white hover:bg-green-600 p-0 h-auto font-normal justify-start text-sm"
                    onClick={() => handleNavigation('about')}
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    À propos
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-green-100 hover:text-white hover:bg-green-600 p-0 h-auto font-normal justify-start text-sm"
                    onClick={() => handleNavigation('contact')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-green-100 hover:text-white hover:bg-green-600 p-0 h-auto font-normal justify-start text-sm"
                    onClick={() => handleNavigation('technical-support')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Support technique
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Contact info section */}
        <div className="py-3 border-t border-green-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-white text-sm">Email</p>
                <p className="text-green-100 text-xs">contact@dalil.dz</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-white text-sm">Téléphone</p>
                <p className="text-green-100 text-xs">+213 (0) 21 XX XX XX</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-white text-sm">Support</p>
                <p className="text-green-100 text-xs">Lun-Ven: 8h00 - 17h00</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <Separator className="bg-green-600" />
        
        <div className="py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-center md:text-left">
              <p className="text-green-100 text-xs">
                &copy; 2025 République Algérienne Démocratique et Populaire. Tous droits réservés.
              </p>
              <p className="text-green-200 text-xs font-medium mt-1">
                dalil.dz - Plateforme officielle de veille juridique
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-green-100 hover:text-white hover:bg-green-600 text-xs"
                onClick={() => handleNavigation('privacy-policy')}
              >
                Politique de confidentialité
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-green-100 hover:text-white hover:bg-green-600 text-xs"
                onClick={() => handleNavigation('terms-of-use')}
              >
                Conditions d'utilisation
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-green-100 hover:text-white hover:bg-green-600 text-xs"
                onClick={() => handleNavigation('accessibility-settings')}
              >
                Accessibilité
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
