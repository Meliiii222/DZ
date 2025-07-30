
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface LegalTrendsChartProps {
  period: string;
  detailed?: boolean;
}

export function LegalTrendsChart({ period, detailed = false }: LegalTrendsChartProps) {
  // Données simulées basées sur la période
  const generateData = () => {
    const baseData = [
      { name: 'Jan', nouveauxTextes: 45, modifications: 23, abrogations: 12 },
      { name: 'Fév', nouveauxTextes: 52, modifications: 31, abrogations: 8 },
      { name: 'Mar', nouveauxTextes: 38, modifications: 18, abrogations: 15 },
      { name: 'Avr', nouveauxTextes: 61, modifications: 42, abrogations: 7 },
      { name: 'Mai', nouveauxTextes: 55, modifications: 35, abrogations: 11 },
      { name: 'Jun', nouveauxTextes: 48, modifications: 28, abrogations: 9 }
    ];
    return baseData;
  };

  const data = generateData();

  if (detailed) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Évolution des Textes Juridiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="nouveauxTextes" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Nouveaux textes"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="modifications" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Modifications"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="abrogations" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Abrogations"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="nouveauxTextes" fill="#3b82f6" name="Nouveaux textes" />
                  <Bar dataKey="modifications" fill="#f59e0b" name="Modifications" />
                  <Bar dataKey="abrogations" fill="#ef4444" name="Abrogations" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Tendances Juridiques
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="nouveauxTextes" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Nouveaux textes"
              />
              <Line 
                type="monotone" 
                dataKey="modifications" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Modifications"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
