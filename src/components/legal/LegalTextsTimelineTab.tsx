import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  Clock, 
  Calendar, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Users,
  Scale,
  Filter,
  Search
} from 'lucide-react';

export function LegalTextsTimelineTab() {
  const [selectedText, setSelectedText] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTexts, setFilteredTexts] = useState<any[]>([]);

  const legalTexts = [
    { id: 'all', title: 'Tous les textes juridiques' },
    { id: '1', title: 'Loi n° 08-09 portant code de procédure civile' },
    { id: '2', title: 'Ordonnance n° 75-58 portant code civil' },
    { id: '3', title: 'Loi n° 90-11 relative aux relations de travail' },
    { id: '4', title: 'Loi n° 18-05 relative au commerce électronique' }
  ];

  const timelineData = [
    {
      id: 1,
      date: "15 janvier 2025",
      time: "14:30",
      title: "Publication de la Loi n° 2025-001",
      description: "Modernisation des procédures administratives",
      type: "Publication",
      status: "Complété",
      authority: "Assemblée Populaire Nationale",
      nextStep: "Entrée en vigueur dans 30 jours",
      textId: "1"
    },
    {
      id: 2,
      date: "12 janvier 2025",
      time: "10:15",
      title: "Validation du Décret n° 2025-045",
      description: "Nouvelles mesures environnementales",
      type: "Validation",
      status: "En cours",
      authority: "Conseil des Ministres",
      nextStep: "Attente de promulgation",
      textId: "2"
    },
    {
      id: 3,
      date: "10 janvier 2025",
      time: "16:45",
      title: "Dépôt de l'Arrêté n° 2025-125",
      description: "Réforme du système éducatif",
      type: "Dépôt",
      status: "En cours",
      authority: "Ministère de l'Éducation",
      nextStep: "Examen par commission",
      textId: "3"
    },
    {
      id: 4,
      date: "8 janvier 2025",
      time: "09:00",
      title: "Consultation publique - Code Numérique",
      description: "Ouverture de la consultation sur le code de l'investissement numérique",
      type: "Consultation",
      status: "Complété",
      authority: "Ministère de la Numérisation",
      nextStep: "Analyse des contributions",
      textId: "4"
    }
  ];

  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredTexts([]);
      return;
    }
    
    const filtered = legalTexts.filter(text => 
      text.title.toLowerCase().includes(searchQuery.toLowerCase()) && text.id !== 'all'
    );
    setFilteredTexts(filtered);
  };

  const handleTextSelect = (textId: string) => {
    setSelectedText(textId);
    setSearchQuery('');
    setFilteredTexts([]);
  };

  const filteredTimelineData = selectedText === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.textId === selectedText);

  // Pagination pour la timeline des textes juridiques
  const {
    currentData: paginatedTimelineData,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredTimelineData,
    itemsPerPage: 5
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complété':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-blue-100 text-blue-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Publication':
        return FileText;
      case 'Validation':
        return CheckCircle;
      case 'Dépôt':
        return Scale;
      case 'Consultation':
        return Users;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtre de recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-emerald-600" />
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Rechercher un texte juridique spécifique
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Rechercher par titre de texte juridique..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} variant="outline">
                    <Search className="w-4 h-4 mr-2" />
                    Rechercher
                  </Button>
                </div>
              </div>
            </div>

            {/* Résultats de recherche */}
            {filteredTexts.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Résultats de la recherche :</h4>
                <div className="grid grid-cols-1 gap-2">
                  {filteredTexts.map((text) => (
                    <Button
                      key={text.id}
                      variant="outline"
                      onClick={() => handleTextSelect(text.id)}
                      className="justify-start h-auto p-3 text-left"
                    >
                      <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{text.title}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Filtre par sélection */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Ou filtrer par texte juridique
                </label>
                <Select value={selectedText} onValueChange={setSelectedText}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner un texte juridique" />
                  </SelectTrigger>
                  <SelectContent>
                    {legalTexts.map((text) => (
                      <SelectItem key={text.id} value={text.id}>
                        {text.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques de la timeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">24</p>
            <p className="text-sm text-gray-600">Activités ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">18</p>
            <p className="text-sm text-gray-600">Complétés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">6</p>
            <p className="text-sm text-gray-600">En cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">12</p>
            <p className="text-sm text-gray-600">Prévus</p>
          </CardContent>
        </Card>
      </div>

      {/* Timeline des procédures */}
      <div className="space-y-6">
        <div className="relative">
          {/* Ligne verticale de la timeline */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {paginatedTimelineData.map((item, index) => {
            const TypeIcon = getTypeIcon(item.type);
            return (
              <div key={item.id} className="relative flex items-start space-x-6 pb-8">
                {/* Icône de la timeline */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white border-4 border-emerald-200 rounded-full">
                  <TypeIcon className="w-6 h-6 text-emerald-600" />
                </div>
                
                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <Badge variant="outline">{item.type}</Badge>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </div>
                          <CardDescription className="mb-3">
                            {item.description}
                          </CardDescription>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Date et heure:</span>
                              <p className="font-medium">{item.date} à {item.time}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Autorité:</span>
                              <p className="font-medium">{item.authority}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div className="text-gray-500">Prochaine étape</div>
                          <div className="font-medium flex items-center gap-1">
                            <ArrowRight className="w-4 h-4" />
                            {item.nextStep}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
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

      {/* Actions rapides */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-100">
              <Calendar className="w-4 h-4 mr-2" />
              Voir le calendrier complet
            </Button>
            <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-100">
              <FileText className="w-4 h-4 mr-2" />
              Exporter la timeline
            </Button>
            <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-100">
              <AlertCircle className="w-4 h-4 mr-2" />
              Configurer les alertes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
