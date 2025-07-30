
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  FileText, 
  Building2, 
  DollarSign, 
  Target,
  Users,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface ProcedureMetrics {
  id: string;
  name: string;
  averageTime: number;
  steps: number;
  documents: number;
  administrations: number;
  cost: number;
  complexityScore: number;
  successRate: number;
  userSatisfaction: number;
  feedbackCount: number;
  trends: {
    timeChange: number;
    satisfactionChange: number;
  };
}

interface ProcedureComparisonTableProps {
  procedures: ProcedureMetrics[];
  selectedProcedures: string[];
  onSelectionChange: (selected: string[]) => void;
}

export function ProcedureComparisonTable({ 
  procedures, 
  selectedProcedures, 
  onSelectionChange 
}: ProcedureComparisonTableProps) {
  const handleProcedureToggle = (procedureId: string) => {
    const isSelected = selectedProcedures.includes(procedureId);
    if (isSelected) {
      onSelectionChange(selectedProcedures.filter(id => id !== procedureId));
    } else if (selectedProcedures.length < 3) {
      onSelectionChange([...selectedProcedures, procedureId]);
    }
  };

  const getComplexityLevel = (score: number) => {
    if (score <= 3) return { level: 'Faible', color: 'text-green-600', bg: 'bg-green-50' };
    if (score <= 6) return { level: 'Modérée', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (score <= 8) return { level: 'Élevée', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { level: 'Très Élevée', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const comparedProcedures = procedures.filter(p => selectedProcedures.includes(p.id));

  return (
    <div className="space-y-6">
      {/* Sélection des procédures */}
      <Card>
        <CardHeader>
          <CardTitle>Sélectionner les Procédures à Comparer (max 3)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {procedures.map((procedure) => (
              <div key={procedure.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <Checkbox
                  checked={selectedProcedures.includes(procedure.id)}
                  onCheckedChange={() => handleProcedureToggle(procedure.id)}
                  disabled={!selectedProcedures.includes(procedure.id) && selectedProcedures.length >= 3}
                />
                <div className="flex-1">
                  <h4 className="font-medium">{procedure.name}</h4>
                  <p className="text-sm text-gray-600">
                    Complexité: {procedure.complexityScore}/10 | Délai: {procedure.averageTime}j
                  </p>
                </div>
                <Badge className={`${getComplexityLevel(procedure.complexityScore).bg} ${getComplexityLevel(procedure.complexityScore).color} border-0`}>
                  {getComplexityLevel(procedure.complexityScore).level}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tableau de comparaison */}
      {comparedProcedures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparaison Détaillée</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Métrique</th>
                    {comparedProcedures.map((procedure) => (
                      <th key={procedure.id} className="text-center p-3 font-medium min-w-32">
                        {procedure.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      Délai Moyen (jours)
                    </td>
                    {comparedProcedures.map((procedure) => (
                      <td key={procedure.id} className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-semibold">{procedure.averageTime}</span>
                          {procedure.trends.timeChange !== 0 && (
                            <span className={`text-xs flex items-center ${procedure.trends.timeChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {procedure.trends.timeChange > 0 ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {Math.abs(procedure.trends.timeChange)}%
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      Nombre d'Étapes
                    </td>
                    {comparedProcedures.map((procedure) => (
                      <td key={procedure.id} className="p-3 text-center font-semibold">
                        {procedure.steps}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-600" />
                      Documents Requis
                    </td>
                    {comparedProcedures.map((procedure) => (
                      <td key={procedure.id} className="p-3 text-center font-semibold">
                        {procedure.documents}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-orange-600" />
                      Administrations
                    </td>
                    {comparedProcedures.map((procedure) => (
                      <td key={procedure.id} className="p-3 text-center font-semibold">
                        {procedure.administrations}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-yellow-600" />
                      Coût (DA)
                    </td>
                    {comparedProcedures.map((procedure) => (
                      <td key={procedure.id} className="p-3 text-center font-semibold">
                        {procedure.cost.toLocaleString()}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-red-600" />
                      Score de Complexité
                    </td>
                    {comparedProcedures.map((procedure) => (
                      <td key={procedure.id} className="p-3 text-center">
                        <Badge className={`${getComplexityLevel(procedure.complexityScore).bg} ${getComplexityLevel(procedure.complexityScore).color} border-0`}>
                          {procedure.complexityScore}/10
                        </Badge>
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      Taux de Réussite (%)
                    </td>
                    {comparedProcedures.map((procedure) => (
                      <td key={procedure.id} className="p-3 text-center font-semibold">
                        {procedure.successRate}%
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      Satisfaction Utilisateur
                    </td>
                    {comparedProcedures.map((procedure) => (
                      <td key={procedure.id} className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-semibold">{procedure.userSatisfaction}/5</span>
                          {procedure.trends.satisfactionChange !== 0 && (
                            <span className={`text-xs flex items-center ${procedure.trends.satisfactionChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {procedure.trends.satisfactionChange > 0 ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {Math.abs(procedure.trends.satisfactionChange)}%
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
