// @ts-nocheck
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Clock, Command, Search, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface VoiceSearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  context?: 'search' | 'legal' | 'procedure' | 'general';
  className?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  suggestions?: Array<{
    id: string;
    text: string;
    type: 'recent' | 'suggestion' | 'template' | 'legal_term';
    category?: string;
  }>;
  showVoiceButton?: boolean;
  onVoiceResult?: (text: string) => void;
}

export function VoiceSearchInput({ 
  value = '',
  onChange,
  placeholder = '',
  context = 'general',
  className = '',
  onKeyPress,
  suggestions = [],
  showVoiceButton = true,
  onVoiceResult
}: VoiceSearchInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Suggestions par défaut selon le contexte - memoized to prevent infinite loops
  const getDefaultSuggestions = useCallback(() => {
    const contextSuggestions = {
      legal: [
        { id: '1', text: 'Code civil algérien', type: 'legal_term', category: 'Code' },
        { id: '2', text: 'Loi de finances 2024', type: 'legal_term', category: 'Loi' },
        { id: '3', text: 'Décret exécutif', type: 'legal_term', category: 'Décret' },
        { id: '4', text: 'Constitution algérienne', type: 'legal_term', category: 'Constitution' },
        { id: '5', text: 'Ordonnance présidentielle', type: 'legal_term', category: 'Ordonnance' },
        { id: '6', text: 'Arrêté ministériel', type: 'legal_term', category: 'Arrêté' },
        { id: '7', text: 'Jurisprudence', type: 'legal_term', category: 'Jurisprudence' }
      ],
      procedure: [
        { id: '1', text: 'Demande de passeport', type: 'template', category: 'Identité' },
        { id: '2', text: 'Inscription universitaire', type: 'template', category: 'Éducation' },
        { id: '3', text: 'Création d\'entreprise', type: 'template', category: 'Commerce' },
        { id: '4', text: 'Permis de conduire', type: 'template', category: 'Transport' },
        { id: '5', text: 'Acte de naissance', type: 'template', category: 'État civil' },
        { id: '6', text: 'Permis de construire', type: 'template', category: 'Urbanisme' }
      ],
      search: [
        { id: '1', text: 'textes juridiques récents', type: 'suggestion' },
        { id: '2', text: 'procédures administratives', type: 'suggestion' },
        { id: '3', text: 'jurisprudence 2024', type: 'suggestion' },
        { id: '4', text: 'lois modifiées', type: 'suggestion' },
        { id: '5', text: 'décrets d\'application', type: 'suggestion' }
      ],
      general: [
        { id: '1', text: 'rechercher dans', type: 'suggestion' },
        { id: '2', text: 'documentation officielle', type: 'suggestion' },
        { id: '3', text: 'aide et support', type: 'suggestion' }
      ]
    };
    return contextSuggestions[context] || contextSuggestions.general;
  }, [context]);

  useEffect(() => {
    if (!showVoiceButton) return;

    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'fr-FR';
      
      recognition.onresult = (event: Record<string, unknown>) => {
        const transcript = event.results[0]?.transcript;
        if (transcript) {
          onChange?.(transcript);
          onVoiceResult?.(transcript);
        }
        setIsListening(false);
      };
      
      recognition.onerror = (event: Record<string, unknown>) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Erreur de reconnaissance vocale",
          description: "Une erreur s'est produite lors de la reconnaissance vocale.",
          variant: "destructive"
        });
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [showVoiceButton]);

  // Memoize suggestions to prevent unnecessary re-renders
  const memoizedSuggestions = React.useMemo(() => {
    const defaultSugs = getDefaultSuggestions();
    return [...suggestions, ...defaultSugs];
  }, [suggestions, getDefaultSuggestions]);

  // Filtrer les suggestions
  useEffect(() => {
    if (value && value.length > 0) {
      const filtered = memoizedSuggestions
        .filter(item => 
          item.text.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 8);
      if (
        JSON.stringify(filtered) !== JSON.stringify(filteredSuggestions) ||
        showSuggestions !== (filtered.length > 0)
      ) {
        setFilteredSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
        setSelectedIndex(-1);
      }
    } else {
      if (showSuggestions || filteredSuggestions.length > 0) {
        setShowSuggestions(false);
        setFilteredSuggestions([]);
        setSelectedIndex(-1);
      }
    }
  }, [value, memoizedSuggestions]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast({
          title: "Erreur",
          description: "Impossible de démarrer la reconnaissance vocale.",
          variant: "destructive"
        });
      }
    }
  }, [isListening, toast]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
          onChange?.(filteredSuggestions[selectedIndex].text);
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

  const handleSuggestionClick = (suggestion: Record<string, unknown>) => {
    onChange?.(suggestion.text);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const getSuggestionIcon = useCallback((type: string) => {
    switch (type) {
      case 'recent': return <Clock className="w-3 h-3" />;
      case 'template': return <Command className="w-3 h-3" />;
      case 'legal_term': return <Star className="w-3 h-3" />;
      default: return <Search className="w-3 h-3" />;
    }
  }, []);

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className={cn(
              isListening ? "border-red-300 bg-red-50" : "",
              className
            )}
            onKeyDown={handleKeyDown}
            onFocus={() => value.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          
          {/* Indicateur d'écoute */}
          {isListening && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
        
        {isSupported && showVoiceButton && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={isListening ? stopListening : startListening}
            className="flex items-center gap-2"
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4 animate-pulse text-red-500" />
                <span className="hidden sm:inline">Arrêter</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span className="hidden sm:inline">Vocal</span>
              </>
            )}
          </Button>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && !isListening && filteredSuggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-64 overflow-y-auto bg-white border shadow-lg">
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