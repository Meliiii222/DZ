import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalDashboard } from "./dashboard/PersonalDashboard";
import { AIIcon } from "@/components/common/AIIcon";
import { 
  FileText, 
  Scale, 
  Users, 
  TrendingUp, 
  Calendar, 
  Bell, 
  Search, 
  BookOpen,
  MessageSquare,
  BarChart3,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye,
  Download,
  Share2,
  Star,
  Zap,
  Target,
  Activity,
  ClipboardList,
  LineChart,
  PieChart
} from "lucide-react";

interface DashboardProps {
  language?: string;
}

export function Dashboard({ language = "fr" }: DashboardProps) {
  const getText = (key: string) => {
    const translations = {
      fr: {
        welcome: "Bienvenue sur dalil.dz",
        subtitle: "Votre plateforme de veille juridique et réglementaire",
        aiAssistant: "Assistant IA Juridique",
        aiDescription: "Posez vos questions juridiques et obtenez des réponses précises",
        askQuestion: "Poser une question",
        quickAccess: "Accès rapide",
        stats: "Statistiques",
        recentTexts: "Textes récents",
        recentProcedures: "Procédures récentes",
        news: "Actualités",
        totalTexts: "Textes juridiques",
        totalProcedures: "Procédures",
        consultations: "Consultations",
        users: "Utilisateurs",
        pendingReviews: "Nombre des wilayas",
        consultationsEvolution: "Évolution des consultations",
        contentDistribution: "Répartition par type de contenu",
        topSearches: "Top des recherches",
        monthlyTrends: "Tendances mensuelles",
        recentActivity: "Activité récente",
        notifications: "Notifications",
        myTasks: "Mes tâches",
        recentDocuments: "Documents récents"
      },
      ar: {
        welcome: "مرحباً بكم في dalil.dz",
        subtitle: "منصتكم للمراقبة القانونية والتنظيمية",
        aiAssistant: "المساعد القانوني الذكي",
        aiDescription: "اطرح أسئلتك القانونية واحصل على إجابات دقيقة",
        askQuestion: "اطرح سؤالاً",
        quickAccess: "وصول سريع",
        stats: "الإحصائيات",
        recentTexts: "النصوص الحديثة",
        recentProcedures: "الإجراءات الحديثة",
        news: "الأخبار",
        totalTexts: "النصوص القانونية",
        totalProcedures: "الإجراءات",
        consultations: "الاستشارات",
        users: "المستخدمون",
        pendingReviews: "عدد الولايات",
        consultationsEvolution: "تطور الاستشارات",
        contentDistribution: "التوزيع حسب نوع المحتوى",
        topSearches: "أهم البحوث",
        monthlyTrends: "الاتجاهات الشهرية",
        recentActivity: "النشاط الأخير",
        notifications: "الإشعارات",
        myTasks: "مهامي",
        recentDocuments: "الوثائق الأخيرة"
      },
      en: {
        welcome: "Welcome to dalil.dz",
        subtitle: "Your legal and regulatory monitoring platform",
        aiAssistant: "Legal AI Assistant",
        aiDescription: "Ask your legal questions and get precise answers",
        askQuestion: "Ask a question",
        quickAccess: "Quick access",
        stats: "Statistics",
        recentTexts: "Recent texts",
        recentProcedures: "Recent procedures",
        news: "News",
        totalTexts: "Legal texts",
        totalProcedures: "Procedures",
        consultations: "Consultations",
        users: "Users",
        pendingReviews: "Number of wilayas",
        consultationsEvolution: "Consultations Evolution",
        contentDistribution: "Content Distribution",
        topSearches: "Top Searches",
        monthlyTrends: "Monthly Trends",
        recentActivity: "Recent Activity",
        notifications: "Notifications",
        myTasks: "My Tasks",
        recentDocuments: "Recent Documents"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['fr']] || key;
  };

  const handleAIAssistantClick = () => {
    console.log('AI Assistant button clicked - dispatching event to ai-assistant');
    window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: 'ai-assistant' }));
  };

  const quickActions = [
    {
      title: getText("legalAssistant"),
      description: getText("legalAssistantDesc"),
      icon: Search,
      color: "bg-green-500",
      onClick: handleAIAssistantClick
    },
    {
      title: getText("searchTexts"),
      description: getText("searchTextsDesc"),
      icon: Search,
      color: "bg-blue-500",
      onClick: () => window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: 'legal-catalog' }))
    },
    {
      title: getText("newProcedure"),
      description: getText("newProcedureDesc"),
      icon: FileText,
      color: "bg-purple-500",
      onClick: () => window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: 'procedures-catalog' }))
    }
  ];

  const stats = [
    {
      title: getText("totalTexts"),
      value: "2,847",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-500"
    },
    {
      title: getText("totalProcedures"),
      value: "1,234",
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-500"
    },
    {
      title: getText("consultations"),
      value: "89,456",
      change: "+23%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-500"
    },
    {
      title: getText("users"),
      value: "12,567",
      change: "+5%",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-500"
    }
  ];

  const consultationsEvolutionData = [
    { month: "Juil", consultations: 1200, procedures: 340, textes: 860 },
    { month: "Août", consultations: 1450, procedures: 420, textes: 1030 },
    { month: "Sept", consultations: 1680, procedures: 480, textes: 1200 },
    { month: "Oct", consultations: 1920, procedures: 550, textes: 1370 },
    { month: "Nov", consultations: 2150, procedures: 620, textes: 1530 },
    { month: "Déc", consultations: 2380, procedures: 680, textes: 1700 }
  ];

  const topSearchesData = [
    { term: "droit du travail", count: 1245, percentage: 100 },
    { term: "procédures administratives", count: 989, percentage: 79 },
    { term: "code civil", count: 756, percentage: 61 },
    { term: "jurisprudence", count: 623, percentage: 50 },
    { term: "fiscalité", count: 445, percentage: 36 }
  ];

  const monthlyTrendsData = [
    { metric: "Nouvelles inscriptions", value: "+23%", trend: "up", color: "text-green-600" },
    { metric: "Temps de session moyen", value: "+15%", trend: "up", color: "text-green-600" },
    { metric: "Taux de rebond", value: "-8%", trend: "down", color: "text-red-600" },
    { metric: "Satisfaction utilisateurs", value: "+12%", trend: "up", color: "text-green-600" }
  ];

  const contentDistributionData = [
    { type: "Textes juridiques", count: 1547, percentage: 45, color: "bg-blue-500" },
    { type: "Procédures", count: 1234, percentage: 36, color: "bg-green-500" },
    { type: "Jurisprudence", count: 432, percentage: 13, color: "bg-purple-500" },
    { type: "Formulaires", count: 201, percentage: 6, color: "bg-orange-500" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-white rounded-lg p-8" style={{ backgroundColor: '#40915d' }}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">
              {getText("welcome")}
            </h1>
            <p className="text-xl text-green-50 max-w-2xl">
              {getText("subtitle")}
            </p>
          </div>

          <div className="ml-8 bg-white/10 backdrop-blur rounded-lg p-6 max-w-sm">
            <div className="text-center">
              <AIIcon className="w-12 h-12 mx-auto mb-4" variant="white" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                {getText("aiAssistant")}
              </h3>
              <p className="text-green-100 text-sm mb-4">
                {getText("aiDescription")}
              </p>
              <Button 
                className="w-full bg-white text-green-600 hover:bg-green-50"
                onClick={handleAIAssistantClick}
              >
                <AIIcon className="w-4 h-4 mr-2" />
                {getText("askQuestion")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-600" />
            Actions rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: 'legal-enrichment' }))}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Ajouter un texte juridique</h3>
                <p className="text-sm text-gray-600">Enrichir la base de données juridique</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: 'procedures-enrichment' }))}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ClipboardList className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Ajouter une procédure</h3>
                <p className="text-sm text-gray-600">Enrichir le catalogue des procédures</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={handleAIAssistantClick}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <AIIcon className="w-6 h-6" variant="white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Assistant IA Juridique</h3>
                <p className="text-sm text-gray-600">Poser des questions juridiques</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5 text-blue-600" />
              {getText("consultationsEvolution")}
            </CardTitle>
            <CardDescription>Graphique des consultations (derniers 6 mois)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 p-4">
              <div className="h-full relative">
                <div className="absolute bottom-0 left-0 w-full h-full border-l-2 border-b-2 border-gray-300">
                  {[0, 25, 50, 75, 100].map((percent) => (
                    <div
                      key={percent}
                      className="absolute w-full border-t border-gray-200"
                      style={{ bottom: `${percent}%` }}
                    >
                      <span className="absolute -left-8 text-xs text-gray-500 -translate-y-1/2">
                        {Math.round((percent / 100) * 2500)}
                      </span>
                    </div>
                  ))}
                  
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="1"
                      points={consultationsEvolutionData
                        .map((data, index) => {
                          const x = (index / (consultationsEvolutionData.length - 1)) * 100;
                          const y = 100 - (data.consultations / 2500) * 100;
                          return `${x},${y}`;
                        })
                        .join(' ')}
                    />
                    
                    {consultationsEvolutionData.map((data, index) => {
                      const x = (index / (consultationsEvolutionData.length - 1)) * 100;
                      const y = 100 - (data.consultations / 2500) * 100;
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="2"
                          fill="#3B82F6"
                          className="hover:r-3 transition-all cursor-pointer"
                        />
                      );
                    })}
                  </svg>
                  
                  <div className="absolute -bottom-6 w-full flex justify-between text-xs text-gray-500">
                    {consultationsEvolutionData.map((data, index) => (
                      <span key={index}>{data.month}</span>
                    ))}
                  </div>
                </div>
                
                <div className="absolute top-0 right-0 text-xs">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Consultations totales</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-green-600" />
              {getText("contentDistribution")}
            </CardTitle>
            <CardDescription>Graphique en secteurs des contenus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contentDistributionData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${item.color}`}></div>
                    <span className="text-sm font-medium">{item.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-300`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Total des contenus: <span className="font-semibold">3,414</span></p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              {getText("topSearches")}
            </CardTitle>
            <CardDescription>Recherches les plus populaires</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSearchesData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{item.term}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-purple-600 rounded-full transition-all duration-300" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              {getText("monthlyTrends")}
            </CardTitle>
            <CardDescription>Indicateurs clés de performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyTrendsData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-8 rounded-full ${item.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-medium">{item.metric}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${item.color}`}>
                      {item.value}
                    </span>
                    {item.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <PersonalDashboard />
    </div>
  );
}
