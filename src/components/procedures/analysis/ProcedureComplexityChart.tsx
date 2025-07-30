
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, PieChart, Pie, Legend } from 'recharts';

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

interface ProcedureComplexityChartProps {
  procedures: ProcedureMetrics[];
}

export function ProcedureComplexityChart({ procedures }: ProcedureComplexityChartProps) {
  // Move getBarColor function to the top before it's used
  const getBarColor = (value: number) => {
    if (value <= 3) return '#10b981'; // vert
    if (value <= 6) return '#f59e0b'; // jaune
    if (value <= 8) return '#f97316'; // orange
    return '#ef4444'; // rouge
  };

  const chartData = procedures.map(p => ({
    name: p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name,
    complexité: p.complexityScore,
    délai: p.averageTime / 5, // Normalisé pour l'affichage
    étapes: p.steps / 2,
    documents: p.documents,
    administrations: p.administrations * 2,
    succès: p.successRate,
    satisfaction: p.userSatisfaction * 20 // Normalisé sur 100
  }));

  const pieData = procedures.map(p => ({
    name: p.name,
    value: p.complexityScore,
    color: getBarColor(p.complexityScore)
  }));

  const timeSeriesData = procedures.map((p, index) => ({
    month: `Mois ${index + 1}`,
    performance: p.successRate,
    satisfaction: p.userSatisfaction * 20,
    complexité: p.complexityScore * 10
  }));

  return (
    <div className="space-y-8">
      {/* Graphique en barres principal */}
      <div className="h-80">
        <h3 className="text-lg font-semibold mb-4">Analyse de Complexité par Procédure</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [value, name]}
              labelFormatter={(label) => `Procédure: ${label}`}
            />
            <Bar dataKey="complexité" name="Score de Complexité">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.complexité)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique en secteurs */}
        <div className="h-80">
          <h3 className="text-lg font-semibold mb-4">Répartition de la Complexité</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique linéaire d'évolution */}
        <div className="h-80">
          <h3 className="text-lg font-semibold mb-4">Évolution des Performances</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Performance (%)"
              />
              <Line 
                type="monotone" 
                dataKey="satisfaction" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Satisfaction (%)"
              />
              <Line 
                type="monotone" 
                dataKey="complexité" 
                stroke="#ffc658" 
                strokeWidth={2}
                name="Complexité (x10)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
