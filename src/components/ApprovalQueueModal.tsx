import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Clock, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

interface PendingItem {
  id: string;
  type: 'legal-text' | 'procedure';
  title: string;
  submittedBy: string;
  submittedDate: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  data: Record<string, unknown>;
}

interface ApprovalQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApproveItem: (item: PendingItem, comment?: string) => void;
  onRejectItem: (item: PendingItem, reason: string) => void;
  onViewItem: (item: PendingItem) => void;
  filterType?: 'all' | 'legal-text' | 'procedure';
}

export function ApprovalQueueModal({ 
  isOpen, 
  onClose, 
  onApproveItem, 
  onRejectItem, 
  onViewItem,
  filterType = 'all'
}: ApprovalQueueModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Données de démonstration - à remplacer par de vraies données
  const [pendingItems] = useState<PendingItem[]>([
    {
      id: '1',
      type: 'legal-text',
      title: 'Décret exécutif relatif à la protection de l\'environnement',
      submittedBy: 'Dr. Ahmed Benali',
      submittedDate: '2024-01-15',
      priority: 'high',
      category: 'Environnement',
      data: { textType: 'Décret exécutif', sector: 'Environnement' }
    },
    {
      id: '2',
      type: 'procedure',
      title: 'Procédure d\'obtention du permis de construire',
      submittedBy: 'Mme. Fatima Khedim',
      submittedDate: '2024-01-14',
      priority: 'medium',
      category: 'Urbanisme',
      data: { category: 'Urbanisme', institution: 'Ministère de l\'Habitat' }
    },
    {
      id: '3',
      type: 'legal-text',
      title: 'Loi de finances complémentaire 2024',
      submittedBy: 'M. Karim Mahdjoub',
      submittedDate: '2024-01-13',
      priority: 'high',
      category: 'Finance',
      data: { textType: 'Loi', sector: 'Finance' }
    }
  ]);

  const filteredItems = pendingItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    const matchesType = filterType === 'all' || item.type === filterType;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesType;
  });

  const legalTexts = filteredItems.filter(item => item.type === 'legal-text');
  const procedures = filteredItems.filter(item => item.type === 'procedure');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const ItemCard = ({ item }: { item: PendingItem }) => (
    <Card key={item.id} className="border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Soumis par {item.submittedBy}</span>
              <span>•</span>
              <span>{new Date(item.submittedDate).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Badge variant="outline" className={getPriorityColor(item.priority)}>
              {item.priority === 'high' ? 'Urgent' : item.priority === 'medium' ? 'Normal' : 'Faible'}
            </Badge>
            <Badge variant="secondary">{item.category}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button
            onClick={() => onViewItem(item)}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <FileText className="w-4 h-4" />
            Examiner
          </Button>
          <Button
            onClick={() => onApproveItem(item)}
            size="sm"
            className="bg-green-600 hover:bg-green-700 gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Approuver
          </Button>
          <Button
            onClick={() => onRejectItem(item, 'Motif à préciser')}
            variant="destructive"
            size="sm"
            className="gap-2"
          >
            <XCircle className="w-4 h-4" />
            Rejeter
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            {filterType === 'legal-text' ? 'File d\'attente d\'approbation - Textes Juridiques' :
             filterType === 'procedure' ? 'File d\'attente d\'approbation - Procédures Administratives' :
             'File d\'attente d\'approbation'}
            <Badge variant="secondary">{filteredItems.length} éléments en attente</Badge>
          </DialogTitle>
          <DialogDescription>
            Gérez les documents en attente d'approbation avant leur publication dans la base de données.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Filtres */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par titre ou auteur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="Environnement">Environnement</SelectItem>
                    <SelectItem value="Urbanisme">Urbanisme</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Justice">Justice</SelectItem>
                    <SelectItem value="Santé">Santé</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les priorités</SelectItem>
                    <SelectItem value="high">Urgent</SelectItem>
                    <SelectItem value="medium">Normal</SelectItem>
                    <SelectItem value="low">Faible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Onglets pour séparer les types - seulement si pas de filtre spécifique */}
          {filterType === 'all' ? (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">
                  Tout ({filteredItems.length})
                </TabsTrigger>
                <TabsTrigger value="legal-texts">
                  Textes juridiques ({legalTexts.length})
                </TabsTrigger>
                <TabsTrigger value="procedures">
                  Procédures ({procedures.length})
                </TabsTrigger>
              </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-6">
              {filteredItems.length === 0 ? (
                <Card>
                  <CardContent className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Aucun élément en attente</h3>
                      <p className="text-muted-foreground">La file d'attente d'approbation est vide.</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredItems.map(item => <ItemCard key={item.id} item={item} />)
              )}
            </TabsContent>
            
            <TabsContent value="legal-texts" className="space-y-4 mt-6">
              {legalTexts.length === 0 ? (
                <Card>
                  <CardContent className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Aucun texte juridique en attente</h3>
                      <p className="text-muted-foreground">Tous les textes juridiques ont été traités.</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                legalTexts.map(item => <ItemCard key={item.id} item={item} />)
              )}
            </TabsContent>
            
            <TabsContent value="procedures" className="space-y-4 mt-6">
              {procedures.length === 0 ? (
                <Card>
                  <CardContent className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Aucune procédure en attente</h3>
                      <p className="text-muted-foreground">Toutes les procédures ont été traitées.</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                procedures.map(item => <ItemCard key={item.id} item={item} />)
              )}
            </TabsContent>
          </Tabs>
          ) : (
            // Affichage direct des éléments filtrés
            <div className="space-y-4 mt-6">
              {filteredItems.length === 0 ? (
                <Card>
                  <CardContent className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Aucun élément en attente</h3>
                      <p className="text-muted-foreground">
                        {filterType === 'legal-text' ? 'Aucun texte juridique en attente.' : 'Aucune procédure en attente.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredItems.map(item => <ItemCard key={item.id} item={item} />)
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
