
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreateAnnotationModal } from '@/components/modals/CreateAnnotationModal';
import { 
  Edit3, 
  MessageSquare, 
  Clock,
  Users
} from 'lucide-react';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

export function RealtimeAnnotationsTab() {
  const [createAnnotationOpen, setCreateAnnotationOpen] = useState(false);

  const realtimeAnnotations = [
    {
      id: 1,
      document: "Projet de loi sur l'investissement 2025",
      text: "Article 15 - Incitations fiscales",
      annotation: "Cette disposition pourrait créer des inégalités entre secteurs",
      author: "Dr. Amina Benali",
      timestamp: "Il y a 5 minutes",
      status: "active",
      collaborators: ["Me. Karim", "Prof. Ahmed"]
    },
    {
      id: 2,
      document: "Code du travail - Révision",
      text: "Durée légale du travail",
      annotation: "Alignement nécessaire avec les standards internationaux",
      author: "Me. Fatima Zahra",
      timestamp: "Il y a 12 minutes",
      status: "resolved",
      collaborators: ["Dr. Hassan", "Me. Omar"]
    }
  ];

  // Pagination pour les annotations en temps réel
  const {
    currentData: paginatedAnnotations,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: realtimeAnnotations,
    itemsPerPage: 6
  });

  const handleSaveAnnotation = (annotationData: Record<string, unknown>) => {
    console.log('Nouvelle annotation créée:', annotationData);
    // Ici on ajouterait la logique pour sauvegarder l'annotation
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
            Annotation Collaborative en Temps Réel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {paginatedAnnotations.map((annotation) => (
              <div key={annotation.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{annotation.document}</Badge>
                      <Badge className={
                        annotation.status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {annotation.status === 'active' ? 'Actif' : 'Résolu'}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-blue-600">{annotation.text}</h4>
                    <p className="text-gray-700 mt-2">{annotation.annotation}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>Par {annotation.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {annotation.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{annotation.collaborators.length} collaborateurs</span>
                  </div>
                </div>
              </div>
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
          
          <Button 
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
            onClick={() => setCreateAnnotationOpen(true)}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Créer une nouvelle annotation
          </Button>
        </CardContent>
      </Card>

      <CreateAnnotationModal
        isOpen={createAnnotationOpen}
        onClose={() => setCreateAnnotationOpen(false)}
        onSave={handleSaveAnnotation}
      />
    </div>
  );
}
