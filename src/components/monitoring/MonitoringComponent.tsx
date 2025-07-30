import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from "@/components/common/SectionHeader";
import { Activity, Server, Database, AlertTriangle } from 'lucide-react';

export function MonitoringComponent() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="📊 Surveillance"
        description="Monitoring et surveillance des performances du système"
        icon={Activity}
        iconColor="text-green-600"
      />

      {/* Statut général */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Server className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Serveur</p>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  En ligne
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Database className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Base de données</p>
                <Badge variant="default" className="bg-blue-100 text-blue-800">
                  Connectée
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Performance</p>
                <Badge variant="default" className="bg-orange-100 text-orange-800">
                  Optimale
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Alertes</p>
                <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                  0 Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Détails monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Métriques Système
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>CPU Usage</span>
                  <span>23%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Memory Usage</span>
                  <span>67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Storage</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Services OCR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Service Extraction PDF</span>
                <Badge className="bg-green-100 text-green-800">Actif</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Service Mapping IA</span>
                <Badge className="bg-green-100 text-green-800">Actif</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Service Traitement Lot</span>
                <Badge className="bg-green-100 text-green-800">Actif</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Service Analytics</span>
                <Badge className="bg-green-100 text-green-800">Actif</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informations */}
      <Card>
        <CardHeader>
          <CardTitle>Informations de Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Le monitoring surveille en temps réel l'état des services OCR et IA</p>
            <p>• Les métriques sont collectées toutes les 30 secondes</p>
            <p>• Les alertes sont configurées pour notifier en cas de problème</p>
            <p>• Les logs détaillés sont disponibles dans la section Analytics</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}