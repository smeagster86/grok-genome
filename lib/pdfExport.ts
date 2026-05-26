import jsPDF from 'jspdf';
import { AnalysisResult, MatchedInsight } from './types';
import { prepareRichPDFData } from './exportUtils';

/**
 * Professional PDF report generator for Grok Genome.
 * Produces a clean, clinical-style document suitable for personal records,
 * discussion with healthcare providers, or research notes.
 * All generation is client-side.
 */

const DISCLAIMER = "This report is for educational and research purposes only. It does not constitute medical advice. Genetic associations are probabilistic and context-dependent. Always consult a qualified healthcare professional or genetic counselor. All analysis performed locally in your browser.";

export async function generatePDFReport(result: AnalysisResult) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  const richData = prepareRichPDFData(result);

  // Header
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 32, 'F');
  doc.setTextColor(16, 185, 129); // emerald-500
  doc.setFontSize(20);
  doc.text("GROK GENOME", 18, 14);
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.text("Private DNA Insights Report — Professional Edition", 18, 21);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(richData.generatedAtFormatted, pageWidth - 18, 14, { align: 'right' });
  doc.text(result.fileName, pageWidth - 18, 21, { align: 'right' });

  y = 42;

  // Meta line
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(9);
  doc.text(`Knowledge Base: ${result.knowledgeBaseVersion}  •  ${result.matchedVariants} high-value variants matched from ${result.totalVariantsParsed.toLocaleString()} total`, 18, y);
  y += 10;

  // Summary box
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(18, y, pageWidth - 36, 28, 3, 3, 'FD');
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.text("Summary", 24, y + 8);
  doc.setFontSize(9);
  doc.text(`High actionability: ${richData.summary.highActionabilityCount}   •   Increased risk/affected: ${richData.summary.increasedRiskCount}   •   Carrier findings: ${richData.summary.carrierFindings}`, 24, y + 17);
  y += 36;

  // Categories
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.text("Key Findings by Category", 18, y);
  y += 8;

  Object.entries(result.categories).forEach(([cat, insights]) => {
    if (!insights || insights.length === 0) return;

    // Category header
    doc.setFillColor(16, 185, 129);
    doc.rect(18, y, pageWidth - 36, 6, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(cat.replace('_', ' ').toUpperCase(), 20, y + 4.5);
    y += 10;

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(9);

    insights.slice(0, 5).forEach((insight: MatchedInsight) => {
      const { snp, genotype, interpretation } = insight;
      const line = `${snp.gene} (${snp.rsid})  ${genotype} — ${interpretation.effect.replace('_', ' ')}  [${snp.evidenceLevel || '—'}]`;
      doc.text(line, 22, y);
      y += 5;

      // Wrap description
      const desc = interpretation.description.substring(0, 140) + (interpretation.description.length > 140 ? '...' : '');
      doc.setTextColor(71, 85, 105);
      doc.setFontSize(8);
      doc.text(desc, 26, y);
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(9);
      y += 6;

      if (y > 250) {
        doc.addPage();
        y = 25;
      }
    });

    y += 6;
    if (y > 250) {
      doc.addPage();
      y = 25;
    }
  });

  // References & Notes section (condensed)
  y += 6;
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("Selected References & Limitations", 18, y);
  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  const refText = "See detailed JSON/CSV exports for full references per variant. All interpretations are probabilistic. Many findings have ancestry-specific frequencies and require clinical correlation.";
  const splitRef = doc.splitTextToSize(refText, pageWidth - 36);
  doc.text(splitRef, 18, y);

  // Footer disclaimer
  y = doc.internal.pageSize.getHeight() - 25;
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  const splitDisclaimer = doc.splitTextToSize(DISCLAIMER, pageWidth - 36);
  doc.text(splitDisclaimer, 18, y);

  doc.save(`GrokGenome_Report_${result.fileName.replace(/\.[^/.]+$/, '')}_${new Date().toISOString().slice(0,10)}.pdf`);
}
