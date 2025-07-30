
import { UnifiedSectionHeader } from './common/UnifiedSectionHeader';
import { UnifiedAIAssistant } from './ai/UnifiedAIAssistant';
import { Bot } from 'lucide-react';

interface AISearchSectionProps {
  language?: string;
}

export function AISearchSection({ language = "fr" }: AISearchSectionProps) {
  return (
    <div className="space-y-6">
      <UnifiedSectionHeader
        icon={() => <img src="/lovable-uploads/AI.png" alt="IA" className="w-12 h-12" />}
        title="Recherche IA"
        description="Recherche intelligente assistée par Intelligence Artificielle avec analyse contextuelle"
        iconColor="text-blue-600"
      />
      <UnifiedAIAssistant />
    </div>
  );
}
