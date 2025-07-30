import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Search, Eye, Download, Edit, FileText, Copy, ExternalLink } from 'lucide-react';
import { ALL_FORM_TEMPLATES } from '@/data/formTemplatesFinal';
import { FormTemplate } from '@/data/formTemplates';
import { FormPreviewModal } from './FormPreviewModal';
import { useToast } from '@/hooks/use-toast';
import { buttonHandlers } from '@/utils/buttonUtils';

interface FormLibraryProps {
  onSelectTemplate: (template: FormTemplate) => void;
  onAddToLegalTexts?: (template: FormTemplate) => void;
  onAddToProcedures?: (template: FormTemplate) => void;
}

export function FormLibrary({ onSelectTemplate, onAddToLegalTexts, onAddToProcedures }: FormLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<FormTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { toast } = useToast();

  // Catégories prédéfinies avec filtres spéciaux
  const predefinedCategories = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'textes_juridiques', label: 'Textes Juridiques' },
    { value: 'procedures_administratives', label: 'Procédures Administratives' }
  ];

  const dynamicCategories = Array.from(new Set(ALL_FORM_TEMPLATES.map(t => t.category)))
    .filter(cat => !['État Civil', 'Urbanisme', 'Commerce', 'Emploi', 'Santé', 'Éducation', 'Transport', 'Fiscalité'].includes(cat));

  const filteredTemplates = ALL_FORM_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = true;
    if (selectedCategory && selectedCategory !== 'all') {
      if (selectedCategory === 'textes_juridiques') {
        // Filtrer tous les textes juridiques (excluant les procédures administratives)
        const procedureCategories = ['État Civil', 'Urbanisme', 'Commerce', 'Emploi', 'Santé', 'Éducation', 'Transport', 'Fiscalité'];
        matchesCategory = !procedureCategories.includes(template.category);
      } else if (selectedCategory === 'procedures_administratives') {
        // Filtrer uniquement les procédures administratives
        const procedureCategories = ['État Civil', 'Urbanisme', 'Commerce', 'Emploi', 'Santé', 'Éducation', 'Transport', 'Fiscalité'];
        matchesCategory = procedureCategories.includes(template.category);
      } else {
        // Filtrer par catégorie exacte
        matchesCategory = template.category === selectedCategory;
      }
    }
    
    return matchesSearch && matchesCategory;
  });

  // Pagination pour les templates de formulaires
  const {
    currentData: paginatedTemplates,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredTemplates,
    itemsPerPage: 10
  });

  const handlePreview = (template: FormTemplate) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleUseTemplate = (template: FormTemplate) => {
    onSelectTemplate(template);
    setIsPreviewOpen(false);
    toast({
      title: "Formulaire sélectionné",
      description: `Le formulaire "${template.name}" a été sélectionné pour utilisation.`,
    });
  };

  const handleExportTemplate = (template: FormTemplate) => {
    // Créer un objet JSON avec les données du formulaire
    const exportData = {
      ...template,
      exportedAt: new Date().toISOString(),
      exportedFor: 'Administration algérienne',
      adaptedFrom: 'Journal officiel joradp.dz'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `formulaire_${template.name.replace(/\s+/g, '_').toLowerCase()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Formulaire exporté",
      description: `Le formulaire "${template.name}" a été exporté avec succès.`,
    });
  };

  const handleAddToLegalTexts = (template: FormTemplate) => {
    if (onAddToLegalTexts) {
      onAddToLegalTexts(template);
      toast({
        title: "Ajouté aux textes juridiques",
        description: `Le formulaire "${template.name}" a été ajouté au catalogue des textes juridiques.`,
      });
    }
  };

  const handleAddToProcedures = (template: FormTemplate) => {
    if (onAddToProcedures) {
      onAddToProcedures(template);
      toast({
        title: "Ajouté aux procédures",
        description: `Le formulaire "${template.name}" a été ajouté au catalogue des procédures.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher un formulaire..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-64">
            <SelectValue placeholder="Toutes les catégories" />
          </SelectTrigger>
          <SelectContent>
            {predefinedCategories.map(category => (
              <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
            ))}
            {dynamicCategories.length > 0 && <div className="border-t my-2" />}
            {dynamicCategories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Liste des formulaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </div>
                <Badge variant="outline">{template.type}</Badge>
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Catégorie:</span> {template.category}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Champs:</span> {template.fields.length} configurés
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handlePreview(template)}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Aperçu
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.dispatchEvent(new CustomEvent('edit-content', {detail: {contentId: template.id, type: 'template'}}))}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Modifier
                  </Button>
                </div>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-xs"
                    onClick={() => handleAddToLegalTexts(template)}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Textes
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-xs"
                    onClick={() => handleAddToProcedures(template)}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Procédures
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-xs"
                    onClick={() => handleExportTemplate(template)}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </div>
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

      {/* Modal d'aperçu */}
      <FormPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        template={previewTemplate}
        onUseTemplate={handleUseTemplate}
        onExportTemplate={handleExportTemplate}
      />
    </div>
  );
}