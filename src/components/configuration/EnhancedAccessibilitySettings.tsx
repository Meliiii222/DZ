
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Accessibility, 
  Eye, 
  Volume2, 
  Keyboard, 
  Mouse, 
  Palette, 
  Type,
  Settings,
  Save,
  RotateCcw,
  Zap,
  Layout,
  User
} from 'lucide-react';
import { UnifiedSectionHeader } from '../common/UnifiedSectionHeader';
import { AccessibilitySettings } from './AccessibilitySettings';
import { UXDesignSection } from '../ux/UXDesignSection';

interface EnhancedAccessibilitySettingsProps {
  language?: string;
}

export function EnhancedAccessibilitySettings({ language = "fr" }: EnhancedAccessibilitySettingsProps) {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="space-y-6">
      <UnifiedSectionHeader
        icon={Accessibility}
        title="Paramètres d'Accessibilité et UX Avancés"
        description="Configuration complète pour une expérience utilisateur optimale et accessible"
        iconColor="text-emerald-600"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <Accessibility className="w-4 h-4" />
            Accessibilité Standard
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            UX & Design Avancé
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <AccessibilitySettings language={language} />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <UXDesignSection language={language} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
