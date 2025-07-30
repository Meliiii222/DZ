
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Brain, Cpu, Zap, Target, Sparkles, Bot, MessageSquare, BarChart3, Users, Shield, AlertTriangle, Search, Copy, Globe, Camera } from 'lucide-react';
import { UnifiedSectionHeader } from '@/components/common/UnifiedSectionHeader';
import { TabFormField } from '@/components/common/TabFormField';
import { VectorSearch } from './VectorSearch';
import { DeduplicationEngine } from './DeduplicationEngine';
import { UniversalSearch } from './UniversalSearch';
import { AdvancedOCR } from './AdvancedOCR';

export function AIAdvancedSection() {
  return (
    <div className="space-y-6">
      {/* Header unifié avec titre et description */}
      <UnifiedSectionHeader
        icon={Brain}
        title="Intelligence Artificielle Avancée"
        description="Technologies d'IA de pointe pour l'analyse juridique et l'assistance intelligente"
        iconColor="text-purple-600"
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="algorithms">Algorithmes IA</TabsTrigger>
          <TabsTrigger value="vector-search">Recherche Vectorielle</TabsTrigger>
          <TabsTrigger value="deduplication">Déduplication</TabsTrigger>
          <TabsTrigger value="universal-search">Recherche Universelle</TabsTrigger>
          <TabsTrigger value="ocr">OCR Avancé</TabsTrigger>
          <TabsTrigger value="research">Recherche & Dev</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Champ de formulaire avec fonctionnalités */}
          <TabFormField
            placeholder="Explorer les fonctionnalités d'IA avancée..."
            onSearch={(query) => console.log('Recherche IA avancée:', query)}
            onAdd={() => console.log('Nouveau projet IA')}
            onFilter={() => console.log('Filtrer projets IA')}
            onSort={() => console.log('Trier projets IA')}
            onExport={() => console.log('Exporter données IA')}
            onRefresh={() => console.log('Actualiser IA')}
            showActions={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Machine Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Algorithmes d'apprentissage automatique pour l'analyse juridique
                </p>
                <div className="space-y-2">
                  <Badge className="bg-purple-100 text-purple-800">Deep Learning</Badge>
                  <Badge className="bg-blue-100 text-blue-800">Neural Networks</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  Traitement Intelligent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Processeurs spécialisés pour l'IA juridique
                </p>
                <div className="space-y-2">
                  <Badge className="bg-green-100 text-green-800">GPU Computing</Badge>
                  <Badge className="bg-orange-100 text-orange-800">Edge AI</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  Performance IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Optimisation et accélération des modèles IA
                </p>
                <div className="space-y-2">
                  <Badge className="bg-red-100 text-red-800">Real-time</Badge>
                  <Badge className="bg-purple-100 text-purple-800">Scalable</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section des capacités avancées */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                Capacités IA Avancées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-purple-800">Analyse Prédictive</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Prédiction d'issues judiciaires</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Évaluation automatique des risques</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <span className="text-sm">Détection d'anomalies</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-800">NLP Spécialisé</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Extraction d'entités juridiques</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Résumés automatiques intelligents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Classification automatique avancée</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="algorithms" className="space-y-6">
          {/* Champ de formulaire avec fonctionnalités */}
          <TabFormField
            placeholder="Rechercher dans les algorithmes IA..."
            onSearch={(query) => console.log('Recherche algorithmes:', query)}
            onAdd={() => console.log('Nouvel algorithme')}
            onFilter={() => console.log('Filtrer algorithmes')}
            onSort={() => console.log('Trier algorithmes')}
            onExport={() => console.log('Exporter algorithmes')}
            onRefresh={() => console.log('Actualiser algorithmes')}
            showActions={true}
          />

          <Card>
            <CardHeader>
              <CardTitle>Algorithmes d'Intelligence Artificielle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Apprentissage Supervisé</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded">
                      <h5 className="font-medium">Classification de Textes</h5>
                      <p className="text-sm text-gray-600">Catégorisation automatique des documents juridiques</p>
                    </div>
                    <div className="p-3 border rounded">
                      <h5 className="font-medium">Régression Prédictive</h5>
                      <p className="text-sm text-gray-600">Prédiction de résultats judiciaires</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Apprentissage Non Supervisé</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded">
                      <h5 className="font-medium">Clustering de Documents</h5>
                      <p className="text-sm text-gray-600">Regroupement automatique par similarité</p>
                    </div>
                    <div className="p-3 border rounded">
                      <h5 className="font-medium">Détection d'Anomalies</h5>
                      <p className="text-sm text-gray-600">Identification d'incohérences dans les textes</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vector-search" className="space-y-6">
          <VectorSearch />
        </TabsContent>

        <TabsContent value="deduplication" className="space-y-6">
          <DeduplicationEngine />
        </TabsContent>

        <TabsContent value="universal-search" className="space-y-6">
          <UniversalSearch />
        </TabsContent>

        <TabsContent value="ocr" className="space-y-6">
          <AdvancedOCR />
        </TabsContent>

        <TabsContent value="research" className="space-y-6">
          {/* Champ de formulaire avec fonctionnalités */}
          <TabFormField
            placeholder="Explorer la recherche et développement IA..."
            onSearch={(query) => console.log('Recherche R&D:', query)}
            onAdd={() => console.log('Nouveau projet R&D')}
            onFilter={() => console.log('Filtrer projets R&D')}
            onSort={() => console.log('Trier projets R&D')}
            onExport={() => console.log('Exporter R&D')}
            onRefresh={() => console.log('Actualiser R&D')}
            showActions={true}
          />

          <Card>
            <CardHeader>
              <CardTitle>Recherche et Développement IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Projets en Cours</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded p-4">
                      <h5 className="font-medium">IA Conversationnelle Juridique</h5>
                      <p className="text-sm text-gray-600">Assistant IA avancé pour consultations</p>
                      <Badge className="mt-2 bg-green-100 text-green-800">En développement</Badge>
                    </div>
                    <div className="border rounded p-4">
                      <h5 className="font-medium">Analyse Sémantique Avancée</h5>
                      <p className="text-sm text-gray-600">Compréhension profonde des textes juridiques</p>
                      <Badge className="mt-2 bg-blue-100 text-blue-800">Phase de test</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Innovations Futures</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border-l-4 border-l-purple-500 pl-4">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">IA Générative pour rédaction juridique</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border-l-4 border-l-blue-500 pl-4">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Assistant multimodal (texte, voix, image)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border-l-4 border-l-green-500 pl-4">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      <span className="text-sm">IA prédictive en temps réel</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
