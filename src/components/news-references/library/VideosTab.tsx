
import React from 'react';
import { ActionButtons } from './ActionButtons';
import { ResourceCard } from './ResourceCard';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Play } from 'lucide-react';

export function VideosTab() {
  const videos = [
    {
      id: 1,
      title: "Conférence : Le nouveau code de procédure",
      speaker: "Pr. Karim Benali",
      duration: "1h 30min",
      year: "2024",
      category: "Procédure",
      description: "Présentation des nouvelles dispositions procédurales"
    },
    {
      id: 2,
      title: "Séminaire : Droit des investissements",
      speaker: "Dr. Samia Redjimi",
      duration: "2h 15min",
      year: "2024",
      category: "Économique",
      description: "Les enjeux juridiques de l'investissement en Algérie"
    },
    {
      id: 3,
      title: "Webinaire : Protection des données personnelles",
      speaker: "Dr. Ahmed Mahiou",
      duration: "1h 45min",
      year: "2024",
      category: "Numérique",
      description: "Conformité RGPD et obligations légales"
    },
    {
      id: 4,
      title: "Conférence : Droit fiscal des entreprises",
      speaker: "Pr. Omar Khelifi",
      duration: "2h 00min",
      year: "2024",
      category: "Fiscal",
      description: "Optimisation fiscale et planification"
    },
    {
      id: 5,
      title: "Séminaire : Droit administratif",
      speaker: "Dr. Leila Mansouri",
      duration: "1h 55min",
      year: "2023",
      category: "Administratif",
      description: "Contentieux administratif et recours"
    },
    {
      id: 6,
      title: "Webinaire : Droit commercial international",
      speaker: "Pr. Mohamed Bedjaoui",
      duration: "2h 30min",
      year: "2024",
      category: "International",
      description: "Contrats internationaux et arbitrage"
    },
    {
      id: 7,
      title: "Conférence : Droit social et syndical",
      speaker: "Dr. Rachid Tlemçani",
      duration: "1h 40min",
      year: "2023",
      category: "Social",
      description: "Libertés syndicales et négociation"
    },
    {
      id: 8,
      title: "Séminaire : Droit de l'environnement",
      speaker: "Pr. Hassan Benali",
      duration: "1h 50min",
      year: "2024",
      category: "Environnemental",
      description: "Réglementation et protection environnementale"
    },
    {
      id: 9,
      title: "Webinaire : Droit bancaire et financier",
      speaker: "Dr. Abdelkader Messaoudi",
      duration: "2h 10min",
      year: "2024",
      category: "Bancaire",
      description: "Régulation et services financiers"
    },
    {
      id: 10,
      title: "Conférence : Droit pénal et procédure",
      speaker: "Pr. Samira Zidane",
      duration: "1h 35min",
      year: "2024",
      category: "Pénal",
      description: "Garanties procédurales et droits de la défense"
    }
  ];

  // Pagination pour les vidéos
  const {
    currentData: paginatedVideos,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: videos,
    itemsPerPage: 6
  });

  return (
    <div className="space-y-6">
      <ActionButtons resourceType="video" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedVideos.map((video) => (
          <ResourceCard 
            key={video.id}
            id={video.id}
            title={video.title}
            speaker={video.speaker}
            duration={video.duration}
            year={video.year}
            category={video.category}
            description={video.description}
            icon={<Play className="w-5 h-5" />}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            actionLabel="Regarder"
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
