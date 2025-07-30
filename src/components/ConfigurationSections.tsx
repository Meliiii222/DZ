import { Settings, BookOpen, Package, Bell, Users, Zap } from 'lucide-react';
import { SectionHeader } from './common/SectionHeader';
import { NomenclatureSection } from "./configuration/NomenclatureSection";
import { ComplementaryResourcesSection } from "./configuration/ComplementaryResourcesSection";
import { DataManagementSection } from "./configuration/DataManagementSection";
import { AlertsNotificationsSection } from "./configuration/AlertsNotificationsSection";
import { UserManagementSection } from "./configuration/UserManagementSection";
import { SecuritySection } from "./configuration/SecuritySection";
import { MobileAppSection } from "./configuration/MobileAppSection";
import { IntegrationsInteroperabilitySection } from "./configuration/IntegrationsInteroperabilitySection";
import { AccessibilitySettings } from "./configuration/AccessibilitySettings";
import { OfflineMode } from "./configuration/OfflineMode";
import { PerformanceScalabilitySection } from "./configuration/PerformanceScalabilitySection";

interface ConfigurationSectionsProps {
  section: string;
  language?: string;
}

export function ConfigurationSections({ section, language = "fr" }: ConfigurationSectionsProps) {
  const getSectionTitle = () => {
    const titles = {
      fr: {
        'nomenclature': 'Nomenclature',
        'complementary-resources': 'Ressources Complémentaires',
        'data-management': 'Gouvernance des Données',
        'alerts-notifications': 'Alertes & Notifications',
        'user-management': 'Gestion des Utilisateurs',
        'security': 'Sécurité',
        'performance-scalability': 'Performance et Scalabilité',
        'integrations-interoperability': 'Intégrations et Interopérabilité',
        'accessibility-settings': 'Personnes à mobilité réduite',
        'offline-mode': 'Mode hors-ligne',
        'mobile-app': 'Version Mobile Native'
      },
      ar: {
        'nomenclature': 'التسمية',
        'complementary-resources': 'الموارد التكميلية',
        'data-management': 'حوكمة البيانات',
        'alerts-notifications': 'التنبيهات والإشعارات',
        'user-management': 'إدارة المستخدمين',
        'security': 'الأمان',
        'performance-scalability': 'الأداء والقابلية للتوسع',
        'integrations-interoperability': 'التكامل والتشغيل البيني',
        'accessibility-settings': 'الأشخاص ذوو الإعاقة الحركية',
        'offline-mode': 'الوضع غير المتصل',
        'mobile-app': 'النسخة المحمولة الأصلية'
      },
      en: {
        'nomenclature': 'Nomenclature',
        'complementary-resources': 'Complementary Resources',
        'data-management': 'Data Governance',
        'alerts-notifications': 'Alerts & Notifications',
        'user-management': 'User Management',
        'security': 'Security',
        'performance-scalability': 'Performance and Scalability',
        'integrations-interoperability': 'Integrations and Interoperability',
        'accessibility-settings': 'Accessibility Settings',
        'offline-mode': 'Offline Mode',
        'mobile-app': 'Native Mobile Version'
      }
    };
    return titles[language as keyof typeof titles]?.[section as keyof typeof titles['fr']] || 'Configuration';
  };

  const getSectionDescription = () => {
    const descriptions = {
      fr: {
        'nomenclature': 'Gérez les nomenclatures et classifications utilisées dans la plateforme.',
        'complementary-resources': 'Configurez les ressources complémentaires et références externes.',
        'data-management': 'Gouvernance des données et administration de la base de données.',
        'alerts-notifications': 'Configurez les alertes et notifications du système.',
        'user-management': 'Gérez les utilisateurs, rôles et permissions.',
        'security': 'Configurez les paramètres de sécurité et authentification.',
        'performance-scalability': 'Architecture cloud-native et optimisations techniques.',
        'integrations-interoperability': 'Configurez les intégrations et standards d\'interopérabilité.',
        'accessibility-settings': 'Paramètres d\'accessibilité pour personnes à mobilité réduite.',
        'offline-mode': 'Configuration du mode de fonctionnement hors-ligne.',
        'mobile-app': 'Paramètres et configuration de l\'application mobile native.'
      },
      ar: {
        'nomenclature': 'أدر التسميات والتصنيفات المستخدمة في المنصة.',
        'complementary-resources': 'اضبط الموارد التكميلية والمراجع الخارجية.',
        'data-management': 'حوكمة البيانات وإدارة قاعدة البيانات.',
        'alerts-notifications': 'اضبط تنبيهات وإشعارات النظام.',
        'user-management': 'أدر المستخدمين والأدوار والصلاحيات.',
        'security': 'اضبط إعدادات الأمان والمصادقة.',
        'performance-scalability': 'هندسة الحوسبة السحابية والتحسينات التقنية.',
        'integrations-interoperability': 'اضبط التكامل ومعايير التشغيل البيني.',
        'accessibility-settings': 'إعدادات إمكانية الوصول للأشخاص ذوي الإعاقة الحركية.',
        'offline-mode': 'تكوين وضع التشغيل بدون اتصال.',
        'mobile-app': 'إعدادات وتكوين التطبيق المحمول الأصلي.'
      },
      en: {
        'nomenclature': 'Manage nomenclatures and classifications used in the platform.',
        'complementary-resources': 'Configure complementary resources and external references.',
        'data-management': 'Data governance and database administration.',
        'alerts-notifications': 'Configure system alerts and notifications.',
        'user-management': 'Manage users, roles and permissions.',
        'security': 'Configure security settings and authentication.',
        'performance-scalability': 'Cloud-native architecture and technical optimizations.',
        'integrations-interoperability': 'Configure integrations and interoperability standards.',
        'accessibility-settings': 'Accessibility settings for people with reduced mobility.',
        'offline-mode': 'Configure offline mode operation.',
        'mobile-app': 'Settings and configuration of the native mobile application.'
      }
    };
    return descriptions[language as keyof typeof descriptions]?.[section as keyof typeof descriptions['fr']];
  };

  const getSectionIcon = () => {
    switch (section) {
      case "nomenclature":
        return BookOpen; // Livre pour nomenclature/taxonomie
      case "complementary-resources":
        return Package; // Paquet pour ressources complémentaires
      case "alerts-notifications":
        return Bell; // Cloche pour alertes et notifications
      case "user-management":
        return Users; // Utilisateurs pour gestion des utilisateurs
      case "performance-scalability":
        return Zap; // Éclair pour performance et scalabilité
      default:
        return Settings; // Icône par défaut pour les autres
    }
  };

  const getSectionIconColor = () => {
    switch (section) {
      case "nomenclature":
        return "text-blue-600"; // Bleu pour nomenclature
      case "complementary-resources":
        return "text-green-600"; // Vert pour ressources
      case "alerts-notifications":
        return "text-orange-600"; // Orange pour alertes
      case "user-management":
        return "text-purple-600"; // Violet pour utilisateurs
      case "performance-scalability":
        return "text-yellow-600"; // Jaune pour performance
      default:
        return "text-gray-600"; // Gris par défaut
    }
  };

  const getSectionContent = () => {
    switch (section) {
      case "nomenclature":
        return <NomenclatureSection language={language} />;
      case "complementary-resources":
        return <ComplementaryResourcesSection language={language} />;
      case "data-management":
        return <DataManagementSection language={language} />;
      case "alerts-notifications":
        return <AlertsNotificationsSection language={language} />;
      case "user-management":
        return <UserManagementSection language={language} />;
      case "security":
        return <SecuritySection language={language} />;
      case "performance-scalability":
        return <PerformanceScalabilitySection language={language} />;
      case "integrations-interoperability":
        return <IntegrationsInteroperabilitySection language={language} />;
      case "accessibility-settings":
        return <AccessibilitySettings language={language} />;
      case "offline-mode":
        return <OfflineMode language={language} />;
      case "mobile-app":
        return <MobileAppSection language={language} />;
      default:
        return <div>Section non trouvée</div>;
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title={getSectionTitle()}
        description={getSectionDescription()}
        icon={getSectionIcon()}
        iconColor={getSectionIconColor()}
      />
      
      {getSectionContent()}
    </div>
  );
}
