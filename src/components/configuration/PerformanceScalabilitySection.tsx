
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  Cloud, 
  Server, 
  Database, 
  Zap, 
  Activity, 
  BarChart3,
  Shield,
  Layers,
  GitBranch,
  Cpu,
  HardDrive,
  Network,
  Globe,
  Lock,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Settings
} from "lucide-react";

interface PerformanceScalabilitySectionProps {
  language?: string;
}

export function PerformanceScalabilitySection({ language = "fr" }: PerformanceScalabilitySectionProps) {
  const cloudMetrics = [
    { name: "Instances actives", value: "12", status: "healthy", icon: Server },
    { name: "Auto-scaling", value: "Activé", status: "active", icon: TrendingUp },
    { name: "Load balancer", value: "99.9%", status: "optimal", icon: Network },
    { name: "CDN", value: "Global", status: "distributed", icon: Globe }
  ];

  const performanceMetrics = [
    { metric: "Temps de réponse API", value: "45ms", target: "< 100ms", status: "excellent" },
    { metric: "Débit requêtes/sec", value: "2,450", target: "> 1,000", status: "good" },
    { metric: "Disponibilité", value: "99.97%", target: "> 99.9%", status: "excellent" },
    { metric: "Latence base de données", value: "12ms", target: "< 50ms", status: "excellent" }
  ];

  const microservices = [
    { name: "Auth Service", status: "running", instances: 3, cpu: 45, memory: 62, version: "v2.1.0" },
    { name: "Legal Service", status: "running", instances: 4, cpu: 38, memory: 55, version: "v1.8.2" },
    { name: "Search Service", status: "running", instances: 2, cpu: 67, memory: 71, version: "v3.0.1" },
    { name: "Document Service", status: "running", instances: 3, cpu: 52, memory: 48, version: "v1.5.4" },
    { name: "Notification Service", status: "running", instances: 2, cpu: 23, memory: 35, version: "v2.0.0" },
    { name: "Analytics Service", status: "running", instances: 2, cpu: 78, memory: 82, version: "v1.2.3" },
    { name: "OCR Service", status: "running", instances: 3, cpu: 89, memory: 91, version: "v2.3.1" },
    { name: "API Gateway", status: "running", instances: 2, cpu: 34, memory: 41, version: "v1.9.0" },
    { name: "User Management", status: "running", instances: 2, cpu: 28, memory: 33, version: "v1.6.2" },
    { name: "File Storage", status: "running", instances: 3, cpu: 56, memory: 67, version: "v2.0.5" },
    { name: "Reporting Service", status: "running", instances: 2, cpu: 71, memory: 76, version: "v1.4.8" },
    { name: "Integration Service", status: "running", instances: 2, cpu: 42, memory: 49, version: "v1.7.3" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Pagination pour les microservices
  const {
    currentData: paginatedMicroservices,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: microservices,
    itemsPerPage: 5
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="cloud-native" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cloud-native">Architecture Cloud-Native</TabsTrigger>
          <TabsTrigger value="performance">Métriques Performance</TabsTrigger>
          <TabsTrigger value="microservices">Microservices</TabsTrigger>
          <TabsTrigger value="optimization">Optimisations</TabsTrigger>
        </TabsList>

        <TabsContent value="cloud-native" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cloudMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index}>
                  <CardContent className="pt-6 text-center">
                    <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-600 mb-2">{metric.name}</div>
                    <Badge className={
                      metric.status === 'healthy' ? 'bg-green-100 text-green-800' :
                      metric.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      metric.status === 'optimal' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }>
                      {metric.status}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-blue-600" />
                  Infrastructure Cloud
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Kubernetes Cluster</span>
                    <Badge className="bg-green-100 text-green-800">Actif</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Docker Containers</span>
                    <Badge className="bg-blue-100 text-blue-800">24 Running</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Helm Charts</span>
                    <Badge className="bg-purple-100 text-purple-800">Déployé</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Service Mesh</span>
                    <Badge className="bg-orange-100 text-orange-800">Istio</Badge>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-1" />
                    Configurer
                  </Button>
                  <Button variant="outline" size="sm">
                    <Activity className="w-4 h-4 mr-1" />
                    Monitoring
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Sécurité & Conformité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>WAF (Web Application Firewall)</span>
                    <Badge className="bg-green-100 text-green-800">Actif</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>DDoS Protection</span>
                    <Badge className="bg-green-100 text-green-800">Cloudflare</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>SSL/TLS</span>
                    <Badge className="bg-green-100 text-green-800">A+ Grade</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Vulnerability Scanning</span>
                    <Badge className="bg-blue-100 text-blue-800">Quotidien</Badge>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Lock className="w-4 h-4 mr-1" />
                    Audit sécurité
                  </Button>
                  <Button variant="outline" size="sm">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Alertes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{metric.metric}</h4>
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.status === 'excellent' ? 'Excellent' :
                       metric.status === 'good' ? 'Bon' : 'À surveiller'}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
                  <div className="text-sm text-gray-600">Objectif: {metric.target}</div>
                  <Progress 
                    value={metric.status === 'excellent' ? 95 : metric.status === 'good' ? 75 : 50} 
                    className="mt-3" 
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Graphiques de Performance (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Graphiques de performance en temps réel</p>
                  <p className="text-sm text-gray-500">Intégration avec Grafana/Prometheus</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="microservices" className="space-y-4">
          <div className="space-y-4">
            {paginatedMicroservices.map((service, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <h4 className="font-semibold text-gray-900">{service.name}</h4>
                      <Badge variant="outline">{service.version}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        {service.instances} instances
                      </Badge>
                      <Badge className="bg-green-100 text-green-800">
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">CPU</span>
                        <span className="text-sm font-medium">{service.cpu}%</span>
                      </div>
                      <Progress value={service.cpu} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">Mémoire</span>
                        <span className="text-sm font-medium">{service.memory}%</span>
                      </div>
                      <Progress value={service.memory} className="h-2" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Activity className="w-4 h-4 mr-1" />
                      Logs
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Config
                    </Button>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Scale
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-red-600" />
                  Optimisations CPU
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Compilation JIT</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cache processeur</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Algorithmes optimisés</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Parallélisation</span>
                    <Clock className="w-4 h-4 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  Optimisations Base de Données
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Index optimisés</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Query planning</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Connection pooling</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cache Redis</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-purple-600" />
                  Optimisations Stockage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Compression données</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>SSD haute performance</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Archivage intelligent</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Déduplication</span>
                    <Clock className="w-4 h-4 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-green-600" />
                  Optimisations Réseau
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>CDN global</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Compression Gzip</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>HTTP/2 & HTTP/3</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Load balancing</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
