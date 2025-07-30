
import React from 'react';
import { ActionButtons } from './ActionButtons';
import { ResourceCard } from './ResourceCard';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { FileText } from 'lucide-react';

export function ArticlesTab() {
  const articles = [
    {
      id: 1,
      title: "La réforme du droit commercial algérien",
      author: "Pr. Ahmed Mahiou",
      publisher: "Revue de Droit",
      year: "2024",
      pages: 25,
      category: "Droit Commercial",
      description: "Analyse des récentes modifications du code de commerce"
    },
    {
      id: 2,
      title: "L'évolution du droit de la famille",
      author: "Dr. Fatima Zohra",
      publisher: "Cahiers Juridiques",
      year: "2023",
      pages: 18,
      category: "Droit de la Famille",
      description: "Étude comparative des réformes récentes"
    }
  ];

  // Pagination pour les articles
  const {
    currentData: paginatedArticles,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: articles,
    itemsPerPage: 6
  });

  return (
    <div className="space-y-6">
      <ActionButtons resourceType="article" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedArticles.map((article) => (
          <ResourceCard 
            key={article.id}
            id={article.id}
            title={article.title}
            author={article.author}
            publisher={article.publisher}
            year={article.year}
            pages={article.pages}
            category={article.category}
            description={article.description}
            icon={<FileText className="w-5 h-5" />}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            actionLabel="Lire"
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
