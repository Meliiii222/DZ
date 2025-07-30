import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/common/SectionHeader";
import { 
  Smartphone, 
  Download, 
  RefreshCw, 
  Settings, 
  Shield, 
  Wifi, 
  Bell,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface MobileAppSectionProps {
  language?: string;
}

export function MobileAppSection({ language = "fr" }: MobileAppSectionProps) {
  const texts = {
    fr: {
      title: "Version Mobile Native",
      description: "Configuration et gestion de l'application mobile native",
      status: "Statut de l'application",
      currentVersion: "Version actuelle",
      lastUpdate: "Dernière mise à jour",
      features: "Fonctionnalités mobiles",
      offlineMode: "Mode hors-ligne",
      pushNotifications: "Notifications push",
      biometricAuth: "Authentification biométrique",
      autoSync: "Synchronisation automatique",
      settings: "Paramètres de l'application",
      download: "Téléchargement",
      sync: "Synchroniser",
      configure: "Configurer",
      available: "Disponible",
      notAvailable: "Non disponible",
      enabled: "Activé",
      disabled: "Désactivé",
      downloadApp: "Télécharger l'application",
      syncData: "Synchroniser les données",
      appSettings: "Paramètres de l'app",
      security: "Sécurité mobile",
      performance: "Performance",
      storage: "Stockage local"
    },
    en: {
      title: "Native Mobile Version",
      description: "Configuration and management of the native mobile application",
      status: "Application Status",
      currentVersion: "Current Version",
      lastUpdate: "Last Update",
      features: "Mobile Features",
      offlineMode: "Offline Mode",
      pushNotifications: "Push Notifications",
      biometricAuth: "Biometric Authentication",
      autoSync: "Auto Synchronization",
      settings: "Application Settings",
      download: "Download",
      sync: "Sync",
      configure: "Configure",
      available: "Available",
      notAvailable: "Not Available",
      enabled: "Enabled",
      disabled: "Disabled",
      downloadApp: "Download App",
      syncData: "Sync Data",
      appSettings: "App Settings",
      security: "Mobile Security",
      performance: "Performance",
      storage: "Local Storage"
    }
  };

  const t = texts[language as keyof typeof texts] || texts.fr;

  return (
    <div className="space-y-6">
      <SectionHeader
        title={t.title}
        description={t.description}
        icon={Smartphone}
        iconColor="text-blue-600"
      />

      {/* Statut de l'application */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            {t.status}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{t.currentVersion}</p>
                <p className="text-sm text-muted-foreground">v2.1.3</p>
              </div>
              <Badge variant="secondary">
                <CheckCircle className="w-3 h-3 mr-1" />
                {t.available}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{t.lastUpdate}</p>
                <p className="text-sm text-muted-foreground">15 Nov 2024</p>
              </div>
              <Badge variant="outline">
                <RefreshCw className="w-3 h-3 mr-1" />
                Auto
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{t.storage}</p>
                <p className="text-sm text-muted-foreground">2.4 GB / 5 GB</p>
              </div>
              <Badge variant="secondary">48%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fonctionnalités mobiles */}
      <Card>
        <CardHeader>
          <CardTitle>{t.features}</CardTitle>
          <CardDescription>
            Activez ou désactivez les fonctionnalités spécifiques à l'application mobile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wifi className="w-5 h-5 text-blue-500" />
              <div>
                <Label htmlFor="offline-mode" className="font-medium">{t.offlineMode}</Label>
                <p className="text-sm text-muted-foreground">Permet d'utiliser l'app sans connexion</p>
              </div>
            </div>
            <Switch id="offline-mode" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-orange-500" />
              <div>
                <Label htmlFor="push-notifications" className="font-medium">{t.pushNotifications}</Label>
                <p className="text-sm text-muted-foreground">Notifications en temps réel</p>
              </div>
            </div>
            <Switch id="push-notifications" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-green-500" />
              <div>
                <Label htmlFor="biometric-auth" className="font-medium">{t.biometricAuth}</Label>
                <p className="text-sm text-muted-foreground">Empreinte digitale / Face ID</p>
              </div>
            </div>
            <Switch id="biometric-auth" />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-purple-500" />
              <div>
                <Label htmlFor="auto-sync" className="font-medium">{t.autoSync}</Label>
                <p className="text-sm text-muted-foreground">Synchronisation automatique des données</p>
              </div>
            </div>
            <Switch id="auto-sync" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Download className="w-6 h-6" />
              <span>{t.downloadApp}</span>
            </Button>
            
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <RefreshCw className="w-6 h-6" />
              <span>{t.syncData}</span>
            </Button>
            
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Settings className="w-6 h-6" />
              <span>{t.appSettings}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Informations système */}
      <Card>
        <CardHeader>
          <CardTitle>Informations système</CardTitle>
        </CardHeader>
        <CardContent>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {t.security}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Chiffrement des données</span>
                  <Badge variant="secondary">AES-256</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Certificat SSL</span>
                  <Badge variant="secondary">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Valide
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Performance</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Vitesse de synchronisation</span>
                  <Badge variant="secondary">Rapide</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Utilisation batterie</span>
                  <Badge variant="secondary">Optimisée</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
