
// @ts-nocheck
import React from 'react';
import { Button } from '@/components/ui/button';
import { ActionButtonProps } from './types/actionTypes';
import { actionConfig } from './config/actionConfig';
import { actionHandlers, createActionHandler } from './handlers/actionHandlers';

export function ActionButton({ 
  action, 
  variant, 
  size = 'default', 
  className = '', 
  children, 
  data,
  itemId = '',
  itemTitle = '',
  onClick,
  disabled = false
}: ActionButtonProps) {
  const config = actionConfig[action];
  const Icon = config.icon;
  const finalVariant = variant || config.variant;

  const handleClick = createActionHandler(action, itemId, itemTitle, data, onClick);

  return (
    <Button
      variant={finalVariant}
      size={size}
      className={`${className} ${finalVariant === 'default' ? 'bg-teal-600 hover:bg-teal-700' : ''}`}
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      {size === 'icon' ? (
        <Icon className="w-4 h-4" />
      ) : (
        <>
          <Icon className="w-4 h-4 mr-2" />
          {children || config.label}
        </>
      )}
    </Button>
  );
}
