
// @ts-nocheck
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Bell, Info, AlertCircle } from 'lucide-react';

interface AlertFormFieldsProps {
  formData: Record<string, unknown>;
  setFormData: (data: Record<string, unknown>) => void;
}

export function AlertFormFields({ formData, setFormData }: AlertFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titre *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="Titre de l'alerte"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          placeholder="Contenu de l'alerte"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Information
                </div>
              </SelectItem>
              <SelectItem value="warning">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Avertissement
                </div>
              </SelectItem>
              <SelectItem value="error">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Erreur
                </div>
              </SelectItem>
              <SelectItem value="success">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Succès
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Priorité</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Faible</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="high">Élevée</SelectItem>
              <SelectItem value="critical">Critique</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Utilisateurs ciblés</Label>
        <Select value={formData.targetUsers} onValueChange={(value) => setFormData({...formData, targetUsers: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les utilisateurs</SelectItem>
            <SelectItem value="admins">Administrateurs uniquement</SelectItem>
            <SelectItem value="editors">Éditeurs uniquement</SelectItem>
            <SelectItem value="users">Utilisateurs standard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Date de début</Label>
          <Input
            id="startDate"
            type="datetime-local"
            value={formData.startDate}
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">Date de fin</Label>
          <Input
            id="endDate"
            type="datetime-local"
            value={formData.endDate}
            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData({...formData, isActive: !!checked})}
          />
          <Label htmlFor="isActive">Alerte active</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="sendEmail"
            checked={formData.sendEmail}
            onCheckedChange={(checked) => setFormData({...formData, sendEmail: !!checked})}
          />
          <Label htmlFor="sendEmail">Envoyer par email</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="sendNotification"
            checked={formData.sendNotification}
            onCheckedChange={(checked) => setFormData({...formData, sendNotification: !!checked})}
          />
          <Label htmlFor="sendNotification">Notification dans l'app</Label>
        </div>
      </div>
    </div>
  );
}
