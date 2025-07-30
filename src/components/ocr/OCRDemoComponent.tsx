import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Play, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AlgerianLegalOCRComponent from './AlgerianLegalOCRComponent';

// Exemple de données extraites pour la démonstration
const mockExtractedData = {
  text: `RÉPUBLIQUE ALGÉRIENNE DÉMOCRATIQUE ET POPULAIRE
MINISTÈRE DE LA JUSTICE

Décret exécutif n° 23-145 du 15 Ramadhan 1444 correspondant au 6 avril 2023 
portant organisation et fonctionnement des tribunaux administratifs.

Le Premier Ministre,

Vu la Constitution, notamment ses articles 99-4° et 143 ;
Vu la loi n° 08-09 du 18 Safar 1429 correspondant au 25 février 2008 portant code de procédure civile et administrative ;
Vu le décret présidentiel n° 21-275 du 19 Dhou El Hidja 1442 correspondant au 30 juillet 2021 portant nomination du Premier Ministre ;

Article 1er : Le présent décret a pour objet de fixer les modalités d'organisation et de fonctionnement des tribunaux administratifs.

Article 2 : Les tribunaux administratifs sont compétents pour connaître en premier ressort de tous les litiges administratifs.

Article 3 : Chaque tribunal administratif comprend :
- Un président ;
- Des vice-présidents ;
- Des conseillers ;
- Un greffier en chef ;
- Des greffiers.`,
  
  structuredData: {
    title: "Décret exécutif n° 23-145 portant organisation et fonctionnement des tribunaux administratifs",
    type: "Décret exécutif",
    number: "23-145",
    dateHijri: "15 Ramadhan 1444",
    dateGregorian: "6 avril 2023",
    institution: "Premier Ministre",
    content: "Organisation et fonctionnement des tribunaux administratifs",
    articles: [
      {
        number: "1",
        title: "Article 1er",
        content: "Le présent décret a pour objet de fixer les modalités d'organisation et de fonctionnement des tribunaux administratifs."
      },
      {
        number: "2", 
        title: "Article 2",
        content: "Les tribunaux administratifs sont compétents pour connaître en premier ressort de tous les litiges administratifs."
      },
      {
        number: "3",
        title: "Article 3", 
        content: "Chaque tribunal administratif comprend : Un président, Des vice-présidents, Des conseillers, Un greffier en chef, Des greffiers."
      }
    ],
    references: [
      {
        type: "vu",
        reference: "Constitution",
        description: "Vu la Constitution, notamment ses articles 99-4° et 143"
      },
      {
        type: "vu",
        reference: "08-09",
        description: "Vu la loi n° 08-09 du 18 Safar 1429 correspondant au 25 février 2008 portant code de procédure civile et administrative"
      }
    ],
    signatories: ["Premier Ministre"]
  },
  
  metadata: {
    pageCount: 3,
    documentType: "Décret exécutif",
    language: "fr" as const,
    extractionDate: new Date(),
    processingTime: 2500
  },
  
  confidence: 92,
  
  tables: []
};

const mockMappingResult = {
  formData: {
    title: "Décret exécutif n° 23-145 portant organisation et fonctionnement des tribunaux administratifs",
    type: "Décret exécutif",
    numero: "23-145", 
    date_hijri: "15 Ramadhan 1444",
    date_gregorian: "6 avril 2023",
    institution: "Premier Ministre",
    domain: "Administratif",
    articles_count: 3,
    signatory: "Premier Ministre",
    wilaya: null,
    legal_nature: "Décret d'organisation",
    execution_level: "National"
  },
  
  confidence: 89,
  
  suggestions: [
    {
      fieldName: "domain",
      suggestedValue: "Droit administratif",
      confidence: 0.95,
      source: "ai" as const,
      alternatives: ["Justice administrative", "Organisation judiciaire"]
    },
    {
      fieldName: "geographic_scope", 
      suggestedValue: "National",
      confidence: 0.90,
      source: "ai" as const,
      alternatives: ["Territorial", "Local"]
    }
  ],
  
  validationErrors: [
    {
      fieldName: "wilaya",
      message: "Le champ wilaya n'est pas renseigné pour ce document à portée nationale",
      severity: "info" as const,
      suggestion: "Ce champ peut rester vide pour les documents nationaux"
    }
  ],
  
  detectedEntities: [
    {
      type: "institution" as const,
      text: "Premier Ministre", 
      confidence: 0.95,
      position: { start: 150, end: 165 },
      metadata: { standardName: "Premier Ministre", category: "government" }
    },
    {
      type: "date" as const,
      text: "15 Ramadhan 1444",
      confidence: 0.98,
      position: { start: 95, end: 111 },
      metadata: { calendar: "hijri", day: 15, month: "Ramadhan", year: 1444 }
    },
    {
      type: "date" as const, 
      text: "6 avril 2023",
      confidence: 0.98,
      position: { start: 130, end: 142 },
      metadata: { calendar: "gregorian", day: 6, month: "avril", year: 2023 }
    },
    {
      type: "reference" as const,
      text: "loi n° 08-09",
      confidence: 0.92,
      position: { start: 200, end: 212 },
      metadata: { type: "loi", number: "08-09" }
    }
  ]
};

export const OCRDemoComponent: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const runDemo = () => {
    setShowDemo(true);
    setDemoStep(1);
    
    // Simuler le processus étape par étape
    setTimeout(() => setDemoStep(2), 1000);
    setTimeout(() => setDemoStep(3), 2000);
    setTimeout(() => setDemoStep(4), 3000);
  };

  const resetDemo = () => {
    setShowDemo(false);
    setDemoStep(0);
  };

  return (
    <div className="space-y-6">
      {/* En-tête de démonstration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            🇩🇿 Démonstration DZ OCR-IA Juridique
          </CardTitle>
          <CardDescription>
            Testez le système d'extraction et de mapping automatique avec un document exemple
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Button onClick={runDemo} disabled={showDemo} className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-2" />
              Lancer la démonstration
            </Button>
            {showDemo && (
              <Button onClick={resetDemo} variant="outline">
                Réinitialiser
              </Button>
            )}
            <Badge variant="secondary">Document exemple: Décret exécutif algérien</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Résultats de la démonstration */}
      {showDemo && (
        <div className="space-y-6">
          {/* Progression */}
          <Card>
            <CardHeader>
              <CardTitle>Progression du traitement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className={`flex items-center gap-3 ${demoStep >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className={`w-4 h-4 ${demoStep >= 1 ? 'text-green-500' : 'text-gray-300'}`} />
                  <span>Extraction OCR du texte et des tables</span>
                </div>
                <div className={`flex items-center gap-3 ${demoStep >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className={`w-4 h-4 ${demoStep >= 2 ? 'text-green-500' : 'text-gray-300'}`} />
                  <span>Structuration des données juridiques</span>
                </div>
                <div className={`flex items-center gap-3 ${demoStep >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className={`w-4 h-4 ${demoStep >= 3 ? 'text-green-500' : 'text-gray-300'}`} />
                  <span>Mapping intelligent vers les formulaires</span>
                </div>
                <div className={`flex items-center gap-3 ${demoStep >= 4 ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className={`w-4 h-4 ${demoStep >= 4 ? 'text-green-500' : 'text-gray-300'}`} />
                  <span>Validation et génération des résultats</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Résultats détaillés */}
          {demoStep >= 4 && (
            <div className="space-y-6">
              {/* Métriques de performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Résultats de la démonstration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {mockMappingResult.confidence}%
                      </div>
                      <div className="text-sm text-gray-500">Confiance mapping</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {mockMappingResult.detectedEntities.length}
                      </div>
                      <div className="text-sm text-gray-500">Entités détectées</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {mockExtractedData.structuredData.articles.length}
                      </div>
                      <div className="text-sm text-gray-500">Articles extraits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {mockExtractedData.metadata.processingTime}ms
                      </div>
                      <div className="text-sm text-gray-500">Temps de traitement</div>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Cette démonstration utilise des données simulées pour illustrer les capacités du système OCR + IA.
                      Les vrais documents seront traités avec la même précision.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Détails des résultats */}
              <Tabs defaultValue="document-info" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="document-info">Document</TabsTrigger>
                  <TabsTrigger value="form-mapping">Mapping</TabsTrigger>
                  <TabsTrigger value="entities">Entités</TabsTrigger>
                  <TabsTrigger value="validation">Validation</TabsTrigger>
                </TabsList>

                <TabsContent value="document-info" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations extraites du document</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Type</label>
                          <p className="text-sm">{mockExtractedData.structuredData.type}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Numéro</label>
                          <p className="text-sm">{mockExtractedData.structuredData.number}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Institution</label>
                          <p className="text-sm">{mockExtractedData.structuredData.institution}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Langue</label>
                          <Badge variant="outline">{mockExtractedData.metadata.language.toUpperCase()}</Badge>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Titre</label>
                        <p className="text-sm mt-1">{mockExtractedData.structuredData.title}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Date hégirien</label>
                          <p className="text-sm">{mockExtractedData.structuredData.dateHijri}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Date grégorien</label>
                          <p className="text-sm">{mockExtractedData.structuredData.dateGregorian}</p>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">Articles détectés</label>
                        <div className="mt-2 space-y-2">
                          {mockExtractedData.structuredData.articles.map((article, index) => (
                            <div key={index} className="p-2 bg-gray-50 rounded text-xs">
                              <strong>{article.title}:</strong> {article.content.substring(0, 100)}...
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="form-mapping" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mapping automatique vers le formulaire</CardTitle>
                      <CardDescription>
                        Données mappées intelligemment selon la nomenclature algérienne
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(mockMappingResult.formData).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm font-medium text-gray-700">{key}</span>
                            <span className="text-sm text-gray-600 max-w-xs truncate">
                              {value ? String(value) : 'Non renseigné'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="entities" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Entités juridiques détectées</CardTitle>
                      <CardDescription>
                        Institutions, dates, références identifiées par l'IA
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockMappingResult.detectedEntities.map((entity, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">{entity.type}</Badge>
                              <span className="text-sm font-medium">{entity.text}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-500">
                                Confiance: {Math.round(entity.confidence * 100)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="validation" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Validation des données</CardTitle>
                      <CardDescription>
                        Contrôles de cohérence et suggestions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockMappingResult.validationErrors.map((error, index) => (
                          <Alert key={index}>
                            <Info className="h-4 w-4" />
                            <AlertDescription>
                              <strong>{error.fieldName}:</strong> {error.message}
                              {error.suggestion && (
                                <div className="mt-1 text-xs text-gray-600">
                                  Suggestion: {error.suggestion}
                                </div>
                              )}
                            </AlertDescription>
                          </Alert>
                        ))}

                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
                          <div className="flex items-center gap-2 text-green-700 font-medium">
                            <CheckCircle className="w-4 h-4" />
                            Validation réussie
                          </div>
                          <p className="text-sm text-green-600 mt-1">
                            Le document a été traité avec succès et toutes les données principales ont été extraites et mappées.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      )}

      {/* Composant OCR réel */}
      <div className="border-t pt-8">
        <div className="text-center space-y-2 mb-6">
          <h3 className="text-xl font-bold text-gray-800">Traitement de vos documents</h3>
          <p className="text-gray-600">
            Utilisez le composant ci-dessous pour traiter vos propres documents PDF juridiques
          </p>
        </div>
        <AlgerianLegalOCRComponent />
      </div>
    </div>
  );
};

export default OCRDemoComponent;