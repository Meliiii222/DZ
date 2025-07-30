
import { useState } from 'react';
import { DocumentViewerModal } from '@/components/modals/DocumentViewerModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Brain, 
  Zap, 
  Target,
  BookOpen,
  FileText,
  Scale,
  Users,
  ClipboardList
} from 'lucide-react';

export function ImmersiveSearchInterface() {
  // États pour les modales métier
  const [showBrowseModal, setShowBrowseModal] = useState(false);
  const [browseType, setBrowseType] = useState<string>('');
  const [browseTitle, setBrowseTitle] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fonction de recherche sémantique
  const handleSemanticSearch = (query: string) => {
    // Simulation d'une vraie recherche sémantique
    console.log('Recherche sémantique:', query);
    // Ici on pourrait implémenter une vraie recherche
  };

  // Fonction de recherche par mots-clés
  const handleKeywordSearch = (query: string) => {
    // Simulation d'une vraie recherche par mots-clés
    console.log('Recherche mots-clés:', query);
    // Ici on pourrait implémenter une vraie recherche
  };

  // Fonction de recherche IA avancée
  const handleAISearch = (query: string) => {
    // Simulation d'une vraie recherche IA
    console.log('Recherche IA:', query);
    // Ici on pourrait implémenter une vraie recherche
  };

  // Fonction de navigation par type
  const handleBrowseType = (type: string, title: string) => {
    setBrowseType(type);
    setBrowseTitle(title);
    setShowBrowseModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Interface de Recherche Immersive</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explorez notre base de données juridique avec des outils de recherche avancés et intelligents
        </p>
      </div>

      {/* Barre de recherche principale */}
      <div className="max-w-2xl mx-auto">
        <div className="flex gap-2">
          <Input
            placeholder="Entrez vos termes de recherche..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button onClick={() => handleSemanticSearch(searchQuery)}>
            <Search className="w-4 h-4 mr-2" />
            Rechercher
          </Button>
        </div>
      </div>

      {/* Search Modes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-indigo-600" />
            </div>
            <CardTitle className="text-indigo-900">Recherche Sémantique</CardTitle>
            <CardDescription>
              Recherche intelligente basée sur le sens et le contexte
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => handleSemanticSearch(searchQuery || 'recherche contextuelle')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Brain className="w-4 h-4 mr-2" />
              Recherche sémantique
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-green-900">Recherche Mots-clés</CardTitle>
            <CardDescription>
              Recherche précise par termes et expressions
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => handleKeywordSearch(searchQuery || 'recherche par termes')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Search className="w-4 h-4 mr-2" />
              Recherche mots-clés
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <CardTitle className="text-purple-900">IA Avancée</CardTitle>
            <CardDescription>
              Recherche assistée par intelligence artificielle
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => handleAISearch(searchQuery || 'recherche intelligente')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              IA avancée
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Navigation par type */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Navigation par Type de Document
          </CardTitle>
          <CardDescription>
            Accédez directement aux différents types de textes juridiques
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <Button 
              onClick={() => handleBrowseType('loi', 'Lois')}
              className="bg-red-600 hover:bg-red-700"
            >
              <Scale className="w-4 h-4 mr-2" />
              Lois
            </Button>
            <Button
              onClick={() => handleBrowseType('decret', 'Décrets')}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              Décrets
            </Button>
            <Button
              onClick={() => handleBrowseType('arrete', 'Arrêtés')}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              <ClipboardList className="w-4 h-4 mr-2" />
              Arrêtés
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modale de navigation par type */}
      {showBrowseModal && (
        <DocumentViewerModal
          isOpen={showBrowseModal}
          onClose={() => setShowBrowseModal(false)}
          document={{
            title: `Navigation: ${browseTitle}`,
            content: `Interface de navigation dans les ${browseTitle.toLowerCase()}\n\nType: ${browseType}\n\nFiltres disponibles:\n- Par date\n- Par institution\n- Par domaine\n- Par statut\n\nInterface de navigation et filtrage par type de document.`
          }}
        />
      )}
    </div>
  );
}
