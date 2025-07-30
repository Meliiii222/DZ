
// @ts-nocheck
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

interface ComplianceMetricsProps {
  period: string;
  detailed?: boolean;
}

export function ComplianceMetrics({ period, detailed = false }: ComplianceMetricsProps) {
  const complianceData = [
    { name: 'Conforme', value: 842, color: '#10b981' },
    { name: 'Non-conforme', value: 67, color: '#ef4444' },
    { name: 'À vérifier', value: 123, color: '#f59e0b' }
  ];

  const complianceByDomain = [
    { domain: 'Droit du travail', conforme: 95, nonConforme: 5 },
    { domain: 'Droit fiscal', conforme: 88, nonConforme: 12 },
    { domain: 'Droit commercial', conforme: 92, nonConforme: 8 },
    { domain: 'Droit environnemental', conforme: 87, nonConforme: 13 },
    { domain: 'Droit social', conforme: 96, nonConforme: 4 }
  ];

  // Pagination pour les données de conformité
  const {
    currentData: paginatedComplianceData,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: complianceData,
    itemsPerPage: 3
  });

  // Pagination pour les domaines de conformité
  const {
    currentData: paginatedComplianceByDomain,
    currentPage: domainPage,
    totalPages: domainTotalPages,
    itemsPerPage: domainItemsPerPage,
    totalItems: domainTotalItems,
    setCurrentPage: setDomainPage,
    setItemsPerPage: setDomainItemsPerPage
  } = usePagination({
    data: complianceByDomain,
    itemsPerPage: 3
  });

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: Record<string, unknown>) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (detailed) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Métriques de Conformité Détaillées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Répartition Globale</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={complianceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {complianceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Par Domaine Juridique</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={complianceByDomain} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="domain" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="conforme" stackId="a" fill="#10b981" name="Conforme" />
                      <Bar dataKey="nonConforme" stackId="a" fill="#ef4444" name="Non-conforme" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paginatedComplianceData.map((item, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{item.name}</p>
                    <p className="text-2xl font-bold mt-2">{item.value}</p>
                  </div>
                  <div className="p-3 rounded-full" style={{ backgroundColor: `${item.color}20` }}>
                    {item.name === 'Conforme' && <CheckCircle className="w-6 h-6" style={{ color: item.color }} />}
                    {item.name === 'Non-conforme' && <AlertTriangle className="w-6 h-6" style={{ color: item.color }} />}
                    {item.name === 'À vérifier' && <Shield className="w-6 h-6" style={{ color: item.color }} />}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {totalPages > 1 && (
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
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          Conformité Réglementaire
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complianceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {paginatedComplianceData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
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
          )}
        </div>
      </CardContent>
    </Card>
  );
}
