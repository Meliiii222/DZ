
import React, { useState } from 'react';
import { Search, Mic, MicOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';

interface TabSearchFieldProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  suggestions?: string[];
  className?: string;
}

export function TabSearchField({ 
  placeholder = "Rechercher des textes juridiques...", 
  onSearch,
  suggestions = [
    "Code civil algérien",
    "Loi sur l'investissement",
    "Procédure administrative",
    "Marchés publics",
    "Droit du travail"
  ],
  className = ""
}: TabSearchFieldProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useVoiceRecognition({
    continuous: false,
    interimResults: true,
    language: 'fr-FR'
  });

  const handleInputChange = (value: string) => {
    setQuery(value);
    
    if (value.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    if (query.trim() || transcript.trim()) {
      const searchQuery = query.trim() || transcript.trim();
      onSearch?.(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch?.(suggestion);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      if (transcript) {
        setQuery(transcript);
        handleInputChange(transcript);
      }
    } else {
      resetTranscript();
      startListening();
    }
  };

  // Utiliser le transcript vocal si disponible
  React.useEffect(() => {
    if (transcript && !isListening) {
      handleInputChange(transcript);
    }
  }, [transcript, isListening]);

  return (
    <div className={`relative w-full ${className}`}>
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-white border-2 border-blue-200">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={query || transcript}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={placeholder}
              className="pl-10 pr-20 h-12 text-base border-blue-300 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={() => {
                if (query.length > 0) {
                  const filtered = suggestions.filter(suggestion =>
                    suggestion.toLowerCase().includes(query.toLowerCase())
                  );
                  setFilteredSuggestions(filtered);
                  setShowSuggestions(filtered.length > 0);
                }
              }}
            />
            
            {/* Bouton vocal */}
            {isSupported && (
              <Button
                type="button"
                variant={isListening ? "destructive" : "outline"}
                size="sm"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
                  isListening ? 'bg-red-500 hover:bg-red-600' : 'hover:bg-blue-50'
                }`}
                onClick={handleVoiceToggle}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4 text-white" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
          
          <Button 
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 h-12 px-6"
            disabled={!query.trim() && !transcript.trim()}
          >
            <Search className="w-4 h-4 mr-2" />
            Vocal
          </Button>
        </div>
        
        {isListening && (
          <div className="mt-2 text-sm text-red-600 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            Écoute en cours...
          </div>
        )}
      </Card>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto border-blue-200">
          <div className="p-2">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 hover:bg-blue-50 cursor-pointer rounded text-sm text-gray-700 transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Search className="w-3 h-3 inline mr-2 text-gray-400" />
                {suggestion}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
