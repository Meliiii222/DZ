
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, AlertCircle, RefreshCw } from 'lucide-react';
import { UnifiedModalProps } from './ModalConfig';
import { cn } from '@/lib/utils';

const sizeClasses = {
  small: 'max-w-sm',
  medium: 'max-w-md',
  large: 'max-w-lg',
  xl: 'max-w-2xl',
  full: 'max-w-6xl max-h-[90vh]'
};

export function UnifiedModal({
  isOpen,
  onClose,
  title,
  icon: Icon,
  size = 'medium',
  className,
  showCloseButton = true,
  preventClose = false,
  children,
  footer,
  primaryAction,
  secondaryActions = [],
  onError
}: UnifiedModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleClose = () => {
    if (!preventClose && !isLoading) {
      onClose();
    }
  };

  const handleAction = async (action: () => void) => {
    try {
      setIsLoading(true);
      setError(null);
      await action();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={preventClose ? undefined : handleClose}>
      <DialogContent 
        className={cn(
          sizeClasses[size],
          'animate-fade-in overflow-hidden',
          className
        )}
      >
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3 flex-1">
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          </div>
          {showCloseButton && !preventClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={isLoading}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer</span>
            </Button>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-auto py-4">
          {error ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Une erreur s'est produite
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => setError(null)} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Réessayer
              </Button>
            </div>
          ) : (
            children
          )}
        </div>

        {(footer || primaryAction || secondaryActions.length > 0) && (
          <div className="border-t pt-4 mt-4">
            {footer || (
              <div className="flex justify-end gap-2">
                {secondaryActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || 'outline'}
                    onClick={() => handleAction(action.onClick)}
                    disabled={action.disabled || isLoading}
                    className="gap-2"
                  >
                    {action.icon && <action.icon className="h-4 w-4" />}
                    {action.label}
                  </Button>
                ))}
                {primaryAction && (
                  <Button
                    variant={primaryAction.variant || 'default'}
                    onClick={() => handleAction(primaryAction.onClick)}
                    disabled={primaryAction.disabled || isLoading}
                    className="gap-2"
                  >
                    {primaryAction.icon && <primaryAction.icon className="h-4 w-4" />}
                    {primaryAction.label}
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
