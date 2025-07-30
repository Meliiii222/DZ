
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Brain, Zap, Headphones } from 'lucide-react';
import { UnifiedSectionHeader } from '@/components/common/UnifiedSectionHeader';
import { AICapabilitiesOverview } from './AICapabilitiesOverview';
import { NLPAnalysisTab } from './NLPAnalysisTab';
import { ConversationTab } from './ConversationTab';
import { RecommendationsTab } from './RecommendationsTab';
import { AIAdvancedSection } from './AIAdvancedSection';
import { VoiceAssistant } from './VoiceAssistant';
import { AutonomousAgent } from './AutonomousAgent';

export function EnhancedAILegalAssistant() {
  const [activeTab, setActiveTab] = useState('conversation');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);



  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <UnifiedSectionHeader
        icon={() => <img src="/lovable-uploads/AI.png" alt="IA" className="w-12 h-12" />}
        title="Assistant IA Juridique Avancé"
        description="Suite complète d'outils d'intelligence artificielle pour l'analyse juridique"
        iconColor="text-green-600"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="conversation">Assistant IA</TabsTrigger>
          <TabsTrigger value="voice-assistant">Assistant Vocal</TabsTrigger>
          <TabsTrigger value="autonomous-agent">IA Agentique</TabsTrigger>
          <TabsTrigger value="ai-advanced">IA Avancée</TabsTrigger>
          <TabsTrigger value="nlp">NLP Avancé</TabsTrigger>
          <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
        </TabsList>

        <TabsContent value="conversation" className="space-y-6">
          <ConversationTab />
        </TabsContent>

        <TabsContent value="voice-assistant" className="space-y-6">
          <VoiceAssistant />
        </TabsContent>

        <TabsContent value="autonomous-agent" className="space-y-6">
          <AutonomousAgent />
        </TabsContent>

        <TabsContent value="ai-advanced" className="space-y-6">
          <AIAdvancedSection />
        </TabsContent>

        <TabsContent value="nlp" className="space-y-6">
          <NLPAnalysisTab />
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <RecommendationsTab />
        </TabsContent>
      </Tabs>

      <AICapabilitiesOverview />
    </div>
  );
}
