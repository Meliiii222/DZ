import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Save, 
  Download, 
  Share2, 
  MessageCircle, 
  Clock,
  FileText,
  Edit,
  Eye,
  Settings
} from 'lucide-react';

interface CollaborativeEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'editing' | 'offline';
  lastActive: string;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  position?: { line: number; character: number };
}

export function CollaborativeEditorModal({ isOpen, onClose }: CollaborativeEditorModalProps) {
  const [documentTitle, setDocumentTitle] = useState('Document collaboratif sans titre');
  const [documentContent, setDocumentContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('editor');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  const collaborators: Collaborator[] = [
    {
      id: '1',
      name: 'Marie Dupont',
      avatar: 'MD',
      status: 'editing',
      lastActive: 'maintenant'
    },
    {
      id: '2', 
      name: 'Jean Martin',
      avatar: 'JM',
      status: 'online',
      lastActive: 'il y a 2 min'
    },
    {
      id: '3',
      name: 'Sophie Blanc',
      avatar: 'SB', 
      status: 'offline',
      lastActive: 'il y a 1 heure'
    }
  ];

  // Simulation de l'auto-sauvegarde
  useEffect(() => {
    if (documentContent || documentTitle !== 'Document collaboratif sans titre') {
      setSaveStatus('unsaved');
      const timer = setTimeout(() => {
        setSaveStatus('saving');
        setTimeout(() => setSaveStatus('saved'), 1000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [documentContent, documentTitle]);

  const handleSave = () => {
    setSaveStatus('saving');
    // Simulation de sauvegarde
    setTimeout(() => {
      setSaveStatus('saved');
      const blob = new Blob([`${documentTitle}\n\n${documentContent}`], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${documentTitle.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'Utilisateur actuel',
        text: newComment,
        timestamp: new Date().toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleShare = () => {
    const shareLink = `${window.location.origin}/collaborative-doc/${Date.now()}`;
    navigator.clipboard.writeText(shareLink);
    alert('Lien de partage copié dans le presse-papiers !');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'editing': return 'bg-green-500';
      case 'online': return 'bg-blue-500'; 
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saved': return 'Sauvegardé';
      case 'saving': return 'Sauvegarde...';
      case 'unsaved': return 'Non sauvegardé';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Éditeur collaboratif
            </DialogTitle>
            <div className="flex items-center gap-2 text-sm">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                saveStatus === 'saved' ? 'bg-green-100 text-green-800' : 
                saveStatus === 'saving' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {getSaveStatusText()}
              </span>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4 h-[70vh]">
          {/* Zone principale d'édition */}
          <div className="col-span-3 flex flex-col">
            {/* Barre d'outils */}
            <div className="flex items-center justify-between p-3 border-b bg-gray-50">
              <Input
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                className="text-lg font-semibold border-none bg-transparent"
                placeholder="Titre du document"
              />
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </div>

            {/* Zone d'édition */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="editor" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Éditeur
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Aperçu
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="flex-1 mt-2">
                <Textarea
                  value={documentContent}
                  onChange={(e) => setDocumentContent(e.target.value)}
                  placeholder="Commencez à écrire votre document collaboratif..."
                  className="w-full h-full resize-none border-none focus:ring-0 text-base leading-relaxed"
                />
              </TabsContent>

              <TabsContent value="preview" className="flex-1 mt-2">
                <div className="h-full overflow-y-auto p-4 border rounded-lg bg-white">
                  <h1 className="text-2xl font-bold mb-4">{documentTitle}</h1>
                  <div className="prose max-w-none">
                    {documentContent.split('\n').map((line, index) => (
                      <p key={index} className="mb-2">{line || <br />}</p>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Panneau latéral */}
          <div className="flex flex-col space-y-4">
            {/* Collaborateurs */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4" />
                  Collaborateurs ({collaborators.length})
                </h3>
                <div className="space-y-3">
                  {collaborators.map((collaborator) => (
                    <div key={collaborator.id} className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-8 h-8 bg-blue-500 text-white text-xs">
                          {collaborator.avatar}
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(collaborator.status)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{collaborator.name}</p>
                        <p className="text-xs text-gray-500">{collaborator.lastActive}</p>
                      </div>
                      <Badge variant={collaborator.status === 'editing' ? 'default' : 'secondary'} className="text-xs">
                        {collaborator.status === 'editing' ? 'Édite' : 
                         collaborator.status === 'online' ? 'En ligne' : 'Hors ligne'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Commentaires */}
            <Card className="flex-1">
              <CardContent className="p-4 h-full flex flex-col">
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                  <MessageCircle className="w-4 h-4" />
                  Commentaires ({comments.length})
                </h3>
                
                <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                  {comments.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Aucun commentaire pour le moment
                    </p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{comment.author}</span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-2">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    className="resize-none text-sm"
                    rows={3}
                  />
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    Ajouter commentaire
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}