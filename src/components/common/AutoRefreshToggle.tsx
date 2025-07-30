import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Clock } from "lucide-react";

interface AutoRefreshToggleProps {
  onRefresh: () => void;
  className?: string;
}

const REFRESH_INTERVALS = [
  { value: '5', label: '5 secondes' },
  { value: '10', label: '10 secondes' },
  { value: '30', label: '30 secondes' },
  { value: '60', label: '1 minute' },
  { value: '300', label: '5 minutes' },
  { value: '600', label: '10 minutes' }
];

export const AutoRefreshToggle: React.FC<AutoRefreshToggleProps> = ({ 
  onRefresh, 
  className = "" 
}) => {
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState('30');
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let countdown: NodeJS.Timeout;

    if (isAutoRefreshEnabled) {
      const intervalMs = parseInt(refreshInterval) * 1000;
      setTimeRemaining(parseInt(refreshInterval));

      // Interval principal pour l'auto-refresh
      interval = setInterval(() => {
        onRefresh();
        setTimeRemaining(parseInt(refreshInterval));
      }, intervalMs);

      // Countdown timer
      countdown = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            return parseInt(refreshInterval);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (countdown) clearInterval(countdown);
    };
  }, [isAutoRefreshEnabled, refreshInterval, onRefresh]);

  const toggleAutoRefresh = () => {
    setIsAutoRefreshEnabled(prev => !prev);
    if (!isAutoRefreshEnabled) {
      setTimeRemaining(parseInt(refreshInterval));
    }
  };

  const handleManualRefresh = () => {
    onRefresh();
    if (isAutoRefreshEnabled) {
      setTimeRemaining(parseInt(refreshInterval));
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleManualRefresh}
        className="flex items-center gap-2 h-9"
      >
        <RefreshCw className="w-4 h-4" />
        Actualiser
      </Button>
      
      <div className="flex items-center gap-2 border rounded-md p-1">
        <Button
          variant={isAutoRefreshEnabled ? "default" : "ghost"}
          size="sm"
          onClick={toggleAutoRefresh}
          className="flex items-center gap-1 h-8"
        >
          <Clock className="w-3 h-3" />
          Auto
          {isAutoRefreshEnabled && (
            <span className="text-xs bg-white/20 px-1 rounded">
              {timeRemaining}s
            </span>
          )}
        </Button>
        
        <Select
          value={refreshInterval}
          onValueChange={setRefreshInterval}
          disabled={isAutoRefreshEnabled}
        >
          <SelectTrigger className="w-24 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {REFRESH_INTERVALS.map((interval) => (
              <SelectItem key={interval.value} value={interval.value}>
                {interval.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};