
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
