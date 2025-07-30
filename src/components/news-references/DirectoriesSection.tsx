
// @ts-nocheck
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Building, MapPin, Phone, Mail, Globe, Users, Gavel, Scale, Plus, Upload, Search, Filter, Download, ExternalLink } from 'lucide-react';

export function DirectoriesSection() {
  const institutionsData = [
    {
      id: 1,
      name: "Conseil d'État",
      type: "Institution judiciaire",
      address: "Rue Docteur Saadane, Alger",
      phone: "+213 21 73 59 22",
      email: "contact@conseil-etat.dz",
      website: "www.conseil-etat.dz",
      description: "Haute juridiction administrative algérienne",
      icon: <Scale className="w-8 h-8 text-blue-600" />
    },
    {
      id: 2,
      name: "Ministère de la Justice",
      type: "Ministère",
      address: "8, Place Bir Hakem, Alger",
      phone: "+213 21 60 57 57",
      email: "contact@mjustice.dz",
      website: "www.mjustice.dz",
      description: "Ministère de la Justice, Garde des Sceaux",
      icon: <Building className="w-8 h-8 text-purple-600" />
    },
    {
      id: 3,
      name: "Cour Suprême",
      type: "Institution judiciaire",
      address: "Place Emir Abdelkader, Alger",
      phone: "+213 21 73 40 12",
      email: "contact@cour-supreme.dz",
      website: "www.cour-supreme.dz",
      description: "Plus haute juridiction de l'ordre judiciaire",
      icon: <Scale className="w-8 h-8 text-red-600" />
    },
    {
      id: 4,
      name: "Tribunal Administratif d'Alger",
      type: "Tribunal",
      address: "Rue Ahmed Boudraa, Alger",
      phone: "+213 21 65 78 90",
      email: "contact@ta-alger.dz",
      website: "www.ta-alger.dz",
      description: "Tribunal administratif de première instance",
      icon: <Gavel className="w-8 h-8 text-green-600" />
    }
  ];

  const facultesData = [
    {
      id: 1,
      name: "Faculté de Droit - Université d'Alger 1",
      type: "Faculté de Droit",
      address: "2, Rue Didouche Mourad, Alger",
      phone: "+213 21 73 56 08",
      email: "contact@fdroit-alger.dz",
      website: "www.fdroit-alger.dz",
      description: "Formation juridique supérieure et recherche",
      icon: <Building className="w-8 h-8 text-green-600" />
    },
    {
      id: 2,
      name: "Faculté de Droit - Université d'Oran",
      type: "Faculté de Droit",
      address: "Avenue Es-Senia, Oran",
      phone: "+213 41 56 78 12",
      email: "contact@fdroit-oran.dz",
      website: "www.fdroit-oran.dz",
      description: "Centre de formation juridique de l'Ouest",
      icon: <Building className="w-8 h-8 text-blue-600" />
    },
    {
      id: 3,
      name: "Faculté de Droit - Université de Constantine",
      type: "Faculté de Droit",
      address: "Route Ain El Bey, Constantine",
      phone: "+213 31 81 23 45",
      email: "contact@fdroit-constantine.dz",
      website: "www.fdroit-constantine.dz",
      description: "Faculté de droit et sciences politiques",
      icon: <Building className="w-8 h-8 text-purple-600" />
    },
    {
      id: 4,
      name: "Institut de Droit - Université de Tizi Ouzou",
      type: "Institut de Droit",
      address: "Route de Hasnaoua, Tizi Ouzou",
      phone: "+213 26 21 67 89",
      email: "contact@idroit-tiziouzou.dz",
      website: "www.idroit-tiziouzou.dz",
      description: "Institut spécialisé en droit berbère",
      icon: <Building className="w-8 h-8 text-orange-600" />
    }
  ];

  const professionnelsData = [
    {
      id: 1,
      name: "Ordre des Avocats d'Alger",
      type: "Ordre professionnel",
      address: "13, Rue Larbi Ben M'hidi, Alger",
      phone: "+213 21 63 42 18",
      email: "contact@barreau-alger.dz",
      website: "www.barreau-alger.dz",
      description: "Ordre des avocats de la région d'Alger",
      icon: <Gavel className="w-8 h-8 text-red-600" />
    },
    {
      id: 2,
      name: "Ordre des Avocats d'Oran",
      type: "Ordre professionnel",
      address: "Place du 1er Novembre, Oran",
      phone: "+213 41 33 45 67",
      email: "contact@barreau-oran.dz",
      website: "www.barreau-oran.dz",
      description: "Ordre des avocats de l'Ouest algérien",
      icon: <Gavel className="w-8 h-8 text-blue-600" />
    },
    {
      id: 3,
      name: "Syndic National des Huissiers de Justice",
      type: "Syndicat professionnel",
      address: "Rue Mohamed Belouizdad, Alger",
      phone: "+213 21 59 34 12",
      email: "contact@huissiers-dz.org",
      website: "www.huissiers-dz.org",
      description: "Organisation nationale des huissiers",
      icon: <Users className="w-8 h-8 text-green-600" />
    },
    {
      id: 4,
      name: "Ordre des Experts Comptables",
      type: "Ordre professionnel",
      address: "Avenue Pasteur, Alger",
      phone: "+213 21 74 56 23",
      email: "contact@oeca.dz",
      website: "www.oeca.dz",
      description: "Ordre des experts comptables et commissaires",
      icon: <Building className="w-8 h-8 text-purple-600" />
    }
  ];

  const organismesData = [
    {
      id: 1,
      name: "Chambre Nationale des Notaires",
      type: "Organisme professionnel",
      address: "Rue Ben Kateb, Alger",
      phone: "+213 21 67 89 34",
      email: "contact@notaires.dz",
      website: "www.notaires.dz",
      description: "Organisation nationale des notaires",
      icon: <Users className="w-8 h-8 text-orange-600" />
    },
    {
      id: 2,
      name: "Centre National du Registre du Commerce",
      type: "Organisme public",
      address: "Rue Hassiba Ben Bouali, Alger",
      phone: "+213 21 23 45 67",
      email: "contact@cnrc.dz",
      website: "www.cnrc.dz",
      description: "Registre national du commerce et des sociétés",
      icon: <Building className="w-8 h-8 text-blue-600" />
    },
    {
      id: 3,
      name: "Direction Générale de la Fonction Publique",
      type: "Administration",
      address: "Avenue Ahmed Ghermoul, Alger",
      phone: "+213 21 45 67 89",
      email: "contact@dgfp.gov.dz",
      website: "www.dgfp.gov.dz",
      description: "Gestion de la fonction publique",
      icon: <Users className="w-8 h-8 text-green-600" />
    },
    {
      id: 4,
      name: "Agence Nationale de l'Emploi",
      type: "Organisme public",
      address: "Avenue Souidani Boudjemaa, Alger",
      phone: "+213 21 78 90 12",
      email: "contact@anem.dz",
      website: "www.anem.dz",
      description: "Promotion de l'emploi et lutte contre le chômage",
      icon: <Building className="w-8 h-8 text-purple-600" />
    },
    {
      id: 5,
      name: "Conseil National des Droits de l'Homme",
      type: "Institution indépendante",
      address: "Villa n°17, Dély Ibrahim, Alger",
      phone: "+213 21 91 12 34",
      email: "contact@cndh.dz",
      website: "www.cndh.dz",
      description: "Protection et promotion des droits humains",
      icon: <Scale className="w-8 h-8 text-red-600" />
    }
  ];

  // Pagination pour les institutions
  const {
    currentData: paginatedInstitutions,
    currentPage: instCurrentPage,
    totalPages: instTotalPages,
    itemsPerPage: instItemsPerPage,
    totalItems: instTotalItems,
    setCurrentPage: setInstCurrentPage,
    setItemsPerPage: setInstItemsPerPage
  } = usePagination({
    data: institutionsData,
    itemsPerPage: 6
  });

  // Pagination pour les facultés
  const {
    currentData: paginatedFacultes,
    currentPage: facCurrentPage,
    totalPages: facTotalPages,
    itemsPerPage: facItemsPerPage,
    totalItems: facTotalItems,
    setCurrentPage: setFacCurrentPage,
    setItemsPerPage: setFacItemsPerPage
  } = usePagination({
    data: facultesData,
    itemsPerPage: 6
  });

  // Pagination pour les professionnels
  const {
    currentData: paginatedProfessionnels,
    currentPage: profCurrentPage,
    totalPages: profTotalPages,
    itemsPerPage: profItemsPerPage,
    totalItems: profTotalItems,
    setCurrentPage: setProfCurrentPage,
    setItemsPerPage: setProfItemsPerPage
  } = usePagination({
    data: professionnelsData,
    itemsPerPage: 6
  });

  // Pagination pour les organismes
  const {
    currentData: paginatedOrganismes,
    currentPage: orgCurrentPage,
    totalPages: orgTotalPages,
    itemsPerPage: orgItemsPerPage,
    totalItems: orgTotalItems,
    setCurrentPage: setOrgCurrentPage,
    setItemsPerPage: setOrgItemsPerPage
  } = usePagination({
    data: organismesData,
    itemsPerPage: 6
  });

  const handleAdd = (type: string) => {
    console.log(`Opening add form for: ${type}`);
    
    const event = new CustomEvent('open-library-form', {
      detail: { resourceType: 'directory', category: type }
    });
    window.dispatchEvent(event);
  };

  const handleEnrich = (type: string) => {
    console.log(`Opening enrichment for: ${type}`);
    
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'import',
        title: 'Enrichir les données',
        data: { acceptedTypes: ['.pdf', '.doc', '.docx', '.csv', '.xlsx'], category: type }
      }
    });
    window.dispatchEvent(event);
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleWebsiteClick = (website: string) => {
    window.open(`https://${website}`, '_blank');
  };

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const renderDirectoryCards = (data: Record<string, unknown>[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((directory) => (
        <Card key={directory.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {directory.icon}
                <div>
                  <CardTitle className="text-lg">{directory.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {directory.type}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CardDescription>{directory.description}</CardDescription>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{directory.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <button 
                  onClick={() => handlePhoneClick(directory.phone)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {directory.phone}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <button 
                  onClick={() => handleEmailClick(directory.email)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {directory.email}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <button 
                  onClick={() => handleWebsiteClick(directory.website)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {directory.website}
                </button>
              </div>
            </div>

            {/* Actions directes enrichies */}
            <div className="flex gap-2 pt-3 border-t">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePhoneClick(directory.phone)}
                className="flex-1"
              >
                <Phone className="w-3 h-3 mr-1" />
                Appeler
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleEmailClick(directory.email)}
                className="flex-1"
              >
                <Mail className="w-3 h-3 mr-1" />
                Email
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleWebsiteClick(directory.website)}
                className="flex-1"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Site
              </Button>
            </div>

            {/* Modal détaillé */}
            <Button 
              size="sm" 
              className="w-full mt-2"
              onClick={() => {
                // Ouvrir modal avec détails complets
                console.log('Ouvrir modal détaillé pour:', directory.name);
              }}
            >
              Voir les détails complets
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTabButtons = (tabType: string) => (
    <div className="flex justify-center gap-3 mb-6">
      <Button 
        className="gap-2 bg-teal-600 hover:bg-teal-700" 
        onClick={() => handleAdd(tabType)}
      >
        <Plus className="w-4 h-4" />
        Ajouter
      </Button>
      <Button 
        variant="outline" 
        className="gap-2 border-teal-200 text-teal-700 hover:bg-teal-50" 
        onClick={() => handleEnrich(tabType)}
      >
        <Upload className="w-4 h-4" />
        Enrichir
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="institutions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="institutions">Institutions</TabsTrigger>
          <TabsTrigger value="facultes">Facultés de droit</TabsTrigger>
          <TabsTrigger value="professionnels">Professionnels du droit</TabsTrigger>
          <TabsTrigger value="organismes">Organismes juridiques</TabsTrigger>
        </TabsList>

        <TabsContent value="institutions" className="mt-6">
          {renderTabButtons('institutions')}
          
          {/* Statistiques et recherche enrichies pour institutions */}
          <div className="mb-6 space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2,847</div>
                    <div className="text-sm text-gray-600">Institutions publiques</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">58</div>
                    <div className="text-sm text-gray-600">Wilayas couvertes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">6</div>
                    <div className="text-sm text-gray-600">Types d'institutions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">156</div>
                    <div className="text-sm text-gray-600">Ministères</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">789</div>
                    <div className="text-sm text-gray-600">Tribunaux</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">1,234</div>
                    <div className="text-sm text-gray-600">Administrations</div>
                  </div>
                </div>

                {/* Recherche avancée */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input 
                      placeholder="Rechercher par nom..." 
                      className="p-2 border rounded-md"
                    />
                    <select className="p-2 border rounded-md">
                      <option>Toutes les wilayas</option>
                      <option>Alger (16)</option>
                      <option>Oran (31)</option>
                      <option>Constantine (25)</option>
                      <option>Annaba (23)</option>
                      {/* Plus d'options pour les 58 wilayas */}
                    </select>
                    <select className="p-2 border rounded-md">
                      <option>Tous les types</option>
                      <option>Ministères</option>
                      <option>Tribunaux</option>
                      <option>Préfectures</option>
                      <option>Mairies</option>
                      <option>Administrations</option>
                      <option>Organismes spécialisés</option>
                    </select>
                    <select className="p-2 border rounded-md">
                      <option>Tous les services</option>
                      <option>État civil</option>
                      <option>Justice</option>
                      <option>Finances</option>
                      <option>Santé</option>
                      <option>Éducation</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button>
                      <Search className="w-4 h-4 mr-2" />
                      Rechercher dans les 2,847 institutions
                    </Button>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtres avancés
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger l'annuaire complet
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liste des institutions avec pagination */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedInstitutions.map((institution) => (
              <Card key={institution.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {institution.icon}
                      <div>
                        <CardTitle className="text-lg">{institution.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {institution.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription>{institution.description}</CardDescription>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{institution.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <button 
                        onClick={() => handlePhoneClick(institution.phone)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        {institution.phone}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <button 
                        onClick={() => handleEmailClick(institution.email)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        {institution.email}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <button 
                        onClick={() => handleWebsiteClick(institution.website)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        {institution.website}
                      </button>
                    </div>
                  </div>

                  {/* Actions directes enrichies */}
                  <div className="flex gap-2 pt-3 border-t">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handlePhoneClick(institution.phone)}
                      className="flex-1"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Appeler
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEmailClick(institution.email)}
                      className="flex-1"
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleWebsiteClick(institution.website)}
                      className="flex-1"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Site
                    </Button>
                  </div>

                  {/* Modal détaillé */}
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => {
                      // Ouvrir modal avec détails complets
                      console.log('Ouvrir modal détaillé pour:', institution.name);
                    }}
                  >
                    Voir les détails complets
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination pour les institutions */}
          <div className="mt-6">
            <Pagination
              currentPage={instCurrentPage}
              totalPages={instTotalPages}
              totalItems={instTotalItems}
              itemsPerPage={instItemsPerPage}
              onPageChange={setInstCurrentPage}
              onItemsPerPageChange={setInstItemsPerPage}
            />
          </div>
        </TabsContent>

        <TabsContent value="facultes" className="mt-6">
          {renderTabButtons('facultes')}
          
          {/* Liste des facultés avec pagination */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedFacultes.map((faculte) => (
              <Card key={faculte.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {faculte.icon}
                      <div>
                        <CardTitle className="text-lg">{faculte.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {faculte.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription>{faculte.description}</CardDescription>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{faculte.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <button 
                        onClick={() => handlePhoneClick(faculte.phone)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        {faculte.phone}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <button 
                        onClick={() => handleEmailClick(faculte.email)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        {faculte.email}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <button 
                        onClick={() => handleWebsiteClick(faculte.website)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        {faculte.website}
                      </button>
                    </div>
                  </div>

                  {/* Actions directes enrichies */}
                  <div className="flex gap-2 pt-3 border-t">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handlePhoneClick(faculte.phone)}
                      className="flex-1"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Appeler
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEmailClick(faculte.email)}
                      className="flex-1"
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleWebsiteClick(faculte.website)}
                      className="flex-1"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Site
                    </Button>
                  </div>

                  {/* Modal détaillé */}
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => {
                      // Ouvrir modal avec détails complets
                      console.log('Ouvrir modal détaillé pour:', faculte.name);
                    }}
                  >
                    Voir les détails complets
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination pour les facultés */}
          <div className="mt-6">
            <Pagination
              currentPage={facCurrentPage}
              totalPages={facTotalPages}
              totalItems={facTotalItems}
              itemsPerPage={facItemsPerPage}
              onPageChange={setFacCurrentPage}
              onItemsPerPageChange={setFacItemsPerPage}
            />
          </div>
        </TabsContent>

        <TabsContent value="professionnels" className="mt-6">
          {renderTabButtons('professionnels')}
          {/* Liste des professionnels avec pagination */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProfessionnels.map((professionnel) => (
              <Card key={professionnel.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {professionnel.icon}
                      <div>
                        <CardTitle className="text-lg">{professionnel.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {professionnel.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription>{professionnel.description}</CardDescription>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{professionnel.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <button 
                        onClick={() => handlePhoneClick(professionnel.phone)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        {professionnel.phone}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <button 
                        onClick={() => handleEmailClick(professionnel.email)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        {professionnel.email}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <button 
                        onClick={() => handleWebsiteClick(professionnel.website)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        {professionnel.website}
                      </button>
                    </div>
                  </div>

                  {/* Actions directes enrichies */}
                  <div className="flex gap-2 pt-3 border-t">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handlePhoneClick(professionnel.phone)}
                      className="flex-1"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Appeler
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEmailClick(professionnel.email)}
                      className="flex-1"
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleWebsiteClick(professionnel.website)}
                      className="flex-1"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Site
                    </Button>
                  </div>

                  {/* Modal détaillé */}
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => {
                      // Ouvrir modal avec détails complets
                      console.log('Ouvrir modal détaillé pour:', professionnel.name);
                    }}
                  >
                    Voir les détails complets
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination pour les professionnels */}
          <div className="mt-6">
            <Pagination
              currentPage={profCurrentPage}
              totalPages={profTotalPages}
              totalItems={profTotalItems}
              itemsPerPage={profItemsPerPage}
              onPageChange={setProfCurrentPage}
              onItemsPerPageChange={setProfItemsPerPage}
            />
          </div>
        </TabsContent>

        <TabsContent value="organismes" className="mt-6">
          {renderTabButtons('organismes')}
          {/* Liste des organismes avec pagination */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedOrganismes.map((organisme) => (
              <Card key={organisme.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {organisme.icon}
                      <div>
                        <CardTitle className="text-lg">{organisme.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {organisme.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription>{organisme.description}</CardDescription>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{organisme.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <button 
                        onClick={() => handlePhoneClick(organisme.phone)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        {organisme.phone}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <button 
                        onClick={() => handleEmailClick(organisme.email)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        {organisme.email}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <button 
                        onClick={() => handleWebsiteClick(organisme.website)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        {organisme.website}
                      </button>
                    </div>
                  </div>

                  {/* Actions directes enrichies */}
                  <div className="flex gap-2 pt-3 border-t">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handlePhoneClick(organisme.phone)}
                      className="flex-1"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Appeler
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEmailClick(organisme.email)}
                      className="flex-1"
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleWebsiteClick(organisme.website)}
                      className="flex-1"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Site
                    </Button>
                  </div>

                  {/* Modal détaillé */}
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => {
                      // Ouvrir modal avec détails complets
                      console.log('Ouvrir modal détaillé pour:', organisme.name);
                    }}
                  >
                    Voir les détails complets
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination pour les organismes */}
          <div className="mt-6">
            <Pagination
              currentPage={orgCurrentPage}
              totalPages={orgTotalPages}
              totalItems={orgTotalItems}
              itemsPerPage={orgItemsPerPage}
              onPageChange={setOrgCurrentPage}
              onItemsPerPageChange={setOrgItemsPerPage}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
