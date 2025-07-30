
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  Brain, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Zap,
  FileText,
  Search,
  Database,
  Settings,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  progress: number;
  startTime?: string;
  endTime?: string;
  result?: string;
}

interface Agent {
  id: string;
  name: string;
  specialty: string;
  status: 'active' | 'idle' | 'busy';
  tasksCompleted: number;
  currentTask?: string;
}

export function AutonomousAgent() {
  // État pour l'agent autonome
  const [isAgentActive, setIsAgentActive] = useState(false);
  const [agentStatus, setAgentStatus] = useState('inactive');

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Analyse jurisprudentielle',
      description: 'Analyse automatique des arrêts de la Cour suprême',
      status: 'completed',
      progress: 100,
      startTime: '14:30',
      endTime: '14:45',
      result: '15 arrêts analysés, 3 tendances identifiées'
    },
    {
      id: '2',
      title: 'Veille législative',
      description: 'Surveillance des nouveaux textes publiés',
      status: 'in-progress',
      progress: 60,
      startTime: '14:50'
    },
    {
      id: '3',
      title: 'Consolidation automatique',
      description: 'Mise à jour des textes consolidés',
      status: 'pending',
      progress: 0
    }
  ]);

  const [agents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Agent Jurisprudence',
      specialty: 'Analyse des décisions judiciaires',
      status: 'active',
      tasksCompleted: 127,
      currentTask: 'Analyse jurisprudentielle'
    },
    {
      id: '2',
      name: 'Agent Veille',
      specialty: 'Surveillance réglementaire',
      status: 'busy',
      tasksCompleted: 89,
      currentTask: 'Veille législative'
    },
    {
      id: '3',
      name: 'Agent Consolidation',
      specialty: 'Consolidation de textes',
      status: 'idle',
      tasksCompleted: 234
    }
  ]);

  const capabilities = [
    {
      icon: <Search className="w-5 h-5 text-blue-600" />,
      title: 'Recherche Autonome',
      description: 'Recherche et analyse automatique de sources juridiques',
      active: true
    },
    {
      icon: <Database className="w-5 h-5 text-green-600" />,
      title: 'Mise à jour des Données',
      description: 'Actualisation automatique de la base de données',
      active: true
    },
    {
      icon: <FileText className="w-5 h-5 text-purple-600" />,
      title: 'Génération de Rapports',
      description: 'Création automatique de synthèses et rapports',
      active: false
    },
    {
      icon: <Target className="w-5 h-5 text-orange-600" />,
      title: 'Détection d\'Anomalies',
      description: 'Identification automatique d\'incohérences',
      active: true
    }
  ];

  // Fonction de toggle de l'agent autonome
  const handleToggleAgent = () => {
    setIsAgentActive(!isAgentActive);
    setAgentStatus(isAgentActive ? 'inactive' : 'active');
    
    if (!isAgentActive) {
      // Activation de l'agent autonome
      console.log('Agent autonome activé - surveillance et actions automatiques en cours');
    } else {
      // Désactivation de l'agent autonome
      console.log('Agent autonome désactivé');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Contrôle principal */}
      <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-purple-600" />
            IA Agentique Autonome
            <Badge className={`ml-2 ${isAgentActive ? 'bg-green-500' : 'bg-gray-500'}`}>
              {isAgentActive ? 'Actif' : 'Inactif'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleToggleAgent}
                className={`${
                  isAgentActive 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isAgentActive ? 'Désactiver' : 'Activer'} l'agent
              </Button>
              
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {isAgentActive ? 'Agents en fonctionnement' : 'Agents en veille'}
                </span>
                <span className="text-xs text-gray-500">
                  {isAgentActive ? `${agents.filter(a => a.status === 'active' || a.status === 'busy').length} agents actifs` : 'Tous les agents arrêtés'}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">
                {agents.reduce((sum, agent) => sum + agent.tasksCompleted, 0)}
              </div>
              <div className="text-sm text-gray-600">Tâches complétées</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agents disponibles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            Agents Spécialisés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{agent.name}</h4>
                  <Badge 
                    variant={agent.status === 'active' ? 'default' : agent.status === 'busy' ? 'destructive' : 'secondary'}
                  >
                    {agent.status === 'active' ? 'Actif' : agent.status === 'busy' ? 'Occupé' : 'Libre'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{agent.specialty}</p>
                <div className="flex items-center justify-between text-sm">
                  <span>{agent.tasksCompleted} tâches</span>
                  {agent.currentTask && (
                    <span className="text-blue-600 text-xs">{agent.currentTask}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tâches en cours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            Tâches Automatisées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    <h4 className="font-semibold">{task.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {task.startTime && (
                      <span className="text-sm text-gray-500">
                        {task.startTime}{task.endTime ? ` - ${task.endTime}` : ''}
                      </span>
                    )}
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                
                <div className="flex items-center justify-between">
                  <Progress value={task.progress} className="flex-1 mr-4" />
                  <span className="text-sm font-medium">{task.progress}%</span>
                </div>
                
                {task.result && (
                  <div className="mt-3 p-2 bg-green-50 rounded text-sm text-green-800">
                    <strong>Résultat:</strong> {task.result}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Capacités de l'IA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            Capacités Autonomes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((capability, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="flex-shrink-0">
                  {capability.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{capability.title}</h4>
                  <p className="text-sm text-gray-600">{capability.description}</p>
                </div>
                <Badge variant={capability.active ? 'default' : 'secondary'}>
                  {capability.active ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
