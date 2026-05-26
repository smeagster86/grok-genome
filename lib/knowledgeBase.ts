import { SNPInfo } from './types';

// Carefully curated set of high-value SNPs for educational personal genomics exploration.
// Interpretations are based on published research (ClinVar, GWAS, PharmGKB, 23andMe publications).
// All language uses probabilistic / associative wording. This is NOT diagnostic.

export const KNOWLEDGE_BASE: SNPInfo[] = [
  // === APOE - Alzheimer's & Cardiovascular ===
  {
    rsid: "rs429358",
    gene: "APOE",
    trait: "Alzheimer's Disease Risk & Lipid Metabolism",
    category: "disease_risk",
    genotypes: {
      "CC": { effect: "increased_risk", description: "APOE4 allele. Significantly higher lifetime risk of late-onset Alzheimer's (3-15x depending on copy number). Also associated with higher LDL cholesterol.", impact: "High impact on Alzheimer's risk and cardiovascular profile", confidence: "high" },
      "CT": { effect: "increased_risk", description: "One APOE4 allele (E3/E4). Moderately elevated Alzheimer's risk (~2-3x). Monitor cardiovascular health.", impact: "Moderate to high impact", confidence: "high" },
      "TT": { effect: "neutral", description: "No APOE4 alleles (E3/E3 or E2/E3). Average population risk for Alzheimer's.", impact: "Standard risk", confidence: "high" }
    },
    populationFrequency: "~15% carry at least one E4 allele",
    source: "ClinVar, large GWAS meta-analyses"
  },
  {
    rsid: "rs7412",
    gene: "APOE",
    trait: "APOE2 Protective Allele & Lipid Profile",
    category: "disease_risk",
    genotypes: {
      "CC": { effect: "neutral", description: "Common. Standard APOE risk profile.", impact: "Baseline", confidence: "high" },
      "CT": { effect: "protective", description: "One APOE2 allele. Often associated with lower LDL and possible longevity signal.", impact: "Mildly protective for CVD", confidence: "high" },
      "TT": { effect: "protective", description: "Two APOE2 alleles (rare). Strongly associated with lower Alzheimer's risk but higher type III hyperlipoproteinemia risk.", impact: "Complex lipid effects", confidence: "high" }
    },
    source: "ClinVar / GWAS"
  },

  // === Carrier Status - Common Mendelian ===
  {
    rsid: "rs1801133",
    gene: "MTHFR",
    trait: "MTHFR C677T - Folate Metabolism",
    category: "nutrition",
    genotypes: {
      "AA": { effect: "neutral", description: "Normal MTHFR activity. Efficient folate metabolism.", impact: "Optimal", confidence: "high" },
      "AG": { effect: "neutral", description: "Slightly reduced MTHFR activity (~65%). Most people with this genotype do well.", impact: "Mild reduction", confidence: "high" },
      "GG": { effect: "decreased_risk", description: "Reduced MTHFR activity (~30%). May benefit from methylated folate (5-MTHF) supplementation.", impact: "Significant reduction in activity", confidence: "high" }
    },
    source: "PharmGKB, clinical guidelines"
  },
  {
    rsid: "rs4988235",
    gene: "LCT (MCM6)",
    trait: "Lactose Persistence / Intolerance",
    category: "nutrition",
    genotypes: {
      "AA": { effect: "neutral", description: "Lactase persistence. Likely able to digest lactose into adulthood.", impact: "Lactose tolerant", confidence: "high" },
      "AG": { effect: "neutral", description: "Likely lactose tolerant (one persistent allele).", impact: "Usually tolerant", confidence: "high" },
      "GG": { effect: "increased_risk", description: "Lactase non-persistence. Higher chance of lactose intolerance symptoms in adulthood.", impact: "Common in many populations", confidence: "high" }
    },
    populationFrequency: "Varies dramatically by ancestry (5-90%+)",
    source: "Classic lactase persistence GWAS"
  },

  // === Pharmacogenomics ===
  {
    rsid: "rs9923231",
    gene: "VKORC1",
    trait: "Warfarin Sensitivity (Anticoagulant Dosing)",
    category: "pharmacogenomics",
    genotypes: {
      "AA": { effect: "responder", description: "High warfarin sensitivity. Typically requires significantly lower dose.", impact: "Dose reduction often needed", confidence: "high" },
      "AG": { effect: "responder", description: "Intermediate sensitivity. Moderate dose adjustment usually required.", impact: "Standard monitoring", confidence: "high" },
      "GG": { effect: "neutral", description: "Lower sensitivity. May require higher warfarin dose.", impact: "Standard", confidence: "high" }
    },
    source: "CPIC guidelines, PharmGKB"
  },
  {
    rsid: "rs4244285",
    gene: "CYP2C19",
    trait: "Clopidogrel (Plavix) Response",
    category: "pharmacogenomics",
    genotypes: {
      "AA": { effect: "non_responder", description: "Poor metabolizer. Clopidogrel may have reduced effectiveness. Alternative antiplatelet may be considered.", impact: "Clinical actionability high", confidence: "high" },
      "AG": { effect: "responder", description: "Intermediate metabolizer. Reduced activation of clopidogrel.", impact: "May need dose consideration", confidence: "high" },
      "GG": { effect: "neutral", description: "Normal (extensive) metabolizer. Standard clopidogrel response.", impact: "Normal response", confidence: "high" }
    },
    source: "CPIC / FDA label"
  },

  // === Fitness / Athletic ===
  {
    rsid: "rs1815739",
    gene: "ACTN3",
    trait: "Muscle Fiber Type & Power Performance",
    category: "fitness",
    genotypes: {
      "CC": { effect: "neutral", description: "RR genotype. Higher proportion of fast-twitch fibers. Often associated with power, sprint, and strength performance.", impact: "Power/sprint advantage tendency", confidence: "moderate" },
      "CT": { effect: "neutral", description: "RX genotype. Intermediate muscle fiber profile.", impact: "Balanced", confidence: "moderate" },
      "TT": { effect: "neutral", description: "XX genotype. Higher slow-twitch fibers. Tendency toward endurance activities.", impact: "Endurance lean", confidence: "moderate" }
    },
    source: "Multiple athletic performance GWAS"
  },
  {
    rsid: "rs9939609",
    gene: "FTO",
    trait: "Appetite Regulation & Obesity Risk",
    category: "nutrition",
    genotypes: {
      "AA": { effect: "increased_risk", description: "Associated with higher appetite, larger portion sizes, and increased obesity risk in many studies.", impact: "Strongest risk allele", confidence: "high" },
      "AT": { effect: "neutral", description: "Intermediate risk.", impact: "Moderate", confidence: "high" },
      "TT": { effect: "protective", description: "Lower obesity risk allele in many populations.", impact: "Protective tendency", confidence: "high" }
    },
    source: "Large FTO obesity GWAS"
  },

  // === Caffeine & Sleep ===
  {
    rsid: "rs762551",
    gene: "CYP1A2",
    trait: "Caffeine Metabolism Speed",
    category: "nutrition",
    genotypes: {
      "AA": { effect: "neutral", description: "Fast metabolizer. Caffeine cleared quickly. Usually can drink coffee later in day with less sleep disruption.", impact: "Fast clearance", confidence: "high" },
      "AC": { effect: "neutral", description: "Intermediate metabolizer.", impact: "Moderate", confidence: "high" },
      "CC": { effect: "increased_risk", description: "Slow metabolizer. Caffeine stays in system longer. Evening intake more likely to affect sleep quality.", impact: "Slow clearance", confidence: "high" }
    },
    source: "Caffeine consumption & metabolism GWAS"
  },

  // === More Disease Risk & Wellness ===
  {
    rsid: "rs53576",
    gene: "OXTR",
    trait: "Oxytocin Receptor & Social Bonding Tendency",
    category: "wellness",
    genotypes: {
      "AA": { effect: "neutral", description: "Associated in some studies with differences in social cognition and empathy response.", impact: "Research ongoing", confidence: "emerging" },
      "AG": { effect: "neutral", description: "Intermediate.", impact: "", confidence: "emerging" },
      "GG": { effect: "neutral", description: "Often reported as 'socially responsive' genotype in popular literature (evidence is mixed).", impact: "Exploratory", confidence: "emerging" }
    },
    source: "Multiple candidate gene studies (interpret cautiously)"
  },
  {
    rsid: "rs4680",
    gene: "COMT",
    trait: "Dopamine Regulation & Stress Response (Warrior vs Worrier)",
    category: "wellness",
    genotypes: {
      "AA": { effect: "neutral", description: "Met/Met (worrier). Higher dopamine in prefrontal cortex. May excel at complex tasks but feel stress more acutely.", impact: "Higher baseline dopamine", confidence: "moderate" },
      "AG": { effect: "neutral", description: "Val/Met. Balanced profile.", impact: "", confidence: "moderate" },
      "GG": { effect: "neutral", description: "Val/Val (warrior). Faster dopamine breakdown. Often resilient to stress, may benefit from different learning styles.", impact: "Lower prefrontal dopamine", confidence: "moderate" }
    },
    source: "COMT Val158Met literature"
  },
  {
    rsid: "rs1799971",
    gene: "OPRM1",
    trait: "Opioid Receptor Sensitivity & Pain Perception",
    category: "pharmacogenomics",
    genotypes: {
      "AA": { effect: "neutral", description: "Normal opioid receptor. Standard opioid pain relief response.", impact: "", confidence: "moderate" },
      "AG": { effect: "responder", description: "G allele carriers sometimes report stronger effects from opioids and alcohol reward.", impact: "Enhanced sensitivity", confidence: "moderate" },
      "GG": { effect: "responder", description: "Stronger response to mu-opioid agonists reported in studies.", impact: "Higher sensitivity", confidence: "moderate" }
    },
    source: "Pain & addiction genetics research"
  },

  // Add many more high quality entries (abbreviated for space but fully functional)
  {
    rsid: "rs1801131",
    gene: "MTHFR",
    trait: "MTHFR A1298C",
    category: "nutrition",
    genotypes: {
      "AA": { effect: "neutral", description: "Normal activity at this locus.", impact: "", confidence: "high" },
      "AC": { effect: "neutral", description: "Mild reduction in MTHFR activity when combined with C677T.", impact: "", confidence: "high" },
      "CC": { effect: "neutral", description: "Reduced activity. Consider methylated B vitamins if symptoms present.", impact: "", confidence: "high" }
    },
    source: "MTHFR research"
  },
  {
    rsid: "rs10455872",
    gene: "LPA",
    trait: "Lipoprotein(a) Levels & Cardiovascular Risk",
    category: "disease_risk",
    genotypes: {
      "AA": { effect: "increased_risk", description: "Associated with higher Lp(a) levels and increased cardiovascular risk in many studies.", impact: "Important independent risk factor", confidence: "high" },
      "AG": { effect: "neutral", description: "Intermediate Lp(a) elevation.", impact: "", confidence: "high" },
      "GG": { effect: "protective", description: "Lower Lp(a). Generally favorable cardiovascular marker.", impact: "Protective", confidence: "high" }
    },
    source: "Large Lp(a) GWAS"
  },
  {
    rsid: "rs7903146",
    gene: "TCF7L2",
    trait: "Type 2 Diabetes Risk",
    category: "disease_risk",
    genotypes: {
      "CC": { effect: "protective", description: "Lower T2D risk allele.", impact: "Favorable", confidence: "high" },
      "CT": { effect: "neutral", description: "Average risk.", impact: "", confidence: "high" },
      "TT": { effect: "increased_risk", description: "Strongest common genetic risk factor for type 2 diabetes in many populations.", impact: "Significant", confidence: "high" }
    },
    source: "Diabetes genetics consortium"
  }
  // Note: In full version we expand to 80+ with BRCA limited mentions, HFE hemochromatosis, Factor V Leiden, etc.
];

export const CATEGORY_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  disease_risk: { label: "Disease Predispositions", icon: "Heart", color: "#ef4444" },
  carrier: { label: "Carrier Status", icon: "Users", color: "#f59e0b" },
  pharmacogenomics: { label: "Drug Response (PGx)", icon: "Zap", color: "#3b82f6" },
  nutrition: { label: "Nutrition & Metabolism", icon: "Heart", color: "#10b981" },
  fitness: { label: "Fitness & Performance", icon: "Activity", color: "#8b5cf6" },
  wellness: { label: "Wellness & Behavior", icon: "BookOpen", color: "#06b6d4" },
};

export const CATEGORY_ORDER: Category[] = ['disease_risk', 'carrier', 'pharmacogenomics', 'nutrition', 'fitness', 'wellness'];
