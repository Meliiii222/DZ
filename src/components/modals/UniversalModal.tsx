import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Download, Upload, FileText, Users, MessageSquare, Settings, 
  BarChart3, Filter, Star, BookOpen, Languages, Eye, Printer,
  Archive, Bell, Calendar, CheckCircle, XCircle, AlertCircle,
  Search, Brain, Bot, Database, Globe, Clock, Target, Zap,
  Play, Mic
} from "lucide-react";
import { ModalData } from "@/utils/modalManager";

interface UniversalModalProps {
  modal: ModalData | null;
  onClose: () => void;
}

export function UniversalModal({ modal, onClose }: UniversalModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  if (!modal) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simuler une action de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (modal.onSave) {
        modal.onSave(formData);
      }
      
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderModalContent = () => {
    switch (modal.type) {
      case 'timeline-export':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Download className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">Exportez votre timeline dans le format souhaité</span>
            </div>
            
            <div className="space-y-3">
              <Label>Format d'export</Label>
              <Select value={formData.format || 'pdf'} onValueChange={(value) => setFormData({...formData, format: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Période</Label>
              <RadioGroup value={formData.period || 'all'} onValueChange={(value) => setFormData({...formData, period: value})}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">Toute la timeline</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="year" id="year" />
                  <Label htmlFor="year">Dernière année</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Période personnalisée</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.period === 'custom' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date de début</Label>
                  <Input type="date" value={formData.startDate || ''} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                </div>
                <div>
                  <Label>Date de fin</Label>
                  <Input type="date" value={formData.endDate || ''} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeDetails"
                checked={formData.includeDetails || false}
                onCheckedChange={(checked) => setFormData({...formData, includeDetails: checked})}
              />
              <Label htmlFor="includeDetails">Inclure les détails complets</Label>
            </div>
          </div>
        );

      case 'advanced-filters':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-gray-600">Configurez des filtres avancés pour {modal.data?.section}</span>
            </div>

            <Tabs defaultValue="criteria" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="criteria">Critères</TabsTrigger>
                <TabsTrigger value="dates">Dates</TabsTrigger>
                <TabsTrigger value="advanced">Avancés</TabsTrigger>
              </TabsList>

              <TabsContent value="criteria" className="space-y-4">
                <div>
                  <Label>Mots-clés</Label>
                  <Input 
                    placeholder="Entrez des mots-clés..."
                    value={formData.keywords || ''}
                    onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>Catégorie</Label>
                  <Select value={formData.category || ''} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="law">Lois</SelectItem>
                      <SelectItem value="decree">Décrets</SelectItem>
                      <SelectItem value="procedure">Procédures</SelectItem>
                      <SelectItem value="jurisprudence">Jurisprudence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Statut</Label>
                  <Select value={formData.status || ''} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="archived">Archivé</SelectItem>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="dates" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date de création (début)</Label>
                    <Input type="date" value={formData.createdFrom || ''} onChange={(e) => setFormData({...formData, createdFrom: e.target.value})} />
                  </div>
                  <div>
                    <Label>Date de création (fin)</Label>
                    <Input type="date" value={formData.createdTo || ''} onChange={(e) => setFormData({...formData, createdTo: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date de modification (début)</Label>
                    <Input type="date" value={formData.modifiedFrom || ''} onChange={(e) => setFormData({...formData, modifiedFrom: e.target.value})} />
                  </div>
                  <div>
                    <Label>Date de modification (fin)</Label>
                    <Input type="date" value={formData.modifiedTo || ''} onChange={(e) => setFormData({...formData, modifiedTo: e.target.value})} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div>
                  <Label>Tri par</Label>
                  <Select value={formData.sortBy || 'date'} onValueChange={(value) => setFormData({...formData, sortBy: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="title">Titre</SelectItem>
                      <SelectItem value="relevance">Pertinence</SelectItem>
                      <SelectItem value="popularity">Popularité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Ordre</Label>
                  <RadioGroup value={formData.sortOrder || 'desc'} onValueChange={(value) => setFormData({...formData, sortOrder: value})}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="desc" id="desc" />
                      <Label htmlFor="desc">Décroissant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="asc" id="asc" />
                      <Label htmlFor="asc">Croissant</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeArchived"
                    checked={formData.includeArchived || false}
                    onCheckedChange={(checked) => setFormData({...formData, includeArchived: checked})}
                  />
                  <Label htmlFor="includeArchived">Inclure les éléments archivés</Label>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'statistics':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">Statistiques détaillées - {modal.data?.section}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Documents totaux</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-gray-500">+12% ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,543</div>
                  <p className="text-xs text-gray-500">+8% ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Utilisateurs actifs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">234</div>
                  <p className="text-xs text-gray-500">+15% ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Téléchargements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,892</div>
                  <p className="text-xs text-gray-500">+22% ce mois</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <Label>Période d'analyse</Label>
              <Select value={formData.period || '30'} onValueChange={(value) => setFormData({...formData, period: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 derniers jours</SelectItem>
                  <SelectItem value="30">30 derniers jours</SelectItem>
                  <SelectItem value="90">3 derniers mois</SelectItem>
                  <SelectItem value="365">Dernière année</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Top 5 des documents les plus consultés</Label>
              <div className="space-y-2">
                {[
                  { title: "Code civil algérien", views: 1245 },
                  { title: "Loi de finances 2024", views: 987 },
                  { title: "Procédures d'état civil", views: 756 },
                  { title: "Règlements commerciaux", views: 654 },
                  { title: "Code pénal", views: 543 }
                ].map((doc, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{doc.title}</span>
                    <Badge variant="secondary">{doc.views}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'knowledge-graph':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-5 w-5 text-indigo-500" />
              <span className="text-sm text-gray-600">Créer un nouveau graphe de connaissances</span>
            </div>

            <div className="space-y-3">
              <Label>Nom du graphe</Label>
              <Input 
                placeholder="Nom du graphe de connaissances..."
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <Label>Description</Label>
              <Textarea 
                placeholder="Description du graphe..."
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <Label>Domaine juridique</Label>
              <Select value={formData.domain || ''} onValueChange={(value) => setFormData({...formData, domain: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un domaine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civil">Droit civil</SelectItem>
                  <SelectItem value="commercial">Droit commercial</SelectItem>
                  <SelectItem value="administrative">Droit administratif</SelectItem>
                  <SelectItem value="penal">Droit pénal</SelectItem>
                  <SelectItem value="international">Droit international</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Sources de données</Label>
              <div className="space-y-2">
                {['Textes juridiques', 'Jurisprudence', 'Doctrine', 'Procédures', 'Nomenclatures'].map((source) => (
                  <div key={source} className="flex items-center space-x-2">
                    <Checkbox 
                      id={source}
                      checked={formData.sources?.includes(source) || false}
                      onCheckedChange={(checked) => {
                        const sources = formData.sources || [];
                        if (checked) {
                          setFormData({...formData, sources: [...sources, source]});
                        } else {
                          setFormData({...formData, sources: sources.filter((s: string) => s !== source)});
                        }
                      }}
                    />
                    <Label htmlFor={source}>{source}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="autoUpdate"
                checked={formData.autoUpdate || false}
                onCheckedChange={(checked) => setFormData({...formData, autoUpdate: checked})}
              />
              <Label htmlFor="autoUpdate">Mise à jour automatique</Label>
            </div>
          </div>
        );

      case 'data-import':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Upload className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-gray-600">Importer des données externes</span>
            </div>

            <div className="space-y-3">
              <Label>Format de données</Label>
              <Select value={formData.format || ''} onValueChange={(value) => setFormData({...formData, format: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="rdf">RDF/OWL</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Source de données</Label>
              <Input 
                type="file"
                accept=".json,.xml,.csv,.rdf,.owl,.xlsx"
                onChange={(e) => setFormData({...formData, file: e.target.files?.[0]})}
              />
            </div>

            <div className="space-y-3">
              <Label>Type de contenu</Label>
              <Select value={formData.contentType || ''} onValueChange={(value) => setFormData({...formData, contentType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de contenu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="legal-texts">Textes juridiques</SelectItem>
                  <SelectItem value="procedures">Procédures</SelectItem>
                  <SelectItem value="jurisprudence">Jurisprudence</SelectItem>
                  <SelectItem value="dictionary">Dictionnaire</SelectItem>
                  <SelectItem value="nomenclature">Nomenclature</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="validateData"
                checked={formData.validateData || true}
                onCheckedChange={(checked) => setFormData({...formData, validateData: checked})}
              />
              <Label htmlFor="validateData">Valider les données avant import</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="backup"
                checked={formData.backup || true}
                onCheckedChange={(checked) => setFormData({...formData, backup: checked})}
              />
              <Label htmlFor="backup">Créer une sauvegarde avant import</Label>
            </div>
          </div>
        );

      case 'ai-analysis':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Bot className="h-5 w-5 text-cyan-500" />
              <span className="text-sm text-gray-600">Analyse automatique par Intelligence Artificielle</span>
            </div>

            <div className="space-y-3">
              <Label>Type d'analyse</Label>
              <Select value={formData.analysisType || ''} onValueChange={(value) => setFormData({...formData, analysisType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir le type d'analyse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semantic">Analyse sémantique</SelectItem>
                  <SelectItem value="classification">Classification automatique</SelectItem>
                  <SelectItem value="extraction">Extraction d'entités</SelectItem>
                  <SelectItem value="similarity">Analyse de similarité</SelectItem>
                  <SelectItem value="summary">Génération de résumés</SelectItem>
                  <SelectItem value="translation">Traduction automatique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Corpus d'analyse</Label>
              <Select value={formData.corpus || ''} onValueChange={(value) => setFormData({...formData, corpus: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le corpus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les documents</SelectItem>
                  <SelectItem value="recent">Documents récents</SelectItem>
                  <SelectItem value="category">Par catégorie</SelectItem>
                  <SelectItem value="custom">Sélection personnalisée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.corpus === 'category' && (
              <div className="space-y-3">
                <Label>Catégorie</Label>
                <Select value={formData.category || ''} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laws">Lois</SelectItem>
                    <SelectItem value="decrees">Décrets</SelectItem>
                    <SelectItem value="procedures">Procédures</SelectItem>
                    <SelectItem value="jurisprudence">Jurisprudence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-3">
              <Label>Modèle IA</Label>
              <Select value={formData.model || 'advanced'} onValueChange={(value) => setFormData({...formData, model: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Modèle de base</SelectItem>
                  <SelectItem value="advanced">Modèle avancé</SelectItem>
                  <SelectItem value="specialized">Modèle juridique spécialisé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="generateReport"
                checked={formData.generateReport || true}
                onCheckedChange={(checked) => setFormData({...formData, generateReport: checked})}
              />
              <Label htmlFor="generateReport">Générer un rapport d'analyse</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="notifyCompletion"
                checked={formData.notifyCompletion || true}
                onCheckedChange={(checked) => setFormData({...formData, notifyCompletion: checked})}
              />
              <Label htmlFor="notifyCompletion">Notifier à la fin de l'analyse</Label>
            </div>
          </div>
        );

      case 'forum-reply':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">Répondre à: {modal.data?.topicTitle}</span>
            </div>

            <div className="space-y-3">
              <Label>Votre réponse</Label>
              <Textarea 
                placeholder="Rédigez votre réponse..."
                className="min-h-[120px]"
                value={formData.message || ''}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <Label>Type de contribution</Label>
              <Select value={formData.contributionType || 'response'} onValueChange={(value) => setFormData({...formData, contributionType: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="response">Réponse</SelectItem>
                  <SelectItem value="question">Question complémentaire</SelectItem>
                  <SelectItem value="expert">Avis d'expert</SelectItem>
                  <SelectItem value="reference">Référence juridique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="notifyResponses"
                checked={formData.notifyResponses || false}
                onCheckedChange={(checked) => setFormData({...formData, notifyResponses: checked})}
              />
              <Label htmlFor="notifyResponses">M'alerter des nouvelles réponses</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="attachReference"
                checked={formData.attachReference || false}
                onCheckedChange={(checked) => setFormData({...formData, attachReference: checked})}
              />
              <Label htmlFor="attachReference">Joindre une référence juridique</Label>
            </div>

            {formData.attachReference && (
              <div className="space-y-3">
                <Label>Référence</Label>
                <Input 
                  placeholder="Loi, article, décret..."
                  value={formData.reference || ''}
                  onChange={(e) => setFormData({...formData, reference: e.target.value})}
                />
              </div>
            )}
          </div>
        );

      case 'newsletter':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-gray-600">Abonnement à la newsletter juridique</span>
            </div>

            <div className="space-y-3">
              <Label>Adresse email</Label>
              <Input 
                type="email"
                placeholder="votre.email@example.com"
                value={formData.email || ''}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <Label>Fréquence</Label>
              <Select value={formData.frequency || 'weekly'} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Quotidienne</SelectItem>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  <SelectItem value="monthly">Mensuelle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Domaines d'intérêt</Label>
              <div className="space-y-2">
                {['Droit civil', 'Droit commercial', 'Droit administratif', 'Droit pénal', 'Actualités juridiques'].map((domain) => (
                  <div key={domain} className="flex items-center space-x-2">
                    <Checkbox 
                      id={domain}
                      checked={formData.interests?.includes(domain) || false}
                      onCheckedChange={(checked) => {
                        const interests = formData.interests || [];
                        if (checked) {
                          setFormData({...formData, interests: [...interests, domain]});
                        } else {
                          setFormData({...formData, interests: interests.filter((i: string) => i !== domain)});
                        }
                      }}
                    />
                    <Label htmlFor={domain}>{domain}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="acceptTerms"
                checked={formData.acceptTerms || false}
                onCheckedChange={(checked) => setFormData({...formData, acceptTerms: checked})}
              />
              <Label htmlFor="acceptTerms">J'accepte les conditions d'utilisation</Label>
            </div>
          </div>
        );

      case 'legal-quiz':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">Quiz juridique interactif</span>
            </div>

            <div className="space-y-3">
              <Label>Niveau de difficulté</Label>
              <Select value={formData.difficulty || 'medium'} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Débutant</SelectItem>
                  <SelectItem value="medium">Intermédiaire</SelectItem>
                  <SelectItem value="advanced">Avancé</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Domaine juridique</Label>
              <Select value={formData.domain || ''} onValueChange={(value) => setFormData({...formData, domain: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un domaine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Droit général</SelectItem>
                  <SelectItem value="civil">Droit civil</SelectItem>
                  <SelectItem value="commercial">Droit commercial</SelectItem>
                  <SelectItem value="administrative">Droit administratif</SelectItem>
                  <SelectItem value="penal">Droit pénal</SelectItem>
                  <SelectItem value="constitutional">Droit constitutionnel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Nombre de questions</Label>
              <Select value={formData.questionCount || '10'} onValueChange={(value) => setFormData({...formData, questionCount: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 questions</SelectItem>
                  <SelectItem value="10">10 questions</SelectItem>
                  <SelectItem value="20">20 questions</SelectItem>
                  <SelectItem value="50">50 questions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Type de questions</Label>
              <div className="space-y-2">
                {['QCM', 'Vrai/Faux', 'Questions ouvertes', 'Cas pratiques'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={type}
                      checked={formData.questionTypes?.includes(type) || false}
                      onCheckedChange={(checked) => {
                        const types = formData.questionTypes || [];
                        if (checked) {
                          setFormData({...formData, questionTypes: [...types, type]});
                        } else {
                          setFormData({...formData, questionTypes: types.filter((t: string) => t !== type)});
                        }
                      }}
                    />
                    <Label htmlFor={type}>{type}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="timed"
                checked={formData.timed || false}
                onCheckedChange={(checked) => setFormData({...formData, timed: checked})}
              />
              <Label htmlFor="timed">Quiz chronométré</Label>
            </div>

            {formData.timed && (
              <div className="space-y-3">
                <Label>Durée (minutes)</Label>
                <Input 
                  type="number"
                  placeholder="30"
                  value={formData.duration || ''}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                />
              </div>
            )}
          </div>
        );

      case 'audio-playback':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Play className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">Lecture audio de la réponse</span>
            </div>

            <div className="space-y-3">
              <Label>Vitesse de lecture</Label>
              <Select value={formData.speed || '1'} onValueChange={(value) => setFormData({...formData, speed: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5x (lent)</SelectItem>
                  <SelectItem value="1">1x (normal)</SelectItem>
                  <SelectItem value="1.5">1.5x (rapide)</SelectItem>
                  <SelectItem value="2">2x (très rapide)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Voix</Label>
              <Select value={formData.voice || 'default'} onValueChange={(value) => setFormData({...formData, voice: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Voix par défaut</SelectItem>
                  <SelectItem value="male">Voix masculine</SelectItem>
                  <SelectItem value="female">Voix féminine</SelectItem>
                  <SelectItem value="robotic">Voix robotique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-center py-4">
              <Button onClick={() => console.log('Starting audio playback...')}>
                <Play className="w-4 h-4 mr-2" />
                Démarrer la lecture
              </Button>
            </div>

            <Progress value={33} className="w-full" />
            <p className="text-center text-sm text-gray-500">Lecture en cours...</p>
          </div>
        );

      case 'conversation-replay':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Play className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">Rejouer la conversation complète</span>
            </div>

            <div className="space-y-3">
              <Label>Options de lecture</Label>
              <div className="space-y-2">
                {['Conversation complète', 'Derniers échanges seulement', 'Réponses de l\'IA uniquement', 'Questions utilisateur uniquement'].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox 
                      id={option}
                      checked={formData.replayOptions?.includes(option) || false}
                      onCheckedChange={(checked) => {
                        const options = formData.replayOptions || [];
                        if (checked) {
                          setFormData({...formData, replayOptions: [...options, option]});
                        } else {
                          setFormData({...formData, replayOptions: options.filter((o: string) => o !== option)});
                        }
                      }}
                    />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="pauseBetween"
                checked={formData.pauseBetween || true}
                onCheckedChange={(checked) => setFormData({...formData, pauseBetween: checked})}
              />
              <Label htmlFor="pauseBetween">Pause entre les réponses</Label>
            </div>
          </div>
        );

      case 'voice-continuation':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Mic className="h-5 w-5 text-red-500" />
              <span className="text-sm text-gray-600">Continuer la conversation vocale</span>
            </div>

            <div className="space-y-3">
              <Label>Mode d'interaction</Label>
              <Select value={formData.interactionMode || 'automatic'} onValueChange={(value) => setFormData({...formData, interactionMode: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Détection automatique</SelectItem>
                  <SelectItem value="push-to-talk">Appuyer pour parler</SelectItem>
                  <SelectItem value="continuous">Conversation continue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Langue de reconnaissance</Label>
              <Select value={formData.recognitionLanguage || 'fr'} onValueChange={(value) => setFormData({...formData, recognitionLanguage: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="ar">Arabe</SelectItem>
                  <SelectItem value="en">Anglais</SelectItem>
                  <SelectItem value="ber">Berbère</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="noiseCancellation"
                checked={formData.noiseCancellation || true}
                onCheckedChange={(checked) => setFormData({...formData, noiseCancellation: checked})}
              />
              <Label htmlFor="noiseCancellation">Réduction de bruit</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="saveConversation"
                checked={formData.saveConversation || false}
                onCheckedChange={(checked) => setFormData({...formData, saveConversation: checked})}
              />
              <Label htmlFor="saveConversation">Sauvegarder la conversation</Label>
            </div>

            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-2">
                <Mic className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-sm text-gray-600">Prêt à écouter...</p>
            </div>
          </div>
        );

      case 'print':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Printer className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">Options d'impression pour: {modal.data?.documentTitle}</span>
            </div>

            <div className="space-y-3">
              <Label>Format de page</Label>
              <Select value={formData.pageFormat || 'A4'} onValueChange={(value) => setFormData({...formData, pageFormat: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A4">A4</SelectItem>
                  <SelectItem value="A3">A3</SelectItem>
                  <SelectItem value="Letter">Letter</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Orientation</Label>
              <RadioGroup value={formData.orientation || 'portrait'} onValueChange={(value) => setFormData({...formData, orientation: value})}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="portrait" id="portrait" />
                  <Label htmlFor="portrait">Portrait</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="landscape" id="landscape" />
                  <Label htmlFor="landscape">Paysage</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Pages à imprimer</Label>
              <RadioGroup value={formData.pages || 'all'} onValueChange={(value) => setFormData({...formData, pages: value})}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all-pages" />
                  <Label htmlFor="all-pages">Toutes les pages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="current" id="current-page" />
                  <Label htmlFor="current-page">Page actuelle</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="range" id="page-range" />
                  <Label htmlFor="page-range">Plage de pages</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.pages === 'range' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>De la page</Label>
                  <Input 
                    type="number"
                    placeholder="1"
                    value={formData.startPage || ''}
                    onChange={(e) => setFormData({...formData, startPage: e.target.value})}
                  />
                </div>
                <div>
                  <Label>À la page</Label>
                  <Input 
                    type="number"
                    placeholder="10"
                    value={formData.endPage || ''}
                    onChange={(e) => setFormData({...formData, endPage: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeHeader"
                checked={formData.includeHeader || true}
                onCheckedChange={(checked) => setFormData({...formData, includeHeader: checked})}
              />
              <Label htmlFor="includeHeader">Inclure l'en-tête</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeFooter"
                checked={formData.includeFooter || true}
                onCheckedChange={(checked) => setFormData({...formData, includeFooter: checked})}
              />
              <Label htmlFor="includeFooter">Inclure le pied de page</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includePageNumbers"
                checked={formData.includePageNumbers || true}
                onCheckedChange={(checked) => setFormData({...formData, includePageNumbers: checked})}
              />
              <Label htmlFor="includePageNumbers">Numéroter les pages</Label>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Settings className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">Fonctionnalité en cours de développement</span>
            </div>
            <p className="text-center text-gray-500">
              Cette fonctionnalité sera bientôt disponible.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={!!modal} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>{modal.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {renderModalContent()}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Traitement...
              </>
            ) : (
              modal.type === 'print' ? 'Imprimer' : 
              modal.type === 'timeline-export' ? 'Exporter' :
              modal.type === 'data-import' ? 'Importer' :
              'Enregistrer'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}