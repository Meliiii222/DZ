import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Star,
  FileText,
  Calendar,
  User
} from 'lucide-react';

interface FormTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  createdDate: string;
  downloads: number;
  rating: number;
  isStarred: boolean;
}

export function CustomFormLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('templates');

  // Données de démonstration pour les modèles de formulaires
  const formTemplates: FormTemplate[] = [
    {
      id: '1',
      title: 'Contrat de location commerciale',
      description: 'Modèle de contrat de location pour locaux commerciaux',
      category: 'Commerce',
      author: 'Cabinet Martin',
      createdDate: '2024-12-15',
      downloads: 245,
      rating: 4.8,
      isStarred: true
    },
    {
      id: '2',
      title: 'Demande de permis de construire',
      description: 'Formulaire de demande de permis de construire',
      category: 'Urbanisme',
      author: 'Service Urbanisme',
      createdDate: '2024-12-10',
      downloads: 189,
      rating: 4.6,
      isStarred: false
    },
    {
      id: '3',
      title: 'Statuts d\'association',
      description: 'Modèle de statuts pour association loi 1901',
      category: 'Associations',
      author: 'Cabinet Dubois',
      createdDate: '2024-12-08',
      downloads: 156,
      rating: 4.9,
      isStarred: true
    },
    {
      id: '4',
      title: 'Déclaration de TVA',
      description: 'Formulaire de déclaration de TVA trimestrielle',
      category: 'Fiscal',
      author: 'Service Fiscal',
      createdDate: '2024-12-05',
      downloads: 312,
      rating: 4.7,
      isStarred: false
    },
    {
      id: '5',
      title: 'Demande d\'aide sociale',
      description: 'Formulaire de demande d\'aide sociale',
      category: 'Social',
      author: 'Service Social',
      createdDate: '2024-12-03',
      downloads: 98,
      rating: 4.5,
      isStarred: false
    }
  ];

  const categories = ['all', 'Commerce', 'Urbanisme', 'Associations', 'Fiscal', 'Social'];

  const filteredTemplates = formTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (template: FormTemplate) => {
    const fileName = `${template.title.toLowerCase().replace(/\s+/g, '_')}.pdf`;
    const content = `Modèle: ${template.title}\nDescription: ${template.description}\nCatégorie: ${template.category}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleStar = (templateId: string) => {
    console.log('Ajouté aux favoris:', templateId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bibliothèque de Formulaires</h1>
          <p className="text-muted-foreground mt-2">
            Consultez et téléchargez des modèles de formulaires juridiques
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau modèle
        </Button>
      </div>

      {/* Barre de recherche et filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un modèle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Toutes les catégories' : category}
                </option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtres avancés
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Modèles</TabsTrigger>
          <TabsTrigger value="favorites">Favoris</TabsTrigger>
          <TabsTrigger value="recent">Récents</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold truncate">{template.title}</h3>
                        {template.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />}
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{template.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <FileText className="w-4 h-4" />
                          <span className="truncate">{template.category}</span>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <User className="w-4 h-4" />
                          <span className="truncate">{template.author}</span>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Calendar className="w-4 h-4" />
                          <span className="truncate">{template.createdDate}</span>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Download className="w-4 h-4" />
                          <span className="truncate">{template.downloads} téléchargements</span>
                        </div>
                        <Badge variant="secondary" className="flex-shrink-0">
                          ⭐ {template.rating}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 lg:flex-col lg:flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-shrink-0"
                        onClick={() => handleStar(template.id)}
                        title="Ajouter aux favoris"
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-shrink-0"
                        onClick={() => {
                          // Ouvrir l'éditeur de modèle
                          window.dispatchEvent(new CustomEvent('edit-template', {
                            detail: { templateId: template.id, templateTitle: template.title }
                          }));
                        }}
                        title="Modifier le modèle"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="flex-shrink-0"
                        onClick={() => handleDownload(template)}
                        title="Télécharger le modèle"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="favorites" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-full text-center py-8">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Vos favoris</h3>
            <p className="text-gray-600">Les modèles que vous avez marqués comme favoris apparaîtront ici</p>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-full text-center py-8">
            <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Modèles récents</h3>
            <p className="text-gray-600">Vos modèles consultés récemment apparaîtront ici</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}