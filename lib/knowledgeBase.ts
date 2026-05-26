import { SNPInfo } from './types';

export const KNOWLEDGE_BASE: SNPInfo[] = [
  // ==================== APOE (well-established, high impact) ====================
  { 
    rsid: "rs429358", gene: "APOE", trait: "Alzheimer's Disease Risk & Lipid Metabolism", category: "disease_risk",
    genotypes: { 
      "CC": { effect: "increased_risk", description: "APOE4 allele. Significantly higher lifetime risk of late-onset Alzheimer's (roughly 3-15x depending on copy number and other factors). Also associated with higher LDL cholesterol.", impact: "High impact", confidence: "high" }, 
      "CT": { effect: "increased_risk", description: "One APOE4 allele (E3/E4). Moderately elevated Alzheimer's risk (~2-3x). Monitor cardiovascular health.", impact: "Moderate-high", confidence: "high" }, 
      "TT": { effect: "neutral", description: "No APOE4 alleles (E3/E3 or E2/E3). Average population risk.", impact: "Baseline", confidence: "high" } 
    },
    populationFrequency: "APOE4 frequency varies by ancestry (~15% in Europeans)",
    source: "ClinVar / GWAS Catalog",
    evidenceLevel: "high",
    references: ["ClinVar: rs429358", "Corder et al. Science 1993", "Farrer et al. JAMA 1997"],
    clinicalActionability: "consult_specialist",
    notes: "This is one of the strongest common genetic risk factors for late-onset Alzheimer's. Not deterministic. Lifestyle and other genes matter greatly."
  },
  { 
    rsid: "rs7412", gene: "APOE", trait: "APOE2 Allele Effects", category: "disease_risk",
    genotypes: { 
      "CC": { effect: "neutral", description: "Standard profile (no APOE2).", impact: "", confidence: "high" }, 
      "CT": { effect: "protective", description: "One APOE2. Often associated with lower LDL and possible longevity signal in some studies.", impact: "Mild protective for CVD", confidence: "high" }, 
      "TT": { effect: "protective", description: "Rare APOE2/2. Lower Alzheimer's risk but monitor lipids (can have dysbetalipoproteinemia risk).", impact: "Complex", confidence: "high" } 
    },
    source: "ClinVar",
    evidenceLevel: "high",
    references: ["ClinVar: rs7412"],
    clinicalActionability: "low"
  },

  // ==================== PHARMACOGENOMICS (CPIC-aligned, actionable) ====================
  { 
    rsid: "rs9923231", gene: "VKORC1", trait: "Warfarin Dose Sensitivity", category: "pharmacogenomics",
    genotypes: { 
      "AA": { effect: "responder", description: "High sensitivity. Typically requires substantially lower warfarin dose.", impact: "Clinical actionability high", confidence: "high" }, 
      "AG": { effect: "responder", description: "Intermediate sensitivity. Dose adjustment often needed.", impact: "Dose adjustment often needed", confidence: "high" }, 
      "GG": { effect: "neutral", description: "Lower sensitivity (wild-type like).", impact: "", confidence: "high" } 
    },
    source: "CPIC",
    evidenceLevel: "high",
    references: ["CPIC Warfarin Guideline", "PharmGKB: PA128"],
    clinicalActionability: "high"
  },
  { 
    rsid: "rs4244285", gene: "CYP2C19", trait: "Clopidogrel Activation", category: "pharmacogenomics",
    genotypes: { 
      "AA": { effect: "non_responder", description: "Poor metabolizer. Significantly reduced antiplatelet effect. Consider alternatives (e.g., prasugrel, ticagrelor) per guidelines.", impact: "High", confidence: "high" }, 
      "AG": { effect: "responder", description: "Intermediate metabolizer.", impact: "", confidence: "high" }, 
      "GG": { effect: "neutral", description: "Normal metabolizer.", impact: "", confidence: "high" } 
    },
    source: "CPIC/FDA",
    evidenceLevel: "high",
    references: ["CPIC Clopidogrel Guideline", "FDA Table of Pharmacogenomic Biomarkers"],
    clinicalActionability: "high"
  },
  { 
    rsid: "rs4149056", gene: "SLCO1B1", trait: "Statin-Induced Myopathy Risk", category: "pharmacogenomics",
    genotypes: { 
      "CC": { effect: "neutral", description: "Normal SLCO1B1 function.", impact: "", confidence: "high" }, 
      "CT": { effect: "increased_risk", description: "Reduced function. Moderately increased risk of simvastatin-related myopathy.", impact: "Consider lower dose or alternative statin", confidence: "high" }, 
      "TT": { effect: "increased_risk", description: "Poor function. Highest risk with simvastatin 80mg. Consider alternative statin or lower dose.", impact: "High actionability", confidence: "high" } 
    },
    source: "CPIC",
    evidenceLevel: "high",
    references: ["CPIC SLCO1B1 Guideline"],
    clinicalActionability: "high"
  },

  // ==================== CARRIER STATUS (actionable for family planning) ====================
  { 
    rsid: "rs1800562", gene: "HFE", trait: "Hereditary Hemochromatosis (C282Y)", category: "carrier",
    genotypes: { 
      "AA": { effect: "affected", description: "Homozygous C282Y. High risk of iron overload. Worth clinical iron studies discussion.", impact: "High actionability", confidence: "high" }, 
      "AG": { effect: "carrier", description: "C282Y heterozygote. Usually low clinical risk but monitor if symptoms or family history.", impact: "Carrier", confidence: "high" }, 
      "GG": { effect: "neutral", description: "No C282Y mutation.", impact: "", confidence: "high" } 
    },
    source: "ClinVar",
    evidenceLevel: "high",
    references: ["ClinVar: rs1800562", "ACMG Secondary Findings"],
    clinicalActionability: "high"
  },
  { 
    rsid: "rs6025", gene: "F5", trait: "Factor V Leiden Thrombophilia", category: "carrier",
    genotypes: { 
      "AA": { effect: "affected", description: "Homozygous Factor V Leiden. Significantly increased venous thrombosis risk.", impact: "High", confidence: "high" }, 
      "AG": { effect: "carrier", description: "Heterozygous. Moderately increased risk (especially with other factors such as OCP, surgery, pregnancy).", impact: "Carrier", confidence: "high" }, 
      "GG": { effect: "neutral", description: "Wild type. Normal risk.", impact: "", confidence: "high" } 
    },
    source: "ClinVar",
    evidenceLevel: "high",
    references: ["ClinVar: rs6025"],
    clinicalActionability: "moderate"
  },

  // ==================== NUTRITION & METABOLISM ====================
  { 
    rsid: "rs4988235", gene: "LCT", trait: "Lactose Persistence / Intolerance", category: "nutrition",
    genotypes: { 
      "AA": { effect: "neutral", description: "Lactase persistence. Likely digests lactose well into adulthood.", impact: "Tolerant", confidence: "high" }, 
      "AG": { effect: "neutral", description: "Likely tolerant.", impact: "", confidence: "high" }, 
      "GG": { effect: "increased_risk", description: "Lactase non-persistence. Higher probability of adult lactose intolerance symptoms.", impact: "Common intolerance signal", confidence: "high" } 
    },
    source: "GWAS",
    evidenceLevel: "high",
    references: ["GWAS Catalog"],
    clinicalActionability: "low"
  },
  { 
    rsid: "rs762551", gene: "CYP1A2", trait: "Caffeine Metabolism Speed", category: "nutrition",
    genotypes: { 
      "AA": { effect: "neutral", description: "Fast metabolizer. Caffeine clears relatively quickly.", impact: "", confidence: "high" }, 
      "AC": { effect: "neutral", description: "Intermediate.", impact: "", confidence: "high" }, 
      "CC": { effect: "increased_risk", description: "Slow metabolizer. Caffeine lingers longer. Evening consumption may affect sleep more for some people.", impact: "Slow clearance", confidence: "high" } 
    },
    source: "Caffeine GWAS / PharmGKB",
    evidenceLevel: "high",
    references: ["PharmGKB: Caffeine"],
    clinicalActionability: "low"
  },
  { 
    rsid: "rs1801133", gene: "MTHFR", trait: "Folate Metabolism (C677T)", category: "nutrition",
    genotypes: { 
      "AA": { effect: "neutral", description: "Normal MTHFR activity.", impact: "", confidence: "high" }, 
      "AG": { effect: "neutral", description: "Mildly reduced activity.", impact: "", confidence: "high" }, 
      "GG": { effect: "decreased_risk", description: "Reduced MTHFR efficiency. Many people benefit from methylated folate supplements (discuss with clinician).", impact: "Consider methylated B9", confidence: "high" } 
    },
    source: "PharmGKB",
    evidenceLevel: "moderate",
    references: ["PharmGKB: MTHFR"],
    clinicalActionability: "low",
    notes: "Clinical significance is often overstated in popular media. Current guidelines do not recommend routine MTHFR testing for most clinical decisions."
  },
  { 
    rsid: "rs1801131", gene: "MTHFR", trait: "MTHFR A1298C", category: "nutrition",
    genotypes: { 
      "AA": { effect: "neutral", description: "Normal.", impact: "", confidence: "high" }, 
      "AC": { effect: "neutral", description: "Mild effect in isolation.", impact: "", confidence: "high" }, 
      "CC": { effect: "neutral", description: "Reduced activity, especially in combination with 677T variant.", impact: "", confidence: "high" } 
    },
    source: "MTHFR literature",
    evidenceLevel: "moderate",
    references: ["PharmGKB"],
    clinicalActionability: "low"
  },

  // ==================== ADDITIONAL HIGH-VALUE PGx & RISK ====================
  { 
    rsid: "rs10455872", gene: "LPA", trait: "Lipoprotein(a) Cardiovascular Risk", category: "disease_risk",
    genotypes: { 
      "AA": { effect: "increased_risk", description: "Elevated Lp(a). Important independent cardiovascular risk marker.", impact: "High", confidence: "high" }, 
      "AG": { effect: "neutral", description: "Intermediate.", impact: "", confidence: "high" }, 
      "GG": { effect: "protective", description: "Lower Lp(a). Favorable.", impact: "", confidence: "high" } 
    },
    source: "Large GWAS / Lp(a) literature",
    evidenceLevel: "high",
    references: ["GWAS Catalog"],
    clinicalActionability: "moderate"
  },
  { 
    rsid: "rs9939609", gene: "FTO", trait: "Appetite & Body Weight Tendency", category: "nutrition",
    genotypes: { 
      "AA": { effect: "increased_risk", description: "Associated with increased appetite and higher obesity risk in many populations.", impact: "Strongest risk allele", confidence: "high" }, 
      "AT": { effect: "neutral", description: "Intermediate.", impact: "", confidence: "high" }, 
      "TT": { effect: "protective", description: "Lower risk allele.", impact: "Favorable", confidence: "high" } 
    },
    source: "Obesity GWAS",
    evidenceLevel: "high",
    references: ["FTO GWAS"],
    clinicalActionability: "low"
  },
  { 
    rsid: "rs7903146", gene: "TCF7L2", trait: "Type 2 Diabetes Risk", category: "disease_risk",
    genotypes: { 
      "CC": { effect: "protective", description: "Lower risk allele.", impact: "Favorable", confidence: "high" }, 
      "CT": { effect: "neutral", description: "Average risk.", impact: "", confidence: "high" }, 
      "TT": { effect: "increased_risk", description: "One of the strongest common genetic signals for T2D risk.", impact: "Significant", confidence: "high" } 
    },
    source: "Diabetes genetics (multiple large GWAS)",
    evidenceLevel: "high",
    references: ["GWAS Catalog: TCF7L2"],
    clinicalActionability: "moderate"
  },
  { 
    rsid: "rs1815739", gene: "ACTN3", trait: "Muscle Fiber Type & Athletic Tendency", category: "fitness",
    genotypes: { 
      "CC": { effect: "neutral", description: "RR. Tendency toward fast-twitch fibers — power, sprint, strength sports.", impact: "Power profile", confidence: "moderate" }, 
      "CT": { effect: "neutral", description: "RX. Balanced.", impact: "", confidence: "moderate" }, 
      "TT": { effect: "neutral", description: "XX. Higher proportion of slow-twitch fibers. Endurance orientation.", impact: "Endurance lean", confidence: "moderate" } 
    },
    source: "Athletic performance GWAS",
    evidenceLevel: "moderate",
    references: ["ACTN3 literature"],
    clinicalActionability: "low"
  },
  { 
    rsid: "rs4680", gene: "COMT", trait: "Dopamine Regulation (Warrior / Worrier)", category: "wellness",
    genotypes: { 
      "AA": { effect: "neutral", description: "Met/Met. Higher prefrontal dopamine. May feel stress more but often excel at focus tasks.", impact: "Worrier profile", confidence: "moderate" }, 
      "AG": { effect: "neutral", description: "Balanced.", impact: "", confidence: "moderate" }, 
      "GG": { effect: "neutral", description: "Val/Val. Faster dopamine breakdown. Often more resilient under stress.", impact: "Warrior profile", confidence: "moderate" } 
    },
    source: "COMT literature",
    evidenceLevel: "moderate",
    references: ["COMT Val158Met reviews"],
    clinicalActionability: "low",
    notes: "Popular in wellness circles; effect sizes are modest and context-dependent."
  },
  { 
    rsid: "rs1799971", gene: "OPRM1", trait: "Opioid & Reward Sensitivity", category: "pharmacogenomics",
    genotypes: { 
      "AA": { effect: "neutral", description: "Normal mu-opioid receptor function.", impact: "", confidence: "moderate" }, 
      "AG": { effect: "responder", description: "G carriers often report stronger opioid and alcohol effects.", impact: "Higher sensitivity", confidence: "moderate" }, 
      "GG": { effect: "responder", description: "Stronger response reported.", impact: "", confidence: "moderate" } 
    },
    source: "Pain genetics literature",
    evidenceLevel: "moderate",
    references: ["OPRM1 A118G studies"],
    clinicalActionability: "low"
  },

  // ==================== ALCOHOL METABOLISM (actionable) ====================
  { 
    rsid: "rs1229984", gene: "ADH1B", trait: "Alcohol Metabolism Speed", category: "nutrition",
    genotypes: { 
      "AA": { effect: "neutral", description: "Fast metabolizer of alcohol. May experience less flushing but still at risk for alcohol-related harm.", impact: "", confidence: "high" }, 
      "AG": { effect: "neutral", description: "Intermediate.", impact: "", confidence: "high" }, 
      "GG": { effect: "protective", description: "Slower alcohol metabolism. Often associated with flushing and aversion to heavy drinking.", impact: "Protective against heavy drinking in many populations", confidence: "high" } 
    },
    source: "Alcohol metabolism GWAS / literature",
    evidenceLevel: "high",
    references: ["ADH1B alcohol studies"],
    clinicalActionability: "low"
  },
  { 
    rsid: "rs671", gene: "ALDH2", trait: "Alcohol Flush Reaction (East Asian Variant)", category: "nutrition",
    genotypes: { 
      "AA": { effect: "neutral", description: "Normal ALDH2 function.", impact: "", confidence: "high" }, 
      "AG": { effect: "protective", description: "ALDH2*2 heterozygote. Strong flushing reaction, nausea with alcohol.", impact: "Strong aversion to alcohol", confidence: "high" }, 
      "GG": { effect: "protective", description: "ALDH2*2 homozygote. Severe reaction to alcohol.", impact: "Very strong protection against alcohol use", confidence: "high" } 
    },
    source: "ALDH2 East Asian variant literature",
    evidenceLevel: "high",
    references: ["ALDH2 rs671 studies"],
    clinicalActionability: "low"
  }
];

// Keep existing labels and order
export const CATEGORY_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  disease_risk: { label: "Disease Predispositions", icon: "Heart", color: "#ef4444" },
  carrier: { label: "Carrier Status", icon: "Users", color: "#f59e0b" },
  pharmacogenomics: { label: "Drug Response", icon: "Zap", color: "#3b82f6" },
  nutrition: { label: "Nutrition & Metabolism", icon: "Heart", color: "#10b981" },
  fitness: { label: "Fitness & Performance", icon: "Activity", color: "#8b5cf6" },
  wellness: { label: "Wellness & Behavior", icon: "BookOpen", color: "#06b6d4" },
};
export const CATEGORY_ORDER = ['disease_risk', 'carrier', 'pharmacogenomics', 'nutrition', 'fitness', 'wellness'] as const;

// Version for reproducibility in exports
export const KNOWLEDGE_BASE_VERSION = "2026.05-expanded-v2";
