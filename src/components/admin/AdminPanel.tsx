
import React from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRoleManager } from './UserRoleManager';
import { UserStats } from './UserStats';
import { TestDataGenerator } from './TestDataGenerator';
import { SecurityMonitor } from '@/components/common/SecurityMonitor';
import { Settings, Users, Database, Shield } from 'lucide-react';

export function AdminPanel() {
  const { userRole } = useAuth();

  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Accès restreint</h2>
            <p className="text-gray-600">
              Cette page est réservée aux administrateurs
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Settings className="w-8 h-8" />
          Panneau d'administration
        </h1>
        <p className="text-gray-600 mt-2">
          Gestion des utilisateurs, données et sécurité de l'application
        </p>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Utilisateurs
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Données
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Sécurité
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <UserStats />
          <UserRoleManager />
        </TabsContent>

        <TabsContent value="data">
          <TestDataGenerator />
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring de sécurité</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Le système de monitoring de sécurité fonctionne en arrière-plan.
                Les alertes apparaîtront automatiquement en bas à droite de l'écran.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">
                  ✓ Système de sécurité actif
                </p>
                <p className="text-green-600 text-sm mt-1">
                  Surveillance des tentatives d'intrusion, validation des entrées, 
                  et logging des événements de sécurité
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <SecurityMonitor />
    </div>
  );
}

