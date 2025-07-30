
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Star, Eye, Download } from 'lucide-react';
import { 
  useFunctionalModals, 
  DocumentViewModal, 
  DownloadModal, 
  ComparisonModal
} from '@/components/modals/FunctionalModals';

export function LegalTextsFeatured() {
  const { modals, openDocumentView, openDownload, closeModal } = useFunctionalModals();
  
  const featuredTexts = [
    {
      id: 1,
      title: "Loi n° 23-12 du 14 juin 2023 relative à la transformation numérique",
      type: "Loi",
      category: "Numérique",
      publishDate: "14 juin 2023",
      views: "2,847",
      downloads: "892",
      featured: true
    },
    {
      id: 2,
      title: "Ordonnance n° 23-07 du 18 mai 2023 portant protection des données personnelles",
      type: "Ordonnance",
      category: "Protection des données",
      publishDate: "18 mai 2023",
      views: "1,923",
      downloads: "567",
      featured: true
    },
    {
      id: 3,
      title: "Décret n° 23-234 du 25 avril 2023 relatif à l'investissement",
      type: "Décret",
      category: "Économie",
      publishDate: "25 avril 2023",
      views: "3,156",
      downloads: "1,234",
      featured: true
    },
    {
      id: 4,
      title: "Loi n° 23-08 du 12 mars 2023 sur l'investissement étranger",
      type: "Loi",
      category: "Économie",
      publishDate: "12 mars 2023",
      views: "2,456",
      downloads: "789",
      featured: true
    },
    {
      id: 5,
      title: "Ordonnance n° 23-05 du 8 février 2023 sur la cybersécurité",
      type: "Ordonnance",
      category: "Sécurité",
      publishDate: "8 février 2023",
      views: "1,789",
      downloads: "456",
      featured: true
    },
    {
      id: 6,
      title: "Décret n° 23-156 du 15 janvier 2023 sur les marchés publics",
      type: "Décret",
      category: "Administratif",
      publishDate: "15 janvier 2023",
      views: "3,234",
      downloads: "1,567",
      featured: true
    },
    {
      id: 7,
      title: "Loi n° 23-03 du 10 décembre 2022 sur l'énergie renouvelable",
      type: "Loi",
      category: "Environnement",
      publishDate: "10 décembre 2022",
      views: "2,123",
      downloads: "678",
      featured: true
    },
    {
      id: 8,
      title: "Ordonnance n° 23-02 du 5 novembre 2022 sur la santé publique",
      type: "Ordonnance",
      category: "Santé",
      publishDate: "5 novembre 2022",
      views: "1,567",
      downloads: "345",
      featured: true
    },
    {
      id: 9,
      title: "Décret n° 23-089 du 20 octobre 2022 sur l'éducation nationale",
      type: "Décret",
      category: "Éducation",
      publishDate: "20 octobre 2022",
      views: "2,789",
      downloads: "890",
      featured: true
    },
    {
      id: 10,
      title: "Loi n° 23-01 du 15 septembre 2022 sur la propriété intellectuelle",
      type: "Loi",
      category: "Propriété intellectuelle",
      publishDate: "15 septembre 2022",
      views: "1,890",
      downloads: "567",
      featured: true
    },
    {
      id: 11,
      title: "Ordonnance n° 23-04 du 10 août 2022 sur le commerce électronique",
      type: "Ordonnance",
      category: "Commerce",
      publishDate: "10 août 2022",
      views: "2,345",
      downloads: "789",
      featured: true
    },
    {
      id: 12,
      title: "Décret n° 23-078 du 25 juillet 2022 sur la protection sociale",
      type: "Décret",
      category: "Social",
      publishDate: "25 juillet 2022",
      views: "1,678",
      downloads: "456",
      featured: true
    }
  ];

  // Pagination pour les textes en vedette
  const {
    currentData: paginatedFeaturedTexts,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: featuredTexts,
    itemsPerPage: 10
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Star className="w-6 h-6 text-yellow-500" />
        <h3 className="text-xl font-semibold text-gray-900">Textes juridiques en vedette</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {paginatedFeaturedTexts.map((text) => (
            <Card key={text.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{text.type}</Badge>
                      <Badge className="bg-emerald-100 text-emerald-800">{text.category}</Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{text.title}</CardTitle>
                  </div>
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Publié le {text.publishDate}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {text.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {text.downloads}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        openDocumentView({
                          id: text.id.toString(),
                          title: text.title,
                          type: text.type || 'Texte juridique'
                        });
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Consulter
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => {
                        openDownload({
                          title: text.title,
                          type: text.type || 'Texte juridique'
                        });
                      }}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
      
      {/* Modales fonctionnelles */}
      {modals.documentView.document && (
        <DocumentViewModal
          isOpen={modals.documentView.isOpen}
          onClose={() => closeModal('documentView')}
          document={modals.documentView.document}
        />
      )}
      
      {modals.download.document && (
        <DownloadModal
          isOpen={modals.download.isOpen}
          onClose={() => closeModal('download')}
          document={modals.download.document}
        />
      )}
      
      <ComparisonModal
        isOpen={modals.comparison.isOpen}
        onClose={() => closeModal('comparison')}
        items={modals.comparison.items}
        type={modals.comparison.type}
      />
    </div>
  );
}
