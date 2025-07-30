
// @ts-nocheck
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { AlertFormFields } from './alert/AlertFormFields';

interface AlertManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert?: Record<string, unknown>;
  onSave: (alertData: Record<string, unknown>) => void;
}

export function AlertManagementModal({ isOpen, onClose, alert, onSave }: AlertManagementModalProps) {
  const [formData, setFormData] = useState({
    title: alert?.title || '',
    message: alert?.message || '',
    type: alert?.type || 'info',
    priority: alert?.priority || 'medium',
    targetUsers: alert?.targetUsers || 'all',
    startDate: alert?.startDate || '',
    endDate: alert?.endDate || '',
    isActive: alert?.isActive ?? true,
    sendEmail: alert?.sendEmail ?? false,
    sendNotification: alert?.sendNotification ?? true
  });

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            {alert ? 'Modifier l\'alerte' : 'Nouvelle alerte'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <AlertFormFields formData={formData} setFormData={setFormData} />
        </div>

        <div className="flex justify-end space-x-2">
          <Button onClick={handleSave}>
            {alert ? 'Modifier' : 'Créer'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
