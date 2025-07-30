
// @ts-nocheck
import React, { useState } from 'react';
import { BaseModal } from './core/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Bell, Send } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification?: Record<string, unknown>;
  onSend?: (notification: Record<string, unknown>) => void;
}

export function NotificationModal({ isOpen, onClose, notification, onSend }: NotificationModalProps) {
  const [title, setTitle] = useState(notification?.title || '');
  const [message, setMessage] = useState(notification?.message || '');
  const [type, setType] = useState(notification?.type || 'info');
  const [priority, setPriority] = useState(notification?.priority || 'normal');
  const [sendEmail, setSendEmail] = useState(notification?.sendEmail || false);
  const [sendSMS, setSendSMS] = useState(notification?.sendSMS || false);
  const [targetUsers, setTargetUsers] = useState(notification?.targetUsers || 'all');

  const handleSend = () => {
    const notificationData = {
      id: notification?.id || Date.now().toString(),
      title,
      message,
      type,
      priority,
      sendEmail,
      sendSMS,
      targetUsers,
      sentAt: new Date(),
      status: 'sent'
    };
    
    onSend?.(notificationData);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={notification ? "Modifier la notification" : "Nouvelle notification"}
      size="xl"
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="notification-title">Titre de la notification</Label>
          <Input
            id="notification-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de la notification"
          />
        </div>

        <div>
          <Label htmlFor="notification-message">Message</Label>
          <Textarea
            id="notification-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Contenu du message"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Type de notification</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Information</SelectItem>
                <SelectItem value="success">Succès</SelectItem>
                <SelectItem value="warning">Avertissement</SelectItem>
                <SelectItem value="error">Erreur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Priorité</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Faible</SelectItem>
                <SelectItem value="normal">Normale</SelectItem>
                <SelectItem value="high">Élevée</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Destinataires</Label>
          <Select value={targetUsers} onValueChange={setTargetUsers}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les utilisateurs</SelectItem>
              <SelectItem value="admin">Administrateurs</SelectItem>
              <SelectItem value="juriste">Juristes</SelectItem>
              <SelectItem value="citoyen">Citoyens</SelectItem>
              <SelectItem value="custom">Utilisateurs spécifiques</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Canaux de diffusion</h4>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Envoyer par email</Label>
              <p className="text-sm text-gray-600">Notification par courrier électronique</p>
            </div>
            <Switch checked={sendEmail} onCheckedChange={setSendEmail} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Envoyer par SMS</Label>
              <p className="text-sm text-gray-600">Notification par message texte</p>
            </div>
            <Switch checked={sendSMS} onCheckedChange={setSendSMS} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button onClick={handleSend} disabled={!title.trim() || !message.trim()}>
          <Send className="w-4 h-4 mr-2" />
          Envoyer la notification
        </Button>
      </div>
    </BaseModal>
  );
}
