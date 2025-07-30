
import React from 'react';
import { ActionButtons } from './ActionButtons';
import { ResourceCard } from './ResourceCard';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Newspaper } from 'lucide-react';

export function JournauxTab() {
  const journaux = [
    {
      id: 1,
      title: "Journal Officiel de la République Algérienne",
      author: "République Algérienne",
      publisher: "Imprimerie Officielle",
      year: "2024",
      pages: 50,
      category: "Officiel",
      description: "Publication officielle des textes réglementaires"
    },
    {
      id: 2,
      title: "Bulletin Officiel des Annonces Légales",
      author: "Ministère de la Justice",
      publisher: "Imprimerie Officielle",
      year: "2024",
      pages: 30,
      category: "Légal",
      description: "Annonces légales et judiciaires"
    },
    {
      id: 3,
      title: "Bulletin Officiel des Marchés Publics",
      author: "Ministère des Finances",
      publisher: "Imprimerie Officielle",
      year: "2024",
      pages: 25,
      category: "Marchés Publics",
      description: "Publication des marchés publics"
    },
    {
      id: 4,
      title: "Bulletin Officiel des Sociétés",
      author: "Centre National du Registre de Commerce",
      publisher: "CNRC",
      year: "2024",
      pages: 40,
      category: "Commerce",
      description: "Annonces légales des sociétés"
    },
    {
      id: 5,
      title: "Bulletin Officiel des Propriétés Industrielles",
      author: "Institut National Algérien de la Propriété Industrielle",
      publisher: "INAPI",
      year: "2024",
      pages: 35,
      category: "Propriété Industrielle",
      description: "Brevets et marques déposées"
    },
    {
      id: 6,
      title: "Bulletin Officiel des Douanes",
      author: "Direction Générale des Douanes",
      publisher: "DGD",
      year: "2024",
      pages: 20,
      category: "Douanes",
      description: "Réglementation douanière"
    },
    {
      id: 7,
      title: "Bulletin Officiel de la Banque d'Algérie",
      author: "Banque d'Algérie",
      publisher: "BA",
      year: "2024",
      pages: 45,
      category: "Banque",
      description: "Réglementation bancaire et monétaire"
    },
    {
      id: 8,
      title: "Bulletin Officiel de l'Environnement",
      author: "Ministère de l'Environnement",
      publisher: "Imprimerie Officielle",
      year: "2024",
      pages: 30,
      category: "Environnement",
      description: "Réglementation environnementale"
    }
  ];

  // Pagination pour les journaux
  const {
    currentData: paginatedJournaux,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: journaux,
    itemsPerPage: 6
  });

  return (
    <div className="space-y-6">
      <ActionButtons resourceType="journal" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedJournaux.map((journal) => (
          <ResourceCard 
            key={journal.id}
            id={journal.id}
            title={journal.title}
            author={journal.author}
            publisher={journal.publisher}
            year={journal.year}
            pages={journal.pages}
            category={journal.category}
            description={journal.description}
            icon={<Newspaper className="w-5 h-5" />}
            iconBgColor="bg-gray-100"
            iconColor="text-gray-600"
            actionLabel="Consulter"
          />
        ))}
      </div>
      {totalPages > 1 && (
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
      )}
    </div>
  );
}
