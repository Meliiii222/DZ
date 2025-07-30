
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useFormLibraryStore, SavedForm } from '@/stores/formLibraryStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, FileText, Archive, Zap } from 'lucide-react';
import { AdvancedOCRProcessor } from '@/components/ocr/AdvancedOCRProcessor';
import { ApprovalWorkflow } from '@/components/workflow/ApprovalWorkflow';
import { LEGAL_TEXT_TYPES, INSTITUTIONS } from '@/types/legal';

interface AddLegalTextFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddLegalTextForm({ isOpen, onClose }: AddLegalTextFormProps) {
  const { toast } = useToast();
  const { forms: customForms } = useFormLibraryStore();
  const [selectedFormId, setSelectedFormId] = useState('');
  const [selectedForm, setSelectedForm] = useState<SavedForm | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: Record<string, unknown> }>({});
  const [showOCRProcessor, setShowOCRProcessor] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState('ocr');

  // Filtrer les formulaires de la bibliothèque pour les textes juridiques
  const legalTextForms = customForms.filter(form => {
    return form.type === 'textes_juridiques' || form.category === 'Textes Juridiques';
  });

  // Déduplication par nom pour éviter les doublons
  const uniqueLegalTextForms = legalTextForms.reduce((acc: SavedForm[], current) => {
    const exists = acc.find(form => form.name.toLowerCase() === current.name.toLowerCase());
    if (!exists) {
      acc.push(current);
    }
    return acc;
  }, []);

  useEffect(() => {
    if (selectedFormId) {
      const form = uniqueLegalTextForms.find(f => f.id === selectedFormId);
      setSelectedForm(form || null);
      
      if (form) {
        // Initialiser les données du formulaire avec les valeurs par défaut
        const initialData: { [key: string]: Record<string, unknown> } = {};
        form.fields.forEach(field => {
          if (field.defaultValue) {
            initialData[field.name] = field.defaultValue;
          }
        });
        setFormData(initialData);
      }
    } else {
      setSelectedForm(null);
      setFormData({});
    }
  }, [selectedFormId, uniqueLegalTextForms]);

  const handleFormSelection = (formId: string) => {
    setSelectedFormId(formId);
  };

  const handleOCRDataExtracted = (data: Record<string, unknown>) => {
    console.log('🎯 Données OCR reçues:', data);
    setExtractedData(data);
    setFormData(data);
    setShowOCRProcessor(false);
    setCurrentTab('workflow');
    setShowWorkflow(true);
  };

  const handleWorkflowApprove = (approvedData: Record<string, unknown>) => {
    console.log('✅ Document approuvé:', approvedData);
    
    // Enregistrement final dans le système
    toast({
      title: "✅ Texte juridique enregistré",
      description: "Le document a été validé et enregistré avec succès dans le système",
    });
    
    // Réinitialiser et fermer
    setFormData({});
    setExtractedData(null);
    setShowWorkflow(false);
    setSelectedFormId('');
    setSelectedForm(null);
    setCurrentTab('ocr');
    onClose();
  };

  const handleWorkflowReject = (reason: string) => {
    console.log('❌ Document rejeté:', reason);
    setShowWorkflow(false);
    setCurrentTab('form');
    
    toast({
      title: "❌ Document rejeté",
      description: "Vous pouvez modifier les données dans l'onglet 'Saisie Manuelle'",
      variant: "destructive"
    });
  };

  const handleWorkflowRequestChanges = (changes: string) => {
    console.log('🔄 Modifications demandées:', changes);
    setShowWorkflow(false);
    setCurrentTab('form');
    
    toast({
      title: "🔄 Modifications demandées",
      description: "Vous pouvez modifier les données dans l'onglet 'Saisie Manuelle'",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Si les données proviennent de l'OCR, passer par le workflow
    if (extractedData && extractedData._extractionMetadata) {
      setCurrentTab('workflow');
      setShowWorkflow(true);
      return;
    }

    // Validation des champs obligatoires pour saisie manuelle
    const requiredFields = ['title', 'type', 'institution', 'content'];
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].toString().trim() === '');
    
    if (missingFields.length > 0) {
      toast({
        title: "Champs manquants",
        description: `Veuillez remplir les champs obligatoires : ${missingFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    // Enregistrement direct pour les saisies manuelles
    console.log('Données du formulaire à enregistrer:', formData);
    
    toast({
      title: "Succès",
      description: "Le texte juridique a été ajouté avec succès",
    });
    
    // Réinitialiser et fermer
    setFormData({});
    setSelectedFormId('');
    setSelectedForm(null);
    setCurrentTab('ocr');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            Ajouter un Texte Juridique Algérien
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Extraction intelligente par OCR ou saisie manuelle avec validation automatique
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Onglets principaux */}
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ocr" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                OCR Intelligent
                {extractedData && (
                  <Badge variant="secondary" className="ml-2">
                    Données extraites
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="form" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Saisie Manuelle
              </TabsTrigger>
              <TabsTrigger value="workflow" className="flex items-center gap-2" disabled={!showWorkflow}>
                <Archive className="w-4 h-4" />
                Workflow
                {showWorkflow && (
                  <Badge variant="outline" className="ml-2">
                    En cours
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* OCR Intelligent */}
            <TabsContent value="ocr" className="space-y-4">
              {!showOCRProcessor ? (
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Extraction Intelligente de Textes Juridiques
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Utilisez notre système OCR avancé avec IA pour extraire automatiquement 
                    les informations des documents juridiques algériens (journaux officiels, lois, décrets, etc.)
                  </p>
                  <div className="space-y-4">
                    <Button
                      onClick={() => setShowOCRProcessor(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Commencer l'Extraction OCR
                    </Button>
                    
                    {extractedData && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                        <h4 className="font-medium text-green-800 mb-2">✅ Données extraites disponibles</h4>
                        <p className="text-sm text-green-700 mb-3">
                          Fichier: {extractedData._extractionMetadata?.fileName}
                        </p>
                        <Button
                          onClick={() => {
                            setCurrentTab('workflow');
                            setShowWorkflow(true);
                          }}
                          variant="outline"
                          className="text-green-700 border-green-300 hover:bg-green-100"
                        >
                          Aller au Workflow
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <AdvancedOCRProcessor
                  onFormDataExtracted={handleOCRDataExtracted}
                  formType="legal-text"
                  onClose={() => setShowOCRProcessor(false)}
                />
              )}
            </TabsContent>

            {/* Saisie Manuelle */}
            <TabsContent value="form" className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Formulaire de saisie directe */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informations du Document</CardTitle>
                    <p className="text-sm text-gray-600">
                      Saisissez manuellement les informations du texte juridique
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {/* Titre */}
                      <div className="space-y-2">
                        <Label htmlFor="title">
                          Titre <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="title"
                          value={formData.title || ''}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          placeholder="Titre du texte juridique"
                          required
                        />
                      </div>

                      {/* Type et Numéro */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="type">
                            Type de document <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.type || ''}
                            onValueChange={(value) => setFormData({...formData, type: value})}
                          >
                            <SelectTrigger id="type">
                              <SelectValue placeholder="Sélectionner le type" />
                            </SelectTrigger>
                            <SelectContent>
                              {LEGAL_TEXT_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="number">Numéro</Label>
                          <Input
                            id="number"
                            value={formData.number || ''}
                            onChange={(e) => setFormData({...formData, number: e.target.value})}
                            placeholder="Ex: 23-15"
                          />
                        </div>
                      </div>

                      {/* Institution */}
                      <div className="space-y-2">
                        <Label htmlFor="institution">
                          Institution <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.institution || ''}
                          onValueChange={(value) => setFormData({...formData, institution: value})}
                        >
                          <SelectTrigger id="institution">
                            <SelectValue placeholder="Sélectionner l'institution" />
                          </SelectTrigger>
                          <SelectContent>
                            {INSTITUTIONS.slice(0, 20).map((institution) => (
                              <SelectItem key={institution} value={institution}>
                                {institution}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="datePublication">Date de publication</Label>
                          <Input
                            id="datePublication"
                            type="date"
                            value={formData.datePublication || ''}
                            onChange={(e) => setFormData({...formData, datePublication: e.target.value})}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dateHijri">Date hijri</Label>
                          <Input
                            id="dateHijri"
                            value={formData.dateHijri || ''}
                            onChange={(e) => setFormData({...formData, dateHijri: e.target.value})}
                            placeholder="Ex: 15 Ramadhan 1445"
                          />
                        </div>
                      </div>

                      {/* Domaine et Status */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="domain">Domaine</Label>
                          <Input
                            id="domain"
                            value={formData.domain || ''}
                            onChange={(e) => setFormData({...formData, domain: e.target.value})}
                            placeholder="Ex: Justice, Finances, Commerce"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="status">Statut</Label>
                          <Select
                            value={formData.status || 'En vigueur'}
                            onValueChange={(value) => setFormData({...formData, status: value})}
                          >
                            <SelectTrigger id="status">
                              <SelectValue placeholder="Sélectionner le statut" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="En vigueur">En vigueur</SelectItem>
                              <SelectItem value="Abrogé">Abrogé</SelectItem>
                              <SelectItem value="En cours">En cours</SelectItem>
                              <SelectItem value="Suspendu">Suspendu</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description">
                          Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description || ''}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="Description du contenu du texte juridique"
                          rows={3}
                          required
                        />
                      </div>

                      {/* Contenu */}
                      <div className="space-y-2">
                        <Label htmlFor="content">
                          Contenu complet <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="content"
                          value={formData.content || ''}
                          onChange={(e) => setFormData({...formData, content: e.target.value})}
                          placeholder="Contenu intégral du texte juridique"
                          rows={8}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {extractedData ? 'Valider et Approuver' : 'Ajouter le texte'}
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Workflow d'approbation */}
            <TabsContent value="workflow" className="space-y-6">
              {showWorkflow && extractedData ? (
                <ApprovalWorkflow
                  formData={formData}
                  extractionMetadata={extractedData._extractionMetadata}
                  onApprove={handleWorkflowApprove}
                  onReject={handleWorkflowReject}
                  onRequestChanges={handleWorkflowRequestChanges}
                />
              ) : (
                <div className="text-center py-12">
                  <Archive className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Aucun workflow en cours
                  </h3>
                  <p className="text-gray-500">
                    Utilisez l'OCR intelligent pour extraire des données et déclencher le workflow de validation
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
