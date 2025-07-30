import React from 'react';
import { ActionButtons } from './ActionButtons';
import { ResourceCard } from './ResourceCard';
import { Languages } from 'lucide-react';

export function TerminologieSpecialiseeTab() {
  const terminologies = [
    {
      id: 1,
      title: "Terminologie du Droit Commercial",
      author: "Dr. Rachid Mammeri",
      publisher: "Editions Dar El Oumma",
      year: "2024",
      pages: 245,
      category: "Droit Commercial",
      description: "Recueil spécialisé de terminologie commerciale et des affaires en droit algérien"
    },
    {
      id: 2,
      title: "Glossaire de Droit Administratif",
      author: "Prof. Aicha Bendjemil",
      publisher: "OPU - Office des Publications Universitaires",
      year: "2023",
      pages: 180,
      category: "Droit Administratif",
      description: "Terminologie spécialisée du droit administratif algérien avec exemples pratiques"
    },
    {
      id: 3,
      title: "Vocabulaire du Droit du Travail",
      author: "Dr. Karim Benaissa",
      publisher: "Editions El Hibr",
      year: "2024",
      pages: 320,
      category: "Droit Social",
      description: "Terminologie complète du droit du travail et de la sécurité sociale"
    },
    {
      id: 4,
      title: "Lexique de Procédure Civile",
      author: "Dr. Samira Hadj Ali",
      publisher: "Editions Houma",
      year: "2023",
      pages: 290,
      category: "Procédure",
      description: "Vocabulaire technique de la procédure civile et commerciale"
    }
  ];

  return (
    <div className="space-y-6">
      <ActionButtons resourceType="terminologie-specialisee" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {terminologies.map((terminologie) => (
          <ResourceCard 
            key={terminologie.id}
            id={terminologie.id}
            title={terminologie.title}
            author={terminologie.author}
            publisher={terminologie.publisher}
            year={terminologie.year}
            pages={terminologie.pages}
            category={terminologie.category}
            description={terminologie.description}
            icon={<Languages className="w-5 h-5" />}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            actionLabel="Consulter"
          />
        ))}
      </div>
    </div>
  );
}