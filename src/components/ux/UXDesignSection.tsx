
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Layout, 
  User, 
  Accessibility,
  Moon,
  Zap,
  Eye,
  Volume2
} from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ContextualInterface } from './ContextualInterface';
import { IntelligentDarkMode } from './IntelligentDarkMode';
import { DragDropLayout } from './DragDropLayout';
import { IntelligentShortcuts } from './IntelligentShortcuts';
import { UniversalAccessibility } from './UniversalAccessibility';

interface UXDesignSectionProps {
  language?: string;
}

export function UXDesignSection({ language = "fr" }: UXDesignSectionProps) {
  const [activeTab, setActiveTab] = useState('contextual-ui');

  const features = [
    {
      id: 'contextual-ui',
      title: 'Interface Contextuelle',
      description: 'Interface adaptative selon le rôle utilisateur',
      icon: User,
      color: 'text-blue-600',
      component: ContextualInterface
    },
    {
      id: 'dark-mode',
      title: 'Dark Mode Intelligent',
      description: 'Mode sombre adaptatif et personnalisé',
      icon: Moon,
      color: 'text-indigo-600',
      component: IntelligentDarkMode
    },
    {
      id: 'drag-drop',
      title: 'Layout Drag & Drop',
      description: 'Personnalisation complète de l\'espace de travail',
      icon: Layout,
      color: 'text-green-600',
      component: DragDropLayout
    },
    {
      id: 'shortcuts',
      title: 'Raccourcis Intelligents',
      description: 'Raccourcis adaptatifs basés sur les habitudes',
      icon: Zap,
      color: 'text-yellow-600',
      component: IntelligentShortcuts
    },
    {
      id: 'accessibility',
      title: 'Accessibilité Universelle',
      description: 'Fonctionnalités d\'accessibilité avancées',
      icon: Accessibility,
      color: 'text-emerald-600',
      component: UniversalAccessibility
    }
  ];

  const stats = [
    { title: 'Interfaces adaptables', value: '4+', color: 'text-blue-600' },
    { title: 'Thèmes disponibles', value: '8', color: 'text-purple-600' },
    { title: 'Raccourcis intelligents', value: '25+', color: 'text-green-600' },
    { title: 'Options accessibilité', value: '15+', color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Expérience Utilisateur et Design"
        description="Interface adaptative, personnalisée et accessible pour tous les utilisateurs"
        icon={Palette}
        iconColor="text-purple-600"
      />

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Onglets des fonctionnalités */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          {features.map((feature) => (
            <TabsTrigger key={feature.id} value={feature.id} className="flex items-center gap-2">
              <feature.icon className={`w-4 h-4 ${feature.color}`} />
              <span className="hidden sm:inline">{feature.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {features.map((feature) => (
          <TabsContent key={feature.id} value={feature.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  {feature.title}
                </CardTitle>
                <p className="text-gray-600">{feature.description}</p>
              </CardHeader>
              <CardContent>
                <feature.component />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Aperçu des améliorations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            Aperçu des Améliorations UX
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Interface Adaptative
              </h4>
              <ul className="text-sm space-y-1 text-blue-700">
                <li>• UI contextuelle par rôle</li>
                <li>• Menus personnalisés</li>
                <li>• Actions rapides adaptées</li>
                <li>• Widgets pertinents</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Moon className="w-4 h-4 text-purple-600" />
                Personnalisation
              </h4>
              <ul className="text-sm space-y-1 text-purple-700">
                <li>• Dark mode intelligent</li>
                <li>• Layout drag & drop</li>
                <li>• Thèmes adaptatifs</li>
                <li>• Configuration sauvée</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Accessibility className="w-4 h-4 text-green-600" />
                Accessibilité
              </h4>
              <ul className="text-sm space-y-1 text-green-700">
                <li>• Lecteur d'écran optimisé</li>
                <li>• Navigation vocale</li>
                <li>• Modes de contraste</li>
                <li>• TTS juridique spécialisé</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
