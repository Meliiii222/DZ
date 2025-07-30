import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, CalendarIcon, Filter, Download, Eye, Share, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { SearchService, SearchResult } from '@/components/search/SearchService';
import { EnhancedInput } from '@/components/common/EnhancedInput';

export function AdvancedSearchSection() {
  const [keywords, setKeywords] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [institution, setInstitution] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const documentTypes = [
    'Tous les types',
    'Loi',
    'Décret',
    'Arrêté',
    'Circulaire',
    'Ordonnance',
    'Code',
    'Jurisprudence'
  ];

  const institutions = [
    'Ministère ou institution...',
    'Présidence de la République',
    'Premier Ministère',
    'Ministère de la Justice',
    'Ministère de l\'Intérieur et des Collectivités Locales',
    'Ministère des Finances',
    'Ministère de l\'Énergie',
    'Ministère de l\'Agriculture et du Développement Rural'
  ];

  const handleSearch = async () => {
    if (!keywords.trim()) return;
    
    setLoading(true);
    try {
      const filters: Record<string, string> = {};
      
      if (documentType && documentType !== 'Tous les types') {
        filters.category = documentType;
      }
      if (institution && institution !== 'Ministère ou institution...') {
        filters.institution = institution;
      }
      if (startDate) {
        filters.dateFrom = startDate.toISOString();
      }
      if (endDate) {
        filters.dateTo = endDate.toISOString();
      }
      
      const results = await SearchService.searchAll(keywords, filters);
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setKeywords('');
    setDocumentType('');
    setInstitution('');
    setStartDate(undefined);
    setEndDate(undefined);
    setShowResults(false);
    setSearchResults([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Recherche avancée</h1>
        <p className="text-muted-foreground">
          Utilisez des critères spécifiques pour affiner votre recherche
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Keywords */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="keywords">Mots-clés</Label>
              <EnhancedInput
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Rechercher dans le contenu..."
                context="search"
                enableVoice={true}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="document-type">Type de document</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tous les types">Tous les types</SelectItem>
                  <SelectItem value="Loi">Loi</SelectItem>
                  <SelectItem value="Décret">Décret</SelectItem>
                  <SelectItem value="Arrêté">Arrêté</SelectItem>
                  <SelectItem value="Circulaire">Circulaire</SelectItem>
                  <SelectItem value="Ordonnance">Ordonnance</SelectItem>
                  <SelectItem value="Code">Code</SelectItem>
                  <SelectItem value="Jurisprudence">Jurisprudence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Period and Institution sections */}
          <div className="space-y-2">
            <Label>Période</Label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-sm text-gray-600">Du</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy", { locale: fr }) : "jj/mm/aaaa"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-sm text-gray-600">Au</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy", { locale: fr }) : "jj/mm/aaaa"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="institution">Institution</Label>
            <Select value={institution} onValueChange={setInstitution}>
              <SelectTrigger>
                <SelectValue placeholder="Ministère ou institution..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ministère ou institution...">Ministère ou institution...</SelectItem>
                <SelectItem value="Présidence de la République">Présidence de la République</SelectItem>
                <SelectItem value="Premier Ministère">Premier Ministère</SelectItem>
                <SelectItem value="Ministère de la Justice">Ministère de la Justice</SelectItem>
                <SelectItem value="Ministère de l'Intérieur et des Collectivités Locales">Ministère de l'Intérieur et des Collectivités Locales</SelectItem>
                <SelectItem value="Ministère des Finances">Ministère des Finances</SelectItem>
                <SelectItem value="Ministère de l'Énergie">Ministère de l'Énergie</SelectItem>
                <SelectItem value="Ministère de l'Agriculture et du Développement Rural">Ministère de l'Agriculture et du Développement Rural</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={handleSearch}
              disabled={loading || !keywords.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              {loading ? 'Recherche...' : 'Rechercher'}
            </Button>
            <Button 
              variant="outline"
              onClick={handleReset}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {showResults && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Résultats de la recherche</h2>
            <p className="text-muted-foreground">{searchResults.length} résultats trouvés</p>
          </div>

          <div className="space-y-4">
            {searchResults.map((result) => (
              <Card key={result.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={result.type === 'legal_text' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}>
                          {result.type === 'legal_text' ? 'Texte juridique' : 'Procédure'}
                        </Badge>
                        <Badge variant="outline">{result.category}</Badge>
                        <Badge variant="secondary" className="text-xs">
                          {Math.round(result.relevance * 100)}% pertinent
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">{result.title}</h3>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {result.description}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        {result.institution && <span>{result.institution}</span>}
                        <span>Mis à jour: {new Date(result.lastUpdate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-6">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                        <Eye className="w-4 h-4" />
                        Consulter
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Télécharger
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Share className="w-4 h-4" />
                        Partager
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
