
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'outline' | 'destructive' | 'secondary';
  onClick: () => void;
  disabled?: boolean;
}

interface UnifiedSectionHeaderProps {
  icon: LucideIcon | (() => React.ReactNode);
  title: string;
  description: string;
  iconColor?: string;
  primaryActions?: ActionButton[];
  headerVariant?: 'default' | 'centered';
  children?: React.ReactNode;
}

export function UnifiedSectionHeader({
  icon,
  title,
  description,
  iconColor = "text-teal-600",
  primaryActions = [],
  headerVariant = 'default',
  children
}: UnifiedSectionHeaderProps) {
  const renderIcon = () => {
    if (typeof icon === 'function') {
      return (icon as () => React.ReactNode)();
    } else {
      const IconComponent = icon as LucideIcon;
      return <IconComponent className={`w-12 h-12 ${iconColor}`} />;
    }
  };

  return (
    <Card className="mb-6 border-l-4 border-l-teal-500">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            {renderIcon()}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          {primaryActions.length > 0 && (
            <div className="flex gap-2">
              {primaryActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.onClick}
                  variant={action.variant || 'default'}
                  disabled={action.disabled}
                  className="gap-2"
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
