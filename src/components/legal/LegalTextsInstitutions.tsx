
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Building, Users, Scale } from 'lucide-react';
import { useGlobalActions } from '@/hooks/useGlobalActions';

export function LegalTextsInstitutions() {
  const actions = useGlobalActions();

  const institutions = [
    {
      id: 1,
      name: "Assemblée Populaire Nationale",
      type: "Législatif",
      textsCount: 892,
      description: "Institution législative responsable de l'adoption des lois",
      icon: Building
    },
    {
      id: 2,
      name: "Conseil de la Nation",
      type: "Législatif",
      textsCount: 156,
      description: "Chambre haute du Parlement algérien",
      icon: Scale
    },
    {
      id: 3,
      name: "Présidence de la République",
      type: "Exécutif",
      textsCount: 234,
      description: "Ordonnances et décrets présidentiels",
      icon: Users
    },
    {
      id: 4,
      name: "Conseil des Ministres",
      type: "Exécutif",
      textsCount: 312,
      description: "Décrets exécutifs et réglementaires",
      icon: Building
    },
    {
      id: 5,
      name: "Ministère de la Justice",
      type: "Judiciaire",
      textsCount: 445,
      description: "Textes juridiques et réglementaires judiciaires",
      icon: Scale
    },
    {
      id: 6,
      name: "Ministère de l'Intérieur",
      type: "Administratif",
      textsCount: 567,
      description: "Réglementation administrative et sécuritaire",
      icon: Building
    },
    {
      id: 7,
      name: "Ministère des Finances",
      type: "Économique",
      textsCount: 378,
      description: "Lois et décrets fiscaux et budgétaires",
      icon: Building
    },
    {
      id: 8,
      name: "Ministère du Travail",
      type: "Social",
      textsCount: 289,
      description: "Code du travail et réglementation sociale",
      icon: Users
    },
    {
      id: 9,
      name: "Ministère de l'Éducation",
      type: "Éducatif",
      textsCount: 234,
      description: "Lois et décrets sur l'éducation nationale",
      icon: Building
    },
    {
      id: 10,
      name: "Ministère de la Santé",
      type: "Sanitaire",
      textsCount: 198,
      description: "Réglementation sanitaire et médicale",
      icon: Users
    },
    {
      id: 11,
      name: "Ministère de l'Environnement",
      type: "Environnemental",
      textsCount: 145,
      description: "Lois environnementales et de protection",
      icon: Building
    },
    {
      id: 12,
      name: "Ministère de l'Agriculture",
      type: "Agricole",
      textsCount: 167,
      description: "Réglementation agricole et rurale",
      icon: Building
    }
  ];

  // Pagination pour les institutions
  const {
    currentData: paginatedInstitutions,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: institutions,
    itemsPerPage: 10
  });

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Institutions</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedInstitutions.map((institution) => {
            const IconComponent = institution.icon;
            return (
              <Card key={institution.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <IconComponent className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{institution.name}</CardTitle>
                      <p className="text-sm text-gray-600">{institution.type}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{institution.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-600">
                      {institution.textsCount} textes
                    </span>
                    <Button variant="outline" size="sm" 
                            onClick={() => actions.handlePDFView(`Textes de ${institution.name}`)}>
                      Voir les textes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </div>
  );
}
