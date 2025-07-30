import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, Download, Share2, BookmarkPlus, Edit, Trash2, 
  FileText, Calendar, User, Building, Globe, Search,
  MessageSquare, Flag, Star, CheckCircle, XCircle,
  ArrowUpDown, Filter, MoreHorizontal, Plus
} from 'lucide-react';

// === MODALE DE CONSULTATION DE DOCUMENT ===
interface DocumentViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    title: string;
    type: string;
    content?: string;
    metadata?: any;
  };
}

export function DocumentViewModal({ isOpen, onClose, document }: DocumentViewModalProps) {
  if (!document) {
    return null;
  }
  const [currentView, setCurrentView] = useState<'content' | 'metadata' | 'history'>('content');

  const sampleContent = `JOURNAL OFFICIEL DE LA REPUBLIQUE ALGERIENNE N° ${Math.floor(Math.random() * 100) + 1}

${document.title}

ARTICLE 1er : Le présent décret a pour objet de définir les modalités d'application des dispositions relatives à la modernisation de l'administration algérienne.

ARTICLE 2 : Les services publics algériens doivent mettre en œuvre les mesures de digitalisation conformément aux dispositions du présent texte.

ARTICLE 3 : Les procédures administratives doivent être simplifiées et dématérialisées dans un délai de douze (12) mois à compter de la publication du présent décret.

ARTICLE 4 : Les ministères concernés sont chargés, chacun en ce qui le concerne, de l'exécution du présent décret qui sera publié au Journal officiel de la République algérienne démocratique et populaire.

Fait à Alger, le ${new Date().toLocaleDateString('fr-DZ')}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {document.title}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Contenu</TabsTrigger>
            <TabsTrigger value="metadata">Métadonnées</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="mt-4 space-y-4">
            <div className="flex gap-2 mb-4">
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Télécharger PDF
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
              <Button size="sm" variant="outline">
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Favoris
              </Button>
            </div>
            <div className="border rounded-lg p-4 max-h-96 overflow-y-auto bg-white">
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {document.content || sampleContent}
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="metadata" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Informations générales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Type:</strong> {document.type}</div>
                  <div><strong>ID:</strong> {document.id}</div>
                  <div><strong>Date:</strong> {new Date().toLocaleDateString('fr-DZ')}</div>
                  <div><strong>Statut:</strong> <Badge className="bg-green-100 text-green-800">Publié</Badge></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Classification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Domaine:</strong> Droit administratif</div>
                  <div><strong>Sous-domaine:</strong> Modernisation</div>
                  <div><strong>Mots-clés:</strong> digitalisation, administration</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <div className="space-y-3">
              {[
                { action: 'Publication', date: '2024-01-15', user: 'Système' },
                { action: 'Validation', date: '2024-01-14', user: 'Ahmed Benali' },
                { action: 'Création', date: '2024-01-10', user: 'Fatima Khelil' }
              ].map((event, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div className="flex-1">
                    <div className="font-medium">{event.action}</div>
                    <div className="text-sm text-gray-600">{event.date} par {event.user}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// === MODALE DE TÉLÉCHARGEMENT ===
interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    title: string;
    type: string;
  };
}

export function DownloadModal({ isOpen, onClose, document }: DownloadModalProps) {
  if (!document) {
    return null;
  }
  const [format, setFormat] = useState('pdf');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulation du téléchargement
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDownloading(false);
    onClose();
    
    // Simulation du téléchargement réel
    const link = window.document.createElement('a');
    const blob = new Blob([`Contenu de ${document.title} en format ${format.toUpperCase()}`], { type: 'text/plain' });
    link.href = URL.createObjectURL(blob);
    link.download = `${document.title.replace(/[^a-zA-Z0-9]/g, '_')}.${format}`;
    link.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Télécharger le document
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Document</Label>
            <div className="p-3 border rounded bg-gray-50">
              <div className="font-medium">{document.title}</div>
              <div className="text-sm text-gray-600">{document.type}</div>
            </div>
          </div>
          
          <div>
            <Label>Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="doc">Document Word</SelectItem>
                <SelectItem value="txt">Texte brut</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button onClick={handleDownload} disabled={isDownloading} className="flex-1">
              {isDownloading ? 'Téléchargement...' : 'Télécharger'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// === MODALE DE COMPARAISON SIMPLIFIÉE ===
interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  type: 'versions' | 'searches' | 'documents';
}

export function ComparisonModal({ isOpen, onClose, items, type }: ComparisonModalProps) {
  if (!items || items.length === 0) {
    return null;
  }
  const getTitle = () => {
    switch (type) {
      case 'versions': return 'Comparaison de versions';
      case 'searches': return 'Comparaison de recherches'; 
      case 'documents': return 'Comparaison de documents';
      default: return 'Comparaison';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5" />
            {getTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6 overflow-y-auto">
          {items.slice(0, 2).map((item, index) => (
            <div key={index} className="space-y-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {type === 'versions' ? `Version ${item.version || index + 1}` : item.title || `Élément ${index + 1}`}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div><strong>Date:</strong> {item.date || new Date().toLocaleDateString()}</div>
                    {type === 'versions' && <div><strong>Auteur:</strong> {item.author || 'Système'}</div>}
                    {type === 'versions' && <div><strong>Type:</strong> {item.type || 'Modification'}</div>}
                    {type === 'versions' && <div><strong>Statut:</strong> {item.status || 'En vigueur'}</div>}
                    {type === 'versions' && <div><strong>Institution:</strong> {item.institution || 'Institution'}</div>}
                    {type === 'versions' && item.stepsCount && <div><strong>Étapes:</strong> {item.stepsCount}</div>}
                    {type === 'versions' && item.documentsCount && <div><strong>Documents:</strong> {item.documentsCount}</div>}
                    {type === 'searches' && <div><strong>Résultats:</strong> {item.results || Math.floor(Math.random() * 100)}</div>}
                    <div><strong>Taille:</strong> {Math.floor(Math.random() * 50) + 10} KB</div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="border rounded-lg p-4 max-h-64 overflow-y-auto bg-gray-50">
                <div className="text-sm font-mono">
                  {type === 'versions' && (
                    <div>
                      <strong>📄 {item.textName || item.procedureName || 'Document juridique'} - {item.version || `v${index + 1}`}</strong>
                      <br /><br />
                      <strong>Modifications apportées:</strong><br />
                      {item.changes || 'Aucun détail de modification fourni.'}
                      <br /><br />
                      {index === 1 && <span className="text-red-600 font-bold">[DIFFÉRENCE] </span>}
                      {item.journalNumber ? (
                        `Publié au Journal Officiel ${item.journalNumber}, page ${item.pageNumber || 'XX-XX'}.`
                      ) : (
                        `Procédure validée par ${item.validatedBy || 'l\'administration'}.`
                      )}
                      {item.comments && (
                        <>
                          <br /><br />
                          <strong>Commentaires:</strong> {item.comments}
                        </>
                      )}
                    </div>
                  )}
                  {type === 'searches' && `Recherche: "${item.query || 'terme de recherche'}"...`}
                  {type === 'documents' && `Contenu du document ${item.title}...`}
                  {type !== 'versions' && (
                    <>
                      <br /><br />
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      {index === 1 && ' [DIFFÉRENCE] Ut enim ad minim veniam, quis nostrud exercitation.'}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-4">
          <Button onClick={onClose}>Fermer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Hook simplifié pour gérer les modales
export function useFunctionalModals() {
  const [modals, setModals] = useState({
    documentView: { isOpen: false, document: null },
    download: { isOpen: false, document: null },
    comparison: { isOpen: false, items: [], type: 'versions' as 'versions' | 'searches' | 'documents' }
  });

  const openDocumentView = (document: any) => {
    setModals(prev => ({
      ...prev,
      documentView: { isOpen: true, document }
    }));
  };

  const openDownload = (document: any) => {
    setModals(prev => ({
      ...prev,
      download: { isOpen: true, document }
    }));
  };

  const openComparison = (items: any[], type: 'versions' | 'searches' | 'documents') => {
    setModals(prev => ({
      ...prev,
      comparison: { isOpen: true, items, type }
    }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals(prev => ({
      ...prev,
      [modalName]: { ...prev[modalName], isOpen: false }
    }));
  };

  return {
    modals,
    openDocumentView,
    openDownload,
    openComparison,
    closeModal
  };
}