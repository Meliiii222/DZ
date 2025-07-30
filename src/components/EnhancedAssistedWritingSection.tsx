import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { buttonHandlers } from '@/utils/buttonUtils';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Book, 
  Scale, 
  Gavel, 
  Building, 
  Users,
  PenTool,
  Sparkles,
  Bot,
  Download,
  Eye,
  Save,
  Search,
  Filter,
  Star,
  Clock,
  BookOpen,
  Shield,
  Globe,
  User
} from 'lucide-react';
import { ConsolidatedTextsSection } from './writing/ConsolidatedTextsSection';
import { ConsolidatedProceduresSection } from './writing/ConsolidatedProceduresSection';
import { DocumentComposer } from './writing/DocumentComposer';
import { SectionHeader } from './common/SectionHeader';

export function EnhancedAssistedWritingSection() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Statistiques générales */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-800">Tableau de bord - Rédaction Assistée</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-emerald-600">2,847</div>
              <div className="text-sm text-gray-600">Textes consolidés</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">1,456</div>
              <div className="text-sm text-gray-600">Procédures consolidées</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-600">89%</div>
              <div className="text-sm text-gray-600">Taux de précision IA</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-orange-600">156</div>
              <div className="text-sm text-gray-600">Rapports générés</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections principales de la rédaction assistée */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Textes consolidés */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-emerald-200" onClick={() => setActiveSection('consolidated-texts')}>
          <CardHeader>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-emerald-800">Textes juridiques consolidés</CardTitle>
                <CardDescription>
                  Consolidation automatique et mise à jour des textes juridiques algériens
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <div className="text-xl font-bold text-emerald-600">847</div>
                  <div className="text-xs text-gray-600">Codes consolidés</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">1,234</div>
                  <div className="text-xs text-gray-600">Lois mises à jour</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">456</div>
                  <div className="text-xs text-gray-600">Décrets intégrés</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-xl font-bold text-orange-600">89</div>
                  <div className="text-xs text-gray-600">Nouvelles versions</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => setActiveSection('consolidated-texts')}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Voir les textes
                </Button>
                <Button 
                  variant="outline" 
                  className="border-emerald-600 text-emerald-600"
                  onClick={buttonHandlers.downloadResource('Textes consolidés', 'ZIP')}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Procédures consolidées */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200" onClick={() => setActiveSection('consolidated-procedures')}>
          <CardHeader>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-blue-800">Procédures consolidées</CardTitle>
                <CardDescription>
                  Consolidation et harmonisation des procédures administratives
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">567</div>
                  <div className="text-xs text-gray-600">Procédures mises à jour</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">123</div>
                  <div className="text-xs text-gray-600">Nouvelles procédures</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">234</div>
                  <div className="text-xs text-gray-600">Formulaires intégrés</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-xl font-bold text-orange-600">45</div>
                  <div className="text-xs text-gray-600">Institutions couvertes</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => setActiveSection('consolidated-procedures')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Voir les procédures
                </Button>
                <Button 
                  variant="outline" 
                  className="border-blue-600 text-blue-600"
                  onClick={buttonHandlers.downloadResource('Procédures consolidées', 'ZIP')}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nouveau : Rédaction complète de documents */}
      <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200" onClick={() => setActiveSection('document-composer')}>
        <CardHeader>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-purple-800">Rédaction Complète de Documents IA</CardTitle>
              <CardDescription>
                Génération automatique de documents juridiques complets avec IA avancée
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">47</div>
                <div className="text-xs text-gray-600">Modèles disponibles</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">234</div>
                <div className="text-xs text-gray-600">Documents générés</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">96%</div>
                <div className="text-xs text-gray-600">Conformité légale</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-xl font-bold text-orange-600">15 min</div>
                <div className="text-xs text-gray-600">Temps moyen</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={() => setActiveSection('document-composer')}>
                <Bot className="w-4 h-4 mr-2" />
                Créer un document
              </Button>
              <Button 
                variant="outline" 
                className="border-purple-600 text-purple-600"
                onClick={buttonHandlers.generic('Prévisualiser document', 'Prévisualisation du compositeur', 'Rédaction')}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outils de rédaction assistée */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            Outils de rédaction assistée par IA
          </CardTitle>
          <CardDescription>
            Outils intelligents pour améliorer la qualité et la cohérence des textes juridiques
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-8 h-8 text-purple-600" />
                <div>
                  <h4 className="font-semibold">Rédaction automatique</h4>
                  <p className="text-sm text-gray-600">IA génère des brouillons de textes</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={buttonHandlers.generic('Rédaction automatique', 'Démarrage de la rédaction IA', 'Rédaction')}
              >
                <PenTool className="w-4 h-4 mr-2" />
                Commencer
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-8 h-8 text-emerald-600" />
                <div>
                  <h4 className="font-semibold">Vérification de cohérence</h4>
                  <p className="text-sm text-gray-600">Analyse automatique des contradictions</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={buttonHandlers.generic('Vérification cohérence', 'Analyse de cohérence automatique', 'Rédaction')}
              >
                <Search className="w-4 h-4 mr-2" />
                Vérifier
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-8 h-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold">Traduction juridique</h4>
                  <p className="text-sm text-gray-600">Traduction automatique spécialisée</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={buttonHandlers.generic('Traduction juridique', 'Traduction automatique spécialisée', 'Rédaction')}
              >
                <Globe className="w-4 h-4 mr-2" />
                Traduire
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activité récente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-600" />
            Activité récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                action: "Génération d'un contrat de travail",
                time: "Il y a 1 heure",
                status: "Terminé",
                user: "Système IA"
              },
              {
                action: "Consolidation du Code civil algérien",
                time: "Il y a 2 heures",
                status: "Terminé",
                user: "Système automatique"
              },
              {
                action: "Mise à jour des procédures de l'état civil",
                time: "Il y a 4 heures", 
                status: "En cours",
                user: "Ahmed Benali"
              },
              {
                action: "Génération rapport mensuel",
                time: "Il y a 6 heures",
                status: "Terminé",
                user: "Système automatique"
              },
              {
                action: "Consolidation des textes fiscaux",
                time: "Il y a 1 jour",
                status: "Terminé",
                user: "Fatima Cherif"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{activity.action}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {activity.user}
                    </span>
                    <span>{activity.time}</span>
                  </div>
                </div>
                <Badge 
                  variant={activity.status === 'Terminé' ? 'default' : 'secondary'}
                  className={activity.status === 'Terminé' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderConsolidatedTexts = () => (
    <ConsolidatedTextsSection />
  );

  const renderConsolidatedProcedures = () => (
    <ConsolidatedProceduresSection />
  );

  const renderDocumentComposer = () => (
    <DocumentComposer />
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Rédaction assistée algérienne"
        description="Rédaction et consolidation intelligente des textes juridiques et procédures administratives"
        icon={PenTool}
        iconColor="text-emerald-600"
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="consolidated-texts">Textes juridiques consolidés</TabsTrigger>
          <TabsTrigger value="consolidated-procedures">Procédures consolidées</TabsTrigger>
          <TabsTrigger value="document-composer">Rédaction Complète IA</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          {renderOverview()}
        </TabsContent>
        <TabsContent value="consolidated-texts" className="mt-6">
          {renderConsolidatedTexts()}
        </TabsContent>
        <TabsContent value="consolidated-procedures" className="mt-6">
          {renderConsolidatedProcedures()}
        </TabsContent>
        <TabsContent value="document-composer" className="mt-6">
          {renderDocumentComposer()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
