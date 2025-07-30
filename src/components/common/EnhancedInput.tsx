
// @ts-nocheck
import React from 'react';
import { Input } from '@/components/ui/input';
import { VoiceSearchInput } from './VoiceSearchInput';
import { cn } from '@/lib/utils';

interface EnhancedInputProps extends React.ComponentProps<"input"> {
  enableVoice?: boolean;
  context?: 'search' | 'legal' | 'procedure' | 'general';
  suggestions?: Array<{
    id: string;
    text: string;
    type: 'recent' | 'suggestion' | 'template' | 'legal_term';
    category?: string;
  }>;
}

export function EnhancedInput({ 
  enableVoice = true, 
  context = 'general',
  suggestions,
  className,
  value,
  onChange,
  onKeyPress,
  placeholder,
  ...props 
}: EnhancedInputProps) {
  // Toujours utiliser VoiceSearchInput pour tous les champs
  return (
    <VoiceSearchInput
      value={value as string || ''}
      onChange={(val) => onChange?.({ target: { value: val } } as Record<string, unknown>)}
      placeholder={placeholder}
      context={context}
      className={className}
      onKeyPress={onKeyPress}
      suggestions={suggestions}
      showVoiceButton={enableVoice}
    />
  );
}
