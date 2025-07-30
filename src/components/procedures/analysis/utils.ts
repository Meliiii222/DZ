import { ProcedureMetrics, ComplexityLevel, AverageMetrics } from './types';

export const calculateComplexityScore = (procedure: ProcedureMetrics): number => {
  // Algorithme de calcul de complexité basé sur plusieurs facteurs
  const timeWeight = procedure.averageTime * 0.1;
  const stepsWeight = procedure.steps * 0.3;
  const docsWeight = procedure.documents * 0.2;
  const adminWeight = procedure.administrations * 0.4;
  const successPenalty = (100 - procedure.successRate) * 0.05;
  
  return Math.min(10, timeWeight + stepsWeight + docsWeight + adminWeight + successPenalty);
};

export const getComplexityLevel = (score: number): ComplexityLevel => {
  if (score <= 3) return { level: 'Faible', color: 'text-green-600', bg: 'bg-green-50' };
  if (score <= 6) return { level: 'Modérée', color: 'text-yellow-600', bg: 'bg-yellow-50' };
  if (score <= 8) return { level: 'Élevée', color: 'text-orange-600', bg: 'bg-orange-50' };
  return { level: 'Très Élevée', color: 'text-red-600', bg: 'bg-red-50' };
};

export const calculateAverageMetrics = (procedures: ProcedureMetrics[]): AverageMetrics => {
  return {
    time: Math.round(procedures.reduce((acc, p) => acc + p.averageTime, 0) / procedures.length),
    steps: Math.round(procedures.reduce((acc, p) => acc + p.steps, 0) / procedures.length),
    documents: Math.round(procedures.reduce((acc, p) => acc + p.documents, 0) / procedures.length),
    administrations: Math.round(procedures.reduce((acc, p) => acc + p.administrations, 0) / procedures.length),
    cost: Math.round(procedures.reduce((acc, p) => acc + p.cost, 0) / procedures.length),
    complexity: Number((procedures.reduce((acc, p) => acc + p.complexityScore, 0) / procedures.length).toFixed(1)),
    satisfaction: Number((procedures.reduce((acc, p) => acc + p.userSatisfaction, 0) / procedures.length).toFixed(1))
  };
};