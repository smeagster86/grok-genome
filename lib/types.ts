export type Category = 
  | 'disease_risk'
  | 'carrier'
  | 'pharmacogenomics'
  | 'nutrition'
  | 'fitness'
  | 'wellness';

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
}

export interface DemoDataset {
  name: string;
  format: '23andMe' | 'MyHeritage';
  genotypes: Record<string, string>;
}
