
export interface ProcedureMetrics {
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
  description?: string;
  risks?: string[];
  recommendations?: string[];
  simplificationRecommendations?: string[];
  aiInsights?: string[];
}

export interface ComparisonCriteria {
  time: boolean;
  complexity: boolean;
  success: boolean;
  satisfaction: boolean;
}

export interface AverageMetrics {
  time: number;
  steps: number;
  documents: number;
  administrations: number;
  cost: number;
  complexity: number;
  satisfaction: number;
}

export interface ComplexityLevel {
  level: string;
  color: string;
  bg: string;
}
