
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target, Bot, LineChart, PieChart, FileText, FileSpreadsheet, Download } from 'lucide-react';
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const performanceData = [
  { month: 'Jan', performance: 85, utilisation: 78, satisfaction: 92, conformité: 88 },
  { month: 'Fév', performance: 88, utilisation: 82, satisfaction: 90, conformité: 91 },
  { month: 'Mar', performance: 92, utilisation: 85, satisfaction: 94, conformité: 89 },
  { month: 'Avr', performance: 87, utilisation: 88, satisfaction: 91, conformité: 93 },
  { month: 'Mai', performance: 94, utilisation: 91, satisfaction: 96, conformité: 95 },
  { month: 'Jun', performance: 91, utilisation: 89, satisfaction: 93, conformité: 92 }
];

const domainData = [
  { name: 'Juridique', value: 35, color: '#3b82f6' },
  { name: 'Administratif', value: 28, color: '#10b981' },
  { name: 'Fiscal', value: 22, color: '#f59e0b' },
  { name: 'Social', value: 15, color: '#ef4444' }
];

export function PerformanceAnalysis() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Analyse de Performance
          </CardTitle>
          <CardDescription>
            Analysez vos performances détaillées avec l'assistance IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contrôles */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <Select defaultValue="month">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="quarter">Ce trimestre</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les métriques</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="usage">Utilisation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Bot className="w-4 h-4 mr-2" />
              Analyse IA
            </Button>
          </div>

          {/* Graphiques avec données réelles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Évolution des Performances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="performance" stroke="#3b82f6" strokeWidth={2} name="Performance" />
                      <Line type="monotone" dataKey="utilisation" stroke="#10b981" strokeWidth={2} name="Utilisation" />
                      <Line type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={2} name="Satisfaction" />
                      <Line type="monotone" dataKey="conformité" stroke="#ef4444" strokeWidth={2} name="Conformité" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Répartition par Domaine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={domainData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {domainData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export et Actions fonctionnels */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export et Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    console.log('Export PDF déclenché');
                    // Simulation d'export PDF
                    const link = document.createElement('a');
                    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovT3V0bGluZXMgMiAwIFIKL1BhZ2VzIDMgMCBSCj4+CmVuZG9iago=';
                    link.download = 'rapport-performance.pdf';
                    link.click();
                  }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    console.log('Export Excel déclenché');
                    const csvContent = "data:text/csv;charset=utf-8," + 
                      "Mois,Performance,Utilisation,Satisfaction,Conformité\n" +
                      performanceData.map(row => `${row.month},${row.performance},${row.utilisation},${row.satisfaction},${row.conformité}`).join("\n");
                    const link = document.createElement('a');
                    link.href = encodeURI(csvContent);
                    link.download = 'performance-data.csv';
                    link.click();
                  }}
                >
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    console.log('Export JSON déclenché');
                    const jsonData = JSON.stringify(performanceData, null, 2);
                    const blob = new Blob([jsonData], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'performance-data.json';
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
