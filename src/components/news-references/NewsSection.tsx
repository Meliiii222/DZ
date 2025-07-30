
import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TabFormField } from '@/components/common/TabFormField';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Newspaper, Calendar, TrendingUp, Users, FileText, Settings } from 'lucide-react';
import { AddNewsForm } from '@/components/forms/AddNewsForm';
import { useGlobalActions } from '@/hooks/useGlobalActions';
import { ApiImportModal } from '@/components/modals/ApiImportModal';
import { useApiModalHandler } from '@/hooks/useApiModalHandler';

export function NewsSection() {
  const [showAddForm, setShowAddForm] = useState(false);
  const actions = useGlobalActions();
  const { showApiModal, apiContext, openApiModal, closeApiModal } = useApiModalHandler();

  // Données dynamiques pour les actualités
  const newsData = [
    { id: 1, title: "Réforme du Code Civil", date: "Il y a 2 jours", description: "Le gouvernement a annoncé une réforme majeure du Code Civil...", category: "Législation" },
    { id: 2, title: "Nouvelle Loi sur la Protection des Données", date: "Il y a 1 semaine", description: "Une nouvelle loi renforce la protection des données personnelles...", category: "RGPD" },
    { id: 3, title: "Impact du Brexit sur les Contrats Internationaux", date: "Il y a 2 semaines", description: "Le Brexit continue d'impacter les contrats internationaux...", category: "International" },
    { id: 4, title: "Nouvelle Jurisprudence sur les Marques", date: "Il y a 3 jours", description: "La Cour de Cassation clarifie les critères de protection des marques...", category: "Propriété Intellectuelle" },
    { id: 5, title: "Réforme de la Procédure Administrative", date: "Il y a 1 jour", description: "Simplification des procédures administratives pour les entreprises...", category: "Administratif" },
    { id: 6, title: "Nouvelle Directive sur les Marchés Publics", date: "Il y a 4 jours", description: "Transparence renforcée dans les marchés publics...", category: "Marchés Publics" },
    { id: 7, title: "Protection des Données Bancaires", date: "Il y a 5 jours", description: "Nouvelles mesures de sécurité pour les données bancaires...", category: "Bancaire" },
    { id: 8, title: "Réforme du Droit du Travail", date: "Il y a 1 semaine", description: "Modernisation du code du travail algérien...", category: "Travail" },
    { id: 9, title: "Nouvelle Loi sur l'Environnement", date: "Il y a 2 semaines", description: "Renforcement de la protection environnementale...", category: "Environnement" },
    { id: 10, title: "Réforme de la Justice Pénale", date: "Il y a 3 jours", description: "Modernisation de la procédure pénale...", category: "Pénal" },
    { id: 11, title: "Protection des Consommateurs", date: "Il y a 6 jours", description: "Nouvelles garanties pour les consommateurs...", category: "Consommation" },
    { id: 12, title: "Droit Numérique et IA", date: "Il y a 1 semaine", description: "Cadre juridique pour l'intelligence artificielle...", category: "Numérique" }
  ];

  // Données dynamiques pour les événements
  const eventsData = [
    { id: 1, title: "Conférence sur le Droit du Numérique", date: "15 Mai 2024", location: "Alger", category: "Conférence" },
    { id: 2, title: "Atelier sur la Médiation", date: "22 Juin 2024", location: "Oran", category: "Atelier" },
    { id: 3, title: "Séminaire sur la Compliance", date: "5 Juillet 2024", location: "Constantine", category: "Séminaire" },
    { id: 4, title: "Forum sur l'Arbitrage International", date: "12 Septembre 2024", location: "Alger", category: "Forum" },
    { id: 5, title: "Formation sur le RGPD", date: "28 Octobre 2024", location: "Oran", category: "Formation" },
    { id: 6, title: "Colloque sur le Droit des Affaires", date: "10 Novembre 2024", location: "Constantine", category: "Colloque" },
    { id: 7, title: "Journée du Droit de l'Environnement", date: "15 Décembre 2024", location: "Annaba", category: "Journée" },
    { id: 8, title: "Workshop sur la Cybersécurité", date: "20 Janvier 2025", location: "Sétif", category: "Workshop" },
    { id: 9, title: "Conférence sur l'Innovation Juridique", date: "25 Février 2025", location: "Alger", category: "Conférence" },
    { id: 10, title: "Séminaire sur le Droit Maritime", date: "10 Mars 2025", location: "Oran", category: "Séminaire" },
    { id: 11, title: "Forum sur la Justice Restaurative", date: "15 Avril 2025", location: "Constantine", category: "Forum" },
    { id: 12, title: "Colloque sur le Droit Constitutionnel", date: "20 Mai 2025", location: "Alger", category: "Colloque" }
  ];

  // Pagination pour les actualités
  const {
    currentData: paginatedNews,
    currentPage: newsCurrentPage,
    totalPages: newsTotalPages,
    itemsPerPage: newsItemsPerPage,
    totalItems: newsTotalItems,
    setCurrentPage: setNewsCurrentPage,
    setItemsPerPage: setNewsItemsPerPage
  } = usePagination({
    data: newsData,
    itemsPerPage: 10
  });

  // Pagination pour les événements
  const {
    currentData: paginatedEvents,
    currentPage: eventsCurrentPage,
    totalPages: eventsTotalPages,
    itemsPerPage: eventsItemsPerPage,
    totalItems: eventsTotalItems,
    setCurrentPage: setEventsCurrentPage,
    setItemsPerPage: setEventsItemsPerPage
  } = usePagination({
    data: eventsData,
    itemsPerPage: 10
  });

  const handleAdd = () => {
    console.log('Opening add news form...');
    setShowAddForm(true);
  };

  const handleEnrich = () => {
    console.log('Opening enrichment with file import...');
    actions.handleImport(['.pdf', '.doc', '.docx', '.txt']);
  };

  const handleApiConfig = () => {
    openApiModal('news');
  };

  const handleCloseForm = () => {
    console.log('Closing add news form...');
    setShowAddForm(false);
  };

  if (showAddForm) {
    return (
      <AddNewsForm 
        isOpen={true} 
        onClose={handleCloseForm} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="actualites" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="actualites" className="gap-2">
            <Newspaper className="w-4 h-4" />
            Actualités Récentes
          </TabsTrigger>
          <TabsTrigger value="analyse" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Analyse & Tendances
          </TabsTrigger>
          <TabsTrigger value="communaute" className="gap-2">
            <Users className="w-4 h-4" />
            Communauté
          </TabsTrigger>
        </TabsList>

        <TabsContent value="actualites" className="mt-6 space-y-6">
          {/* Boutons d'action connectés */}
          <div className="flex gap-3 justify-center mb-6">
            <Button className="gap-2" onClick={handleAdd}>
              <Newspaper className="w-4 h-4" />
              Ajouter
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleEnrich}>
              <FileText className="w-4 h-4" />
              Enrichir
            </Button>
            <Button variant="outline" className="gap-2 border-purple-200 text-purple-700 hover:bg-purple-50" onClick={handleApiConfig}>
              <Settings className="w-4 h-4" />
              API
            </Button>
          </div>

          <TabFormField
            placeholder="Rechercher dans les actualités..."
            onSearch={(query) => console.log('Recherche actualités:', query)}
            showActions={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-red-600" />
                  Dernières Actualités
                </CardTitle>
                <p className="text-sm text-gray-600">Suivez les actualités juridiques en temps réel</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {paginatedNews.map((news) => (
                    <div key={news.id} className="p-3 border rounded hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{news.title}</span>
                        <span className="text-xs text-gray-500">{news.date}</span>
                      </div>
                      <p className="text-xs text-gray-600">{news.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-blue-600">{news.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination pour les actualités */}
                <Pagination
                  currentPage={newsCurrentPage}
                  totalPages={newsTotalPages}
                  totalItems={newsTotalItems}
                  itemsPerPage={newsItemsPerPage}
                  onPageChange={setNewsCurrentPage}
                  onItemsPerPageChange={setNewsItemsPerPage}
                />
                
                <Button className="w-full">
                  Voir toutes les actualités
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Événements Juridiques à Venir
                </CardTitle>
                <p className="text-sm text-gray-600">Ne manquez aucun événement important du secteur juridique</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paginatedEvents.map((event) => (
                      <div key={event.id} className="p-3 bg-gray-50 rounded">
                        <div className="font-medium text-sm">{event.title}</div>
                        <p className="text-xs text-gray-600">{event.date} - {event.location}</p>
                        <span className="text-xs text-purple-600">{event.category}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Pagination pour les événements */}
                  <Pagination
                    currentPage={eventsCurrentPage}
                    totalPages={eventsTotalPages}
                    totalItems={eventsTotalItems}
                    itemsPerPage={eventsItemsPerPage}
                    onPageChange={setEventsCurrentPage}
                    onItemsPerPageChange={setEventsItemsPerPage}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analyse" className="mt-6 space-y-6">
          {/* Boutons d'action connectés */}
          <div className="flex gap-3 justify-center mb-6">
            <Button className="gap-2" onClick={handleAdd}>
              <Newspaper className="w-4 h-4" />
              Ajouter
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleEnrich}>
              <FileText className="w-4 h-4" />
              Enrichir
            </Button>
          </div>

          <TabFormField
            placeholder="Rechercher dans les analyses..."
            onSearch={(query) => console.log('Recherche analyses:', query)}
            showActions={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Analyse des Tendances Juridiques
                </CardTitle>
                <p className="text-sm text-gray-600">Décryptage des grandes tendances du droit algérien</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">L'essor du Droit Numérique</span>
                      <span className="text-xs text-gray-500">Par Me. Ali Ahmed</span>
                    </div>
                    <p className="text-xs text-gray-600">Analyse de l'impact croissant du numérique sur le droit...</p>
                  </div>
                  <div className="p-3 border rounded hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">La Compliance au cœur des Entreprises</span>
                      <span className="text-xs text-gray-500">Par Dr. Fatima Ben</span>
                    </div>
                    <p className="text-xs text-gray-600">Décryptage des enjeux de la compliance pour les entreprises algériennes...</p>
                  </div>
                  <div className="p-3 border rounded hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Les Défis de l'Arbitrage International</span>
                      <span className="text-xs text-gray-500">Par Pr. Karim Said</span>
                    </div>
                    <p className="text-xs text-gray-600">Analyse des défis et opportunités de l'arbitrage international...</p>
                  </div>
                </div>
                <Button className="w-full">
                  Consulter toutes les analyses
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Focus sur les Professions Juridiques
                </CardTitle>
                <p className="text-sm text-gray-600">Zoom sur les acteurs clés du monde juridique algérien</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="font-medium text-sm">Le Rôle de l'Avocat en 2024</div>
                      <p className="text-xs text-gray-600">Par Me. Yasmine Khodja</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="font-medium text-sm">Les Enjeux du Notariat Moderne</div>
                      <p className="text-xs text-gray-600">Par Notaire Nabil Bouzidi</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="font-medium text-sm">L'Expert-Comptable face aux Nouvelles Normes</div>
                      <p className="text-xs text-gray-600">Par Expert Omar Djaffar</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="font-medium text-sm">Le Magistrat, Garant de la Justice</div>
                      <p className="text-xs text-gray-600">Par Juge Amina Mansouri</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="font-medium text-sm">Le Commissaire aux Comptes, un Pilier</div>
                      <p className="text-xs text-gray-600">Par CAC Sami Fekhar</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="font-medium text-sm">L'Huissier de Justice, un Acteur Clé</div>
                      <p className="text-xs text-gray-600">Par Huissier Rafik Chiali</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communaute" className="mt-6 space-y-6">
          {/* Boutons d'action connectés */}
          <div className="flex gap-3 justify-center mb-6">
            <Button className="gap-2" onClick={handleAdd}>
              <Newspaper className="w-4 h-4" />
              Ajouter
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleEnrich}>
              <FileText className="w-4 h-4" />
              Enrichir
            </Button>
          </div>

          <TabFormField
            placeholder="Rechercher dans la communauté..."
            onSearch={(query) => console.log('Recherche communauté:', query)}
            showActions={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  Discussions Juridiques
                </CardTitle>
                <p className="text-sm text-gray-600">Participez aux discussions et échangez avec vos pairs</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">La Réforme du Code de Commerce</span>
                      <span className="text-xs text-gray-500">Par Ali23</span>
                    </div>
                    <p className="text-xs text-gray-600">Quels sont les impacts de la réforme sur les entreprises ?...</p>
                  </div>
                  <div className="p-3 border rounded hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Les Nouveaux Défis de la Profession d'Avocat</span>
                      <span className="text-xs text-gray-500">Par YasmineK</span>
                    </div>
                    <p className="text-xs text-gray-600">Comment s'adapter aux mutations du monde juridique ?...</p>
                  </div>
                  <div className="p-3 border rounded hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">L'Intelligence Artificielle et le Droit</span>
                      <span className="text-xs text-gray-500">Par LegalTechDZ</span>
                    </div>
                    <p className="text-xs text-gray-600">Quel est le futur de l'IA dans le secteur juridique ?...</p>
                  </div>
                </div>
                <Button className="w-full">
                  Rejoindre les discussions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-red-600" />
                  Derniers Articles de la Communauté
                </CardTitle>
                <p className="text-sm text-gray-600">Découvrez les articles rédigés par les membres de la communauté</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="font-medium text-sm">La Protection des Données en Algérie</div>
                      <p className="text-xs text-gray-600">Par DataLawyer</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="font-medium text-sm">Les Contrats Commerciaux Internationaux</div>
                      <p className="text-xs text-gray-600">Par TradeExpert</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="font-medium text-sm">Le Droit du Travail en Algérie</div>
                      <p className="text-xs text-gray-600">Par LabourRights</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="font-medium text-sm">La Fiscalité des Entreprises en Algérie</div>
                      <p className="text-xs text-gray-600">Par TaxAdvisorDZ</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="font-medium text-sm">L'Arbitrage et la Médiation en Algérie</div>
                      <p className="text-xs text-gray-600">Par ADRSolutions</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="font-medium text-sm">Le Droit de la Propriété Intellectuelle</div>
                      <p className="text-xs text-gray-600">Par IntellectualProperty</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <ApiImportModal
        isOpen={showApiModal}
        onClose={closeApiModal}
        context={apiContext}
      />
    </div>
  );
}
