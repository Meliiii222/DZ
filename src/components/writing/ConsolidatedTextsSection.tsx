import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination } from "@/components/common/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { 
  FileText, 
  Search, 
  Calendar,
  Building,
  Tag,
  Download,
  Eye,
  BookOpen,
  Filter
} from "lucide-react";

export function ConsolidatedTextsSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const consolidatedTexts = [
    {
      id: 1,
      titre: "Code civil algérien consolidé",
      type: "Code",
      domaine: "Droit Civil",
      derniereMiseAJour: "2024-01-15",
      version: "2024.1",
      articles: 1200,
      modifications: 15,
      statut: "À jour"
    },
    {
      id: 2,
      titre: "Code de procédure civile et administrative",
      type: "Code",
      domaine: "Procédure",
      derniereMiseAJour: "08 janvier 2024",
      version: "2024.1",
      articles: 850,
      modifications: 8,
      statut: "À jour"
    },
    {
      id: 3,
      titre: "Loi sur l'investissement consolidée",
      type: "Loi",
      domaine: "Économique",
      derniereMiseAJour: "22 décembre 2023",
      version: "2023.4",
      articles: 120,
      modifications: 5,
      statut: "En cours"
    },
    {
      id: 4,
      titre: "Code des douanes algérien",
      type: "Code",
      domaine: "Douanier",
      derniereMiseAJour: "30 novembre 2023",
      version: "2023.3",
      articles: 456,
      modifications: 12,
      statut: "À jour"
    },
    {
      id: 5,
      titre: "Code pénal algérien consolidé",
      type: "Code",
      domaine: "Droit Pénal",
      derniereMiseAJour: "15 décembre 2023",
      version: "2023.4",
      articles: 789,
      modifications: 23,
      statut: "À jour"
    },
    {
      id: 6,
      titre: "Code de procédure pénale",
      type: "Code",
      domaine: "Procédure Pénale",
      derniereMiseAJour: "10 décembre 2023",
      version: "2023.3",
      articles: 567,
      modifications: 18,
      statut: "À jour"
    },
    {
      id: 7,
      titre: "Code du travail consolidé",
      type: "Code",
      domaine: "Droit du Travail",
      derniereMiseAJour: "05 décembre 2023",
      version: "2023.4",
      articles: 345,
      modifications: 12,
      statut: "En cours"
    },
    {
      id: 8,
      titre: "Code de commerce algérien",
      type: "Code",
      domaine: "Droit Commercial",
      derniereMiseAJour: "01 décembre 2023",
      version: "2023.3",
      articles: 234,
      modifications: 9,
      statut: "À jour"
    },
    {
      id: 9,
      titre: "Loi sur les marchés publics consolidée",
      type: "Loi",
      domaine: "Administratif",
      derniereMiseAJour: "25 novembre 2023",
      version: "2023.3",
      articles: 89,
      modifications: 6,
      statut: "À jour"
    },
    {
      id: 10,
      titre: "Code de l'environnement",
      type: "Code",
      domaine: "Environnement",
      derniereMiseAJour: "20 novembre 2023",
      version: "2023.2",
      articles: 156,
      modifications: 11,
      statut: "À jour"
    },
    {
      id: 11,
      titre: "Code des assurances",
      type: "Code",
      domaine: "Assurances",
      derniereMiseAJour: "15 novembre 2023",
      version: "2023.2",
      articles: 123,
      modifications: 7,
      statut: "En cours"
    },
    {
      id: 12,
      titre: "Loi sur la protection des données consolidée",
      type: "Loi",
      domaine: "Numérique",
      derniereMiseAJour: "10 novembre 2023",
      version: "2023.2",
      articles: 67,
      modifications: 4,
      statut: "À jour"
    }
  ];

  // Pagination pour les textes consolidés
  const {
    currentData: paginatedTexts,
    currentPage: textsCurrentPage,
    totalPages: textsTotalPages,
    itemsPerPage: textsItemsPerPage,
    totalItems: textsTotalItems,
    setCurrentPage: setTextsCurrentPage,
    setItemsPerPage: setTextsItemsPerPage
  } = usePagination({
    data: consolidatedTexts,
    itemsPerPage: 10
  });

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "À jour": return "bg-green-100 text-green-800";
      case "En cours": return "bg-yellow-100 text-yellow-800";
      case "Obsolète": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Code": return "bg-blue-100 text-blue-800";
      case "Loi": return "bg-purple-100 text-purple-800";
      case "Décret": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Rechercher dans les textes consolidés..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des textes consolidés */}
      <div className="grid grid-cols-1 gap-4">
        {paginatedTexts.map((texte) => (
          <Card key={texte.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-teal-600" />
                    {texte.titre}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getTypeColor(texte.type)}>
                      {texte.type}
                    </Badge>
                    <Badge variant="outline">
                      {texte.domaine}
                    </Badge>
                    <Badge className={getStatusColor(texte.statut)}>
                      {texte.statut}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Version {texte.version}</div>
                  <div className="text-xs text-gray-500">{texte.derniereMiseAJour}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">{texte.articles}</div>
                  <div className="text-xs text-gray-600">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{texte.modifications}</div>
                  <div className="text-xs text-gray-600">Modifications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2024</div>
                  <div className="text-xs text-gray-600">Année</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">PDF</div>
                  <div className="text-xs text-gray-600">Format</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Dernière mise à jour: {texte.derniereMiseAJour}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Consulter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Télécharger
                  </Button>
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    Utiliser dans l'éditeur
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Pagination pour les textes consolidés */}
      <Pagination
        currentPage={textsCurrentPage}
        totalPages={textsTotalPages}
        totalItems={textsTotalItems}
        itemsPerPage={textsItemsPerPage}
        onPageChange={setTextsCurrentPage}
        onItemsPerPageChange={setTextsItemsPerPage}
      />

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">24</div>
            <div className="text-sm text-gray-600">Textes consolidés</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
            <div className="text-sm text-gray-600">Mises à jour ce mois</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-sm text-gray-600">Textes à jour</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">2.4k</div>
            <div className="text-sm text-gray-600">Consultations mensuelles</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
