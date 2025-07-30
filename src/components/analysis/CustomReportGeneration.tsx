
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, Sparkles, FileText, FileSpreadsheet, FileImage } from 'lucide-react';
import { ReportGenerationModal } from '@/components/modals/ReportGenerationModal';

export function CustomReportGeneration() {
  const [showAiModal, setShowAiModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [showWordModal, setShowWordModal] = useState(false);
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            Générateur de Rapport Personnalisé
          </CardTitle>
          <CardDescription>
            Créez des rapports sur mesure avec l'assistance de l'IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Configuration du rapport */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Configuration du Rapport</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Titre du rapport</label>
                <Input placeholder="Entrez le titre de votre rapport" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Source de données</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner la source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="legal-texts">Textes juridiques</SelectItem>
                    <SelectItem value="procedures">Procédures administratives</SelectItem>
                    <SelectItem value="all">Toutes les données</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="Décrivez les objectifs et le contenu souhaité du rapport..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Période</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">7 derniers jours</SelectItem>
                      <SelectItem value="month">30 derniers jours</SelectItem>
                      <SelectItem value="quarter">3 derniers mois</SelectItem>
                      <SelectItem value="year">12 derniers mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="word">Word</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Actions</h3>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Génération Intelligente
                </h4>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 mb-3"
                  onClick={() => setShowAiModal(true)}
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Générer avec IA
                </Button>
                
                <div className="text-sm text-gray-600 mb-3">
                  Options d'export rapide :
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setShowPdfModal(true)}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setShowExcelModal(true)}
                  >
                    <FileSpreadsheet className="w-4 h-4 mr-1" />
                    Excel
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setShowWordModal(true)}
                  >
                    <FileImage className="w-4 h-4 mr-1" />
                    Word
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Suggestions IA</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Inclure les tendances récentes</li>
                  <li>• Ajouter des graphiques comparatifs</li>
                  <li>• Intégrer une analyse prédictive</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modales de génération de rapports */}
      {showAiModal && (
        <ReportGenerationModal
          isOpen={showAiModal}
          onClose={() => setShowAiModal(false)}
          reportType="ai"
          title="Génération de Rapport avec IA"
        />
      )}

      {showPdfModal && (
        <ReportGenerationModal
          isOpen={showPdfModal}
          onClose={() => setShowPdfModal(false)}
          reportType="pdf"
          title="Export PDF Personnalisé"
        />
      )}

      {showExcelModal && (
        <ReportGenerationModal
          isOpen={showExcelModal}
          onClose={() => setShowExcelModal(false)}
          reportType="excel"
          title="Export Excel Avancé"
        />
      )}

      {showWordModal && (
        <ReportGenerationModal
          isOpen={showWordModal}
          onClose={() => setShowWordModal(false)}
          reportType="word"
          title="Export Word Formaté"
        />
      )}
    </div>
  );
}
