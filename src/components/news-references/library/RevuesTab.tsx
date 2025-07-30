
import React from 'react';
import { ActionButtons } from './ActionButtons';
import { ResourceCard } from './ResourceCard';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { BookOpen } from 'lucide-react';

export function RevuesTab() {
  const revues = [
    {
      id: 1,
      title: "Revue Algérienne de Droit",
      author: "Université d'Alger",
      publisher: "Faculté de Droit",
      year: "2024",
      pages: 120,
      category: "Académique",
      description: "Revue semestrielle de recherche juridique"
    },
    {
      id: 2,
      title: "Jurisprudence Algérienne",
      author: "Conseil d'État",
      publisher: "Publications Officielles",
      year: "2024",
      pages: 80,
      category: "Jurisprudence",
      description: "Recueil de jurisprudence des hautes juridictions"
    },
    {
      id: 3,
      title: "Revue de Droit Commercial",
      author: "Chambre de Commerce",
      publisher: "CCIA",
      year: "2024",
      pages: 95,
      category: "Commercial",
      description: "Actualités et analyses du droit commercial"
    },
    {
      id: 4,
      title: "Bulletin de Législation",
      author: "Ministère de la Justice",
      publisher: "Journal Officiel",
      year: "2024",
      pages: 60,
      category: "Législation",
      description: "Bulletin mensuel des nouvelles lois"
    },
    {
      id: 5,
      title: "Revue de Droit Social",
      author: "CNAS",
      publisher: "Caisse Nationale",
      year: "2024",
      pages: 85,
      category: "Social",
      description: "Études en droit social et sécurité sociale"
    },
    {
      id: 6,
      title: "Cahiers de Droit Fiscal",
      author: "Ordre des Experts Comptables",
      publisher: "OEC",
      year: "2024",
      pages: 110,
      category: "Fiscal",
      description: "Analyses fiscales et comptables"
    },
    {
      id: 7,
      title: "Revue de Droit Administratif",
      author: "Conseil d'État",
      publisher: "Publications Officielles",
      year: "2023",
      pages: 75,
      category: "Administratif",
      description: "Études en droit administratif"
    },
    {
      id: 8,
      title: "Bulletin de Jurisprudence Pénale",
      author: "Cour Suprême",
      publisher: "Publications Officielles",
      year: "2024",
      pages: 90,
      category: "Pénal",
      description: "Jurisprudence pénale commentée"
    },
    {
      id: 9,
      title: "Revue de Droit International",
      author: "Université d'Oran",
      publisher: "Faculté de Droit",
      year: "2023",
      pages: 100,
      category: "International",
      description: "Études en droit international"
    },
    {
      id: 10,
      title: "Cahiers de Droit Civil",
      author: "Université de Constantine",
      publisher: "Faculté de Droit",
      year: "2024",
      pages: 115,
      category: "Civil",
      description: "Recherches en droit civil"
    }
  ];

  // Pagination pour les revues
  const {
    currentData: paginatedRevues,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: revues,
    itemsPerPage: 6
  });

  return (
    <div className="space-y-6">
      <ActionButtons resourceType="revue" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedRevues.map((revue) => (
          <ResourceCard 
            key={revue.id}
            id={revue.id}
            title={revue.title}
            author={revue.author}
            publisher={revue.publisher}
            year={revue.year}
            pages={revue.pages}
            category={revue.category}
            description={revue.description}
            icon={<BookOpen className="w-5 h-5" />}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
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
