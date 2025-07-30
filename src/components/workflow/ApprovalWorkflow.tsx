// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Calendar,
  FileText,
  MessageSquare,
  Send,
  Eye,
  Edit,
  Archive,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApprovalWorkflowProps {
  formData: Record<string, unknown>;
  extractionMetadata?: {
    confidence: number;
    extractionDate: string;
    fileName: string;
    unmappedData: string[];
    suggestions: Record<string, unknown>[];
  };
  onApprove?: (data: Record<string, unknown>) => void;
  onReject?: (reason: string) => void;
  onRequestChanges?: (changes: string) => void;
}

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  assignee?: string;
  completedAt?: Date;
  comments?: WorkflowComment[];
}

interface WorkflowComment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  type: 'comment' | 'validation' | 'change_request';
}

export function ApprovalWorkflow({ 
  formData, 
  extractionMetadata, 
  onApprove, 
  onReject, 
  onRequestChanges 
}: ApprovalWorkflowProps) {
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [comment, setComment] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [workflowHistory, setWorkflowHistory] = useState<WorkflowComment[]>([]);
  
  const [workflowSteps] = useState<WorkflowStep[]>([
    {
      id: 'extraction_review',
      name: 'Révision de l\'extraction',
      description: 'Vérification de la qualité des données extraites par OCR',
      status: 'in-progress',
      assignee: 'Système OCR'
    },
    {
      id: 'data_validation',
      name: 'Validation des données',
      description: 'Contrôle de la conformité et de la complétude des informations',
      status: 'pending',
      assignee: 'Validateur'
    },
    {
      id: 'legal_review',
      name: 'Révision juridique',
      description: 'Vérification de la conformité juridique et réglementaire',
      status: 'pending',
      assignee: 'Expert Juridique'
    },
    {
      id: 'final_approval',
      name: 'Approbation finale',
      description: 'Validation finale et publication dans le système',
      status: 'pending',
      assignee: 'Superviseur'
    }
  ]);

  useEffect(() => {
    // Validation automatique des données extraites
    validateExtractedData();
  }, [formData]);

  const validateExtractedData = () => {
    const errors: string[] = [];
    
    // Validation des champs obligatoires
    const requiredFields = ['title', 'type', 'institution', 'content'];
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        errors.push(`Le champ "${field}" est obligatoire`);
      }
    });

    // Validation de la confiance d'extraction
    if (extractionMetadata && extractionMetadata.confidence < 0.7) {
      errors.push(`Confiance d'extraction faible (${Math.round(extractionMetadata.confidence * 100)}%)`);
    }

    // Validation des données non mappées
    if (extractionMetadata && extractionMetadata.unmappedData.length > 5) {
      errors.push(`${extractionMetadata.unmappedData.length} éléments non mappés détectés`);
    }

    // Validation spécifique aux textes juridiques algériens
    if (formData.type && !['Loi', 'Décret exécutif', 'Décret présidentiel', 'Ordonnance'].includes(formData.type)) {
      if (formData.type.length < 3) {
        errors.push('Type de document juridique non reconnu ou invalide');
      }
    }

    // Validation des dates
    if (formData.datePublication) {
      const pubDate = new Date(formData.datePublication);
      const currentDate = new Date();
      if (pubDate > currentDate) {
        errors.push('La date de publication ne peut pas être dans le futur');
      }
    }

    setValidationErrors(errors);

    // Auto-progression si pas d'erreurs critiques
    if (errors.length === 0) {
      setCurrentStep(1);
      addWorkflowComment({
        author: 'Système',
        content: '✅ Extraction validée automatiquement - Aucune erreur critique détectée',
        type: 'validation'
      });
    } else {
      addWorkflowComment({
        author: 'Système',
        content: `⚠️ ${errors.length} problème(s) détecté(s) lors de la validation automatique`,
        type: 'validation'
      });
    }
  };

  const addWorkflowComment = (comment: Omit<WorkflowComment, 'id' | 'timestamp'>) => {
    const newComment: WorkflowComment = {
      ...comment,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setWorkflowHistory(prev => [...prev, newComment]);
  };

  const handleApprove = () => {
    addWorkflowComment({
      author: 'Utilisateur',
      content: comment || 'Document approuvé pour publication',
      type: 'validation'
    });

    // Finaliser le workflow
    const finalData = {
      ...formData,
      workflowStatus: 'approved',
      approvedAt: new Date().toISOString(),
      workflowHistory,
      extractionMetadata
    };

    if (onApprove) {
      onApprove(finalData);
    }

    toast({
      title: "✅ Document approuvé",
      description: "Le document a été validé et enregistré dans le système",
    });
  };

  const handleReject = () => {
    if (!comment.trim()) {
      toast({
        title: "Commentaire requis",
        description: "Veuillez fournir une raison pour le rejet",
        variant: "destructive"
      });
      return;
    }

    addWorkflowComment({
      author: 'Utilisateur',
      content: comment,
      type: 'change_request'
    });

    if (onReject) {
      onReject(comment);
    }

    toast({
      title: "❌ Document rejeté",
      description: "Le document a été rejeté avec commentaires",
      variant: "destructive"
    });
  };

  const handleRequestChanges = () => {
    if (!comment.trim()) {
      toast({
        title: "Commentaire requis",
        description: "Veuillez spécifier les modifications demandées",
        variant: "destructive"
      });
      return;
    }

    addWorkflowComment({
      author: 'Utilisateur',
      content: comment,
      type: 'change_request'
    });

    if (onRequestChanges) {
      onRequestChanges(comment);
    }

    toast({
      title: "🔄 Modifications demandées",
      description: "Les modifications ont été demandées",
    });
  };

  const getStepIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="w-6 h-6 text-purple-600" />
            Fil d'Approbation - Document Juridique
          </CardTitle>
          <p className="text-sm text-gray-600">
            Workflow de validation et d'approbation pour les textes juridiques extraits
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="workflow" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="workflow">
                <Archive className="w-4 h-4 mr-2" />
                Workflow
              </TabsTrigger>
              <TabsTrigger value="validation">
                <CheckCircle className="w-4 h-4 mr-2" />
                Validation
              </TabsTrigger>
              <TabsTrigger value="preview">
                <Eye className="w-4 h-4 mr-2" />
                Aperçu
              </TabsTrigger>
              <TabsTrigger value="history">
                <MessageSquare className="w-4 h-4 mr-2" />
                Historique
              </TabsTrigger>
            </TabsList>

            <TabsContent value="workflow" className="space-y-6">
              {/* Métadonnées d'extraction */}
              {extractionMetadata && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-3">📊 Informations d'Extraction</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-blue-600 font-medium">Fichier:</span>
                      <p className="text-gray-700">{extractionMetadata.fileName}</p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Confiance:</span>
                      <p className={`font-medium ${getConfidenceColor(extractionMetadata.confidence)}`}>
                        {Math.round(extractionMetadata.confidence * 100)}%
                      </p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Date:</span>
                      <p className="text-gray-700">
                        {new Date(extractionMetadata.extractionDate).toLocaleDateString('fr-DZ')}
                      </p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Non mappés:</span>
                      <p className="text-gray-700">{extractionMetadata.unmappedData.length} éléments</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Étapes du workflow */}
              <div className="space-y-4">
                <h3 className="font-semibold">Étapes de Validation</h3>
                {workflowSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    {getStepIcon(step.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{step.name}</h4>
                        <div className="flex items-center gap-2">
                          {step.assignee && (
                            <Badge variant="outline" className="text-xs">
                              <User className="w-3 h-3 mr-1" />
                              {step.assignee}
                            </Badge>
                          )}
                          <Badge 
                            variant={step.status === 'completed' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {step.status === 'completed' ? 'Terminé' : 
                             step.status === 'in-progress' ? 'En cours' :
                             step.status === 'rejected' ? 'Rejeté' : 'En attente'}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      {step.completedAt && (
                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Complété le {step.completedAt.toLocaleDateString('fr-DZ')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Zone de commentaire et actions */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Actions de Validation</h4>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Ajoutez un commentaire ou des instructions..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={handleApprove}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={validationErrors.length > 0}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approuver
                    </Button>
                    
                    <Button
                      onClick={handleRequestChanges}
                      variant="outline"
                      className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Demander des Modifications
                    </Button>
                    
                    <Button
                      onClick={handleReject}
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rejeter
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="validation" className="space-y-4">
              <h3 className="font-semibold">Résultats de Validation</h3>
              
              {validationErrors.length > 0 ? (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-medium">Erreurs de validation détectées :</p>
                      <ul className="list-disc list-inside space-y-1">
                        {validationErrors.map((error, index) => (
                          <li key={index} className="text-sm">{error}</li>
                        ))}
                      </ul>
                    </div>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    ✅ Toutes les validations sont passées avec succès
                  </AlertDescription>
                </Alert>
              )}

              {/* Suggestions d'amélioration */}
              {extractionMetadata?.suggestions && extractionMetadata.suggestions.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-medium text-amber-800 mb-2">💡 Suggestions d'Amélioration</h4>
                  <div className="space-y-2">
                    {extractionMetadata.suggestions.map((suggestion, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{suggestion.fieldName}:</span>
                        <span className="text-amber-700 ml-2">{suggestion.reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <h3 className="font-semibold">Aperçu du Document</h3>
              
              <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
                {Object.entries(formData)
                  .filter(([key]) => !key.startsWith('_'))
                  .map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 pb-2 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-sm text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <div className="text-sm text-gray-800 max-w-md text-right">
                          {typeof value === 'string' && value.length > 100 
                            ? value.substring(0, 100) + '...'
                            : String(value)
                          }
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <h3 className="font-semibold">Historique des Commentaires</h3>
              
              {workflowHistory.length > 0 ? (
                <div className="space-y-3">
                  {workflowHistory.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-sm">{item.author}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.type === 'validation' ? 'Validation' :
                             item.type === 'change_request' ? 'Modification' : 'Commentaire'}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-500">
                          {item.timestamp.toLocaleDateString('fr-DZ')} à {item.timestamp.toLocaleTimeString('fr-DZ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{item.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Aucun commentaire pour le moment</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}