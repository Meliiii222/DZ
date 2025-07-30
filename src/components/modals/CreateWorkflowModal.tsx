
// @ts-nocheck
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Workflow, Plus, Trash2 } from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  assignee: string;
  duration: string;
  required: boolean;
}

interface CreateWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workflowData: Record<string, unknown>) => void;
}

export function CreateWorkflowModal({ isOpen, onClose, onSave }: CreateWorkflowModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    priority: 'medium',
    status: 'Actif',
    triggerEvent: '',
    notifications: true,
    autoApproval: false
  });

  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: '1',
      name: '',
      description: '',
      assignee: '',
      duration: '',
      required: true
    }
  ]);

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: (steps.length + 1).toString(),
      name: '',
      description: '',
      assignee: '',
      duration: '',
      required: true
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (stepId: string) => {
    if (steps.length > 1) {
      setSteps(steps.filter(step => step.id !== stepId));
    }
  };

  const updateStep = (stepId: string, field: keyof WorkflowStep, value: Record<string, unknown>) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, [field]: value } : step
    ));
  };

  const calculateTotalDuration = () => {
    const totalHours = steps.reduce((total, step) => {
      const hours = parseInt(step.duration) || 0;
      return total + hours;
    }, 0);
    
    if (totalHours < 24) {
      return `${totalHours} heures`;
    } else {
      const days = Math.ceil(totalHours / 24);
      return `${days} jours`;
    }
  };

  const handleSave = () => {
    const workflowData = {
      ...formData,
      id: Date.now().toString(),
      steps: steps.length,
      duration: calculateTotalDuration(),
      usage: 0,
      workflowSteps: steps,
      createdAt: new Date().toISOString()
    };
    onSave(workflowData);
    onClose();
    // Reset form
    setFormData({
      name: '',
      description: '',
      category: '',
      priority: 'medium',
      status: 'Actif',
      triggerEvent: '',
      notifications: true,
      autoApproval: false
    });
    setSteps([{
      id: '1',
      name: '',
      description: '',
      assignee: '',
      duration: '',
      required: true
    }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Workflow className="w-5 h-5" />
            Créer un Workflow
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
          {/* Configuration générale */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configuration générale</h3>
            
            <div className="space-y-2">
              <Label htmlFor="workflowName">Nom du workflow *</Label>
              <Input
                id="workflowName"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Validation Texte Juridique"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workflowDescription">Description</Label>
              <Textarea
                id="workflowDescription"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Description du processus de workflow..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Validation">Validation</SelectItem>
                  <SelectItem value="Publication">Publication</SelectItem>
                  <SelectItem value="Révision">Révision</SelectItem>
                  <SelectItem value="Approbation">Approbation</SelectItem>
                  <SelectItem value="Contrôle">Contrôle</SelectItem>
                  <SelectItem value="Archivage">Archivage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priorité</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Haute</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="low">Basse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Statut</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Actif">Actif</SelectItem>
                    <SelectItem value="Brouillon">Brouillon</SelectItem>
                    <SelectItem value="Suspendu">Suspendu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="triggerEvent">Événement déclencheur</Label>
              <Input
                id="triggerEvent"
                value={formData.triggerEvent}
                onChange={(e) => setFormData({...formData, triggerEvent: e.target.value})}
                placeholder="Ex: Soumission d'un nouveau texte"
              />
            </div>

            <div className="space-y-3">
              <Label>Résumé</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{steps.length} étapes</Badge>
                <Badge variant="secondary">{calculateTotalDuration()}</Badge>
                <Badge className="bg-green-100 text-green-800">{formData.status}</Badge>
              </div>
            </div>
          </div>

          {/* Étapes du workflow */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Étapes du workflow</h3>
              <Button onClick={addStep} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une étape
              </Button>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {steps.map((step, index) => (
                <Card key={step.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Étape {index + 1}</CardTitle>
                      {steps.length > 1 && (
                        <Button
                          onClick={() => removeStep(step.id)}
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Nom de l'étape</Label>
                      <Input
                        value={step.name}
                        onChange={(e) => updateStep(step.id, 'name', e.target.value)}
                        placeholder="Nom de l'étape"
                        className="text-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        value={step.description}
                        onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                        placeholder="Description de l'étape"
                        rows={2}
                        className="text-sm"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label className="text-xs">Assigné à</Label>
                        <Select
                          value={step.assignee}
                          onValueChange={(value) => updateStep(step.id, 'assignee', value)}
                        >
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="Assigné à" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrateur</SelectItem>
                            <SelectItem value="reviewer">Réviseur</SelectItem>
                            <SelectItem value="approver">Approbateur</SelectItem>
                            <SelectItem value="publisher">Publicateur</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs">Durée (heures)</Label>
                        <Input
                          type="number"
                          value={step.duration}
                          onChange={(e) => updateStep(step.id, 'duration', e.target.value)}
                          placeholder="24"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            <Workflow className="w-4 h-4 mr-2" />
            Créer le Workflow
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
