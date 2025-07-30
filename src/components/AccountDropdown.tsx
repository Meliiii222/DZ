
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  Languages, 
  HelpCircle, 
  Info, 
  LogOut, 
  ChevronDown,
  Shield,
  Bell,
  Palette,
  Globe,
  Flag
} from "lucide-react";

interface AccountDropdownProps {
  onSectionChange?: (section: string) => void;
}

export function AccountDropdown({ onSectionChange }: AccountDropdownProps = {}) {
  const [open, setOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const handleMenuClick = (action: string) => {
    setOpen(false);
    switch (action) {
      case 'preferences':
        setPreferencesOpen(true);
        break;
      case 'language':
        setLanguageOpen(true);
        break;
      case 'support':
        setSupportOpen(true);
        break;
      case 'about':
        setAboutOpen(true);
        break;
      case 'logout':
        console.log('Déconnexion');
        break;
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="gap-2 text-gray-700 hover:bg-gray-50">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">Ahmed Benali</p>
              <p className="text-xs text-gray-500">Administrateur</p>
            </div>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2 bg-white border shadow-lg z-50" align="end">
          <div className="space-y-1">
            <div className="px-3 py-2 border-b">
              <p className="font-medium text-gray-900">Ahmed Benali</p>
              <p className="text-sm text-gray-500">ahmed.benali@justice.gov.dz</p>
            </div>
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-2"
              onClick={() => handleMenuClick('preferences')}
            >
              <Settings className="w-4 h-4" />
              Préférences
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-2"
              onClick={() => handleMenuClick('language')}
            >
              <Languages className="w-4 h-4" />
              Langue
            </Button>
            
            <Separator className="my-1" />
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-2"
              onClick={() => handleMenuClick('support')}
            >
              <HelpCircle className="w-4 h-4" />
              Assistance et support
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-2"
              onClick={() => handleMenuClick('about')}
            >
              <Info className="w-4 h-4" />
              À propos
            </Button>
            
            <Separator className="my-1" />
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-2 text-red-600 hover:bg-red-50"
              onClick={() => handleMenuClick('logout')}
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Fenêtre Préférences */}
      <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-600" />
              Préférences utilisateur
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notifications par email</span>
                  <Badge variant="secondary">Activé</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notifications push</span>
                  <Badge variant="secondary">Activé</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Alertes juridiques</span>
                  <Badge variant="secondary">Activé</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Affichage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Thème</span>
                  <Badge variant="outline">Clair</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Taille de police</span>
                  <Badge variant="outline">Normale</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Authentification à deux facteurs</span>
                  <Badge className="bg-green-100 text-green-800">Activé</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sessions actives</span>
                  <Badge variant="outline">2 appareils</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fenêtre Langue */}
      <Dialog open={languageOpen} onOpenChange={setLanguageOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-emerald-600" />
              Paramètres de langue
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇫🇷</span>
                  <span>Français</span>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800">Actuel</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇩🇿</span>
                  <span>العربية</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇺🇸</span>
                  <span>English</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fenêtre Support */}
      <Dialog open={supportOpen} onOpenChange={setSupportOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              Assistance et support
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Centre d'aide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="w-4 h-4 mr-2" />
                  Guide utilisateur
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="w-4 h-4 mr-2" />
                  FAQ - Questions fréquentes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="w-4 h-4 mr-2" />
                  Tutoriels vidéo
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p><strong>Email:</strong> support@dalil.dz</p>
                  <p><strong>Téléphone:</strong> +213 21 XX XX XX</p>
                  <p><strong>Horaires:</strong> Dimanche - Jeudi, 8h - 17h</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fenêtre À propos */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-emerald-600" />
              À propos de dalil.dz
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-12 bg-white rounded flex items-center justify-center mx-auto mb-4 border border-green-600">
                <button 
                  onClick={() => {
                    setAboutOpen(false);
                    onSectionChange?.('dashboard');
                  }}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  aria-label="Retour à l'accueil"
                >
                  <img src="/dalil-new-logo.png" alt="Dalil.dz Logo" className="w-16 h-12 object-contain" />
                </button>
              </div>
              <h3 className="font-semibold text-lg">dalil.dz</h3>
              <p className="text-sm text-gray-600">Plateforme de veille juridique et réglementaire</p>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Version:</span>
                <span>2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span>Dernière mise à jour:</span>
                <span>15 janvier 2025</span>
              </div>
              <div className="flex justify-between">
                <span>Développé par:</span>
                <span>Ministère de la Justice</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 text-center">
              © 2025 République Algérienne Démocratique et Populaire
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
