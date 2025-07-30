
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  ArrowRight, 
  CheckCircle,
  Building,
  Scale,
  Briefcase,
  UserCheck,
  Car,
  Home
} from 'lucide-react';
import { NewTemplateModal } from '@/components/modals/NewTemplateModal';
import { DocumentViewerModal } from '@/components/modals/DocumentViewerModal';
import { DocumentTemplatesModal } from '@/components/modals/DocumentTemplatesModal';
import { CollaborativeEditorModal } from '@/components/modals/CollaborativeEditorModal';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

export function DocumentTemplatesSection() {
  // Ajout de l'état pour les modales métier
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [showCollaborativeEditor, setShowCollaborativeEditor] = useState(false);
  const [templateCategory, setTemplateCategory] = useState<string|null>(null);

  // Simule l'ouverture d'une modale de visualisation de modèles pour une catégorie
  const handleBrowseTemplates = (categoryTitle: string) => {
    setTemplateCategory(categoryTitle);
    setShowTemplateModal(true);
  };

  // Ouvre la modale de création de modèle ou navigue vers la collaboration
  const handleFeatureAction = (actionType: string) => {
    if (actionType === 'Créer un modèle') {
      setShowNewTemplateModal(true);
    } else if (actionType === 'Collaborer') {
      setShowCollaborativeEditor(true);
    }
  };

  // Ouvre la modale d'édition collaborative
  const handleOpenEditor = () => {
    setShowCollaborativeEditor(true);
  };

  const categories = [
    {
      title: "Contrats et accords",
      description: "Modèles de contrats, accords commerciaux et conventions",
      count: 45,
      color: "blue",
      icon: FileText
    },
    {
      title: "Documents administratifs",
      description: "Formulaires officiels et procédures administratives",
      count: 32,
      color: "green",
      icon: Building
    },
    {
      title: "Textes juridiques",
      description: "Modèles de textes de loi, décrets et arrêtés",
      count: 28,
      color: "purple",
      icon: Scale
    },
    {
      title: "Documents d'entreprise",
      description: "Statuts, règlements intérieurs et documents RH",
      count: 19,
      color: "orange",
      icon: Briefcase
    }
  ];

  const features = [
    {
      title: "Personnalisation avancée",
      description: "Adaptez chaque modèle selon vos besoins spécifiques avec notre éditeur intégré.",
      action: "Créer un modèle"
    },
    {
      title: "Collaboration en équipe",
      description: "Travaillez ensemble sur vos documents avec des outils de révision et commentaires.",
      action: "Collaborer"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600"
  };

  // Pagination pour les catégories de modèles
  const {
    currentData: paginatedCategories,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: categories,
    itemsPerPage: 4
  });

  return (
    <div className="space-y-8">
      {/* Modale de visualisation de modèles */}
      {showTemplateModal && templateCategory && (
        <DocumentTemplatesModal
          isOpen={showTemplateModal}
          onClose={() => setShowTemplateModal(false)}
          category={templateCategory}
        />
      )}
      {/* Modale de création de modèle */}
      {showNewTemplateModal && (
        <NewTemplateModal
          isOpen={showNewTemplateModal}
          onClose={() => setShowNewTemplateModal(false)}
          onSave={(data) => {
            // Sauvegarde du modèle dans la base de données
            console.log('Modèle sauvegardé:', data);
            setShowNewTemplateModal(false);
          }}
        />
      )}
      {/* Modale d'édition collaborative */}
      {showCollaborativeEditor && (
        <CollaborativeEditorModal
          isOpen={showCollaborativeEditor}
          onClose={() => setShowCollaborativeEditor(false)}
        />
      )}
      {/* Catégories de modèles avec pagination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedCategories.map((category, index) => {
          const IconComponent = category.icon;
          
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[category.color as keyof typeof colorClasses]}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {category.count} modèles
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  onClick={() => handleBrowseTemplates(category.title)}
                >
                  Parcourir les modèles
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
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

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  {index === 0 ? <CheckCircle className="w-6 h-6 text-emerald-600" /> : <Users className="w-6 h-6 text-emerald-600" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleFeatureAction(feature.action)}
                  >
                    {feature.action}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Feature */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-800">Éditeur collaboratif</h3>
                <p className="text-emerald-700">
                  Rédigez et collaborez en temps réel avec votre équipe sur des documents juridiques.
                </p>
              </div>
            </div>
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleOpenEditor}
            >
              Ouvrir l'éditeur
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
