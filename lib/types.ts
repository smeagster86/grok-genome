export type Category =
  | 'disease_risk'
  | 'carrier'
  | 'pharmacogenomics'
  | 'nutrition'
  | 'fitness'
  | 'wellness';

export type EvidenceLevel = 'high' | 'moderate' | 'preliminary' | 'research';

export type ClinicalActionability = 'high' | 'moderate' | 'low' | 'none' | 'consult_specialist';

export interface SNPInfo {
  rsid: string;
  gene: string;
  trait: string;
  category: Category;
  genotypes: {
    [key: string]: {
      effect: 'protective' | 'neutral' | 'increased_risk' | 'decreased_risk' | 'carrier' | 'affected' | 'responder' | 'non_responder';
      description: string;
      impact: string;
      confidence: 'high' | 'moderate' | 'emerging';
    };
  };
  populationFrequency?: string;
  source: string;
  // New professional-grade fields
  evidenceLevel: EvidenceLevel;
  references: string[];
  clinicalActionability?: ClinicalActionability;
  notes?: string; // Important limitations, ancestry considerations, etc.
  isPolygenicProxy?: boolean;
}

export interface ParsedGenotype {
  rsid: string;
  genotype: string;
  chromosome?: string;
  position?: number;
}

export interface MatchedInsight {
  snp: SNPInfo;
  genotype: string;
  interpretation: SNPInfo['genotypes'][string];
}

export interface AnalysisResult {
  fileName: string;
  format: '23andMe' | 'MyHeritage' | 'Unknown';
  totalVariantsParsed: number;
  matchedVariants: number;
  insights: MatchedInsight[];
  categories: Record<Category, MatchedInsight[]>;
  generatedAt: string;
  knowledgeBaseVersion: string; // for reproducibility
}

export interface DemoDataset {
  name: string;
  format: '23andMe' | 'MyHeritage';
  genotypes: Record<string, string>;
}

// Professional export formats
export interface StructuredReport {
  meta: {
    generatedAt: string;
    fileName: string;
    format: string;
    totalVariantsParsed: number;
    matchedVariants: number;
    knowledgeBaseVersion: string;
    disclaimer: string;
  };
  summary: {
    highActionabilityCount: number;
    increasedRiskCount: number;
    carrierFindings: number;
  };
  categories: Record<Category, MatchedInsight[]>;
  allInsights: MatchedInsight[];
}
