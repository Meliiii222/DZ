
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Shield, UserCog } from 'lucide-react';

interface UserStats {
  totalUsers: number;
  adminCount: number;
  juristeCount: number;
  citoyenCount: number;
}

export function UserStats() {
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    adminCount: 0,
    juristeCount: 0,
    citoyenCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Compter le total d'utilisateurs
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Compter les rôles
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role');

      const adminCount = roles?.filter(r => r.role === 'admin').length || 0;
      const juristeCount = roles?.filter(r => r.role === 'juriste').length || 0;
      const citoyenCount = (totalUsers || 0) - adminCount - juristeCount;

      setStats({
        totalUsers: totalUsers || 0,
        adminCount,
        juristeCount,
        citoyenCount
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Utilisateurs',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Administrateurs',
      value: stats.adminCount,
      icon: Shield,
      color: 'text-red-600'
    },
    {
      title: 'Juristes',
      value: stats.juristeCount,
      icon: UserCog,
      color: 'text-green-600'
    },
    {
      title: 'Citoyens',
      value: stats.citoyenCount,
      icon: UserCheck,
      color: 'text-gray-600'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

