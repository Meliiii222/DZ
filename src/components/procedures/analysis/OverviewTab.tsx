import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  FileText, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Users,
  BarChart3
} from 'lucide-react';
import { ProcedureComplexityChart } from './ProcedureComplexityChart';
import { ProcedureMetrics } from './types';
import { getComplexityLevel } from './utils';

interface OverviewTabProps {
  procedures: ProcedureMetrics[];
}

export function OverviewTab({ procedures }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Graphique de complexité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Analyse de Complexité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProcedureComplexityChart procedures={procedures} />
        </CardContent>
      </Card>

      {/* Liste des procédures avec métriques */}
      <Card>
        <CardHeader>
          <CardTitle>Détail des Procédures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {procedures.map((procedure) => {
              const complexity = getComplexityLevel(procedure.complexityScore);
              return (
                <div key={procedure.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold">{procedure.name}</h4>
                    <Badge className={`${complexity.bg} ${complexity.color} border-0`}>
                      {complexity.level}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{procedure.averageTime} jours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span>{procedure.documents} documents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-green-600" />
                      <span>{procedure.administrations} administrations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-yellow-600" />
                      <span>{procedure.cost.toLocaleString()} DA</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>Taux de réussite: {procedure.successRate}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {procedure.trends.satisfactionChange > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={procedure.trends.satisfactionChange > 0 ? 'text-green-600' : 'text-red-600'}>
                        {Math.abs(procedure.trends.satisfactionChange)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}