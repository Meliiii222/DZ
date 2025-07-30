// @ts-nocheck
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  BookOpen, 
  Volume2,
  Star,
  Share2,
  Filter,
  Plus,
  Eye,
  Download
} from 'lucide-react';
import { buttonHandlers } from '@/utils/buttonUtils';
import { AddDictionaryTermForm } from '@/components/forms/AddDictionaryTermForm';
import { EnrichDictionaryForm } from '@/components/forms/EnrichDictionaryForm';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

interface DictionaryEntry {
  id: number;
  term: string;
  definition: string;
  category: string;
  pronunciation: string;
  examples: string[];
  synonyms: string[];
  relatedTerms: string[];
  isFavorite: boolean;
}

export function DictionarySection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEnrichForm, setShowEnrichForm] = useState(false);

  const dictionaryEntries: DictionaryEntry[] = [
    {
      id: 1,
      term: "Jurisprudence",
      definition: "Ensemble des décisions de justice qui constituent une source du droit et servent de référence pour l'interprétation des règles juridiques.",
      category: "Droit général",
      pronunciation: "/ʒy.ʁis.pʁy.dɑ̃s/",
      examples: [
        "La jurisprudence de la Cour suprême fait autorité.",
        "Cette décision créera une jurisprudence importante."
      ],
      synonyms: ["Précédent judiciaire", "Case law"],
      relatedTerms: ["Précédent", "Décision", "Arrêt"],
      isFavorite: true
    },
    {
      id: 2,
      term: "Nullité",
      definition: "Sanction qui frappe un acte juridique ne respectant pas les conditions de validité requises par la loi.",
      category: "Droit civil",
      pronunciation: "/ny.li.te/",
      examples: [
        "La nullité du contrat a été prononcée par le tribunal.",
        "Cette clause est frappée de nullité absolue."
      ],
      synonyms: ["Invalidité", "Annulation"],
      relatedTerms: ["Validité", "Rescision", "Caducité"],
      isFavorite: false
    },
    {
      id: 3,
      term: "Prescription",
      definition: "Mécanisme juridique par lequel l'écoulement du temps produit des effets de droit, soit en faisant acquérir un droit, soit en l'éteignant.",
      category: "Droit civil",
      pronunciation: "/pʁɛs.kʁip.sjɔ̃/",
      examples: [
        "L'action en responsabilité est soumise à prescription.",
        "La prescription acquisitive permet d'acquérir la propriété."
      ],
      synonyms: ["Forclusion", "Limitation"],
      relatedTerms: ["Délai", "Forclusion", "Péremption"],
      isFavorite: false
    }
  ];

  const categories = ['tous', 'Droit général', 'Droit civil', 'Droit pénal', 'Droit administratif', 'Droit commercial'];

  const filteredEntries = dictionaryEntries.filter(entry => {
    const matchesSearch = entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'tous' || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination pour les entrées du dictionnaire
  const {
    currentData: paginatedEntries,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredEntries,
    itemsPerPage: 8
  });

  const handleToggleFavorite = (termId: number, termName: string, isFavorite: boolean) => {
    if (isFavorite) {
      buttonHandlers.removeFromFavorites(termName)();
    } else {
      buttonHandlers.addToFavorites(termName)();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dictionnaire Juridique</h1>
          <p className="text-muted-foreground mt-2">
            Définitions et explications des termes juridiques algériens
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            className="gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="w-4 h-4" />
            Ajouter un terme
          </Button>
          <Button 
            variant="outline"
            className="gap-2"
            onClick={() => setShowEnrichForm(true)}
          >
            <Download className="w-4 h-4" />
            Enrichir le dictionnaire
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher un terme juridique..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            size="sm"
            onClick={buttonHandlers.searchDictionary(searchTerm || 'terme')}
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <Button 
          variant="outline"
          onClick={buttonHandlers.generic('Filtres avancés', 'Ouverture des filtres avancés', 'Dictionnaire')}
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Liste des entrées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedEntries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl text-blue-600">{entry.term}</CardTitle>
                    <Badge variant="outline">{entry.category}</Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={buttonHandlers.generic(`Prononcer: ${entry.term}`, 'Lecture audio du terme', 'Dictionnaire')}
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{entry.pronunciation}</p>
                  <p className="text-gray-700 leading-relaxed">{entry.definition}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleToggleFavorite(entry.id, entry.term, entry.isFavorite)}
                >
                  <Star className={`w-5 h-5 ${entry.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Examples */}
                {entry.examples.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Exemples :</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {entry.examples.map((example, index) => (
                        <li key={index} className="text-sm text-gray-600 italic">
                          "{example}"
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Synonyms */}
                {entry.synonyms.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Synonymes :</h4>
                    <div className="flex flex-wrap gap-2">
                      {entry.synonyms.map((synonym, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {synonym}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related terms */}
                {entry.relatedTerms.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Termes associés :</h4>
                    <div className="flex flex-wrap gap-2">
                      {entry.relatedTerms.map((term, index) => (
                        <Button 
                          key={index} 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-6"
                          onClick={buttonHandlers.searchDictionary(term)}
                        >
                          {term}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={buttonHandlers.viewDocument(entry.id.toString(), entry.term, 'définition')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Voir détails
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={buttonHandlers.shareDocument(entry.id.toString(), entry.term)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Partager
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={buttonHandlers.downloadDocument(entry.id.toString(), `Définition - ${entry.term}`)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Termes populaires', 'Consultation des termes populaires', 'Dictionnaire')}
            >
              <Star className="w-5 h-5" />
              Termes populaires
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Nouveaux termes', 'Consultation des nouveaux termes', 'Dictionnaire')}
            >
              <Plus className="w-5 h-5" />
              Nouveaux termes
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={() => {
              import('@/utils/modalManager').then(({ openLegalQuizModal }) => {
                openLegalQuizModal();
              });
            }}
            >
              <BookOpen className="w-5 h-5" />
              Quiz juridique
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.downloadResource('Dictionnaire complet', 'PDF')}
            >
              <Download className="w-5 h-5" />
              Télécharger PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Formulaires modaux */}
      <AddDictionaryTermForm 
        isOpen={showAddForm} 
        onClose={() => setShowAddForm(false)} 
      />
      
      <EnrichDictionaryForm 
        isOpen={showEnrichForm} 
        onClose={() => setShowEnrichForm(false)} 
      />
    </div>
  );
}