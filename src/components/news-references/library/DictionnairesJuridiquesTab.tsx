import React from 'react';
import { ActionButtons } from './ActionButtons';
import { ResourceCard } from './ResourceCard';
import { BookOpen } from 'lucide-react';

export function DictionnairesJuridiquesTab() {
  const dictionnaires = [
    {
      id: 1,
      title: "Dictionnaire Juridique Français-Arabe",
      author: "Dr. Ahmed Benali",
      publisher: "Éditions Juridiques Algériennes",
      year: "2024",
      pages: 850,
      category: "Dictionnaire Bilingue",
      description: "Dictionnaire spécialisé de termes juridiques français-arabe avec 15,000 entrées"
    },
    {
      id: 2,
      title: "Lexique du Droit Civil Algérien",
      author: "Prof. Fatima Boudiaf",
      publisher: "Presses Universitaires d'Alger",
      year: "2023",
      pages: 420,
      category: "Droit Civil",
      description: "Glossaire spécialisé des termes du droit civil avec références aux articles de loi"
    },
    {
      id: 3,
      title: "Dictionnaire de Droit Pénal",
      author: "Dr. Mohamed Khelifi",
      publisher: "Dar El Houda",
      year: "2024",
      pages: 380,
      category: "Droit Pénal",
      description: "Dictionnaire des termes de droit pénal et de procédure pénale"
    }
  ];

  return (
    <div className="space-y-6">
      <ActionButtons resourceType="dictionnaire-juridique" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dictionnaires.map((dictionnaire) => (
          <ResourceCard 
            key={dictionnaire.id}
            id={dictionnaire.id}
            title={dictionnaire.title}
            author={dictionnaire.author}
            publisher={dictionnaire.publisher}
            year={dictionnaire.year}
            pages={dictionnaire.pages}
            category={dictionnaire.category}
            description={dictionnaire.description}
            icon={<BookOpen className="w-5 h-5" />}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            actionLabel="Consulter"
          />
        ))}
      </div>
    </div>
  );
}