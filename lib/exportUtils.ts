import { AnalysisResult, StructuredReport, MatchedInsight } from './types';

/**
 * Professional export utilities for Grok Genome.
 * These produce clean, machine- and human-readable outputs suitable for
 * further analysis in other tools (R, Python, Excel, research databases, LLMs, etc.).
 * All functions are pure and client-side.
 */

const DISCLAIMER = "This report is for educational and research purposes only. It does not constitute medical advice. Genetic associations are probabilistic and context-dependent. Always consult a qualified healthcare professional or genetic counselor. All analysis performed locally in your browser using the Grok Genome knowledge base.";

// Synthesized profile summaries + limitations for exports (kept in sync with UI profiles)
function getSynthesizedProfilesMarkdown(insights: MatchedInsight[]): string {
  let md = "## Synthesized Profiles & Limitations\n\n";

  // Methylation
  const mthfr677 = insights.find(i => i.snp.rsid === "rs1801133");
  const mthfr1298 = insights.find(i => i.snp.rsid === "rs1801131");
  const hasMethylRisk = mthfr677?.genotype === "GG" || mthfr677?.genotype === "AG" || mthfr1298?.genotype === "CC" || mthfr1298?.genotype === "AC";

  md += "### Methylation Support (Folate pathway)\n";
  md += hasMethylRisk 
    ? "Evidence suggests a possible tendency toward modestly lower activity in the folate pathway in studied populations, particularly when both MTHFR variants are present. Actual biological impact varies significantly between individuals.\n\n"
    : "Your genotype combination at these two positions is consistent with typical activity in the reference populations studied.\n\n";
  md += "**5 Questions (summary):**\n";
  md += "1. What might this mean? — Common MTHFR variants associated with differences in folate processing in lab studies.\n";
  md += "2. Evidence strength — Moderate (enzyme function replicated; health outcomes more variable).\n";
  md += "3. Established or exploratory — Largely exploratory for general wellness; major orgs do not recommend routine MTHFR-based interventions for most people.\n";
  md += "4. Effect size — Modest, one factor among many (diet, other B-vitamins, genes).\n";
  md += "5. Discuss with professional? — If symptoms, elevated homocysteine, or high-dose supplement consideration (esp. pregnancy).\n\n";
  md += "**Limitations:** Most data European-biased; does not capture all folate-related variation; real-world methylation strongly influenced by diet/lifestyle/meds/other genes. Not diagnostic.\n\n";

  // Drug
  md += "### Drug Metabolism Tendencies\n";
  md += "Certain variants in pharmacogenes (CYP2C19, VKORC1, etc.) are associated with differences in how specific medications are processed. Effects are highly drug-specific.\n\n";
  md += "**5 Questions (summary):**\n";
  md += "1. What might this mean? — Examples: CYP2C19 rs4244285 AA linked to reduced clopidogrel activation; VKORC1 rs9923231 AA linked to warfarin sensitivity.\n";
  md += "2. Evidence strength — Moderate to high for specific CPIC/FDA-supported drug-gene pairs; many others exploratory.\n";
  md += "3. Established or exploratory — Established for a small number of pairs with guidelines; exploratory for most other meds in consumer data.\n";
  md += "4. Effect size — Drug-specific; does not broadly affect 'metabolism' or wellness traits.\n";
  md += "5. Discuss with professional? — Before/while taking clopidogrel, warfarin, or related meds. Never change medication based on this alone.\n\n";
  md += "**Limitations:** Consumer arrays have poor or no coverage for key genes like CYP2D6/CYP3A4 star alleles. Real response also depends on age, liver/kidney function, other drugs. Not a substitute for clinical pharmacogenetic testing.\n\n";

  // Nutrition
  md += "### Nutrition & Metabolism Context\n";
  md += "Variants influence handling of lactose (LCT), caffeine (CYP1A2), alcohol (ADH1B/ALDH2), vitamin D (VDR), iron (HFE). Real-world impact modified by diet and health.\n\n";
  md += "**5 Questions (summary):**\n";
  md += "1. What might this mean? — LCT GG associated with lower lactase persistence; other variants linked to caffeine rate, alcohol sensitivity, vitamin D receptor, iron storage.\n";
  md += "2. Evidence strength — Moderate to strong for primary signals (lactose, ALDH2 alcohol flush in East Asians, HFE iron, caffeine).\n";
  md += "3. Established or exploratory — Some (HFE, ALDH2) clearer clinically; most exploratory for general nutrition outside specific scenarios.\n";
  md += "4. Effect size — Subtle influence on tolerance/requirements; diet quality and overall intake usually dominate.\n";
  md += "5. Discuss with professional? — If symptoms (dairy bloating, alcohol reactions, low sun/fatigue, family iron history). Blood tests are primary for nutrient status.\n\n";
  md += "**Limitations:** Most data European-biased (exceptions noted); explains only part of trait heritability; heavily modified by diet, microbiome, meds, overall health. Does not replace clinical lab testing.\n\n";

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

  // Add synthesized profiles with limitations (Phase 3 requirement)
  md += getSynthesizedProfilesMarkdown(result.insights);

  md += `---\n\n*Generated by Grok Genome — 100% client-side — Trust & Responsibility: https://grok-genome.vercel.app/for-clinicians*\n`;
  return md;
}

// Helper for future richer PDF data (used by pdfExport.ts)
export function prepareRichPDFData(result: AnalysisResult) {
  return {
    ...toStructuredReport(result),
    generatedAtFormatted: new Date(result.generatedAt).toLocaleDateString(),
    synthesizedProfiles: getSynthesizedProfilesMarkdown(result.insights).replace(/##/g, '###'), // basic text for PDF
  };
}
