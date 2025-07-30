
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Star, Quote, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function LegalTextsTestimonials() {
  const [searchTerm, setSearchTerm] = useState('');

  const testimonials = [
    {
      id: 1,
      name: "Me. Amina Benali",
      role: "Avocate",
      speciality: "Droit commercial",
      rating: 5,
      comment: "Cette plateforme m'a permis de trouver rapidement les textes juridiques dont j'avais besoin pour mes dossiers. La recherche est très efficace.",
      date: "12 janvier 2024"
    },
    {
      id: 2,
      name: "Dr. Karim Meziani",
      role: "Magistrat",
      speciality: "Droit civil",
      rating: 5,
      comment: "Un outil indispensable pour les professionnels du droit. La base de données est complète et régulièrement mise à jour.",
      date: "08 janvier 2024"
    },
    {
      id: 3,
      name: "Mme. Fatima Ouali",
      role: "Juriste d'entreprise",
      speciality: "Droit du travail",
      rating: 4,
      comment: "Interface intuitive et contenu de qualité. Je recommande vivement cette plateforme à tous mes collègues juristes.",
      date: "05 janvier 2024"
    },
    {
      id: 4,
      name: "M. Ahmed Benaissa",
      role: "Notaire",
      speciality: "Droit immobilier",
      rating: 5,
      comment: "Excellente base de données juridique. Les textes sont à jour et la navigation est très intuitive.",
      date: "28 décembre 2023"
    },
    {
      id: 5,
      name: "Mme. Sarah Kadi",
      role: "Juriste conseil",
      speciality: "Droit des affaires",
      rating: 4,
      comment: "Très bon outil de travail. Permet de gagner énormément de temps dans mes recherches juridiques.",
      date: "15 décembre 2023"
    },
    {
      id: 6,
      name: "Dr. Mohamed Laib",
      role: "Professeur de droit",
      speciality: "Droit constitutionnel",
      rating: 5,
      comment: "Ressource indispensable pour l'enseignement et la recherche. Très complet et bien organisé.",
      date: "10 décembre 2023"
    },
    {
      id: 7,
      name: "Me. Leila Boudjemaa",
      role: "Avocate",
      speciality: "Droit de la famille",
      rating: 4,
      comment: "Interface claire et fonctionnalités utiles. Facilite grandement mon travail quotidien.",
      date: "02 décembre 2023"
    },
    {
      id: 8,
      name: "M. Yacine Hamidi",
      role: "Huissier de justice",
      speciality: "Procédures civiles",
      rating: 5,
      comment: "Outil professionnel de qualité. Les procédures sont bien détaillées et faciles à comprendre.",
      date: "25 novembre 2023"
    }
  ];

  // Filtrage des témoignages
  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination pour les témoignages
  const {
    currentData: paginatedTestimonials,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredTestimonials,
    itemsPerPage: 4
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Témoignages récents</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher un témoignage..."
            className="pl-10 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <Badge variant="outline" className="mt-1">
                    {testimonial.speciality}
                  </Badge>
                </div>
                <Quote className="w-6 h-6 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-sm text-gray-700 italic">"{testimonial.comment}"</p>
                <p className="text-xs text-gray-500">{testimonial.date}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
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
    </div>
  );
}
