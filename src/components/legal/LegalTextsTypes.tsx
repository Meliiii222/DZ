
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Scale, BookOpen, Building, FileText } from 'lucide-react';

export function LegalTextsTypes() {
  const textTypes = [
    {
      id: 1,
      name: "Lois",
      count: 892,
      description: "Textes adoptés par le Parlement",
      icon: Scale,
      color: "emerald"
    },
    {
      id: 2,
      name: "Ordonnances",
      count: 234,
      description: "Textes pris par le Président de la République",
      icon: BookOpen,
      color: "blue"
    },
    {
      id: 3,
      name: "Décrets",
      count: 312,
      description: "Textes réglementaires du gouvernement",
      icon: Building,
      color: "purple"
    },
    {
      id: 4,
      name: "Arrêtés",
      count: 156,
      description: "Textes des autorités administratives",
      icon: FileText,
      color: "orange"
    },
    {
      id: 5,
      name: "Circulaires",
      count: 445,
      description: "Instructions administratives",
      icon: FileText,
      color: "indigo"
    },
    {
      id: 6,
      name: "Décisions",
      count: 289,
      description: "Actes administratifs individuels",
      icon: Scale,
      color: "red"
    },
    {
      id: 7,
      name: "Règlements",
      count: 178,
      description: "Textes d'application des lois",
      icon: Building,
      color: "yellow"
    },
    {
      id: 8,
      name: "Conventions",
      count: 123,
      description: "Accords internationaux",
      icon: BookOpen,
      color: "green"
    },
    {
      id: 9,
      name: "Directives",
      count: 234,
      description: "Instructions d'application",
      icon: FileText,
      color: "pink"
    },
    {
      id: 10,
      name: "Résolutions",
      count: 167,
      description: "Décisions des assemblées",
      icon: Scale,
      color: "cyan"
    },
    {
      id: 11,
      name: "Proclamations",
      count: 89,
      description: "Déclarations officielles",
      icon: BookOpen,
      color: "amber"
    },
    {
      id: 12,
      name: "Amendements",
      count: 345,
      description: "Modifications de textes existants",
      icon: FileText,
      color: "lime"
    }
  ];

  // Pagination pour les types de textes
  const {
    currentData: paginatedTextTypes,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: textTypes,
    itemsPerPage: 10
  });

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: "bg-emerald-100 text-emerald-600",
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600"
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Types de textes juridiques</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedTextTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Card key={type.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getColorClasses(type.color)}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{type.name}</CardTitle>
                      <p className="text-sm text-gray-600">{type.count} textes</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      console.log('Browsing legal text type:', type.name);
                      window.dispatchEvent(new CustomEvent('browse-legal-type', { 
                        detail: { 
                          typeId: type.id,
                          typeName: type.name
                        }
                      }));
                    }}
                  >
                    Parcourir
                  </Button>
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
