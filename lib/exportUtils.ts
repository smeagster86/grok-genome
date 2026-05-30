import { AnalysisResult, StructuredReport, MatchedInsight } from './types';

/**
 * Professional export utilities for Grok Genome.
 * These produce clean, machine- and human-readable outputs suitable for
 * further analysis in other tools (R, Python, Excel, research databases, LLMs, etc.).
 * All functions are pure and client-side.
 */

const DISCLAIMER = "This report is for educational and research purposes only. It does not constitute medical advice. Genetic associations are probabilistic and context-dependent. Always consult a qualified healthcare professional or genetic counselor. All analysis performed locally in your browser using the Grok Genome knowledge base.";

// Richer synthesized profile text for exports (kept in sync with upgraded UI profiles)
function getSynthesizedProfilesMarkdown(insights: MatchedInsight[]): string {
  let md = "## Synthesized Profiles & Limitations\n\n";

  // Methylation (richer Phase 4 text)
  const mthfr677 = insights.find(i => i.snp.rsid === "rs1801133");
  const mthfr1298 = insights.find(i => i.snp.rsid === "rs1801131");
  const hasMethylRisk = mthfr677?.genotype === "GG" || mthfr677?.genotype === "AG" || mthfr1298?.genotype === "CC" || mthfr1298?.genotype === "AC";

  md += "### Methylation Support (Folate pathway)\n";
  md += hasMethylRisk 
    ? "Your data shows the GG genotype at MTHFR rs1801133 (C677T) and/or the CC/AC combination at rs1801131 (A1298C). In studied populations this pattern is associated with a modest reduction in MTHFR enzyme activity. Actual biological impact varies widely and depends heavily on dietary folate intake and other factors. Most data are from European-ancestry cohorts.\n\n"
    : "Your genotype combination at these two positions is consistent with typical activity in the reference populations studied.\n\n";
  md += "**Why this matters:** Variants in the folate pathway can subtly influence homocysteine and one-carbon metabolism, examined in relation to cardiovascular risk, pregnancy outcomes, and mood — though diet and other genes usually dominate.\n\n";
  md += "**5 Questions (summary):**\n";
  md += "1. What might this mean? — Common MTHFR variants associated with differences in folate processing in lab studies. Most data European-biased.\n";
  md += "2. Evidence strength — Moderate (enzyme function replicated; health outcomes more variable; heterogeneity in meta-analyses).\n";
  md += "3. Established or exploratory — Largely exploratory for general wellness; major orgs do not recommend routine MTHFR-based interventions for most people.\n";
  md += "4. Effect size — Modest, one factor among many (diet, other B-vitamins, genes, medications).\n";
  md += "5. Discuss with professional? — If symptoms, elevated homocysteine, or high-dose supplement consideration (esp. pregnancy). Blood testing is primary.\n\n";
  md += "**Limitations:** Does not capture all folate-related variation (DHFR, RFC1, etc.); real-world methylation strongly influenced by diet/lifestyle/meds/other genes/B12 status; no direct measurement of methylation capacity; not diagnostic.\n\n";

  // Drug (richer)
  md += "### Drug Metabolism Tendencies\n";
  md += "Certain variants in pharmacogenes (CYP2C19, VKORC1, etc.) are associated with differences in how specific medications are processed. Effects are highly drug-specific. Most consumer arrays have poor or no coverage for CYP2D6/CYP3A4 star alleles.\n\n";
  md += "**Why this matters:** A small number of well-characterized variants can influence prescribing choices for clopidogrel, warfarin, or certain chemotherapies, but many important PGx genes remain invisible on consumer chips. Even for the better-supported signals, real response is dominated by clinical factors (age, liver/kidney function, other meds, adherence) — these typically explain the large majority of variability. The variants shown here are one small, probabilistic contribution at best.\n\n";
  md += "**5 Questions (summary):**\n";
  md += "1. What might this mean? — Examples: CYP2C19 rs4244285 AA linked to reduced clopidogrel activation; VKORC1 rs9923231 AA linked to warfarin sensitivity.\n";
  md += "2. Evidence strength — Moderate to high for specific CPIC/FDA-supported drug-gene pairs; many others exploratory.\n";
  md += "3. Established or exploratory — Established for a small number of pairs with guidelines; exploratory for most other meds in consumer data.\n";
  md += "4. Effect size — Drug-specific; does not broadly affect 'metabolism' or wellness traits. Modified by age, liver/kidney function, other drugs.\n";
  md += "5. Discuss with professional? — Before/while taking clopidogrel, warfarin, or related meds. Never change medication based on this alone. Clinical PGx testing is the proper route when relevant.\n\n";
  md += "**Limitations:** Poor coverage for CYP2D6/CYP3A4; real response depends on age, liver/kidney function, other drugs, adherence; many variants rare/ancestry-specific/not well tagged.\n\n";

  // Nutrition (richer)
  md += "### Nutrition & Metabolism Context\n";
  md += "Variants influence handling of lactose (LCT), caffeine (CYP1A2), alcohol (ADH1B/ALDH2), vitamin D (VDR), iron (HFE). Real-world impact modified by diet and health. ALDH2 *2 signal is strong in East Asian populations; most others European-biased.\n\n";
  md += "**Why this matters:** These variants can help explain why some people experience bloating with dairy, strong alcohol reactions, or slower caffeine clearance — signals often more noticeable than subtler genetic effects. Even well-known signals (FTO, TCF7L2, etc.) usually represent one small, probabilistic contribution; environment, total diet quality, and lifestyle typically explain the large majority (often 90%+) of real-world differences.\n\n";
  md += "**5 Questions (summary):**\n";
  md += "1. What might this mean? — LCT GG associated with lower lactase persistence; other variants linked to caffeine rate, alcohol sensitivity (esp. East Asian ALDH2), vitamin D receptor, iron storage.\n";
  md += "2. Evidence strength — Moderate to strong for primary signals (lactose, ALDH2 alcohol flush in East Asians, HFE iron, caffeine).\n";
  md += "3. Established or exploratory — Some (HFE, ALDH2) clearer clinically; most exploratory for general nutrition outside specific scenarios.\n";
  md += "4. Effect size — Subtle influence on tolerance/requirements; diet quality and overall intake usually dominate.\n";
  md += "5. Discuss with professional? — If symptoms (dairy bloating, alcohol reactions, low sun/fatigue, family iron history). Blood tests are primary for nutrient status.\n\n";
  md += "**Limitations:** Most data European-biased (exceptions noted); explains only part of trait heritability; heavily modified by diet, microbiome, meds, overall health; does not replace clinical lab testing.\n\n";

  // Sleep (richer Phase 4)
  md += "### Sleep & Recovery Context\n";
  md += "Several common variants are associated with modest differences in sleep timing preferences, melatonin response, or recovery signals in studied populations. These are generally small effects that interact strongly with lifestyle, light exposure, and age. Highly polygenic trait; most data European-biased.\n\n";
  md += "**Why this matters:** Sleep timing and recovery are heavily shaped by light, age, social schedules, and behavior. Common variants in this profile capture <<2% of variance in large datasets (large polygenic scores for chronotype reach only ~5–8% R² even in Europeans). The large majority of differences (typically 90%+) are environmental and behavioral. Your genetic slice is usually minutes or less versus hours from light hygiene or schedule changes.\n\n";
  md += "**5 Questions (summary):**\n";
  md += "1. What might this mean? — Variants in PER2, CLOCK, MTNR1B etc. linked to modest chronotype tendencies in population studies; most signals from European-ancestry cohorts.\n";
  md += "2. Evidence strength — Moderate for chronotype associations; direct impact on sleep quality/recovery more limited and variable.\n";
  md += "3. Established or exploratory — Largely exploratory; not used in standard clinical sleep medicine except in rare cases. Clinical sleep evaluation uses history, diaries, actigraphy, and PSG when indicated.\n";
  md += "4. Effect size — Small-to-modest; highly modifiable by light hygiene, consistent schedules, age, and environment.\n";
  md += "5. Discuss with professional? — Rarely changes recommendations. Discuss if persistent sleep difficulties or considering melatonin for shift work/travel. Clinical evaluation follows established guidelines.\n\n";
  md += "**Limitations:** Most data European-biased; consumer arrays capture only a small fraction of relevant variation; sleep is highly polygenic + environmental; educational context only — not a sleep disorder assessment.\n\n";

  md += "---\n\n";
  return md;
}

export function toStructuredReport(result: AnalysisResult): StructuredReport {
  const highActionability = result.insights.filter(i => 
    i.snp.clinicalActionability === 'high' || i.snp.clinicalActionability === 'consult_specialist'
  ).length;

  const increasedRisk = result.insights.filter(i => 
    i.interpretation.effect === 'increased_risk' || i.interpretation.effect === 'affected'
  ).length;

  const carriers = result.insights.filter(i => 
    i.interpretation.effect === 'carrier'
  ).length;

  return {
    meta: {
      generatedAt: result.generatedAt,
      fileName: result.fileName,
      format: result.format,
      totalVariantsParsed: result.totalVariantsParsed,
      matchedVariants: result.matchedVariants,
      knowledgeBaseVersion: result.knowledgeBaseVersion,
      disclaimer: DISCLAIMER
    },
    summary: {
      highActionabilityCount: highActionability,
      increasedRiskCount: increasedRisk,
      carrierFindings: carriers
    },
    categories: result.categories,
    allInsights: result.insights
  };
}

export function toJSON(result: AnalysisResult): string {
  const report = toStructuredReport(result);
  return JSON.stringify(report, null, 2);
}

export function toCSV(result: AnalysisResult, delimiter = ','): string {
  const headers = [
    'rsid', 'gene', 'trait', 'category', 'genotype', 'effect', 'description', 
    'impact', 'confidence', 'evidenceLevel', 'clinicalActionability', 'source', 'notes'
  ];

  const rows = result.insights.map((insight: MatchedInsight) => {
    const { snp, genotype, interpretation } = insight;
    return [
      snp.rsid,
      snp.gene,
      `"${snp.trait.replace(/"/g, '""')}"`,
      snp.category,
      genotype,
      interpretation.effect,
      `"${interpretation.description.replace(/"/g, '""')}"`,
      interpretation.impact,
      interpretation.confidence,
      snp.evidenceLevel || '',
      snp.clinicalActionability || '',
      snp.source,
      snp.notes ? `"${snp.notes.replace(/"/g, '""')}"` : ''
    ].join(delimiter);
  });

  return [headers.join(delimiter), ...rows].join('\n');
}

export function toTSV(result: AnalysisResult): string {
  return toCSV(result, '\t');
}

export function toMarkdown(result: AnalysisResult): string {
  const report = toStructuredReport(result);
  let md = `# Grok Genome Analysis Report\n\n`;
  md += `**File:** ${report.meta.fileName}  |  **Generated:** ${new Date(report.meta.generatedAt).toLocaleString()}  |  **KB Version:** ${report.meta.knowledgeBaseVersion}\n\n`;
  md += `> ${DISCLAIMER}\n\n`;

  md += `## Summary\n\n`;
  md += `- High actionability findings: **${report.summary.highActionabilityCount}**\n`;
  md += `- Increased risk / affected: **${report.summary.increasedRiskCount}**\n`;
  md += `- Carrier status findings: **${report.summary.carrierFindings}**\n`;
  md += `- Variants analyzed: ${report.meta.matchedVariants} / ${report.meta.totalVariantsParsed}\n\n`;

  Object.entries(report.categories).forEach(([cat, insights]) => {
    if (!insights || insights.length === 0) return;
    md += `## ${cat.replace('_', ' ').toUpperCase()}\n\n`;
    insights.forEach(i => {
      md += `### ${i.snp.gene} (${i.snp.rsid}) — ${i.genotype}\n`;
      md += `${i.interpretation.description}\n\n`;
      md += `- **Effect:** ${i.interpretation.effect} | **Impact:** ${i.interpretation.impact} | **Evidence:** ${i.snp.evidenceLevel}\n`;
      if (i.snp.references?.length) md += `- References: ${i.snp.references.join(', ')}\n`;
      if (i.snp.notes) md += `- Notes: ${i.snp.notes}\n`;
      md += `\n`;
    });
  });

  // Add richer synthesized profiles with limitations (Phase 4)
  md += getSynthesizedProfilesMarkdown(result.insights);

  md += `---\n\n*Generated by Grok Genome — 100% client-side — Trust & Responsibility: https://grok-genome.vercel.app/for-clinicians*\n`;
  return md;
}

// Helper for richer PDF data (used by pdfExport.ts)
export function prepareRichPDFData(result: AnalysisResult) {
  return {
    ...toStructuredReport(result),
    generatedAtFormatted: new Date(result.generatedAt).toLocaleDateString(),
    synthesizedProfiles: getSynthesizedProfilesMarkdown(result.insights).replace(/##/g, '###'),
  };
}
