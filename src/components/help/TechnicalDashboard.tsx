import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Shield, 
  Zap, 
  Database, 
  Users, 
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Server,
  Globe,
  Cpu
} from 'lucide-react';

export function TechnicalDashboard() {
  const systemStats = [
    {
      title: "État du système",
      value: "Opérationnel",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Performance",
      value: "98.5%",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Sécurité",
      value: "Niveau élevé",
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      title: "Disponibilité",
      value: "99.9%",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ];

  const technicalMetrics = [
    {
      label: "Architecture",
      description: "Microservices & Cloud",
      progress: 95,
      status: "Optimisé",
      icon: Server
    },
    {
      label: "APIs",
      description: "REST & GraphQL",
      progress: 90,
      status: "Documenté",
      icon: Globe
    },
    {
      label: "Performance",
      description: "Temps de réponse < 200ms",
      progress: 88,
      status: "Surveillé",
      icon: Zap
    },
    {
      label: "Sécurité",
      description: "Chiffrement end-to-end",
      progress: 92,
      status: "Certifié",
      icon: Shield
    }
  ];

  const recentUpdates = [
    {
      title: "API v2.1 déployée",
      time: "Il y a 2 heures",
      type: "success"
    },
    {
      title: "Optimisation cache",
      time: "Il y a 1 jour", 
      type: "info"
    },
    {
      title: "Maintenance planifiée",
      time: "Dans 3 jours",
      type: "warning"
    }
  ];

  // Obtenir l'heure actuelle pour l'affichage
  const currentTime = new Date().toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="space-y-4 mb-6">
      {/* En-tête compact */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Tableau de bord technique
          </h3>
          <p className="text-sm text-gray-600">État des systèmes en temps réel • Dernière mise à jour: {currentTime}</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Opérationnel
        </Badge>
      </div>

      {/* Statistiques compactes */}
      <Card className="border-2 border-gray-100">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {systemStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{stat.title}</p>
                    <p className={`text-sm font-semibold ${stat.color}`}>{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Métriques en ligne */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              Performance système
            </h4>
            <div className="space-y-3">
              {technicalMetrics.slice(0, 2).map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <Icon className="w-3 h-3 text-gray-500" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{metric.label}</span>
                        <span className="text-xs text-gray-500">{metric.progress}%</span>
                      </div>
                      <Progress value={metric.progress} className="h-1.5" />
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      {metric.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              Activité récente
            </h4>
            <div className="space-y-2">
              {recentUpdates.slice(0, 2).map((update, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-md bg-gray-50">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    update.type === 'success' ? 'bg-green-500' :
                    update.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{update.title}</p>
                    <p className="text-xs text-gray-500">{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indicateurs rapides compacts */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
          <Database className="w-3 h-3 mr-1" />
          DB: Optimale
        </Badge>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
          <Users className="w-3 h-3 mr-1" />
          1,247 actifs
        </Badge>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
          <Globe className="w-3 h-3 mr-1" />
          CDN: 12ms
        </Badge>
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
          <Zap className="w-3 h-3 mr-1" />
          API: 156ms
        </Badge>
      </div>
    </div>
  );
}