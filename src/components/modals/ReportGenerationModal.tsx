import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  FileText, 
  FileSpreadsheet, 
  Download, 
  Bot, 
  Settings, 
  BarChart3 as Chart,
  Calendar,
  Filter,
  Zap,
  Eye,
  Share2,
  Clock
} from 'lucide-react';

interface ReportGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportType: 'ai' | 'pdf' | 'excel' | 'word';
  title: string;
}

interface ReportConfig {
  title: string;
  description: string;
  timeRange: string;
  dataSource: string[];
  chartTypes: string[];
  metrics: string[];
  filters: {
    dateFrom: string;
    dateTo: string;
    domain: string;
    institution: string;
  };
  exportFormat: string;
  templateStyle: string;
}

export function ReportGenerationModal({ isOpen, onClose, reportType, title }: ReportGenerationModalProps) {
  const [config, setConfig] = useState<ReportConfig>({
    title: 'Rapport personnalisé',
    description: '',
    timeRange: '12months',
    dataSource: ['legal-texts'],
    chartTypes: ['bar'],
    metrics: ['count'],
    filters: {
      dateFrom: '',
      dateTo: '',
      domain: 'all',
      institution: 'all'
    },
    exportFormat: reportType === 'ai' ? 'pdf' : reportType,
    templateStyle: 'professional'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  const dataSources = [
    { id: 'legal-texts', label: 'Textes juridiques', description: 'Lois, décrets, arrêtés' },
    { id: 'jurisprudence', label: 'Jurisprudence', description: 'Décisions de justice' },
    { id: 'doctrine', label: 'Doctrine', description: 'Articles et commentaires' },
    { id: 'procedures', label: 'Procédures', description: 'Procédures administratives' },
    { id: 'analytics', label: 'Analytics', description: 'Données d\'utilisation' }
  ];

  const chartTypes = [
    { id: 'bar', label: 'Graphiques en barres', icon: Chart },
    { id: 'line', label: 'Graphiques linéaires', icon: Chart },
    { id: 'pie', label: 'Camemberts', icon: Chart },
    { id: 'area', label: 'Graphiques en aires', icon: Chart }
  ];

  const metrics = [
    { id: 'count', label: 'Nombre de documents' },
    { id: 'trends', label: 'Tendances temporelles' },
    { id: 'frequency', label: 'Fréquence d\'utilisation' },
    { id: 'categories', label: 'Répartition par catégories' },
    { id: 'institutions', label: 'Répartition par institutions' },
    { id: 'evolution', label: 'Évolution législative' }
  ];

  const templateStyles = [
    { id: 'professional', label: 'Professionnel', description: 'Style corporate avec en-têtes officiels' },
    { id: 'academic', label: 'Académique', description: 'Style universitaire avec références' },
    { id: 'executive', label: 'Exécutif', description: 'Format résumé pour dirigeants' },
    { id: 'technical', label: 'Technique', description: 'Détaillé avec analyses approfondies' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulation de génération de rapport avec progression réaliste
    const steps = [
      { progress: 10, message: 'Collecte des données...' },
      { progress: 25, message: 'Analyse des tendances...' },
      { progress: 45, message: 'Génération des graphiques...' },
      { progress: 65, message: 'Application du template...' },
      { progress: 80, message: 'Optimisation du format...' },
      { progress: 95, message: 'Finalisation du rapport...' },
      { progress: 100, message: 'Rapport généré avec succès !' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      setGenerationProgress(step.progress);
    }

    // Génération du rapport simulé
    const mockReport = {
      id: Date.now().toString(),
      title: config.title,
      generatedAt: new Date().toISOString(),
      format: config.exportFormat,
      size: `${Math.floor(Math.random() * 500 + 200)} KB`,
      pages: Math.floor(Math.random() * 20 + 5),
      sections: [
        'Résumé exécutif',
        'Méthodologie',
        'Analyse des données',
        'Tendances identifiées',
        'Graphiques et visualisations',
        'Recommandations',
        'Annexes'
      ],
      statistics: {
        documentsAnalyzed: Math.floor(Math.random() * 5000 + 1000),
        timeSpan: config.timeRange,
        keyFindings: Math.floor(Math.random() * 10 + 5)
      }
    };

    setGeneratedReport(mockReport);
    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (generatedReport) {
      const fileName = `${config.title.replace(/\s+/g, '_')}_${Date.now()}.${config.exportFormat}`;
      
      // Génération du contenu du rapport
      const reportContent = `
# ${generatedReport.title}

**Généré le:** ${new Date(generatedReport.generatedAt).toLocaleString('fr-FR')}
**Format:** ${generatedReport.format.toUpperCase()}
**Pages:** ${generatedReport.pages}

## Résumé exécutif

Ce rapport analyse ${generatedReport.statistics.documentsAnalyzed} documents juridiques sur une période de ${config.timeRange}.

## Sections du rapport:
${generatedReport.sections.map((section, index) => `${index + 1}. ${section}`).join('\n')}

## Statistiques clés:
- Documents analysés: ${generatedReport.statistics.documentsAnalyzed}
- Période: ${generatedReport.statistics.timeSpan}
- Conclusions principales: ${generatedReport.statistics.keyFindings}

## Configuration utilisée:
- Sources de données: ${config.dataSource.join(', ')}
- Métriques: ${config.metrics.join(', ')}
- Types de graphiques: ${config.chartTypes.join(', ')}
- Style de template: ${config.templateStyle}

---
Rapport généré par dalil.dz - Plateforme de veille juridique
      `.trim();

      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleShare = () => {
    if (generatedReport) {
      const shareData = {
        title: generatedReport.title,
        text: `Rapport généré: ${generatedReport.title}`,
        url: `${window.location.origin}/reports/${generatedReport.id}`
      };
      
      if (navigator.share) {
        navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(`${shareData.title}\n${shareData.url}`);
        alert('Lien du rapport copié dans le presse-papiers !');
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {reportType === 'ai' ? <Bot className="w-5 h-5" /> : 
             reportType === 'pdf' ? <FileText className="w-5 h-5" /> :
             <FileSpreadsheet className="w-5 h-5" />}
            {title}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="config" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="preview">Aperçu</TabsTrigger>
            <TabsTrigger value="generate">Génération</TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Titre du rapport</label>
                  <Input
                    value={config.title}
                    onChange={(e) => setConfig({...config, title: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={config.description}
                    onChange={(e) => setConfig({...config, description: e.target.value})}
                    placeholder="Décrivez l'objectif de ce rapport..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Période d'analyse</label>
                  <Select value={config.timeRange} onValueChange={(value) => setConfig({...config, timeRange: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1month">1 mois</SelectItem>
                      <SelectItem value="3months">3 mois</SelectItem>
                      <SelectItem value="6months">6 mois</SelectItem>
                      <SelectItem value="12months">12 mois</SelectItem>
                      <SelectItem value="custom">Période personnalisée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Sources de données</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {dataSources.map((source) => (
                      <div key={source.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={source.id}
                          checked={config.dataSource.includes(source.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setConfig({...config, dataSource: [...config.dataSource, source.id]});
                            } else {
                              setConfig({...config, dataSource: config.dataSource.filter(s => s !== source.id)});
                            }
                          }}
                        />
                        <label htmlFor={source.id} className="text-sm cursor-pointer">
                          <div className="font-medium">{source.label}</div>
                          <div className="text-xs text-gray-500">{source.description}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Style de template</label>
                  <Select value={config.templateStyle} onValueChange={(value) => setConfig({...config, templateStyle: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {templateStyles.map((style) => (
                        <SelectItem key={style.id} value={style.id}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Métriques à inclure</label>
              <div className="grid grid-cols-3 gap-2">
                {metrics.map((metric) => (
                  <div key={metric.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={metric.id}
                      checked={config.metrics.includes(metric.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setConfig({...config, metrics: [...config.metrics, metric.id]});
                        } else {
                          setConfig({...config, metrics: config.metrics.filter(m => m !== metric.id)});
                        }
                      }}
                    />
                    <label htmlFor={metric.id} className="text-sm cursor-pointer">
                      {metric.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Aperçu du rapport</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold">{config.title}</h3>
                    <p className="text-sm text-gray-600">{config.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Sources:</span> {config.dataSource.length} sélectionnées
                    </div>
                    <div>
                      <span className="font-medium">Période:</span> {config.timeRange}
                    </div>
                    <div>
                      <span className="font-medium">Métriques:</span> {config.metrics.length} sélectionnées
                    </div>
                    <div>
                      <span className="font-medium">Format:</span> {config.exportFormat.toUpperCase()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate" className="space-y-4">
            {!isGenerating && !generatedReport && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Prêt à générer</h3>
                  <p className="text-gray-600 mb-4">
                    Votre rapport sera généré avec les paramètres configurés
                  </p>
                  <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700">
                    <Bot className="w-4 h-4 mr-2" />
                    Générer le rapport
                  </Button>
                </CardContent>
              </Card>
            )}

            {isGenerating && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600 animate-spin" />
                    <h3 className="font-semibold">Génération en cours...</h3>
                  </div>
                  <Progress value={generationProgress} className="mb-2" />
                  <p className="text-sm text-gray-600 text-center">
                    {generationProgress}% terminé
                  </p>
                </CardContent>
              </Card>
            )}

            {generatedReport && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    Rapport généré avec succès
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Taille du fichier</div>
                      <div className="font-medium">{generatedReport.size}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Nombre de pages</div>
                      <div className="font-medium">{generatedReport.pages} pages</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Documents analysés</div>
                      <div className="font-medium">{generatedReport.statistics.documentsAnalyzed}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Généré le</div>
                      <div className="font-medium">{new Date(generatedReport.generatedAt).toLocaleString('fr-FR')}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleDownload} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                    <Button variant="outline" onClick={handleShare} className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Partager
                    </Button>
                    <Button variant="outline" onClick={() => setGeneratedReport(null)}>
                      <Zap className="w-4 h-4 mr-2" />
                      Nouveau rapport
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}