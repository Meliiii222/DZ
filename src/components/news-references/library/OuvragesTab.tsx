
import React from 'react';
import { ActionButtons } from './ActionButtons';
import { ResourceCard } from './ResourceCard';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Book } from 'lucide-react';

export function OuvragesTab() {
  const ouvrages = [
    {
      id: 1,
      title: "Code Civil Algérien",
      author: "République Algérienne",
      publisher: "Journal Officiel",
      year: "2024",
      pages: 450,
      category: "Droit Civil",
      description: "Version consolidée du Code Civil avec les dernières modifications"
    },
    {
      id: 2,
      title: "Droit des Obligations",
      author: "Mohamed Bedjaoui",
      publisher: "Editions HOUMA",
      year: "2023",
      pages: 320,
      category: "Droit Civil",
      description: "Étude approfondie du droit des obligations en droit algérien"
    }
  ];

  // Pagination pour les ouvrages
  const {
    currentData: paginatedOuvrages,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: ouvrages,
    itemsPerPage: 6
  });

  return (
    <div className="space-y-6">
      <ActionButtons resourceType="ouvrage" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedOuvrages.map((ouvrage) => (
          <ResourceCard 
            key={ouvrage.id}
            id={ouvrage.id}
            title={ouvrage.title}
            author={ouvrage.author}
            publisher={ouvrage.publisher}
            year={ouvrage.year}
            pages={ouvrage.pages}
            category={ouvrage.category}
            description={ouvrage.description}
            icon={<Book className="w-5 h-5" />}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
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
