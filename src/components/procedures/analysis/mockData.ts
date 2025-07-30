import { ProcedureMetrics } from './types';

export const mockProcedures: ProcedureMetrics[] = [
  {
    id: '1',
    name: 'Création SARL',
    averageTime: 22,
    steps: 12,
    documents: 8,
    administrations: 4,
    cost: 25000,
    complexityScore: 7.8,
    successRate: 92,
    userSatisfaction: 3.4,
    feedbackCount: 156,
    trends: { timeChange: -15, satisfactionChange: 8 }
  },
  {
    id: '2',
    name: 'Demande Passeport',
    averageTime: 8,
    steps: 6,
    documents: 5,
    administrations: 2,
    cost: 3000,
    complexityScore: 4.2,
    successRate: 98,
    userSatisfaction: 4.1,
    feedbackCount: 432,
    trends: { timeChange: -3, satisfactionChange: 12 }
  },
  {
    id: '3',
    name: 'Permis de Construire',
    averageTime: 45,
    steps: 18,
    documents: 15,
    administrations: 6,
    cost: 50000,
    complexityScore: 9.2,
    successRate: 78,
    userSatisfaction: 2.8,
    feedbackCount: 89,
    trends: { timeChange: 5, satisfactionChange: -8 }
  }
];