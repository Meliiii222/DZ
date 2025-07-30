
import React, { useState } from 'react';
import { BaseModal } from './core/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (criteria: Record<string, unknown>) => void;
}

export function AdvancedSearchModal({ isOpen, onClose, onSearch }: AdvancedSearchModalProps) {
  const [searchCriteria, setSearchCriteria] = useState({
    keywords: '',
    exactPhrase: '',
    excludeWords: '',
    domain: '',
    documentType: '',
    dateFrom: '',
    dateTo: '',
    author: '',
    reference: '',
    fullTextSearch: ''
  });

  const handleSearch = () => {
    onSearch(searchCriteria);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Recherche avancée"
      size="xl"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="keywords">Mots-clés</Label>
            <Input
              id="keywords"
              value={searchCriteria.keywords}
              onChange={(e) => setSearchCriteria({...searchCriteria, keywords: e.target.value})}
              placeholder="Rechercher par mots-clés"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exactPhrase">Expression exacte</Label>
            <Input
              id="exactPhrase"
              value={searchCriteria.exactPhrase}
              onChange={(e) => setSearchCriteria({...searchCriteria, exactPhrase: e.target.value})}
              placeholder="Expression entre guillemets"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excludeWords">Exclure les mots</Label>
          <Input
            id="excludeWords"
            value={searchCriteria.excludeWords}
            onChange={(e) => setSearchCriteria({...searchCriteria, excludeWords: e.target.value})}
            placeholder="Mots à exclure (séparés par des espaces)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Domaine juridique</Label>
            <Select value={searchCriteria.domain} onValueChange={(value) => setSearchCriteria({...searchCriteria, domain: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un domaine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="civil">Droit civil</SelectItem>
                <SelectItem value="penal">Droit pénal</SelectItem>
                <SelectItem value="commercial">Droit commercial</SelectItem>
                <SelectItem value="administratif">Droit administratif</SelectItem>
                <SelectItem value="constitutionnel">Droit constitutionnel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Type de document</Label>
            <Select value={searchCriteria.documentType} onValueChange={(value) => setSearchCriteria({...searchCriteria, documentType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Type de document" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="law">Loi</SelectItem>
                <SelectItem value="decree">Décret</SelectItem>
                <SelectItem value="order">Arrêté</SelectItem>
                <SelectItem value="circular">Circulaire</SelectItem>
                <SelectItem value="jurisprudence">Jurisprudence</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateFrom">Date de début</Label>
            <Input
              id="dateFrom"
              type="date"
              value={searchCriteria.dateFrom}
              onChange={(e) => setSearchCriteria({...searchCriteria, dateFrom: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateTo">Date de fin</Label>
            <Input
              id="dateTo"
              type="date"
              value={searchCriteria.dateTo}
              onChange={(e) => setSearchCriteria({...searchCriteria, dateTo: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="author">Auteur</Label>
            <Input
              id="author"
              value={searchCriteria.author}
              onChange={(e) => setSearchCriteria({...searchCriteria, author: e.target.value})}
              placeholder="Nom de l'auteur"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Référence</Label>
            <Input
              id="reference"
              value={searchCriteria.reference}
              onChange={(e) => setSearchCriteria({...searchCriteria, reference: e.target.value})}
              placeholder="Numéro de référence"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullTextSearch">Recherche dans le texte intégral</Label>
          <Textarea
            id="fullTextSearch"
            value={searchCriteria.fullTextSearch}
            onChange={(e) => setSearchCriteria({...searchCriteria, fullTextSearch: e.target.value})}
            placeholder="Rechercher dans le contenu complet des documents"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button onClick={handleSearch}>
          <Search className="w-4 h-4 mr-2" />
          Rechercher
        </Button>
      </div>
    </BaseModal>
  );
}
