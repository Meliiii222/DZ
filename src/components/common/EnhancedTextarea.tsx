
// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Clock, Star, Command, Search } from 'lucide-react';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { cn } from '@/lib/utils';

interface SuggestionItem {
  id: string;
  text: string;
  type: 'recent' | 'suggestion' | 'template' | 'legal_term';
  category?: string;
}

interface EnhancedTextareaProps extends React.ComponentProps<"textarea"> {
  enableVoice?: boolean;
  context?: 'search' | 'legal' | 'procedure' | 'general';
  suggestions?: SuggestionItem[];
  showVoiceButton?: boolean;
}

export function EnhancedTextarea({ 
  enableVoice = true, 
  context = 'general',
  suggestions = [],
  showVoiceButton = true,
  className,
  value,
  onChange,
  onKeyPress,
  placeholder,
  ...props 
}: EnhancedTextareaProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SuggestionItem[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  const { 
    isListening, 
    transcript, 
    isSupported, 
    error, 
    startListening, 
    stopListening, 
    resetTranscript 
  } = useVoiceRecognition({
    continuous: false,
    interimResults: true,
    language: 'fr-FR'
  });

  // Suggestions prédéfinies par contexte
  const defaultSuggestions: Record<string, SuggestionItem[]> = {
    legal: [
      { id: '1', text: 'Code civil algérien', type: 'legal_term', category: 'Code' },
      { id: '2', text: 'Loi de finances 2024', type: 'legal_term', category: 'Loi' },
      { id: '3', text: 'Décret exécutif', type: 'legal_term', category: 'Décret' },
      { id: '4', text: 'Constitution algérienne', type: 'legal_term', category: 'Constitution' },
      { id: '5', text: 'Ordonnance présidentielle', type: 'legal_term', category: 'Ordonnance' }
    ],
    procedure: [
      { id: '1', text: 'Demande de passeport biométrique', type: 'template', category: 'Identité' },
      { id: '2', text: 'Inscription universitaire', type: 'template', category: 'Éducation' },
      { id: '3', text: 'Création d\'entreprise EURL', type: 'template', category: 'Commerce' },
      { id: '4', text: 'Permis de construire', type: 'template', category: 'Urbanisme' }
    ],
    search: [
      { id: '1', text: 'textes juridiques récents', type: 'suggestion' },
      { id: '2', text: 'procédures administratives', type: 'suggestion' },
      { id: '3', text: 'jurisprudence 2024', type: 'suggestion' }
    ],
    general: [
      { id: '1', text: 'rechercher dans', type: 'suggestion' },
      { id: '2', text: 'documentation officielle', type: 'suggestion' }
    ]
  };

  // Mettre à jour la valeur depuis la reconnaissance vocale
  useEffect(() => {
    if (transcript && transcript.trim() !== '') {
      const currentValue = (value as string) || '';
      const newValue = currentValue + (currentValue ? ' ' : '') + transcript;
      onChange?.({ target: { value: newValue } } as Record<string, unknown>);
    }
  }, [transcript, onChange, value]);

  // Filtrer les suggestions en fonction de la saisie
  useEffect(() => {
    const allSuggestions = [...(suggestions || []), ...(defaultSuggestions[context] || [])];
    const currentValue = (value as string) || '';
    
    if (currentValue.length > 0) {
      const filtered = allSuggestions
        .filter(item => 
          item.text.toLowerCase().includes(currentValue.toLowerCase())
        )
        .slice(0, 6);
      
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
    setSelectedIndex(-1);
  }, [value, context, suggestions, defaultSuggestions]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showSuggestions) {
      if (onKeyPress) {
        onKeyPress(e);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          onChange?.({ target: { value: filteredSuggestions[selectedIndex].text } } as Record<string, unknown>);
          setShowSuggestions(false);
        } else if (onKeyPress) {
          onKeyPress(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      default:
        if (onKeyPress) {
          onKeyPress(e);
        }
    }
  };

  const handleSuggestionClick = (suggestion: SuggestionItem) => {
    onChange?.({ target: { value: suggestion.text } } as Record<string, unknown>);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  const getSuggestionIcon = (type: SuggestionItem['type']) => {
    switch (type) {
      case 'recent': return <Clock className="w-3 h-3" />;
      case 'template': return <Command className="w-3 h-3" />;
      case 'legal_term': return <Star className="w-3 h-3" />;
      default: return <Search className="w-3 h-3" />;
    }
  };

  // Si enableVoice est false, utiliser Textarea standard
  if (!enableVoice) {
    return (
      <Textarea
        {...props}
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyPress}
        placeholder={placeholder}
        className={className}
      />
    );
  }

  return (
    <div className="relative">
      <div className="relative">
        <Textarea
          {...props}
          ref={textareaRef}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onFocus={() => (value as string)?.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className={cn(
            isListening ? "border-red-300 bg-red-50" : "",
            className
          )}
        />
        
        {showVoiceButton && isSupported && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleVoiceToggle}
            className={cn(
              "absolute right-2 top-2 h-8 w-8 p-0",
              isListening ? "text-red-600 bg-red-100 hover:bg-red-200" : "text-gray-400 hover:text-gray-600"
            )}
            title={isListening ? "Arrêter l'écoute" : "Commencer la dictée vocale"}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {/* Indicateur de reconnaissance vocale */}
      {isListening && (
        <div className="absolute top-full left-0 right-0 z-40 mt-1">
          <Card className="p-2 bg-red-50 border-red-200">
            <div className="flex items-center gap-2 text-red-700 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Écoute en cours... Parlez maintenant
            </div>
          </Card>
        </div>
      )}

      {/* Erreur de reconnaissance vocale */}
      {error && (
        <div className="absolute top-full left-0 right-0 z-40 mt-1">
          <Card className="p-2 bg-red-50 border-red-200">
            <div className="text-red-700 text-sm">{error}</div>
          </Card>
        </div>
      )}
      
      {/* Suggestions */}
      {showSuggestions && !isListening && (
        <Card 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 max-h-64 overflow-y-auto bg-white border shadow-lg"
        >
          <div className="p-2">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  "flex items-center gap-2 p-2 rounded cursor-pointer transition-colors",
                  index === selectedIndex 
                    ? "bg-emerald-50 text-emerald-700" 
                    : "hover:bg-gray-50"
                )}
              >
                {getSuggestionIcon(suggestion.type)}
                <span className="flex-1">{suggestion.text}</span>
                {suggestion.category && (
                  <Badge variant="outline" className="text-xs">
                    {suggestion.category}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
