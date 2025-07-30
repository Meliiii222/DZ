import { Card, CardContent } from '@/components/ui/card';
import { Clock, FileText, BarChart3, Target } from 'lucide-react';
import { AverageMetrics } from './types';

interface MetricsOverviewProps {
  averageMetrics: AverageMetrics;
}

export function MetricsOverview({ averageMetrics }: MetricsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Délai Moyen</p>
              <p className="text-2xl font-bold">{averageMetrics.time}j</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Étapes Moyennes</p>
              <p className="text-2xl font-bold">{averageMetrics.steps}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documents Moyens</p>
              <p className="text-2xl font-bold">{averageMetrics.documents}</p>
            </div>
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Complexité Moyenne</p>
              <p className="text-2xl font-bold">{averageMetrics.complexity}/10</p>
            </div>
            <Target className="w-8 h-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}