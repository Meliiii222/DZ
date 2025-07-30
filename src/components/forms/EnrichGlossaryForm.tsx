import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { FileText, Upload, BookOpen } from 'lucide-react';

interface EnrichGlossaryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnrichGlossaryForm({ isOpen, onClose }: EnrichGlossaryFormProps) {
  const [formData, setFormData] = useState({
    source: '',
    domain: '',
    method: '',
    description: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.source || !formData.method) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // Simulation du processus d'enrichissement
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          
          const definitionCount = Math.floor(Math.random() * 500 + 100);
          
          toast.success("Glossaire enrichi avec succès", {
            description: `${definitionCount} nouvelles définitions ont été ajoutées au glossaire`,
          });

          // Réinitialiser le formulaire
          setFormData({
            source: '',
            domain: '',
            method: '',
            description: ''
          });
          setProgress(0);
          onClose();
          return 0;
        }
        return prev + 2;
      });
    }, 50);

    console.log('Enrichissement du glossaire:', formData);
  };

  const handleReset = () => {
    if (!isProcessing) {
      setFormData({
        source: '',
        domain: '',
        method: '',
        description: ''
      });
      setProgress(0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Enrichir le Glossaire Juridique
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Importez et intégrez de nouvelles définitions juridiques
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="source">Source des définitions *</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, source: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lexique-juridique">Lexique juridique officiel</SelectItem>
                <SelectItem value="code-civil">Code Civil Algérien</SelectItem>
                <SelectItem value="code-penal">Code Pénal Algérien</SelectItem>
                <SelectItem value="code-procedure">Code de Procédure</SelectItem>
                <SelectItem value="jurisprudence">Jurisprudence récente</SelectItem>
                <SelectItem value="doctrine">Doctrine juridique</SelectItem>
                <SelectItem value="textes-reglementaires">Textes réglementaires</SelectItem>
                <SelectItem value="import-manuel">Import manuel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="domain">Domaine ciblé</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, domain: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les domaines" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les domaines</SelectItem>
                  <SelectItem value="droit-civil">Droit Civil</SelectItem>
                  <SelectItem value="droit-penal">Droit Pénal</SelectItem>
                  <SelectItem value="droit-commercial">Droit Commercial</SelectItem>
                  <SelectItem value="droit-administratif">Droit Administratif</SelectItem>
                  <SelectItem value="procedure">Procédures</SelectItem>
                  <SelectItem value="droit-constitutionnel">Droit Constitutionnel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="method">Méthode d'extraction *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, method: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir la méthode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="extraction-automatique">Extraction automatique</SelectItem>
                  <SelectItem value="analyse-semantique">Analyse sémantique</SelectItem>
                  <SelectItem value="import-structure">Import structuré</SelectItem>
                  <SelectItem value="verification-manuelle">Vérification manuelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description du processus</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Décrivez les critères de sélection et les objectifs d'enrichissement..."
              rows={4}
            />
          </div>

          {/* Zone de téléchargement de fichier */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Téléchargez un fichier de définitions (optionnel)
            </p>
            <p className="text-xs text-gray-500">
              Formats supportés: .txt, .docx, .pdf, .json
            </p>
            <Button type="button" variant="outline" className="mt-2" size="sm">
              Parcourir les fichiers
            </Button>
          </div>

          {/* Barre de progression */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Enrichissement en cours...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1" 
              disabled={isProcessing}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {isProcessing ? 'Enrichissement...' : 'Enrichir le glossaire'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              disabled={isProcessing}
            >
              Réinitialiser
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onClose}
              disabled={isProcessing}
            >
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}