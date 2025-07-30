
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  MessageSquare, 
  Eye, 
  Users, 
  Clock, 
  Calendar,
  Plus
} from 'lucide-react';
import { buttonHandlers } from '@/utils/buttonUtils';

export function StructuredDebatesTab() {
  const [createDebateOpen, setCreateDebateOpen] = useState(false);
  const [debateSubject, setDebateSubject] = useState('');
  const [debateDescription, setDebateDescription] = useState('');

  const debates = [
    {
      id: 1,
      title: "Réforme du Code du travail - Article 87",
      description: "Discussion sur les modifications proposées concernant les congés payés",
      participants: 12,
      status: "En cours",
      deadline: "15 Mars 2024",
      category: "Droit social"
    },
    {
      id: 2,
      title: "Nouvelle loi sur l'investissement",
      description: "Analyse des impacts sur les entreprises algériennes",
      participants: 8,
      status: "Planifié",
      deadline: "20 Mars 2024",
      category: "Droit économique"
    },
    {
      id: 3,
      title: "Protection des données personnelles",
      description: "Débat sur l'application du RGPD en Algérie",
      participants: 15,
      status: "En cours",
      deadline: "25 Mars 2024",
      category: "Droit numérique"
    },
    {
      id: 4,
      title: "Réforme de la justice administrative",
      description: "Amélioration des procédures administratives",
      participants: 10,
      status: "Planifié",
      deadline: "30 Mars 2024",
      category: "Droit administratif"
    },
    {
      id: 5,
      title: "Loi sur les énergies renouvelables",
      description: "Développement des énergies vertes en Algérie",
      participants: 18,
      status: "En cours",
      deadline: "5 Avril 2024",
      category: "Droit environnemental"
    },
    {
      id: 6,
      title: "Réforme du système bancaire",
      description: "Modernisation du secteur bancaire algérien",
      participants: 14,
      status: "Planifié",
      deadline: "10 Avril 2024",
      category: "Droit financier"
    },
    {
      id: 7,
      title: "Protection des consommateurs",
      description: "Renforcement des droits des consommateurs",
      participants: 22,
      status: "En cours",
      deadline: "15 Avril 2024",
      category: "Droit commercial"
    },
    {
      id: 8,
      title: "Loi sur la propriété intellectuelle",
      description: "Protection des droits d'auteur et brevets",
      participants: 9,
      status: "Planifié",
      deadline: "20 Avril 2024",
      category: "Droit de la propriété"
    },
    {
      id: 9,
      title: "Réforme du système éducatif",
      description: "Modernisation de l'enseignement supérieur",
      participants: 16,
      status: "En cours",
      deadline: "25 Avril 2024",
      category: "Droit de l'éducation"
    },
    {
      id: 10,
      title: "Loi sur la santé publique",
      description: "Amélioration du système de santé",
      participants: 20,
      status: "Planifié",
      deadline: "30 Avril 2024",
      category: "Droit de la santé"
    },
    {
      id: 11,
      title: "Protection de l'environnement",
      description: "Mesures pour la préservation de l'environnement",
      participants: 13,
      status: "En cours",
      deadline: "5 Mai 2024",
      category: "Droit environnemental"
    },
    {
      id: 12,
      title: "Réforme du système fiscal",
      description: "Simplification du système fiscal algérien",
      participants: 17,
      status: "Planifié",
      deadline: "10 Mai 2024",
      category: "Droit fiscal"
    }
  ];

  // Pagination pour les débats structurés
  const {
    currentData: paginatedDebates,
    currentPage: debatesCurrentPage,
    totalPages: debatesTotalPages,
    itemsPerPage: debatesItemsPerPage,
    totalItems: debatesTotalItems,
    setCurrentPage: setDebatesCurrentPage,
    setItemsPerPage: setDebatesItemsPerPage
  } = usePagination({
    data: debates,
    itemsPerPage: 10
  });

  const handleParticipate = (debateTitle: string) => {
    buttonHandlers.generic(`Participer au débat: ${debateTitle}`, 'Rejoindre la discussion', 'Débats')();
  };

  const handleObserve = (debateTitle: string) => {
    buttonHandlers.generic(`Observer le débat: ${debateTitle}`, 'Mode observation', 'Débats')();
  };

  const handleCreateDebate = () => {
    if (debateSubject.trim()) {
      buttonHandlers.startDiscussion(debateSubject)();
      setDebateSubject('');
      setDebateDescription('');
      setCreateDebateOpen(false);
    }
  };

  const handleSaveDraft = () => {
    buttonHandlers.generic('Sauvegarder brouillon', 'Sauvegarde du débat en brouillon', 'Débats')();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Débats Structurés</h2>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setCreateDebateOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau débat
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedDebates.map((debate) => (
          <Card key={debate.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{debate.title}</CardTitle>
                <Badge 
                  variant={debate.status === 'En cours' ? 'default' : 'secondary'}
                  className={debate.status === 'En cours' ? 'bg-green-100 text-green-800' : ''}
                >
                  {debate.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{debate.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {debate.participants} participants
                </div>
                <Badge variant="outline">{debate.category}</Badge>
              </div>

              <div className="text-sm">
                <span className="text-gray-500">Échéance: </span>
                <span className="font-medium">{debate.deadline}</span>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => handleParticipate(debate.title)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Participer
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleObserve(debate.title)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Observer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination pour les débats structurés */}
      <div className="mt-6">
        <Pagination
          currentPage={debatesCurrentPage}
          totalPages={debatesTotalPages}
          totalItems={debatesTotalItems}
          itemsPerPage={debatesItemsPerPage}
          onPageChange={setDebatesCurrentPage}
          onItemsPerPageChange={setDebatesItemsPerPage}
        />
      </div>

      {createDebateOpen && (
        <Card>
          <CardHeader>
            <CardTitle>Lancer un nouveau débat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="Sujet du débat..." 
              value={debateSubject}
              onChange={(e) => setDebateSubject(e.target.value)}
            />
            <Textarea 
              placeholder="Description et contexte..." 
              value={debateDescription}
              onChange={(e) => setDebateDescription(e.target.value)}
            />
            <div className="flex gap-2">
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleCreateDebate}
                disabled={!debateSubject.trim()}
              >
                Créer le débat
              </Button>
              <Button 
                variant="outline"
                onClick={handleSaveDraft}
              >
                Sauvegarder en brouillon
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setCreateDebateOpen(false)}
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
